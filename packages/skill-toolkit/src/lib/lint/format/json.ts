import type { AgentLintResult, Finding, Severity, SkillLintResult } from '../types.js'
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
  agents: SerializedAgent[]
}

interface SerializedSkill {
  name: string
  source: 'public' | 'private'
  findings: SerializedFinding[]
}

interface SerializedAgent {
  name: string
  provider: string
  source: string
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
 * applies `minSeverity` filtering to per-target findings, but always
 * emits the unfiltered `summary` so downstream tools see the full
 * picture.
 */
export const formatJson: Formatter = ({
  skillResults,
  agentResults,
  totals,
  minSeverity,
  showFix,
}) => {
  const report = buildReport({ skillResults, agentResults, totals, minSeverity, showFix })
  return JSON.stringify(report, null, 2) + '\n'
}

/**
 * Shared report shape used by both JSON and YAML formatters.
 */
export function buildReport({
  skillResults,
  agentResults,
  totals,
  minSeverity,
  showFix,
}: {
  skillResults: SkillLintResult[]
  agentResults: AgentLintResult[]
  totals: { errors: number; warns: number; infos: number }
  minSeverity: Severity | undefined
  showFix: boolean
}): SerializedLintReport {
  const minOrder = SEVERITY_ORDER[minSeverity ?? 'info']
  return {
    summary: totals,
    skills: skillResults.map((r) => ({
      name: r.skill.location.name,
      source: r.skill.location.source,
      findings: r.findings
        .filter((f) => SEVERITY_ORDER[f.severity] <= minOrder)
        .map((f) => serializeFinding(f, showFix)),
    })),
    agents: agentResults.map((r) => ({
      name: r.agent.location.name,
      provider: r.agent.location.provider,
      source: r.agent.location.source,
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
