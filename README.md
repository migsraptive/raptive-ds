# Raptive Community Design System

Desktop-first React/Vite design system prototype for Raptive Community, creator
application flows, and agent-readable design handoff documentation.

## Project Links

- Repository: `https://github.com/cafemedia/community-ds`
- GitHub Pages: `https://migsraptive.github.io/community-ds/`
- Vercel production: `https://community-ds.vercel.app`
- Local dev: `http://127.0.0.1:3700/community-ds/`
- Figma file: [Creator Application Flow](https://www.figma.com/design/infX09HpqqIzfmZ5YmAbI6/Creator-Application-Flow?node-id=40-2)

## What This Repo Is For

- Build and review Raptive Community UI components.
- Prototype the creator application onboarding experience.
- Validate mobile and desktop onboarding patterns before production handoff.
- Document design-system contracts for AI agents and implementation partners.
- Sync token and component manifest data into Figma.
- Capture rendered app screens into Figma for visual review.

## Stack

- React 18 with JSX
- Vite 5, served under `/community-ds/`
- Tailwind CSS v3
- Motion for React animation
- Lucide React icons
- Node's built-in test runner

This repo does not use shadcn/ui. Components are custom and token-driven.

## Local Setup

Prerequisites:

- Node.js 18.18 or newer
- npm, included with Node.js

Clone the repo and install locked dependencies:

```bash
git clone https://github.com/cafemedia/community-ds.git
cd community-ds
npm ci
```

Start the Vite dev server:

```bash
npm run dev
```

Open the local app at:

```text
http://127.0.0.1:3700/community-ds/
```

The `/community-ds/` path matters in local development because Vite uses the
same base path as GitHub Pages. Vercel production serves from the domain root.

If port `3700` is already in use, stop the other process or start Vite on a
temporary port:

```bash
npm run dev -- --port 3701
```

Then open `http://127.0.0.1:3701/community-ds/`.

## Common Local URLs

The root app switches between review surfaces with the `view` query param:

- Creator application flow:
  `http://127.0.0.1:3700/community-ds/?view=creator-application`
- Creator application page with header:
  `http://127.0.0.1:3700/community-ds/?view=creator-application-page`
- Creator onboarding viewport demo:
  `http://127.0.0.1:3700/community-ds/?view=creator-onboarding-viewport`
- Component library:
  `http://127.0.0.1:3700/community-ds/?view=component-library`
- Component library patterns section:
  `http://127.0.0.1:3700/community-ds/?view=component-library&section=Patterns`

## Daily Commands

```bash
npm run dev       # start local development at http://127.0.0.1:3700/community-ds/
npm run build     # build production assets into dist/
npm run lint      # run ESLint over src/**/*.js and src/**/*.jsx
npm test          # run unit tests and repo contract checks
npm run ci        # run the same checks as GitHub Actions
```

Before merging or deploying, run:

```bash
npm run ci
```

`npm run lint` should exit with 0 errors and 0 warnings.

When a behavior or flow changes, search `tests/` for removed components,
renamed copy, or old flow markers before committing. Update those tests in the
same change and run the affected test file, so CI verifies the current behavior
instead of trying to restore a previous implementation.

## App Surfaces

The available app surfaces are:

- `?view=creator-application`
  User-facing creator application flow.
- `?view=creator-application-page`
  Standalone creator application page with header.
- `?view=creator-onboarding-viewport`
  Viewport demo for onboarding states.
- `?view=component-library`
  Internal design review and component library.

The component library supports section filtering with `section`.

## Current Creator Application Flow

The live creator application flow is implemented in
`src/pages/CreatorApplication/CreatorApplicationPage.jsx`.

The current sequence is:

1. Entry
   A single URL/social intake step.
2. Gather / review
   Data-gathering state that resolves into editable creator details and social accounts.
3. Preview editor
   Brand/community preview editor built with `CompactWysiwygStudio`.
4. Verification
   Ownership verification with Meta login and a Persona fallback.
5. Submit / success
   Submission confirmation with timeline and celebration treatment.

The verification step includes a Community Terms modal acceptance flow before final
submission.

## Component Library

Core component primitives live in `src/components/`.

High-priority primitives include:

- `Button`
- `Badge`
- `FormField` / `FieldShell`
- `TextInput`
- `Textarea`
- `Select`
- `Checkbox`
- `RadioGroup`
- `OptionTile`
- `SelectableRow`
- `SegmentedControl`
- `TextLink`
- `Avatar`
- `AvatarUpload`
- `ColorInput`
- `ColorSwatchButton`
- `SocialUrlInput`
- `StepIndicator`

### Component Traceability

Rendered components stamp stable `data-ds-*` attributes so prototypes and larger
organisms can be inspected without reverse-engineering CSS class strings.

Base component identity is owned by the component itself:

```html
<button
  data-ds-component="Button"
  data-ds-variant="primary"
  data-ds-size="md"
>
  Continue
</button>
```

Patterns and flow screens may add correlation metadata:

```jsx
<Button
  variant="primary"
  data-ds-role="primary-action"
  data-ds-instance="creator-application.verification.primary"
>
  Submit application
</Button>
```

Use the attributes this way:

- `data-ds-component`: base component or closest mapped base component.
- `data-ds-variant`: existing component variant from the static component
  contract.
- `data-ds-size`: existing component size when size is part of the public
  contract.
- `data-ds-role`: the component's job inside a flow or organism.
- `data-ds-instance`: stable correlation point for a specific flow location.

Do not use `data-ds-*` attributes for styling. Do not create trace-only variants.
Do not use duplicate DOM ids such as `id="primary"` for component correlation.

Community/feed components include:

- `AuthorRow`
- `Comment`
- `FeedPost`
- `MediaGallery`
- `PostActionBar`
- `PostContent`
- `CommunitySidebar`
- `CommunityTopNavigation`
- `HomeFeedPageTemplate`
- `RightRailWelcomeCard`
- `RightRailCommunityRulesCard`

## Patterns

Composite patterns live in `src/patterns/`.

When pattern examples render inside the Component Library Patterns section,
their illustration rails should use bounded review frames. Live flow screens can
keep their full-height side rails, but stacked review examples should pass a
stable frame such as `illustrationFrameClassName="h-96"` or use an equivalent
aspect-ratio wrapper so portrait artwork does not stretch with card content.

Current flow and review patterns include:

- `SingleFieldIntake`
- `DataGatheringReview`
- `FetchConfirmation`
- `CompactWysiwygStudio`
- `VerificationStep`
- `CommunityTermsModal`
- `SubmissionSuccess`
- `MobileOnboardingFlow`
- `CreatorOnboardingViewportDemo`
- `CreatorOnboardingViewportShell`
- `ApplicationEmailSet`

Supporting and exploratory patterns include:

- `GoalSelectionGrid`
- `CategoryPicker`
- `StepLayout`
- `CelebrationModal`
- `ProjectionMotionShowcase`

### Pattern Image Checks

After changing pattern illustration rails or Component Library pattern examples,
verify both local dev and production preview:

```bash
npm run dev
npm run build
npm run preview
```

Open `?view=component-library&section=Patterns` and confirm the images load and
the review-gallery artwork remains bounded. In browser checks, inspect both
`naturalWidth` / `naturalHeight` and rendered dimensions; an image can load
successfully while still appearing broken because its container stretches too
tall.

## Component Contracts

Agent-readable design contracts live in `design/components/`.

Current contracts:

- `button.yml`
- `badge.yml`
- `form-field.yml`
- `text-input.yml`
- `textarea.yml`
- `select.yml`
- `checkbox.yml`
- `radio-group.yml`
- `option-tile.yml`

The contract model is intentionally lean. Contracts explain when to use a
component, when not to use it, allowed variants, states, public props,
accessibility rules, and translation notes.

Contracts should not expose fixed internals such as spacing, radius, typography,
or Tailwind classes as consumer choices. Treat components as black boxes unless
a named variant is needed.

Component traceability is part of the rendered contract but not a styling API.
When a component exposes variants or sizes, keep its static variant/size list,
rendered `data-ds-*` attributes, Component Library examples, and intent docs in
sync.

## Design Documentation

Design-side documentation lives in `design/`.

Important files:

- `design/README.md`
- `design/system-usage.md`
- `design/accessibility/standards.md`
- `design/tokens/canonical-token-language.md`
- `design/decisions/0001-agent-translation-lane.md`
- `design/automation.md`

These docs describe design intent, agent handoff, token language, and Figma sync
workflow. Ember, Discourse, or production implementation details should stay out
of this repo's design contracts unless they affect design intent.

## Tokens

Token files live in `src/tokens/`:

- `colors.js`
- `typography.js`
- `spacing.js`
- `effects.js`

Tokens are exported through `src/tokens/index.js` and consumed by
`tailwind.config.js`.

The token layer includes:

- Raptive brand palette
- semantic color aliases
- action tokens
- form/status colors
- gamification colors
- DM Sans typography
- Newsreader editorial heading treatment
- JetBrains Mono mono treatment
- spacing, radius, shadow, and motion effect scales

## Figma Workflow

The main Figma file is:

[Creator Application Flow](https://www.figma.com/design/infX09HpqqIzfmZ5YmAbI6/Creator-Application-Flow?node-id=40-2)

Recent imports added five raw HTML-to-Figma captures under `Latest from main`:

- Entry: `60:2`
- Gather / review: `61:2`
- Preview editor: `62:2`
- Verification: `63:2`
- Success: `64:2`

These captures preserve rendered layout from the local app. They are useful as
pixel references, but they are not rebuilt with Figma component instances.

Creator application capture URLs are deterministic so Figma imports do not need
manual click-through:

These capture URLs are import-only shortcuts. They are not part of the normal
creator onboarding flow; the live flow still advances through user actions.

- Entry:
  `http://localhost:3700/community-ds/?view=creator-application&capture=true&captureStep=entry`
- Gather / review:
  `http://localhost:3700/community-ds/?view=creator-application&capture=true&captureStep=gather`
- Preview editor:
  `http://localhost:3700/community-ds/?view=creator-application&capture=true&captureStep=review`
- Verification:
  `http://localhost:3700/community-ds/?view=creator-application&capture=true&captureStep=verify`
- Success:
  `http://localhost:3700/community-ds/?view=creator-application&capture=true&captureStep=success`

To run the import helper, first generate one Figma capture ID per screen with
the Figma MCP capture tool, then run:

```bash
npm run figma:capture:creator-flow -- --captures entry=ID,gather=ID,review=ID,verify=ID,success=ID
```

The helper temporarily injects the Figma HTML-to-design capture script into
`index.html`, opens each deterministic capture URL with `agent-browser`,
submits each capture, and restores `index.html` before exiting.

Figma automation scripts:

```bash
npm run design:export
npm run figma:capture:creator-flow -- --captures entry=ID,gather=ID,review=ID,verify=ID,success=ID
npm run figma:variables:sync
npm run figma:access:validate
```

Keep `.vercel/` and local Figma/session metadata untracked.

## Project Structure

```text
src/
├── assets/
├── components/
├── pages/
│   ├── ComponentLibrary/
│   ├── CreatorApplication/
│   └── CreatorOnboardingViewport/
├── patterns/
├── prototypes/
├── tokens/
├── utils/
├── App.jsx
├── globals.css
└── main.jsx

design/
├── accessibility/
├── components/
├── decisions/
├── tokens/
├── README.md
├── automation.md
└── system-usage.md

tests/
```

Useful entry files:

- `src/App.jsx`
- `src/pages/ComponentLibrary/ComponentLibrary.jsx`
- `src/pages/CreatorApplication/CreatorApplicationPage.jsx`
- `src/pages/CreatorOnboardingViewport/CreatorOnboardingViewportPage.jsx`

## Verification

For UI changes, run the standard checks:

```bash
npm run ci
```

When UI changes affect visible app surfaces, also smoke check:

- `http://127.0.0.1:3700/community-ds/?view=component-library&section=Patterns`
- `http://127.0.0.1:3700/community-ds/?view=creator-application`

Browser smoke checks should render without page errors. `npm run lint` should
exit with 0 errors and 0 warnings.

For behavior or flow changes, also check `tests/` for source-level contracts
that mention removed components, renamed copy, or old state transitions. Update
the matching tests with the behavior change and run the targeted test file
before merging.

## Deployment

The project is Vercel-backed and also published to GitHub Pages.

Production deploy target:

```bash
npx vercel deploy --prod --scope raptive
```

Only deploy production intentionally after verification.

## Current Notes

- Component contracts are now the preferred lightweight handoff format for agents.
- The creator flow uses rendered React screens as the design source of truth.
- Application email previews are available through `ApplicationEmailSet`.
- PNG and video assets are intentionally high fidelity for review and may need production optimization.
- Motion patterns are still emerging and should be documented once they stabilize.
