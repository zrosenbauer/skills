import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

/**
 * If the source directory is a workspace package with a `files` array in
 * its `package.json`, return the vendorable paths from that allowlist.
 * Each entry can be a file path (vendored directly) or a directory path
 * (recursively included). Returns `null` if there's no manifest or no
 * `files` array, in which case the caller falls back to convention-based
 * discovery.
 *
 * Conceptually mirrors `npm pack`'s file selection: `files` is the
 * authoritative ship list when a package opts in.
 */
export function manifestVendorablePaths(sourceDir: string): string[] | null {
  const manifestPath = path.join(sourceDir, 'package.json')
  if (!existsSync(manifestPath)) return null
  let manifest: { files?: unknown }
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  } catch {
    return null
  }
  if (!Array.isArray(manifest.files) || manifest.files.length === 0) return null

  const out: string[] = []
  const seen = new Set<string>()
  const add = (rel: string): void => {
    if (seen.has(rel)) return
    seen.add(rel)
    out.push(rel)
  }
  const walk = (absDir: string, relPrefix: string): void => {
    for (const entry of readdirSync(absDir)) {
      if (entry.startsWith('.')) continue
      const abs = path.join(absDir, entry)
      const rel = relPrefix ? `${relPrefix}/${entry}` : entry
      const st = statSync(abs)
      if (st.isDirectory()) walk(abs, rel)
      else if (st.isFile()) add(rel)
    }
  }

  for (const raw of manifest.files) {
    if (typeof raw !== 'string') continue
    const entry = raw.replace(/^\/+/, '').replace(/\/+$/, '')
    if (!entry || entry.startsWith('..')) continue
    const abs = path.join(sourceDir, entry)
    if (!existsSync(abs)) continue
    const st = statSync(abs)
    if (st.isFile()) add(entry)
    else if (st.isDirectory()) walk(abs, entry)
  }
  return out.toSorted()
}

/**
 * Recursively walk a directory and return paths (relative to `dir`) of files
 * eligible for vendoring. Excludes test files and dotfiles — tests live with
 * the source only, dotfiles aren't intended consumption. This is the
 * fallback when a skill-script has no `package.json` `files` allowlist.
 */
export function listVendorableFiles(dir: string): string[] {
  const out: string[] = []
  const walk = (cur: string, prefix: string): void => {
    for (const entry of readdirSync(cur)) {
      if (entry.startsWith('.')) continue
      const abs = path.join(cur, entry)
      const rel = prefix ? `${prefix}/${entry}` : entry
      const st = statSync(abs)
      if (st.isDirectory()) {
        walk(abs, rel)
      } else if (st.isFile() && isVendorable(rel)) {
        out.push(rel)
      }
    }
  }
  walk(dir, '')
  return out.toSorted()
}

/**
 * Filter for the convention-based discovery path. Excludes test files,
 * READMEs, and workspace metadata — those live with the source only and
 * are not part of the vendored payload consuming skills ship.
 */
function isVendorable(relPath: string): boolean {
  if (relPath.endsWith('.test.mjs')) return false
  if (relPath.endsWith('.test.js')) return false
  if (relPath === 'README.md') return false
  // Workspace metadata — never part of the vendored payload.
  if (relPath === 'package.json') return false
  if (relPath === 'tsconfig.json') return false
  if (relPath === 'tsdown.config.ts') return false
  return true
}
