import { match } from 'massaman'

import { defineRule, defineRuleset, fail, pass } from '../rule.js'

export const fileRules = defineRuleset({
  name: 'files',
  rules: [
    defineRule({
      id: 'no-readme',
      severity: 'info',
      description: 'skill should ship a human-facing README.md',
      check: (skill) =>
        match(skill)
          .with({ hasReadme: true }, () => pass())
          .otherwise(() => fail({ message: 'no README.md' })),
    }),
    defineRule({
      id: 'no-license',
      severity: 'info',
      description: 'skill should ship a LICENSE',
      check: (skill) =>
        match(skill)
          .with({ hasLicense: true }, () => pass())
          .otherwise(() => fail({ message: 'no LICENSE' })),
    }),
  ],
})
