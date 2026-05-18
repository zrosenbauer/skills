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
 * One discovered agent — its location plus the parsed frontmatter
 * the lint rules operate on.
 */
export interface AgentRecord {
  /**
   * Filesystem coordinates for the agent.
   */
  location: AgentLocation
  /**
   * Parsed frontmatter object. When parsing fails this is a stub with
   * the file basename as `name` and an empty description so rules can
   * still operate; the failure surfaces via `frontmatterParseError`.
   */
  frontmatter: AgentFrontmatter
  /**
   * Schema-validation error message when frontmatter parsing failed,
   * `null` otherwise.
   */
  frontmatterParseError: string | null
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
