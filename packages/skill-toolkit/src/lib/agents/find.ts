import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'

import { parseFrontmatter } from '../frontmatter/index.js'
import { listAgentProviders } from '../providers/index.js'
import type { AgentFrontmatter } from './schema.js'
import type { AgentLocation, AgentRecord } from './types.js'

/**
 * Discover every sub-agent file across every provider that supports
 * sub-agents. Walks each provider's `agents.searchPaths` (relative to
 * `repoRoot`), reads any `.md` files it finds, and parses frontmatter
 * loosely — field-level validation is the lint rules' job.
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
 * Read one agent `.md` file and produce a record. Loose parse —
 * missing/wrong-typed fields stay missing so rules fire.
 */
function readAgent(location: AgentLocation): AgentRecord {
  const md = readFileSync(location.file, 'utf8')
  const { body, raw, frontmatter, error } = parseFrontmatter<AgentFrontmatter>(md)

  return {
    location,
    frontmatter: frontmatter ?? {},
    frontmatterYamlError: error,
    frontmatterRaw: raw,
    bodyLineCount: body.split('\n').length,
  }
}
