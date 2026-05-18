import { z } from 'zod'

/**
 * Skill frontmatter schema — what every agent loader reads. `name` +
 * `description` are universally required; the rest are Claude Code
 * extensions that other agents silently ignore.
 *
 * Fields are sourced from the official Claude Code skills docs at
 * https://code.claude.com/docs/en/skills.md. Anything not documented
 * there isn't accepted by Claude Code's loader and shouldn't be in
 * this schema.
 */
export const SkillSchema = z
  .object({
    name: z.string().min(1).describe('kebab-case identifier; must match the skill directory name'),
    description: z
      .string()
      .min(1)
      .describe(
        'One paragraph describing when to use the skill — includes trigger phrases for dispatcher routing'
      ),
    'argument-hint': z
      .string()
      .optional()
      .describe(
        'Claude Code extension: hint shown during autocomplete to indicate expected arguments'
      ),
    'user-invocable': z
      .boolean()
      .optional()
      .describe(
        'Claude Code extension: when `false`, hides the skill from the `/` slash-command menu (Claude can still invoke it)'
      ),
    'disable-model-invocation': z
      .boolean()
      .optional()
      .describe(
        'Claude Code extension: when `true`, prevents Claude from auto-loading the skill (only the user can invoke via `/`)'
      ),
    'allowed-tools': z
      .string()
      .optional()
      .describe(
        'Claude Code extension: tools Claude can use without asking permission when this skill is active'
      ),
  })
  .describe('Validated shape of the YAML frontmatter at the top of every SKILL.md')

/**
 * TypeScript shape of a parsed skill frontmatter block, inferred from
 * `SkillSchema` so the two cannot drift.
 */
export type SkillFrontmatter = z.infer<typeof SkillSchema>
