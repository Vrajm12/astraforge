# Installation

## CLI (after npm publication)

```bash
npx astraforge-skillkit list
npx astraforge-skillkit install --all
npx astraforge-skillkit install --all --global
npx astraforge-skillkit doctor
```

Workspace installation defaults to `.agents/skills/`. Global installation defaults to
`~/.gemini/config/skills/` for the Antigravity app/IDE. Use `--path <directory>` to
target a verified custom location. The Antigravity CLI may use a different global
directory; verify the host-specific path before using `--global`.

Existing skill directories are skipped unless `--force` is passed. `--force` replaces
only selected AstraForge skill directories and discards local edits in those directories.
Back up edits first.

## Run from this source checkout

```bash
node bin/astraforge.js list
node bin/astraforge.js install --all
node bin/astraforge.js doctor
```

## Manual installation

Copy selected directories from `skills/` into the skill directory recognized by your
Antigravity host. Restart Antigravity or start a new agent session afterward.

## Verification

`npm test` exercises CLI behavior in temporary directories. `npm run validate` checks
skill structure and evaluation case data. Neither proves that a specific Antigravity
host will activate the skills or that model performance improves.
