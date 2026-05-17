import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'
import { z } from 'zod'

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
}

/**
 * Discover every skill under `skills/` (public) and `.agents/skills/` (private).
 * Failures don't throw — they surface as `frontmatterParseError` so the lint
 * can report them.
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

  return {
    location,
    frontmatter,
    frontmatterParseError,
    bodyLineCount: body.split('\n').length,
    hasReadme: existsSync(path.join(location.dir, 'README.md')),
    hasLicense: existsSync(path.join(location.dir, 'LICENSE')),
  }
}
