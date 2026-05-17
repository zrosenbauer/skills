import { readFileSync } from 'node:fs'
import path from 'node:path'

import { match } from 'massaman'

import { type LintRuleConfig, readManifest } from '../skills/manifest.js'
import type { SkillRecord } from '../skills/types.js'
import type { Rule } from './rule.js'
import { listRules } from './rules/index.js'
import type { Finding, SkillLintResult } from './types.js'

/**
 * Run every rule against one skill and collect its findings. The
 * runner — not the rule — attaches `id` and the default `severity`,
 * so a check can override severity per-finding without restating its
 * identity. Per-skill overrides come from `skill.json.lint`.
 */
export function lintSkill(skill: SkillRecord): SkillLintResult {
  const skillMd = readFileSync(path.join(skill.location.dir, 'SKILL.md'), 'utf8')
  const body = skillMd.replace(/^---\n[\s\S]+?\n---\n/, '')
  const overrides = readManifest(skill)?.lint ?? {}

  const findings: Finding[] = []
  for (const rule of listRules()) {
    const finding = produceFinding({ rule, override: overrides[rule.id], skill, body })
    if (finding) findings.push(finding)
  }

  return { skill, findings }
}

interface ProduceFindingParams {
  /**
   * The rule being evaluated.
   */
  rule: Rule
  /**
   * Per-skill override from `skill.json.lint.<rule-id>`, or
   * `undefined` if the skill has no override for this rule.
   */
  override: LintRuleConfig | undefined
  /**
   * The skill record passed to the rule's `check` function.
   */
  skill: SkillRecord
  /**
   * The SKILL.md body (frontmatter stripped).
   */
  body: string
}

/**
 * Run one rule and convert its result into a Finding, applying any
 * per-skill override along the way. Returns `null` when the rule
 * passes or the override silences it via `level: 'off'`.
 */
function produceFinding({ rule, override, skill, body }: ProduceFindingParams): Finding | null {
  // Short-circuit: user explicitly silenced this rule for this skill.
  if (override?.level === 'off') return null

  const result = rule.check(skill, body)
  if (result.status === 'pass') return null

  // Severity precedence: user override > check's per-finding override
  // > rule's declared default. Pattern-match the override level so we
  // don't conflate the `'off'` short-circuit with the severity tiers.
  const severity = match(override?.level)
    .with('error', (level) => level)
    .with('warn', (level) => level)
    .with('info', (level) => level)
    .otherwise(() => result.severity ?? rule.severity)

  return {
    id: rule.id,
    severity,
    message: result.message,
    ...(result.fix !== undefined && { fix: result.fix }),
  }
}

/**
 * Tally findings across skills by severity tier. Exhaustive match
 * over `Severity` so a future tier (e.g. `'hint'`) fails the build
 * here until handled.
 */
export function summarize(results: SkillLintResult[]): {
  errors: number
  warns: number
  infos: number
} {
  const counts = { errors: 0, warns: 0, infos: 0 }
  for (const r of results) {
    for (const f of r.findings) {
      match(f.severity)
        .with('error', () => {
          counts.errors += 1
        })
        .with('warn', () => {
          counts.warns += 1
        })
        .with('info', () => {
          counts.infos += 1
        })
        .exhaustive()
    }
  }
  return counts
}
