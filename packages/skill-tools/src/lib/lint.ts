import { readFileSync } from 'node:fs'
import path from 'node:path'

import type { SkillRecord } from './workspace.js'

export type Severity = 'error' | 'warn' | 'info'

export interface Finding {
  code: string
  severity: Severity
  message: string
  fix?: string
}

export interface SkillLintResult {
  skill: SkillRecord
  findings: Finding[]
}

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/
const ANTI_SHORTCUT_RE = /\b(then|next|step\s+1|process|first)\b/i
const QUOTED_PHRASE_RE = /"[^"]+"/g

interface Rule {
  code: string
  severity: Severity
  description: string
  check: (skill: SkillRecord, body: string) => Finding | null
}

const RULES: Rule[] = [
  {
    code: 'DIR_NAME',
    severity: 'error',
    description: 'Skill directory name must be kebab-case (^[a-z][a-z0-9-]+[a-z0-9]$)',
    check: ({ location }) =>
      NAMING_RE.test(location.name)
        ? null
        : {
            code: 'DIR_NAME',
            severity: 'error',
            message: `Directory name "${location.name}" is not kebab-case`,
            fix: 'Rename the directory to match ^[a-z][a-z0-9-]+[a-z0-9]$',
          },
  },
  {
    code: 'FM_MISSING_NAME',
    severity: 'error',
    description: 'Frontmatter must include `name`',
    check: ({ frontmatter }) =>
      frontmatter.name && frontmatter.name.length > 0
        ? null
        : { code: 'FM_MISSING_NAME', severity: 'error', message: 'Frontmatter is missing `name`' },
  },
  {
    code: 'FM_NAME_MISMATCH',
    severity: 'error',
    description: 'Frontmatter `name` must match directory basename',
    check: ({ frontmatter, location }) =>
      frontmatter.name === location.name
        ? null
        : {
            code: 'FM_NAME_MISMATCH',
            severity: 'error',
            message: `name="${frontmatter.name}" does not match directory "${location.name}"`,
            fix: `Set frontmatter \`name: ${location.name}\``,
          },
  },
  {
    code: 'FM_MISSING_DESCRIPTION',
    severity: 'error',
    description: 'Frontmatter must include `description`',
    check: ({ frontmatter }) =>
      frontmatter.description && frontmatter.description.length > 0
        ? null
        : {
            code: 'FM_MISSING_DESCRIPTION',
            severity: 'error',
            message: 'Frontmatter is missing `description`',
          },
  },
  {
    code: 'FM_MISSING_ARGUMENT_HINT',
    severity: 'info',
    description: 'argument-hint is a Claude Code extension; recommended for cross-agent compat',
    check: ({ frontmatter }) =>
      frontmatter['argument-hint'] !== undefined
        ? null
        : {
            code: 'FM_MISSING_ARGUMENT_HINT',
            severity: 'info',
            message: '`argument-hint` not set (Claude Code extension)',
            fix: "Add `argument-hint: '[<arg>]'` (use empty string if no args)",
          },
  },
  {
    code: 'FM_MISSING_USER_INVOCABLE',
    severity: 'info',
    description: 'user-invocable is a Claude Code extension; recommended',
    check: ({ frontmatter }) =>
      frontmatter['user-invocable'] !== undefined
        ? null
        : {
            code: 'FM_MISSING_USER_INVOCABLE',
            severity: 'info',
            message: '`user-invocable` not set (Claude Code extension)',
          },
  },
  {
    code: 'FM_MISSING_MODEL_INVOCABLE',
    severity: 'info',
    description: 'model-invocable is a Claude Code extension; recommended',
    check: ({ frontmatter }) =>
      frontmatter['model-invocable'] !== undefined
        ? null
        : {
            code: 'FM_MISSING_MODEL_INVOCABLE',
            severity: 'info',
            message: '`model-invocable` not set (Claude Code extension)',
          },
  },
  {
    code: 'DESC_TOO_SHORT',
    severity: 'warn',
    description: 'description should be at least 80 characters',
    check: ({ frontmatter }) =>
      frontmatter.description.length < 80
        ? {
            code: 'DESC_TOO_SHORT',
            severity: 'warn',
            message: `description is ${frontmatter.description.length} chars (target ≥ 80)`,
            fix: 'Add trigger phrases or disambiguation context',
          }
        : null,
  },
  {
    code: 'DESC_TOO_LONG',
    severity: 'warn',
    description: 'description should be at most 1024 characters',
    check: ({ frontmatter }) =>
      frontmatter.description.length > 1024
        ? {
            code: 'DESC_TOO_LONG',
            severity: 'warn',
            message: `description is ${frontmatter.description.length} chars (target ≤ 1024)`,
          }
        : null,
  },
  {
    code: 'DESC_NO_TRIGGER',
    severity: 'warn',
    description: 'description should contain "Use when" or "should be used when"',
    check: ({ frontmatter }) =>
      /use when|should be used when/i.test(frontmatter.description)
        ? null
        : {
            code: 'DESC_NO_TRIGGER',
            severity: 'warn',
            message: 'description lacks "Use when" / "should be used when" anchor',
            fix: 'Lead with "This skill should be used when ..."',
          },
  },
  {
    code: 'DESC_FEW_TRIGGERS',
    severity: 'warn',
    description: 'description should list ≥ 3 verbatim trigger phrases in quotes',
    check: ({ frontmatter }) => {
      const matches = frontmatter.description.match(QUOTED_PHRASE_RE) ?? []
      return matches.length >= 3
        ? null
        : {
            code: 'DESC_FEW_TRIGGERS',
            severity: 'warn',
            message: `description has ${matches.length} quoted trigger phrases (target ≥ 3)`,
            fix: 'List verbatim user prompts in double quotes',
          }
    },
  },
  {
    code: 'DESC_ANTI_SHORTCUT',
    severity: 'error',
    description: 'description must not contain then/next/step 1/process/first',
    check: ({ frontmatter }) => {
      const m = frontmatter.description.match(ANTI_SHORTCUT_RE)
      return m
        ? {
            code: 'DESC_ANTI_SHORTCUT',
            severity: 'error',
            message: `description contains anti-shortcut word "${m[0]}"`,
            fix: 'Reword the description; procedural verbs cause the agent to follow it as instructions',
          }
        : null
    },
  },
  {
    code: 'DESC_NO_SKIP',
    severity: 'info',
    description: 'description should include a "Skip when" clause',
    check: ({ frontmatter }) =>
      /skip when|do not use when|avoid when/i.test(frontmatter.description)
        ? null
        : {
            code: 'DESC_NO_SKIP',
            severity: 'info',
            message: 'description lacks "Skip when" clause',
            fix: 'Add "Skip when [anti-trigger]" so the dispatcher knows what NOT to route',
          },
  },
  {
    code: 'BODY_TOO_LONG',
    severity: 'warn',
    description: 'body should be at most 500 lines',
    check: (skill) =>
      skill.bodyLineCount > 500
        ? {
            code: 'BODY_TOO_LONG',
            severity: 'warn',
            message: `body is ${skill.bodyLineCount} lines (target ≤ 500)`,
            fix: 'Move depth into references/<topic>.md',
          }
        : null,
  },
  {
    code: 'BODY_FEW_SECTIONS',
    severity: 'warn',
    description: 'body should have at least 3 `## ` sections',
    check: (_skill, body) => {
      const count = (body.match(/^##\s/gm) ?? []).length
      return count >= 3
        ? null
        : {
            code: 'BODY_FEW_SECTIONS',
            severity: 'warn',
            message: `body has ${count} \`## \` sections (target ≥ 3)`,
          }
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
        ? {
            code: 'BODY_TODO',
            severity: 'error',
            message: `body contains "${m[0]}" placeholder`,
            fix: 'Resolve or remove the placeholder before shipping',
          }
        : null
    },
  },
  {
    code: 'BODY_NO_EXAMPLE',
    severity: 'warn',
    description: 'body should contain at least one <example> block',
    check: (_skill, body) =>
      /<example>[\s\S]+?<\/example>/.test(body)
        ? null
        : {
            code: 'BODY_NO_EXAMPLE',
            severity: 'warn',
            message: 'body has no <example> block',
            fix: 'Add at least one worked example wrapped in <example>...</example>',
          },
  },
  {
    code: 'NO_README',
    severity: 'info',
    description: 'skill should ship a human-facing README.md',
    check: (skill) =>
      skill.hasReadme ? null : { code: 'NO_README', severity: 'info', message: 'no README.md' },
  },
  {
    code: 'NO_LICENSE',
    severity: 'info',
    description: 'skill should ship a LICENSE',
    check: (skill) =>
      skill.hasLicense ? null : { code: 'NO_LICENSE', severity: 'info', message: 'no LICENSE' },
  },
  {
    code: 'EVALS_MISSING',
    severity: 'error',
    description:
      'public skills must ship evals.json with ≥ 3 cases; internal skills (metadata.internal=true) only get a warn',
    check: (skill) => {
      if (skill.hasEvalsJson) return null
      const internal = skill.frontmatter.metadata?.internal === true
      return {
        code: 'EVALS_MISSING',
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
        ? {
            code: 'EVALS_MALFORMED',
            severity: 'error',
            message: `evals.json failed schema validation: ${skill.evalsParseError}`,
          }
        : null,
  },
  {
    code: 'EVALS_NAME_MISMATCH',
    severity: 'warn',
    description: 'evals.json `skill_name` should match the directory name',
    check: (skill) =>
      skill.evalsFile && skill.evalsFile.skill_name !== skill.location.name
        ? {
            code: 'EVALS_NAME_MISMATCH',
            severity: 'warn',
            message: `evals.json skill_name="${skill.evalsFile.skill_name}" but dir is "${skill.location.name}"`,
          }
        : null,
  },
]

export function lintSkill(skill: SkillRecord): SkillLintResult {
  const skillMd = readFileSync(path.join(skill.location.dir, 'SKILL.md'), 'utf8')
  const body = skillMd.replace(/^---\n[\s\S]+?\n---\n/, '')

  const findings: Finding[] = []
  for (const rule of RULES) {
    const result = rule.check(skill, body)
    if (result) findings.push(result)
  }

  return { skill, findings }
}

export function summarize(results: SkillLintResult[]): {
  errors: number
  warns: number
  infos: number
} {
  const counts = { errors: 0, warns: 0, infos: 0 }
  for (const r of results) {
    for (const f of r.findings) {
      if (f.severity === 'error') counts.errors += 1
      else if (f.severity === 'warn') counts.warns += 1
      else counts.infos += 1
    }
  }
  return counts
}

export const lintRules: ReadonlyArray<Pick<Rule, 'code' | 'severity' | 'description'>> = RULES.map(
  ({ code, severity, description }) => ({ code, severity, description })
)
