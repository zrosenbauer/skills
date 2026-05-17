import { match, P } from 'massaman'

import type { SkillRecord } from '../skills/types.js'
import type { Severity } from './types.js'

/**
 * Satisfied branch of a `CheckResult`. Produced by `pass()` when a
 * rule's predicate holds.
 */
export interface CheckResultPass {
  /**
   * Discriminant — `'pass'` when the rule is satisfied and no
   * finding should be produced.
   */
  status: 'pass'
}

/**
 * Failing branch of a `CheckResult`. Produced by `fail({...})` when a
 * rule's predicate is violated.
 */
export interface CheckResultFail {
  /**
   * Discriminant — `'fail'` when the rule produces a finding.
   */
  status: 'fail'
  /**
   * Human-readable description of what the rule found. Rendered
   * inline next to the rule id in the lint output.
   */
  message: string
  /**
   * Optional remediation hint shown when the caller passes
   * `--fix`. Should describe the change, not perform it.
   */
  fix?: string
  /**
   * Optional per-finding severity override. When omitted, the
   * runner uses the rule's default severity.
   */
  severity?: Severity
}

/**
 * Tagged result of a rule's `check` function. Either the rule is
 * satisfied (`status: 'pass'`) or a finding is produced
 * (`status: 'fail'` with details). The runner switches on `status`
 * rather than nullability so the contract is explicit at every call.
 */
export type CheckResult = CheckResultPass | CheckResultFail

/**
 * Build a passing CheckResult. Pair with `fail({...})` — call sites
 * read symmetrically: `pass()` vs `fail({ message })`.
 */
export function pass(): CheckResultPass {
  return { status: 'pass' }
}

/**
 * Build a failing CheckResult. Matches on `fix` so the result is
 * constructed without conditional spreads under
 * `exactOptionalPropertyTypes: true`.
 */
export function fail({
  message,
  fix,
}: {
  message: string
  fix?: string | undefined
}): CheckResultFail {
  return match(fix)
    .with(P.string, (f) => ({ status: 'fail' as const, message, fix: f }))
    .otherwise(() => ({ status: 'fail' as const, message }))
}

/**
 * Signature every rule's `check` field conforms to. Receives the
 * parsed skill record and the body text (frontmatter stripped) so
 * checks don't each re-do the split.
 */
export type RuleCheck = (skill: SkillRecord, body: string) => CheckResult

/**
 * One lint rule. The `check` function is invoked once per skill; its
 * return value is converted into a Finding by the runner, which
 * attaches `id` and the default `severity`.
 */
export interface Rule {
  /**
   * Kebab-case identifier for the rule (e.g. `dir-name`,
   * `body-too-long`). Surfaces in the lint output, is the lookup key
   * for `getRule`, and is what users reference in
   * `skill.json.lint.<id>` overrides.
   */
  id: string
  /**
   * Default severity tier when a check returns a finding. May be
   * overridden per-finding by `CheckResult.severity`.
   */
  severity: Severity
  /**
   * Short one-line explanation of what the rule enforces. Shown by
   * tooling that lists rules; not surfaced in per-finding output.
   */
  description: string
  /**
   * The actual predicate. Returns `pass()` when the rule is satisfied,
   * or `fail({ message, fix? })` describing the violation.
   */
  check: RuleCheck
}

/**
 * A named bundle of related rules — used for organization and grouped
 * output. The runner flattens rulesets to a single `Rule[]`.
 */
export interface Ruleset {
  /**
   * Category name (e.g. `frontmatter`, `body`). The lookup key for
   * `getRuleset`; should be unique across all rulesets.
   */
  name: string
  /**
   * The rules in this category, in the order they should run /
   * display.
   */
  rules: Rule[]
}

const KEBAB_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

/**
 * Identity helper for declaring a rule. Validates the id is
 * kebab-case at boot — fail-fast so a typo doesn't ship a rule users
 * can't reference in `skill.json.lint`.
 */
export function defineRule(rule: Rule): Rule {
  if (!KEBAB_RE.test(rule.id)) {
    throw new Error(`Rule id "${rule.id}" must be kebab-case (matches ${KEBAB_RE.source})`)
  }
  return rule
}

/**
 * Group related rules under a category name. The runner flattens to
 * `Rule[]`; the grouping is preserved for tooling that wants to
 * render findings by category.
 */
export function defineRuleset(ruleset: Ruleset): Ruleset {
  if (!KEBAB_RE.test(ruleset.name)) {
    throw new Error(
      `Ruleset name "${ruleset.name}" must be kebab-case (matches ${KEBAB_RE.source})`
    )
  }
  return ruleset
}
