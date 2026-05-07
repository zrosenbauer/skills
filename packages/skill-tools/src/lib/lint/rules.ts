import {
  checkBodyMatches,
  checkDescriptionForbids,
  checkDescriptionMatches,
  checkFieldNonEmpty,
  checkFieldPresent,
  fail,
} from './helpers.js'
import { type Rule, pass } from './types.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/
const ANTI_SHORTCUT_RE = /\b(then|next|step\s+1|process|first)\b/i
const QUOTED_PHRASE_RE = /"[^"]+"/g

export const RULES: Rule[] = [
  {
    code: 'DIR_NAME',
    severity: 'error',
    description: 'Skill directory name must be kebab-case (^[a-z][a-z0-9-]+[a-z0-9]$)',
    check: ({ location }) =>
      NAMING_RE.test(location.name)
        ? pass
        : fail({
            message: `Directory name "${location.name}" is not kebab-case`,
            fix: 'Rename the directory to match ^[a-z][a-z0-9-]+[a-z0-9]$',
          }),
  },
  {
    code: 'FM_MISSING_NAME',
    severity: 'error',
    description: 'Frontmatter must include `name`',
    check: checkFieldNonEmpty({ field: 'name' }),
  },
  {
    code: 'FM_NAME_MISMATCH',
    severity: 'error',
    description: 'Frontmatter `name` must match directory basename',
    check: ({ frontmatter, location }) =>
      frontmatter.name === location.name
        ? pass
        : fail({
            message: `name="${frontmatter.name}" does not match directory "${location.name}"`,
            fix: `Set frontmatter \`name: ${location.name}\``,
          }),
  },
  {
    code: 'FM_MISSING_DESCRIPTION',
    severity: 'error',
    description: 'Frontmatter must include `description`',
    check: checkFieldNonEmpty({ field: 'description' }),
  },
  {
    code: 'FM_MISSING_ARGUMENT_HINT',
    severity: 'info',
    description: 'argument-hint is a Claude Code extension; recommended for cross-agent compat',
    check: checkFieldPresent({
      field: 'argument-hint',
      message: '`argument-hint` not set (Claude Code extension)',
      fix: "Add `argument-hint: '[<arg>]'` (use empty string if no args)",
    }),
  },
  {
    code: 'FM_MISSING_USER_INVOCABLE',
    severity: 'info',
    description: 'user-invocable is a Claude Code extension; recommended',
    check: checkFieldPresent({
      field: 'user-invocable',
      message: '`user-invocable` not set (Claude Code extension)',
    }),
  },
  {
    code: 'FM_MISSING_MODEL_INVOCABLE',
    severity: 'info',
    description: 'model-invocable is a Claude Code extension; recommended',
    check: checkFieldPresent({
      field: 'model-invocable',
      message: '`model-invocable` not set (Claude Code extension)',
    }),
  },
  {
    code: 'DESC_TOO_SHORT',
    severity: 'warn',
    description: 'description should be at least 80 characters',
    check: ({ frontmatter }) =>
      frontmatter.description.length < 80
        ? fail({
            message: `description is ${frontmatter.description.length} chars (target ≥ 80)`,
            fix: 'Add trigger phrases or disambiguation context',
          })
        : pass,
  },
  {
    code: 'DESC_TOO_LONG',
    severity: 'warn',
    description: 'description should be at most 1024 characters',
    check: ({ frontmatter }) =>
      frontmatter.description.length > 1024
        ? fail({ message: `description is ${frontmatter.description.length} chars (target ≤ 1024)` })
        : pass,
  },
  {
    code: 'DESC_NO_TRIGGER',
    severity: 'warn',
    description: 'description should contain "Use when" or "should be used when"',
    check: checkDescriptionMatches({
      pattern: /use when|should be used when/i,
      message: 'description lacks "Use when" / "should be used when" anchor',
      fix: 'Lead with "This skill should be used when ..."',
    }),
  },
  {
    code: 'DESC_FEW_TRIGGERS',
    severity: 'warn',
    description: 'description should list ≥ 3 verbatim trigger phrases in quotes',
    check: ({ frontmatter }) => {
      const matches = frontmatter.description.match(QUOTED_PHRASE_RE) ?? []
      return matches.length >= 3
        ? pass
        : fail({
            message: `description has ${matches.length} quoted trigger phrases (target ≥ 3)`,
            fix: 'List verbatim user prompts in double quotes',
          })
    },
  },
  {
    code: 'DESC_ANTI_SHORTCUT',
    severity: 'error',
    description: 'description must not contain then/next/step 1/process/first',
    check: checkDescriptionForbids({
      pattern: ANTI_SHORTCUT_RE,
      message: (m) => `description contains anti-shortcut word "${m}"`,
      fix: 'Reword the description; procedural verbs cause the agent to follow it as instructions',
    }),
  },
  {
    code: 'DESC_NO_SKIP',
    severity: 'info',
    description: 'description should include a "Skip when" clause',
    check: checkDescriptionMatches({
      pattern: /skip when|do not use when|avoid when/i,
      message: 'description lacks "Skip when" clause',
      fix: 'Add "Skip when [anti-trigger]" so the dispatcher knows what NOT to route',
    }),
  },
  {
    code: 'BODY_TOO_LONG',
    severity: 'warn',
    description: 'body should be at most 500 lines',
    check: (skill) =>
      skill.bodyLineCount > 500
        ? fail({
            message: `body is ${skill.bodyLineCount} lines (target ≤ 500)`,
            fix: 'Move depth into references/<topic>.md',
          })
        : pass,
  },
  {
    code: 'BODY_FEW_SECTIONS',
    severity: 'warn',
    description: 'body should have at least 3 `## ` sections',
    check: (_skill, body) => {
      const count = (body.match(/^##\s/gm) ?? []).length
      return count >= 3
        ? pass
        : fail({ message: `body has ${count} \`## \` sections (target ≥ 3)` })
    },
  },
  {
    code: 'BODY_TODO',
    severity: 'error',
    description: 'body must not contain TODO/FIXME/XXX placeholders',
    check: (_skill, body) => {
      const filtered = body
        .replace(/`[^`]*?(?:TODO|FIXME|XXX)[^`]*?`/g, '')
        .replace(/```[\s\S]*?```/g, '')
      const m = filtered.match(/\b(TODO|FIXME|XXX)\b/)
      return m
        ? fail({
            message: `body contains "${m[0]}" placeholder`,
            fix: 'Resolve or remove the placeholder before shipping',
          })
        : pass
    },
  },
  {
    code: 'BODY_NO_EXAMPLE',
    severity: 'warn',
    description: 'body should contain at least one <example> block',
    check: checkBodyMatches({
      pattern: /<example>[\s\S]+?<\/example>/,
      message: 'body has no <example> block',
      fix: 'Add at least one worked example wrapped in <example>...</example>',
    }),
  },
  {
    code: 'NO_README',
    severity: 'info',
    description: 'skill should ship a human-facing README.md',
    check: (skill) => (skill.hasReadme ? pass : fail({ message: 'no README.md' })),
  },
  {
    code: 'NO_LICENSE',
    severity: 'info',
    description: 'skill should ship a LICENSE',
    check: (skill) => (skill.hasLicense ? pass : fail({ message: 'no LICENSE' })),
  },
  {
    code: 'EVALS_MISSING',
    severity: 'error',
    description:
      'public skills must ship evals.json with ≥ 3 cases; internal skills (metadata.internal=true) only get a warn',
    check: (skill) => {
      if (skill.hasEvalsJson) return pass
      const internal = skill.frontmatter.metadata?.internal === true
      return {
        severity: internal ? 'warn' : 'error',
        message: internal
          ? 'no evals.json (internal skill — recommended but not required)'
          : 'no evals.json — every public skill must define ≥ 3 pressure scenarios',
        fix: 'Run /skill-creator audit <name>, or hand-author evals.json with 3+ cases',
      }
    },
  },
  {
    code: 'EVALS_MALFORMED',
    severity: 'error',
    description: 'evals.json must parse against the schema',
    check: (skill) =>
      skill.hasEvalsJson && skill.evalsParseError
        ? fail({ message: `evals.json failed schema validation: ${skill.evalsParseError}` })
        : pass,
  },
  {
    code: 'EVALS_NAME_MISMATCH',
    severity: 'warn',
    description: 'evals.json `skill_name` should match the directory name',
    check: (skill) =>
      skill.evalsFile && skill.evalsFile.skill_name !== skill.location.name
        ? fail({
            message: `evals.json skill_name="${skill.evalsFile.skill_name}" but dir is "${skill.location.name}"`,
          })
        : pass,
  },
  {
    code: 'EVALS_REGEX_INVALID',
    severity: 'error',
    description: 'every regex assertion in evals.json must compile under JS RegExp',
    check: (skill) => {
      if (!skill.evalsFile) return pass
      for (const e of skill.evalsFile.evals) {
        for (const a of e.assertions) {
          if (a.type !== 'regex') continue
          try {
            new RegExp(a.pattern, a.flags ?? '')
          } catch (err) {
            return fail({
              message: `eval "${e.eval_name}" has invalid regex /${a.pattern}/${a.flags ?? ''}: ${(err as Error).message}`,
              fix: 'Pass the regex to `new RegExp(pattern, flags)` and fix the syntax. Inline (?i)/(?s) are NOT supported in JS — use the optional `flags` field on the assertion.',
            })
          }
        }
      }
      return pass
    },
  },
]
