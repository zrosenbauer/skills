import { type CommandContext, command } from '@kidd-cli/core'
import { match } from 'massaman'
import { z } from 'zod'

import { findAgents } from '../lib/agents/index.js'
import {
  type AgentLintResult,
  type Finding,
  type Severity,
  type SkillLintResult,
  formatResults,
  lintAgent,
  lintSkill,
  summarize,
} from '../lib/lint/index.js'
import { findRepoRoot, findSkills } from '../lib/skills/index.js'

const options = z.object({
  severity: z
    .enum(['error', 'warn', 'info'])
    .optional()
    .describe('Only show findings at or above this severity'),
  fix: z.boolean().default(false).describe('Print fix hints alongside each finding'),
  format: z
    .enum(['pretty', 'json', 'yaml'])
    .default('pretty')
    .describe('Output format: pretty (ctx.report), json, or yaml'),
  target: z
    .enum(['skills', 'agents', 'all'])
    .default('all')
    .describe('What to lint: skills, agents, or both (default)'),
})

const positionals = z.object({
  name: z
    .string()
    .optional()
    .describe('Lint one specific skill or agent by name; omit to lint everything in scope'),
})

const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warn: 1, info: 2 }

export default command({
  options,
  positionals,
  description: 'Lint skills and/or sub-agents against the three-tier rule set',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const allSkills = ctx.args.target === 'agents' ? [] : findSkills(repoRoot)
    const allAgents = ctx.args.target === 'skills' ? [] : findAgents(repoRoot)
    const skillTargets = filterByName(allSkills, ctx.args.name, (s) => s.location.name)
    const agentTargets = filterByName(allAgents, ctx.args.name, (a) => a.location.name)

    if (skillTargets.length === 0 && agentTargets.length === 0) {
      const detail = ctx.args.name ? ` matching "${ctx.args.name}"` : ''
      const scope = ctx.args.target === 'all' ? 'skills or agents' : ctx.args.target
      ctx.fail(`No ${scope} found${detail}`, { exitCode: 1, code: 'NO_TARGETS' })
    }

    const skillResults: SkillLintResult[] = skillTargets.map(lintSkill)
    const agentResults: AgentLintResult[] = agentTargets.map(lintAgent)
    const totals = summarize([...skillResults, ...agentResults])

    if (ctx.args.format === 'pretty') {
      renderViaReport({
        ctx,
        skillResults,
        agentResults,
        totals,
        severity: ctx.args.severity,
        fix: ctx.args.fix,
      })
    } else {
      process.stdout.write(
        formatResults(ctx.args.format, {
          skillResults,
          agentResults,
          totals,
          minSeverity: ctx.args.severity,
          showFix: ctx.args.fix,
        })
      )
    }

    if (totals.errors > 0) process.exit(2)
  },
})

function filterByName<T>(items: T[], name: string | undefined, getName: (item: T) => string): T[] {
  if (!name) return items
  return items.filter((item) => getName(item) === name)
}

/**
 * Render lint results via kidd's `ctx.report` API. Each skill/agent
 * becomes a `check` row (pass when no visible findings, fail/warn
 * otherwise), each visible finding becomes a `finding`, and the
 * totals close out with an inline `summary` footer.
 */
interface RenderParams {
  ctx: CommandContext
  skillResults: SkillLintResult[]
  agentResults: AgentLintResult[]
  totals: { errors: number; warns: number; infos: number }
  severity: Severity | undefined
  fix: boolean
}

function renderViaReport({
  ctx,
  skillResults,
  agentResults,
  totals,
  severity: minSeverity,
  fix: showFix,
}: RenderParams): void {
  const maxOrder = SEVERITY_ORDER[minSeverity ?? 'info']

  for (const r of skillResults) {
    emitTarget({
      ctx,
      name: r.skill.location.name,
      kind: 'skill',
      findings: r.findings,
      maxOrder,
      showFix,
    })
  }
  for (const r of agentResults) {
    emitTarget({
      ctx,
      name: r.agent.location.name,
      kind: 'agent',
      findings: r.findings,
      maxOrder,
      showFix,
    })
  }

  ctx.report.summary({
    style: 'inline',
    stats: [
      `${totals.errors} error${totals.errors === 1 ? '' : 's'}`,
      `${totals.warns} warn${totals.warns === 1 ? '' : 's'}`,
      `${totals.infos} info${totals.infos === 1 ? '' : 's'}`,
    ],
  })
}

interface EmitTargetParams {
  ctx: RenderParams['ctx']
  name: string
  kind: 'skill' | 'agent'
  findings: Finding[]
  maxOrder: number
  showFix: boolean
}

function emitTarget({ ctx, name, kind, findings, maxOrder, showFix }: EmitTargetParams): void {
  const visible = findings.filter((f) => SEVERITY_ORDER[f.severity] <= maxOrder)
  if (visible.length === 0) {
    ctx.report.check({ status: 'pass', name, detail: `[${kind}]` })
    return
  }

  const worstOrder = Math.min(...visible.map((f) => SEVERITY_ORDER[f.severity]))
  const checkStatus = match(worstOrder)
    .with(0, () => 'fail' as const)
    .with(1, () => 'warn' as const)
    .otherwise(() => 'skip' as const)

  ctx.report.check({
    status: checkStatus,
    name,
    detail: `[${kind}] · ${visible.length} finding${visible.length === 1 ? '' : 's'}`,
  })

  for (const f of visible) {
    ctx.report.finding({
      severity: severityToKidd(f.severity),
      rule: f.id,
      message: f.message,
      ...(showFix && f.fix !== undefined && { help: f.fix }),
      ...(f.frame !== undefined && { frame: f.frame }),
    })
  }
}

/**
 * Map our internal severity tier to kidd's FindingSeverity enum.
 * `info` collapses to `hint` (kidd's softest tier).
 */
function severityToKidd(severity: Severity): 'error' | 'warning' | 'hint' {
  return match(severity)
    .with('error', () => 'error' as const)
    .with('warn', () => 'warning' as const)
    .with('info', () => 'hint' as const)
    .exhaustive()
}
