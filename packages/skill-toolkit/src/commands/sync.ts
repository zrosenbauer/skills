import { command } from '@kidd-cli/core'
import { match } from 'massaman'
import { stringify as stringifyYaml } from 'yaml'
import { z } from 'zod'

import { findRepoRoot } from '../lib/skills/index.js'
import { type SyncReport, applySync, planSync } from '../lib/sync/index.js'

const options = z.object({
  check: z
    .boolean()
    .default(false)
    .describe('Report drift but do not write. Exits 1 if any vendored copy is out of sync.'),
  format: z
    .enum(['pretty', 'json', 'yaml'])
    .default('pretty')
    .describe('Output format: pretty (ANSI), json, or yaml.'),
})

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'

type SyncStatus = 'clean' | 'drift' | 'missing'

export default command({
  options,
  description:
    'Vendor canonical assets (scripts, references, ...) from their source roots into each consuming skill per its skill.json manifest. Pass --check to fail on drift without writing.',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const reports = planSync(repoRoot)

    if (reports.length === 0) {
      if (ctx.args.format === 'pretty') {
        ctx.log.info('No skill declares a vendorable asset in skill.json. Nothing to sync.')
      } else {
        process.stdout.write(formatStructured({ format: ctx.args.format, results: [] }))
      }
      process.exit(0)
    }

    let driftCount = 0
    let missingCount = 0
    let syncedCount = 0
    const results: SyncResult[] = []

    for (const report of reports) {
      if (report.missingAsset) {
        missingCount += 1
        results.push({ report, status: 'missing', applied: false })
        continue
      }

      if (report.drift.length > 0) {
        driftCount += 1
        const applied = !ctx.args.check
        if (applied) {
          applySync(report)
          syncedCount += 1
        }
        results.push({ report, status: 'drift', applied })
      } else {
        results.push({ report, status: 'clean', applied: false })
      }
    }

    process.stdout.write(
      match(ctx.args.format)
        .with('pretty', () =>
          renderPretty({ results, driftCount, missingCount, syncedCount, check: ctx.args.check })
        )
        .with('json', () => formatStructured({ format: 'json', results }))
        .with('yaml', () => formatStructured({ format: 'yaml', results }))
        .exhaustive()
    )

    if (ctx.args.check) {
      if (driftCount > 0 || missingCount > 0) process.exit(1)
    } else {
      if (missingCount > 0) process.exit(1)
    }
  },
})

interface SyncResult {
  report: SyncReport
  status: SyncStatus
  /**
   * Whether `applySync` was actually invoked (only true on drift +
   * not in `--check` mode).
   */
  applied: boolean
}

interface PrettyParams {
  results: SyncResult[]
  driftCount: number
  missingCount: number
  syncedCount: number
  check: boolean
}

function renderPretty({
  results,
  driftCount,
  missingCount,
  syncedCount,
  check,
}: PrettyParams): string {
  const lines = results.map((r) =>
    match(r.status)
      .with('clean', () => renderClean(r.report))
      .with('drift', () => renderDrift(r.report))
      .with('missing', () => renderMissing(r.report))
      .exhaustive()
  )
  const summary = check
    ? `\n${BOLD}Summary${RESET}: ${driftCount > 0 ? RED : GREEN}${driftCount} drift${RESET}, ${missingCount > 0 ? RED : DIM}${missingCount} missing${RESET}\n`
    : `\n${BOLD}Summary${RESET}: ${GREEN}${syncedCount} synced${RESET}, ${missingCount > 0 ? RED : DIM}${missingCount} missing${RESET}\n`
  return lines.join('\n') + '\n' + summary
}

function renderClean(report: SyncReport): string {
  const tag = `${DIM}[${report.kind}]${RESET}`
  const fileCount = `${report.files.length} file${report.files.length === 1 ? '' : 's'}`
  return `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${GREEN}clean${RESET} ${tag} ${report.assetName} ${DIM}(${fileCount})${RESET}`
}

function renderDrift(report: SyncReport): string {
  const tag = `${DIM}[${report.kind}]${RESET}`
  const head = `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${YELLOW}drift${RESET} ${tag} ${report.assetName}`
  const items = report.drift.map((d) => `    ${DIM}~${RESET} ${d.relative}`).join('\n')
  return `${head}\n${items}`
}

function renderMissing(report: SyncReport): string {
  const tag = `${DIM}[${report.kind}]${RESET}`
  return `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${RED}MISSING${RESET} ${tag} ${report.assetName} ${DIM}(no source dir found)${RESET}`
}

interface StructuredParams {
  format: 'json' | 'yaml'
  results: SyncResult[]
}

/**
 * Machine-readable envelope for json/yaml output. Stable shape so
 * downstream tooling (CI, dashboards) doesn't care which format it
 * reads.
 */
function formatStructured({ format, results }: StructuredParams): string {
  const summary = results.reduce(
    (acc, r) => ({
      total: acc.total + 1,
      clean: acc.clean + (r.status === 'clean' ? 1 : 0),
      drift: acc.drift + (r.status === 'drift' ? 1 : 0),
      missing: acc.missing + (r.status === 'missing' ? 1 : 0),
      applied: acc.applied + (r.applied ? 1 : 0),
    }),
    { total: 0, clean: 0, drift: 0, missing: 0, applied: 0 }
  )
  const envelope = {
    summary,
    reports: results.map((r) => ({
      skill: r.report.skill,
      kind: r.report.kind,
      asset: r.report.assetName,
      status: r.status,
      applied: r.applied,
      files: r.report.files.length,
      drift: r.report.drift.map((f) => f.relative),
    })),
  }
  return format === 'json' ? JSON.stringify(envelope, null, 2) + '\n' : stringifyYaml(envelope)
}
