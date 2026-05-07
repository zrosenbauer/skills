import { readFileSync } from 'node:fs'
import path from 'node:path'

import type { SkillRecord } from '../workspace.js'

import { RULES } from './rules.js'
import type { Finding, Rule, SkillLintResult } from './types.js'

export function lintSkill(skill: SkillRecord): SkillLintResult {
  const skillMd = readFileSync(path.join(skill.location.dir, 'SKILL.md'), 'utf8')
  const body = skillMd.replace(/^---\n[\s\S]+?\n---\n/, '')

  const findings: Finding[] = []
  for (const rule of RULES) {
    const result = rule.check(skill, body)
    if (!result) continue
    findings.push({
      code: rule.code,
      severity: result.severity ?? rule.severity,
      message: result.message,
      ...(result.fix !== undefined && { fix: result.fix }),
    })
  }

  return { skill, findings }
}

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

export const lintRules: ReadonlyArray<Pick<Rule, 'code' | 'severity' | 'description'>> = RULES.map(
  ({ code, severity, description }) => ({ code, severity, description }),
)
