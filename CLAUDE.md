# Raptive Design System

## Project
- **Directory**: `~/community-ds`
- **Port**: 3700
- **Repo**: `cafemedia/community-ds`
- **GitHub Pages**: `https://migsraptive.github.io/community-ds/`
- **Vercel Project**: `raptive/community-ds`
- **Vercel Team**: `Raptive EngOps` (`raptive`)
- **Vercel Production**: `https://community-ds.vercel.app`

## Git & Deployment
- This is a Vercel-backed project linked to the `origin` repo (`cafemedia/community-ds`).
- For every new task, agents must work on a feature branch and open a pull request for review before merging.
- Do not push directly to `main` unless the user explicitly approves a direct main update for that specific task.
- Agents are allowed to deploy to Vercel for this project, including production deploys with `npx vercel deploy --prod --scope raptive`.
- Keep `.vercel/` untracked; local project metadata should not be committed.

## Figma Sync
- Do not import, capture, update, or sync Figma automatically after code, docs, commit, merge, or push work.
- Only run Figma import/sync/update workflows when the user explicitly asks for Figma in that request.
- If a Figma capture requires a temporary script tag, remove it before finishing and do not commit it.

## Stack
- React 18 (JSX, not TypeScript)
- Vite 5 with base path `/community-ds/`
- Tailwind CSS v3
- Lucide React for icons
- No shadcn/ui — custom components

## Structure
```
src/
├── assets/          SVG logo + illustration PNGs
├── components/      Atomic UI components (Avatar, Badge, Button, etc.)
├── patterns/        Composite patterns (SingleFieldIntake, StepLayout, etc.)
├── pages/
│   ├── ComponentLibrary/      Internal design review surface
│   └── CreatorApplication/    User-facing 6-step creator flow
├── tokens/          Design tokens (colors, typography, spacing, effects)
├── App.jsx          State-based routing between surfaces
├── globals.css      Fonts, CSS vars, Tailwind directives
└── main.jsx         Entry point
```

## Tokens
- All tokens in `src/tokens/` — colors, typography, spacing, effects
- Exported via `src/tokens/index.js` and consumed by `tailwind.config.js`
- DM Sans (sans/display), JetBrains Mono (mono)
- Raptive palette, semantic color layer, gamification tokens

## Conventions
- Components live in `src/components/ComponentName/ComponentName.jsx`
- Patterns live in `src/patterns/PatternName/PatternName.jsx`
- All patterns accept `showAside` prop to toggle design guidance panel
- Tokens are the source of truth — never hardcode colors, spacing, or type values
- Reuse existing components before creating new ones
- Base components stamp their rendered identity with stable traceability
  attributes such as `data-ds-component`, `data-ds-variant`, and
  `data-ds-size`. These attributes are for design review, QA, and automation;
  never use them as styling hooks.
- Component variant and size names should come from static lists exported by
  the base component when those values are part of the public contract.
- Patterns, prototypes, and larger organisms may add correlation metadata such
  as `data-ds-role` or `data-ds-instance` through pass-through props, but the
  base component identity must remain owned by the component itself.
- If an organism reimplements a control shape for a prototype, map it back to
  the closest base component with `data-ds-component` and an existing
  `data-ds-variant`; do not invent new trace variants or duplicate DOM ids.
- When copy includes a URL in parentheses immediately after linked text, link the preceding text with that URL and do not show the parenthesized URL. When copy includes a standalone URL that is not inside parentheses, render the full URL itself as the visible link text. Standalone email addresses should also render as visible email-address links using `mailto:`.

## Verification
```bash
npm run build
```

## Dev Server
```bash
npm run dev
# http://127.0.0.1:3700/community-ds/
```
