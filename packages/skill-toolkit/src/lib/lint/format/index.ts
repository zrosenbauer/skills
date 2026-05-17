import { match } from 'massaman'

import { formatJson } from './json.js'
import { formatPretty } from './pretty.js'
import type { FormatInput, Formatter, LintFormat } from './types.js'
import { formatYaml } from './yaml.js'

export type { FormatInput, Formatter, LintFormat } from './types.js'
export { formatJson } from './json.js'
export { formatPretty } from './pretty.js'
export { formatYaml } from './yaml.js'

/**
 * Dispatch a lint report to the requested formatter. Exhaustive
 * match over `LintFormat` so adding a new format fails the build
 * here until a case is wired in.
 */
export function formatResults(format: LintFormat, input: FormatInput): string {
  return match(format)
    .with('pretty', () => formatPretty(input))
    .with('json', () => formatJson(input))
    .with('yaml', () => formatYaml(input))
    .exhaustive()
}

/**
 * Map from format name to its formatter. Useful when a caller already
 * has the format pinned and wants to skip the dispatcher.
 */
export const FORMATTERS: Record<LintFormat, Formatter> = {
  pretty: formatPretty,
  json: formatJson,
  yaml: formatYaml,
}
