import { groupBy, match, P } from 'massaman'

import type { AgentLintResult, Finding, Severity, SkillLintResult } from '../types.js'
import type { Formatter } from './types.js'

const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warn: 1, info: 2 }
const SEVERITY_GLYPH: Record<Severity, string> = { error: '✗', warn: '⚠', info: 'ℹ' }
const SEVERITY_COLOR: Record<Severity, string> = {
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[36m',
}
const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'

/**
 * Render lint results as ANSI-coloured human-readable output: one
 * section per target, severity-grouped findings, and a summary footer.
 * Skills and agents render in two separate sections.
 */
export const formatPretty: Formatter = ({
  skillResults,
  agentResults,
  totals,
  minSeverity,
  showFix,
}) => {
  const minOrder = SEVERITY_ORDER[minSeverity ?? 'info']
  const skillSection = skillResults
    .map((result) => renderSkill({ result, minOrder, showFix }))
    .join('')
  const agentSection = agentResults
    .map((result) => renderAgent({ result, minOrder, showFix }))
    .join('')
  const agentsHeader = agentResults.length > 0 ? `\n${BOLD}Agents${RESET}\n` : ''
  return skillSection + agentsHeader + agentSection + renderSummary(totals)
}

interface RenderSkillParams {
  result: SkillLintResult
  minOrder: number
  showFix: boolean
}

function renderSkill({ result, minOrder, showFix }: RenderSkillParams): string {
  const visible = result.findings.filter((f) => SEVERITY_ORDER[f.severity] <= minOrder)
  const tag =
    result.skill.location.source === 'public' ? `${DIM}[public]${RESET}` : `${DIM}[private]${RESET}`
  return renderRecord({ name: result.skill.location.name, tag, visible, showFix })
}

interface RenderAgentParams {
  result: AgentLintResult
  minOrder: number
  showFix: boolean
}

function renderAgent({ result, minOrder, showFix }: RenderAgentParams): string {
  const visible = result.findings.filter((f) => SEVERITY_ORDER[f.severity] <= minOrder)
  const tag = `${DIM}[${result.agent.location.provider}]${RESET}`
  return renderRecord({ name: result.agent.location.name, tag, visible, showFix })
}

interface RenderRecordParams {
  name: string
  tag: string
  visible: Finding[]
  showFix: boolean
}

/**
 * Render one record's section (used by both skills and agents). Groups
 * findings by severity tier so the output preserves a stable
 * error → warn → info ordering even when the rules array shuffles.
 */
function renderRecord({ name, tag, visible, showFix }: RenderRecordParams): string {
  if (visible.length === 0) {
    return `${BOLD}${name}${RESET}  ${tag}  ${SEVERITY_COLOR.info}clean${RESET}\n`
  }

  const grouped = groupBy(visible, (f) => f.severity)
  const ordered: Severity[] = ['error', 'warn', 'info']
  const lines = [`${BOLD}${name}${RESET}  ${tag}`]
  for (const tier of ordered) {
    const findings = grouped[tier] ?? []
    for (const f of findings) lines.push(renderFinding(f, showFix))
  }
  return lines.join('\n') + '\n'
}

function renderFinding(f: Finding, showFix: boolean): string {
  const head = `  ${SEVERITY_COLOR[f.severity]}${SEVERITY_GLYPH[f.severity]} ${f.severity}${RESET}  ${DIM}${f.id}${RESET}  ${f.message}`
  return match([showFix, f.fix])
    .with([true, P.string], () => `${head}\n      ${DIM}→ ${f.fix}${RESET}`)
    .otherwise(() => head)
}

function renderSummary(totals: { errors: number; warns: number; infos: number }): string {
  return `\n${BOLD}Summary${RESET}: ${SEVERITY_COLOR.error}${totals.errors} error${RESET}  ${SEVERITY_COLOR.warn}${totals.warns} warn${RESET}  ${SEVERITY_COLOR.info}${totals.infos} info${RESET}\n`
}
