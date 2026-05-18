import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { findRepoRoot } from '../lib/skills/index.js'
import { type SyncReport, applySync, planSync } from '../lib/sync/index.js'

const options = z.object({
  check: z
    .boolean()
    .default(false)
    .describe('Report drift but do not write. Exits 1 if any vendored copy is out of sync.'),
})

const RESET = '\x1b[0m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'

export default command({
  options,
  description:
    'Vendor canonical assets (scripts, references, ...) from their source roots into each consuming skill per its skill.json manifest. Pass --check to fail on drift without writing.',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const reports = planSync(repoRoot)

    if (reports.length === 0) {
      ctx.log.info('No skill declares a vendorable asset in skill.json. Nothing to sync.')
      process.exit(0)
    }

    let driftCount = 0
    let missingCount = 0
    let syncedCount = 0
    const lines: string[] = []

    for (const report of reports) {
      if (report.missingAsset) {
        missingCount += 1
        lines.push(renderMissing(report))
        continue
      }

      if (report.drift.length > 0) {
        driftCount += 1
        lines.push(renderDrift(report))
        if (!ctx.args.check) {
          applySync(report)
          syncedCount += 1
        }
      } else {
        lines.push(renderClean(report))
      }
    }

    process.stdout.write(lines.join('\n') + '\n')

    if (ctx.args.check) {
      process.stdout.write(
        `\n${BOLD}Summary${RESET}: ${driftCount > 0 ? RED : GREEN}${driftCount} drift${RESET}, ${missingCount > 0 ? RED : DIM}${missingCount} missing${RESET}\n`
      )
      if (driftCount > 0 || missingCount > 0) process.exit(1)
    } else {
      process.stdout.write(
        `\n${BOLD}Summary${RESET}: ${GREEN}${syncedCount} synced${RESET}, ${missingCount > 0 ? RED : DIM}${missingCount} missing${RESET}\n`
      )
      if (missingCount > 0) process.exit(1)
    }
  },
})

function renderClean(report: SyncReport): string {
  const tag = `${DIM}[${report.assetKind}]${RESET}`
  const fileCount = `${report.files.length} file${report.files.length === 1 ? '' : 's'}`
  return `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${GREEN}clean${RESET} ${tag} ${report.assetName} ${DIM}(${fileCount})${RESET}`
}

function renderDrift(report: SyncReport): string {
  const tag = `${DIM}[${report.assetKind}]${RESET}`
  const head = `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${YELLOW}drift${RESET} ${tag} ${report.assetName}`
  const items = report.drift.map((d) => `    ${DIM}~${RESET} ${d.relative}`).join('\n')
  return `${head}\n${items}`
}

function renderMissing(report: SyncReport): string {
  const tag = `${DIM}[${report.assetKind}]${RESET}`
  return `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${RED}MISSING${RESET} ${tag} ${report.assetName} ${DIM}(no source dir found)${RESET}`
}
