import { existsSync } from 'node:fs'
import path from 'node:path'

import { match } from 'ts-pattern'

import type { Assertion, GradingResult } from './schemas.js'

interface GradeContext {
  /** Variant directory containing transcript.md and outputs/ */
  variantDir: string
  /** Verbatim transcript text (the subagent's report) */
  transcript: string
}

/**
 * Run a single assertion against a graded run.
 */
export function grade(assertion: Assertion, ctx: GradeContext): GradingResult {
  return match(assertion)
    .with({ type: 'regex' }, (a) => {
      let re: RegExp
      try {
        re = new RegExp(a.pattern, a.flags ?? '')
      } catch (err) {
        return {
          assertion,
          passed: false,
          detail: `invalid regex /${a.pattern}/${a.flags ?? ''}: ${(err as Error).message}`,
        }
      }
      const passed = re.test(ctx.transcript)
      return {
        assertion,
        passed,
        detail: passed
          ? undefined
          : `pattern /${a.pattern}/${a.flags ?? ''} did not match transcript`,
      }
    })
    .with({ type: 'contains' }, (a) => {
      const passed = ctx.transcript.includes(a.substring)
      return {
        assertion,
        passed,
        detail: passed ? undefined : `transcript does not contain "${a.substring}"`,
      }
    })
    .with({ type: 'file_exists' }, (a) => {
      const target = path.join(ctx.variantDir, 'outputs', a.path)
      const passed = existsSync(target)
      return {
        assertion,
        passed,
        detail: passed ? undefined : `expected output file missing: ${a.path}`,
      }
    })
    .exhaustive()
}

/**
 * Run every assertion for one variant. Returns the aggregate plus per-assertion details.
 */
export function gradeAll(
  assertions: ReadonlyArray<Assertion>,
  ctx: GradeContext
): { results: GradingResult[]; passedCount: number } {
  const results = assertions.map((a) => grade(a, ctx))
  const passedCount = results.filter((r) => r.passed).length
  return { results, passedCount }
}
