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
import { type SkillRecord, discoverSkills, findRepoRoot } from './workspace.js'

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
  files: VendoredFile[]
  drift: VendoredFile[]
  missingScript: boolean
}

/**
 * Read all script manifests in the repo and return one report per
 * (skill, declared-script) pair. Pure — never writes.
 */
export function planSync(repoRoot: string): SyncReport[] {
  const skills = discoverSkills(repoRoot)
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
  const [first] = report.files
  if (!first) return

  const targetDir = path.dirname(first.target)
  if (existsSync(targetDir)) rmSync(targetDir, { recursive: true, force: true })
  mkdirSync(targetDir, { recursive: true })

  for (const file of report.files) {
    mkdirSync(path.dirname(file.target), { recursive: true })
    writeFileSync(file.target, readFileSync(file.source))
  }
}

/**
 * Locate every skill that declares a manifest. Convenience for callers
 * that want to count or display.
 */
export function findManifests(
  repoRoot: string
): { skill: SkillRecord; manifest: ScriptsManifest }[] {
  return discoverSkills(repoRoot).flatMap((skill) => {
    const manifest = readManifest(skill)
    return manifest ? [{ skill, manifest }] : []
  })
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
  if (!existsSync(sourceDir)) {
    return {
      skill: skill.location.name,
      scriptName,
      files: [],
      drift: [],
      missingScript: true,
    }
  }

  const targetDir = path.join(skill.location.dir, 'scripts', scriptName)
  const files = listVendorableFiles(sourceDir).map((rel) => ({
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
    files,
    drift,
    missingScript: false,
  }
}

/**
 * Recursively walk a directory and return paths (relative to `dir`) of files
 * eligible for vendoring. Excludes test files and dotfiles — tests live with
 * the source only, dotfiles aren't intended consumption.
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

/**
 * Convenience entry point matching the signatures other lib modules use.
 * Computes a plan then applies it.
 */
export function syncAll(repoRoot: string): SyncReport[] {
  const plan = planSync(repoRoot)
  for (const report of plan) applySync(report)
  return plan
}

export { findRepoRoot }
