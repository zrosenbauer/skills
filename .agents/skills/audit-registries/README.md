# audit-registries

> Verify the registries in this monorepo are still up-to-date with their upstream sources. **Local-only — not published.**

Lives in `.agents/skills/` (not `skills/`) because it's a maintenance tool specific to this repo. Symlinked into `.claude/skills/audit-registries` so Claude Code loads it.

## Use

```
/audit-registries                     # full audit, all 4 categories
/audit-registries --only deps-versions
/audit-registries --offline           # skip network-dependent categories
```

The skill walks through:

1. Run `node scripts/audit.mjs --pretty` (the runner)
2. Parse the structured JSON output
3. Show per-category breakdown grouped by status (`fresh` / `stale` / `gone` / `new` / `errored`)
4. Ask the user (`AskUserQuestion` in Claude Code): auto-fix all auto-fixable items, review per category, or save report only
5. Apply fixes, re-run the relevant category, confirm

## Categories

| Category | What it checks |
|---|---|
| `provider-docs` | HEAD each `docUrl` in `skills/skill-portability/scripts/providers.mjs` |
| `cli-binaries` | Locate each `binary` in `skills/code-reviewer/scripts/cli-registry.mjs` on `$PATH` |
| `deps-versions` | `npm view` each dep in `packages/skill-tools/package.json`; flag major drift |
| `skills-sh-diff` | Diff our `cli-registry.mjs` IDs against `vercel-labs/skills/src/agents.ts` |

## License

[MIT](./LICENSE) © Zac Rosenbauer
