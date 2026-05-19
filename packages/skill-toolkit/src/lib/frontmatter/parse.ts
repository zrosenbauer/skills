import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'

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
 * Parse a markdown document's YAML frontmatter. The linter is the
 * primary consumer and doesn't want schema-bound parsing — every rule
 * narrows the fields it cares about — so this returns a loose
 * `Partial<T>` view. Only YAML-syntax failures populate `error`.
 *
 * The `T` generic is purely a typing convenience for the caller — it
 * shapes autocomplete on `frontmatter.<field>` without claiming
 * runtime guarantees. Pass the expected type at the call site:
 *
 *     const { frontmatter } = parseFrontmatter<SkillFrontmatter>(md)
 *     // frontmatter is Partial<SkillFrontmatter> | null
 */
export function parseFrontmatter<T = Record<string, unknown>>(
  input: string
): FrontmatterParseResult<T> {
  const match = FRONTMATTER_RE.exec(input)
  const body = input.replace(FRONTMATTER_RE, '')

  if (!match) {
    return { body, raw: null, frontmatter: null, error: null }
  }

  const raw = match[1] ?? ''
  const result = attempt(() => parseYaml(raw) as Partial<T>)
  if (result.ok) {
    // YAML can legally produce a non-object (e.g. `---\nfoo\n---`).
    // Treat anything that isn't a plain object as an empty frontmatter
    // so rules read `undefined` from missing fields rather than
    // exploding on property access.
    const value =
      result.value !== null && typeof result.value === 'object' && !Array.isArray(result.value)
        ? result.value
        : ({} as Partial<T>)
    return { body, raw, frontmatter: value, error: null }
  }

  const err = result.error
  const message = err instanceof Error ? err.message : String(err)
  return { body, raw, frontmatter: null, error: message }
}
