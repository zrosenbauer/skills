import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { command } from '@kidd-cli/core'
import { z } from 'zod'

import { findRepoRoot } from '../lib/skills/index.js'
import { SkillManifestSchema } from '../lib/skills/manifest.js'

const options = z.object({
  write: z.boolean().default(false).describe('Write to schemas/skill.json instead of stdout.'),
  check: z
    .boolean()
    .default(false)
    .describe('Regenerate and fail if schemas/skill.json drifts from the zod source.'),
})

const RELATIVE_OUT = path.join('schemas', 'skill.json')

export default command({
  options,
  description:
    'Generate the JSON Schema for skill.json from the zod source. Default writes to stdout; --write commits to schemas/skill.json; --check fails on drift.',
  handler: (ctx) => {
    const generated = JSON.stringify(z.toJSONSchema(SkillManifestSchema), null, 2) + '\n'

    if (ctx.args.check) {
      const repoRoot = findRepoRoot(process.cwd())
      const target = path.join(repoRoot, RELATIVE_OUT)
      if (!existsSync(target)) {
        ctx.log.error(
          `${RELATIVE_OUT} is missing — run \`pnpm skill-toolkit schema --write\` to generate it.`
        )
        process.exit(1)
      }
      const onDisk = readFileSync(target, 'utf8')
      if (onDisk !== generated) {
        ctx.log.error(
          `${RELATIVE_OUT} drifts from the zod source — run \`pnpm skill-toolkit schema --write\` to refresh.`
        )
        process.exit(1)
      }
      ctx.log.info(`${RELATIVE_OUT} is up to date.`)
      return
    }

    if (!ctx.args.write) {
      process.stdout.write(generated)
      return
    }

    const repoRoot = findRepoRoot(process.cwd())
    const target = path.join(repoRoot, RELATIVE_OUT)
    mkdirSync(path.dirname(target), { recursive: true })
    writeFileSync(target, generated)
    ctx.log.info(`Wrote ${RELATIVE_OUT}`)
  },
})
