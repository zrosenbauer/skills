#!/usr/bin/env node
/**
 * detect-clis — probe for AI coding CLIs available on $PATH.
 *
 * Outputs JSON to stdout:
 *   [
 *     {
 *       "id": "claude-code",
 *       "name": "Claude Code",
 *       "binary": "claude",
 *       "available": true,
 *       "path": "/opt/homebrew/bin/claude",
 *       "version": "1.2.3" | null,
 *       "promptTemplate": "claude -p {{PROMPT}}",
 *       "stdinTemplate": "claude -p" | null,
 *       "notes": "..."
 *     },
 *     ...
 *   ]
 *
 * Flags:
 *   --available-only    only emit entries with available: true
 *   --names-only        emit just the names (one per line)
 *   --pretty            pretty-print JSON (default: compact for piping)
 *
 * Exit code: 0 always (probing is best-effort; no error means "no CLIs found").
 *
 * The registry below is the source of truth for which CLIs we know about.
 * Add a new entry to grow coverage; nothing else needs to change.
 */

import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/**
 * @typedef {object} CliEntry
 * @property {string} id          Stable identifier, kebab-case (matches skills.sh agent id when possible)
 * @property {string} name        Human-readable
 * @property {string} binary      Executable name to look for on $PATH
 * @property {string} promptTemplate  How to invoke for a one-shot prompt (use {{PROMPT}} placeholder)
 * @property {string|null} stdinTemplate  Alternative: command that reads prompt from stdin
 * @property {string=} versionFlag        Flag to ask for version; defaults to --version
 * @property {string=} notes
 * @property {boolean=} subcommand        true if `binary` is actually a parent command + subcommand (e.g., `gh copilot`)
 * @property {string=} subcommandCheck    For subcommands, the full check command (e.g., `gh extension list`)
 */

/** @type {CliEntry[]} */
const REGISTRY = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    binary: 'claude',
    promptTemplate: 'claude -p {{PROMPT}}',
    stdinTemplate: 'claude -p',
    notes: 'Anthropic Claude Code CLI; -p runs one-shot non-interactive',
  },
  {
    id: 'codex',
    name: 'OpenAI Codex',
    binary: 'codex',
    promptTemplate: 'codex exec {{PROMPT}}',
    stdinTemplate: 'codex exec -',
    notes: 'OpenAI Codex CLI; `codex exec` runs non-interactive',
  },
  {
    id: 'gemini-cli',
    name: 'Gemini CLI',
    binary: 'gemini',
    promptTemplate: 'gemini -p {{PROMPT}}',
    stdinTemplate: 'gemini -p',
    notes: 'Google Gemini CLI; -p runs one-shot',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    binary: 'opencode',
    promptTemplate: 'opencode run {{PROMPT}}',
    stdinTemplate: null,
    notes: 'OpenCode CLI; `opencode run` for non-interactive prompts',
  },
  {
    id: 'cursor-agent',
    name: 'Cursor agent',
    binary: 'cursor-agent',
    promptTemplate: 'cursor-agent -p {{PROMPT}}',
    stdinTemplate: null,
    notes: 'Cursor CLI agent (separate from the IDE)',
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    binary: 'gh',
    subcommand: true,
    subcommandCheck: 'gh extension list',
    promptTemplate: 'gh copilot explain {{PROMPT}}',
    stdinTemplate: null,
    versionFlag: '--version',
    notes: 'gh copilot extension; check with `gh extension list | grep copilot`',
  },
  {
    id: 'aider',
    name: 'Aider',
    binary: 'aider',
    promptTemplate: 'aider --message {{PROMPT}}',
    stdinTemplate: null,
    notes: 'AI pair-programming CLI; --message for one-shot',
  },
  {
    id: 'crush',
    name: 'Crush',
    binary: 'crush',
    promptTemplate: 'crush -p {{PROMPT}}',
    stdinTemplate: 'crush -p',
    notes: 'Charm Crush — terminal AI assistant',
  },
  {
    id: 'mods',
    name: 'Mods',
    binary: 'mods',
    promptTemplate: 'mods {{PROMPT}}',
    stdinTemplate: 'mods',
    notes: 'Charm Mods — pipes prompts to LLMs',
  },
  {
    id: 'ollama',
    name: 'Ollama',
    binary: 'ollama',
    promptTemplate: 'ollama run llama3 {{PROMPT}}',
    stdinTemplate: 'ollama run llama3',
    notes: 'Local model runner; substitute the model name as needed',
  },
  {
    id: 'goose',
    name: 'Goose',
    binary: 'goose',
    promptTemplate: 'goose run -t {{PROMPT}}',
    stdinTemplate: null,
    notes: 'Block Goose — agentic CLI',
  },
  {
    id: 'continue',
    name: 'Continue',
    binary: 'continue',
    promptTemplate: 'continue chat {{PROMPT}}',
    stdinTemplate: null,
    notes: 'Continue CLI / dev agent',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    binary: 'windsurf',
    promptTemplate: 'windsurf -p {{PROMPT}}',
    stdinTemplate: null,
    notes: 'Codeium Windsurf CLI',
  },
  {
    id: 'droid',
    name: 'Droid (Factory)',
    binary: 'droid',
    promptTemplate: 'droid run {{PROMPT}}',
    stdinTemplate: null,
    notes: 'Factory Droid CLI',
  },
  {
    id: 'tabnine-cli',
    name: 'Tabnine CLI',
    binary: 'tabnine',
    promptTemplate: 'tabnine ask {{PROMPT}}',
    stdinTemplate: null,
  },
  {
    id: 'amp',
    name: 'Amp',
    binary: 'amp',
    promptTemplate: 'amp run {{PROMPT}}',
    stdinTemplate: null,
    notes: 'Sourcegraph Amp CLI',
  },
  {
    id: 'qwen-code',
    name: 'Qwen Code',
    binary: 'qwen-code',
    promptTemplate: 'qwen-code -p {{PROMPT}}',
    stdinTemplate: null,
  },
  {
    id: 'iflow-cli',
    name: 'iFlow CLI',
    binary: 'iflow',
    promptTemplate: 'iflow -p {{PROMPT}}',
    stdinTemplate: null,
  },
  {
    id: 'kimi-cli',
    name: 'Kimi Code CLI',
    binary: 'kimi',
    promptTemplate: 'kimi -p {{PROMPT}}',
    stdinTemplate: null,
  },
  {
    id: 'aichat',
    name: 'aichat',
    binary: 'aichat',
    promptTemplate: 'aichat {{PROMPT}}',
    stdinTemplate: 'aichat',
    notes: 'Polyglot CLI — supports many providers; useful as a fallback',
  },
]

const args = new Set(process.argv.slice(2))
const flags = {
  availableOnly: args.has('--available-only'),
  namesOnly: args.has('--names-only'),
  pretty: args.has('--pretty'),
}

const results = REGISTRY.map(probe).filter((entry) => !flags.availableOnly || entry.available)

if (flags.namesOnly) {
  for (const r of results) process.stdout.write(`${r.name}\n`)
} else {
  process.stdout.write(JSON.stringify(results, null, flags.pretty ? 2 : 0) + '\n')
}

/**
 * Probe a single registry entry: walk $PATH for the binary, then attempt to
 * fetch a version. All errors are swallowed — probing must never throw.
 *
 * @param {CliEntry} entry
 */
function probe(entry) {
  const found = entry.subcommand ? probeSubcommand(entry) : probeBinary(entry.binary)
  return {
    id: entry.id,
    name: entry.name,
    binary: entry.binary,
    available: found.available,
    path: found.path,
    version: found.available ? readVersion(entry) : null,
    promptTemplate: entry.promptTemplate,
    stdinTemplate: entry.stdinTemplate ?? null,
    notes: entry.notes ?? null,
  }
}

/**
 * Walk $PATH directory-by-directory looking for `binary`. Returns the first
 * absolute path found (or null). Avoids spawning `which`.
 */
function probeBinary(binary) {
  const pathDirs = (process.env.PATH ?? '').split(path.delimiter)
  for (const dir of pathDirs) {
    if (!dir) continue
    const candidate = path.join(dir, binary)
    if (existsSync(candidate)) {
      return { available: true, path: candidate }
    }
  }
  return { available: false, path: null }
}

/**
 * Subcommand probe: requires the parent binary to exist AND the subcommand
 * check to succeed. Currently used for `gh copilot` (gh extension list).
 *
 * @param {CliEntry} entry
 */
function probeSubcommand(entry) {
  const parent = probeBinary(entry.binary)
  if (!parent.available || !entry.subcommandCheck) return parent
  try {
    const out = execFileSync(
      entry.subcommandCheck.split(' ')[0],
      entry.subcommandCheck.split(' ').slice(1),
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 3000 }
    )
    if (out.toLowerCase().includes('copilot')) return parent
  } catch {
    /* best-effort */
  }
  return { available: false, path: null }
}

/**
 * Try to read a version string. Best-effort — many CLIs accept --version
 * but some don't, and we don't want a slow probe to block detection.
 *
 * @param {CliEntry} entry
 */
function readVersion(entry) {
  const flag = entry.versionFlag ?? '--version'
  try {
    const out = execFileSync(entry.binary, [flag], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 3000,
    })
    const match = out.match(/\d+\.\d+(?:\.\d+)?/)
    return match ? match[0] : out.trim().split('\n')[0].slice(0, 64)
  } catch {
    return null
  }
}

// Hint: silence the unused `os` import lint warning if any tooling complains —
// we keep it for future use (cross-platform PATH separator was originally derived from it).
void os
