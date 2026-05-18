import { stringify } from 'yaml'

import { buildReport } from './json.js'
import type { Formatter } from './types.js'

/**
 * Render lint results as YAML. Uses the same `SerializedLintReport`
 * shape as `formatJson` so the two formats are wire-compatible —
 * `--format=json | yq -P` and `--format=yaml` produce equivalent data.
 */
export const formatYaml: Formatter = ({
  skillResults,
  agentResults,
  totals,
  minSeverity,
  showFix,
}) => {
  const report = buildReport({ skillResults, agentResults, totals, minSeverity, showFix })
  return stringify(report)
}
