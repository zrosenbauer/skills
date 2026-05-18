import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { findAgents } from '../lib/agents/index.js'
import {
  type AgentLintResult,
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
    .describe('Output format: pretty (ANSI), json, or yaml'),
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
      ctx.log.error(`No ${scope} found${detail}`)
      process.exit(1)
    }

    const skillResults: SkillLintResult[] = skillTargets.map(lintSkill)
    const agentResults: AgentLintResult[] = agentTargets.map(lintAgent)
    const totals = summarize([...skillResults, ...agentResults])

    process.stdout.write(
      formatResults(ctx.args.format, {
        skillResults,
        agentResults,
        totals,
        minSeverity: ctx.args.severity,
        showFix: ctx.args.fix,
      })
    )

    if (totals.errors > 0) process.exit(2)
  },
})

function filterByName<T>(items: T[], name: string | undefined, getName: (item: T) => string): T[] {
  if (!name) return items
  return items.filter((item) => getName(item) === name)
}
