# skill-reviewer

Reviews an existing agent skill in this repo against authoring conventions. Produces a severity-tiered report (`error` / `warn` / `info`) with a Clean section, and classifies the skill type.

## When to use

Verbatim trigger phrases:

- "review the X skill"
- "audit this skill"
- "check skill X against repo conventions"
- "is this skill any good?"
- "second opinion on skill X"
- "review skill X before publishing"
- "sanity check skill X"

## When NOT to use

- Authoring a brand-new skill → use `/skill-creator`
- Reviewing source code, diffs, or PRs → use `/code-reviewer`
- Fixing the skill body — just edit `SKILL.md` directly

## What it bakes in

This is a **discipline skill** — `pnpm skill-toolkit lint` already covers mechanical rules, so the gap this skill closes is the lazy-reviewer failure mode:

- **Skill-type classification first** (discipline / technique / pattern / reference) so the audit lens matches the skill
- **Deep-reference reading** beyond `lint-checklist.md` — description quality, frontmatter shape, XML usage
- **Severity-tiered output** (`error` / `warn` / `info`) with `file:line` pointers — comparable across runs
- **Clean section even on a pass** — forces grounding in specific rules instead of "looks solid"

## Usage

```
/skill-reviewer ts-best-practices
```

Or with no arg:

```
/skill-reviewer
> Which skill should I review?
```

## Installation

Public skill — install with:

```bash
npx skills add zrosenbauer/skills
```

Or load directly from `skills/skill-reviewer/` if you've cloned the monorepo.

## License

MIT — see [`LICENSE`](LICENSE).
