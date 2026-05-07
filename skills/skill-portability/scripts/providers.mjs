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
 *     fileFormat:    'SKILL.md' | '.cursor/rules/*.mdc' | 'AGENTS.md' | etc.
 *     fileLocation:  where the provider expects the file to live
 *     docUrls:       prioritized list — llms.txt / llms-full.txt first, HTML last
 *     requiredFrontmatter: fields the loader will reject without
 *     ignoredFrontmatter:  fields the loader silently ignores (cross-agent extras)
 *     forbiddenFrontmatter: fields that BREAK loading (provider-specific to others)
 *     toolSurface:   names of built-in tools the agent can call (rough list — verify per-version)
 *     notes:         caveats, gotchas
 *   }
 *
 * Update policy: hardcoded by hand. Run `--check` to find stale URLs.
 * When a provider moves docs, update `docUrls` here and ship a PR.
 */

export const providers = [
  {
    id: 'claude-code',
    name: 'Claude Code (Anthropic)',
    fileFormat: 'SKILL.md',
    fileLocation: '.claude/skills/<name>/SKILL.md or skills/<name>/SKILL.md (via npx skills add)',
    docUrls: [
      'https://docs.claude.com/en/docs/claude-code/skills',
      'https://docs.claude.com/llms.txt',
      'https://skills.sh',
    ],
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: ['argument-hint', 'user-invocable', 'model-invocable', 'allowed-tools', 'metadata'],
    ignoredFrontmatter: [],
    forbiddenFrontmatter: [],
    toolSurface: [
      'Read', 'Write', 'Edit', 'Bash', 'Glob', 'Grep',
      'WebFetch', 'WebSearch', 'AskUserQuestion',
      'TaskCreate', 'TaskUpdate', 'TaskList', 'TaskGet',
      'Agent', 'Skill', 'NotebookEdit', 'ExitPlanMode',
    ],
    notes: 'Reference implementation. Frontmatter `name` must match directory name. Description should contain "Use when" + verbatim trigger phrases.',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    fileFormat: '.cursor/rules/*.mdc',
    fileLocation: '.cursor/rules/<name>.mdc — single file, NOT a directory',
    docUrls: [
      'https://docs.cursor.com/context/rules',
      'https://docs.cursor.com/llms.txt',
      'https://cursor.com/docs/context/rules-for-ai',
    ],
    requiredFrontmatter: ['description'],
    optionalFrontmatter: ['globs', 'alwaysApply'],
    ignoredFrontmatter: ['name', 'argument-hint', 'user-invocable', 'model-invocable'],
    forbiddenFrontmatter: [],
    toolSurface: [
      'Read', 'Edit', 'codebase_search', 'grep_search', 'file_search',
      'run_terminal_cmd', 'list_dir', 'edit_file',
    ],
    notes: 'Cursor uses `.mdc` rule files in `.cursor/rules/`, NOT directories with SKILL.md. Companion files (references/, templates/) do not load. Cursor-specific frontmatter: `globs` (file-pattern triggers), `alwaysApply` (boolean — load on every chat).',
  },
  {
    id: 'openai-codex-cli',
    name: 'OpenAI Codex CLI',
    fileFormat: 'AGENTS.md',
    fileLocation: '<repo-root>/AGENTS.md (or nested AGENTS.md per directory)',
    docUrls: [
      'https://github.com/openai/codex/blob/main/docs/getting-started.md',
      'https://github.com/openai/codex/blob/main/AGENTS.md',
      'https://agents.md',
    ],
    requiredFrontmatter: [],
    optionalFrontmatter: [],
    ignoredFrontmatter: ['name', 'description', 'argument-hint', 'globs', 'alwaysApply'],
    forbiddenFrontmatter: [],
    toolSurface: [
      'shell', 'apply_patch', 'web_search', 'read_file',
    ],
    notes: 'AGENTS.md is plain markdown — no frontmatter is read by the agent itself. Frontmatter from a SKILL.md is silently ignored. To "port" a SKILL.md you typically rename to AGENTS.md and inline the description into the body. Codex tool names differ from Claude Code (e.g., `shell` vs `Bash`, `apply_patch` vs `Edit`).',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    fileFormat: 'SKILL.md',
    fileLocation: '.agents/skills/<name>/SKILL.md (project) or ~/.gemini/skills/<name>/SKILL.md (global)',
    docUrls: [
      'https://github.com/google-gemini/gemini-cli',
      'https://github.com/google-gemini/gemini-cli/blob/main/docs/index.md',
      'https://ai.google.dev/gemini-api/docs',
    ],
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: ['argument-hint', 'metadata'],
    ignoredFrontmatter: ['user-invocable', 'model-invocable', 'allowed-tools', 'globs', 'alwaysApply'],
    forbiddenFrontmatter: [],
    toolSurface: [
      'read_file', 'write_file', 'edit', 'run_shell_command',
      'search_file_content', 'glob', 'web_fetch', 'list_directory',
    ],
    notes: 'Google Gemini CLI consumes SKILL.md in the agent-agnostic location (`.agents/skills/`). Tool names use snake_case and differ from Claude Code (`run_shell_command` vs `Bash`, `edit` vs `Edit`). Frontmatter `name` and `description` are read; Claude-Code-specific fields like `user-invocable`/`model-invocable` are silently ignored.',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    fileFormat: 'SKILL.md',
    fileLocation: '.agents/skills/<name>/SKILL.md (project) or ~/.config/opencode/skills/<name>/SKILL.md (global)',
    docUrls: [
      'https://opencode.ai/docs',
      'https://github.com/sst/opencode',
      'https://opencode.ai/llms.txt',
    ],
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: ['argument-hint', 'metadata'],
    ignoredFrontmatter: ['user-invocable', 'model-invocable', 'allowed-tools', 'globs', 'alwaysApply'],
    forbiddenFrontmatter: [],
    toolSurface: [
      'read', 'write', 'edit', 'bash', 'glob', 'grep',
      'webfetch', 'list',
    ],
    notes: 'Open-source agent CLI by SST. Consumes SKILL.md in `.agents/skills/` (project) and `~/.config/opencode/skills/` (global) per skills.sh agent registry. Tool names are lowercase. Frontmatter `name`/`description` required; Claude-Code-specific fields ignored.',
  },
  {
    id: 'pi',
    name: 'Pi',
    fileFormat: 'SKILL.md (or root-level *.md in `.pi/skills/` and `~/.pi/agent/skills/`)',
    fileLocation:
      '.pi/skills/<name>/SKILL.md or .agents/skills/<name>/SKILL.md (project, walks ancestor dirs); ~/.pi/agent/skills/<name>/SKILL.md or ~/.agents/skills/<name>/SKILL.md (global); also `skills/` dirs and `pi.skills` entries in package.json; `--skill <path>` CLI override',
    docUrls: [
      'https://pi.dev/docs/latest/skills',
      'https://pi.dev/docs/latest',
      'https://agentskills.io/specification',
      'https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md',
    ],
    requiredFrontmatter: ['name', 'description'],
    optionalFrontmatter: [
      'license',
      'compatibility',
      'metadata',
      'allowed-tools',
      'disable-model-invocation',
    ],
    ignoredFrontmatter: ['argument-hint', 'user-invocable', 'model-invocable', 'globs', 'alwaysApply'],
    forbiddenFrontmatter: [],
    toolSurface: [],
    notes:
      'Pi by Earendil Works. CLI install: `curl -fsSL https://pi.dev/install.sh | sh` or `npm install -g @earendil-works/pi-coding-agent` (binary: `pi`). `name` constraint: lowercase `[a-z0-9-]`, max 64 chars. `description` max 1024 chars; missing description prevents loading. Unknown frontmatter is silently ignored (per spec). Tool surface not enumerated in public docs as of this entry — left empty pending agentskills.io/specification detail.',
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
  const results = []
  for (const p of providers) {
    const urlResults = await Promise.all(
      p.docUrls.map(async (url) => {
        const ctrl = new AbortController()
        const t = setTimeout(() => ctrl.abort(), timeoutMs)
        try {
          const res = await fetch(url, { method: 'HEAD', signal: ctrl.signal, redirect: 'follow' })
          return { url, status: res.status, ok: res.ok }
        } catch (err) {
          return { url, status: 0, ok: false, error: String(err?.message ?? err) }
        } finally {
          clearTimeout(t)
        }
      }),
    )
    const anyOk = urlResults.some((r) => r.ok)
    results.push({ id: p.id, anyOk, urls: urlResults })
  }
  return results
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
  const widths = cols.map((c) => Math.max(c.label.length, ...data.map((r) => String(r[c.key]).length)))
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
const invokedDirectly = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('providers.mjs')
if (invokedDirectly) {
  main().catch((err) => {
    process.stderr.write(`providers: ${err?.stack ?? err}\n`)
    process.exit(1)
  })
}
