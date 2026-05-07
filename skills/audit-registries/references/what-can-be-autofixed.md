# What can be auto-fixed

The audit marks each finding with `autoFixable: true | false`. Auto-fixable means the agent can apply the `fix` command without further input. Everything else needs a human decision because the cost of being wrong is high.

## Auto-fixable

| Finding | Fix |
|---|---|
| `deps-versions` stale (major drift) | `pnpm --filter @zrosenbauer/skill-tools update <name>@latest`, then run `pnpm typecheck && pnpm test` to catch breaking changes. If tests fail, revert and present the breakage to the user. |

That's the only category where the audit can act safely without confirmation.

## Not auto-fixable — present to user, then act on confirmation

### Stale provider docUrl (`provider-docs` → `stale`)

Why not auto-fixed: redirects can take you to wildly wrong pages (deprecated docs, marketing splash, login walls). The agent should:

1. WebFetch the URL's host root + `/docs` + `/llms.txt`
2. Identify the new canonical doc URL
3. Propose the replacement to the user with both URLs visible
4. On confirm, Edit the `docUrls` array in `providers.mjs`

### Gone provider docUrl (`provider-docs` → `gone`)

Even more conservative. All URLs broken means the provider may have:

1. Rebranded (URL host changed)
2. Been acquired (URL points to acquirer's site now)
3. Been abandoned (no replacement exists)

Each requires different action. Present the situation to the user and let them decide.

### Gone CLI binary (`cli-binaries` → `gone`)

NEVER auto-remove. The binary not being installed on THIS machine is the most common reason for `gone`, and that doesn't mean the entry is wrong. Only act when the user explicitly says: "this CLI was abandoned upstream — remove it".

### New skills.sh agent (`skills-sh-diff` → `new`)

Don't auto-add. The audit just tells you a new agent exists. Adding it to `cli-registry.mjs` requires:

1. Confirming the agent has a real CLI binary (not just an IDE extension)
2. Finding its non-interactive prompt invocation flag
3. Choosing a `promptTemplate` and `stdinTemplate`
4. Writing a `notes` line

Have the agent dispatch a research subagent (or WebFetch the agent's docs) to gather that, propose the entry, and ask the user to approve before writing.

### Stale skills.sh agent (`skills-sh-diff` → `stale`)

Same conservatism as `cli-binaries → gone`. The agent might still exist — vercel-labs dropping it doesn't mean it's dead. Confirm first.

## The decision protocol

When presenting findings, follow this order:

1. **Auto-fixable items** — list them, ask "apply all?". One Y/N for the whole batch.
2. **High-confidence non-auto-fixable items** (e.g., a single broken URL when the host root is healthy) — propose the fix individually, ask Y/N per item.
3. **Low-confidence items** (gone CLIs, abandoned providers, novel new entries) — present, summarize the options, let the user decide. Don't auto-suggest a path here.

Don't bundle (1), (2), and (3) into a single "fix all" action. The risk gradient matters.
