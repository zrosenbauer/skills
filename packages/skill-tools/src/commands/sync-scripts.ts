import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { applySync, findRepoRoot, planSync, type SyncReport } from '../lib/sync-scripts.js'

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
    'Vendor canonical scripts from skill-scripts/<name>/ into each consuming skill per its scripts.json manifest. Pass --check to fail on drift without writing.',
  handler: (ctx) => {
    const repoRoot = findRepoRoot(process.cwd())
    const reports = planSync(repoRoot)

    if (reports.length === 0) {
      ctx.log.info('No skill declares a scripts.json manifest. Nothing to sync.')
      process.exit(0)
    }

    let driftCount = 0
    let missingCount = 0
    let syncedCount = 0
    const lines: string[] = []

    for (const report of reports) {
      if (report.missingScript) {
        missingCount += 1
        lines.push(
          `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${RED}MISSING${RESET} ${report.scriptName} ${DIM}(no skill-scripts/${report.scriptName}/ found)${RESET}`
        )
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
        lines.push(
          `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${GREEN}clean${RESET} ${report.scriptName} ${DIM}(${report.files.length} file${report.files.length === 1 ? '' : 's'})${RESET}`
        )
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

/** @private */
function renderDrift(report: SyncReport): string {
  const head = `${BOLD}${report.skill}${RESET} ${DIM}→${RESET} ${YELLOW}drift${RESET} ${report.scriptName}`
  const items = report.drift.map((d) => `    ${DIM}~${RESET} ${d.relative}`).join('\n')
  return `${head}\n${items}`
}
