import { existsSync } from 'node:fs'
import path from 'node:path'

/**
 * Walk up from `from` until a `pnpm-workspace.yaml` is found. Throws when
 * called from outside the monorepo — that's a caller bug, not an expected
 * failure mode.
 */
export function findRepoRoot(from: string): string {
  let cur = from
  while (cur !== path.dirname(cur)) {
    if (existsSync(path.join(cur, 'pnpm-workspace.yaml'))) return cur
    cur = path.dirname(cur)
  }
  throw new Error(`Could not find repo root from ${from}`)
}
