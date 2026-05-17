import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isOk } from 'massaman'

import { loadCorpus } from './corpus.mjs'
import { findNearMatches, osaDistance } from './near-match.mjs'

// Load the default corpus once for tests that need realistic data.
const corpusResult = loadCorpus()
assert.equal(isOk(corpusResult), true, 'expected corpus to load successfully for tests')
const DEFAULT_CORPUS = corpusResult.value.names

test('osaDistance: identical → 0', () => {
  assert.equal(osaDistance('foo', 'foo'), 0)
})

test('osaDistance: single substitution → 1', () => {
  assert.equal(osaDistance('cat', 'bat'), 1)
})

test('osaDistance: single insertion → 1', () => {
  assert.equal(osaDistance('cat', 'cart'), 1)
})

test('osaDistance: adjacent transposition → 1', () => {
  assert.equal(osaDistance('ab', 'ba'), 1)
  assert.equal(osaDistance('react', 'raect'), 1)
})

test('osaDistance: empty strings', () => {
  assert.equal(osaDistance('', ''), 0)
  assert.equal(osaDistance('foo', ''), 3)
  assert.equal(osaDistance('', 'bar'), 3)
})

test('osaDistance: documents OSA-not-DL boundary (regression W1.5)', () => {
  // The `damerau-levenshtein` package is OSA, not unrestricted DL. For
  // typosquat detection at distance ≤ 2 this is irrelevant, but the test
  // is here so the assumption doesn't silently regress.
  assert.equal(osaDistance('ca', 'abc'), 3, 'OSA: cannot edit a substring twice')
})

test('findNearMatches: extoolkit catches es-toolkit', () => {
  const matches = findNearMatches('extoolkit', DEFAULT_CORPUS)
  const names = matches.map((match) => match.name)
  assert.ok(
    names.includes('es-toolkit'),
    `expected es-toolkit, got [${names.slice(0, 5).join(', ')}]`
  )
  const esToolkit = matches.find((match) => match.name === 'es-toolkit')
  assert.equal(esToolkit.distance, 1, 'extoolkit vs estoolkit normalized = 1 edit')
})

test('findNearMatches: typescirpt catches typescript', () => {
  const matches = findNearMatches('typescirpt', DEFAULT_CORPUS)
  assert.ok(
    matches.some((match) => match.name === 'typescript'),
    'transposition should be caught'
  )
})

test('findNearMatches: exact moniker collision is NOT returned', () => {
  const matches = findNearMatches('estoolkit', DEFAULT_CORPUS)
  assert.ok(
    !matches.some((match) => match.name === 'es-toolkit'),
    'identical normalization should be excluded'
  )
})

test('findNearMatches: dedupes by normalized form (regression W7)', () => {
  const matches = findNearMatches('object-assignn', DEFAULT_CORPUS)
  const objectAssignHits = matches.filter((match) => /^object[._-]?assign$/.test(match.name))
  assert.equal(
    objectAssignHits.length,
    1,
    `expected single dedup'd hit, got [${objectAssignHits.map((match) => match.name).join(', ')}]`
  )
})

test('findNearMatches: very different names return empty', () => {
  const matches = findNearMatches('totally-novel-zxqv-2026', DEFAULT_CORPUS)
  assert.equal(matches.length, 0)
})

test('findNearMatches: respects custom corpus', () => {
  const matches = findNearMatches('raect', ['react', 'vue', 'svelte'])
  assert.equal(matches.length, 1)
  assert.equal(matches[0].name, 'react')
  assert.equal(matches[0].distance, 1)
})

test('findNearMatches: tolerates null/undefined corpus entries (regression E5)', () => {
  const matches = findNearMatches('raect', [null, undefined, 'react', '', 'vue'])
  assert.equal(matches.length, 1)
  assert.equal(matches[0].name, 'react')
})

test('findNearMatches: rejects multi-slash scoped names (regression W6)', () => {
  assert.deepEqual(findNearMatches('@scope/foo/bar', DEFAULT_CORPUS), [])
})

test('findNearMatches: 3-char popular names matchable (regression W9)', () => {
  const matches = findNearMatches('zod1', ['zod', 'ajv', 'tsx'])
  assert.ok(
    matches.some((match) => match.name === 'zod'),
    'should match 3-char zod'
  )
})

test('findNearMatches: 2-char names like `qs` are intentionally below minCorpusLen', () => {
  // Documenting the threshold so the docs+code stay in sync (regression W9.5).
  const matches = findNearMatches('qsa', ['qs'])
  assert.deepEqual(matches, [])
})

test('findNearMatches: empty / non-string candidate returns empty', () => {
  assert.deepEqual(findNearMatches('', DEFAULT_CORPUS), [])
  assert.deepEqual(findNearMatches(null, DEFAULT_CORPUS), [])
  assert.deepEqual(findNearMatches(42, DEFAULT_CORPUS), [])
})

test('findNearMatches: returns empty when corpus is missing', () => {
  assert.deepEqual(findNearMatches('react', null), [])
  assert.deepEqual(findNearMatches('react', undefined), [])
})

test('findNearMatches: sorted by distance ascending', () => {
  const matches = findNearMatches('abx', ['axxbxx', 'axxx', 'abc'], { maxDistance: 3 })
  for (let i = 1; i < matches.length; i++) {
    assert.ok(matches[i].distance >= matches[i - 1].distance, 'sorted by distance ascending')
  }
})
