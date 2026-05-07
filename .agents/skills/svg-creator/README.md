# svg-creator

> Create SVG assets in the `art` monorepo with strict edge-to-edge viewBox discipline. **Local-only — tied to the [zrosenbauer/art](https://github.com/zrosenbauer/art) pipeline.**

This skill is canonical-housed here in the skills monorepo and used in the art repo via symlink or by installing the skill back. It assumes the consuming repo has:

- `art/<category>/<name>/` directory layout
- `apps/viewer/` (TanStack Start) running the watcher at port 4321
- `@art/svg-to-png` Playwright-based converter
- `pnpm docs` README generator

If those don't exist, the skill's automation steps (auto PNG conversion, live viewer, `pnpm docs`) won't work — but the SVG authoring discipline (viewBox starts at `0 0`, no padding, color/typography refs) is portable.

## What it bakes in

- **viewBox discipline** — every SVG starts with `viewBox="0 0 W H"`, no offsets, no padding. Lint script enforces.
- **Asset directory + art.yaml** — every asset is a directory with `<name>.svg`, `<name>.png` (auto-generated), and `art.yaml` for title/description/tags
- **Auto-conversion + live preview** — the viewer's chokidar watcher converts SVG→PNG and broadcasts SSE reload on every save
- **React UI as asset manager** — keyboard nav, search, multi-select, archive/restore/rename/move, copy-to-clipboard
- **HTTP API for headless ops** — `/api/rename`, `/api/move`, `/api/archive`, `/api/restore` all callable from agent's Bash tool

## Files

```
.agents/skills/svg-creator/
├── SKILL.md                         # the workflow (Steps 1–8 + modify/rename/archive recipes)
├── README.md, LICENSE
├── references/
│   ├── colors.md                    # hex palette (matches viewer's vendored CSS)
│   └── patterns.md                  # copy-pasteable SVG recipes (banners, badges, etc.)
└── scripts/
    ├── ensure-viewer.sh             # idempotent localhost:4321 launcher
    └── lint-viewbox.mjs             # viewBox lint (0 0 origin, well-formed, positive dims)
```

Symlinked into `.claude/skills/svg-creator` for Claude Code to load it from this monorepo. To use the skill from the art repo, either symlink or install via `npx skills add zrosenbauer/skills --skill svg-creator` (when published).

## License

[MIT](./LICENSE) © Zac Rosenbauer
