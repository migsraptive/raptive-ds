# Raptive Community Design System

Desktop-first design system prototype and creator-application flow for Raptive Community.

Repository:
- `https://github.com/migsraptive/community-ds`

This repo is being used for:
- token alignment with Figma
- component and pattern development
- internal design review in a library surface
- user-facing creator onboarding flow prototyping

## Current State

What is implemented now:
- Figma-aligned token remap in `src/tokens/`
- semantic text token refinements plus synchronized runtime CSS variables
- shared form primitives:
  - `FormField`
  - `FieldShell`
  - `TextInput`
  - `Textarea`
  - `Select`
  - `Checkbox`
  - `RadioGroup`
  - `OptionTile`
- shared display primitives:
  - `Button`
  - `Badge`
  - `Avatar`
  - `BrandLogo`
  - `LucideIcon`
- onboarding patterns:
  - `SingleFieldIntake`
  - `FetchConfirmation`
  - `ReviewCorrection`
  - `CommunityPreviewCard`
  - `VerificationStep`
  - `SubmissionSuccess`
- supporting patterns:
  - `GoalSelectionGrid`
  - `CategoryPicker`
  - `StepLayout`
  - `CelebrationModal`

Two top-level app surfaces exist:
- `ComponentLibrary` for internal review and design system inspection
- `CreatorApplicationPage` for the real user-facing flow

Latest creator-flow update:
- replaced the earlier generic recognition screen with a richer `FetchConfirmation` step
- added editable website, newsletter, and social-account review cards
- moved the progress meter into each flow card above the eyebrow/headline area
- bottom-aligned the action row inside each flow container for more consistent desktop composition
- extended the library surface to document semantic text-token usage

## Creator Flow

The current creator application sequence is:

1. `Entry`
2. `Fetch`
3. `Review`
4. `Preview`
5. `Verify`
6. `Submit`

This flow is based on the actual journey map, not the original generic onboarding backlog.

### User-Facing Behavior

The user-facing creator flow intentionally hides internal review notes and commentary.

In the real flow:
- right-side explanatory notes are hidden
- illustration rails remain visible
- the right illustration rail is fixed-width on desktop
- illustrations fill the right rail in user mode

Current user-flow image rail behavior:
- width: `360px`
- minimum height: `720px`
- effective frame: `1:2`

## Brand + Assets

Branding updates already applied:
- product name is now `Raptive Community Design System`
- real SVG logo is wired into the app
- sample creator identity was changed to `Julia Child`
- Lucide icons replaced placeholder/icon text usage where appropriate
- social platform assets now support the fetch-confirmation account cards

Illustration assets currently wired into the flow:
- `src/assets/entry-illustration.png`
- `src/assets/recognition-illustration.png`
- `src/assets/preview-illustration.png`
- `src/assets/verification-illustration.png`
- `src/assets/submission-illustration.png`

Important note:
- these images are visually integrated, but the PNG files are still heavy and should be resized/compressed before treating this as production-ready

## Tokens

Token files live in `src/tokens/`:
- `colors.js`
- `typography.js`
- `spacing.js`
- `effects.js`

The project has already been remapped to the exported Figma token values as closely as possible while keeping the scaffold API stable.

That includes:
- `DM Sans` typography mapping
- `Newsreader` for high-emphasis editorial headings in the creator flow
- exported spacing scale compatibility
- exported radius scale compatibility
- Raptive palette and semantic color mapping
- semantic text aliases for placeholder and subtle actions

## Project Structure

```text
src/
├── assets/
├── components/
├── pages/
│   ├── ComponentLibrary/
│   └── CreatorApplication/
├── patterns/
├── tokens/
└── globals.css
```

Useful files:
- `src/App.jsx`
- `src/pages/ComponentLibrary/ComponentLibrary.jsx`
- `src/pages/CreatorApplication/CreatorApplicationPage.jsx`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

Local dev:
- `http://127.0.0.1:3700/community-ds/`

GitHub Pages:
- `https://migsraptive.github.io/community-ds/`

## Figma

Figma MCP is now installed in Codex for this machine, but you need a fresh session to use the new Figma tools in-chat after installation.

Current Figma file being referenced:
- `Community Design System`

When implementing from Figma:
- prefer the actual Figma row/frame over inferred layouts
- reuse existing components before adding new ones
- keep user-facing screens free of internal review copy

## Next Steps

Highest-value next work:

1. Restore Figma MCP access under the correct Raptive account and bring in the selected sidebar component.
2. Compress and resize the illustration PNG assets.
3. Add a proper favicon/app mark derived from the real brand logo.
4. Keep tightening the `ComponentLibrary` so it reflects current production direction rather than scaffold-era demos.

## Verification

Primary verification command:

```bash
npm run build
```

Notes:
- builds are currently passing
- lint is not fully configured in this scaffold because ESLint 9 is present without a matching `eslint.config.js`
