import type { IterationSummary, ScenarioSummary } from './iterations.js'
import {
  type BenchmarkFile,
  benchmarkFileSchema,
  type EvalCase,
  type GradingFile,
} from './schemas.js'

/**
 * Aggregate per-eval grading data into a benchmark file. Missing variants
 * (no grading.json on disk) are excluded from totals so denominators reflect
 * what was actually graded — not a false 0/N. `incomplete_evals` counts
 * distinct evals where either variant is missing.
 */
export function aggregate(
  skillName: string,
  iteration: IterationSummary,
  definedEvals: ReadonlyArray<EvalCase>
): BenchmarkFile {
  const onDisk = new Map(iteration.evals.map((s: ScenarioSummary) => [s.evalId, s]))
  // Empty `definedEvals` falls back to iteration-derived list — preserves
  // current behavior when no evals.json is available.
  const source: ReadonlyArray<{ id: number; eval_name: string }> =
    definedEvals.length > 0
      ? definedEvals
      : iteration.evals.map((s) => ({ id: s.evalId, eval_name: s.evalName }))
  const evals = source.map((defined) => {
    const found = onDisk.get(defined.id)
    if (!found) {
      // Eval defined in evals.json but no on-disk variant data — both
      // variants count as missing so `incomplete_evals` reflects reality.
      return {
        eval_id: defined.id,
        eval_name: defined.eval_name,
        with_skill: { passed: 0, total: 0 },
        without_skill: { passed: 0, total: 0 },
        missing: { with_skill: true, without_skill: true },
      }
    }
    const withSkillCounts = countResults(found.withSkill?.grading)
    const withoutSkillCounts = countResults(found.withoutSkill?.grading)
    return {
      eval_id: found.evalId,
      eval_name: found.evalName,
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

/**
 * Render a benchmark file as a per-eval markdown table with summary header.
 * Used to write `benchmark.md` alongside `benchmark.json`.
 */
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
    const withCell = e.missing.with_skill
      ? 'MISSING'
      : `${e.with_skill.passed}/${e.with_skill.total}`
    const withoutCell = e.missing.without_skill
      ? 'MISSING'
      : `${e.without_skill.passed}/${e.without_skill.total}`
    lines.push(`| ${e.eval_id} | ${e.eval_name} | ${withCell} | ${withoutCell} |`)
  }
  return lines.join('\n') + '\n'
}
