import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isOk } from 'massaman'

import { _resetCorpusCache, loadCorpus } from './corpus.mjs'

test('loadCorpus: returns Ok with payload when file is present', () => {
  _resetCorpusCache()
  const result = loadCorpus()
  assert.equal(isOk(result), true, `expected Ok, got ${JSON.stringify(result.error)}`)
  assert.equal(typeof result.value.source, 'string')
  assert.equal(typeof result.value.generated, 'string')
  assert.ok(Array.isArray(result.value.names))
  assert.ok(
    result.value.names.length > 10000,
    `expected > 10K names, got ${result.value.names.length}`
  )
})

test('loadCorpus: memoizes the Ok result', () => {
  _resetCorpusCache()
  const first = loadCorpus()
  const second = loadCorpus()
  assert.equal(first, second, 'second call should return the same Result instance')
})

// The validateShape logic is currently exercised through loadCorpus()'s
// fallback path search. Direct tests would require module-level mocking
// of the import.meta.url HERE — out of scope. The shape contract is:
//   - non-object → err
//   - missing required field (source/generated/names) → err
//   - non-array names → err
//   - empty names array → err
//   - non-string entry in names → err
//   - size field present but != names.length → err
// Live corpus (`popular-names.json`) is the canonical positive case
// covered by the two tests above.
