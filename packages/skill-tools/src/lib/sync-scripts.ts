import { createHash } from 'node:crypto'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'

import { type ScriptsManifest, scriptsManifestSchema } from './schemas.js'
import { findSkills, type SkillRecord } from './skills.js'

const SKILL_SCRIPTS_DIR = 'skill-scripts'

/**
 * One file copied from `skill-scripts/<name>/` into `<skill>/scripts/<name>/`.
 */
export interface VendoredFile {
  relative: string
  source: string
  target: string
}

/**
 * Result of one sync attempt: the files copied (or that would be copied
 * in --check mode), and any drift detected when comparing target hashes
 * to source hashes.
 */
export interface SyncReport {
  skill: string
  scriptName: string
  /**
   * Top-level vendored directory for this script under the skill. Used by
   * applySync to wholesale-replace the directory so files removed from the
   * source allowlist also disappear from the vendored copy.
   */
  targetDir: string
  files: VendoredFile[]
  drift: VendoredFile[]
  missingScript: boolean
}

/**
 * Read all script manifests in the repo and return one report per
 * (skill, declared-script) pair. Pure — never writes.
 */
export function planSync(repoRoot: string): SyncReport[] {
  const skills = findSkills(repoRoot)
  const reports: SyncReport[] = []
  for (const skill of skills) {
    const manifest = readManifest(skill)
    if (!manifest) continue
    for (const scriptName of manifest.scripts) {
      reports.push(buildReport({ repoRoot, skill, scriptName }))
    }
  }
  return reports
}

/**
 * Apply a sync report — copies files from source to target, replacing the
 * vendored directory's contents wholesale so removed source files don't
 * linger as stale vendored copies.
 */
export function applySync(report: SyncReport): void {
  if (report.missingScript) return
  if (report.files.length === 0) return

  if (existsSync(report.targetDir)) rmSync(report.targetDir, { recursive: true, force: true })
  mkdirSync(report.targetDir, { recursive: true })

  for (const file of report.files) {
    mkdirSync(path.dirname(file.target), { recursive: true })
    writeFileSync(file.target, readFileSync(file.source))
  }
}

/** @private */
function readManifest(skill: SkillRecord): ScriptsManifest | null {
  const manifestPath = path.join(skill.location.dir, 'scripts.json')
  if (!existsSync(manifestPath)) return null
  const raw = JSON.parse(readFileSync(manifestPath, 'utf8'))
  return scriptsManifestSchema.parse(raw)
}

/** @private */
function buildReport({
  repoRoot,
  skill,
  scriptName,
}: {
  repoRoot: string
  skill: SkillRecord
  scriptName: string
}): SyncReport {
  const sourceDir = path.join(repoRoot, SKILL_SCRIPTS_DIR, scriptName)
  const targetDir = path.join(skill.location.dir, 'scripts', scriptName)
  if (!existsSync(sourceDir)) {
    return {
      skill: skill.location.name,
      scriptName,
      targetDir,
      files: [],
      drift: [],
      missingScript: true,
    }
  }

  const relativePaths = manifestVendorablePaths(sourceDir) ?? listVendorableFiles(sourceDir)
  const files = relativePaths.map((rel) => ({
    relative: rel,
    source: path.join(sourceDir, rel),
    target: path.join(targetDir, rel),
  }))

  // After enumerating source files, also check for any extra files in the
  // vendored target dir that don't exist in the source — those are drift too
  // (someone added a file directly to the vendored copy).
  const targetExtras = existsSync(targetDir)
    ? listVendorableFiles(targetDir).filter((rel) => !files.some((f) => f.relative === rel))
    : []
  const drift: VendoredFile[] = [
    ...files.filter((f) => !filesMatch(f.source, f.target)),
    ...targetExtras.map((rel) => ({
      relative: rel,
      source: path.join(sourceDir, rel),
      target: path.join(targetDir, rel),
    })),
  ]

  return {
    skill: skill.location.name,
    scriptName,
    targetDir,
    files,
    drift,
    missingScript: false,
  }
}

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
 *
 * @private
 */
function manifestVendorablePaths(sourceDir: string): string[] | null {
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
 *
 * @private
 */
function listVendorableFiles(dir: string): string[] {
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

/** @private */
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

/**
 * Hash-compare two files. Returns true if both exist and have identical
 * SHA-256 hashes.
 *
 * @private
 */
function filesMatch(a: string, b: string): boolean {
  if (!existsSync(a) || !existsSync(b)) return false
  return hashFile(a) === hashFile(b)
}

/** @private */
function hashFile(p: string): string {
  return createHash('sha256').update(readFileSync(p)).digest('hex')
}
