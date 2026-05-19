/**
 * Result of parsing a markdown document's YAML frontmatter via
 * `parseFrontmatter`. The linter doesn't validate the parsed shape —
 * each rule narrows the fields it cares about. Only YAML-syntax
 * failures surface as `error`; missing/wrong-typed fields are the
 * rules' job to diagnose.
 */
export interface FrontmatterParseResult<T> {
  /**
   * The document body with the frontmatter fence stripped. Always
   * present — even when frontmatter parsing fails or no fence is
   * found, callers can still inspect the body.
   */
  body: string
  /**
   * Raw YAML body extracted from between the `---` fence markers.
   * Null when no fence was found. Used by rules that emit code
   * frames so they can render the offending YAML.
   */
  raw: string | null
  /**
   * Parsed YAML object, loosely typed as `Partial<T>` so consumers
   * can read expected fields by name. The runtime shape is whatever
   * the YAML produced — fields may be missing or the wrong type.
   * Rules narrow each field they touch. Null when the YAML itself
   * failed to parse or no fence was found.
   */
  frontmatter: Partial<T> | null
  /**
   * YAML syntax error when the body between fences couldn't parse.
   * Null otherwise — including the case where fields are missing or
   * the wrong type (that's not a parser concern).
   */
  error: string | null
}
