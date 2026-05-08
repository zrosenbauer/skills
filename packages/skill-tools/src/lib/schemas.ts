import path from 'node:path'

import { z } from 'zod'

/**
 * Skill frontmatter — what we parse out of SKILL.md
 *
 * Universal core: `name`, `description`. Other fields are Claude Code
 * extensions and stay optional so cross-agent skills don't fail validation.
 */
export const skillFrontmatterSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  'argument-hint': z.string().optional(),
  'user-invocable': z.boolean().optional(),
  'model-invocable': z.boolean().optional(),
  metadata: z
    .object({
      internal: z.boolean().optional(),
      author: z.string().optional(),
      version: z.string().optional(),
      tags: z.string().optional(),
    })
    .optional(),
})
export type SkillFrontmatter = z.infer<typeof skillFrontmatterSchema>

/**
 * Assertion shape inside `evals.json`. Deterministic only — no LLM-as-judge.
 */
export const assertionSchema = z.discriminatedUnion('type', [
  z.object({
    text: z.string(),
    type: z.literal('regex'),
    pattern: z.string(),
    flags: z
      .string()
      .regex(/^[dgimsuy]*$/, { message: 'flags must be a subset of d/g/i/m/s/u/y' })
      .optional(),
  }),
  z.object({
    text: z.string(),
    type: z.literal('contains'),
    substring: z.string().min(1, { message: 'contains substring must be non-empty' }),
  }),
  z.object({
    text: z.string(),
    type: z.literal('file_exists'),
    path: z
      .string()
      .refine(
        (p) =>
          !path.posix.isAbsolute(p) &&
          !path.win32.isAbsolute(p) &&
          !p
            .split(/[\\/]/)
            .some((seg) => seg === '..'),
        {
          message:
            'file_exists path must be a relative path inside outputs/ — no `..` segments, no leading `/`',
        }
      ),
  }),
])
export type Assertion = z.infer<typeof assertionSchema>

/**
 * One eval (pressure scenario) inside `evals.json`.
 */
export const evalCaseSchema = z.object({
  id: z.number().int().nonnegative(),
  eval_name: z.string().regex(/^[a-z][a-z0-9-]+[a-z0-9]$/, {
    message: 'eval_name must be kebab-case',
  }),
  prompt: z.string().min(10),
  expected_output: z.string().min(1),
  files: z.array(z.string()).default([]),
  assertions: z
    .array(assertionSchema)
    .min(1, { message: 'eval must define at least one assertion' }),
})
export type EvalCase = z.infer<typeof evalCaseSchema>

/**
 * The committed test definition file at `<skill>/evals.json`.
 */
export const evalsFileSchema = z.object({
  skill_name: z.string().min(1),
  evals: z.array(evalCaseSchema).min(3, {
    message: 'evals.json must have at least 3 pressure scenarios',
  }),
})
export type EvalsFile = z.infer<typeof evalsFileSchema>

/**
 * One assertion's result after grading.
 */
export const gradingResultSchema = z.object({
  assertion: assertionSchema,
  passed: z.boolean(),
  detail: z.string().optional(),
})
export type GradingResult = z.infer<typeof gradingResultSchema>

/**
 * Grading output for one eval run, written to
 * `<workspace>/iteration-N/eval-K-name/<with|without>_skill/grading.json`.
 */
export const gradingFileSchema = z.object({
  eval_id: z.number().int().nonnegative(),
  eval_name: z.string(),
  variant: z.enum(['with_skill', 'without_skill']),
  results: z.array(gradingResultSchema),
  passed_count: z.number().int().nonnegative(),
  total_count: z.number().int().nonnegative(),
  graded_at: z.string(),
})
export type GradingFile = z.infer<typeof gradingFileSchema>

/**
 * Per-run timing recorded by the eval runner.
 */
export const timingFileSchema = z.object({
  total_tokens: z.number().int().nonnegative().optional(),
  duration_ms: z.number().nonnegative(),
})
export type TimingFile = z.infer<typeof timingFileSchema>

/**
 * Aggregate of grading.json files across one iteration of one skill.
 *
 * `missing.with_skill` / `missing.without_skill` flag variants whose
 * grading.json was absent or unparseable. Missing variants are excluded from
 * the passed/total counters so they don't silently pad the denominator with
 * zeros. The top-level `totals.incomplete_evals` counts distinct evals where
 * either variant is missing.
 */
export const benchmarkFileSchema = z.object({
  skill_name: z.string(),
  iteration: z.number().int().positive(),
  generated_at: z.string(),
  evals: z.array(
    z.object({
      eval_id: z.number().int().nonnegative(),
      eval_name: z.string(),
      with_skill: z.object({
        passed: z.number().int().nonnegative(),
        total: z.number().int().nonnegative(),
      }),
      without_skill: z.object({
        passed: z.number().int().nonnegative(),
        total: z.number().int().nonnegative(),
      }),
      missing: z.object({
        with_skill: z.boolean(),
        without_skill: z.boolean(),
      }),
    })
  ),
  totals: z.object({
    with_skill_passed: z.number().int().nonnegative(),
    with_skill_total: z.number().int().nonnegative(),
    without_skill_passed: z.number().int().nonnegative(),
    without_skill_total: z.number().int().nonnegative(),
    incomplete_evals: z.number().int().nonnegative(),
  }),
})
export type BenchmarkFile = z.infer<typeof benchmarkFileSchema>
