import type { AgentRecord } from '../agents/types.js'
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
  /**
   * Optional code-frame context — the source snippet and a
   * single-line annotation marking the bad span. The runner passes
   * this through to `ctx.report.finding({ frame })` so the pretty
   * output can render the offending code inline.
   */
  frame?: CheckFrame
}

/**
 * Code-frame attachment for a finding. Independent of kidd's
 * `CodeFrameInput` so the rule API doesn't churn when kidd does — the
 * runner maps this to kidd's shape at emit time.
 */
export interface CheckFrame {
  /**
   * Path shown above the frame (display only). Project-relative
   * reads cleaner than absolute.
   */
  filePath: string
  /**
   * Source lines to display. Each entry is one line of the snippet
   * (no trailing newline).
   */
  lines: string[]
  /**
   * 1-based line number in the source file of `lines[0]`. The
   * renderer numbers subsequent lines by incrementing from here.
   */
  startLine: number
  /**
   * Single-line annotation marking the bad span. `line` is 1-based
   * in the source file (same coordinate system as `startLine`).
   */
  annotation: {
    line: number
    column: number
    length: number
    message: string
  }
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
 * Build a failing CheckResult. Conditionally adds optional fields so
 * the result type stays clean under `exactOptionalPropertyTypes:
 * true` — undefined-spread would still fail the strict check.
 */
export function fail({
  message,
  fix,
  frame,
}: {
  message: string
  fix?: string | undefined
  frame?: CheckFrame | undefined
}): CheckResultFail {
  return {
    status: 'fail' as const,
    message,
    ...(fix !== undefined && { fix }),
    ...(frame !== undefined && { frame }),
  }
}

/**
 * Targets a rule may operate on. Skills get the body string as the
 * second arg so body-shape checks don't each re-do the frontmatter
 * split; agents don't (their bodies aren't structurally constrained
 * yet — extend the signature when we add body rules).
 */
export type RuleCheck<T> = T extends SkillRecord
  ? (skill: SkillRecord, body: string) => CheckResult
  : (record: T) => CheckResult

/**
 * One lint rule, parameterized by the record shape it inspects.
 * `Rule<SkillRecord>` covers the skill ruleset; `Rule<AgentRecord>`
 * covers the agent ruleset. The default of `SkillRecord` keeps the
 * existing skill-rule call sites working without a generic
 * annotation.
 */
export interface Rule<T = SkillRecord> {
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
   *
   * Within a rule that has `parsed: true` (the default), the check
   * can rely on `frontmatter` being validly parsed — the runner
   * guarantees this by skipping the rule when parsing failed.
   */
  check: RuleCheck<T>
  /**
   * When true (default), this rule operates on parsed frontmatter
   * content. The runner skips it when `frontmatterParseError` is
   * set — running it would fire spuriously against the stubbed-out
   * empty fields. The check can then assume `frontmatter` is valid.
   *
   * Set `false` for rules that:
   *   • diagnose parse failure itself (`fm-parse-failed`)
   *   • don't read frontmatter at all (`body-*`, `dir-name`,
   *     `file-name`, file-companion rules like `no-readme`)
   */
  parsed?: boolean
}

/**
 * Scope a ruleset belongs to — the namespace half of every rule's
 * public id. Skills and agents have separate rule pools so the same
 * `id` (e.g. `frontmatter`, `file-name`) can be used in both without
 * collision.
 */
export type RuleScope = 'skill' | 'agent'

/**
 * A named bundle of related rules — used for organization and grouped
 * output. Defaults to skill rules; agent rulesets bind `T = AgentRecord`.
 */
export interface Ruleset<T = SkillRecord> {
  /**
   * Category name within the scope (e.g. `frontmatter`, `body`).
   * Unique within its scope; the same name can appear in both
   * `skill` and `agent` scopes without conflict.
   */
  name: string
  /**
   * Which rule pool this ruleset belongs to — `skill` or `agent`.
   * Every rule in the ruleset gets addressed as `@<scope>/<id>` in
   * output and in manifest overrides.
   */
  scope: RuleScope
  /**
   * The rules in this category, in the order they should run /
   * display.
   */
  rules: Rule<T>[]
}

/**
 * Build the public `@scope/id` form for a rule. The runner emits this
 * as `Finding.id`, and `skill.json.lint` keys match this shape.
 */
export function scopedId(scope: RuleScope, ruleId: string): string {
  return `@${scope}/${ruleId}`
}

const KEBAB_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

/**
 * Identity helper for declaring a rule. Validates the id is
 * kebab-case at boot — fail-fast so a typo doesn't ship a rule users
 * can't reference in `skill.json.lint`. Generic so the same factory
 * builds both skill and agent rules.
 */
export function defineRule<T = SkillRecord>(rule: Rule<T>): Rule<T> {
  if (!KEBAB_RE.test(rule.id)) {
    throw new Error(`Rule id "${rule.id}" must be kebab-case (matches ${KEBAB_RE.source})`)
  }
  return rule
}

/**
 * Group related rules under a category name. Generic so it handles
 * both `Ruleset<SkillRecord>` (default) and `Ruleset<AgentRecord>`.
 */
export function defineRuleset<T = SkillRecord>(ruleset: Ruleset<T>): Ruleset<T> {
  if (!KEBAB_RE.test(ruleset.name)) {
    throw new Error(
      `Ruleset name "${ruleset.name}" must be kebab-case (matches ${KEBAB_RE.source})`
    )
  }
  return ruleset
}

/**
 * Convenience alias for agent rules. Use at agent-ruleset declaration
 * sites so the `defineRule<AgentRecord>({...})` ceremony doesn't
 * leak into every rule definition.
 */
export type AgentRule = Rule<AgentRecord>
export type AgentRuleset = Ruleset<AgentRecord>
