# npm Name & Moniker Rules

Authoritative reference for npm package-name validation, the moniker (similar-name) collision check, and the near-match typosquat layer this skill adds on top. Every rule here is grounded in published npm source, peer-reviewed research, or production tooling docs — see [References](#references).

## Summary

This skill runs three checks (after syntactic validation). The first two are npm's own publish-time rules; the third is a typosquat warning the skill layers on top.

1. **Syntactic rules** — implemented in [`validate-npm-package-name`](https://github.com/npm/validate-npm-package-name) and re-enforced by `@npmcli/package-json`'s `fixName` step. Run client-side by the CLI and re-checked server-side. These cover length, allowed characters, leading char, casing, and a hard exclusion list. This skill uses the **upstream package directly** as a runtime dependency (bundled into the shipped `check.mjs`), not a hand-port — so the rules stay in sync with npm itself.
2. **Moniker collision rule** — enforced **server-side only** by the npm registry on `npm publish` of a **new, unscoped** package. The registry strips `.`, `-`, and `_` and lowercases, then rejects the publish if the normalized name collides with an existing package. Introduced 26 December 2017 in response to the `crossenv` typosquatting incident. The npm CLI does **not** ship this check — there is no public `npm` API to test it client-side other than (a) attempting `npm publish --dry-run` against the live registry, or (b) reproducing the algorithm yourself and comparing against the registry's package list.
3. **Near-match (typosquat) warning** — Damerau-Levenshtein distance against the top-N most-downloaded packages. Catches names that npm would allow (different normalized form) but that are one or two edits away from a popular package — the classic typosquat shape (`extoolkit` ~ `es-toolkit`, `loadahs` ~ `lodash`, `typescirpt` ~ `typescript`). Grounded in the TypoGard/SpellBound paper's empirical threshold (see [§ Near-match](#near-match-typosquat-rule) below).

The moniker rule applies to **new unscoped publishes only**. Scoped names (`@scope/name`) and updates to packages you already own are not subject to it. The near-match layer applies regardless — even a scoped publish that's confusable with a popular unscoped name is worth warning about.

## Syntactic rules

Source: [`npm/validate-npm-package-name/lib/index.js`](https://github.com/npm/validate-npm-package-name/blob/main/lib/index.js).

The validator returns two booleans plus arrays of `errors` and `warnings`:

| Field                 | Meaning                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------- |
| `validForNewPackages` | `errors.length === 0 && warnings.length === 0` — required for `npm publish` of a brand-new package. |
| `validForOldPackages` | `errors.length === 0` — minimum bar for existing packages already in the registry.                  |

### Errors (hard rejections)

| Condition                                                         | Exact error string                               |
| ----------------------------------------------------------------- | ------------------------------------------------ |
| `name === null`                                                   | `name cannot be null`                            |
| `name === undefined`                                              | `name cannot be undefined`                       |
| `typeof name !== 'string'`                                        | `name must be a string`                          |
| `name.length === 0`                                               | `name length must be greater than zero`          |
| `name.startsWith('.')`                                            | `name cannot start with a period`                |
| `name.startsWith('-')`                                            | `name cannot start with a hyphen`                |
| `/^_/.test(name)`                                                 | `name cannot start with an underscore`           |
| `name.trim() !== name`                                            | `name cannot contain leading or trailing spaces` |
| `name.toLowerCase()` matches `node_modules` or `favicon.ico`      | `<excludedName> is not a valid package name`     |
| `encodeURIComponent(name) !== name` (and not a valid scoped form) | `name can only contain URL-friendly characters`  |

The scoped-name escape hatch: if the unencoded check fails, the validator tries `^(?:@([^/]+?)[/])?([^/]+?)$`. If both `scope` and `pkg` segments pass `encodeURIComponent`, the name is accepted as a valid scoped package.

### Warnings (block new publishes, allow legacy)

These trigger `validForNewPackages: false` but keep `validForOldPackages: true`:

| Condition                                       | Exact warning string                                       |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `name.length > 214`                             | `name can no longer contain more than 214 characters`      |
| `name.toLowerCase() !== name`                   | `name can no longer contain capital letters`               |
| `/[~'!()*]/.test(name.split('/').slice(-1)[0])` | `name can no longer contain special characters ("~'!()*")` |
| `builtins.includes(name.toLowerCase())`         | `<name> is a core module name`                             |

**Core-module list** (Node.js built-ins blocked as warnings): `_http_*`, `_stream_*`, `_tls_*`, `assert`, `assert/strict`, `async_hooks`, `buffer`, `child_process`, `cluster`, `console`, `constants`, `crypto`, `dgram`, `diagnostics_channel`, `dns`, `dns/promises`, `domain`, `events`, `fs`, `fs/promises`, `http`, `http2`, `https`, `inspector`, `inspector/promises`, `module`, `net`, `os`, `path`, `path/posix`, `path/win32`, `perf_hooks`, `process`, `punycode`, `querystring`, `readline`, `readline/promises`, `repl`, `stream`, `stream/consumers`, `stream/promises`, `stream/web`, `string_decoder`, `sys`, `timers`, `timers/promises`, `tls`, `trace_events`, `tty`, `url`, `util`, `util/types`, `v8`, `vm`, `wasi`, `worker_threads`, `zlib`, `node:sea`, `node:sqlite`, `node:test`, `node:test/reporters`. Full list in [`builtin-modules.json`](https://github.com/npm/validate-npm-package-name/blob/main/lib/builtin-modules.json).

### Hard limits at a glance

```
max length:        214 chars (whole name including @scope/)
leading char:      not . - _
casing:            lowercase only for new packages
chars:             URL-safe (encodeURIComponent identity), except ~ ' ! ( ) * are blocked
exclusion list:    node_modules, favicon.ico
trim:              no leading/trailing whitespace
scope form:        @scope/name where both segments are URL-safe
```

### `@npmcli/package-json` `fixName` step

Source: [`npm/package-json/lib/normalize.js`](https://github.com/npm/package-json/blob/main/lib/normalize.js). This is the step `libnpmpublish` invokes before `PUT`-ing to the registry.

```js
// from lib/normalize.js
if (
  data.name.startsWith('.') ||
  !(isValidScopedPackageName(data.name) || isCorrectlyEncodedName(data.name)) ||
  (strict && !allowLegacyCase && data.name !== data.name.toLowerCase()) ||
  data.name.toLowerCase() === 'node_modules' ||
  data.name.toLowerCase() === 'favicon.ico'
) {
  throw new Error('Invalid name: ' + JSON.stringify(data.name))
}

if (steps.includes('fixName')) {
  // Check for conflicts with builtin modules
  if (moduleBuiltin.builtinModules.includes(data.name)) {
    log.warn(
      'package-json',
      pkgId,
      `Package name "${data.name}" conflicts with a Node.js built-in module name`
    )
  }
}
```

Note: `fixName` does **not** run the moniker collision check. It only enforces the syntactic rules plus the builtin warning. The moniker check lives in the registry.

## Moniker collision rule

### Statement of the rule

Source: [npm blog "New Package Moniker rules"](https://blog.npmjs.org/post/168978377570/new-package-moniker-rules), 26 December 2017, @ceejbot. Verbatim:

> If you are publishing a new package — that is, a package that has not been in the registry before — we remove punctuation from its name and compare it to existing package names. If the names are identical without punctuation, we do not allow the package to be created.

### Normalization algorithm

Punctuation = `.`, `-`, `_` (period, hyphen, underscore). Case is also folded. **No transliteration, no Unicode normalization, no homoglyph folding** — only the three ASCII punctuation chars and case.

```
function normalize(name):
  name = lowercase(name)
  name = remove_all(name, in_set('.', '-', '_'))
  return name
```

JS one-liner:

```js
const moniker = (name) => name.toLowerCase().replace(/[.\-_]/g, '')
```

Two names collide iff `moniker(a) === moniker(b)`.

This matches the canonical examples from the blog post:

| Existing       | Blocked variations                                            |
| -------------- | ------------------------------------------------------------- |
| `react-native` | `reactnative`, `react_native`, `react.native`                 |
| `jsonstream`   | `json-stream`, `json.stream`, `json_stream`, `js-on-stream`\* |

\* The `js-on-stream` example looks like it shouldn't collide at first glance, but it does: stripping `.-_` from `js-on-stream` produces `jsonstream`, matching the existing package exactly.

### Where this lives

The blog post is the only published, citable spec. The implementation is in the closed-source registry frontdoor (`registry-frontdoor`, not on GitHub). There is no public RFC for the rule itself; npm/rfcs covers other topics.

The community library [`package-name-conflict`](https://github.com/bconnorwhite/package-name-conflict) reproduces the algorithm verbatim and is the most cited reference implementation:

```ts
// from source/index.ts
const punctuationRegex = /[.\-_]/g
export function transform(name: string) {
  return name.replace(punctuationRegex, '').toLowerCase()
}
export function conflicts(nameA: string, nameB: string) {
  return transform(nameA) === transform(nameB)
}
```

### How to pre-flight client-side

There is no registry endpoint that says "would this name be moniker-blocked?" The reliable client-side approach is:

1. Validate the candidate syntactically (`validate-npm-package-name`).
2. Compute `moniker(candidate)`.
3. Compare against the normalized form of every existing name in the registry. Practical options:
   - Query `https://registry.npmjs.org/<candidate>` — a `404` means the literal name is free, but does **not** rule out a moniker collision.
   - Fetch [`all-package-names`](https://github.com/nice-registry/all-the-package-names) (≈90 MB) or stream the registry's `_all_docs` change feed and normalize.
   - Try `npm publish --dry-run` against the live registry — this hits the moniker check server-side and returns the canonical error.

**This skill's approach is probabilistic.** It enumerates the candidate's punctuation/case variants (single insertion + double insertion of `[._-]` plus full-split forms) and queries each against the registry — this catches the canonical `js-on-stream ↔ jsonstream` blog-post case and the vast majority of realistic moniker collisions. It will miss pathological 3+ separator insertions like `a.b-c_def` whose count grows combinatorially.

**For authoritative pre-publish confirmation, run `npm publish --dry-run`** against the live registry. That triggers the server-side check the registry actually enforces. The skill's check is a fast filter, not a substitute.

## Near-match (typosquat) rule

This is **not an npm rule** — npm will publish `extoolkit` next to `es-toolkit` without complaint. The near-match layer is a defensive warning the skill adds because in practice these shapes are how supply-chain typosquats work.

### Algorithm

For each candidate that's syntactically valid AND not moniker-blocked AND not literally taken, compute the [Damerau-Levenshtein distance](https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance) (insertions, deletions, substitutions, and adjacent transpositions count as one edit each) against the _normalized_ form of every name in a popular-packages corpus. Names at distance 1 or 2 are surfaced as warnings.

Implementation: the [`damerau-levenshtein`](https://www.npmjs.com/package/damerau-levenshtein) package provides the actual distance computation (true unrestricted DL, including adjacent transpositions). We bundle it into the shipped `check.mjs` rather than re-implementing — the package is well-tested across many years of production use.

Distance is computed on normalized forms (`lowercase + strip [.-_]`) so `es-toolkit` and `estoolkit` collapse before comparison — preventing double-counting against the moniker rule.

### Why 15,000 weekly downloads is the right corpus cutoff

The skill ships a precomputed corpus (`scripts/npm-namer/popular-names.json`) of the top ~15,000 unscoped npm packages by monthly downloads, regenerated from [`nice-registry/download-counts`](https://github.com/nice-registry/download-counts) (Pareto across all ~3.7M npm packages).

The 15K floor isn't arbitrary — it's the published threshold from the only peer-reviewed npm typosquat-detection study:

> Taylor, Vaidya, Davidson, De Carli, Rastogi. **"Defending Against Package Typosquatting."** _NSS 2020._ DOI: [10.1007/978-3-030-65745-1_7](https://doi.org/10.1007/978-3-030-65745-1_7).
>
> _"At the proposed popularity threshold of 15,000 weekly downloads, the estimated portion of package downloads which will result in a warning from TypoGard is approximately 0.05% for npm … We consider an acceptable burden for the developer."_

At this threshold, TypoGard flags **99.4% of known typosquat cases** in npm while keeping false positives below 0.5% of installs. The threshold also coincides with the empirical "steep drop in perpetrators" — typosquatters target popular names, and 15K weekly is the boundary at which the typosquat-attempt density falls off.

This aligns with npm's own "high-impact" definition (`docs.npmjs.com/threats-and-mitigations`: ≥1M weekly OR ≥500 dependents — yields ~15,113 packages via the community [`npm-high-impact`](https://github.com/wooorm/npm-high-impact) package, which is the threshold npm uses for mandatory 2FA enrollment).

Cutoffs tighter than this leak fast risers — `es-toolkit` had 24.3M weekly downloads on 2026-05-15, more than `dayjs` or `vitest`, yet a 5-month-old `npm-high-impact` v1.12.0 didn't list it. Static snapshots **must** refresh monthly.

Cutoffs looser than this (top-100K) widen the corpus past anything most developers recognize, raising false-positive warnings against obscure packages and producing alarm fatigue.

### Distance threshold: 2

Single-edit typosquats (`extoolkit` ~ `es-toolkit`, transpositions like `typescirpt`) are the dominant class. Distance-2 captures a few more (substitution + insertion) without too much noise. Beyond distance 2, the false-positive rate climbs sharply — most distance-3 "matches" are coincidence rather than confusion.

### Socket's 1,000× download-ratio rule (not used here)

Socket.dev's production typosquat detector ([socket.dev/alerts/didYouMean](https://socket.dev/alerts/didYouMean)) defines a typosquat as a name within 1–2 edits of a more popular package **where the legitimate package has 1,000× more monthly downloads than the typo**. This works for _detecting active typosquat publishes_ but doesn't apply to the pre-publish naming case — a candidate that hasn't been published yet has zero downloads, so the ratio is trivially satisfied for every popular neighbor. We get the same effect implicitly by restricting the corpus to high-download packages.

### Limitations

- The corpus is a snapshot. Refresh by running `node skill-scripts/npm-namer/refresh-popular-names.mjs --top 15000` then `pnpm skill-toolkit sync`. Cadence: monthly.
- The default Damerau-Levenshtein algorithm doesn't account for homoglyphs (`rn` vs `m`, `l` vs `1`, Unicode look-alikes) or keyboard-adjacency. Socket's newer **TypoSmart** ([arxiv 2502.20528](https://arxiv.org/abs/2502.20528)) uses learned embeddings — that's a future direction, not implemented here.
- Scoped names are still checked against the unscoped corpus. `@me/lodahs` would warn about `lodash`. This is intentional: scoped or not, a confusable name is a UX risk.

## Scoped packages

Scoped names (`@scope/name`) **bypass the moniker collision check entirely**. The blog post is explicit:

> If you are prevented from publishing a package with a name too similar to an existing package, the easiest way to find a unique name is to use your scope.

Confirmed by behavior: scoped packages live in a namespace owned by a user or org, so collisions between scopes are impossible by construction. `@a/foo` and `@b/foo` coexist; `@a/foo` and `@a/f-o-o` are subject to syntactic rules only.

Syntactic rules still apply to both the scope segment and the name segment — both must satisfy `encodeURIComponent(x) === x`. Additionally, npm's `validate-npm-package-name` rejects scoped names whose package segment begins with `.` (e.g., `@scope/.foo`) — the npm docs claim scoped names "can begin with a dot or underscore" but the validator code is authoritative and rejects.

**The skill's `check.mjs` skips the moniker layer entirely for scoped candidates.** The near-match (typosquat) layer still runs against the _bare_ (post-scope) name, so `@me/lodahs` will still warn about its similarity to `lodash`.

## Edge cases & gotchas

| Gotcha                                                | Detail                                                                                                                                                                                                                                                                                                                                         | Source                                                                                                      |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Unpublished name + version is permanently burned      | `Once package@version has been used, you can never use it again. You must publish a new version even if you unpublished the old one.` Even the original author cannot republish that exact `name@version`.                                                                                                                                     | [npm unpublish policy](https://docs.npmjs.com/policies/unpublish)                                           |
| 24-hour publish block after full unpublish            | `If you entirely unpublish all versions of a package, you may not publish any new versions of that package until 24 hours have passed.`                                                                                                                                                                                                        | [npm unpublish policy](https://docs.npmjs.com/policies/unpublish)                                           |
| 72-hour unpublish window                              | New packages can be fully unpublished within 72 hours, no questions asked, **only** if no other package depends on them. After that, unpublishing requires zero dependents AND <300 weekly downloads AND a single owner.                                                                                                                       | [npm unpublish policy](https://docs.npmjs.com/policies/unpublish)                                           |
| "Security holding" packages                           | When npm takes down a malicious package, they republish it as a placeholder owned by the `npm` user, version `0.0.<n>-security`, description `security holding package`. The name is then permanently blocked from re-registration by anyone else. Example: `npm view crossenv` returns `crossenv@0.0.2-security`, repo `npm/security-holder`. | [`github.com/npm/security-holder`](https://github.com/npm/security-holder)                                  |
| If you already own the similar name                   | The moniker rule only fires on **new** package creation. Once you own `react-native`, you cannot use a collision-style variant from another account, but you can publish more versions of `react-native` itself freely. The rule does not retroactively block updates.                                                                         | Blog post wording: "publishing a new package — that is, a package that has not been in the registry before" |
| Legacy mixed-case names still resolve                 | `JSONStream` and `jsonstream` are distinct packages in the registry, both still installable. The lowercase rule blocks **new** mixed-case publishes only. Case-insensitive filesystems (macOS default) can still install both and produce confusion.                                                                                           | Blog post: "the packages JSONStream and jsonstream are different but difficult to distinguish"              |
| `~ ' ! ( ) *` are warnings, not errors                | The validator's `validForOldPackages: true` means old packages with these characters still resolve, but the registry rejects new ones via `validForNewPackages: false`.                                                                                                                                                                        | `validate-npm-package-name/lib/index.js`                                                                    |
| URL-friendly check uses `encodeURIComponent` identity | `encodeURIComponent(name) === name` — this is the actual gate, not a regex. Means `%20`, `?`, `#`, `&`, `+`, `=`, etc. are all rejected because they encode.                                                                                                                                                                                   | Same source                                                                                                 |
| Whitespace is trimmed silently in non-strict mode     | `@npmcli/package-json` will trim and warn (`Whitespace was trimmed from "name"`) instead of erroring outside of `strict` mode. `validate-npm-package-name` errors directly. Two layers, two behaviors.                                                                                                                                         | `lib/normalize.js`                                                                                          |
| Core-module name is a warning, not an error           | `name === 'http'` passes `validForOldPackages` but fails `validForNewPackages`. The registry will accept it for packages predating the rule.                                                                                                                                                                                                   | `validate-npm-package-name/lib/index.js`                                                                    |
| The 214-char limit includes the `@scope/` prefix      | The validator counts the entire string, scope included.                                                                                                                                                                                                                                                                                        | `validate-npm-package-name/lib/index.js`                                                                    |

## References

- [`npm/validate-npm-package-name`](https://github.com/npm/validate-npm-package-name) — canonical syntactic validator. Read `lib/index.js` and `lib/builtin-modules.json` for the full rule set, error/warning strings, and the core-modules list.
- [`npm/package-json` `lib/normalize.js`](https://github.com/npm/package-json/blob/main/lib/normalize.js) — the `fixName` step invoked by `libnpmpublish` before publishing. Re-enforces the syntactic rules and emits the builtin-conflict warning. Does not run the moniker check.
- [`npm/cli` `workspaces/libnpmpublish/lib/publish.js`](https://github.com/npm/cli/blob/latest/workspaces/libnpmpublish/lib/publish.js) — shows that `patchManifest` runs `steps = ['fixName']` and then `PUT`s to the registry. The actual moniker block is server-side.
- [npm blog: "New Package Moniker rules" (26 Dec 2017, @ceejbot)](https://blog.npmjs.org/post/168978377570/new-package-moniker-rules) — only published spec of the moniker rule. Source for the punctuation list and the "use a scope" recommendation.
- [npm blog: "`crossenv` malware on the npm Registry"](http://blog.npmjs.org/post/163723642530/crossenv-malware-on-the-npm-registry) — the typosquatting incident that motivated the moniker rule.
- [`docs.npmjs.com/package-name-guidelines`](https://docs.npmjs.com/package-name-guidelines) — official guidance: unique, descriptive, lowercase, "not spelled in a similar way to another package name".
- [`docs.npmjs.com/policies/unpublish`](https://docs.npmjs.com/policies/unpublish) — 72-hour rule, 24-hour publish block, permanent `name@version` burn, dependency/download thresholds.
- [`bconnorwhite/package-name-conflict`](https://github.com/bconnorwhite/package-name-conflict) — community reference implementation of `transform()` and `conflicts()`. The cleanest reproduction of the moniker algorithm.
- [`github.com/npm/security-holder`](https://github.com/npm/security-holder) — placeholder repo behind the `security holding package` description used by npm to gravesite typosquatted/malicious names.

### Near-match / typosquat layer

- [Taylor et al. 2020, **"Defending Against Package Typosquatting"** (NSS)](https://doi.org/10.1007/978-3-030-65745-1_7) — the published threshold (15K weekly downloads, 99.4% recall, 0.05% FP).
- [TypoGard repo](https://github.com/mt3443/typogard) and [Taylor's KU thesis](https://kuscholarworks.ku.edu/server/api/core/bitstreams/7bddaa7e-59b4-40af-a73b-5d7c93d28803/content) — full algorithm, rationale, and empirical evaluation.
- [npm Threats and Mitigations](https://docs.npmjs.com/threats-and-mitigations/) — npm's official "high-impact" definition (≥1M weekly OR ≥500 dependents), the policy threshold for mandatory 2FA enrollment.
- [`wooorm/npm-high-impact`](https://github.com/wooorm/npm-high-impact) — community implementation of npm's definition; 15,113 packages. **Caveat:** v1.12.0 is 5 months stale and misses fast risers like `es-toolkit`.
- [Socket.dev typosquat alert spec](https://socket.dev/alerts/didYouMean) — the 1,000× download-ratio rule, used in production for runtime install-time detection.
- [TypoSmart (Socket research, 2025)](https://arxiv.org/html/2502.20528v1) — embedding-based typosquat successor; future direction.

## Alternative tooling considered

What's already out there and what each tool lacks vs. an npm-namer skill that brainstorms + checks + collision-tests in one pass.

| Tool                                   | Link                                                    | Does                                                                                                | Lacks                                                                                 |
| -------------------------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `validate-npm-package-name`            | <https://github.com/npm/validate-npm-package-name>      | Syntactic validation only (returns errors/warnings). Used by every other tool here.                 | No availability check, no moniker check, no generation.                               |
| `npm-name` (sindresorhus)              | <https://github.com/sindresorhus/npm-name>              | Programmatic availability check. Throws on invalid syntax. Supports orgs.                           | No moniker collision check, no brainstorming/permutation, no batch generation.        |
| `npm-name-cli` (sindresorhus)          | <https://github.com/sindresorhus/npm-name-cli>          | CLI wrapper around `npm-name`. Multi-name availability table.                                       | Same gaps as `npm-name`.                                                              |
| `package-name-conflict` (bconnorwhite) | <https://github.com/bconnorwhite/package-name-conflict> | Pure moniker check between two names (`transform`/`conflicts`/`conflictsAny`). No registry calls.   | No availability lookup, no generation, no syntactic validation.                       |
| `is-name-taken` (bconnorwhite)         | <https://github.com/bconnorwhite/is-name-taken>         | Availability + moniker collision check against the full registry name list.                         | Slow first run (downloads `all-package-names`), no brainstorming, no scoring/ranking. |
| `all-package-names` (bconnorwhite)     | <https://github.com/bconnorwhite/all-package-names>     | Streams every npm package name. ~90 MB. The backing store for offline moniker checks.               | Raw data, not a tool.                                                                 |
| `pkg-avail`                            | <https://github.com/Surajchandraa/pkg-avail>            | CLI: `check <name>` against the registry. Tiny, no deps.                                            | Availability only — no syntactic or moniker check, no generation.                     |
| `check-npm-name` (alexile)             | <https://github.com/alexile/check-npm-name>             | Zero-dep registry probe. Programmatic only.                                                         | Availability only.                                                                    |
| `caninameit` (saravieira)              | <https://github.com/SaraVieira/caninameit>              | CLI availability check with friendlier output. Stale (2018).                                        | Availability only, no moniker, no generation.                                         |
| `is-valid-npm-name` (lassjs)           | <https://github.com/lassjs/is-valid-npm-name>           | Wraps `validate-npm-package-name` with "best practice" extras.                                      | Syntax only.                                                                          |
| `inquirer-npm-name` (sboudrias)        | <https://github.com/SBoudrias/inquirer-npm-name>        | Inquirer prompt that re-asks until a name is free. Used by Yeoman generators.                       | Availability only, prompt-style, no batch or moniker.                                 |
| `fnn` / `find-npm-name` (medv)         | <https://github.com/antonmedv/find-npm-name>            | CLI that filters a list of candidates to those still available. Closest in spirit to brainstorming. | No generation logic — you supply candidates. No moniker check.                        |
| `npms-io-client` (bconnorwhite)        | <https://github.com/bconnorwhite/npms-io-client>        | Typed client for npms.io search/suggest API (npms.io is now deprecated/folded into npmjs.com).      | Search API, not a namer.                                                              |
| `namor`                                | <https://github.com/jsonmaur/namor.js>                  | Adjective-noun-style random name generator (subdomain-safe).                                        | Generic name generation, no npm awareness.                                            |
| `sillyname`                            | <https://github.com/thedeveloper/sillyname>             | Adjective-noun generator.                                                                           | Same — no npm context.                                                                |
| `gen-random-name`                      | <https://github.com/FarazPatankar/name-gen>             | Adjective-noun pairs.                                                                               | Same.                                                                                 |
| `fantasy-name-generator`               | <https://github.com/fentech/fantasy-name-generator>     | Race-themed fantasy names.                                                                          | Cosmetic only.                                                                        |
| `project-name-generator`               | <https://www.npmjs.com/package/project-name-generator>  | Adjective-noun pairs aimed at projects.                                                             | Same — no availability or moniker check.                                              |
| `unique-names-generator`               | <https://www.npmjs.com/package/unique-names-generator>  | Composable dictionary-based generator. Most flexible of the random generators.                      | No npm awareness.                                                                     |

**Gap an npm-namer skill fills:** every existing tool covers exactly one slice — syntax, availability, moniker, or random generation. None composes all four into a pipeline that takes seed ideas, permutes them, validates syntax, checks the registry, runs the moniker algorithm, and ranks survivors.
