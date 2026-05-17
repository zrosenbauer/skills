import type { Rule, Ruleset } from '../rule.js'
import { bodyRules } from './body.js'
import { descriptionRules } from './description.js'
import { fileRules } from './files.js'
import { frontmatterRules } from './frontmatter.js'

const RULESETS: Ruleset[] = [frontmatterRules, descriptionRules, bodyRules, fileRules]

/**
 * Every registered ruleset in canonical order. Use for tooling that wants
 * to render findings grouped by category.
 */
export function listRulesets(): Ruleset[] {
  return RULESETS
}

/**
 * Look up a ruleset by its category name (e.g. `frontmatter`, `body`).
 * Returns `undefined` when no ruleset matches.
 */
export function getRuleset({ name }: { name: string }): Ruleset | undefined {
  return RULESETS.find((rs) => rs.name === name)
}

/**
 * Every rule across every ruleset, flattened. This is what the lint
 * runner iterates over to produce findings.
 */
export function listRules(): Rule[] {
  return RULESETS.flatMap((rs) => rs.rules)
}

/**
 * Look up one rule by id (e.g. `DIR_NAME`, `BODY_TOO_LONG`). Returns
 * `undefined` when no rule with that id exists.
 */
export function getRule({ id }: { id: string }): Rule | undefined {
  for (const rs of RULESETS) {
    const found = rs.rules.find((r) => r.id === id)
    if (found) return found
  }
  return undefined
}
