# skill-eval

> Re-run baseline evaluations on existing skills. **Local-only — not published.**

A runner skill that takes the `evals.json` test definitions in each skill, dispatches pressure scenarios via the Agent tool (general-purpose subagent), saves transcripts to a gitignored workspace, and grades them deterministically through `skill-tools`.

This skill lives in `.agents/skills/` because it's tooling specific to this monorepo's eval workflow. It's loaded into Claude Code via the symlink at `.claude/skills/skill-eval`.

## Use

```
/skill-eval ts-best-practices    # one skill
/skill-eval --all                # every skill with evals.json
/skill-eval                      # same as --all
```

The skill walks through:

1. Resolve target skill(s)
2. Determine next `iteration-N/` in the workspace
3. Dispatch each eval twice (without skill, with skill) via Agent tool
4. Grade transcripts via `skill-tools eval`
5. Aggregate via `skill-tools benchmark`
6. Report regressions and improvements

After running, navigate transcripts with `pnpm skill-tools view <skill>`.

## License

[MIT](./LICENSE) © Zac Rosenbauer
