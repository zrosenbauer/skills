#!/usr/bin/env node
// Refresh `popular-names.json` from `nice-registry/download-counts`.
//
// download-counts is a ~95 MB npm package published monthly. Rather than
// taking that as a hard dependency of the skill, we install it on-demand
// in a temp dir, extract the top-N names, and discard the rest.
//
// Usage:
//   node scripts/refresh-popular-names.mjs [--top 5000]

import { execSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, 'popular-names.json')

const { values } = parseArgs({
  args: process.argv.slice(2),
  options: { top: { type: 'string', default: '15000' } },
})

const TOP_N = parseInt(values.top, 10) || 5000

const stage = mkdtempSync(join(tmpdir(), 'npm-namer-refresh-'))
console.log(`staging download-counts in ${stage} (this can be slow — ~95 MB tarball)…`)

try {
  execSync('npm init -y --silent', { cwd: stage, stdio: 'pipe' })
  execSync('npm install download-counts --silent --no-audit --no-fund --no-package-lock', {
    cwd: stage,
    stdio: 'inherit',
    timeout: 5 * 60 * 1000,
  })

  const countsPath = join(stage, 'node_modules', 'download-counts', 'counts.json')
  const data = JSON.parse(readFileSync(countsPath, 'utf8'))
  const entries = Object.entries(data)
  console.log(`source has ${entries.length.toLocaleString()} packages`)

  entries.sort(([, a], [, b]) => b - a)
  const unscoped = entries.filter(([n]) => !n.startsWith('@')).slice(0, TOP_N)

  const pkgJson = JSON.parse(
    readFileSync(join(stage, 'node_modules', 'download-counts', 'package.json'), 'utf8')
  )

  const payload = {
    source: 'nice-registry/download-counts',
    sourceVersion: pkgJson.version,
    generated: new Date().toISOString().slice(0, 10),
    topRequested: TOP_N,
    size: unscoped.length,
    cutoffDownloads: unscoped.at(-1)?.[1] ?? null,
    names: unscoped.map(([n]) => n),
  }
  writeFileSync(OUT, JSON.stringify(payload) + '\n')
  console.log(`wrote ${unscoped.length} popular unscoped names to ${OUT}`)
  console.log(`cutoff: ${payload.cutoffDownloads?.toLocaleString()} monthly downloads`)
} finally {
  rmSync(stage, { recursive: true, force: true })
}
