import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { formatResults, lintSkill, summarize } from '../lib/lint/index.js'
import { findRepoRoot, findSkills, type SkillRecord } from '../lib/skills/index.js'

const options = z.object({
  severity: z
    .enum(['error', 'warn', 'info'])
    .optional()
    .describe('Only show findings at or above this severity'),
  fix: z.boolean().default(false).describe('Print fix hints alongside each finding'),
  format: z
    .enum(['pretty', 'json', 'yaml'])
    .default('pretty')
    .describe('Output format: pretty (ANSI), json, or yaml'),
})

const positionals = z.object({
  skill: z.string().optional().describe('Lint one specific skill by name; omit to lint all skills'),
})

export default command({
  options,
  positionals,
  description: 'Lint skills against the three-tier rule set (error / warn / info)',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const allSkills = findSkills(repoRoot)
    const targets = resolveTargets(allSkills, ctx.args.skill)

    if (targets.length === 0) {
      const detail = ctx.args.skill ? ` matching "${ctx.args.skill}"` : ''
      ctx.log.error(`No skills found${detail}`)
      process.exit(1)
    }

    const results = targets.map(lintSkill)
    const totals = summarize(results)

    process.stdout.write(
      formatResults(ctx.args.format, {
        results,
        totals,
        minSeverity: ctx.args.severity,
        showFix: ctx.args.fix,
      })
    )

    if (totals.errors > 0) process.exit(2)
  },
})

function resolveTargets(skills: SkillRecord[], skillName: string | undefined): SkillRecord[] {
  if (!skillName) return skills
  return skills.filter((s) => s.location.name === skillName)
}
