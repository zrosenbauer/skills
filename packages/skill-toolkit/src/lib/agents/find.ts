import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { attempt } from 'massaman'
import { parse as parseYaml } from 'yaml'

import { listAgentProviders } from '../providers/index.js'
import { AGENT_FRONTMATTER_RE, AgentSchema, type AgentFrontmatter } from './schema.js'
import type { AgentLocation, AgentRecord } from './types.js'

/**
 * Discover every sub-agent file across every provider that supports
 * sub-agents. Walks each provider's `agents.searchPaths` (relative to
 * `repoRoot`), reads any `.md` files it finds, and parses frontmatter.
 * Failures don't throw — they surface as `frontmatterParseError` so
 * the lint can report them.
 */
export function findAgents(repoRoot: string): AgentRecord[] {
  const records: AgentRecord[] = []
  for (const provider of listAgentProviders()) {
    const searchPaths = provider.agents.searchPaths ?? []
    for (const relPath of searchPaths) {
      const absPath = path.join(repoRoot, relPath)
      if (!existsSync(absPath) || !statSync(absPath).isDirectory()) continue

      for (const entry of readdirSync(absPath)) {
        if (!entry.endsWith('.md')) continue
        const file = path.join(absPath, entry)
        if (!statSync(file).isFile()) continue

        records.push(
          readAgent({
            name: entry.replace(/\.md$/, ''),
            file,
            provider: provider.id,
            source: relPath,
          })
        )
      }
    }
  }
  return records.toSorted((a, b) => a.location.name.localeCompare(b.location.name))
}

/**
 * Read one agent `.md` file and produce a record. Frontmatter parse
 * errors are captured (not thrown) so the lint can surface them as
 * findings.
 */
function readAgent(location: AgentLocation): AgentRecord {
  const md = readFileSync(location.file, 'utf8')
  const fmMatch = AGENT_FRONTMATTER_RE.exec(md)
  const fmParse = fmMatch ? attempt(() => AgentSchema.parse(parseYaml(fmMatch[1] ?? ''))) : null
  const frontmatter: AgentFrontmatter = fmParse?.ok
    ? fmParse.value
    : { name: location.name, description: '' }
  const frontmatterParseError = fmParse && !fmParse.ok ? fmParse.error.message : null
  const body = md.replace(AGENT_FRONTMATTER_RE, '')

  return {
    location,
    frontmatter,
    frontmatterParseError,
    bodyLineCount: body.split('\n').length,
  }
}
