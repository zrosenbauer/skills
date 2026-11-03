import { readFileSync, readdirSync, realpathSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

/**
 * Check the current Snyk scan schema without treating unavailable analysis as clean.
 * Scores >= 600 retain the existing High/Critical gate.
 * Source: https://github.com/snyk/agent-scan/blob/main/docs/json-output.md
 * Scores: https://github.com/snyk/agent-scan/blob/main/docs/risks.md
 * @param {unknown} report
 * @param {string[]} expectedSkills
 * @returns {{ errors: string[], findings: object[], skills: string[] }}
 */
export function checkAgentScan(report, expectedSkills) {
  const errors = []
  const findings = []
  const skills = []
  if (
    !isRecord(report) ||
    !Array.isArray(report.scan_path_responses) ||
    report.scan_path_responses.length === 0
  ) {
    return {
      errors: ['Missing non-empty scan_path_responses; analysis is unverified.'],
      findings,
      skills,
    }
  }

  for (const response of report.scan_path_responses) {
    if (!isRecord(response) || typeof response.path !== 'string') {
      errors.push('Invalid scan path response.')
      continue
    }
    if (response.error != null)
      errors.push(
        `${response.path}: analysis returned an operational error: ${errorMessage(response.error)}`
      )
    for (const key of ['skill_risks', 'server_risks']) {
      if (!Array.isArray(response[key])) {
        errors.push(`${response.path}: missing ${key} array.`)
        continue
      }
      for (const component of response[key]) {
        if (!isRecord(component) || typeof component.name !== 'string' || !component.name) {
          errors.push(`${response.path}: invalid component in ${key}.`)
          continue
        }
        if (key === 'skill_risks') skills.push(component.name)
        if (component.error != null)
          errors.push(
            `${component.name}: analysis returned an operational error: ${errorMessage(component.error)}`
          )
        if (!isRecord(component.risk_indexes)) {
          errors.push(`${component.name}: missing risk_indexes object.`)
          continue
        }
        for (const [indicator, risk] of Object.entries(component.risk_indexes)) {
          if (
            !isRecord(risk) ||
            !Number.isInteger(risk.score) ||
            risk.score < 0 ||
            risk.score > 1000 ||
            typeof risk.evidence !== 'string'
          ) {
            errors.push(`${component.name}: malformed risk indicator ${indicator}.`)
            continue
          }
          if (risk.score >= 600)
            findings.push({
              component: component.name,
              indicator,
              score: risk.score,
              evidence: risk.evidence,
            })
        }
      }
    }
  }
  for (const name of expectedSkills) {
    if (!skills.includes(name)) errors.push(`${name}: no skill analysis result returned.`)
  }
  if (skills.length === 0) errors.push('No skills were analyzed.')
  if (new Set(skills).size !== skills.length)
    errors.push('Duplicate skill analysis results returned.')
  return { errors, findings, skills }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function errorMessage(error) {
  return isRecord(error) && typeof error.message === 'string'
    ? error.message
    : 'No error message returned.'
}

if (process.argv[1] && import.meta.url === pathToFileURL(realpathSync(process.argv[1])).href) {
  try {
    const args = process.argv.slice(2)
    if (args.length !== 2)
      throw new Error('Usage: agent-scan.mjs <audit.json> <public-skills-directory>')
    const expected = readdirSync(args[1], { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
    if (expected.length === 0) throw new Error('No public skills found; refusing an empty scan.')
    const result = checkAgentScan(JSON.parse(readFileSync(args[0], 'utf8')), expected)
    console.log(JSON.stringify(result, null, 2))
    if (result.errors.length) process.exitCode = 2
    else process.exitCode = Number(result.findings.length > 0)
  } catch (error) {
    console.error(`Scan verification failed: ${error.message}`)
    process.exitCode = 2
  }
}
