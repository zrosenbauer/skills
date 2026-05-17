import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import type { SkillRecord } from '../skills/types.js'
import { type SkillManifest, SkillManifestSchema } from './schema.js'
import { SKILL_MANIFEST_FILE } from './types.js'

/**
 * Read a skill's manifest (`skill.json`) if present. Returns `null` when the
 * skill ships no manifest — that's the common case.
 */
export function readManifest(skill: SkillRecord): SkillManifest | null {
  const manifestPath = path.join(skill.location.dir, SKILL_MANIFEST_FILE)
  if (!existsSync(manifestPath)) return null
  const raw = JSON.parse(readFileSync(manifestPath, 'utf8'))
  return SkillManifestSchema.parse(raw)
}
