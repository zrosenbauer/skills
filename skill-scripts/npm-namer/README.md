# `skill-scripts/npm-namer`

Workspace package + shipping artifacts for the `npm-namer` skill. Source lives in `src/`, builds to `dist/check.mjs` via tsdown. The `package.json` `files` allowlist controls what `skill-toolkit sync-scripts` vendors into `skills/npm-namer/scripts/npm-namer/`.

## Layout

```
skill-scripts/npm-namer/
├── package.json                  # workspace member, deps + files allowlist
├── tsdown.config.ts              # tsdown bundle config
├── src/                          # source (NOT vendored)
│   ├── check.mjs                 # CLI entry
│   ├── moniker.mjs               # moniker normalize + variant enumeration
│   ├── near-match.mjs            # Damerau-Levenshtein typosquat similarity
│   ├── validate.mjs              # thin wrapper around validate-npm-package-name
│   ├── permute.mjs               # seed → candidate permutation engine
│   ├── registry.mjs              # parallel HEAD requests to registry.npmjs.org
│   └── *.test.mjs                # node --test (NOT vendored)
├── dist/                         # VENDORED — committed build output
│   └── check.mjs                 # bundled CLI, self-contained
├── popular-names.json            # VENDORED — top ~15K popular names corpus
├── refresh-popular-names.mjs     # VENDORED — corpus refresh helper
└── README.md                     # NOT vendored
```

## Build + test

```bash
pnpm --filter @zrosenbauer/skill-scripts-npm-namer build       # tsdown → dist/check.mjs
pnpm --filter @zrosenbauer/skill-scripts-npm-namer test        # node --test src/*.test.mjs
pnpm skill-toolkit sync-scripts                                   # vendor to skills/npm-namer/scripts/npm-namer/
```

The build runs `tsdown` which produces a self-contained ESM bundle. Production deps (`validate-npm-package-name`, `damerau-levenshtein`) are bundled in. `popular-names.json` is loaded at runtime from a sibling path.

## Corpus refresh

`popular-names.json` is a snapshot of the top-N most-downloaded unscoped npm packages, sourced from [`nice-registry/download-counts`](https://github.com/nice-registry/download-counts). Refresh monthly:

```bash
node skill-scripts/npm-namer/refresh-popular-names.mjs              # defaults to --top 15000
pnpm skill-toolkit sync-scripts
git add skill-scripts/npm-namer/popular-names.json skills/npm-namer/scripts/npm-namer/popular-names.json
git commit -m "chore(npm-namer): refresh popular-names corpus"
```

The refresh step installs `download-counts` in a temp directory, parses the `counts.json` (~3.7 M name → monthly-downloads pairs), sorts descending, drops scoped names, slices to top-N (default 15,000), writes the snapshot with provenance fields, then cleans up the temp dir. Expect 30–90s due to the 95 MB tarball.

## Why bundle?

Skills should be self-contained when shipped via `npx skills add`. The consumer doesn't run `npm install` — they just run `node check.mjs`. Bundling inlines `validate-npm-package-name` and `damerau-levenshtein` so the CLI works standalone.
