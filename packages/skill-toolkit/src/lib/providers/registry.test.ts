import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { describe, expect, it } from 'vitest'

import { PROVIDERS } from './registry.js'

describe('provider metadata', () => {
  it('matches native skill formats and required fields in the shipping registry', async () => {
    const registryUrl = pathToFileURL(
      path.resolve(
        import.meta.dirname,
        '../../../../../skills/skill-portability/scripts/providers.mjs'
      )
    )
    const { providers } = await import(registryUrl.href)
    for (const provider of PROVIDERS) {
      const shipping = providers.find((candidate: { id: string }) => candidate.id === provider.id)
      expect(shipping).toBeDefined()
      expect(provider.skills.requiredFrontmatter).toEqual(shipping.requiredFrontmatter)
      expect(provider.skills.fileFormat).toContain(shipping.fileFormat)
    }
  })
})
