// npm moniker collision rule. When you publish a new unscoped package, the
// registry rejects names whose `lowercase + strip [._-]` form collides with
// an existing package. Source: https://blog.npmjs.org/post/168978377570/new-package-moniker-rules
//
// IMPORTANT — variant enumeration is *probabilistic*, not exhaustive. We
// enumerate one- and two-position separator insertions plus full-split
// forms. Pathological multi-insertion variants (`a.b-c_def`-style) and
// mixed-separator 3+ insertions can normalize to the same form but won't
// be queried. For authoritative pre-flight, use `npm publish --dry-run`.

import { attemptAsync } from 'massaman'

import {
  MONIKER_2INSERT_CAP_BASE_DEFAULT,
  MONIKER_2INSERT_CAP_BASE_EXHAUSTIVE,
  MONIKER_2INSERT_CAP_MAX_DEFAULT,
  MONIKER_2INSERT_CAP_MAX_EXHAUSTIVE,
  MONIKER_2INSERT_CAP_SCALE_DEFAULT,
  MONIKER_2INSERT_CAP_SCALE_EXHAUSTIVE,
} from './constants.mjs'

const SEPARATORS = ['-', '_', '.']

/**
 * Normalize a name the way npm's moniker collision check does: lowercase
 * and strip the punctuation chars `.`, `-`, `_`. Scoped names keep their
 * scope segment.
 *
 * **ASCII precondition.** This mirrors npm's server-side rule exactly, which
 * predates Unicode-aware normalization. Names with Unicode (e.g. `İ` → `i̇`
 * in some locales, `ß` → `ss`) are *not* canonicalized here; they're already
 * rejected upstream by `validate-npm-package-name`'s URL-safety check. If
 * non-ASCII slips through, equivalence may not match the registry's behavior.
 *
 * Returns `''` for non-string / empty input so callers can branch without
 * a separate guard.
 *
 * @param {unknown} name
 * @returns {string}
 * @example
 * normalize('Pico-Log')         // 'picolog'
 * normalize('js-on-stream')     // 'jsonstream'  (collides with `jsonstream`)
 * normalize('@Zac/Pico-Log')    // '@zac/picolog'
 * normalize(null)               // ''
 */
export function normalize(name) {
  if (typeof name !== 'string' || !name) return ''
  if (name.startsWith('@')) {
    const slash = name.indexOf('/')
    if (slash < 0) return name.toLowerCase()
    const scope = name.slice(0, slash + 1).toLowerCase()
    const bare = name
      .slice(slash + 1)
      .toLowerCase()
      .replace(/[._-]/g, '')
    return scope + bare
  }
  return name.toLowerCase().replace(/[._-]/g, '')
}

/**
 * Reject inputs containing whitespace or ASCII control bytes. The check is
 * written as a code-point loop rather than a regex with control chars so
 * the source file stays free of literal control bytes (which would also
 * trip oxlint's no-control-regex rule).
 *
 * @param {string} name
 * @returns {boolean}
 * @private
 */
function hasInvalidChars(name) {
  for (let i = 0; i < name.length; i++) {
    const code = name.charCodeAt(i)
    if (code <= 0x20 || code === 0x7f) return true
  }
  return false
}

/**
 * Generate names that share the candidate's normalized form. The caller
 * queries each variant against the registry to detect collisions. The
 * 2-insertion cap scales with name length so longer multi-morpheme names
 * (`reactnativenavigation` → `react-native-navigation`) reach their
 * realistic morpheme splits before the cap exhausts.
 *
 * Boundary guards reject inputs `validateName` would also reject — keeping
 * this function honest when called in isolation rather than relying on
 * upstream filtering.
 *
 * @param {string} name
 * @param {{ isExhaustive?: boolean }} [opts] - widens 2-insertion coverage
 * @returns {string[]}
 * @example
 * variants('picolog')           // ['pico-log', 'pico_log', 'pico.log', 'p-icolog', …]
 * variants('jsonstream').includes('js-on-stream')                    // true (canonical blog example)
 * variants('reactnativenavigation').includes('react-native-navigation') // true (long-name morpheme split)
 */
export function variants(name, opts = {}) {
  if (typeof name !== 'string' || !name) return []
  if (hasInvalidChars(name)) return []

  const lower = name.toLowerCase()
  // Scope-aware split — empty scope (`@/foo`), missing slash (`@me`), or
  // multi-slash (`@me/foo/bar`) all fail validateName upstream.
  let scope = ''
  let bareInput = lower
  if (lower.startsWith('@')) {
    const slash = lower.indexOf('/')
    if (slash < 0) return [] // `@me` — no slash
    if (slash === 1) return [] // `@/foo` — empty scope
    scope = lower.slice(0, slash + 1)
    bareInput = lower.slice(slash + 1)
    if (bareInput.includes('/')) return [] // `@me/foo/bar` — multi-slash
  }
  if (/^[-._]/.test(bareInput)) return [] // leading separator on the pkg segment
  const bare = bareInput.replace(/[._-]/g, '')
  if (!bare) return []

  const out = new Set()
  out.add(scope + bare)

  // 1-insertion: cover the most common moniker shape (`foo-bar` ↔ `foobar`).
  for (let i = 1; i < bare.length; i++) {
    for (const sep of SEPARATORS) {
      out.add(scope + bare.slice(0, i) + sep + bare.slice(i))
    }
  }

  // Full-split: `f-o-o-b-a-r` / `f_o_o_b_a_r` forms.
  if (bare.length > 1) {
    out.add(scope + bare.split('').join('-'))
    out.add(scope + bare.split('').join('_'))
  }

  // 2-insertion: catches multi-morpheme splits (`js-on-stream` ↔ `jsonstream`,
  // `react-native-navigation` ↔ `reactnativenavigation`). Iterates by gap size
  // ascending so common morpheme splits are reached first; the cap scales
  // with bare.length so longer names get a budget proportional to their
  // realistic insertion space.
  if (bare.length >= 4) {
    let added = 0
    const cap = capForLength(bare.length, opts.isExhaustive === true)
    outer: for (let gap = 1; gap < bare.length - 1; gap++) {
      for (let i = 1; i + gap < bare.length; i++) {
        const j = i + gap
        for (const sepA of SEPARATORS) {
          for (const sepB of SEPARATORS) {
            const candidate =
              scope + bare.slice(0, i) + sepA + bare.slice(i, j) + sepB + bare.slice(j)
            if (!out.has(candidate)) {
              out.add(candidate)
              added++
              if (added >= cap) break outer
            }
          }
        }
      }
    }
  }

  // Exclude the literal input — its existence is checked separately, not as
  // a moniker collision. We delete the original `name`, not `lower`, so the
  // bare lowercase form (a *different* string) survives for inputs like
  // `FooBar` where `foobar` is a real moniker collider to query.
  out.delete(name)
  return [...out]
}

/**
 * Compute the per-call 2-insertion variant cap. Scales linearly with name
 * length, bounded by a base floor and a hard ceiling.
 *
 * @param {number} bareLength
 * @param {boolean} isExhaustive
 * @returns {number}
 * @private
 */
function capForLength(bareLength, isExhaustive) {
  const base = isExhaustive ? MONIKER_2INSERT_CAP_BASE_EXHAUSTIVE : MONIKER_2INSERT_CAP_BASE_DEFAULT
  const scale = isExhaustive
    ? MONIKER_2INSERT_CAP_SCALE_EXHAUSTIVE
    : MONIKER_2INSERT_CAP_SCALE_DEFAULT
  const ceiling = isExhaustive
    ? MONIKER_2INSERT_CAP_MAX_EXHAUSTIVE
    : MONIKER_2INSERT_CAP_MAX_DEFAULT
  return Math.min(ceiling, Math.max(base, bareLength * scale))
}

/**
 * @typedef {Object} CollisionReport
 * @property {string[]} conflicts - variants the predicate confirmed as existing
 * @property {string[]} unverified - variants where the predicate threw; their
 *   collision status is unknown. Callers infer "collides" from
 *   `conflicts.length > 0`.
 */

const FIND_COLLISIONS_DEFAULT_CONCURRENCY = 12

/**
 * Given a candidate and an `exists(name) => Promise<boolean>` predicate,
 * return any moniker collisions found plus any variants whose lookup
 * threw. Callers should treat a non-empty `unverified` as "moniker check
 * incomplete" rather than ignoring it.
 *
 * Variant probes run with bounded concurrency (default 12) so a
 * network-backed `exists` doesn't unleash thousands of parallel requests
 * for long names with `--exhaustive`.
 *
 * @param {string} candidate
 * @param {(name: string) => Promise<boolean>} exists
 * @param {{ isExhaustive?: boolean, concurrency?: number }} [opts]
 * @returns {Promise<CollisionReport>}
 * @example
 * const taken = new Set(['js-on-stream'])
 * await findCollisions('jsonstream', async (name) => taken.has(name))
 * // { conflicts: ['js-on-stream'], unverified: [] }
 */
export async function findCollisions(candidate, exists, opts = {}) {
  const toCheck = variants(candidate, opts)
  const concurrency =
    Number.isInteger(opts.concurrency) && opts.concurrency > 0
      ? opts.concurrency
      : FIND_COLLISIONS_DEFAULT_CONCURRENCY
  const probes = await runBounded(toCheck, concurrency, async (variant) => ({
    variant,
    result: await attemptAsync(() => exists(variant)),
  }))
  // `result.ok` means the probe returned (didn't throw); `result.value`
  // means the predicate reported the variant as existing on the registry.
  // Both must be truthy to count as a confirmed collision.
  const conflicts = probes
    .filter(({ result }) => result.ok && result.value)
    .map(({ variant }) => variant)
  const unverified = probes.filter(({ result }) => !result.ok).map(({ variant }) => variant)
  return { conflicts, unverified }
}

/**
 * Run `task(item)` against every input with at most `concurrency` in
 * flight. Tiny structured-concurrency primitive — duplicated from
 * `registry.mjs:pool` so this module stays standalone for library
 * consumers who don't import the registry.
 *
 * @template T, U
 * @param {T[]} items
 * @param {number} concurrency
 * @param {(item: T) => Promise<U>} task
 * @returns {Promise<U[]>}
 * @private
 */
async function runBounded(items, concurrency, task) {
  const results = Array.from({ length: items.length })
  let next = 0
  async function worker() {
    while (true) {
      const index = next++
      if (index >= items.length) return
      results[index] = await task(items[index])
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, worker)
  await Promise.all(workers)
  return results
}
