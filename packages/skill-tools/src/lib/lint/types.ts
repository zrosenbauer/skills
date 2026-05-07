import type { SkillRecord } from '../workspace.js'

export type Severity = 'error' | 'warn' | 'info'

export interface Finding {
  code: string
  severity: Severity
  message: string
  fix?: string
}

/**
 * What a `check` function returns. The runner attaches `code` + `severity`
 * from the rule itself, so checks never repeat them. A check MAY override
 * `severity` (used by EVALS_MISSING for the public-vs-internal split).
 */
export type CheckResult = { message: string; fix?: string; severity?: Severity } | null

/** Sentinel for the "no finding" path. Read at call sites: `return pass`. */
export const pass: CheckResult = null

export interface Rule {
  code: string
  severity: Severity
  description: string
  check: (skill: SkillRecord, body: string) => CheckResult
}

export interface SkillLintResult {
  skill: SkillRecord
  findings: Finding[]
}
