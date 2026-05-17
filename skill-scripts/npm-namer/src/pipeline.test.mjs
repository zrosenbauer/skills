import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  assembleMonikerProbes,
  decide,
  decideOne,
  flagTyposquats,
  selectMonikerCandidates,
  triage,
} from './pipeline.mjs'

// ─── triage ──────────────────────────────────────────────────────────────

test('triage: splits valid + invalid + tags scoped', () => {
  const result = triage(['tiny-log', 'TinyLog', '@me/foo'])
  assert.deepEqual(result.valid, ['tiny-log', '@me/foo'])
  assert.equal(result.invalid.length, 1)
  assert.equal(result.invalid[0].status, 'invalid')
  assert.equal(result.invalid[0].name, 'TinyLog')
  assert.deepEqual([...result.scoped], ['@me/foo'])
})

// ─── selectMonikerCandidates ─────────────────────────────────────────────

test('selectMonikerCandidates: skips scoped, taken, and unknown literal results', () => {
  const result = selectMonikerCandidates({
    valid: ['free-name', 'taken-name', 'unknown-name', '@me/scoped'],
    scoped: new Set(['@me/scoped']),
    existence: new Map([
      ['free-name', { kind: 'free', name: 'free-name', status: 404 }],
      ['taken-name', { kind: 'taken', name: 'taken-name', status: 200 }],
      ['unknown-name', { kind: 'unknown', name: 'unknown-name', status: 429 }],
      ['@me/scoped', { kind: 'free', name: '@me/scoped', status: 404 }],
    ]),
    isExhaustive: false,
  })
  // Only the literal-free unscoped candidate gets variants generated.
  assert.deepEqual([...result.variantsByName.keys()], ['free-name'])
  // Its variants exist and include the obvious 1-insertion shapes.
  const freeVariants = result.variantsByName.get('free-name')
  assert.ok(freeVariants.length > 0, 'expected variants for free-name')
  assert.ok(freeVariants.includes('freename'), 'expected the bare (no-separator) form')
  assert.ok(freeVariants.includes('free_name'), 'expected the underscore variant')
  // The deduplicated allVariants set matches the union of values.
  assert.equal(result.allVariants.size, new Set(freeVariants).size)
})

// ─── assembleMonikerProbes ───────────────────────────────────────────────

test('assembleMonikerProbes: buckets taken into conflicts, unknown into unverified', () => {
  const probes = assembleMonikerProbes({
    variantsByName: new Map([['picolog', ['pico-log', 'pico_log', 'pico.log']]]),
    variantResults: [
      { kind: 'taken', name: 'pico-log', status: 200 },
      { kind: 'unknown', name: 'pico_log', status: 429, error: 'rate limit' },
      { kind: 'free', name: 'pico.log', status: 404 },
    ],
  })
  const probe = probes.get('picolog')
  assert.deepEqual(probe.conflicts, ['pico-log'])
  assert.deepEqual(probe.unverified, ['pico_log'])
})

test('assembleMonikerProbes: variant with missing result lands in neither bucket', () => {
  // Defensive — if checkMany dropped a name somehow, we don't false-positive it.
  const probes = assembleMonikerProbes({
    variantsByName: new Map([['picolog', ['pico-log', 'missing-from-results']]]),
    variantResults: [{ kind: 'taken', name: 'pico-log', status: 200 }],
  })
  const probe = probes.get('picolog')
  assert.deepEqual(probe.conflicts, ['pico-log'])
  assert.deepEqual(probe.unverified, [])
})

// ─── decideOne ───────────────────────────────────────────────────────────

test('decideOne: literal taken → status taken', () => {
  const verdict = decideOne({
    name: 'react',
    existence: { kind: 'taken', name: 'react', status: 200 },
    probe: { conflicts: [], unverified: [] },
  })
  assert.deepEqual(verdict, { status: 'taken', name: 'react' })
})

test('decideOne: literal free + no probe issues → status available', () => {
  const verdict = decideOne({
    name: 'totally-novel',
    existence: { kind: 'free', name: 'totally-novel', status: 404 },
    probe: { conflicts: [], unverified: [] },
  })
  assert.deepEqual(verdict, { status: 'available', name: 'totally-novel' })
})

test('decideOne: literal free + conflicts → status moniker', () => {
  const verdict = decideOne({
    name: 'jsonstream',
    existence: { kind: 'free', name: 'jsonstream', status: 404 },
    probe: { conflicts: ['js-on-stream'], unverified: [] },
  })
  assert.deepEqual(verdict, { status: 'moniker', name: 'jsonstream', conflicts: ['js-on-stream'] })
})

test('decideOne: literal free + no conflicts + unverified variants → status unverified', () => {
  // End-to-end regression for the critical bug from iter 2: unknown
  // variant probes used to silently drop, letting the candidate land in
  // `available` with no collision data. Now they surface as `unverified`.
  const verdict = decideOne({
    name: 'picolog',
    existence: { kind: 'free', name: 'picolog', status: 404 },
    probe: { conflicts: [], unverified: ['pico-log', 'pico_log', 'pico.log'] },
  })
  assert.equal(verdict.status, 'unverified')
  assert.equal(verdict.name, 'picolog')
  assert.deepEqual(verdict.unverified, ['pico-log', 'pico_log', 'pico.log'])
  assert.equal(verdict.unverifiedTotal, 3)
})

test('decideOne: truncates the unverified sample when total exceeds VERDICT_UNVERIFIED_SAMPLE', () => {
  // Regression for the JSON-bloat warning: a hammered registry returning
  // unknown on hundreds of variants used to dump them all.
  const lots = Array.from({ length: 50 }, (_, index) => `variant-${index}`)
  const verdict = decideOne({
    name: 'picolog',
    existence: { kind: 'free', name: 'picolog', status: 404 },
    probe: { conflicts: [], unverified: lots },
  })
  assert.equal(verdict.status, 'unverified')
  assert.equal(verdict.unverified.length, 10)
  assert.equal(verdict.unverifiedTotal, 50)
})

test('decideOne: literal unknown → status unknown with httpStatus', () => {
  const verdict = decideOne({
    name: 'rate-limited',
    existence: { kind: 'unknown', name: 'rate-limited', status: 429, error: 'Too Many Requests' },
    probe: { conflicts: [], unverified: [] },
  })
  assert.deepEqual(verdict, {
    status: 'unknown',
    name: 'rate-limited',
    httpStatus: 429,
    error: 'Too Many Requests',
  })
})

test('decideOne: conflicts take precedence over unverified', () => {
  // If we have even one definitive collision, that's the verdict — the
  // candidate cannot be published regardless of unverified neighbors.
  const verdict = decideOne({
    name: 'jsonstream',
    existence: { kind: 'free', name: 'jsonstream', status: 404 },
    probe: { conflicts: ['js-on-stream'], unverified: ['json-stream'] },
  })
  assert.equal(verdict.status, 'moniker')
  assert.deepEqual(verdict.conflicts, ['js-on-stream'])
})

// ─── decide ──────────────────────────────────────────────────────────────

test('decide: merges invalid verdicts into the output map', () => {
  const verdicts = decide({
    valid: ['ok-name'],
    invalid: [{ status: 'invalid', name: 'BadName', reasons: ['capital letters'] }],
    existence: new Map([['ok-name', { kind: 'free', name: 'ok-name', status: 404 }]]),
    monikerProbes: new Map(),
  })
  assert.equal(verdicts.size, 2)
  assert.equal(verdicts.get('BadName').status, 'invalid')
  assert.equal(verdicts.get('ok-name').status, 'available')
})

test('decide: end-to-end unverified surfacing (regression for iter-2 critical)', () => {
  const probes = assembleMonikerProbes({
    variantsByName: new Map([['picolog', ['pico-log', 'pico_log']]]),
    variantResults: [
      { kind: 'unknown', name: 'pico-log', status: 429 },
      { kind: 'unknown', name: 'pico_log', status: 429 },
    ],
  })
  const verdicts = decide({
    valid: ['picolog'],
    invalid: [],
    existence: new Map([['picolog', { kind: 'free', name: 'picolog', status: 404 }]]),
    monikerProbes: probes,
  })
  const verdict = verdicts.get('picolog')
  assert.equal(
    verdict.status,
    'unverified',
    'must NOT be "available" — both variants failed to probe'
  )
  assert.equal(verdict.unverifiedTotal, 2)
})

test('decide: throws on missing existence (invariant violation)', () => {
  assert.throws(
    () =>
      decide({
        valid: ['orphan'],
        invalid: [],
        existence: new Map(), // missing the entry for `orphan`
        monikerProbes: new Map(),
      }),
    /missing existence result for orphan/
  )
})

// ─── flagTyposquats ──────────────────────────────────────────────────────

test('flagTyposquats: annotates only available verdicts', () => {
  const seed = new Map([
    ['extoolkit', { status: 'available', name: 'extoolkit' }],
    ['react', { status: 'taken', name: 'react' }],
  ])
  const result = flagTyposquats({
    verdicts: seed,
    candidates: ['extoolkit', 'react'],
    corpus: ['es-toolkit', 'react'],
    maxDistance: 2,
  })
  assert.ok(result.get('extoolkit').nearMatches?.length > 0)
  assert.equal(result.get('react').nearMatches, undefined)
})

test('flagTyposquats: skips when no neighbors within distance', () => {
  const seed = new Map([['novel-name-xyz', { status: 'available', name: 'novel-name-xyz' }]])
  const result = flagTyposquats({
    verdicts: seed,
    candidates: ['novel-name-xyz'],
    corpus: ['react', 'vue'],
    maxDistance: 2,
  })
  assert.equal(result.get('novel-name-xyz').nearMatches, undefined)
})
