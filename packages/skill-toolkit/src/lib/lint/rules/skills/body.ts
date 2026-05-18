import { match } from 'massaman'

import { defineRule, defineRuleset, fail, pass } from '../../rule.js'

export default defineRuleset({
  name: 'body',
  scope: 'skill',
  rules: [
    defineRule({
      id: 'body-too-long',
      severity: 'warn',
      description: 'body should be at most 500 lines',
      check: ({ bodyLineCount }) =>
        match(bodyLineCount)
          .when(
            (n) => n <= 500,
            () => pass()
          )
          .otherwise((n) =>
            fail({
              message: `body is ${n} lines (target ≤ 500)`,
              fix: 'Move depth into references/<topic>.md',
            })
          ),
    }),
    defineRule({
      id: 'body-few-sections',
      severity: 'warn',
      description: 'body should have at least 3 `## ` sections',
      check: (_skill, body) =>
        match((body.match(/^##\s/gm) ?? []).length)
          .when(
            (n) => n >= 3,
            () => pass()
          )
          .otherwise((n) => fail({ message: `body has ${n} \`## \` sections (target ≥ 3)` })),
    }),
    defineRule({
      id: 'body-todo',
      severity: 'error',
      description: 'body must not contain TODO/FIXME/XXX placeholders',
      check: (skill, body) => {
        const filtered = body
          .replace(/`[^`]*?(?:TODO|FIXME|XXX)[^`]*?`/g, '')
          .replace(/```[\s\S]*?```/g, '')
        const matchResult = filtered.match(/\b(TODO|FIXME|XXX)\b/)
        if (matchResult === null) return pass()

        const placeholder = matchResult[0]
        const placeholderRe = new RegExp(`\\b${placeholder}\\b`)
        const bodyLines = body.split('\n')
        const lineIndex = bodyLines.findIndex((line) => placeholderRe.test(line))
        const offendingLine = bodyLines[lineIndex] ?? ''
        const column = offendingLine.search(placeholderRe) + 1

        // Body sits after the frontmatter fence; figure out the file-line
        // by counting frontmatter lines (raw + 2 fence markers) when
        // present, otherwise start at line 1.
        const frontmatterLines =
          skill.frontmatterRaw === null ? 0 : skill.frontmatterRaw.split('\n').length + 2
        const fileLine = frontmatterLines + lineIndex + 1

        return fail({
          message: `body contains "${placeholder}" placeholder`,
          fix: 'Resolve or remove the placeholder before shipping',
          frame: {
            filePath: `${skill.location.name}/SKILL.md`,
            lines: [offendingLine],
            startLine: fileLine,
            annotation: {
              line: fileLine,
              column,
              length: placeholder.length,
              message: `${placeholder} placeholder`,
            },
          },
        })
      },
    }),
    defineRule({
      id: 'body-no-example',
      severity: 'warn',
      description: 'body should contain at least one <example> block',
      check: (_skill, body) =>
        match(body)
          .when(
            (b) => /<example>[\s\S]+?<\/example>/.test(b),
            () => pass()
          )
          .otherwise(() =>
            fail({
              message: 'body has no <example> block',
              fix: 'Add at least one worked example wrapped in <example>...</example>',
            })
          ),
    }),
  ],
})
