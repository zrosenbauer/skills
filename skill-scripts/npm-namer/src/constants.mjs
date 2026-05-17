// Tunable defaults for the npm-namer pipeline. Centralized so docs, the CLI,
// and tests can reference a single source of truth.

/** Default cap on candidates checked per run. CLI: --limit. */
export const DEFAULT_LIMIT = 50

/** Default parallel HEAD requests against the registry. CLI: --concurrency. */
export const DEFAULT_CONCURRENCY = 12

/** Network timeout per registry HEAD request (ms). */
export const DEFAULT_REGISTRY_TIMEOUT_MS = 8000

/** npm registry base URL; overridable via NPM_REGISTRY_URL env. */
export const DEFAULT_REGISTRY_BASE = process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org'

/** Moniker 2-insertion cap, scaled per `bare.length` so longer names still
 * reach mid-string morpheme splits (e.g. `quick-json-parser` at gap=5,
 * `react-native-navigation` at gap=6). Variants = pairs × 9 separator combos. */
export const MONIKER_2INSERT_CAP_BASE_DEFAULT = 250
export const MONIKER_2INSERT_CAP_SCALE_DEFAULT = 40
export const MONIKER_2INSERT_CAP_MAX_DEFAULT = 1500

/** Moniker 2-insertion cap (--exhaustive): wider coverage, slower. */
export const MONIKER_2INSERT_CAP_BASE_EXHAUSTIVE = 600
export const MONIKER_2INSERT_CAP_SCALE_EXHAUSTIVE = 120
export const MONIKER_2INSERT_CAP_MAX_EXHAUSTIVE = 5000

/** Default edit-distance threshold for near-match warnings. CLI: --near-distance. */
export const NEAR_MATCH_MAX_DISTANCE = 2

/** Minimum corpus-name length for near-match comparison. Below 3 the false
 * positive rate spikes. Keeps popular 3-char names (`zod`, `ajv`, `tsx`) in
 * scope; 2-char names like `qs` are intentionally below this floor. */
export const NEAR_MATCH_MIN_CORPUS_LEN = 3

/** Max number of near-match neighbors surfaced per available candidate. */
export const NEAR_MATCH_MAX_NEIGHBORS = 3

/** Shortlist size in the "available + clean" group printed at the end. */
export const SHORTLIST_LIMIT = 10

/** Max sample size in the `unverified` field on a verdict. Full count is
 * preserved in `unverifiedTotal`. Without truncation, a hammered registry
 * returning 429 across hundreds of variants would dump kilobytes of
 * useless variant names per candidate into --json output. */
export const VERDICT_UNVERIFIED_SAMPLE = 10
