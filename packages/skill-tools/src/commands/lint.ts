import { command } from '@kidd-cli/core'
import { groupBy } from 'es-toolkit'
import { P, match } from 'ts-pattern'
import { z } from 'zod'

import {
  type Finding,
  type Severity,
  type SkillLintResult,
  lintSkill,
  summarize,
} from '../lib/lint/index.js'
import { type SkillRecord, discoverSkills, findRepoRoot } from '../lib/workspace.js'

const options = z.object({
  severity: z
    .enum(['error', 'warn', 'info'])
    .optional()
    .describe('Only show findings at or above this severity'),
  fix: z.boolean().default(false).describe('Print fix hints alongside each finding'),
})

const positionals = z.object({
  skill: z.string().optional().describe('Lint one specific skill by name; omit to lint all skills'),
})

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

export default command({
  options,
  positionals,
  description: 'Lint skills against the three-tier rule set (error / warn / info)',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const allSkills = discoverSkills(repoRoot)
    const targets = resolveTargets(allSkills, ctx.args.skill)

    if (targets.length === 0) {
      const detail = ctx.args.skill ? ` matching "${ctx.args.skill}"` : ''
      ctx.log.error(`No skills found${detail}`)
      process.exit(1)
    }

    const results = targets.map(lintSkill)
    const minOrder = SEVERITY_ORDER[ctx.args.severity ?? 'info']

    const out =
      results.map((r) => renderSkill({ result: r, minOrder, showFix: ctx.args.fix })).join('') +
      renderSummary(summarize(results))
    process.stdout.write(out)

    if (summarize(results).errors > 0) process.exit(2)
  },
})

/**
 * Filter all skills down to the target set: one skill if `skillName` is given,
 * everything otherwise.
 *
 * @private
 */
function resolveTargets(skills: SkillRecord[], skillName: string | undefined): SkillRecord[] {
  if (!skillName) return skills
  return skills.filter((s) => s.location.name === skillName)
}

interface RenderSkillParams {
  result: SkillLintResult
  minOrder: number
  showFix: boolean
}

/**
 * Render one skill's findings, grouped by severity tier.
 *
 * Uses `es-toolkit`'s groupBy so the output preserves a consistent
 * error → warn → info ordering even when the rules array shuffles.
 *
 * @private
 */
function renderSkill({ result, minOrder, showFix }: RenderSkillParams): string {
  const visible = result.findings.filter((f: Finding) => SEVERITY_ORDER[f.severity] <= minOrder)
  const tag =
    result.skill.location.source === 'public' ? `${DIM}[public]${RESET}` : `${DIM}[private]${RESET}`

  if (visible.length === 0) {
    return `${BOLD}${result.skill.location.name}${RESET}  ${tag}  ${SEVERITY_COLOR.info}clean${RESET}\n`
  }

  const grouped = groupBy(visible, (f) => f.severity)
  const ordered: Severity[] = ['error', 'warn', 'info']
  const lines = [`${BOLD}${result.skill.location.name}${RESET}  ${tag}`]
  for (const tier of ordered) {
    const findings = grouped[tier] ?? []
    for (const f of findings) lines.push(renderFinding(f, showFix))
  }
  return lines.join('\n') + '\n'
}

/**
 * Render one finding line plus its fix hint (when requested).
 *
 * @private
 */
function renderFinding(f: Finding, showFix: boolean): string {
  const head = `  ${SEVERITY_COLOR[f.severity]}${SEVERITY_GLYPH[f.severity]} ${f.severity}${RESET}  ${DIM}${f.code}${RESET}  ${f.message}`
  return match([showFix, f.fix])
    .with([true, P.string], () => `${head}\n      ${DIM}→ ${f.fix}${RESET}`)
    .otherwise(() => head)
}

interface Totals {
  errors: number
  warns: number
  infos: number
}

/**
 * Render the summary footer: counts per severity tier.
 *
 * @private
 */
function renderSummary(totals: Totals): string {
  return `\n${BOLD}Summary${RESET}: ${SEVERITY_COLOR.error}${totals.errors} error${RESET}  ${SEVERITY_COLOR.warn}${totals.warns} warn${RESET}  ${SEVERITY_COLOR.info}${totals.infos} info${RESET}\n`
}
