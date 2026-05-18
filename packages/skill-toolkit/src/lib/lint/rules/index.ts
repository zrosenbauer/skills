/**
 * Combined barrel for the lint rule registries. Skills and agents
 * each own a sub-directory (`./skills/`, `./agents/`) with the same
 * shape — ruleset files using `export default`, plus an `index.ts`
 * that exposes list/get helpers for that asset type.
 */

export { getSkillRule, getSkillRuleset, listSkillRules, listSkillRulesets } from './skills/index.js'

export { getAgentRule, listAgentRules, listAgentRulesets } from './agents/index.js'
