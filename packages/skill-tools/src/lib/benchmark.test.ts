import { describe, expect, it } from 'vitest'

import { aggregate, renderMarkdown } from '../commands/benchmark.js'
import type { EvalCase, GradingFile } from './schemas.js'
import type { IterationSummary, ScenarioSummary, VariantSummary } from './workspace.js'

function definedFromScenarios(scenarios: ScenarioSummary[]): EvalCase[] {
  return scenarios.map((s) => ({
    id: s.evalId,
    eval_name: s.evalName,
    prompt: 'placeholder prompt for tests',
    expected_output: 'placeholder',
    files: [],
    assertions: [{ text: 'sentinel', type: 'contains', substring: 'x' }],
  }))
}

function defined(id: number, name: string): EvalCase {
  return {
    id,
    eval_name: name,
    prompt: 'placeholder prompt for tests',
    expected_output: 'placeholder',
    files: [],
    assertions: [{ text: 'sentinel', type: 'contains', substring: 'x' }],
  }
}

function buildGrading(
  passed: number,
  total: number,
  variant: 'with_skill' | 'without_skill'
): GradingFile {
  return {
    eval_id: 1,
    eval_name: 'sample',
    variant,
    results: [],
    passed_count: passed,
    total_count: total,
    graded_at: '2026-01-01T00:00:00.000Z',
  }
}

function buildVariant(grading: GradingFile | null): VariantSummary {
  return {
    dir: '/tmp/variant',
    hasTranscript: grading !== null,
    transcriptPath: grading !== null ? '/tmp/variant/transcript.md' : null,
    grading,
  }
}

interface BuildScenarioOpts {
  evalId: number
  evalName: string
  withSkill: GradingFile | null | 'absent'
  withoutSkill: GradingFile | null | 'absent'
}

function buildScenario(opts: BuildScenarioOpts): ScenarioSummary {
  return {
    evalId: opts.evalId,
    evalName: opts.evalName,
    dir: `/tmp/eval-${opts.evalId}`,
    withSkill: opts.withSkill === 'absent' ? null : buildVariant(opts.withSkill),
    withoutSkill: opts.withoutSkill === 'absent' ? null : buildVariant(opts.withoutSkill),
  }
}

function buildIteration(scenarios: ScenarioSummary[]): IterationSummary {
  return {
    iteration: 1,
    dir: '/tmp/iteration-1',
    generatedAt: '2026-01-01T00:00:00.000Z',
    evals: scenarios,
    benchmark: null,
  }
}

describe('aggregate', () => {
  it('all variants present — counts roll up and incomplete_evals stays 0', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'a',
        withSkill: buildGrading(3, 4, 'with_skill'),
        withoutSkill: buildGrading(1, 4, 'without_skill'),
      }),
      buildScenario({
        evalId: 2,
        evalName: 'b',
        withSkill: buildGrading(2, 2, 'with_skill'),
        withoutSkill: buildGrading(0, 2, 'without_skill'),
      }),
    ])

    const result = aggregate('demo', iteration, definedFromScenarios(iteration.evals))

    expect(result.totals).toEqual({
      with_skill_passed: 5,
      with_skill_total: 6,
      without_skill_passed: 1,
      without_skill_total: 6,
      incomplete_evals: 0,
    })
    expect(result.evals[0]?.missing).toEqual({ with_skill: false, without_skill: false })
    expect(result.evals[1]?.missing).toEqual({ with_skill: false, without_skill: false })
  })

  it('one variant missing — does not pad denominator and counts as incomplete', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'partial',
        withSkill: buildGrading(2, 4, 'with_skill'),
        withoutSkill: 'absent',
      }),
      buildScenario({
        evalId: 2,
        evalName: 'complete',
        withSkill: buildGrading(3, 3, 'with_skill'),
        withoutSkill: buildGrading(1, 3, 'without_skill'),
      }),
    ])

    const result = aggregate('demo', iteration, definedFromScenarios(iteration.evals))

    // The missing without_skill on eval 1 must NOT contribute to without_skill_total.
    expect(result.totals.without_skill_total).toBe(3)
    expect(result.totals.without_skill_passed).toBe(1)
    // With-skill side is fully present.
    expect(result.totals.with_skill_total).toBe(7)
    expect(result.totals.with_skill_passed).toBe(5)
    expect(result.totals.incomplete_evals).toBe(1)
    expect(result.evals[0]?.missing).toEqual({ with_skill: false, without_skill: true })
    expect(result.evals[1]?.missing).toEqual({ with_skill: false, without_skill: false })
  })

  it('both variants missing — counts as a single incomplete eval', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'ghost',
        withSkill: 'absent',
        withoutSkill: 'absent',
      }),
      buildScenario({
        evalId: 2,
        evalName: 'fine',
        withSkill: buildGrading(2, 2, 'with_skill'),
        withoutSkill: buildGrading(2, 2, 'without_skill'),
      }),
    ])

    const result = aggregate('demo', iteration, definedFromScenarios(iteration.evals))

    expect(result.totals.incomplete_evals).toBe(1)
    expect(result.evals[0]?.missing).toEqual({ with_skill: true, without_skill: true })
    expect(result.totals.with_skill_total).toBe(2)
    expect(result.totals.without_skill_total).toBe(2)
  })

  it('treats null grading (parse failure) as missing', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'broken',
        // Variant exists (transcript ran) but grading.json failed to parse.
        withSkill: null,
        withoutSkill: buildGrading(1, 1, 'without_skill'),
      }),
    ])

    const result = aggregate('demo', iteration, definedFromScenarios(iteration.evals))

    expect(result.evals[0]?.missing.with_skill).toBe(true)
    expect(result.totals.incomplete_evals).toBe(1)
    expect(result.totals.with_skill_total).toBe(0)
  })

  it('cross-references evals.json — defined evals with no on-disk dir become missing rows', () => {
    // evals.json defines 3 evals (ids 0,1,2) but only id 1 produced a directory.
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'middle',
        withSkill: buildGrading(2, 2, 'with_skill'),
        withoutSkill: buildGrading(1, 2, 'without_skill'),
      }),
    ])
    const definedEvals: EvalCase[] = [defined(0, 'first'), defined(1, 'middle'), defined(2, 'last')]

    const result = aggregate('demo', iteration, definedEvals)

    // All three defined evals must appear in output.
    expect(result.evals).toHaveLength(3)
    expect(result.evals[0]?.eval_id).toBe(0)
    expect(result.evals[0]?.eval_name).toBe('first')
    expect(result.evals[0]?.missing).toEqual({ with_skill: true, without_skill: true })
    expect(result.evals[1]?.eval_id).toBe(1)
    expect(result.evals[1]?.missing).toEqual({ with_skill: false, without_skill: false })
    expect(result.evals[2]?.eval_id).toBe(2)
    expect(result.evals[2]?.eval_name).toBe('last')
    expect(result.evals[2]?.missing).toEqual({ with_skill: true, without_skill: true })

    // Two defined-but-missing evals — `incomplete_evals` reflects reality.
    expect(result.totals.incomplete_evals).toBe(2)
    // Missing rows must NOT inflate denominators.
    expect(result.totals.with_skill_total).toBe(2)
    expect(result.totals.without_skill_total).toBe(2)
  })

  it('all defined evals on disk — behavior unchanged from filesystem-only path', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 0,
        evalName: 'a',
        withSkill: buildGrading(1, 2, 'with_skill'),
        withoutSkill: buildGrading(0, 2, 'without_skill'),
      }),
      buildScenario({
        evalId: 1,
        evalName: 'b',
        withSkill: buildGrading(2, 2, 'with_skill'),
        withoutSkill: buildGrading(1, 2, 'without_skill'),
      }),
      buildScenario({
        evalId: 2,
        evalName: 'c',
        withSkill: buildGrading(3, 3, 'with_skill'),
        withoutSkill: buildGrading(2, 3, 'without_skill'),
      }),
    ])
    const definedEvals: EvalCase[] = [defined(0, 'a'), defined(1, 'b'), defined(2, 'c')]

    const result = aggregate('demo', iteration, definedEvals)

    expect(result.evals).toHaveLength(3)
    expect(result.totals.incomplete_evals).toBe(0)
    expect(result.totals.with_skill_passed).toBe(6)
    expect(result.totals.with_skill_total).toBe(7)
    expect(result.totals.without_skill_passed).toBe(3)
    expect(result.totals.without_skill_total).toBe(7)
  })

  it('empty definedEvals — falls back to iteration-derived list (regression)', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 5,
        evalName: 'fs-only',
        withSkill: buildGrading(1, 1, 'with_skill'),
        withoutSkill: buildGrading(1, 1, 'without_skill'),
      }),
    ])

    const result = aggregate('demo', iteration, [])

    expect(result.evals).toHaveLength(1)
    expect(result.evals[0]?.eval_id).toBe(5)
    expect(result.evals[0]?.eval_name).toBe('fs-only')
    expect(result.totals.incomplete_evals).toBe(0)
    expect(result.totals.with_skill_total).toBe(1)
  })
})

describe('renderMarkdown', () => {
  it('renders MISSING (not 0/0) for missing variants', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'partial',
        withSkill: buildGrading(2, 4, 'with_skill'),
        withoutSkill: 'absent',
      }),
    ])
    const benchmark = aggregate('demo', iteration, definedFromScenarios(iteration.evals))

    const md = renderMarkdown(benchmark)

    expect(md).toContain('| 1 | partial | 2/4 | MISSING |')
    expect(md).not.toMatch(/\b0\/0\b/)
    expect(md).toContain('**Incomplete evals:** 1')
  })

  it('omits incomplete-evals header when none are missing', () => {
    const iteration = buildIteration([
      buildScenario({
        evalId: 1,
        evalName: 'all-good',
        withSkill: buildGrading(1, 1, 'with_skill'),
        withoutSkill: buildGrading(0, 1, 'without_skill'),
      }),
    ])
    const benchmark = aggregate('demo', iteration, definedFromScenarios(iteration.evals))

    const md = renderMarkdown(benchmark)

    expect(md).not.toContain('Incomplete evals')
    expect(md).toContain('| 1 | all-good | 1/1 | 0/1 |')
  })
})
