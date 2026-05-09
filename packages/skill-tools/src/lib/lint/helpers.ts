import { isEmpty } from 'es-toolkit/compat'

import type { SkillRecord } from '../workspace.js'
import { type CheckResult, pass } from './types.js'

/**
 * Build a failing CheckResult. Accepts `fix: string | undefined` (not just
 * optional) so callers can forward `fix` through without conditional spreads
 * under `exactOptionalPropertyTypes: true`.
 */
export function fail({ message, fix }: { message: string; fix?: string | undefined }): CheckResult {
  return fix === undefined ? { message } : { message, fix }
}

/**
 * Frontmatter field must be a non-empty string. Used for `name` and
 * `description` — the universally-required core fields.
 */
export function checkFieldNonEmpty({
  field,
  fix,
}: {
  field: 'name' | 'description'
  fix?: string
}) {
  return ({ frontmatter }: SkillRecord): CheckResult =>
    isEmpty(frontmatter[field])
      ? fail({ message: `Frontmatter is missing \`${field}\``, fix })
      : pass
}

/**
 * Frontmatter field must be defined (any non-undefined value passes). Used
 * for the Claude Code extension fields where presence is what's checked,
 * not non-emptiness — booleans like `user-invocable: false` should pass.
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
    frontmatter[field] !== undefined ? pass : fail({ message, fix })
}

/**
 * Description must match the pattern. Used for "Use when" anchors and
 * "Skip when" clauses — patterns whose presence is required.
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
    pattern.test(frontmatter.description) ? pass : fail({ message, fix })
}

/**
 * Description must NOT match the pattern. Used for anti-shortcut words —
 * patterns whose presence is forbidden. The matched fragment is passed to
 * `message` so the finding can quote it back ("contains \"first\"").
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
  return ({ frontmatter }: SkillRecord): CheckResult => {
    const m = frontmatter.description.match(pattern)
    return m ? fail({ message: message(m[0]), fix }) : pass
  }
}

/**
 * Body must match the pattern. Used for the `<example>` block requirement.
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
    pattern.test(body) ? pass : fail({ message, fix })
}
