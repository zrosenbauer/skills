// Popular-names corpus loader. Reads `popular-names.json` (committed
// build artifact) and returns it as a Result. Memoized after first
// successful read because the file is ~260 KB and the CLI may call
// this many times in a single run.
//
// Source: top ~15 K unscoped npm packages by monthly downloads, snapshot
// from `nice-registry/download-counts`. See refresh-popular-names.mjs.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { attempt, err, ok } from 'massaman'

const HERE = dirname(fileURLToPath(import.meta.url))

/**
 * @typedef {Object} Corpus
 * @property {string} source - provenance string, e.g. "nice-registry/download-counts"
 * @property {string} [sourceVersion]
 * @property {string} generated - ISO date the snapshot was built
 * @property {number} size - corpus name count
 * @property {string[]} names - unscoped package names, descending by downloads
 */

// Invariant: cache holds the FIRST successful load. If `loadCorpus` is
// called again, we return the same Result. Module-level mutation here is
// pure memoization — the corpus never changes within a process.
let cache = null

/**
 * Try the same-dir and parent-dir locations for `popular-names.json`. Both
 * the built bundle (`dist/check.mjs`) and the unbundled source live one
 * level below the canonical JSON file's location.
 *
 * @returns {string[]}
 */
function candidatePaths() {
  return [join(HERE, '..', 'popular-names.json'), join(HERE, 'popular-names.json')]
}

/**
 * Load the popular-names corpus. Returns Ok(corpus) on success, Err on a
 * read or parse failure. Result is cached after the first Ok; Err results
 * are not cached so transient failures can be retried.
 *
 * @returns {import('massaman').Result<Corpus, Error>}
 * @example
 * const result = loadCorpus()
 * if (isOk(result)) for (const name of result.value.names) { … }
 */
export function loadCorpus() {
  if (cache && cache.ok) return cache

  for (const path of candidatePaths()) {
    const read = attempt(() => readFileSync(path, 'utf8'))
    if (!read.ok) continue
    const parsed = attempt(() => JSON.parse(read.value))
    if (!parsed.ok) {
      cache = err(new Error(`popular-names.json at ${path} is malformed: ${parsed.error.message}`))
      return cache
    }
    const shapeError = validateShape(parsed.value, path)
    if (shapeError) {
      cache = err(shapeError)
      return cache
    }
    cache = ok(parsed.value)
    return cache
  }

  cache = err(new Error(`popular-names.json not found in any of: ${candidatePaths().join(', ')}`))
  return cache
}

/**
 * Confirm the parsed JSON has the shape `Corpus` expects. Returns an
 * Error describing the first missing field, or null if the shape is valid.
 *
 * @param {unknown} value
 * @param {string} path
 * @returns {Error | null}
 * @private
 */
function validateShape(value, path) {
  if (!value || typeof value !== 'object') {
    return new Error(`popular-names.json at ${path} is not an object`)
  }
  const required = { source: 'string', generated: 'string', names: 'array' }
  for (const [field, expectedType] of Object.entries(required)) {
    const actual = value[field]
    const matches =
      expectedType === 'array' ? Array.isArray(actual) : typeof actual === expectedType
    if (!matches) {
      return new Error(
        `popular-names.json at ${path} missing or wrong-typed field "${field}" (expected ${expectedType})`
      )
    }
  }
  if (value.names.length === 0) {
    return new Error(`popular-names.json at ${path} has an empty names array`)
  }
  const badEntry = value.names.findIndex((name) => typeof name !== 'string' || !name)
  if (badEntry >= 0) {
    return new Error(
      `popular-names.json at ${path} has a non-string or empty entry at index ${badEntry}`
    )
  }
  if (typeof value.size === 'number' && value.size !== value.names.length) {
    return new Error(
      `popular-names.json at ${path}: size field (${value.size}) doesn't match names.length (${value.names.length})`
    )
  }
  return null
}

/**
 * Test-only escape hatch — clears the memoization cache.
 *
 * @private
 */
export function _resetCorpusCache() {
  cache = null
}
