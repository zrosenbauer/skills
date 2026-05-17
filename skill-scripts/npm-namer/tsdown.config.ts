import { defineConfig } from 'tsdown'

// Bundle src/check.mjs into a single self-contained ESM file at dist/check.mjs.
// validate-npm-package-name and damerau-levenshtein are inlined so the
// shipped CLI runs without any npm install. popular-names.json is loaded
// from a sibling path at runtime and stays external.
export default defineConfig({
  entry: ['src/check.mjs'],
  format: 'esm',
  outDir: 'dist',
  platform: 'node',
  target: 'node20',
  // Bundle every dep so the shipped artifact runs with zero install.
  // popular-names.json stays external (loaded from a sibling path at runtime).
  deps: {
    alwaysBundle: [/.*/],
    neverBundle: ['./popular-names.json', '../popular-names.json'],
  },
  sourcemap: 'inline',
  clean: true,
  // The source's #!/usr/bin/env node is preserved by tsdown automatically;
  // we add the auto-gen annotation as a comment banner below the shebang.
  outputOptions: {
    banner:
      '// AUTO-GENERATED bundle from skill-scripts/npm-namer/src/check.mjs — do not edit by hand.\n// Run `pnpm --filter @zrosenbauer/skill-scripts-npm-namer build` to regenerate.',
  },
})
