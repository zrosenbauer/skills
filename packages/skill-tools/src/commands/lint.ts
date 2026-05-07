import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { lintSkill, summarize, type Finding, type Severity, type SkillLintResult } from '../lib/lint.js'
import { discoverSkills, findRepoRoot, type SkillRecord } from '../lib/workspace.js'

const options = z.object({
  severity: z
    .enum(['error', 'warn', 'info'])
    .optional()
    .describe('Only show findings at or above this severity'),
  fix: z
    .boolean()
    .default(false)
    .describe('Print fix hints alongside each finding'),
})

const positionals = z.object({
  skill: z
    .string()
    .optional()
    .describe('Lint one specific skill by name; omit to lint all skills'),
})

const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warn: 1, info: 2 }
const SEVERITY_GLYPH: Record<Severity, string> = { error: '✗', warn: '⚠', info: 'ℹ' }
const SEVERITY_COLOR: Record<Severity, string> = {
  error: '\x1b[31m', // red
  warn: '\x1b[33m', // yellow
  info: '\x1b[36m', // cyan
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

    const targets = ctx.args.skill
      ? allSkills.filter((s: SkillRecord) => s.location.name === ctx.args.skill)
      : allSkills

    if (targets.length === 0) {
      const detail = ctx.args.skill ? ` matching "${ctx.args.skill}"` : ''
      ctx.log.error(`No skills found${detail}`)
      process.exit(1)
    }

    const results = targets.map(lintSkill)
    const minSeverity = ctx.args.severity ?? 'info'
    const minOrder = SEVERITY_ORDER[minSeverity]

    let output = ''
    for (const result of results) {
      const visible = result.findings.filter(
        (f: Finding) => SEVERITY_ORDER[f.severity] <= minOrder,
      )
      output += renderSkill(result, visible, ctx.args.fix)
    }
    process.stdout.write(output)

    const totals = summarize(results)
    process.stdout.write(renderSummary(totals))

    if (totals.errors > 0) process.exit(2)
  },
})

function renderSkill(result: SkillLintResult, findings: Finding[], showFix: boolean): string {
  const { skill } = result
  const tag =
    skill.location.source === 'public' ? `${DIM}[public]${RESET}` : `${DIM}[private]${RESET}`
  if (findings.length === 0) {
    return `${BOLD}${skill.location.name}${RESET}  ${tag}  ${SEVERITY_COLOR.info}clean${RESET}\n`
  }
  let out = `${BOLD}${skill.location.name}${RESET}  ${tag}\n`
  for (const f of findings) {
    out += `  ${SEVERITY_COLOR[f.severity]}${SEVERITY_GLYPH[f.severity]} ${f.severity}${RESET}  ${DIM}${f.code}${RESET}  ${f.message}\n`
    if (showFix && f.fix) {
      out += `      ${DIM}→ ${f.fix}${RESET}\n`
    }
  }
  return out
}

function renderSummary(totals: { errors: number; warns: number; infos: number }): string {
  return `\n${BOLD}Summary${RESET}: ${SEVERITY_COLOR.error}${totals.errors} error${RESET}  ${SEVERITY_COLOR.warn}${totals.warns} warn${RESET}  ${SEVERITY_COLOR.info}${totals.infos} info${RESET}\n`
}
