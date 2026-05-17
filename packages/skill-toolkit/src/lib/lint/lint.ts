import { readFileSync } from 'node:fs'
import path from 'node:path'

import type { SkillRecord } from '../skills/types.js'
import { listRules } from './rules/index.js'
import type { Finding, SkillLintResult } from './types.js'

/**
 * Run every rule against one skill and collect its findings. The runner —
 * not the rule — attaches `id` and the default `severity`, so a check can
 * override severity per-finding without restating its identity.
 */
export function lintSkill(skill: SkillRecord): SkillLintResult {
  const skillMd = readFileSync(path.join(skill.location.dir, 'SKILL.md'), 'utf8')
  const body = skillMd.replace(/^---\n[\s\S]+?\n---\n/, '')

  const findings: Finding[] = []
  for (const rule of listRules()) {
    const result = rule.check(skill, body)
    if (result.status === 'pass') continue
    findings.push({
      id: rule.id,
      severity: result.severity ?? rule.severity,
      message: result.message,
      ...(result.fix !== undefined && { fix: result.fix }),
    })
  }

  return { skill, findings }
}

/**
 * Tally findings across skills by severity tier. Drives the summary
 * footer at the bottom of the lint output.
 */
export function summarize(results: SkillLintResult[]): {
  errors: number
  warns: number
  infos: number
} {
  const counts = { errors: 0, warns: 0, infos: 0 }
  for (const r of results) {
    for (const f of r.findings) {
      if (f.severity === 'error') counts.errors += 1
      else if (f.severity === 'warn') counts.warns += 1
      else counts.infos += 1
    }
  }
  return counts
}
