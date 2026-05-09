import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { findRepoRoot } from '../lib/sync-scripts.js'

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'

const options = z.object({
  timeout: z
    .number()
    .int()
    .positive()
    .default(15)
    .describe('Per-URL fetch timeout in seconds (default 15)'),
})

interface ProviderEntry {
  id: string
  name: string
  docUrls: string[]
}

interface FetchResult {
  url: string
  status: number
  ok: boolean
  bytes: number
  text?: string
  error?: string
}

export default command({
  options,
  description:
    'Snapshot every provider doc listed in skills/skill-portability/scripts/providers.mjs into references/providers/<id>.md. Dev-time only — run on cadence (quarterly or before each release).',
  handler: async (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const providersPath = path.join(repoRoot, 'skills/skill-portability/scripts/providers.mjs')
    const providersUrl = new URL(`file://${providersPath}`).href
    const mod: { providers: ProviderEntry[] } = await import(providersUrl)
    const targets = mod.providers

    const outDir = path.join(repoRoot, 'skills/skill-portability/references/providers')
    mkdirSync(outDir, { recursive: true })

    const lines: string[] = []
    let okCount = 0
    let failCount = 0

    for (const provider of targets) {
      // Sequential on purpose: keeps console output deterministic and avoids
      // hammering provider docs with parallel fetches.
      // oxlint-disable-next-line no-await-in-loop
      const result = await tryUrls(provider.docUrls, ctx.args.timeout * 1000)
      if (result.ok && result.text) {
        const target = path.join(outDir, `${provider.id}.md`)
        writeFileSync(target, renderSnapshot({ provider, source: result }))
        lines.push(
          `${BOLD}${provider.id}${RESET} ${DIM}→${RESET} ${GREEN}snapshot${RESET} ${DIM}(${result.bytes.toLocaleString()} bytes from ${result.url})${RESET}`
        )
        okCount += 1
      } else {
        lines.push(
          `${BOLD}${provider.id}${RESET} ${DIM}→${RESET} ${RED}failed${RESET} ${DIM}(${result.error ?? `status ${result.status}`})${RESET}`
        )
        failCount += 1
      }
    }

    process.stdout.write(lines.join('\n') + '\n')
    process.stdout.write(
      `\n${BOLD}Summary${RESET}: ${GREEN}${okCount} snapshotted${RESET}, ${failCount > 0 ? RED : DIM}${failCount} failed${RESET}\n`
    )
    if (failCount > 0) {
      process.stdout.write(
        `${YELLOW}Some snapshots were not refreshed.${RESET} Existing snapshots remain unchanged.\n`
      )
      process.exit(1)
    }
  },
})

/**
 * Try docUrls in order; return the first 2xx response. If all fail, return
 * the last attempted result with the error noted.
 *
 * @private
 */
async function tryUrls(urls: string[], timeoutMs: number): Promise<FetchResult> {
  let last: FetchResult = { url: '', status: 0, ok: false, bytes: 0, error: 'no urls' }
  for (const url of urls) {
    // Sequential fallback: stop at the first 2xx; do not race the URLs.
    // oxlint-disable-next-line no-await-in-loop
    const result = await fetchWithTimeout(url, timeoutMs)
    if (result.ok) return result
    last = result
  }
  return last
}

/** @private */
async function fetchWithTimeout(url: string, timeoutMs: number): Promise<FetchResult> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'zrosenbauer-skill-tools refresh-provider-docs' },
    })
    if (!res.ok) {
      return { url, status: res.status, ok: false, bytes: 0, error: `HTTP ${res.status}` }
    }
    const raw = await res.text()
    const text = stripHtmlIfPresent(raw)
    return { url, status: res.status, ok: true, bytes: text.length, text }
  } catch (err) {
    return {
      url,
      status: 0,
      ok: false,
      bytes: 0,
      error: err instanceof Error ? err.message : String(err),
    }
  } finally {
    clearTimeout(timer)
  }
}

/**
 * If the response looks like HTML (DOCTYPE / <html), strip script/style/svg
 * /noscript blocks and collapse whitespace. Returns plain text content
 * suitable for an LLM context. If the input doesn't look like HTML (e.g.
 * llms.txt is markdown), return as-is.
 *
 * Conservative implementation — no DOM parsing, no external deps. Trades
 * some fidelity for predictability and zero supply-chain surface.
 *
 * @private
 */
function stripHtmlIfPresent(raw: string): string {
  const head = raw.slice(0, 500).toLowerCase()
  const looksLikeHtml = head.includes('<!doctype html') || head.includes('<html')
  if (!looksLikeHtml) return raw

  return raw
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Render the snapshot file with a header recording provenance + warning that
 * this is a generated artifact.
 *
 * @private
 */
function renderSnapshot({
  provider,
  source,
}: {
  provider: ProviderEntry
  source: FetchResult
}): string {
  const header = [
    `<!--`,
    `  AUTO-GENERATED snapshot of ${source.url}`,
    `  Provider: ${provider.id} (${provider.name})`,
    `  Refreshed at: ${new Date().toISOString()}`,
    `  Bytes: ${source.bytes.toLocaleString()}`,
    ``,
    `  DO NOT EDIT BY HAND. Run \`pnpm skill-tools refresh-provider-docs\``,
    `  to refresh from upstream. Update the docUrls list in`,
    `  skills/skill-portability/scripts/providers.mjs if a provider`,
    `  moves their docs.`,
    `-->`,
    ``,
    `# ${provider.name} — provider docs (snapshot)`,
    ``,
    `Source: ${source.url}`,
    ``,
    `---`,
    ``,
  ].join('\n')
  return header + (source.text ?? '') + (source.text?.endsWith('\n') ? '' : '\n')
}
