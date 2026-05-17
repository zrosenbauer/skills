import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { attempt } from 'massaman'

import type { SkillRecord } from '../lib/skills.js'
import {
  type BenchmarkFile,
  benchmarkFileSchema,
  type GradingFile,
  gradingFileSchema,
} from './schemas.js'

export interface IterationSummary {
  iteration: number
  dir: string
  generatedAt: string | null
  evals: ScenarioSummary[]
  benchmark: BenchmarkFile | null
}

export interface ScenarioSummary {
  evalId: number
  evalName: string
  dir: string
  withSkill: VariantSummary | null
  withoutSkill: VariantSummary | null
}

export interface VariantSummary {
  dir: string
  hasTranscript: boolean
  transcriptPath: string | null
  grading: GradingFile | null
}

/**
 * Read every iteration in a skill's `.workspace/` (gitignored sibling).
 * Iterations are returned newest-first so callers can default to the latest.
 */
export function readWorkspace(skill: SkillRecord): IterationSummary[] {
  const workspaceDir = path.join(skill.location.dir, '.workspace')
  if (!existsSync(workspaceDir)) return []

  const iterations: IterationSummary[] = []
  for (const entry of readdirSync(workspaceDir)) {
    const match = /^iteration-(\d+)$/.exec(entry)
    if (!match?.[1]) continue
    const iterationDir = path.join(workspaceDir, entry)
    if (!statSync(iterationDir).isDirectory()) continue
    iterations.push(readIteration(parseInt(match[1], 10), iterationDir))
  }
  return iterations.toSorted((a, b) => b.iteration - a.iteration)
}

function readIteration(iteration: number, dir: string): IterationSummary {
  const benchmarkPath = path.join(dir, 'benchmark.json')
  const benchmarkParse = existsSync(benchmarkPath)
    ? attempt(() => benchmarkFileSchema.parse(JSON.parse(readFileSync(benchmarkPath, 'utf8'))))
    : null
  const benchmark = benchmarkParse?.ok ? benchmarkParse.value : null

  const evals: ScenarioSummary[] = []
  for (const entry of readdirSync(dir)) {
    const match = /^eval-(\d+)-(.+)$/.exec(entry)
    if (!match?.[1] || !match[2]) continue
    const evalDir = path.join(dir, entry)
    if (!statSync(evalDir).isDirectory()) continue
    evals.push({
      evalId: parseInt(match[1], 10),
      evalName: match[2],
      dir: evalDir,
      withSkill: readVariant(path.join(evalDir, 'with_skill')),
      withoutSkill: readVariant(path.join(evalDir, 'without_skill')),
    })
  }

  return {
    iteration,
    dir,
    generatedAt: benchmark?.generated_at ?? null,
    evals: evals.toSorted((a, b) => a.evalId - b.evalId),
    benchmark,
  }
}

function readVariant(dir: string): VariantSummary | null {
  if (!existsSync(dir)) return null
  const transcriptPath = path.join(dir, 'transcript.md')
  const hasTranscript = existsSync(transcriptPath)
  const gradingPath = path.join(dir, 'grading.json')
  const gradingParse = existsSync(gradingPath)
    ? attempt(() => gradingFileSchema.parse(JSON.parse(readFileSync(gradingPath, 'utf8'))))
    : null
  return {
    dir,
    hasTranscript,
    transcriptPath: hasTranscript ? transcriptPath : null,
    grading: gradingParse?.ok ? gradingParse.value : null,
  }
}
