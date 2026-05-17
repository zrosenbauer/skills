import { isEmpty, match, P } from 'massaman'

import type { SkillRecord } from '../skills/types.js'
import { type CheckResult, pass } from './rule.js'

/**
 * Build a failing CheckResult. Matches on `fix` so the result is
 * constructed without conditional spreads under
 * `exactOptionalPropertyTypes: true`.
 */
export function fail({ message, fix }: { message: string; fix?: string | undefined }): CheckResult {
  return match(fix)
    .with(P.string, (f) => ({ status: 'fail' as const, message, fix: f }))
    .otherwise(() => ({ status: 'fail' as const, message }))
}

/**
 * Frontmatter field must be a non-empty string. Used for `name` and
 * `description` — the universally-required core fields. Matches the
 * value itself so `isEmpty` runs against real data, not a synthesized
 * boolean.
 */
export function checkFieldNonEmpty({
  field,
  fix,
}: {
  field: 'name' | 'description'
  fix?: string
}) {
  return ({ frontmatter }: SkillRecord): CheckResult =>
    match(frontmatter[field])
      .when(isEmpty, () => fail({ message: `Frontmatter is missing \`${field}\``, fix }))
      .otherwise(() => pass)
}

/**
 * Frontmatter field must be defined (any non-undefined value passes).
 * Used for the Claude Code extension fields where presence is what's
 * checked, not non-emptiness — booleans like `user-invocable: false`
 * should pass.
 */
export function checkFieldPresent({
  field,
  message,
  fix,
}: {
  field: 'argument-hint' | 'user-invocable' | 'model-invocable'
  message: string
  fix?: string
}) {
  return ({ frontmatter }: SkillRecord): CheckResult =>
    match(frontmatter[field])
      .with(P.nullish, () => fail({ message, fix }))
      .otherwise(() => pass)
}

/**
 * Description must match the pattern. Used for "Use when" anchors and
 * "Skip when" clauses — patterns whose presence is required. Matches
 * the description string itself so the value is visible at the call
 * site.
 */
export function checkDescriptionMatches({
  pattern,
  message,
  fix,
}: {
  pattern: RegExp
  message: string
  fix?: string
}) {
  return ({ frontmatter }: SkillRecord): CheckResult =>
    match(frontmatter.description)
      .when(
        (d) => pattern.test(d),
        () => pass
      )
      .otherwise(() => fail({ message, fix }))
}

/**
 * Description must NOT match the pattern. Used for anti-shortcut
 * words — patterns whose presence is forbidden. The matched fragment
 * is passed to `message` so the finding can quote it back ("contains
 * \"first\"").
 */
export function checkDescriptionForbids({
  pattern,
  message,
  fix,
}: {
  pattern: RegExp
  message: (match: string) => string
  fix?: string
}) {
  return ({ frontmatter }: SkillRecord): CheckResult =>
    match(frontmatter.description.match(pattern))
      .with(P.nullish, () => pass)
      .otherwise((m) => fail({ message: message(m[0]), fix }))
}

/**
 * Body must match the pattern. Used for the `<example>` block
 * requirement. Matches the body string itself.
 */
export function checkBodyMatches({
  pattern,
  message,
  fix,
}: {
  pattern: RegExp
  message: string
  fix?: string
}) {
  return (_skill: SkillRecord, body: string): CheckResult =>
    match(body)
      .when(
        (b) => pattern.test(b),
        () => pass
      )
      .otherwise(() => fail({ message, fix }))
}
