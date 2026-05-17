import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { z } from 'zod'

import type { SkillRecord } from './types.js'

/**
 * Filename of the per-skill manifest. Lives at `<skill>/skill.json`.
 */
export const SKILL_MANIFEST_FILE = 'skill.json'

const KEBAB_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

/**
 * Severity level for a lint-rule override, plus `'off'` to disable
 * the rule entirely for this skill. Mirrors the lint runner's
 * `Severity` union with the extra disable sentinel.
 */
export const LintLevelSchema = z
  .enum(['error', 'warn', 'info', 'off'])
  .describe('Severity to apply, or `off` to suppress findings for this skill')

/**
 * Per-rule override entry under `lint.<rule-id>`.
 */
export const LintRuleConfigSchema = z
  .object({
    level: LintLevelSchema,
  })
  .describe('Override config for one rule — keyed by the rule id in the parent map')

/**
 * Schema for `<skill>/skill.json` — the per-skill manifest. Declares
 * which canonical scripts to vendor and which lint rules to disable
 * or re-level for this skill specifically.
 */
export const SkillManifestSchema = z
  .object({
    scripts: z
      .array(
        z
          .string()
          .regex(KEBAB_RE, { message: 'script name must be kebab-case' })
          .describe('Kebab-case name of a canonical script under skill-scripts/<name>/')
      )
      .min(1, { message: 'skill.json `scripts` must list at least one script' })
      .optional()
      .describe('Names of shared scripts to vendor — each entry resolves to skill-scripts/<name>/'),
    lint: z
      .record(
        z
          .string()
          .regex(KEBAB_RE, { message: 'rule id must be kebab-case' })
          .describe('Kebab-case rule id (e.g. `dir-name`, `body-too-long`)'),
        LintRuleConfigSchema
      )
      .optional()
      .describe('Per-rule overrides — disable or change severity for this skill'),
  })
  .describe('Validated shape of <skill>/skill.json — the per-skill manifest')

/**
 * TypeScript shape of a parsed `skill.json`, inferred from
 * `SkillManifestSchema` so the two cannot drift.
 */
export type SkillManifest = z.infer<typeof SkillManifestSchema>

/**
 * Resolved lint-config level — either a real severity or `'off'`.
 */
export type LintLevel = z.infer<typeof LintLevelSchema>

/**
 * Per-rule override config — the value side of `manifest.lint`.
 */
export type LintRuleConfig = z.infer<typeof LintRuleConfigSchema>

/**
 * Read a skill's manifest (`skill.json`) if present. Returns `null`
 * when the skill ships no manifest — that's the common case.
 */
export function readManifest(skill: SkillRecord): SkillManifest | null {
  const manifestPath = path.join(skill.location.dir, SKILL_MANIFEST_FILE)
  if (!existsSync(manifestPath)) return null
  const raw = JSON.parse(readFileSync(manifestPath, 'utf8'))
  return SkillManifestSchema.parse(raw)
}
