import { writeFileSync } from 'node:fs'
import path from 'node:path'

import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { type BenchmarkFile, benchmarkFileSchema, type GradingFile } from '../lib/schemas.js'
import {
  discoverSkills,
  findRepoRoot,
  readWorkspace,
  type IterationSummary,
  type ScenarioSummary,
  type SkillRecord,
} from '../lib/workspace.js'

const positionals = z.object({
  skill: z.string().describe('Skill name to benchmark'),
})

const options = z.object({
  iteration: z
    .number()
    .int()
    .positive()
    .optional()
    .describe('Iteration number to benchmark (defaults to latest)'),
})

export default command({
  options,
  positionals,
  description:
    'Aggregate grading.json results from a workspace iteration into benchmark.json + benchmark.md',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const skills = discoverSkills(repoRoot)
    const skill = skills.find((s: SkillRecord) => s.location.name === ctx.args.skill)
    if (!skill) {
      ctx.log.error(`No skill named "${ctx.args.skill}"`)
      process.exit(1)
    }

    const iterations = readWorkspace(skill)
    if (iterations.length === 0) {
      ctx.log.error(`No workspace iterations for "${ctx.args.skill}". Run /skill-eval first.`)
      process.exit(1)
    }

    const iteration = ctx.args.iteration
      ? iterations.find((i: IterationSummary) => i.iteration === ctx.args.iteration)
      : iterations[0]
    if (!iteration) {
      ctx.log.error(`Iteration not found`)
      process.exit(1)
    }

    const benchmark = aggregate(skill.location.name, iteration)
    const benchmarkJsonPath = path.join(iteration.dir, 'benchmark.json')
    const benchmarkMdPath = path.join(iteration.dir, 'benchmark.md')
    writeFileSync(benchmarkJsonPath, JSON.stringify(benchmark, null, 2) + '\n')
    writeFileSync(benchmarkMdPath, renderMarkdown(benchmark))

    ctx.log.info(`Wrote ${benchmarkJsonPath}`)
    ctx.log.info(`Wrote ${benchmarkMdPath}`)

    if (benchmark.totals.incomplete_evals > 0) {
      ctx.log.warn(
        `⚠ benchmark incomplete: ${benchmark.totals.incomplete_evals} evals are missing grading data`
      )
      process.exitCode = 1
    }
  },
})

export function aggregate(skillName: string, iteration: IterationSummary): BenchmarkFile {
  const evals = iteration.evals.map((s: ScenarioSummary) => {
    const withSkillCounts = countResults(s.withSkill?.grading)
    const withoutSkillCounts = countResults(s.withoutSkill?.grading)
    return {
      eval_id: s.evalId,
      eval_name: s.evalName,
      with_skill: { passed: withSkillCounts.passed, total: withSkillCounts.total },
      without_skill: { passed: withoutSkillCounts.passed, total: withoutSkillCounts.total },
      missing: {
        with_skill: withSkillCounts.missing,
        without_skill: withoutSkillCounts.missing,
      },
    }
  })
  const totals = evals.reduce(
    (acc, e) => ({
      // Missing variants contribute 0+0 — kept explicit so the denominator
      // doesn't silently inflate when grading data is absent.
      with_skill_passed: acc.with_skill_passed + (e.missing.with_skill ? 0 : e.with_skill.passed),
      with_skill_total: acc.with_skill_total + (e.missing.with_skill ? 0 : e.with_skill.total),
      without_skill_passed:
        acc.without_skill_passed + (e.missing.without_skill ? 0 : e.without_skill.passed),
      without_skill_total:
        acc.without_skill_total + (e.missing.without_skill ? 0 : e.without_skill.total),
      incomplete_evals:
        acc.incomplete_evals + (e.missing.with_skill || e.missing.without_skill ? 1 : 0),
    }),
    {
      with_skill_passed: 0,
      with_skill_total: 0,
      without_skill_passed: 0,
      without_skill_total: 0,
      incomplete_evals: 0,
    }
  )
  return benchmarkFileSchema.parse({
    skill_name: skillName,
    iteration: iteration.iteration,
    generated_at: new Date().toISOString(),
    evals,
    totals,
  })
}

function countResults(grading: GradingFile | null | undefined): {
  passed: number
  total: number
  missing: boolean
} {
  if (!grading) return { passed: 0, total: 0, missing: true }
  return { passed: grading.passed_count, total: grading.total_count, missing: false }
}

export function renderMarkdown(b: BenchmarkFile): string {
  const lines: string[] = [
    `# Benchmark: ${b.skill_name} — iteration ${b.iteration}`,
    '',
    `Generated: ${b.generated_at}`,
    '',
    `**With skill:** ${b.totals.with_skill_passed} / ${b.totals.with_skill_total} passed`,
    `**Without skill:** ${b.totals.without_skill_passed} / ${b.totals.without_skill_total} passed`,
  ]
  if (b.totals.incomplete_evals > 0) {
    lines.push(`**Incomplete evals:** ${b.totals.incomplete_evals}`)
  }
  lines.push('', '## Per-eval breakdown', '')
  lines.push('| ID | Eval | With skill | Without skill |')
  lines.push('|----|------|------------|---------------|')
  for (const e of b.evals) {
    const withCell = e.missing.with_skill ? 'MISSING' : `${e.with_skill.passed}/${e.with_skill.total}`
    const withoutCell = e.missing.without_skill
      ? 'MISSING'
      : `${e.without_skill.passed}/${e.without_skill.total}`
    lines.push(`| ${e.eval_id} | ${e.eval_name} | ${withCell} | ${withoutCell} |`)
  }
  return lines.join('\n') + '\n'
}
