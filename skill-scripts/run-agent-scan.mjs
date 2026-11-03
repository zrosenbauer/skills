import { spawnSync } from 'node:child_process'
import { readdirSync, realpathSync, writeFileSync } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import { pathToFileURL } from 'node:url'

import { checkAgentScan } from './agent-scan.mjs'

/**
 * Retry only explicitly transient analysis errors, never findings or unknown failures.
 * @param {unknown} report
 * @returns {boolean}
 */
export function isTransientAnalysisFailure(report) {
  const paths = report?.scan_path_responses
  if (!Array.isArray(paths) || paths.length === 0) return false
  if (
    paths.some(
      (entry) => !entry || !Array.isArray(entry.skill_risks) || !Array.isArray(entry.server_risks)
    )
  )
    return false
  const errors = paths
    .flatMap((entry) =>
      [entry.error].concat(
        entry.skill_risks.map((component) => component?.error),
        entry.server_risks.map((component) => component?.error)
      )
    )
    .filter((error) => error != null)
  return (
    errors.length > 0 &&
    errors.every(
      (error) =>
        error.category === 'analysis_error' &&
        typeof error.message === 'string' &&
        /\b(?:429|502|503|504)\b/.test(error.message) &&
        !/\b(?:401|403)\b|unauthori[sz]ed|forbidden/i.test(error.message)
    )
  )
}

/**
 * Run and verify each scan before deciding whether to retry. Preserve every report.
 * @param {{ skillsDirectory: string, reportPath: string, cli?: string, retryDelays?: number[] }} options
 * @returns {Promise<number>} 0 clean, 1 findings, 2 unverified.
 */
export async function runAgentScan({
  skillsDirectory,
  reportPath,
  cli = 'uvx',
  retryDelays = [15_000, 30_000],
}) {
  const expected = readdirSync(skillsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
  if (expected.length === 0) throw new Error('No public skills found; refusing an empty scan.')
  if (!retryDelays.every((delay) => Number.isFinite(delay) && delay >= 0)) {
    throw new Error('Retry delays must be non-negative finite numbers.')
  }
  const scanAttempt = (attempt) => {
    const child = spawnSync(
      cli,
      ['snyk-agent-scan@latest', '--skills', skillsDirectory, '--json'],
      {
        encoding: 'utf8',
        timeout: 180_000,
        maxBuffer: 16 * 1024 * 1024,
      }
    )
    const output = child.stdout ?? ''
    writeFileSync(reportPath, output)
    writeFileSync(`${reportPath}.attempt-${attempt + 1}.json`, output)
    if (child.stderr) process.stderr.write(child.stderr)
    let report
    try {
      report = JSON.parse(output)
    } catch {
      console.error('Scanner returned invalid JSON; analysis is unverified.')
      return 2
    }
    const result = checkAgentScan(report, expected)
    console.error(JSON.stringify(result, null, 2))
    if (result.findings.length > 0) return 1
    if (child.status === 0 && result.errors.length === 0) return 0
    if (child.error || !isTransientAnalysisFailure(report) || attempt === retryDelays.length) {
      console.error(
        `Scan unavailable or failed (exit ${child.status ?? child.signal}); analysis is unverified.`
      )
      return 2
    }
    const delay = retryDelays[attempt]
    console.error(
      `Transient Snyk analysis failure; retry ${attempt + 1}/${retryDelays.length} in ${delay / 1000}s.`
    )
    return setTimeout(delay).then(() => scanAttempt(attempt + 1))
  }
  return scanAttempt(0)
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  try {
    const [reportPath, skillsDirectory, ...extra] = process.argv.slice(2)
    if (!reportPath || !skillsDirectory || extra.length) {
      throw new Error('Usage: run-agent-scan.mjs <audit.json> <public-skills-directory>')
    }
    process.exitCode = await runAgentScan({ reportPath, skillsDirectory })
  } catch (error) {
    console.error(`Scan failed: ${error.message}`)
    process.exitCode = 2
  }
}
