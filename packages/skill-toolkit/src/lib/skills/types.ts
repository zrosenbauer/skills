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
 * One discovered skill — its location plus the loosely-parsed
 * `SKILL.md` contents the lint rules operate on. Frontmatter is
 * `Partial<SkillFrontmatter>` because the parser does a plain YAML
 * read — every rule narrows the fields it cares about, so missing or
 * wrong-typed fields surface as proper lint findings instead of
 * silent parse failures.
 */
export interface SkillRecord {
  /**
   * Filesystem coordinates for the skill.
   */
  location: SkillLocation
  /**
   * Parsed frontmatter as a loose object. Always present (empty
   * object when no fence was found or the YAML produced a non-object).
   * Rules must narrow each field they read — values may be `undefined`
   * or the wrong type.
   */
  frontmatter: Partial<SkillFrontmatter>
  /**
   * YAML syntax error message when the body between `---` fences
   * couldn't be parsed at all, `null` otherwise. Drives the
   * `fm-invalid-yaml` rule. Missing/wrong-typed fields do NOT land
   * here — that's each rule's responsibility.
   */
  frontmatterYamlError: string | null
  /**
   * Raw YAML body of the frontmatter fence (the string between the
   * `---` markers). Used by rules that emit code frames pointing at
   * the bad field. `null` when no fence was found in the source.
   */
  frontmatterRaw: string | null
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
