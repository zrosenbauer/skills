import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'
import { z } from 'zod'

import { type EvalsFile, evalsFileSchema } from '../evals/schemas.js'

/**
 * Skill frontmatter — what every agent loader reads. `name` + `description`
 * are universally required; everything else is a Claude Code extension that
 * other agents ignore.
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

const FRONTMATTER_RE = /^---\n([\s\S]+?)\n---\n/
const SKILL_ROOTS = ['skills', '.agents/skills'] as const

export interface SkillLocation {
  name: string
  dir: string
  source: 'public' | 'private'
}

export interface SkillRecord {
  location: SkillLocation
  frontmatter: SkillFrontmatter
  frontmatterParseError: string | null
  bodyLineCount: number
  hasReadme: boolean
  hasLicense: boolean
  hasEvalsJson: boolean
  evalsFile: EvalsFile | null
  evalsParseError: string | null
}

/**
 * Discover every skill under `skills/` (public) and `.agents/skills/` (private).
 * Each record carries the parsed frontmatter, evals file, and the cheap
 * existence flags lint uses. Failures don't throw — they surface as
 * `frontmatterParseError` / `evalsParseError` so the lint can report them.
 */
export function findSkills(repoRoot: string): SkillRecord[] {
  const records: SkillRecord[] = []
  for (const root of SKILL_ROOTS) {
    const absRoot = path.join(repoRoot, root)
    if (!existsSync(absRoot)) continue

    for (const name of readdirSync(absRoot)) {
      const dir = path.join(absRoot, name)
      if (!statSync(dir).isDirectory()) continue
      const skillMdPath = path.join(dir, 'SKILL.md')
      if (!existsSync(skillMdPath)) continue

      records.push(
        readSkill({
          name,
          dir,
          source: root === 'skills' ? 'public' : 'private',
        })
      )
    }
  }
  return records.toSorted((a, b) => a.location.name.localeCompare(b.location.name))
}

function readSkill(location: SkillLocation): SkillRecord {
  const skillMd = readFileSync(path.join(location.dir, 'SKILL.md'), 'utf8')
  const fmMatch = FRONTMATTER_RE.exec(skillMd)
  const fmParse = fmMatch
    ? attempt(() => skillFrontmatterSchema.parse(parseYaml(fmMatch[1] ?? '')))
    : null
  const frontmatter: SkillFrontmatter = fmParse?.ok
    ? fmParse.value
    : { name: location.name, description: '' }
  const frontmatterParseError = fmParse && !fmParse.ok ? fmParse.error.message : null
  const body = skillMd.replace(FRONTMATTER_RE, '')

  const evalsPath = path.join(location.dir, 'evals.json')
  const hasEvalsJson = existsSync(evalsPath)
  const evalsParse = hasEvalsJson
    ? attempt(() => evalsFileSchema.parse(JSON.parse(readFileSync(evalsPath, 'utf8'))))
    : null
  const evalsFile: EvalsFile | null = evalsParse?.ok ? evalsParse.value : null
  const evalsParseError = evalsParse && !evalsParse.ok ? evalsParse.error.message : null

  return {
    location,
    frontmatter,
    frontmatterParseError,
    bodyLineCount: body.split('\n').length,
    hasReadme: existsSync(path.join(location.dir, 'README.md')),
    hasLicense: existsSync(path.join(location.dir, 'LICENSE')),
    hasEvalsJson,
    evalsFile,
    evalsParseError,
  }
}
