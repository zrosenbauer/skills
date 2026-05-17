import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'

import { FRONTMATTER_RE, SkillSchema, type SkillFrontmatter } from './schema.js'
import type { SkillLocation, SkillRecord } from './types.js'

const SKILL_ROOTS = ['skills', '.agents/skills'] as const

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

/**
 * Read one skill's `SKILL.md` and produce a record. Frontmatter parse errors
 * are captured (not thrown) so the lint can surface them as findings.
 */
function readSkill(location: SkillLocation): SkillRecord {
  const skillMd = readFileSync(path.join(location.dir, 'SKILL.md'), 'utf8')
  const fmMatch = FRONTMATTER_RE.exec(skillMd)
  const fmParse = fmMatch ? attempt(() => SkillSchema.parse(parseYaml(fmMatch[1] ?? ''))) : null
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
