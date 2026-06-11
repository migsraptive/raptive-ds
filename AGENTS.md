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
- Use feature branches for WIP design explorations; only push to `main` for explicit docs/fix requests or after user approval.
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
- Icons paired with a label must match the line-height of that label
  exactly. Use the same size token as the label's line-height —
  never scale icons independently when they sit inline with text.
- Use the `.paired-label-icon` utility class for all inline
  icon and label pairings. Do not set icon sizes manually
  when the icon sits next to text.
- All patterns accept `showAside` prop to toggle design guidance panel
- Tokens are the source of truth — never hardcode colors, spacing, or type values
- Reuse existing components before creating new ones
- When adding or changing a component or variant, update `ComponentLibrary` examples and docs in the same task.
- Patterns should compose `src/components` primitives; do not hand-roll native `button`, `input`, `textarea`, or `select` controls inside patterns. If a pattern needs a new interactive control, add it to `src/components` first and document it in the component library.
- When copy includes a URL in parentheses immediately after linked text, link the preceding text with that URL and do not show the parenthesized URL. When copy includes a standalone URL that is not inside parentheses, render the full URL itself as the visible link text. Standalone email addresses should also render as visible email-address links using `mailto:`.
- Detected brand palettes must be accessibility-gated: first usable color maps to primary action, second usable color maps to secondary action, and text on those colors must use computed black/white foreground contrast.
- Detected and demo brand preview defaults must live in `src/utils/brandPreviewDefaults.js`, never defined locally in component files.

## Verification
```bash
npm run build
npm run lint
```
- `npm run lint` must exit with 0 errors and 0 warnings.
- Browser smoke check: Patterns page and Creator Application render without console errors.

## Dev Server
```bash
npm run dev
# http://127.0.0.1:3700/community-ds/
```

## Agent Behavior

### Before making changes
- State what you found before changing it
- If the change touches more than one file, list all affected files first
- Flag anything ambiguous and wait for confirmation before proceeding

### After every task
- Confirm `npm run build` passes
- Confirm `npm run lint` exits with 0 errors and 0 warnings
- Browser smoke check: Patterns page and Creator Application render
  without console errors
- Output a summary table:

  | file | what changed | why |
  |---|---|---|

- If a bug is found and fixed outside the original scope,
  call it out explicitly as a bonus fix with its own table entry

### Code quality
- Remove unused imports, props, and variables in any file you touch
- Never leave dead code — remove it or explain why it stays
- Never suppress a lint warning without a documented reason inline
- Stabilize unstable hook dependencies with useMemo or useCallback
  before adding to dependency arrays

### Design system compliance
- Never hardcode hex values — use existing tokens
- Never use arbitrary Tailwind classes — map to existing scale
- If no token exists, leave a comment: `{/* no token available */}`
- Primary buttons use `action.primary`, not `brand.DEFAULT`; `action.primary` is the accessibility-adjusted action token.
- After editing `src/tokens/*`, `tailwind.config.js`, or token-driven classes, restart the dev server before browser verification.
- CSS custom properties for dynamic preview colors:
  --preview-primary, --preview-secondary, --preview-link

### Accessibility
- All icon-only and count-only buttons need explicit aria-label
- All accordions need aria-controls and matching panel id via useId
- Never use text-tertiary for normal-size form labels — use text-secondary

### Ember compatibility
- Describe behavior, tokens, states, and slots — not React implementation
- Prefer CSS custom properties over inline JSX styles
- Motion should use CSS transitions unless an Ember animation
  addon is explicitly approved
