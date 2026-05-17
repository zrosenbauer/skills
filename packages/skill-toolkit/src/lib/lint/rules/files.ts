import { fail } from '../helpers.js'
import { defineRule, defineRuleset, pass } from '../rule.js'

export const fileRules = defineRuleset({
  name: 'files',
  rules: [
    defineRule({
      id: 'NO_README',
      severity: 'info',
      description: 'skill should ship a human-facing README.md',
      check: (skill) => (skill.hasReadme ? pass : fail({ message: 'no README.md' })),
    }),
    defineRule({
      id: 'NO_LICENSE',
      severity: 'info',
      description: 'skill should ship a LICENSE',
      check: (skill) => (skill.hasLicense ? pass : fail({ message: 'no LICENSE' })),
    }),
  ],
})
