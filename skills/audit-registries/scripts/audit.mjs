#!/usr/bin/env node
/**
 * audit — audit registries in this monorepo against current upstream sources.
 *
 * Four audit categories:
 *   1. provider-docs   — HEAD each docUrl in skill-portability's providers.mjs
 *   2. cli-binaries    — locate binaries from code-reviewer's cli-registry.mjs
 *   3. deps-versions   — `npm view` skill-tools deps + devDeps; flag major drift
 *   4. skills-sh-diff  — fetch vercel-labs/skills agents.ts; diff IDs against cli-registry
 *
 * Output: structured JSON to stdout. Exit 0 always — staleness is data, not failure.
 *
 * Flags:
 *   --pretty      pretty-print JSON
 *   --only <cat>  only run one category (provider-docs|cli-binaries|deps-versions|skills-sh-diff)
 *   --offline     skip categories that need network (cli-binaries still local)
 *   --timeout <s> network timeout per request (default 8)
 *
 * Output schema:
 *   {
 *     auditedAt: ISO string,
 *     summary: { fresh, stale, gone, new, errored },
 *     categories: [
 *       { name, entries: [ { id, status, details: string[], autoFixable, fix? } ] }
 *     ]
 *   }
 *
 * `status` is one of: "fresh" | "stale" | "gone" | "new" | "errored".
 *   fresh        — verified up-to-date
 *   stale        — entry exists but a docUrl/binary/version is out of date or moved
 *   gone         — entry exists locally but upstream no longer present (CLI removed, URL 404)
 *   new          — exists upstream but not in our local registry (we should add)
 *   errored      — couldn't determine status (network failure, parse error)
 */

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = findRepoRoot(here)

const flags = parseFlags(process.argv.slice(2))

const categories = []
const ONLY = flags.only

if (!ONLY || ONLY === 'provider-docs') {
  categories.push(await auditProviderDocs())
}
if (!ONLY || ONLY === 'cli-binaries') {
  categories.push(await auditCliBinaries())
}
if (!ONLY || ONLY === 'deps-versions') {
  categories.push(await auditDepsVersions())
}
if (!ONLY || ONLY === 'skills-sh-diff') {
  categories.push(await auditSkillsShDiff())
}

const summary = summarize(categories)
const out = {
  auditedAt: new Date().toISOString(),
  summary,
  categories,
}
process.stdout.write(JSON.stringify(out, null, flags.pretty ? 2 : 0) + '\n')

// =========================================================================
// Category 1: provider-docs
// =========================================================================

async function auditProviderDocs() {
  const providersPath = path.join(repoRoot, 'skills/skill-portability/scripts/providers.mjs')
  if (!existsSync(providersPath)) {
    return categoryError('provider-docs', `not found: ${providersPath}`)
  }
  if (flags.offline) {
    return { name: 'provider-docs', entries: [], skipped: 'offline mode' }
  }

  const mod = await import(providersPath)
  const providers = mod.providers ?? []
  const entries = []

  for (const p of providers) {
    const urls = Array.isArray(p.docUrls) ? p.docUrls : []
    if (urls.length === 0) {
      entries.push({
        id: p.id,
        status: 'errored',
        details: ['no docUrls declared on entry'],
        autoFixable: false,
      })
      continue
    }

    const checks = await Promise.all(urls.map((url) => probeUrl(url, flags.timeout)))
    const anyOk = checks.some((c) => c.ok)
    const failed = checks.filter((c) => !c.ok)

    if (anyOk && failed.length === 0) {
      entries.push({ id: p.id, status: 'fresh', details: [], autoFixable: false })
    } else if (anyOk && failed.length > 0) {
      entries.push({
        id: p.id,
        status: 'stale',
        details: failed.map((f) => `${f.url}: ${f.detail}`),
        autoFixable: false,
        fix: 'review and update the failing docUrls; some may have moved',
      })
    } else {
      entries.push({
        id: p.id,
        status: 'gone',
        details: checks.map((c) => `${c.url}: ${c.detail}`),
        autoFixable: false,
        fix: 'find the new canonical docs URL or drop the entry',
      })
    }
  }

  return { name: 'provider-docs', entries }
}

// =========================================================================
// Category 2: cli-binaries
// =========================================================================

async function auditCliBinaries() {
  const registryPath = path.join(
    repoRoot,
    'skills/code-reviewer/scripts/cli-registry.mjs',
  )
  if (!existsSync(registryPath)) {
    return categoryError('cli-binaries', `not found: ${registryPath}`)
  }

  const mod = await import(registryPath)
  const registry = mod.REGISTRY ?? []
  const entries = []

  for (const e of registry) {
    const located = mod.locateBinary(e.binary)
    if (located.available) {
      entries.push({
        id: e.id,
        status: 'fresh',
        details: [`binary at ${located.path}`],
        autoFixable: false,
      })
    } else {
      entries.push({
        id: e.id,
        status: 'gone',
        details: [`${e.binary} not on $PATH`],
        autoFixable: false,
        fix: 'install the CLI or remove the entry from cli-registry.mjs',
      })
    }
  }

  return { name: 'cli-binaries', entries }
}

// =========================================================================
// Category 3: deps-versions
// =========================================================================

async function auditDepsVersions() {
  const pkgPath = path.join(repoRoot, 'packages/skill-tools/package.json')
  if (!existsSync(pkgPath)) {
    return categoryError('deps-versions', `not found: ${pkgPath}`)
  }
  if (flags.offline) {
    return { name: 'deps-versions', entries: [], skipped: 'offline mode' }
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
  const allDeps = { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) }
  const names = Object.keys(allDeps).sort()

  const entries = await Promise.all(
    names.map(async (name) => {
      const installed = stripRange(allDeps[name])
      const latest = await fetchNpmLatest(name, flags.timeout)
      if (latest === null) {
        return {
          id: name,
          status: 'errored',
          details: [`could not fetch latest from npm (network or 404)`],
          autoFixable: false,
        }
      }
      const installedMajor = majorOf(installed)
      const latestMajor = majorOf(latest)
      if (installed === latest || installedMajor === latestMajor) {
        return {
          id: name,
          status: 'fresh',
          details: [`installed: ${installed}, latest: ${latest}`],
          autoFixable: false,
        }
      }
      return {
        id: name,
        status: 'stale',
        details: [`installed: ${installed}, latest: ${latest} (major drift)`],
        autoFixable: true,
        fix: `pnpm --filter @zrosenbauer/skill-tools update ${name}@latest`,
      }
    }),
  )

  return { name: 'deps-versions', entries }
}

// =========================================================================
// Category 4: skills-sh-diff
// =========================================================================

async function auditSkillsShDiff() {
  const registryPath = path.join(
    repoRoot,
    'skills/code-reviewer/scripts/cli-registry.mjs',
  )
  if (!existsSync(registryPath)) {
    return categoryError('skills-sh-diff', `not found: ${registryPath}`)
  }
  if (flags.offline) {
    return { name: 'skills-sh-diff', entries: [], skipped: 'offline mode' }
  }

  const mod = await import(registryPath)
  const ourIds = new Set((mod.REGISTRY ?? []).map((e) => e.id))

  const upstream = await fetchSkillsShAgents(flags.timeout)
  if (upstream === null) {
    return {
      name: 'skills-sh-diff',
      entries: [
        {
          id: 'skills.sh',
          status: 'errored',
          details: ['could not fetch vercel-labs/skills agents.ts'],
          autoFixable: false,
        },
      ],
    }
  }

  const upstreamIds = new Set(upstream)
  const entries = []
  for (const id of upstreamIds) {
    if (!ourIds.has(id)) {
      entries.push({
        id,
        status: 'new',
        details: [`exists in vercel-labs/skills agents.ts but not in cli-registry.mjs`],
        autoFixable: false,
        fix: 'consider adding to cli-registry.mjs after verifying the CLI exists',
      })
    }
  }
  for (const id of ourIds) {
    if (!upstreamIds.has(id)) {
      entries.push({
        id,
        status: 'stale',
        details: [`in cli-registry.mjs but no longer in vercel-labs/skills agents.ts`],
        autoFixable: false,
        fix: 'verify the CLI still exists; if abandoned, remove the entry',
      })
    }
  }

  return { name: 'skills-sh-diff', entries }
}

// =========================================================================
// Helpers
// =========================================================================

/**
 * HEAD a URL, fall back to GET if the server doesn't accept HEAD. Returns
 * { url, ok, status, detail }. Pure — never throws.
 */
async function probeUrl(url, timeoutSec) {
  try {
    const head = await fetchWithTimeout(url, { method: 'HEAD', redirect: 'follow' }, timeoutSec)
    if (head.ok) return { url, ok: true, status: head.status, detail: 'OK' }
    if (head.status === 405 || head.status === 501) {
      const get = await fetchWithTimeout(url, { method: 'GET', redirect: 'follow' }, timeoutSec)
      return {
        url,
        ok: get.ok,
        status: get.status,
        detail: get.ok ? 'OK (GET)' : `HTTP ${get.status}`,
      }
    }
    return { url, ok: false, status: head.status, detail: `HTTP ${head.status}` }
  } catch (err) {
    return { url, ok: false, status: 0, detail: String(err?.message ?? err) }
  }
}

async function fetchNpmLatest(name, timeoutSec) {
  try {
    const res = await fetchWithTimeout(
      `https://registry.npmjs.org/${encodeURIComponent(name)}/latest`,
      {},
      timeoutSec,
    )
    if (!res.ok) return null
    const json = await res.json()
    return typeof json?.version === 'string' ? json.version : null
  } catch {
    return null
  }
}

async function fetchSkillsShAgents(timeoutSec) {
  try {
    const res = await fetchWithTimeout(
      'https://raw.githubusercontent.com/vercel-labs/skills/main/src/agents.ts',
      {},
      timeoutSec,
    )
    if (!res.ok) return null
    const src = await res.text()
    return parseAgentIds(src)
  } catch {
    return null
  }
}

/**
 * Extract `name: 'foo'` ids from vercel-labs/skills agents.ts. Brittle but
 * good enough — if the upstream format changes, the audit fails closed.
 *
 * @param {string} src
 */
function parseAgentIds(src) {
  const ids = new Set()
  const re = /name:\s*['"]([a-z][a-z0-9-]*)['"]/g
  let m
  while ((m = re.exec(src)) !== null) ids.add(m[1])
  return [...ids]
}

async function fetchWithTimeout(url, init, timeoutSec) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), timeoutSec * 1000)
  try {
    return await fetch(url, { ...init, signal: ctrl.signal })
  } finally {
    clearTimeout(t)
  }
}

function categoryError(name, message) {
  return {
    name,
    entries: [{ id: name, status: 'errored', details: [message], autoFixable: false }],
  }
}

function summarize(categories) {
  const counts = { fresh: 0, stale: 0, gone: 0, new: 0, errored: 0 }
  for (const cat of categories) {
    for (const e of cat.entries ?? []) {
      if (counts[e.status] !== undefined) counts[e.status] += 1
    }
  }
  return counts
}

function stripRange(spec) {
  return String(spec).replace(/^[~^>=<\s]+/, '').trim()
}

function majorOf(version) {
  const m = String(version).match(/^(\d+)/)
  return m ? Number(m[1]) : null
}

function parseFlags(argv) {
  const flags = { pretty: false, only: null, offline: false, timeout: 8 }
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i]
    if (a === '--pretty') flags.pretty = true
    else if (a === '--offline') flags.offline = true
    else if (a === '--only') {
      flags.only = argv[i + 1] ?? null
      i += 1
    } else if (a === '--timeout') {
      const n = Number(argv[i + 1])
      if (Number.isFinite(n) && n > 0) flags.timeout = n
      i += 1
    }
  }
  return flags
}

function findRepoRoot(from) {
  let cur = from
  while (cur !== path.dirname(cur)) {
    if (existsSync(path.join(cur, 'pnpm-workspace.yaml'))) return cur
    cur = path.dirname(cur)
  }
  throw new Error(`could not find repo root from ${from}`)
}
