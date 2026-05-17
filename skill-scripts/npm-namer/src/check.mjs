#!/usr/bin/env node
// CLI entry for the npm-namer skill. Orchestrates the pure pipeline phases
// from `pipeline.mjs` against the network. The pipeline:
//   triage → probeRegistry → selectMonikerCandidates → checkMany(variants)
//          → assembleMonikerProbes → decide → flagTyposquats
// `main` threads named intermediate values through; pure transforms live
// in pipeline.mjs and are unit-tested independently.

import { readFileSync } from 'node:fs'
import { parseArgs } from 'node:util'

import { err, isErr, isOk, ok } from 'massaman'
import { match, P } from 'massaman'

import {
  DEFAULT_CONCURRENCY,
  DEFAULT_LIMIT,
  NEAR_MATCH_MAX_DISTANCE,
  SHORTLIST_LIMIT,
} from './constants.mjs'
import { loadCorpus } from './corpus.mjs'
import { permute, score } from './permute.mjs'
import {
  assembleMonikerProbes,
  decide,
  flagTyposquats,
  selectMonikerCandidates,
  triage,
} from './pipeline.mjs'
import { checkMany } from './registry.mjs'

const USAGE = `npm-namer — find available npm package names

Usage:
  node check.mjs [options] [seeds...]

Modes:
  (seeds given)        Permute the seeds, check each candidate.
  --check <names...>   Skip permutation; check the given names directly.
  --stdin              Read names from stdin (one per line); skip permutation.
  --file <path>        Read names from file (one per line); skip permutation.

Options:
  --limit <n>          Max candidates to check (default: ${DEFAULT_LIMIT}).
  --concurrency <n>    Parallel registry requests (default: ${DEFAULT_CONCURRENCY}).
  --scope <@scope>     Generate scoped variants (default: unscoped).
  --no-moniker         Skip moniker collision check (the npm publish-time rule).
  --exhaustive         Wider 2-insertion moniker variants (slower, more thorough).
  --no-near-match      Skip typosquat-style similarity check against popular packages.
  --near-distance <n>  Max edit distance for near-match warnings (default: ${NEAR_MATCH_MAX_DISTANCE}).
  --json               Output JSON instead of text.
  --help, -h           Show this help.

Names that look like options (leading hyphen) must be passed after a literal
\`--\` separator:
  node check.mjs --check -- -foo .bar _baz

Verdicts:
  ✓ available    free on registry + no moniker collision (may carry near-match warning)
  ⚠ moniker      free literally but normalized form collides — npm publish will reject
  ⚠ unverified   free literally but moniker check incomplete (some variants couldn't be probed)
  ✗ taken        the exact name is published
  ✗ invalid      fails syntactic rules
  ? unknown      registry returned a non-200/404 status for the literal name

Limitation:
  The moniker check enumerates 1- and 2-separator variants. 3+ morpheme
  splits (e.g. \`eslint-plugin-react-hooks\` vs \`eslintpluginreacthooks\`)
  are NOT covered even with --exhaustive. For authoritative pre-flight on
  multi-morpheme names, run \`npm publish --dry-run\`.

Examples:
  node check.mjs tiny log
  node check.mjs --check picolog microlog jslog
  echo "picolog" | node check.mjs --stdin
  node check.mjs --scope @me logger fast
`

const SYMBOLS = {
  available: '✓',
  taken: '✗',
  moniker: '⚠',
  unverified: '⚠',
  invalid: '✗',
  unknown: '?',
}
const DIVIDER = '─'.repeat(64)

/**
 * @typedef {Object} Config
 * @property {string[]} positionals
 * @property {boolean} shouldSkipPermute
 * @property {string[]} inputNames
 * @property {number} limit
 * @property {number} concurrency
 * @property {string} [scope]
 * @property {boolean} isMonikerEnabled
 * @property {boolean} isExhaustive
 * @property {boolean} isNearMatchEnabled
 * @property {number} nearDistance
 * @property {boolean} shouldOutputJson
 * @property {boolean} shouldShowHelp
 */

async function main() {
  const config = parseCli(process.argv.slice(2))
  if (config.shouldShowHelp) {
    process.stdout.write(USAGE)
    return
  }

  const prepared = prepareCandidates(config)
  if (isErr(prepared)) return die(prepared.error.message)
  const { seeds, candidates, consideredCount } = prepared.value

  const corpus = config.isNearMatchEnabled ? loadCorpus() : err(new Error('disabled'))
  const hasCorpus = isOk(corpus)

  const { valid, invalid, scoped } = triage(candidates)
  const existence = await probeRegistry(valid, config)
  const monikerProbes = config.isMonikerEnabled
    ? await probeMonikerCollisions({ valid, scoped, existence, config })
    : new Map()

  const decided = decide({ valid, invalid, existence, monikerProbes })
  const annotated = hasCorpus
    ? flagTyposquats({
        verdicts: decided,
        candidates,
        corpus: corpus.value.names,
        maxDistance: config.nearDistance,
      })
    : decided

  const output = shapeOutput({
    mode: config.shouldSkipPermute ? 'check' : 'find',
    seeds,
    consideredCount,
    candidates,
    verdicts: annotated,
    isMonikerEnabled: config.isMonikerEnabled,
    isExhaustive: config.isExhaustive,
    isNearMatchEnabled: config.isNearMatchEnabled && hasCorpus,
  })

  process.stdout.write(
    config.shouldOutputJson ? `${JSON.stringify(output, null, 2)}\n` : renderText(output)
  )
}

/**
 * Parse CLI argv into a structured config. Throws nothing — invalid CLI
 * usage surfaces later as an empty input or a `prepareCandidates` error.
 *
 * @param {string[]} argv
 * @returns {Config}
 * @private
 */
function parseCli(argv) {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      check: { type: 'boolean', default: false },
      stdin: { type: 'boolean', default: false },
      file: { type: 'string' },
      limit: { type: 'string', default: String(DEFAULT_LIMIT) },
      concurrency: { type: 'string', default: String(DEFAULT_CONCURRENCY) },
      scope: { type: 'string' },
      'no-moniker': { type: 'boolean', default: false },
      exhaustive: { type: 'boolean', default: false },
      'no-near-match': { type: 'boolean', default: false },
      'near-distance': { type: 'string', default: String(NEAR_MATCH_MAX_DISTANCE) },
      json: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  })

  return {
    shouldShowHelp: values.help,
    positionals,
    shouldSkipPermute: values.check || values.stdin || Boolean(values.file),
    inputNames: gatherInputNames(values),
    limit: parseIntOr(values.limit, DEFAULT_LIMIT),
    concurrency: parseIntOr(values.concurrency, DEFAULT_CONCURRENCY),
    scope: values.scope,
    isMonikerEnabled: !values['no-moniker'],
    isExhaustive: values.exhaustive,
    isNearMatchEnabled: !values['no-near-match'],
    nearDistance: parseIntOr(values['near-distance'], NEAR_MATCH_MAX_DISTANCE),
    shouldOutputJson: values.json,
  }
}

function gatherInputNames(values) {
  if (values.stdin) return readListFromStdin()
  if (values.file) {
    return readFileSync(values.file, 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  }
  return []
}

/**
 * Read newline-separated names from stdin. Returns `[]` only when nothing
 * is piped (interactive TTY). Real read failures bubble — silent catches
 * mask data-loss bugs we'd rather see than swallow.
 *
 * @returns {string[]}
 * @private
 */
function readListFromStdin() {
  if (process.stdin.isTTY) return []
  return readFileSync(0, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function parseIntOr(raw, fallback) {
  const parsed = parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

/**
 * Resolve the candidate list from the CLI inputs. In `check` mode the
 * positionals + stdin/file lines are the candidates; in `find` mode the
 * positionals are seeds that we permute. Either path ranks and trims to
 * `config.limit`.
 *
 * `consideredCount` is the total candidate space before the `--limit`
 * trim — input count in check mode, permutation count in find mode.
 *
 * @param {Config} config
 * @returns {import('massaman').Result<{seeds: string[], candidates: string[], consideredCount: number}, Error>}
 * @private
 */
function prepareCandidates(config) {
  if (config.shouldSkipPermute) {
    const supplied = [...config.inputNames, ...config.positionals]
      .map((name) => name.trim())
      .filter(Boolean)
    if (supplied.length === 0) {
      return err(new Error('no names provided — pass names as args, via --stdin, or via --file'))
    }
    const deduped = [...new Set(supplied)]
    return ok({
      seeds: [],
      candidates: trim(deduped, [], config.limit),
      consideredCount: deduped.length,
    })
  }

  if (config.positionals.length === 0) {
    return err(new Error('no seeds provided. See --help.'))
  }
  const seeds = config.positionals
  const permutedCandidates = [...new Set(permute(seeds, { scope: config.scope }))]
  if (permutedCandidates.length === 0) {
    // permute() rejects non-alphanumeric tokens. If every seed got filtered,
    // give the user actionable feedback instead of a silent zero-result run.
    // Use `-- ` before the names so the leading-hyphen / leading-dot cases
    // make it through parseArgs as positionals.
    return err(
      new Error(
        `all seeds were filtered (seeds must be alphanumeric — try ` +
          `\`--check -- ${seeds.join(' ')}\` to check them as literal names instead)`
      )
    )
  }
  return ok({
    seeds,
    candidates: trim(permutedCandidates, seeds, config.limit),
    consideredCount: permutedCandidates.length,
  })
}

function trim(candidates, seeds, limit) {
  const ranked = [...candidates].sort((a, b) => score(a, seeds) - score(b, seeds))
  return ranked.length > limit ? ranked.slice(0, limit) : ranked
}

/**
 * HEAD each name in parallel against the npm registry. Returns a lookup
 * map keyed by name; values are discriminated `Existence` values.
 *
 * @param {string[]} names
 * @param {{ concurrency: number }} config
 * @returns {Promise<Map<string, import('./registry.mjs').Existence>>}
 * @private
 */
async function probeRegistry(names, config) {
  const results = await checkMany(names, { concurrency: config.concurrency })
  return new Map(results.map((result) => [result.name, result]))
}

/**
 * Network-bound half of the moniker check. The pure selection + assembly
 * lives in pipeline.mjs; this function bridges them with the registry
 * round-trip in the middle.
 *
 * @param {{
 *   valid: string[],
 *   scoped: Set<string>,
 *   existence: Map<string, import('./registry.mjs').Existence>,
 *   config: { isExhaustive: boolean, concurrency: number },
 * }} input
 * @returns {Promise<Map<string, import('./pipeline.mjs').MonikerProbe>>}
 * @private
 */
async function probeMonikerCollisions({ valid, scoped, existence, config }) {
  const { variantsByName, allVariants } = selectMonikerCandidates({
    valid,
    scoped,
    existence,
    isExhaustive: config.isExhaustive,
  })
  const variantResults = await checkMany([...allVariants], { concurrency: config.concurrency })
  return assembleMonikerProbes({ variantsByName, variantResults })
}

function shapeOutput({
  mode,
  seeds,
  consideredCount,
  candidates,
  verdicts,
  isMonikerEnabled,
  isExhaustive,
  isNearMatchEnabled,
}) {
  return {
    mode,
    seeds,
    considered: consideredCount,
    checked: candidates.length,
    isMonikerEnabled,
    isExhaustive,
    isNearMatchEnabled,
    results: candidates.map((name) => verdicts.get(name)).filter(Boolean),
  }
}

function renderText(output) {
  const header =
    output.mode === 'find'
      ? [`seeds:    ${output.seeds.join(', ')}`, `considered: ${output.considered} candidates`]
      : []
  header.push(
    `checked:  ${output.checked} candidates`,
    output.isMonikerEnabled
      ? `moniker:  ${output.isExhaustive ? 'exhaustive' : 'standard'} collision check`
      : 'moniker:  skipped (--no-moniker)',
    output.isNearMatchEnabled
      ? 'near:     typosquat similarity against popular packages'
      : 'near:     skipped (--no-near-match)',
    DIVIDER
  )

  const rows = output.results.map(renderVerdictLine)
  const winners = output.results.filter((verdict) => verdict.status === 'available')
  const clean = winners.filter((verdict) => !verdict.nearMatches?.length)
  const risky = winners.filter((verdict) => verdict.nearMatches?.length)
  const unverified = output.results.filter((verdict) => verdict.status === 'unverified')

  const cleanLabel = output.isMonikerEnabled
    ? 'Available + moniker-clear + no typosquat shape'
    : 'Available + no typosquat shape (moniker check skipped)'

  const sections = [
    renderShortlist(cleanLabel, clean, (winner) => `  • ${winner.name}`),
    renderShortlist(
      'Available but typosquat-shaped',
      risky,
      (winner) => `  • ${winner.name}  ~  ${formatNearMatches(winner.nearMatches)}`,
      ' — publishable, but close to popular packages'
    ),
    renderShortlist(
      'Moniker check incomplete',
      unverified,
      (verdict) =>
        `  • ${verdict.name}  (${verdict.unverifiedTotal} variant${verdict.unverifiedTotal === 1 ? '' : 's'} not probed)`,
      ' — try again or run `npm publish --dry-run`'
    ),
  ].filter(Boolean)

  const footer =
    clean.length === 0 && risky.length === 0 && unverified.length === 0
      ? [DIVIDER, 'No available + moniker-clear candidates. Try broader seeds or --scope.']
      : []

  return [...header, ...rows, ...sections, ...footer].join('\n') + '\n'
}

function renderVerdictLine(verdict) {
  const tag = `${SYMBOLS[verdict.status]} ${verdict.status}`.padEnd(14)
  const name = verdict.name.padEnd(28)
  const detail = match(verdict)
    .with({ status: 'taken' }, () => '')
    .with({ status: 'moniker' }, (result) => `collides with: ${result.conflicts.join(', ')}`)
    .with(
      { status: 'unverified' },
      (result) =>
        `moniker incomplete: ${result.unverifiedTotal} variant${result.unverifiedTotal === 1 ? '' : 's'} not probed`
    )
    .with({ status: 'invalid' }, (result) => `(${result.reasons.join('; ')})`)
    .with(
      { status: 'unknown' },
      (result) => `(http ${result.httpStatus}${result.error ? `: ${result.error}` : ''})`
    )
    .with(
      { status: 'available', nearMatches: P.array() },
      (result) => `near: ${formatNearMatches(result.nearMatches)}`
    )
    .with({ status: 'available' }, () => '')
    .exhaustive()
  return `${tag}${name}${detail}`
}

function formatNearMatches(matches) {
  return matches.map((neighbor) => `${neighbor.name} (d=${neighbor.distance})`).join(', ')
}

function renderShortlist(label, items, lineFn, suffix = '') {
  if (items.length === 0) return null
  const header = `${DIVIDER}\n${label} (${items.length})${suffix}:`
  const body = items.slice(0, SHORTLIST_LIMIT).map(lineFn).join('\n')
  const more =
    items.length > SHORTLIST_LIMIT ? `\n  … and ${items.length - SHORTLIST_LIMIT} more` : ''
  return `${header}\n${body}${more}`
}

function die(message) {
  process.stderr.write(`error: ${message}\n\nRun --help for usage.\n`)
  process.exit(2)
}

main().catch((error) => {
  process.stderr.write(`error: ${error?.stack ?? error}\n`)
  process.exit(1)
})
