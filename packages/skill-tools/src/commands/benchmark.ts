import { writeFileSync } from 'node:fs'
import path from 'node:path'

import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { aggregate, renderMarkdown } from '../evals/benchmark.js'
import { readWorkspace, type IterationSummary, type ScenarioSummary } from '../evals/iterations.js'
import { type EvalCase } from '../evals/schemas.js'
import { findRepoRoot } from '../lib/repo-root.js'
import { findSkills, type SkillRecord } from '../lib/skills.js'

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
    const skills = findSkills(repoRoot)
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

    if (!skill.evalsFile) {
      ctx.log.warn(
        `⚠ skill "${skill.location.name}" has no evals.json — falling back to filesystem-only aggregation`
      )
    }
    const definedEvals: ReadonlyArray<EvalCase> = skill.evalsFile
      ? skill.evalsFile.evals
      : iteration.evals.map((s: ScenarioSummary) => ({
          id: s.evalId,
          eval_name: s.evalName,
          prompt: '',
          expected_output: '',
          files: [],
          assertions: [],
        }))
    const benchmark = aggregate(skill.location.name, iteration, definedEvals)
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
