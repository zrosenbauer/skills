#!/usr/bin/env node
/**
 * providers — canonical list of agent-skill providers and where to find their
 * authoritative format docs.
 *
 * Zero dependencies. Pure ESM. Runs on stock Node ≥ 20 on macOS, Linux, and
 * Windows (no shell required — invoke via `node providers.mjs`, not bash).
 *
 * USAGE
 *   node providers.mjs                  # JSON to stdout (compact)
 *   node providers.mjs --pretty         # JSON pretty-printed
 *   node providers.mjs --table          # human-readable table
 *   node providers.mjs --check          # HEAD each docUrl, mark stale ones
 *   node providers.mjs --ids            # one id per line (for shell pipelines)
 *
 * As a module:
 *   import { providers, getProvider } from './providers.mjs'
 *
 * Each entry shape:
 *   {
 *     id:            kebab-case identifier
 *     name:          human-readable
 *     fileFormat:    native skill format (not always-loaded rules files)
 *     fileLocation:  where the provider expects the file to live
 *     docUrls:       prioritized list — llms.txt / llms-full.txt first, HTML last.
 *                    Used as the source URL when refreshing snapshots by hand;
 *                    never fetched at agent runtime.
 *     localDocPath:  relative path (from this file's parent skill dir) to the
 *                    bundled snapshot. The skill-portability workflow loads
 *                    THIS path — not docUrls. Snapshots are committed and
 *                    refreshed on cadence; see CONTRIBUTING.md.
 *     requiredFrontmatter: fields the loader will reject without
 *     ignoredFrontmatter:  fields the loader silently ignores (cross-agent extras)
 *     forbiddenFrontmatter: fields that BREAK loading (provider-specific to others)
 *     toolSurface:   names of built-in tools the agent can call (rough list — verify per-version)
 *     notes:         caveats, gotchas
 *   }
 *
 * Update policy: hardcoded by hand. Refresh snapshots by hand on cadence —
 * see CONTRIBUTING.md. Run `--check` (this script) to verify docUrls still
 * resolve. When a provider moves docs, update docUrls here, refresh the
 * snapshot, commit both.
 */

export const providers = [
  {
    id: 'claude-code',
    name: 'Claude Code (Anthropic)',
    fileFormat: 'SKILL.md',
    fileLocation:
      '~/.claude/skills/<name>/SKILL.md (personal) or .claude/skills/<name>/SKILL.md (project); plugins expose skills/<name>/SKILL.md',
    docUrls: ['https://code.claude.com/docs/en/skills.md'],
    localDocPath: 'references/providers/claude-code.md',
    requiredFrontmatter: [],
    optionalFrontmatter: [
      'argument-hint',
      'user-invocable',
      'disable-model-invocation',
      'allowed-tools',
      'name',
      'description',
      'when_to_use',
      'arguments',
      'disallowed-tools',
      'model',
      'effort',
      'context',
      'agent',
      'background',
      'hooks',
      'paths',
      'shell',
      'metadata',
      'license',
      'compatibility',
    ],
    ignoredFrontmatter: [],
    forbiddenFrontmatter: [],
    toolSurface: [
      'Read',
      'Write',
      'Edit',
      'Bash',
      'Glob',
      'Grep',
      'WebFetch',
      'WebSearch',
      'AskUserQuestion',
      'TaskCreate',
      'TaskUpdate',
      'TaskList',
      'TaskGet',
      'Agent',
      'Skill',
      'NotebookEdit',
      'ExitPlanMode',
    ],
    notes:
      'Native SKILL.md with companion resources. Claude permits omitted name/description; portable distribution requires both. Tool names here are illustrative, not an exhaustive catalog. Repository trigger/style rules are not provider loader requirements.',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    fileFormat: 'SKILL.md',
    fileLocation:
      '.agents/skills/<name>/SKILL.md or .cursor/skills/<name>/SKILL.md; corresponding home-directory locations for user skills',
    docUrls: ['https://cursor.com/docs/skills'],
    localDocPath: 'references/providers/cursor.md',
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: [
      'paths',
      'globs',
      'disable-model-invocation',
      'icon',
      'color',
      'metadata',
    ],
    ignoredFrontmatter: ['argument-hint', 'user-invocable'],
    forbiddenFrontmatter: [],
    toolSurface: [
      'Read',
      'Edit',
      'codebase_search',
      'grep_search',
      'file_search',
      'run_terminal_cmd',
      'list_dir',
      'edit_file',
    ],
    notes:
      'Cursor natively loads SKILL.md directories with companion references, scripts, and assets. Rules .mdc files are a separate feature. Tool names are illustrative and version-dependent; a mismatch requires capability mapping, not an automatic incompatibility verdict.',
  },
  {
    id: 'openai-codex-cli',
    name: 'OpenAI Codex CLI',
    fileFormat: 'SKILL.md',
    fileLocation:
      '.agents/skills/<name>/SKILL.md from cwd through repository root; ~/.agents/skills/<name>/SKILL.md for user skills',
    docUrls: ['https://developers.openai.com/codex/skills/'],
    localDocPath: 'references/providers/openai-codex-cli.md',
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: ['metadata'],
    ignoredFrontmatter: [
      'argument-hint',
      'user-invocable',
      'disable-model-invocation',
      'globs',
      'alwaysApply',
    ],
    forbiddenFrontmatter: [],
    toolSurface: ['shell', 'apply_patch', 'web_search', 'read_file'],
    notes:
      'Native SKILL.md with scripts, references, and assets. AGENTS.md is separate repository guidance, not a skill conversion target. Configure invocation policy with optional agents/openai.yaml (policy.allow_implicit_invocation). Tool examples are not exhaustive or guaranteed for every host.',
  },
  {
    id: 'agents-skills-baseline',
    name: 'Agent Skills Baseline',
    fileFormat: 'SKILL.md',
    fileLocation:
      'Host-dependent; the baseline specifies <name>/SKILL.md packaging, not discovery paths',
    docUrls: ['https://agentskills.io/specification'],
    localDocPath: 'references/providers/agents-skills-baseline.md',
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: ['license', 'compatibility', 'metadata', 'allowed-tools'],
    ignoredFrontmatter: [
      'argument-hint',
      'user-invocable',
      'disable-model-invocation',
      'globs',
      'alwaysApply',
    ],
    forbiddenFrontmatter: [],
    toolSurface: [],
    notes:
      'The baseline defines packaging, required name/description, optional metadata, and progressive disclosure. It does not define universal tools, invocation controls, discovery paths, or subagents. Extension semantics and runtime capabilities must be checked against the actual host; do not assume ignored fields enforce policy.',
  },
]

/** Lookup by id. Returns undefined if not found. */
export function getProvider(id) {
  return providers.find((p) => p.id === id)
}

/** All provider ids in insertion order. */
export function ids() {
  return providers.map((p) => p.id)
}

/**
 * HEAD each docUrl with a short timeout; return per-provider freshness report.
 * Used by `--check`. Network-dependent — only invoke when explicitly asked.
 */
export async function checkFreshness({ timeoutMs = 5000 } = {}) {
  return Promise.all(
    providers.map(async (p) => {
      const urlResults = await Promise.all(
        p.docUrls.map(async (url) => {
          const ctrl = new AbortController()
          const t = setTimeout(() => ctrl.abort(), timeoutMs)
          try {
            const res = await fetch(url, {
              method: 'HEAD',
              signal: ctrl.signal,
              redirect: 'follow',
            })
            return { url, status: res.status, ok: res.ok }
          } catch (err) {
            return { url, status: 0, ok: false, error: String(err?.message ?? err) }
          } finally {
            clearTimeout(t)
          }
        })
      )
      const anyOk = urlResults.some((r) => r.ok)
      return { id: p.id, anyOk, urls: urlResults }
    })
  )
}

// ---------- CLI ----------

function renderTable(rows) {
  const cols = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NAME' },
    { key: 'fileFormat', label: 'FORMAT' },
    { key: 'docUrl', label: 'PRIMARY DOCS' },
  ]
  const data = rows.map((p) => ({
    id: p.id,
    name: p.name,
    fileFormat: p.fileFormat,
    docUrl: p.docUrls[0] ?? '',
  }))
  const widths = cols.map((c) =>
    Math.max(c.label.length, ...data.map((r) => String(r[c.key]).length))
  )
  const line = (vals) => vals.map((v, i) => String(v).padEnd(widths[i])).join('  ')
  const out = [line(cols.map((c) => c.label)), line(widths.map((w) => '-'.repeat(w)))]
  for (const r of data) out.push(line(cols.map((c) => r[c.key])))
  return out.join('\n')
}

async function main() {
  const args = new Set(process.argv.slice(2))

  if (args.has('--ids')) {
    process.stdout.write(ids().join('\n') + '\n')
    return
  }

  if (args.has('--table')) {
    process.stdout.write(renderTable(providers) + '\n')
    return
  }

  if (args.has('--check')) {
    const report = await checkFreshness()
    const indent = args.has('--pretty') ? 2 : 0
    process.stdout.write(JSON.stringify(report, null, indent) + '\n')
    process.exit(report.every((r) => r.anyOk) ? 0 : 1)
  }

  const indent = args.has('--pretty') ? 2 : 0
  process.stdout.write(JSON.stringify(providers, null, indent) + '\n')
}

// Run main() only when invoked as a CLI, not when imported.
// pathToFileURL handles Windows backslashes and URL encoding correctly.
import { realpathSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
const invokedDirectly =
  process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href
if (invokedDirectly) {
  main().catch((err) => {
    process.stderr.write(`providers: ${err?.stack ?? err}\n`)
    process.exit(1)
  })
}
