import type { CheckFrame } from '../lint/rule.js'

/**
 * Build a code-frame attachment for a frontmatter parse error.
 *
 * The frontmatter fence sits at lines 1..N of the source file:
 *
 *     1: ---
 *     2: name: foo
 *     3: description: bar
 *     4: ---
 *
 * So the YAML body's first line is line 2 of the file. We render the
 * YAML body verbatim and try to annotate the offending field by
 * grepping the raw YAML for the path prefix in the parser's error
 * message (e.g. `name: Invalid input...` → annotate the `name:` line).
 * Falls back to annotating line 2 when no specific field can be found.
 */
export function buildFrontmatterFrame({
  filePath,
  raw,
  err,
}: {
  filePath: string
  raw: string
  err: string
}): CheckFrame {
  const lines = raw.split('\n')
  const firstField = err.split(':')[0]?.trim()
  const lineWithinBody = firstField ? findFieldLine({ lines, field: firstField }) : 0
  const fileLine = 2 + lineWithinBody

  return {
    filePath,
    lines,
    startLine: 2,
    annotation: {
      line: fileLine,
      column: 1,
      length: lines[lineWithinBody]?.length ?? 1,
      message: err,
    },
  }
}

/**
 * Find the 0-based line index where a YAML key appears at the root
 * level (matches `<field>:` at the start of a line, ignoring leading
 * whitespace). Returns 0 when the field can't be found.
 */
function findFieldLine({ lines, field }: { lines: string[]; field: string }): number {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? ''
    if (new RegExp(`^\\s*${escapeRegex(field)}\\s*:`).test(line)) return i
  }
  return 0
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
