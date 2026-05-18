import { readFileSync } from 'node:fs'
import path from 'node:path'

import { match } from 'massaman'

import type { AgentRecord } from '../agents/types.js'
import { FRONTMATTER_RE } from '../frontmatter/index.js'
import { type LintRuleConfig, readManifest } from '../skills/manifest.js'
import type { SkillRecord } from '../skills/types.js'
import type { Rule, RuleScope } from './rule.js'
import { scopedId } from './rule.js'
import { listAgentRulesets } from './rules/agents/index.js'
import { listSkillRulesets } from './rules/skills/index.js'
import type { AgentLintResult, Finding, LintTotals, SkillLintResult } from './types.js'

/**
 * Run every skill rule against one skill and collect its findings.
 * The runner — not the rule — attaches the public `@scope/id` and
 * the default `severity`, so a check can override severity
 * per-finding without restating its identity. Per-skill overrides
 * come from `skill.json.lint` keyed by `@skill/<id>`.
 */
export function lintSkill(skill: SkillRecord): SkillLintResult {
  const skillMd = readFileSync(path.join(skill.location.dir, 'SKILL.md'), 'utf8')
  const body = skillMd.replace(FRONTMATTER_RE, '')
  const overrides = readManifest(skill)?.lint ?? {}

  const findings: Finding[] = []
  for (const ruleset of listSkillRulesets()) {
    for (const rule of ruleset.rules) {
      const id = scopedId(ruleset.scope, rule.id)
      const finding = produceSkillFinding({
        rule,
        id,
        override: overrides[id],
        skill,
        body,
      })
      if (finding) findings.push(finding)
    }
  }

  return { skill, findings }
}

/**
 * Run every agent rule against one agent and collect its findings.
 * Mirror of `lintSkill` — no per-agent manifest overrides yet (agents
 * don't ship a `.json` companion file by convention), so every rule's
 * default severity stands.
 */
export function lintAgent(agent: AgentRecord): AgentLintResult {
  const findings: Finding[] = []
  for (const ruleset of listAgentRulesets()) {
    for (const rule of ruleset.rules) {
      const id = scopedId(ruleset.scope, rule.id)
      const finding = produceAgentFinding({ rule, id, agent })
      if (finding) findings.push(finding)
    }
  }
  return { agent, findings }
}

interface ProduceSkillFindingParams {
  rule: Rule<SkillRecord>
  /**
   * Public `@scope/id` form for the rule — used as the Finding id
   * and the override-map lookup key.
   */
  id: string
  override: LintRuleConfig | undefined
  skill: SkillRecord
  body: string
}

/**
 * Run one skill rule and convert its result into a Finding, applying
 * any per-skill override along the way. Returns `null` when the rule
 * passes or the override silences it via `level: 'off'`.
 */
function produceSkillFinding({
  rule,
  id,
  override,
  skill,
  body,
}: ProduceSkillFindingParams): Finding | null {
  if (override?.level === 'off') return null

  const result = rule.check(skill, body)
  if (result.status === 'pass') return null

  const severity = match(override?.level)
    .with('error', (level) => level)
    .with('warn', (level) => level)
    .with('info', (level) => level)
    .otherwise(() => result.severity ?? rule.severity)

  return {
    id,
    severity,
    message: result.message,
    ...(result.fix !== undefined && { fix: result.fix }),
  }
}

interface ProduceAgentFindingParams {
  rule: Rule<AgentRecord>
  id: string
  agent: AgentRecord
}

/**
 * Run one agent rule and convert its result into a Finding. No
 * override layer yet — when agent manifests become a thing this grows
 * to match the skill version.
 */
function produceAgentFinding({ rule, id, agent }: ProduceAgentFindingParams): Finding | null {
  const result = rule.check(agent)
  if (result.status === 'pass') return null

  return {
    id,
    severity: result.severity ?? rule.severity,
    message: result.message,
    ...(result.fix !== undefined && { fix: result.fix }),
  }
}

/**
 * Tally findings across an array of lint results by severity tier.
 * Accepts both skill and agent results — they only differ in the
 * non-findings fields, which `summarize` ignores. Exhaustive match
 * over `Severity` so a future tier (e.g. `'hint'`) fails the build
 * here until handled.
 */
export function summarize(results: { findings: Finding[] }[]): LintTotals {
  const counts: LintTotals = { errors: 0, warns: 0, infos: 0 }
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

// Re-export the type so consumers that imported it from this module
// still get the right shape.
export type { RuleScope }
