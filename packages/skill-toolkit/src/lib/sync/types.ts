/**
 * One file copied from a canonical source into a consuming skill's
 * vendored subdirectory. Carries both ends of the copy so the planner
 * and applier can reuse the same record.
 */
export interface VendoredFile {
  /**
   * Path relative to the vendored directory root. Used for display and
   * for matching source files to target extras during drift detection.
   */
  relative: string
  /**
   * Absolute path to the canonical source file (under the directive's
   * `src` root).
   */
  source: string
  /**
   * Absolute path to the vendored copy (under the directive's
   * `output` root inside the consuming skill).
   */
  target: string
}

/**
 * Result of one sync attempt — produced per vendor directive in
 * `skill.json`. Carries enough context to render output, decide
 * drift, and apply the copy.
 */
export interface SyncReport {
  /**
   * Skill that owns the consuming `skill.json` directive.
   */
  skill: string
  /**
   * Free-form label from the directive's `kind` field (e.g.
   * `scripts`, `references`). Surfaced in CLI output so consumers
   * can grep by type; not dispatched on.
   */
  kind: string
  /**
   * Display name for this directive — derived from the basename of
   * `output`. Used in CLI output (`code-reviewer [scripts] prompt-shield`).
   */
  assetName: string
  /**
   * Absolute path to the directive's source directory (resolved from
   * the manifest's `src` relative to repo root).
   */
  sourceDir: string
  /**
   * Absolute path to the directive's target directory (resolved from
   * the manifest's `output` relative to the consuming skill's dir).
   * Used by `applySync` to wholesale-replace the directory so files
   * removed from the source allowlist also disappear from the
   * vendored copy.
   */
  targetDir: string
  /**
   * Every file that should appear in the vendored copy, derived from
   * the source's `files` allowlist or convention-based discovery.
   */
  files: VendoredFile[]
  /**
   * Files where the vendored copy diverges from source — different
   * hash, or present only in the target. Drives the `--check` exit
   * code.
   */
  drift: VendoredFile[]
  /**
   * True when the directive's source directory doesn't exist. Treated
   * as an error in the CLI so misconfigured manifests don't sync
   * silently.
   */
  missingAsset: boolean
}
