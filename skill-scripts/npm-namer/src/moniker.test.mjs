import assert from 'node:assert/strict'
import { test } from 'node:test'

import { normalize, variants, findCollisions } from './moniker.mjs'

test('normalize: strips punctuation and lowercases', () => {
  assert.equal(normalize('Pico-Log'), 'picolog')
  assert.equal(normalize('pico.log'), 'picolog')
  assert.equal(normalize('PICO_LOG'), 'picolog')
  assert.equal(normalize('picolog'), 'picolog')
})

test('normalize: preserves scope', () => {
  assert.equal(normalize('@Zac/Pico-Log'), '@zac/picolog')
  assert.equal(normalize('@scope/foo.bar'), '@scope/foobar')
})

test('normalize: canonical js-on-stream ↔ jsonstream collision', () => {
  assert.equal(normalize('js-on-stream'), normalize('jsonstream'))
  assert.equal(normalize('js-on-stream'), 'jsonstream')
})

test('variants: includes bare normalized form', () => {
  const v = variants('pico-log')
  assert.ok(v.includes('picolog'), 'expected bare form')
})

test('variants: includes single-position insertions', () => {
  const v = variants('picolog')
  for (const expected of ['pico-log', 'pico_log', 'pico.log', 'p-icolog', 'picolo-g']) {
    assert.ok(v.includes(expected), `expected variant ${expected}`)
  }
})

test('variants: catches canonical js-on-stream from jsonstream (regression E1)', () => {
  // Bug E1: prior versions only ran 2-insertion under --exhaustive. The
  // canonical blog-post example requires it, so it's on by default now.
  const v = variants('jsonstream')
  assert.ok(v.includes('js-on-stream'), 'expected js-on-stream in default variants')
})

test('variants: FooBar still emits the bare foobar variant (regression E2)', () => {
  // Bug E2: prior `out.delete(lower)` removed the lowercased bare form,
  // making `findCollisions('FooBar', ...)` miss `foobar` collisions.
  const v = variants('FooBar')
  assert.ok(v.includes('foobar'), 'expected bare foobar to survive')
})

test('variants: returns [] for whitespace/punctuation-only input (regression E3)', () => {
  // Bug E3: prior code emitted [''] for '---', leading to GET / on the registry.
  assert.deepEqual(variants('---'), [])
  assert.deepEqual(variants(''), [])
  assert.deepEqual(variants('.'), [])
})

test('variants: excludes the literal input string', () => {
  const v = variants('pico-log')
  assert.ok(!v.includes('pico-log'), 'should not return the literal input')
})

test('variants: scoped names keep the scope', () => {
  const v = variants('@me/picolog')
  assert.ok(
    v.every((x) => x.startsWith('@me/')),
    'all variants should keep @me/'
  )
})

test('normalize: returns "" for non-string / empty / null input (regression E5)', () => {
  // The function used to crash on null because `null.startsWith` throws.
  assert.equal(normalize(null), '')
  assert.equal(normalize(undefined), '')
  assert.equal(normalize(''), '')
  assert.equal(normalize(42), '')
})

test('normalize: Unicode case folding is NOT applied (documented ASCII precondition)', () => {
  // The npm server-side rule predates Unicode-aware normalization, so we
  // match its ASCII-only behavior. Non-ASCII names are rejected upstream
  // by validate-npm-package-name's URL-safety check anyway. This test
  // documents the deliberate gap so a future "improvement" doesn't slip in.
  assert.equal(normalize('İ'), 'i̇', 'i̇ has lowercased dot, not collapsed to plain i')
  assert.notEqual(normalize('ß'), 'ss')
  assert.notEqual(normalize('Straße'), normalize('strasse'))
})

test('variants: returns [] for whitespace inputs (regression W15b)', () => {
  // Prevent garbage variants from leaking out and being HEAD'd.
  assert.deepEqual(variants(' foo'), [])
  assert.deepEqual(variants('foo '), [])
  assert.deepEqual(variants('foo\nbar'), [])
  assert.deepEqual(variants('foo\tbar'), [])
})

test('variants: returns [] for leading-separator inputs (regression iter-4 WARN-2)', () => {
  // `validateName` rejects these upstream; the guard here keeps variants()
  // defensively pure even when called in isolation.
  assert.deepEqual(variants('-foo'), [])
  assert.deepEqual(variants('.foo'), [])
  assert.deepEqual(variants('_foo'), [])
})

test('variants: returns [] for malformed scoped inputs without slash (regression iter-4 WARN-3)', () => {
  assert.deepEqual(variants('@me'), [])
  assert.deepEqual(variants('@scope'), [])
})

test('variants: returns [] for malformed scoped inputs with bad pkg segment (regression iter-5 W25/W26)', () => {
  // Post-scope leading-separator. validateName rejects @scope/.foo upstream.
  assert.deepEqual(variants('@scope/.foo'), [])
  assert.deepEqual(variants('@scope/-foo'), [])
  assert.deepEqual(variants('@scope/_foo'), [])
  // Empty scope, multi-slash.
  assert.deepEqual(variants('@/foo'), [])
  assert.deepEqual(variants('@me/foo/bar'), [])
})

test('variants: bare.length === 4 boundary activates 2-insertion (regression W17b)', () => {
  // The 2-insertion loop guards on `bare.length >= 4`. Verify length-4
  // inputs do iterate (produce at least some 2-insertion variants).
  const result = variants('abcd')
  assert.ok(
    result.includes('a-b-cd'),
    'expected at least one 2-insertion variant for length-4 input'
  )
})

test('variants: catches quick-json-parser from quickjsonparser (regression E1.5 long-name)', () => {
  // Bug E1.5: cap of 250 exhausted at gap=3 before reaching the actual
  // morpheme split at gap=5. The length-scaled cap fixes it.
  const v = variants('quickjsonparser')
  assert.ok(v.includes('quick-json-parser'), 'expected quick-json-parser in default variants')
})

test('variants: catches react-native-navigation from reactnativenavigation (regression E1.5 longer)', () => {
  const v = variants('reactnativenavigation')
  assert.ok(
    v.includes('react-native-navigation'),
    'expected react-native-navigation in default variants'
  )
})

test('variants: exhaustive mode covers strictly more candidates than default', () => {
  // Tightened from the prior tautological test — pick a long name where
  // default mode caps short of mixed-separator combinations that
  // exhaustive reaches.
  const ex = variants('reactnativenavigationscreens', { isExhaustive: true })
  const basic = variants('reactnativenavigationscreens')
  const exOnly = ex.filter((v) => !basic.includes(v))
  assert.ok(
    exOnly.length > 0,
    `exhaustive should expand coverage; saw ${ex.length} vs ${basic.length}`
  )
})

test('findCollisions: surfaces unverified variants when exists() throws', async () => {
  // Bug W14: exists() errors used to bubble through Promise.all. Now they
  // land in `unverified` so callers can avoid false `available` verdicts.
  const flaky = async (variant) => {
    if (variant === 'pico-log') return true
    if (variant === 'pico_log') throw new Error('429 rate limit')
    return false
  }
  const result = await findCollisions('picolog', flaky)
  assert.ok(result.conflicts.length > 0)
  assert.ok(result.conflicts.includes('pico-log'))
  assert.ok(result.unverified.includes('pico_log'))
})

test('findCollisions: catches js-on-stream when jsonstream is candidate (round-trip regression W10)', async () => {
  // Round-trip test for E1 — was a green-test-for-bug situation prior.
  const taken = new Set(['js-on-stream'])
  const result = await findCollisions('jsonstream', async (variant) => taken.has(variant))
  assert.ok(result.conflicts.length > 0)
  assert.ok(result.conflicts.includes('js-on-stream'))
  assert.deepEqual(result.unverified, [])
})

test('findCollisions: catches FooBar ↔ foobar', async () => {
  const taken = new Set(['foobar'])
  const result = await findCollisions('FooBar', async (variant) => taken.has(variant))
  assert.ok(result.conflicts.length > 0)
  assert.ok(result.conflicts.includes('foobar'))
})

test('findCollisions: returns no conflicts when registry empty', async () => {
  const result = await findCollisions('totally-novel-xyz-zrsn-2026', async () => false)
  assert.deepEqual(result.conflicts, [])
  assert.deepEqual(result.unverified, [])
})
