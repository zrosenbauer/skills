import type { AgentLintResult, LintTotals, Severity, SkillLintResult } from '../types.js'

/**
 * Output format for `skill-toolkit lint`. Selects which formatter
 * renders the results: `pretty` for terminal (ANSI), `json`/`yaml`
 * for machine consumption.
 */
export type LintFormat = 'pretty' | 'json' | 'yaml'

/**
 * Common inputs every formatter receives. Execution
 * (`lintSkill`/`lintAgent`/`summarize`) produces the results +
 * totals; the CLI supplies the rendering knobs.
 */
export interface FormatInput {
  /**
   * Skill lint results in target order. Empty array when the run
   * scoped to `--target=agents`.
   */
  skillResults: SkillLintResult[]
  /**
   * Agent lint results in target order. Empty array when the run
   * scoped to `--target=skills` or no agents were discovered.
   */
  agentResults: AgentLintResult[]
  /**
   * Aggregate counts across skill + agent findings combined. Always
   * the *unfiltered* totals so the summary footer and exit code stay
   * consistent regardless of `minSeverity`.
   */
  totals: LintTotals
  /**
   * Hide findings strictly below this severity tier. Undefined means
   * "show all". Affects what each formatter emits, not `totals`.
   */
  minSeverity: Severity | undefined
  /**
   * Whether to include each finding's fix hint in the output.
   */
  showFix: boolean
}

/**
 * A formatter is a pure function: given the lint outputs and the
 * rendering knobs, return the string to write to stdout.
 */
export type Formatter = (input: FormatInput) => string
