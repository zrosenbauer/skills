import { checkBodyMatches, fail } from '../helpers.js'
import { defineRule, defineRuleset, pass } from '../rule.js'

export const bodyRules = defineRuleset({
  name: 'body',
  rules: [
    defineRule({
      id: 'BODY_TOO_LONG',
      severity: 'warn',
      description: 'body should be at most 500 lines',
      check: (skill) =>
        skill.bodyLineCount > 500
          ? fail({
              message: `body is ${skill.bodyLineCount} lines (target ≤ 500)`,
              fix: 'Move depth into references/<topic>.md',
            })
          : pass,
    }),
    defineRule({
      id: 'BODY_FEW_SECTIONS',
      severity: 'warn',
      description: 'body should have at least 3 `## ` sections',
      check: (_skill, body) => {
        const count = (body.match(/^##\s/gm) ?? []).length
        return count >= 3
          ? pass
          : fail({ message: `body has ${count} \`## \` sections (target ≥ 3)` })
      },
    }),
    defineRule({
      id: 'BODY_TODO',
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
    }),
    defineRule({
      id: 'BODY_NO_EXAMPLE',
      severity: 'warn',
      description: 'body should contain at least one <example> block',
      check: checkBodyMatches({
        pattern: /<example>[\s\S]+?<\/example>/,
        message: 'body has no <example> block',
        fix: 'Add at least one worked example wrapped in <example>...</example>',
      }),
    }),
  ],
})
