import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'
import { type z, ZodError } from 'zod'

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
      return { body, raw: null, frontmatter: null, error: null }
    }

    const raw = match[1] ?? ''
    const result = attempt(() => schema.parse(parseYaml(raw)))
    if (result.ok) {
      return { body, raw, frontmatter: result.value as z.infer<T>, error: null }
    }
    return { body, raw, frontmatter: null, error: formatParseError(result.error) }
  }
}

/**
 * Render parse errors as a single readable line. Zod's
 * `error.message` is a JSON dump of every issue — readable in a
 * debugger but ugly in lint output. Extract the issue list and
 * format as `field.path: message; field.path: message`. Non-zod
 * errors (e.g. YAML syntax errors from the `yaml` package) fall
 * through to their own `.message`.
 */
function formatParseError(err: unknown): string {
  if (err instanceof ZodError) {
    return err.issues
      .map((issue) => {
        const path = issue.path.join('.') || '(root)'
        return `${path}: ${issue.message}`
      })
      .join('; ')
  }
  if (err instanceof Error) return err.message
  return String(err)
}
