import { z } from 'zod'

/**
 * Schema for `<skill>/skill.json` — the per-skill manifest. Currently
 * declares which canonical scripts under `skill-scripts/<name>/` should
 * be vendored into `<skill>/scripts/<name>/`. Will grow over time as
 * more skill-level config moves out of frontmatter.
 */
export const SkillManifestSchema = z
  .object({
    scripts: z
      .array(
        z
          .string()
          .regex(/^[a-z][a-z0-9-]+[a-z0-9]$/, {
            message: 'script name must be kebab-case',
          })
          .describe('Kebab-case name of a canonical script under skill-scripts/<name>/')
      )
      .min(1, { message: 'skill.json `scripts` must list at least one script' })
      .optional()
      .describe(
        'Names of shared scripts to vendor into this skill. Each entry resolves to skill-scripts/<name>/'
      ),
  })
  .describe('Validated shape of <skill>/skill.json — the per-skill manifest')

/**
 * TypeScript shape of a parsed `skill.json`, inferred from
 * `SkillManifestSchema` so the two cannot drift.
 */
export type SkillManifest = z.infer<typeof SkillManifestSchema>
