# Figma Design Sync Automation

This repo exports a design-sync manifest on every merge to `main`.

The manifest is the handoff contract between code, design specs, and Figma. It includes:

- token values from `src/tokens/*`
- component specs from `design/components/*.yml`
- component source paths for Code Connect mapping
- review surface URLs for the Component Library and Creator Application

## Figma Destination

Design exports target:

- File: `Creator Application Flow`
- URL: `https://www.figma.com/design/infX09HpqqIzfmZ5YmAbI6/Creator-Application-Flow?node-id=0-1`
- File key: `infX09HpqqIzfmZ5YmAbI6`
- Root node: `0:1`

Codex Figma connector access was validated against this file as `marias@raptive.com`.

## Recommended Path

Use this automation as an artifact-first, MCP-assisted sync:

1. GitHub Actions validates the repo and exports the manifest.
2. The manifest is uploaded as the `community-design-sync-manifest` artifact.
3. Codex/Figma MCP reads the target Figma file and uses the manifest as the source of truth for import/update work.

This is the primary path because the available Figma token UI does not expose the REST Variables API scopes required for CI variable writes.

## Local Setup

From the repo root, install dependencies before running design automation:

```bash
npm ci
```

The automation commands use local scripts and write generated artifacts under
`dist/design-sync/`.

Figma import, capture, update, and sync steps are explicit-only. Do not run them
as an automatic follow-up to code, docs, commit, merge, or push work unless the
user explicitly asks for Figma in that request.

Create the design-sync manifest:

```bash
npm run design:export
```

This writes:

```text
dist/design-sync/latest-main.json
```

Run the same project checks used by CI when changing design specs, tokens, or
automation scripts:

```bash
npm run ci
```

## Main-Merge Workflow

GitHub Actions runs `.github/workflows/design-sync.yml` on every push to `main` and on manual dispatch.

The workflow:

1. Installs dependencies with `npm ci`.
2. Runs `npm run lint`.
3. Runs `npm test`.
4. Runs `npm run build`.
5. Runs `npm run design:export`.
6. Uploads `dist/design-sync/latest-main.json` as the `community-design-sync-manifest` artifact.

## Design/Page Import

The manifest artifact is ready for Figma MCP import/update work.

Use this boundary:

- GitHub Actions owns repeatable export, validation, and artifact upload.
- Figma MCP or a private Figma plugin owns canvas writes such as creating pages, frames, component spec cards, and preview layouts.

That split keeps CI reliable and avoids depending on REST Variables API scopes that are not visible in the current token creation UI.

## Optional REST Variable Sync

The repo still includes `npm run figma:variables:sync`, but it is optional and admin-gated.

Only use it if a Figma org/admin can issue a token with both of these exact scopes:

- `file_variables:read`
- `file_variables:write`

The current visible token scopes do not include those labels, so REST variable sync should not be considered part of the default workflow.

If those scopes become available later, add this GitHub Actions secret:

| secret | value |
|---|---|
| `FIGMA_ACCESS_TOKEN` | Figma token with `file_variables:read` and `file_variables:write`. |

Then test locally before adding the CI step:

```bash
export FIGMA_ACCESS_TOKEN="your-token"
npm run design:export
npm run figma:access:validate
npm run figma:variables:sync
```

## Local Commands

```bash
npm run design:export
npm run figma:access:validate
```

Run `npm run design:export` first because the validation command reads
`dist/design-sync/latest-main.json`.

`figma:access:validate` will skip cleanly unless `FIGMA_ACCESS_TOKEN` is present.
Keep local `.env` files untracked; `.gitignore` already excludes `.env`,
`.env.*`, and `*.local`.
