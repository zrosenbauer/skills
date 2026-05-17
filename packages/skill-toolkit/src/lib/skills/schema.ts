import { z } from 'zod'

/**
 * Skill frontmatter schema — what every agent loader reads. `name` +
 * `description` are universally required; everything else is a Claude
 * Code extension that other agents ignore.
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
      .describe('Claude Code extension: placeholder shown in the slash-command picker'),
    'user-invocable': z
      .boolean()
      .optional()
      .describe('Claude Code extension: whether the user can invoke this skill with /skill-name'),
    'model-invocable': z
      .boolean()
      .optional()
      .describe('Claude Code extension: whether the model can autonomously dispatch this skill'),
    metadata: z
      .object({
        internal: z
          .boolean()
          .optional()
          .describe('Marks the skill as internal (not for publication via `npx skills add`)'),
        author: z.string().optional().describe('Author attribution string'),
        version: z.string().optional().describe('Semver-style version string'),
        tags: z.string().optional().describe('Comma-separated tags used by skill catalogs'),
      })
      .optional()
      .describe('Optional Claude Code extension metadata bag — ignored by other agent loaders'),
  })
  .describe('Validated shape of the YAML frontmatter at the top of every SKILL.md')

/**
 * TypeScript shape of a parsed skill frontmatter block, inferred from
 * `SkillSchema` so the two cannot drift.
 */
export type SkillFrontmatter = z.infer<typeof SkillSchema>

/**
 * Matches the YAML frontmatter fence at the start of a SKILL.md, with
 * capture group 1 being the YAML body. Multi-document YAML is not
 * supported — only the first fence is read.
 */
export const FRONTMATTER_RE = /^---\n([\s\S]+?)\n---\n/
