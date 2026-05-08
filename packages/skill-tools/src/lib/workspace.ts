import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { attempt } from './result.js'
import {
  type BenchmarkFile,
  benchmarkFileSchema,
  type EvalsFile,
  evalsFileSchema,
  type GradingFile,
  gradingFileSchema,
  type SkillFrontmatter,
  skillFrontmatterSchema,
} from './schemas.js'

const FRONTMATTER_PATTERN = /^---\n([\s\S]+?)\n---\n/
const SKILL_DIRS = ['skills', '.agents/skills']

export interface SkillLocation {
  name: string
  dir: string
  source: 'public' | 'private'
}

export interface SkillRecord {
  location: SkillLocation
  frontmatter: SkillFrontmatter
  bodyLineCount: number
  hasReadme: boolean
  hasLicense: boolean
  hasEvalsJson: boolean
  evalsFile: EvalsFile | null
  evalsParseError: string | null
}

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
 * Find every skill in the repo, public and private. Discovery walks the two
 * known roots so a stray SKILL.md elsewhere is ignored.
 */
export function discoverSkills(repoRoot: string): SkillRecord[] {
  const records: SkillRecord[] = []

  for (const root of SKILL_DIRS) {
    const absRoot = path.join(repoRoot, root)
    if (!existsSync(absRoot)) continue

    for (const entry of readdirSync(absRoot)) {
      const skillDir = path.join(absRoot, entry)
      if (!statSync(skillDir).isDirectory()) continue

      const skillMdPath = path.join(skillDir, 'SKILL.md')
      if (!existsSync(skillMdPath)) continue

      records.push(
        readSkill({
          name: entry,
          dir: skillDir,
          source: root === 'skills' ? 'public' : 'private',
        })
      )
    }
  }

  return records.toSorted((a, b) => a.location.name.localeCompare(b.location.name))
}

function readSkill(location: SkillLocation): SkillRecord {
  const skillMd = readFileSync(path.join(location.dir, 'SKILL.md'), 'utf8')
  const frontmatter = parseFrontmatter(skillMd, location.name)
  const body = skillMd.replace(FRONTMATTER_PATTERN, '')

  const evalsPath = path.join(location.dir, 'evals.json')
  const hasEvalsJson = existsSync(evalsPath)
  const parsed = hasEvalsJson
    ? attempt(() => evalsFileSchema.parse(JSON.parse(readFileSync(evalsPath, 'utf8'))))
    : null
  const evalsFile: EvalsFile | null = parsed?.ok ? parsed.value : null
  const evalsParseError: string | null = parsed && !parsed.ok ? parsed.error.message : null

  return {
    location,
    frontmatter,
    bodyLineCount: body.split('\n').length,
    hasReadme: existsSync(path.join(location.dir, 'README.md')),
    hasLicense: existsSync(path.join(location.dir, 'LICENSE')),
    hasEvalsJson,
    evalsFile,
    evalsParseError,
  }
}

/**
 * Pull frontmatter out of SKILL.md as a plain object. We do a minimal YAML
 * read here — only the keys we care about. Full YAML lives in the agent's
 * head (and in skill-creator's lint), not here.
 */
function parseFrontmatter(skillMd: string, fallbackName: string): SkillFrontmatter {
  const match = skillMd.match(FRONTMATTER_PATTERN)
  const raw: Record<string, unknown> = {}
  if (match?.[1]) {
    const fmText = match[1]
    raw.name = extractScalar(fmText, 'name') ?? fallbackName
    raw.description = extractFolded(fmText, 'description') ?? ''
    const argHint = extractScalar(fmText, 'argument-hint')
    if (argHint !== undefined) raw['argument-hint'] = argHint
    const userInv = extractScalar(fmText, 'user-invocable')
    if (userInv !== undefined) raw['user-invocable'] = userInv === 'true'
    const modelInv = extractScalar(fmText, 'model-invocable')
    if (modelInv !== undefined) raw['model-invocable'] = modelInv === 'true'
    const internal = extractScalar(fmText, '  internal')
    if (internal !== undefined) {
      raw.metadata = { internal: internal === 'true' }
    }
  } else {
    raw.name = fallbackName
    raw.description = ''
  }
  return skillFrontmatterSchema.parse(raw)
}

function extractScalar(fm: string, key: string): string | undefined {
  const re = new RegExp(`^${escapeRegExp(key)}:\\s*(.+?)\\s*$`, 'm')
  const m = fm.match(re)
  if (!m?.[1]) return undefined
  return m[1]
    .replace(/^['"]|['"]$/g, '')
    .replace(/\s*#.*$/, '')
    .trim()
}

function extractFolded(fm: string, key: string): string | undefined {
  const re = new RegExp(`^${escapeRegExp(key)}:\\s*>-?\\s*\\n((?:\\s{2,}.*\\n?)+)`, 'm')
  const m = fm.match(re)
  if (!m?.[1]) {
    const scalar = extractScalar(fm, key)
    return scalar
  }
  return m[1]
    .split('\n')
    .map((line) => line.replace(/^\s+/, '').trim())
    .filter(Boolean)
    .join(' ')
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Read every iteration in a skill's workspace dir (gitignored sibling).
 */
export function readWorkspace(skill: SkillRecord): IterationSummary[] {
  const workspaceDir = path.join(skill.location.dir, '.workspace')
  if (!existsSync(workspaceDir)) return []

  const iterations: IterationSummary[] = []
  for (const entry of readdirSync(workspaceDir)) {
    const m = entry.match(/^iteration-(\d+)$/)
    if (!m?.[1]) continue
    const iterationDir = path.join(workspaceDir, entry)
    if (!statSync(iterationDir).isDirectory()) continue
    iterations.push(readIteration(parseInt(m[1], 10), iterationDir))
  }

  return iterations.toSorted((a, b) => b.iteration - a.iteration)
}

function readIteration(iteration: number, dir: string): IterationSummary {
  const benchmarkPath = path.join(dir, 'benchmark.json')
  const benchmarkResult = existsSync(benchmarkPath)
    ? attempt(() => benchmarkFileSchema.parse(JSON.parse(readFileSync(benchmarkPath, 'utf8'))))
    : null
  const benchmark: BenchmarkFile | null = benchmarkResult?.ok ? benchmarkResult.value : null
  const generatedAt: string | null = benchmark?.generated_at ?? null

  const evals: ScenarioSummary[] = []
  for (const entry of readdirSync(dir)) {
    const m = entry.match(/^eval-(\d+)-(.+)$/)
    if (!m?.[1] || !m[2]) continue
    const evalDir = path.join(dir, entry)
    if (!statSync(evalDir).isDirectory()) continue
    evals.push({
      evalId: parseInt(m[1], 10),
      evalName: m[2],
      dir: evalDir,
      withSkill: readVariant(path.join(evalDir, 'with_skill')),
      withoutSkill: readVariant(path.join(evalDir, 'without_skill')),
    })
  }

  return {
    iteration,
    dir,
    generatedAt,
    evals: evals.toSorted((a, b) => a.evalId - b.evalId),
    benchmark,
  }
}

function readVariant(dir: string): VariantSummary | null {
  if (!existsSync(dir)) return null
  const transcriptPath = path.join(dir, 'transcript.md')
  const hasTranscript = existsSync(transcriptPath)
  const gradingPath = path.join(dir, 'grading.json')
  const gradingResult = existsSync(gradingPath)
    ? attempt(() => gradingFileSchema.parse(JSON.parse(readFileSync(gradingPath, 'utf8'))))
    : null
  const grading: GradingFile | null = gradingResult?.ok ? gradingResult.value : null
  return {
    dir,
    hasTranscript,
    transcriptPath: hasTranscript ? transcriptPath : null,
    grading,
  }
}

/**
 * Find the repo root by walking up from `from` until a `pnpm-workspace.yaml`
 * is found.
 */
export function findRepoRoot(from: string): string {
  let cur = from
  while (cur !== path.dirname(cur)) {
    if (existsSync(path.join(cur, 'pnpm-workspace.yaml'))) return cur
    cur = path.dirname(cur)
  }
  throw new Error(`Could not find repo root from ${from}`)
}
