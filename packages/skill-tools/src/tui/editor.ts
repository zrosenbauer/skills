/**
 * Parse a `$EDITOR` environment value into a command + extra args pair.
 *
 * Many users export composite values like `EDITOR="code --wait"` or
 * `EDITOR="vim -R"`. Passing the whole string to `spawnSync` as a binary
 * name fails with `ENOENT`, so we split on whitespace and surface the
 * extras separately.
 *
 * Returns `null` for empty / whitespace-only input so callers can no-op
 * cleanly instead of crashing.
 */
export function parseEditorEnv(envValue: string): { cmd: string; args: string[] } | null {
  const parts = envValue.split(/\s+/).filter(Boolean)
  const [cmd, ...args] = parts
  if (!cmd) return null
  return { cmd, args }
}
