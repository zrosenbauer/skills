import type { SkillRecord } from '../../../skills/types.js'
import type { Rule, Ruleset } from '../../rule.js'
import bodyRules from './body.js'
import descriptionRules from './description.js'
import fileRules from './files.js'
import frontmatterRules from './frontmatter.js'

const SKILL_RULESETS: Ruleset<SkillRecord>[] = [
  frontmatterRules,
  descriptionRules,
  bodyRules,
  fileRules,
]

/**
 * Every registered skill ruleset in canonical order. Use for tooling
 * that wants to render findings grouped by category.
 */
export function listSkillRulesets(): Ruleset<SkillRecord>[] {
  return SKILL_RULESETS
}

/**
 * Look up a skill ruleset by its category name (e.g. `frontmatter`,
 * `body`). Returns `undefined` when no ruleset matches.
 */
export function getSkillRuleset({ name }: { name: string }): Ruleset<SkillRecord> | undefined {
  return SKILL_RULESETS.find((rs) => rs.name === name)
}

/**
 * Every skill rule across every skill ruleset, flattened. This is
 * what the skill lint runner iterates over to produce findings.
 */
export function listSkillRules(): Rule<SkillRecord>[] {
  return SKILL_RULESETS.flatMap((rs) => rs.rules)
}

/**
 * Look up one skill rule by id (e.g. `dir-name`, `body-too-long`).
 * Returns `undefined` when no rule with that id exists.
 */
export function getSkillRule({ id }: { id: string }): Rule<SkillRecord> | undefined {
  for (const rs of SKILL_RULESETS) {
    const found = rs.rules.find((r) => r.id === id)
    if (found) return found
  }
  return undefined
}
