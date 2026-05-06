# packages/

pnpm workspace packages — shared utilities used by skills or scripts in this repo.

Each package lives in its own directory with a `package.json` named `@zrosenbauer/<name>`. They are picked up automatically via the `packages/*` entry in [`pnpm-workspace.yaml`](../pnpm-workspace.yaml).

## Adding a package

```bash
mkdir -p packages/utils
cd packages/utils
pnpm init
# edit package.json: "name": "@zrosenbauer/utils"
```

Wire up turbo tasks (`build`, `lint`, `typecheck`, `test`) in the package's `package.json` so they run via `pnpm build`, `pnpm test`, etc. from the repo root.
