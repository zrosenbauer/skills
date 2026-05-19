import type { AgentFrontmatter } from './schema.js'

/**
 * Where an agent file lives on disk and which provider's convention
 * it came from. Mirrors `SkillLocation` but agents are single .md
 * files, not directories, so the `file` path replaces `dir`.
 */
export interface AgentLocation {
  /**
   * Kebab-case agent name, taken from the file basename (sans `.md`).
   */
  name: string
  /**
   * Absolute path to the agent's `.md` file.
   */
  file: string
  /**
   * Provider this file was discovered under (e.g. `claude-code`).
   * Drives provider-specific lint rules in the future.
   */
  provider: string
  /**
   * Project-relative discovery path the file matched (e.g.
   * `.claude/agents`). Useful for grouping in lint output.
   */
  source: string
}

/**
 * One discovered agent — its location plus the loosely-parsed
 * frontmatter the lint rules operate on. Mirrors `SkillRecord` —
 * frontmatter is `Partial<AgentFrontmatter>` so rules narrow each
 * field they read.
 */
export interface AgentRecord {
  /**
   * Filesystem coordinates for the agent.
   */
  location: AgentLocation
  /**
   * Parsed frontmatter as a loose object. Always present (empty
   * object when no fence was found or the YAML produced a non-object).
   * Rules must narrow each field — values may be `undefined` or the
   * wrong type.
   */
  frontmatter: Partial<AgentFrontmatter>
  /**
   * YAML syntax error message when the body between `---` fences
   * couldn't be parsed at all, `null` otherwise. Drives the
   * `fm-invalid-yaml` rule.
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
   * length-bound rule.
   */
  bodyLineCount: number
}
