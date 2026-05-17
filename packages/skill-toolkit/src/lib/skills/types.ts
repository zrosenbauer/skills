import type { SkillFrontmatter } from './schema.js'

/**
 * Where a skill lives on disk and whether it came from the public
 * authoring source (`skills/`) or the install destination (`.agents/skills/`).
 */
export interface SkillLocation {
  /**
   * Kebab-case skill name, taken from the directory basename.
   */
  name: string
  /**
   * Absolute path to the skill's directory.
   */
  dir: string
  /**
   * `public` for `skills/` (authoring), `private` for `.agents/skills/`
   * (installed). Used by renderers to tag where each skill came from.
   */
  source: 'public' | 'private'
}

/**
 * One discovered skill — its location plus the parsed `SKILL.md`
 * contents the lint rules operate on.
 */
export interface SkillRecord {
  /**
   * Filesystem coordinates for the skill.
   */
  location: SkillLocation
  /**
   * Parsed frontmatter object. When parsing fails this is a stub with
   * the directory name as `name` and an empty description, so rules can
   * still operate; the failure surfaces via `frontmatterParseError`.
   */
  frontmatter: SkillFrontmatter
  /**
   * Schema-validation error message when frontmatter parsing failed,
   * `null` otherwise. Surfaced by the FM_PARSE_FAILED rule.
   */
  frontmatterParseError: string | null
  /**
   * Number of lines in the body (frontmatter stripped). Drives the
   * BODY_TOO_LONG rule.
   */
  bodyLineCount: number
  /**
   * Whether the skill directory contains a `README.md`.
   */
  hasReadme: boolean
  /**
   * Whether the skill directory contains a `LICENSE` file.
   */
  hasLicense: boolean
}
