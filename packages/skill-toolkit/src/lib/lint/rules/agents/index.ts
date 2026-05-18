import type { AgentRecord } from '../../../agents/types.js'
import type { Rule, Ruleset } from '../../rule.js'
import { agentFrontmatterRules } from './frontmatter.js'

const AGENT_RULESETS: Ruleset<AgentRecord>[] = [agentFrontmatterRules]

/**
 * Every registered agent ruleset in canonical order. Mirror of
 * `listRulesets()` for the skill pool.
 */
export function listAgentRulesets(): Ruleset<AgentRecord>[] {
  return AGENT_RULESETS
}

/**
 * Every agent rule across every agent ruleset, flattened. This is
 * what the agent lint runner iterates over.
 */
export function listAgentRules(): Rule<AgentRecord>[] {
  return AGENT_RULESETS.flatMap((rs) => rs.rules)
}

/**
 * Look up one agent rule by id. Returns `undefined` when no rule
 * with that id exists.
 */
export function getAgentRule({ id }: { id: string }): Rule<AgentRecord> | undefined {
  for (const rs of AGENT_RULESETS) {
    const found = rs.rules.find((r) => r.id === id)
    if (found) return found
  }
  return undefined
}
