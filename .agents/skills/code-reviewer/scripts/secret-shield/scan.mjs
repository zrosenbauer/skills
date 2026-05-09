/**
 * secret-shield/scan — detect and (optionally) redact known secret formats
 * in untrusted content before forwarding to a third-party LLM.
 *
 * Mitigates W007 (insecure credential handling) when a skill ingests
 * code/diffs and could exfiltrate embedded secrets to an external CLI.
 * Pure — no I/O. Vendored into each consuming skill via skill-tools
 * sync-scripts; do not edit the vendored copy.
 *
 * Detection is regex-based against the curated `patterns.mjs` registry.
 * No entropy heuristics, no LLM judges — false-positive rate stays low
 * by trading recall for precision (we'd rather miss an obscure secret
 * than block on a base64 string that happens to look like one).
 *
 * See contributing/prompt-injection.md for the threat model.
 */

import { PATTERNS } from './patterns.mjs'

/**
 * @typedef {object} SecretFinding
 * @property {string} id          Pattern id (e.g. "aws-access-key")
 * @property {string} name        Human-readable pattern name
 * @property {"high"|"medium"} severity
 * @property {number} line        1-based line number where the match starts
 * @property {number} column      1-based column number where the match starts
 * @property {number} length      Byte length of the matched secret
 */

/**
 * Scan content for known secret formats. Returns one finding per match.
 * Multiple secrets of the same type produce multiple findings.
 *
 * @param {object} args
 * @param {string} args.content
 * @returns {{ findings: SecretFinding[], hasFindings: boolean }}
 */
export function scanForSecrets({ content }) {
  /** @type {SecretFinding[]} */
  const findings = []
  for (const pattern of PATTERNS) {
    const re = new RegExp(pattern.pattern, 'g')
    let match
    while ((match = re.exec(content)) !== null) {
      const { line, column } = locate(content, match.index)
      findings.push({
        id: pattern.id,
        name: pattern.name,
        severity: pattern.severity,
        line,
        column,
        length: match[0].length,
      })
      // Guard against zero-width matches in malformed patterns.
      if (match.index === re.lastIndex) re.lastIndex += 1
    }
  }
  // Sort by location so output is deterministic.
  findings.sort((a, b) => (a.line === b.line ? a.column - b.column : a.line - b.line))
  return { findings, hasFindings: findings.length > 0 }
}

/**
 * Replace every detected secret in `content` with a `[REDACTED-{id}-{n}]`
 * placeholder. Each finding gets a unique counter `n` (per pattern id) so
 * repeated secrets are distinguishable in review output.
 *
 * The replacement preserves byte alignment poorly (placeholders differ in
 * length from originals), so consumers should not rely on offsets after
 * redaction.
 *
 * @param {object} args
 * @param {string} args.content
 * @returns {{ content: string, findings: SecretFinding[] }}
 */
export function redactSecrets({ content }) {
  /** @type {Array<{ start: number, end: number, id: string }>} */
  const matches = []
  for (const pattern of PATTERNS) {
    const re = new RegExp(pattern.pattern, 'g')
    let m
    while ((m = re.exec(content)) !== null) {
      matches.push({ start: m.index, end: m.index + m[0].length, id: pattern.id })
      if (m.index === re.lastIndex) re.lastIndex += 1
    }
  }
  matches.sort((a, b) => a.start - b.start)

  // Drop overlapping matches — keep the earlier one (longest tie-break).
  /** @type {Array<{ start: number, end: number, id: string }>} */
  const kept = []
  for (const m of matches) {
    const last = kept[kept.length - 1]
    if (last && m.start < last.end) continue
    kept.push(m)
  }

  /** @type {Map<string, number>} */
  const counters = new Map()
  let out = ''
  let cursor = 0
  for (const m of kept) {
    out += content.slice(cursor, m.start)
    const next = (counters.get(m.id) ?? 0) + 1
    counters.set(m.id, next)
    out += `[REDACTED-${m.id}-${next}]`
    cursor = m.end
  }
  out += content.slice(cursor)

  return { content: out, findings: scanForSecrets({ content }).findings }
}

/**
 * Translate a byte index into (line, column), both 1-based.
 *
 * @param {string} content
 * @param {number} index
 * @returns {{ line: number, column: number }}
 * @private
 */
function locate(content, index) {
  let line = 1
  let lastNewline = -1
  for (let i = 0; i < index; i += 1) {
    if (content.charCodeAt(i) === 10) {
      line += 1
      lastNewline = i
    }
  }
  return { line, column: index - lastNewline }
}
