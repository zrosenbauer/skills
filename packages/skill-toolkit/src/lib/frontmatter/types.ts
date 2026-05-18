/**
 * Result of parsing a markdown document's YAML frontmatter via
 * `createFrontmatterParser`. Failures don't throw — they surface as
 * `error`, with `frontmatter: null`, so callers can stub data or
 * report the failure as a lint finding.
 */
export interface FrontmatterParseResult<T> {
  /**
   * The document body with the frontmatter fence stripped. Always
   * present — even when frontmatter parsing fails or no fence is
   * found, callers can still inspect the body.
   */
  body: string
  /**
   * The typed, validated frontmatter object — populated only when
   * the YAML parses and matches the schema. Null when the parse
   * failed or no fence was found.
   */
  frontmatter: T | null
  /**
   * Schema validation error message when parsing failed; null
   * otherwise (including the case where no frontmatter fence
   * exists).
   */
  error: string | null
}
