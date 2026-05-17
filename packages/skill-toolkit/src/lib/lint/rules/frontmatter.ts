import { match, P } from 'massaman'

import { checkFieldNonEmpty, checkFieldPresent, fail } from '../helpers.js'
import { defineRule, defineRuleset, pass } from '../rule.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

export const frontmatterRules = defineRuleset({
  name: 'frontmatter',
  rules: [
    defineRule({
      id: 'DIR_NAME',
      severity: 'error',
      description: 'Skill directory name must be kebab-case (^[a-z][a-z0-9-]+[a-z0-9]$)',
      check: ({ location }) =>
        match(NAMING_RE.test(location.name))
          .with(true, () => pass)
          .otherwise(() =>
            fail({
              message: `Directory name "${location.name}" is not kebab-case`,
              fix: 'Rename the directory to match ^[a-z][a-z0-9-]+[a-z0-9]$',
            })
          ),
    }),
    defineRule({
      id: 'FM_PARSE_FAILED',
      severity: 'error',
      description: 'frontmatter must parse against the schema',
      check: (skill) =>
        match(skill.frontmatterParseError)
          .with(P.nullish, () => pass)
          .otherwise((err) => fail({ message: `frontmatter failed schema validation: ${err}` })),
    }),
    defineRule({
      id: 'FM_MISSING_NAME',
      severity: 'error',
      description: 'Frontmatter must include `name`',
      check: checkFieldNonEmpty({ field: 'name' }),
    }),
    defineRule({
      id: 'FM_NAME_MISMATCH',
      severity: 'error',
      description: 'Frontmatter `name` must match directory basename',
      check: ({ frontmatter, location }) =>
        match(frontmatter.name === location.name)
          .with(true, () => pass)
          .otherwise(() =>
            fail({
              message: `name="${frontmatter.name}" does not match directory "${location.name}"`,
              fix: `Set frontmatter \`name: ${location.name}\``,
            })
          ),
    }),
    defineRule({
      id: 'FM_MISSING_DESCRIPTION',
      severity: 'error',
      description: 'Frontmatter must include `description`',
      check: checkFieldNonEmpty({ field: 'description' }),
    }),
    defineRule({
      id: 'FM_MISSING_ARGUMENT_HINT',
      severity: 'info',
      description: 'argument-hint is a Claude Code extension; recommended for cross-agent compat',
      check: checkFieldPresent({
        field: 'argument-hint',
        message: '`argument-hint` not set (Claude Code extension)',
        fix: "Add `argument-hint: '[<arg>]'` (use empty string if no args)",
      }),
    }),
    defineRule({
      id: 'FM_MISSING_USER_INVOCABLE',
      severity: 'info',
      description: 'user-invocable is a Claude Code extension; recommended',
      check: checkFieldPresent({
        field: 'user-invocable',
        message: '`user-invocable` not set (Claude Code extension)',
      }),
    }),
    defineRule({
      id: 'FM_MISSING_MODEL_INVOCABLE',
      severity: 'info',
      description: 'model-invocable is a Claude Code extension; recommended',
      check: checkFieldPresent({
        field: 'model-invocable',
        message: '`model-invocable` not set (Claude Code extension)',
      }),
    }),
  ],
})
