# Extending the audit

Adding a new audit category to `scripts/audit.mjs`.

## When to add a category

Add one when:

- A new registry / config file enters the repo whose contents drift over time (not its schema, but the data inside)
- The drift is checkable programmatically (HEAD a URL, query an API, diff against a remote source)
- The cost of stale data is silent — the registry keeps "working" but its data is wrong

Don't add a category when:

- A one-time check is enough (just write a script and run it once)
- The check requires LLM judgment (handle that in the SKILL.md workflow with a subagent dispatch, not in the deterministic audit runner)

## Anatomy of a category

Each audit category lives in `audit.mjs` as an `auditFoo()` async function returning:

```js
{
  name: 'category-id',          // kebab-case, matches --only filter
  entries: [
    {
      id: 'thing-being-checked',
      status: 'fresh' | 'stale' | 'gone' | 'new' | 'errored',
      details: ['human-readable explanation'],
      autoFixable: true | false,
      fix: 'optional command or hint',  // only if there's a concrete remedy
    },
    // ...
  ],
}
```

If the category is skipped (e.g., `--offline`), include `skipped: '<reason>'` instead of/alongside entries.

## Step-by-step

1. **Define the source.** Where does the registry live? What's its schema?
2. **Define what "fresh" means.** Concretely: what's the upstream check that confirms the entry is valid?
3. **Map outcomes to status:**
   - All checks pass → `fresh`
   - Some pass, some fail (entry partially valid) → `stale`
   - All fail (entry no longer valid) → `gone`
   - Upstream has it, we don't → `new`
   - Couldn't determine → `errored`
4. **Implement `auditFoo()` in `audit.mjs`.** Use `fetchWithTimeout` for network calls. Catch all errors — the runner must never throw.
5. **Wire it into the dispatch:**
   ```js
   if (!ONLY || ONLY === 'category-id') categories.push(await auditFoo())
   ```
6. **Add `--offline` handling** if the category needs network. Return `{ name, entries: [], skipped: 'offline mode' }` when `flags.offline`.
7. **Mark `autoFixable`** only when the fix is unambiguous and safe to run without user input. Default to `false` — see [`what-can-be-autofixed.md`](what-can-be-autofixed.md).
8. **Add tests.** At minimum: status enum is one of the five values, summary counts match per-category totals, `--only <new-category>` filters correctly.

## Things that look like categories but aren't

| Tempting | Why not |
|---|---|
| Lint the SKILL.md content of every skill | That's `pnpm skill-tools lint`. Don't duplicate. |
| Run the eval suite for every skill | That's `/skill-eval --all`. Don't duplicate. |
| Diff our SKILL.md against a "reference" | Vague — what's the reference? If you can name one, it's a portability check (use `skill-portability`). |
| Validate that every skill's evals.json runs | That's `/skill-eval`. The audit only checks that the registries (the things that POINT to skills/CLIs/agents/deps) are current. |

The audit's lane is metadata and registries — not skill quality, not test outcomes, not code review.

## Naming the category

Keep ids kebab-case, descriptive of the source being checked, not the kind of check:

- `provider-docs` (source: providers.mjs's docUrls) ✓
- `cli-binaries` (source: cli-registry.mjs's binaries) ✓
- `deps-versions` (source: skill-tools/package.json's deps) ✓
- ❌ `url-check` — not specific enough
- ❌ `npm-audit` — collides with `npm audit` (different concern: vulns, not drift)

Ids ending in `-diff` are reserved for categories that compute a symmetric difference against an upstream list (e.g., `skills-sh-diff`).
