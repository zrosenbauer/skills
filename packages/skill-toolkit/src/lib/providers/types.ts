/**
 * How a single provider stores either skills or sub-agents on disk.
 * The two are structurally identical so the same shape is reused for
 * both `Provider.skills` and `Provider.agents`.
 */
export interface AssetFormat {
  /**
   * Whether this provider supports this asset type at all. Set
   * `false` for providers that don't have a sub-agent concept (e.g.
   * Codex CLI), in which case the rest of the fields may be omitted.
   */
  supported: boolean
  /**
   * Human-readable description of the on-disk file shape, e.g.
   * `'<name>/SKILL.md'` (dir-style) or `'<name>.md'` (single file).
   */
  fileFormat?: string
  /**
   * Human-readable description of where the file lives, for error
   * messages and docs. Not a glob — use `searchPaths` for the
   * machine-readable globs the discovery code consumes.
   */
  fileLocation?: string
  /**
   * Glob patterns (relative to repo root) where the discovery code
   * looks for assets of this type. Empty/omitted when unsupported.
   * Globs use `*` for one segment and `**` for many.
   */
  searchPaths?: string[]
  /**
   * Frontmatter keys the provider's loader rejects the file without.
   */
  requiredFrontmatter?: string[]
  /**
   * Frontmatter keys the provider's loader accepts but doesn't require.
   */
  optionalFrontmatter?: string[]
}

/**
 * Canonical registry entry for one agent-skill provider. Documents
 * both skills (the original asset type) and sub-agents (the spawnable
 * Task-tool agents). Consumers iterate `providers` to discover assets
 * across every supported provider in a single pass.
 */
export interface Provider {
  /**
   * Kebab-case identifier — matches the entry in
   * `skills/skill-portability/scripts/providers.mjs` so the two
   * registries stay in lockstep.
   */
  id: string
  /**
   * Human-readable name shown in lint output and docs.
   */
  name: string
  /**
   * How this provider stores skills.
   */
  skills: AssetFormat
  /**
   * How this provider stores sub-agents. `supported: false` for
   * providers that don't have a distinct sub-agent concept.
   */
  agents: AssetFormat
  /**
   * Free-form gotchas / notes — surfaced in docs, not consumed by
   * code.
   */
  notes?: string
}
