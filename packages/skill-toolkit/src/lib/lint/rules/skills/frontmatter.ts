import { isEmpty, match, P } from 'massaman'

import { defineRule, defineRuleset, fail, pass } from '../../rule.js'

const NAMING_RE = /^[a-z][a-z0-9-]+[a-z0-9]$/

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
      id: 'fm-parse-failed',
      severity: 'error',
      description: 'frontmatter must parse against the schema',
      check: ({ frontmatterParseError }) =>
        match(frontmatterParseError)
          .with(P.nullish, () => pass())
          .otherwise((err) => fail({ message: `frontmatter failed schema validation: ${err}` })),
    }),
    defineRule({
      id: 'fm-missing-name',
      severity: 'error',
      description: 'Frontmatter must include `name`',
      check: ({ frontmatter }) =>
        match(frontmatter.name)
          .when(isEmpty, () => fail({ message: 'Frontmatter is missing `name`' }))
          .otherwise(() => pass()),
    }),
    defineRule({
      id: 'fm-name-mismatch',
      severity: 'error',
      description: 'Frontmatter `name` must match directory basename',
      check: ({ frontmatter, location }) =>
        match(frontmatter.name)
          .when(
            (name) => name === location.name,
            () => pass()
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
      check: ({ frontmatter }) =>
        match(frontmatter.description)
          .when(isEmpty, () => fail({ message: 'Frontmatter is missing `description`' }))
          .otherwise(() => pass()),
    }),
    defineRule({
      id: 'fm-missing-argument-hint',
      severity: 'info',
      description: 'argument-hint is a Claude Code extension; recommended for cross-agent compat',
      check: ({ frontmatter }) =>
        match(frontmatter['argument-hint'])
          .with(P.nullish, () =>
            fail({
              message: '`argument-hint` not set (Claude Code extension)',
              fix: "Add `argument-hint: '[<arg>]'` (use empty string if no args)",
            })
          )
          .otherwise(() => pass()),
    }),
    defineRule({
      id: 'fm-missing-user-invocable',
      severity: 'info',
      description: 'user-invocable is a Claude Code extension; recommended',
      check: ({ frontmatter }) =>
        match(frontmatter['user-invocable'])
          .with(P.nullish, () =>
            fail({ message: '`user-invocable` not set (Claude Code extension)' })
          )
          .otherwise(() => pass()),
    }),
    defineRule({
      id: 'fm-missing-model-invocable',
      severity: 'info',
      description: 'model-invocable is a Claude Code extension; recommended',
      check: ({ frontmatter }) =>
        match(frontmatter['model-invocable'])
          .with(P.nullish, () =>
            fail({ message: '`model-invocable` not set (Claude Code extension)' })
          )
          .otherwise(() => pass()),
    }),
  ],
})
