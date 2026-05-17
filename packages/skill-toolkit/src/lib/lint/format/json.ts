import type { Finding, Severity, SkillLintResult } from '../types.js'
import type { Formatter } from './types.js'

const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warn: 1, info: 2 }

/**
 * Machine-readable shape emitted by `formatJson` / `formatYaml`. Kept
 * stable across formats so consumers can swap `--format=json` for
 * `--format=yaml` without reparsing.
 */
interface SerializedLintReport {
  summary: { errors: number; warns: number; infos: number }
  skills: SerializedSkill[]
}

interface SerializedSkill {
  name: string
  source: 'public' | 'private'
  findings: SerializedFinding[]
}

interface SerializedFinding {
  id: string
  severity: Severity
  message: string
  fix?: string
}

/**
 * Render lint results as pretty-printed JSON. Strips ANSI codes,
 * applies `minSeverity` filtering to per-skill findings, but always
 * emits the unfiltered `totals` so downstream tools see the full
 * picture.
 */
export const formatJson: Formatter = ({ results, totals, minSeverity, showFix }) => {
  const report = buildReport({ results, totals, minSeverity, showFix })
  return JSON.stringify(report, null, 2) + '\n'
}

/**
 * Shared report shape used by both JSON and YAML formatters.
 */
export function buildReport({
  results,
  totals,
  minSeverity,
  showFix,
}: {
  results: SkillLintResult[]
  totals: { errors: number; warns: number; infos: number }
  minSeverity: Severity | undefined
  showFix: boolean
}): SerializedLintReport {
  const minOrder = SEVERITY_ORDER[minSeverity ?? 'info']
  return {
    summary: totals,
    skills: results.map((r) => ({
      name: r.skill.location.name,
      source: r.skill.location.source,
      findings: r.findings
        .filter((f) => SEVERITY_ORDER[f.severity] <= minOrder)
        .map((f) => serializeFinding(f, showFix)),
    })),
  }
}

function serializeFinding(f: Finding, showFix: boolean): SerializedFinding {
  return {
    id: f.id,
    severity: f.severity,
    message: f.message,
    ...(showFix && f.fix !== undefined && { fix: f.fix }),
  }
}
