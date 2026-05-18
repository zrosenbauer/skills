import type { CheckFrame } from '../lint/rule.js'

/**
 * Build a code-frame attachment that renders the YAML frontmatter
 * body with a single-line annotation. Two modes:
 *
 *   • field passed AND found in the YAML → annotate the `field:`
 *     token (column-precise).
 *   • field omitted, or passed but missing from the YAML → annotate
 *     the first body line (whole line). Useful for "missing field"
 *     findings where there's no specific span to point at.
 *
 * The frontmatter fence sits at lines 1..N of the source file —
 * line 1 is the opening `---`, lines 2..N-1 are the YAML body, and
 * line N is the closing `---`. We render the body verbatim with
 * `startLine: 2` so the renderer prints the correct file-line numbers.
 */
export function buildFrontmatterFrame({
  filePath,
  raw,
  field,
  message,
}: {
  filePath: string
  raw: string
  field?: string
  message: string
}): CheckFrame {
  const lines = raw.split('\n')

  if (field !== undefined) {
    const re = new RegExp(`^(\\s*)(${escapeRegex(field)})(\\s*:)`)
    for (let i = 0; i < lines.length; i++) {
      const m = re.exec(lines[i] ?? '')
      if (m) {
        const indent = m[1]?.length ?? 0
        const fieldLen = (m[2]?.length ?? 0) + (m[3]?.length ?? 0)
        return {
          filePath,
          lines,
          startLine: 2,
          annotation: {
            line: 2 + i,
            column: indent + 1,
            length: fieldLen,
            message,
          },
        }
      }
    }
  }

  // Field omitted or not found → annotate the first body line. Reads as
  // "the problem is somewhere in this frontmatter block".
  return {
    filePath,
    lines,
    startLine: 2,
    annotation: {
      line: 2,
      column: 1,
      length: lines[0]?.length ?? 1,
      message,
    },
  }
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
