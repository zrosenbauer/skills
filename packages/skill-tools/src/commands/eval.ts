import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { gradeAll } from '../lib/grading.js'
import { gradingFileSchema, type EvalCase } from '../lib/schemas.js'
import { discoverSkills, findRepoRoot, type SkillRecord } from '../lib/workspace.js'

const positionals = z.object({
  skill: z.string().describe('Skill name'),
  evalId: z.coerce.number().int().nonnegative().describe('Eval ID from evals.json'),
})

const options = z.object({
  variant: z
    .enum(['with_skill', 'without_skill'])
    .describe('Whether the transcript came from a run WITH or WITHOUT the skill loaded'),
  iteration: z.number().int().positive().describe('Iteration number this eval belongs to'),
  transcript: z.string().describe('Path to a transcript.md file produced by a subagent run'),
})

export default command({
  options,
  positionals,
  description:
    'Grade a single transcript against the assertions in evals.json. Used by /skill-eval after each subagent dispatch.',
  handler: async (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const skills = discoverSkills(repoRoot)
    const skill = skills.find((s: SkillRecord) => s.location.name === ctx.args.skill)
    if (!skill) {
      ctx.log.error(`No skill named "${ctx.args.skill}"`)
      process.exit(1)
    }
    if (!skill.evalsFile) {
      ctx.log.error(`Skill "${ctx.args.skill}" has no evals.json`)
      process.exit(1)
    }

    const evalCase = skill.evalsFile.evals.find((e: EvalCase) => e.id === ctx.args.evalId)
    if (!evalCase) {
      ctx.log.error(`No eval with id=${ctx.args.evalId} in evals.json`)
      process.exit(1)
    }

    const fs = await import('node:fs')
    const transcript = fs.readFileSync(ctx.args.transcript, 'utf8')

    const variantDir = path.join(
      skill.location.dir,
      '.workspace',
      `iteration-${ctx.args.iteration}`,
      `eval-${evalCase.id}-${evalCase.eval_name}`,
      ctx.args.variant
    )
    mkdirSync(variantDir, { recursive: true })

    const targetTranscript = path.join(variantDir, 'transcript.md')
    if (path.resolve(ctx.args.transcript) !== path.resolve(targetTranscript)) {
      writeFileSync(targetTranscript, transcript)
    }

    const { results, passedCount } = gradeAll(evalCase.assertions, {
      variantDir,
      transcript,
    })

    const grading = gradingFileSchema.parse({
      eval_id: evalCase.id,
      eval_name: evalCase.eval_name,
      variant: ctx.args.variant,
      results,
      passed_count: passedCount,
      total_count: evalCase.assertions.length,
      graded_at: new Date().toISOString(),
    })

    writeFileSync(path.join(variantDir, 'grading.json'), JSON.stringify(grading, null, 2) + '\n')

    ctx.log.info(
      `eval ${evalCase.eval_name} (${ctx.args.variant}): ${passedCount}/${evalCase.assertions.length} passed`
    )
  },
})
