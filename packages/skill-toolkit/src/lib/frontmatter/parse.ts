import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'
import type { z } from 'zod'

import type { FrontmatterParseResult } from './types.js'

/**
 * Matches the YAML frontmatter fence at the start of a markdown
 * document. Capture group 1 is the YAML body. Multi-document YAML
 * is not supported — only the first fence is read.
 *
 * Single source of truth for the fence shape across the toolkit —
 * skills, agents, and any future markdown-with-frontmatter asset
 * type all share this regex.
 */
export const FRONTMATTER_RE = /^---\n([\s\S]+?)\n---\n/

/**
 * Build a typed frontmatter parser bound to a zod schema. The
 * returned function reads a markdown string, extracts the YAML
 * frontmatter, validates it against the schema, and returns a
 * `{ body, frontmatter, error }` shape — see
 * `FrontmatterParseResult`.
 *
 * Factory shape (rather than a plain `parse(input, schema)`
 * function) so callers can name and reuse a parser per schema:
 *
 *     const parseSkill = createFrontmatterParser(SkillSchema)
 *     const { body, frontmatter, error } = parseSkill(md)
 */
export function createFrontmatterParser<T extends z.ZodTypeAny>(
  schema: T
): (input: string) => FrontmatterParseResult<z.infer<T>> {
  return (input) => {
    const match = FRONTMATTER_RE.exec(input)
    const body = input.replace(FRONTMATTER_RE, '')

    if (!match) {
      return { body, frontmatter: null, error: null }
    }

    const result = attempt(() => schema.parse(parseYaml(match[1] ?? '')))
    if (result.ok) {
      return { body, frontmatter: result.value as z.infer<T>, error: null }
    }
    return { body, frontmatter: null, error: result.error.message }
  }
}
