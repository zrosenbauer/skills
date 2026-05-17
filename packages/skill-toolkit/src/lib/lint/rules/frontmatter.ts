import { match, P } from 'massaman'

import { checkFieldNonEmpty, checkFieldPresent, fail } from '../helpers.js'
import { defineRule, defineRuleset, pass } from '../rule.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

export const frontmatterRules = defineRuleset({
  name: 'frontmatter',
  rules: [
    defineRule({
      id: 'dir-name',
      severity: 'error',
      description: 'Skill directory name must be kebab-case (^[a-z][a-z0-9-]+[a-z0-9]$)',
      check: ({ location }) =>
        match(location.name)
          .when(
            (n) => NAMING_RE.test(n),
            () => pass
          )
          .otherwise((name) =>
            fail({
              message: `Directory name "${name}" is not kebab-case`,
              fix: 'Rename the directory to match ^[a-z][a-z0-9-]+[a-z0-9]$',
            })
          ),
    }),
    defineRule({
      id: 'fm-parse-failed',
      severity: 'error',
      description: 'frontmatter must parse against the schema',
      check: ({ frontmatterParseError }) =>
        match(frontmatterParseError)
          .with(P.nullish, () => pass)
          .otherwise((err) => fail({ message: `frontmatter failed schema validation: ${err}` })),
    }),
    defineRule({
      id: 'fm-missing-name',
      severity: 'error',
      description: 'Frontmatter must include `name`',
      check: checkFieldNonEmpty({ field: 'name' }),
    }),
    defineRule({
      id: 'fm-name-mismatch',
      severity: 'error',
      description: 'Frontmatter `name` must match directory basename',
      check: ({ frontmatter, location }) =>
        match(frontmatter.name)
          .when(
            (name) => name === location.name,
            () => pass
          )
          .otherwise((name) =>
            fail({
              message: `name="${name}" does not match directory "${location.name}"`,
              fix: `Set frontmatter \`name: ${location.name}\``,
            })
          ),
    }),
    defineRule({
      id: 'fm-missing-description',
      severity: 'error',
      description: 'Frontmatter must include `description`',
      check: checkFieldNonEmpty({ field: 'description' }),
    }),
    defineRule({
      id: 'fm-missing-argument-hint',
      severity: 'info',
      description: 'argument-hint is a Claude Code extension; recommended for cross-agent compat',
      check: checkFieldPresent({
        field: 'argument-hint',
        message: '`argument-hint` not set (Claude Code extension)',
        fix: "Add `argument-hint: '[<arg>]'` (use empty string if no args)",
      }),
    }),
    defineRule({
      id: 'fm-missing-user-invocable',
      severity: 'info',
      description: 'user-invocable is a Claude Code extension; recommended',
      check: checkFieldPresent({
        field: 'user-invocable',
        message: '`user-invocable` not set (Claude Code extension)',
      }),
    }),
    defineRule({
      id: 'fm-missing-model-invocable',
      severity: 'info',
      description: 'model-invocable is a Claude Code extension; recommended',
      check: checkFieldPresent({
        field: 'model-invocable',
        message: '`model-invocable` not set (Claude Code extension)',
      }),
    }),
  ],
})
