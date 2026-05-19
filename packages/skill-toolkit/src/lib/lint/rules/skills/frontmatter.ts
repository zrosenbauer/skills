import { isEmpty, match, P } from 'massaman'

import { buildFrontmatterFrame } from '../../../frontmatter/index.js'
import type { SkillRecord } from '../../../skills/types.js'
import type { CheckFrame } from '../../rule.js'
import { defineRule, defineRuleset, fail, pass } from '../../rule.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

/**
 * Convenience for the most common pattern in this ruleset: render the
 * skill's frontmatter as a frame, optionally pointing at a specific
 * field. Returns `undefined` when no frontmatter is available — the
 * rule then emits a frameless finding.
 */
function frame(
  skill: SkillRecord,
  { field, message }: { field?: string; message: string }
): CheckFrame | undefined {
  if (skill.frontmatterRaw === null) return undefined
  return buildFrontmatterFrame({
    filePath: `${skill.location.name}/SKILL.md`,
    raw: skill.frontmatterRaw,
    ...(field !== undefined && { field }),
    message,
  })
}

export default defineRuleset({
  name: 'frontmatter',
  scope: 'skill',
  rules: [
    defineRule({
      id: 'dir-name',
      severity: 'error',
      description: 'Skill directory name must be kebab-case (^[a-z][a-z0-9-]+[a-z0-9]$)',
      check: ({ location }) =>
        match(location.name)
          .when(
            (n) => NAMING_RE.test(n),
            () => pass()
          )
          .otherwise((name) =>
            fail({
              message: `Directory name "${name}" is not kebab-case`,
              fix: 'Rename the directory to match ^[a-z][a-z0-9-]+[a-z0-9]$',
            })
          ),
    }),
    defineRule({
      id: 'fm-invalid-yaml',
      severity: 'error',
      description: 'frontmatter YAML must parse (syntax-valid)',
      check: (skill) =>
        match(skill.frontmatterYamlError)
          .with(P.nullish, () => pass())
          .otherwise((err) =>
            fail({
              message: `frontmatter YAML failed to parse: ${err}`,
              frame: frame(skill, { message: err }),
            })
          ),
    }),
    defineRule({
      id: 'fm-missing-name',
      severity: 'error',
      description: 'Frontmatter must include `name` as a non-empty string',
      check: (skill) =>
        match(skill.frontmatter.name)
          .when(
            (v) => typeof v === 'string' && !isEmpty(v),
            () => pass()
          )
          .otherwise(() =>
            fail({
              message: 'Frontmatter is missing `name`',
              frame: frame(skill, { message: 'add `name: <kebab-case-id>` here' }),
            })
          ),
    }),
    defineRule({
      id: 'fm-name-mismatch',
      severity: 'error',
      description: 'Frontmatter `name` must match directory basename',
      check: (skill) => {
        const name = skill.frontmatter.name
        // fm-missing-name owns the "not a string" case; don't double-fire.
        if (typeof name !== 'string') return pass()
        if (name === skill.location.name) return pass()
        return fail({
          message: `name="${name}" does not match directory "${skill.location.name}"`,
          fix: `Set frontmatter \`name: ${skill.location.name}\``,
          frame: frame(skill, {
            field: 'name',
            message: `should be "${skill.location.name}"`,
          }),
        })
      },
    }),
    defineRule({
      id: 'fm-missing-description',
      severity: 'error',
      description: 'Frontmatter must include `description` as a non-empty string',
      check: (skill) =>
        match(skill.frontmatter.description)
          .when(
            (v) => typeof v === 'string' && !isEmpty(v),
            () => pass()
          )
          .otherwise(() =>
            fail({
              message: 'Frontmatter is missing `description`',
              frame: frame(skill, { message: 'add `description: ...` here' }),
            })
          ),
    }),
    defineRule({
      id: 'fm-missing-argument-hint',
      severity: 'info',
      description: 'argument-hint is a Claude Code extension; recommended for cross-agent compat',
      check: (skill) =>
        match(skill.frontmatter['argument-hint'])
          .with(P.nullish, () =>
            fail({
              message: '`argument-hint` not set (Claude Code extension)',
              fix: "Add `argument-hint: '[<arg>]'` (use empty string if no args)",
              frame: frame(skill, { message: "add `argument-hint: '[<arg>]'` here" }),
            })
          )
          .otherwise(() => pass()),
    }),
    defineRule({
      id: 'fm-missing-user-invocable',
      severity: 'info',
      description: 'user-invocable is a Claude Code extension; recommended',
      check: (skill) =>
        match(skill.frontmatter['user-invocable'])
          .with(P.nullish, () =>
            fail({
              message: '`user-invocable` not set (Claude Code extension)',
              frame: frame(skill, { message: 'add `user-invocable: true` here' }),
            })
          )
          .otherwise(() => pass()),
    }),
  ],
})
