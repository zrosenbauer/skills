import type { AgentRecord } from '../agents/types.js'
import type { SkillRecord } from '../skills/types.js'
import type { CheckFrame } from './rule.js'

/**
 * Lint severity tier. `error` blocks publication; `warn` is a quality
 * signal; `info` is advisory (Claude Code extension recommendations,
 * missing optional files, etc.).
 */
export type Severity = 'error' | 'warn' | 'info'

/**
 * One rule violation surfaced for a single skill. Produced by the runner
 * from a rule's `CheckResult`.
 */
export interface Finding {
  /**
   * The rule that produced this finding (e.g. `DIR_NAME`). Matches the
   * `id` field on the originating `Rule`.
   */
  id: string
  /**
   * Severity tier for this specific finding. Defaults to the rule's
   * declared severity but may be overridden per-finding.
   */
  severity: Severity
  /**
   * Human-readable description of the violation, copied from the
   * check's `CheckResult.message`.
   */
  message: string
  /**
   * Optional remediation hint, copied from the check's `CheckResult.fix`.
   */
  fix?: string
  /**
   * Optional code-frame context, copied from the check's
   * `CheckResult.frame`. Drives `ctx.report.finding({ frame })`
   * rendering in pretty mode and the `frame` field in
   * json/yaml output.
   */
  frame?: CheckFrame
}

/**
 * The full lint output for one skill — the parsed skill record plus
 * every finding produced by the rules.
 */
export interface SkillLintResult {
  /**
   * The skill that was linted, including its parsed frontmatter and
   * filesystem location.
   */
  skill: SkillRecord
  /**
   * Findings in rule-declaration order. Renderers group by severity
   * when displaying; this list preserves the runner's traversal.
   */
  findings: Finding[]
}

/**
 * The full lint output for one agent — the parsed agent record plus
 * every finding produced by the agent rules. Parallel to
 * `SkillLintResult` so formatters can render them with the same
 * grouping logic.
 */
export interface AgentLintResult {
  /**
   * The agent that was linted, including its parsed frontmatter and
   * filesystem location.
   */
  agent: AgentRecord
  /**
   * Findings in rule-declaration order. Renderers group by severity
   * when displaying.
   */
  findings: Finding[]
}

/**
 * Per-severity totals across every linted target (skills + agents
 * combined). Produced by `summarize()` and consumed by formatters
 * and the CLI's exit-code decision.
 */
export interface LintTotals {
  errors: number
  warns: number
  infos: number
}
