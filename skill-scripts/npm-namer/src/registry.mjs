// npm registry existence check + bounded-concurrency request pool.
//
// `checkOne` returns a discriminated `Existence` value (Taken / Free /
// Unknown) so callers can pattern-match instead of dispatching on
// `boolean | null`. The pool runner is a tiny structured-concurrency
// primitive — no external scheduler needed for the request volumes we hit.

import {
  DEFAULT_CONCURRENCY,
  DEFAULT_REGISTRY_BASE,
  DEFAULT_REGISTRY_TIMEOUT_MS,
} from './constants.mjs'

/**
 * @typedef {Object} Taken
 * @property {'taken'} kind
 * @property {string} name
 * @property {200} status
 *
 * @typedef {Object} Free
 * @property {'free'} kind
 * @property {string} name
 * @property {404} status
 *
 * @typedef {Object} Unknown
 * @property {'unknown'} kind
 * @property {string} name
 * @property {number} status - 0 when the network failed outright
 * @property {string} [error] - present when status === 0
 *
 * @typedef {Taken | Free | Unknown} Existence
 */

/** @returns {Taken} */
const taken = (name) => ({ kind: 'taken', name, status: 200 })
/** @returns {Free} */
const free = (name) => ({ kind: 'free', name, status: 404 })
/** @returns {Unknown} */
const unknown = (name, status, error) =>
  error === undefined ? { kind: 'unknown', name, status } : { kind: 'unknown', name, status, error }

/**
 * Check whether a single name exists on the registry. Never throws — every
 * outcome (200 / 404 / other / network error) maps to a discriminated
 * `Existence` value.
 *
 * @param {string} name
 * @param {{ base?: string, timeoutMs?: number, fetchImpl?: typeof fetch }} [opts]
 * @returns {Promise<Existence>}
 * @example
 * await checkOne('react')        // { kind: 'taken', name: 'react', status: 200 }
 * await checkOne('novel-xyz')    // { kind: 'free',  name: 'novel-xyz', status: 404 }
 */
export async function checkOne(name, opts = {}) {
  const base = opts.base ?? DEFAULT_REGISTRY_BASE
  const timeoutMs = opts.timeoutMs ?? DEFAULT_REGISTRY_TIMEOUT_MS
  const fetchImpl = opts.fetchImpl ?? fetch

  const url = `${base}/${encodeURIComponent(name)}`
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetchImpl(url, { method: 'HEAD', signal: ctrl.signal })
    clearTimeout(timer)
    // A custom fetchImpl can return non-Response shapes (e.g. a stream).
    // Guard the status read so an unusable response surfaces as `unknown`
    // rather than emitting `{status: undefined}` and violating the typedef.
    const status = res?.status
    if (!Number.isInteger(status)) {
      return unknown(name, 0, 'fetch returned response without numeric status')
    }
    if (status === 200) return taken(name)
    if (status === 404) return free(name)
    return unknown(name, status)
  } catch (e) {
    clearTimeout(timer)
    return unknown(name, 0, e?.message ?? String(e))
  }
}

/**
 * Bounded-concurrency pool runner. Runs `tasks` (functions returning Promises)
 * with at most `concurrency` in-flight at once. Preserves input order.
 *
 * @template T
 * @param {Array<() => Promise<T>>} tasks
 * @param {number} [concurrency]
 * @returns {Promise<T[]>}
 * @example
 * const tasks = urls.map((url) => () => fetch(url))
 * const responses = await pool(tasks, 8)  // at most 8 in flight, results in input order
 */
export async function pool(tasks, concurrency = DEFAULT_CONCURRENCY) {
  // Negative or non-integer concurrency is a caller bug — fail loud rather
  // than running nothing or producing a results array with holes.
  if (concurrency != null && (!Number.isInteger(concurrency) || concurrency < 0)) {
    throw new TypeError(`pool: concurrency must be a non-negative integer (got ${concurrency})`)
  }
  // `0` is treated as "use default" — the parseInt path in check.mjs can
  // surface 0 when the user passes `--concurrency 0`, which we read as
  // "let the library pick" rather than "do not run".
  const effectiveConcurrency =
    Number.isInteger(concurrency) && concurrency > 0 ? concurrency : DEFAULT_CONCURRENCY
  const results = Array.from({ length: tasks.length })
  let next = 0
  async function worker() {
    while (true) {
      const i = next++
      if (i >= tasks.length) return
      results[i] = await tasks[i]()
    }
  }
  const workers = Array.from({ length: Math.min(effectiveConcurrency, tasks.length) }, worker)
  await Promise.all(workers)
  return results
}

/**
 * Check existence for a batch of names with bounded concurrency. Results
 * are returned in input order regardless of completion order.
 *
 * @param {string[]} names
 * @param {{ concurrency?: number, base?: string, timeoutMs?: number, fetchImpl?: typeof fetch }} [opts]
 * @returns {Promise<Existence[]>}
 * @example
 * await checkMany(['react', 'vue', 'novel-xyz'], { concurrency: 4 })
 * // [{ kind: 'taken', name: 'react', … }, { kind: 'taken', name: 'vue', … }, { kind: 'free', name: 'novel-xyz', … }]
 */
export async function checkMany(names, opts = {}) {
  const tasks = names.map((name) => () => checkOne(name, opts))
  return pool(tasks, opts.concurrency ?? DEFAULT_CONCURRENCY)
}
