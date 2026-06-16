# Raptive Design System

## CommunityDS Agent Governance

This root-level agent file is the global rule source for AI agents working in
CommunityDS. Read these constraints before selecting, composing, or changing
components.

### Component Usage

- Never invent new component variants.
- Never invent new component props.
- Never hard-code styling values already owned by a component.
- Components are black boxes.
- Consumers may control layout and positioning only.
- Consumers may not style component internals.
- Do not target internal elements with CSS.
- If guidance is missing, ask a question instead of guessing.
- If a new variant, component, or pattern seems necessary, flag it for review.

### Allowed Usage

Use components directly:

```jsx
<Card />
<Button />
```

Position components from the outside:

```jsx
<div className="flex gap-4">
  <Button />
</div>
```

### Disallowed Usage

Do not restyle component internals through consumer class names:

```jsx
<Button className="rounded-[18px]" />
```

Do not override component-owned spacing:

```jsx
<Button className="px-8" />
```

Do not target internal DOM structure:

```css
.button span {
  color: red;
}
```

### React API Compatibility

Existing React props are not automatically design-system contract options.
Keep compatibility props available unless a cleanup is explicitly approved, but
agents must treat them as restricted:

- `className` may support legacy compatibility or outside layout hooks, but must
  not override component-owned visual styling.
- `style` may support controlled CSS custom properties or measured runtime
  values, but must not become an arbitrary styling API.
- Pass-through props may support accessibility, form behavior, ids, and data
  attributes, but must not replace documented variants or target internals.

### Component Traceability

Rendered prototypes and organisms must expose component identity outside of CSS
classes so designers, engineers, QA, and automation can correlate what appears
on screen with the base design-system primitive.

- Base components own their own trace identity with stable attributes such as
  `data-ds-component`, `data-ds-variant`, and `data-ds-size`.
- Variant and size values must come from the component's documented/static
  contract. Do not invent trace-only variants.
- Patterns, prototypes, and larger organisms may add correlation metadata such
  as `data-ds-role` or `data-ds-instance` through pass-through props.
- `data-ds-role` describes the job in the flow, such as `primary-action` or
  `secondary-action`; it must not replace the base component variant.
- `data-ds-instance` may identify a stable flow location, such as
  `creator-application.verification.primary`.
- Reimplemented prototype controls must map back to the closest base component
  with `data-ds-component` and an existing `data-ds-variant`.
- Do not use DOM ids such as `id="primary"` for traceability. IDs must remain
  unique and tied to accessibility, forms, anchors, or native behavior.
- Do not use traceability attributes as CSS styling hooks.

### Component Update Log

Use this table to track proposed additions before changing component APIs or
creating new patterns.

| date | component or pattern | proposed change | reason | status | reviewer |
|---|---|---|---|---|---|
| _Add date_ | _Name_ | _Variant, prop, component, or pattern_ | _Why existing guidance is insufficient_ | proposed | _Design/system owner_ |

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
- When a pattern is rendered in the Component Library Patterns section with
  `showAside={false}`, keep illustration/media rails bounded for review.
  Prefer a stable frame prop such as `illustrationFrameClassName="h-96"` or an
  equivalent fixed/aspect-ratio wrapper. Do not let `h-full min-h-[720px]`
  production rails stretch inside stacked review cards.
- Tokens are the source of truth — never hardcode colors, spacing, or type values
- Reuse existing components before creating new ones
- When adding or changing a component or variant, update `ComponentLibrary` examples and docs in the same task.
- Patterns should compose `src/components` primitives; do not hand-roll native `button`, `input`, `textarea`, or `select` controls inside patterns. If a pattern needs a new interactive control, add it to `src/components` first and document it in the component library.
- When adding or changing a base component variant or size, update the
  component-owned static variant/size list and the Component Library
  Traceability Contract in the same task.
- When adding a prototype or organism action, add `data-ds-role` and, when the
  flow location needs stable correlation, `data-ds-instance`.
- When copy includes a URL in parentheses immediately after linked text, link the preceding text with that URL and do not show the parenthesized URL. When copy includes a standalone URL that is not inside parentheses, render the full URL itself as the visible link text. Standalone email addresses should also render as visible email-address links using `mailto:`.
- Detected brand palettes must be accessibility-gated: first usable color maps to primary action, second usable color maps to secondary action, and text on those colors must use computed black/white foreground contrast.
- Detected and demo brand preview defaults must live in `src/utils/brandPreviewDefaults.js`, never defined locally in component files.

## Verification
```bash
npm run build
npm run lint
```
- Do not run build, lint, test, browser smoke, or preview checks automatically
  during normal design iteration or documentation updates.
- Run verification only when the user explicitly asks for it, or when the user
  says the work is ready to commit, push, merge, or deploy.
- `npm run lint` must exit with 0 errors and 0 warnings.
- Browser smoke check: Patterns page and Creator Application render without console errors.
- Before commit, push, merge, or deploy after a behavior or flow change, search
  tests for removed or renamed implementation markers, copy, and flow contracts.
  Update stale tests in the same task so CI protects the current behavior rather
  than restoring the previous one. Run the targeted test file when a matching
  test changes.

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
- Do not automatically run build, lint, tests, browser smoke checks, previews,
  or deployment checks unless the user explicitly asks for verification or says
  the work is ready to commit, push, merge, or deploy.
- When verification is requested or the work is ready for commit/push/merge,
  confirm `npm run build` passes.
- When verification is requested or the work is ready for commit/push/merge,
  confirm `npm run lint` exits with 0 errors and 0 warnings.
- When verification is requested or the work is ready for commit/push/merge,
  browser smoke check: Patterns page and Creator Application render without
  console errors.
- When behavior or flow changes are ready for commit/push/merge, confirm tests
  that mention removed or renamed symbols, components, copy, or flow state have
  been updated. Run the affected test file if one exists.
- Output a summary table:

  | file | what changed | why |
  |---|---|---|

- If a bug is found and fixed outside the original scope,
  call it out explicitly as a bonus fix with its own table entry

### Plugins and automation
- Do not automatically trigger plugins, skill workflows, browser automation,
  Figma sync, GitHub workflows, deployment workflows, or named automation such
  as Superpowers.
- Wait until the user explicitly prompts the agent to use a plugin, workflow,
  or automation before invoking it.
- If a system-level instruction requires an automation step, state the
  requirement first and wait for user confirmation before proceeding unless the
  user has already asked for that exact action.

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
