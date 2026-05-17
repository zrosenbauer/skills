import type { SkillRecord } from '../skills/types.js'
import type { Severity } from './types.js'

/**
 * Tagged result of a rule's `check` function. Either the rule is
 * satisfied (`status: 'pass'`) or a finding is produced
 * (`status: 'fail'` with details). The runner switches on `status`
 * rather than nullability so the contract is explicit at every call.
 */
export type CheckResult =
  | {
      /**
       * Discriminant — `'pass'` when the rule is satisfied and no
       * finding should be produced.
       */
      status: 'pass'
    }
  | {
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
 * Sentinel for the satisfied branch of a check. Read at call sites:
 * `return pass`. Cheaper than constructing a fresh object every time
 * a rule passes (which is most of them, most of the time).
 */
export const pass: CheckResult = { status: 'pass' }

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
   * Stable identifier for the rule (e.g. `DIR_NAME`, `BODY_TOO_LONG`).
   * Surfaces in the lint output and is the lookup key for `getRule`.
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
   * The actual predicate. Returns `pass` when the rule is satisfied,
   * or a `{ status: 'fail', ... }` result describing the violation.
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

/**
 * Identity helper for declaring a rule. Sharpens type inference at
 * the call site and gives one place to evolve rule shape (e.g. add
 * runtime validation later) without touching every definition.
 */
export function defineRule(rule: Rule): Rule {
  return rule
}

/**
 * Group related rules under a category name. The runner flattens to
 * `Rule[]`; the grouping is preserved for tooling that wants to
 * render findings by category.
 */
export function defineRuleset(ruleset: Ruleset): Ruleset {
  return ruleset
}
