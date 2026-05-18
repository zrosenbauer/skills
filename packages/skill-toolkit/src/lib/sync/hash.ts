import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'

/**
 * Hash-compare two files. Returns true only when both paths exist and
 * their SHA-256 hashes match. Either path missing returns false rather
 * than throwing, which is what the drift detector wants.
 */
export function filesMatch(a: string, b: string): boolean {
  if (!existsSync(a) || !existsSync(b)) return false
  return hashFile(a) === hashFile(b)
}

/**
 * SHA-256 of the file at `p`, hex-encoded. Caller must ensure the path
 * exists — this function throws on ENOENT.
 */
export function hashFile(p: string): string {
  return createHash('sha256').update(readFileSync(p)).digest('hex')
}
