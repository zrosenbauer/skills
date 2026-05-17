// Deterministic permutation engine. Given seed words (and optional prefix /
// suffix lists), produce candidate package names by joining, prefixing,
// suffixing, and re-separating. The agent feeds in its brainstormed seeds;
// this expands them into the search space without hallucinating new tokens.

const DEFAULT_PREFIXES = [
  'tiny',
  'mini',
  'pico',
  'nano',
  'lite',
  'micro',
  'fast',
  'lean',
  'quick',
  'slim',
  'pure',
  'super',
  'ultra',
  'meta',
  'auto',
  'smart',
]

const DEFAULT_SUFFIXES = [
  'js',
  'ts',
  'lib',
  'kit',
  'core',
  'pro',
  'cli',
  'tools',
  'utils',
  'forge',
  'smith',
  'craft',
  'lab',
  'box',
  'engine',
  'studio',
]

const CONNECTORS = ['', '-']

/**
 * @typedef {Object} PermuteOptions
 * @property {string[]} [prefixes] - override default prefix list
 * @property {string[]} [suffixes] - override default suffix list
 * @property {string[]} [connectors] - separators between parts (default: '', '-')
 * @property {boolean} [shouldIncludeUnderscore] - also use '_' as a connector (default: false)
 * @property {boolean} [shouldCombineTwoSeeds] - join pairs of seeds (default: true)
 * @property {string} [scope] - if set, also emit `@scope/<name>` variants
 */

/**
 * Generate package name candidates from seed words.
 *
 * For seeds=['tiny','log'], produces things like:
 *   log, tiny, tinylog, tiny-log, mini-log, nano-log, log-cli, logjs, ...
 *
 * Output is deduplicated; order is roughly: bare seeds, two-seed combos,
 * prefix+seed, seed+suffix. Caller applies any limit.
 *
 * @param {string[]} seeds
 * @param {PermuteOptions} [opts]
 * @returns {string[]}
 * @example
 * permute(['log'])                              // ['log', 'tiny-log', 'tinylog', …]
 * permute(['log'], { scope: '@me' })            // ['@me/log', '@me/tiny-log', …]
 * permute(['log'], { prefixes: ['ultra'] })     // ['log', 'ultra-log', 'ultralog', …]
 */
export function permute(seeds, opts = {}) {
  if (!Array.isArray(seeds) || seeds.length === 0) return []

  const prefixes = opts.prefixes ?? DEFAULT_PREFIXES
  const suffixes = opts.suffixes ?? DEFAULT_SUFFIXES
  const connectors =
    opts.connectors ?? (opts.shouldIncludeUnderscore ? [...CONNECTORS, '_'] : CONNECTORS)
  const shouldCombineTwoSeeds = opts.shouldCombineTwoSeeds !== false
  const scope = opts.scope

  const cleaned = seeds
    .map((s) => String(s).trim().toLowerCase())
    .filter((s) => s.length > 0 && /^[a-z0-9]+$/.test(s))

  const out = new Set()

  for (const s of cleaned) out.add(s)

  if (shouldCombineTwoSeeds) {
    for (const a of cleaned) {
      for (const b of cleaned) {
        if (a === b) continue
        for (const sep of connectors) out.add(a + sep + b)
      }
    }
  }

  for (const p of prefixes) {
    for (const s of cleaned) {
      if (p === s) continue
      for (const sep of connectors) out.add(p + sep + s)
    }
  }

  for (const s of cleaned) {
    for (const sf of suffixes) {
      if (sf === s) continue
      for (const sep of connectors) out.add(s + sep + sf)
    }
  }

  let names = [...out]
  if (scope) names = names.map((n) => `${scope}/${n}`)
  return names
}

/**
 * Score a candidate name for ranking. Lower is better.
 *   - shorter names rank lower (preferred)
 *   - hyphenated names rank lower than concatenated (more readable)
 *   - names containing a seed rank lower (anchor relevance)
 *
 * @param {string} name
 * @param {string[]} seeds
 * @returns {number}
 * @example
 * score('log')                       // 3
 * score('tiny-log', ['log'])         // 8 - 2 (hyphen) - 3 (contains seed) = 3
 * score('logger_pro', ['log'])       // 10 + 1 (underscore) - 3 (contains seed) = 8
 */
export function score(name, seeds = []) {
  const lower = name.toLowerCase()
  let result = lower.length
  if (lower.includes('-')) result -= 2
  if (lower.includes('_')) result += 1
  for (const seed of seeds) {
    if (lower.includes(seed.toLowerCase())) {
      result -= 3
      break
    }
  }
  return result
}

export { DEFAULT_PREFIXES, DEFAULT_SUFFIXES }
