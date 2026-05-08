/**
 * Parse a `$EDITOR` environment value into a command + extra args pair.
 *
 * Many users export composite values like `EDITOR="code --wait"` or
 * `EDITOR="vim -R"`. Passing the whole string to `spawnSync` as a binary
 * name fails with `ENOENT`, so we tokenize and surface the extras
 * separately.
 *
 * Honors single- and double-quoted segments so editors whose path or name
 * contains spaces — e.g. `EDITOR='"Visual Studio Code" --wait'` — tokenize
 * to `['Visual Studio Code', '--wait']` instead of shattering on the
 * internal whitespace. Quotes are stripped, escapes are not interpreted
 * (matches POSIX shell single-quote semantics — keep it simple).
 *
 * Returns `null` for empty / whitespace-only input so callers can no-op
 * cleanly instead of crashing.
 */
export function parseEditorEnv(envValue: string): { cmd: string; args: string[] } | null {
  const tokens = tokenizeShellLike(envValue)
  const [cmd, ...args] = tokens
  if (!cmd) return null
  return { cmd, args }
}

/**
 * Minimal shell-like tokenizer: splits on whitespace, but treats characters
 * inside matched single or double quotes as part of a single token. Unmatched
 * quotes consume to end-of-string (best-effort recovery — `spawn` will report
 * the bad arg).
 *
 * @private
 */
function tokenizeShellLike(input: string): string[] {
  const tokens: string[] = []
  let current = ''
  let quote: '"' | "'" | null = null
  let inToken = false
  for (const ch of input) {
    if (quote) {
      if (ch === quote) {
        quote = null
        inToken = true
        continue
      }
      current += ch
      continue
    }
    if (ch === '"' || ch === "'") {
      quote = ch
      inToken = true
      continue
    }
    if (/\s/.test(ch)) {
      if (inToken) {
        tokens.push(current)
        current = ''
        inToken = false
      }
      continue
    }
    current += ch
    inToken = true
  }
  if (inToken) tokens.push(current)
  return tokens
}
