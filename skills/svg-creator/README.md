# svg-creator

> Create, fix, and convert SVG assets that render correctly across every consumer — GitHub READMEs, slide decks, web apps, social cards. Bakes in edge-to-edge viewBox discipline, hardcoded hex colors, a Node-based local preview server, and `sharp` conversion to PNG / JPEG / WebP / AVIF.

Agent-agnostic. Works with any agent that loads `SKILL.md`. Optional integration with the [chrome-devtools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) for agent-driven screenshot verification of the preview.

## What it bakes in

- **viewBox discipline** — every SVG starts with `viewBox="0 0 W H"`. Lint checks finite positive dimensions and zero origin; preview verifies padding and clipping.
- **Edge-to-edge content** — layout spacing belongs in the consumer (CSS / README / slide template), not in the asset.
- **Hardcoded hex colors** — standalone images cannot inherit consumer CSS variables; inline SVG can.
- **Node preview server** — loopback HTML with inline SVG for DOM inspection. Not a sandbox: check active content and obtain approval for flagged files before previewing.
- **Opt-in raster conversion** — `sharp`-based PNG / JPEG / WebP / AVIF output. Asks the user before converting; doesn't auto-generate siblings.
- **Preflight bootstrap** — SVG-only work needs just Node. `--raster` requires `sharp`; installation requires explicit user approval.

## Files

```
svg-creator/
├── SKILL.md                          # the workflow
├── README.md
├── LICENSE
├── references/
│   ├── colors.md                     # starter hex palette + typography
│   └── patterns.md                   # copy-pasteable SVG recipes
└── scripts/
    ├── preflight.mjs                 # checks Node / sharp / chrome-devtools MCP
    ├── preview-server.mjs            # local HTTP preview (free-port pool)
    ├── convert.mjs                   # sharp-based SVG → PNG/JPEG/WebP/AVIF
    └── lint-viewbox.mjs              # viewBox lint (0 0 origin, well-formed)
```

## Install

```sh
npx skills add zrosenbauer/skills --skill svg-creator
```

Run from the user's project, not the skill's install directory:

```sh
node .agents/skills/svg-creator/scripts/preflight.mjs
# Only for raster conversion, after approval to add sharp:
node .agents/skills/svg-creator/scripts/preflight.mjs --raster --install
```

## License

[MIT](./LICENSE) © Zac Rosenbauer
