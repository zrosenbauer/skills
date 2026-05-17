/**
 * One file copied from `skill-scripts/<name>/` into
 * `<skill>/scripts/<name>/`. Carries both ends of the copy so the
 * planner and applier can reuse the same record.
 */
export interface VendoredFile {
  /**
   * Path relative to the vendored directory root. Used for display and
   * for matching source files to target extras during drift detection.
   */
  relative: string
  /**
   * Absolute path to the canonical source file under
   * `skill-scripts/<name>/`.
   */
  source: string
  /**
   * Absolute path to the vendored copy under
   * `<skill>/scripts/<name>/`.
   */
  target: string
}

/**
 * Result of one sync attempt: the files copied (or that would be copied
 * in --check mode), and any drift detected when comparing target hashes
 * to source hashes.
 */
export interface SyncReport {
  /**
   * Skill that owns the consuming `skill.json` manifest entry.
   */
  skill: string
  /**
   * Canonical script name being vendored (the entry from
   * `skill.json.scripts`).
   */
  scriptName: string
  /**
   * Top-level vendored directory for this script under the skill. Used
   * by `applySync` to wholesale-replace the directory so files removed
   * from the source allowlist also disappear from the vendored copy.
   */
  targetDir: string
  /**
   * Every file that should appear in the vendored copy, derived from
   * the source's `files` allowlist or convention-based discovery.
   */
  files: VendoredFile[]
  /**
   * Files where the vendored copy diverges from source — different
   * hash, or present only in the target. Drives the `--check` exit code.
   */
  drift: VendoredFile[]
  /**
   * True when `skill-scripts/<scriptName>/` doesn't exist. Treated as
   * an error in the CLI so misconfigured manifests don't sync silently.
   */
  missingScript: boolean
}

/**
 * Repo-relative directory holding canonical scripts. Skills consume
 * subdirectories of this path via their `skill.json` manifest.
 */
export const SKILL_SCRIPTS_DIR = 'skill-scripts'
