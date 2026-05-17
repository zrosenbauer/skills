// Pure pipeline pieces for the npm-namer CLI. Network I/O lives in
// `check.mjs:main()` which sequences these in order; everything here is
// data-in / data-out so unit tests can cover the unverified-moniker path
// without touching the registry.

import { match } from 'massaman'

import { NEAR_MATCH_MAX_NEIGHBORS, VERDICT_UNVERIFIED_SAMPLE } from './constants.mjs'
import { variants as monikerVariants } from './moniker.mjs'
import { findNearMatches } from './near-match.mjs'
import { validateName } from './validate.mjs'

/**
 * @typedef {Object} VerdictAvailable
 * @property {'available'} status
 * @property {string} name
 * @property {Array<{name: string, distance: number}>} [nearMatches]
 *
 * @typedef {Object} VerdictTaken
 * @property {'taken'} status
 * @property {string} name
 *
 * @typedef {Object} VerdictMoniker
 * @property {'moniker'} status
 * @property {string} name
 * @property {string[]} conflicts
 *
 * @typedef {Object} VerdictUnverified
 * @property {'unverified'} status
 * @property {string} name
 * @property {string[]} unverified - sample (capped at VERDICT_UNVERIFIED_SAMPLE)
 * @property {number} unverifiedTotal
 *
 * @typedef {Object} VerdictInvalid
 * @property {'invalid'} status
 * @property {string} name
 * @property {string[]} reasons
 *
 * @typedef {Object} VerdictUnknown
 * @property {'unknown'} status
 * @property {string} name
 * @property {number} httpStatus
 * @property {string} [error]
 *
 * @typedef {VerdictAvailable | VerdictTaken | VerdictMoniker | VerdictUnverified | VerdictInvalid | VerdictUnknown} Verdict
 */

/**
 * @typedef {Object} MonikerProbe
 * @property {string[]} conflicts - existing names that share the candidate's normalized form
 * @property {string[]} unverified - variant names whose lookup didn't return taken/free
 */

/**
 * @typedef {Object} TriageResult
 * @property {string[]} valid - syntactically valid candidate names
 * @property {VerdictInvalid[]} invalid - already-formed invalid verdicts
 * @property {Set<string>} scoped - subset of `valid` whose names are `@scope/name`
 */

/** Frozen sentinel for candidates that weren't probed (e.g. scoped). */
const EMPTY_PROBE = Object.freeze({ conflicts: Object.freeze([]), unverified: Object.freeze([]) })

/**
 * Split candidates into syntactically-valid + already-rejected. The scoped
 * subset is tagged separately so later phases can skip moniker probing.
 *
 * @param {string[]} candidates
 * @returns {TriageResult}
 * @example
 * triage(['tiny-log', 'TinyLog', '@me/foo'])
 * // { valid: ['tiny-log', '@me/foo'], invalid: [{status:'invalid', ...}], scoped: Set { '@me/foo' } }
 */
export function triage(candidates) {
  const valid = []
  const invalid = []
  const scoped = new Set()
  for (const name of candidates) {
    const result = validateName(name)
    if (result.isValid) {
      valid.push(name)
      if (result.isScoped) scoped.add(name)
    } else {
      invalid.push({ status: 'invalid', name, reasons: result.reasons })
    }
  }
  return { valid, invalid, scoped }
}

/**
 * Select which unscoped, literal-free candidates should be moniker-probed
 * and enumerate their variants. Returns the variant list per candidate
 * plus the deduplicated set the caller should send to the registry.
 *
 * @param {{
 *   valid: string[],
 *   scoped: Set<string>,
 *   existence: Map<string, import('./registry.mjs').Existence>,
 *   isExhaustive: boolean,
 * }} input
 * @returns {{ variantsByName: Map<string, string[]>, allVariants: Set<string> }}
 * @example
 * selectMonikerCandidates({
 *   valid: ['picolog', '@me/scoped'],
 *   scoped: new Set(['@me/scoped']),
 *   existence: new Map([['picolog', { kind: 'free', name: 'picolog', status: 404 }]]),
 *   isExhaustive: false,
 * })
 * // { variantsByName: Map { 'picolog' → ['pico-log', 'pico_log', …] }, allVariants: Set { ... } }
 */
export function selectMonikerCandidates({ valid, scoped, existence, isExhaustive }) {
  const variantsByName = new Map()
  const allVariants = new Set()
  for (const name of valid) {
    if (scoped.has(name)) continue
    const literal = existence.get(name)
    if (literal?.kind !== 'free') continue
    const variants = monikerVariants(name, { isExhaustive })
    variantsByName.set(name, variants)
    for (const variant of variants) allVariants.add(variant)
  }
  return { variantsByName, allVariants }
}

/**
 * Bucket each candidate's variant results into `{ conflicts, unverified }`.
 * Unknown probes go to `unverified` so callers don't conflate "registry
 * couldn't say" with "registry confirmed free."
 *
 * @param {{
 *   variantsByName: Map<string, string[]>,
 *   variantResults: import('./registry.mjs').Existence[],
 * }} input
 * @returns {Map<string, MonikerProbe>}
 * @example
 * assembleMonikerProbes({
 *   variantsByName: new Map([['picolog', ['pico-log', 'pico_log']]]),
 *   variantResults: [
 *     { kind: 'taken', name: 'pico-log', status: 200 },
 *     { kind: 'unknown', name: 'pico_log', status: 429 },
 *   ],
 * })
 * // Map { 'picolog' → { conflicts: ['pico-log'], unverified: ['pico_log'] } }
 */
export function assembleMonikerProbes({ variantsByName, variantResults }) {
  const byVariant = new Map(variantResults.map((result) => [result.name, result]))
  const probes = new Map()
  for (const [name, variants] of variantsByName) {
    const conflicts = []
    const unverified = []
    for (const variant of variants) {
      const kind = byVariant.get(variant)?.kind
      if (kind === 'taken') conflicts.push(variant)
      else if (kind === 'unknown') unverified.push(variant)
    }
    probes.set(name, { conflicts, unverified })
  }
  return probes
}

/**
 * Build the final verdict map by merging triage results, registry
 * existence, and moniker probes.
 *
 * @param {{
 *   valid: string[],
 *   invalid: VerdictInvalid[],
 *   existence: Map<string, import('./registry.mjs').Existence>,
 *   monikerProbes: Map<string, MonikerProbe>,
 * }} input
 * @returns {Map<string, Verdict>}
 * @example
 * decide({
 *   valid: ['picolog'],
 *   invalid: [],
 *   existence: new Map([['picolog', { kind: 'free', name: 'picolog', status: 404 }]]),
 *   monikerProbes: new Map([['picolog', { conflicts: [], unverified: ['pico_log'] }]]),
 * })
 * // Map { 'picolog' → { status: 'unverified', name: 'picolog', unverified: ['pico_log'], unverifiedTotal: 1 } }
 */
export function decide({ valid, invalid, existence, monikerProbes }) {
  const verdicts = new Map(invalid.map((verdict) => [verdict.name, verdict]))
  for (const name of valid) {
    const literal = existence.get(name)
    // valid candidates must have an existence entry — the upstream phase
    // covers exactly `valid`. If this fires, the invariant broke.
    if (!literal) throw new Error(`decide: missing existence result for ${name}`)
    verdicts.set(
      name,
      decideOne({ name, existence: literal, probe: monikerProbes.get(name) ?? EMPTY_PROBE })
    )
  }
  return verdicts
}

/**
 * Map one candidate's existence + moniker probe into a single Verdict.
 * Pure — matches exhaustively on `existence.kind`. Within `free`, the
 * verdict is `moniker` (definitive collision), `unverified` (some variant
 * probes failed and no collisions were definitively found), or `available`
 * (all variant probes completed cleanly).
 *
 * @param {{ name: string, existence: import('./registry.mjs').Existence, probe: MonikerProbe }} input
 * @returns {Verdict}
 * @example
 * decideOne({
 *   name: 'extoolkit',
 *   existence: { kind: 'free', name: 'extoolkit', status: 404 },
 *   probe: { conflicts: [], unverified: [] },
 * })
 * // { status: 'available', name: 'extoolkit' }
 */
export function decideOne({ name, existence, probe }) {
  return match(existence)
    .with({ kind: 'taken' }, () => ({ status: 'taken', name }))
    .with({ kind: 'unknown' }, (result) => ({
      status: 'unknown',
      name,
      httpStatus: result.status,
      ...(result.error !== undefined && { error: result.error }),
    }))
    .with({ kind: 'free' }, () => {
      if (probe.conflicts.length > 0) return { status: 'moniker', name, conflicts: probe.conflicts }
      if (probe.unverified.length > 0) {
        return {
          status: 'unverified',
          name,
          unverified: probe.unverified.slice(0, VERDICT_UNVERIFIED_SAMPLE),
          unverifiedTotal: probe.unverified.length,
        }
      }
      return { status: 'available', name }
    })
    .exhaustive()
}

/**
 * Annotate `available` verdicts with up to `NEAR_MATCH_MAX_NEIGHBORS`
 * typosquat-shaped neighbors from the popular-names corpus. The name is
 * still publishable; this is a soft warning the user can override.
 *
 * @param {{
 *   verdicts: Map<string, Verdict>,
 *   candidates: string[],
 *   corpus: string[],
 *   maxDistance: number,
 * }} input
 * @returns {Map<string, Verdict>}
 * @example
 * flagTyposquats({
 *   verdicts: new Map([['extoolkit', { status: 'available', name: 'extoolkit' }]]),
 *   candidates: ['extoolkit'],
 *   corpus: ['es-toolkit'],
 *   maxDistance: 2,
 * })
 * // Map { 'extoolkit' → { status: 'available', name: 'extoolkit', nearMatches: [{ name: 'es-toolkit', distance: 1 }] } }
 */
export function flagTyposquats({ verdicts, candidates, corpus, maxDistance }) {
  const annotated = new Map(verdicts)
  for (const name of candidates) {
    const verdict = annotated.get(name)
    if (verdict?.status !== 'available') continue
    const matches = findNearMatches(name, corpus, { maxDistance })
    if (matches.length > 0) {
      annotated.set(name, { ...verdict, nearMatches: matches.slice(0, NEAR_MATCH_MAX_NEIGHBORS) })
    }
  }
  return annotated
}
