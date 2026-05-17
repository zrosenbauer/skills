// Near-match (typosquat) detection — flags candidates within ≤ N edits of
// a popular npm package. Distinct from npm's moniker rule (which only
// catches names that *normalize* identically). Single-letter substitutions
// like `extoolkit` vs `es-toolkit` would publish fine per the moniker rule
// but are classic typosquat shapes.
//
// Distance is Optimal String Alignment (OSA) from the `damerau-levenshtein`
// package — counts insertions, deletions, substitutions, and adjacent
// transpositions as one edit each, but does not allow a substring to be
// edited more than once. For typosquat detection at distance ≤ 2 this is
// indistinguishable from unrestricted Damerau-Levenshtein; the distinction
// only matters at distance 3+ (e.g., `osaDistance('ca', 'abc') === 3`
// while true DL would say 2).
//
// This module is *pure*: callers pass the corpus. The corpus loader is in
// `corpus.mjs` and returns a Result so CLI / consumers handle failure at
// their own boundary.

import damerauLevenshtein from 'damerau-levenshtein'

import { NEAR_MATCH_MAX_DISTANCE, NEAR_MATCH_MIN_CORPUS_LEN } from './constants.mjs'
import { normalize } from './moniker.mjs'

/**
 * @typedef {Object} NearMatch
 * @property {string} name - the popular package the candidate resembles
 * @property {number} distance - edit distance between normalized forms
 */

/**
 * Optimal String Alignment distance — insertions, deletions, substitutions,
 * and adjacent transpositions count as one edit each. For distance ≤ 2 this
 * equals unrestricted Damerau-Levenshtein; the two differ only at distance
 * 3+, which is outside our typosquat budget anyway.
 *
 * @param {string} a
 * @param {string} b
 * @returns {number}
 * @example
 * osaDistance('react', 'raect')  // 1  (adjacent transposition)
 * osaDistance('cat', 'cart')     // 1  (insertion)
 * osaDistance('ca', 'abc')       // 3  (true DL would be 2 — OSA's restriction)
 */
export function osaDistance(a, b) {
  return damerauLevenshtein(a, b).steps
}

/**
 * Find popular npm packages within `maxDistance` edits of `candidate`,
 * comparing on normalized forms (`lowercase + strip [._-]`). Names that
 * normalize identically to the candidate are excluded — those are moniker
 * collisions and are reported by the moniker layer.
 *
 * Results dedupe by normalized form (keeping the highest-ranked variant)
 * and sort by distance ascending, then by corpus rank ascending.
 *
 * @param {string} candidate
 * @param {string[]} corpus - popular package names, descending by rank
 * @param {{ maxDistance?: number, minCorpusLen?: number }} [opts]
 * @returns {NearMatch[]}
 * @example
 * findNearMatches('extoolkit', ['es-toolkit', 'react'])
 * // [{ name: 'es-toolkit', distance: 1 }]
 *
 * findNearMatches('estoolkit', ['es-toolkit'])
 * // []  (same normalized form — that's a moniker collision, not a near-match)
 */
export function findNearMatches(candidate, corpus, opts = {}) {
  if (typeof candidate !== 'string' || !candidate) return []
  if (!Array.isArray(corpus)) return []

  const maxDistance = opts.maxDistance ?? NEAR_MATCH_MAX_DISTANCE
  const minCorpusLen = opts.minCorpusLen ?? NEAR_MATCH_MIN_CORPUS_LEN

  const candBare = scopeStrip(candidate)
  if (candBare === null) return []
  const candNorm = normalize(candBare)
  if (!candNorm) return []

  // Dedupe by normalized form — keeps the highest-ranked corpus variant
  // (lowest index) when multiple names collapse (e.g. `object-assign` and
  // `object.assign` both normalize to `objectassign`).
  /** @type {Map<string, { name: string, distance: number, rank: number }>} */
  const bestByNorm = new Map()
  for (let i = 0; i < corpus.length; i++) {
    const pkg = corpus[i]
    if (typeof pkg !== 'string' || !pkg) continue
    if (pkg.length < minCorpusLen) continue
    const pkgNorm = normalize(pkg)
    if (pkgNorm === candNorm) continue
    if (Math.abs(pkgNorm.length - candNorm.length) > maxDistance) continue
    const editDistance = osaDistance(candNorm, pkgNorm)
    if (editDistance <= 0 || editDistance > maxDistance) continue
    const prev = bestByNorm.get(pkgNorm)
    if (!prev || i < prev.rank) {
      bestByNorm.set(pkgNorm, { name: pkg, distance: editDistance, rank: i })
    }
  }

  return [...bestByNorm.values()]
    .sort((a, b) => a.distance - b.distance || a.rank - b.rank)
    .map(({ name, distance: d }) => ({ name, distance: d }))
}

/**
 * Return the bare (post-scope) portion of a candidate, or null if the input
 * has an invalid structure (e.g., multi-slash like `@scope/foo/bar`).
 *
 * @param {string} name
 * @returns {string | null}
 * @private
 */
function scopeStrip(name) {
  if (!name.startsWith('@')) {
    if (name.includes('/')) return null
    return name
  }
  const slash = name.indexOf('/')
  if (slash < 0) return null
  const rest = name.slice(slash + 1)
  if (rest.includes('/')) return null
  return rest
}
