# Token Mapping Audit

Date: 2026-05-18

## Goal

Document how the current repo token system maps to `/Users/miguelarias/Desktop/untitled folder/tokens.json`, and identify the gaps between the repo's token API and the canonical token file.

## Current Repo Token Entry Points

The repo exposes tokens through:

- [src/tokens/colors.js](/Users/miguelarias/community-ds/src/tokens/colors.js)
- [src/tokens/spacing.js](/Users/miguelarias/community-ds/src/tokens/spacing.js)
- [src/tokens/typography.js](/Users/miguelarias/community-ds/src/tokens/typography.js)
- [src/tokens/effects.js](/Users/miguelarias/community-ds/src/tokens/effects.js)
- [src/tokens/index.js](/Users/miguelarias/community-ds/src/tokens/index.js)
- [tailwind.config.js](/Users/miguelarias/community-ds/tailwind.config.js)
- [src/globals.css](/Users/miguelarias/community-ds/src/globals.css)

The repo token layer is not just direct canonical token exports. It includes:

- semantic aliases
- Tailwind compatibility aliases
- runtime CSS variables
- a few direct design decisions layered on top of canonical values

## Source Token Coverage in `tokens.json`

The JSON file includes:

- canonical color scales
- semantic light and dark colors
- spacing
- sizing
- radius
- typography token groups
- responsive desktop and mobile typography
- button tokens
- shadows

This is broader than the repo token surface and is suitable as the source of truth.

## High-Level Conclusion

The repo is already numerically aligned with many `tokens.json` values. The mismatch is mostly in shape and naming, not in base values.

That means migration should focus on:

1. replacing hand-maintained token definitions with mapped values from `tokens.json`
2. preserving the repo's public Tailwind token API until components are cleaned up
3. keeping `globals.css` in sync with the mapped semantic layer

## Mapping

### Colors

Current repo colors in [colors.js](/Users/miguelarias/community-ds/src/tokens/colors.js) map closely to the canonical `brand`, `neutral`, and `Typography/Desktop` token groups in `tokens.json`.

#### Brand

| Repo token | Current value | `tokens.json` source |
|---|---:|---|
| `brand.DEFAULT` | `#6b65ff` | `brand.primary-blue` |
| `brand.dark` | `#354786` | `brand.accent-blue` |
| `gamification.gold` | `#c2f054` | `brand.tertiary-yellow-600` |
| `gamification.gold-light` | `#d2ff66` | `brand.tertiary-yellow-brand-500` |
| `orange-500` | `#ff7858` | `brand.secondary-orange` |

#### Neutrals and semantic text/surface

| Repo token | Current value | `tokens.json` source |
|---|---:|---|
| `surface.raised` | `#fdfdfd` | `neutral.10` |
| `surface.sunken` | `#f8f8f8` | `neutral.20` |
| `border.DEFAULT` | `#eff0f0` | `neutral.30` |
| `border.strong` | `#e9e9ea` | `neutral.50` |
| `text.secondary` | `#8f9295` | `neutral.500` |
| `text.tertiary` | `#d7d8d9` | `Typography/Desktop.text-color.placeholder` resolves through neutral ramp |
| `text.DEFAULT` | `#242526` | `Typography/Desktop.text-color.primary` resolves to `neutral.1000` |

#### Status colors

The repo status colors do not currently appear to come from the same canonical color ramps as `tokens.json`.

Examples:

- Repo success: `#22c55e`
- Source green.500: `#48bb78`

- Repo warning: `#ffc50e`
- Source yellow.500: `#ecc94b`

- Repo error: `#f75942`
- Source red.500: `#f56565`

Recommendation:

- keep current repo status tokens unless the design system explicitly wants to adopt the `tokens.json` status ramps
- do not silently remap status colors during the first migration step

### Spacing

Current repo spacing in [spacing.js](/Users/miguelarias/community-ds/src/tokens/spacing.js) aligns closely with `Spacing/Mode 1.spacing`.

| Repo token | Current value | `tokens.json` source |
|---|---:|---|
| `xxxs` | `2px` | `Spacing/Mode 1.spacing.xxxs` |
| `xxs` | `4px` | `Spacing/Mode 1.spacing.xxs` |
| `xs` | `8px` | `Spacing/Mode 1.spacing.xs` |
| `s` | `16px` | `Spacing/Mode 1.spacing.s` |
| `m` | `24px` | `Spacing/Mode 1.spacing.m` |
| `l` | `32px` | `Spacing/Mode 1.spacing.l` |
| `xl` | `48px` | `Spacing/Mode 1.spacing.xl` |
| `xxl` | `64px` | `Spacing/Mode 1.spacing.xxl` |
| `xxxl` | `96px` | `Spacing/Mode 1.spacing.xxxl` |
| `xxxxl` | `128px` | `Spacing/Mode 1.spacing.xxxxl` |

The repo also adds Tailwind compatibility aliases:

- `1`, `2`, `4`, `6`, `8`, `10`, `11`, `12`, etc.
- intent aliases like `component-md`, `layout-lg`

These aliases do not exist in `tokens.json`.

Recommendation:

- keep these aliases as a compatibility layer generated from `Spacing/Mode 1`
- do not remove them until components are refactored away from utility-scale assumptions

### Radius

Current repo radius in [effects.js](/Users/miguelarias/community-ds/src/tokens/effects.js) aligns almost exactly with `Radius/Mode 1.border-radius`.

| Repo token | Current value | `tokens.json` source |
|---|---:|---|
| `sm` | `8px` | `Radius/Mode 1.border-radius.sm` |
| `md` | `12px` | `Radius/Mode 1.border-radius.md` |
| `lg` | `16px` | `Radius/Mode 1.border-radius.lg` |
| `xl` | `24px` | `Radius/Mode 1.border-radius.xl` |
| `2xl` / `3xl` | `32px` | `Radius/Mode 1.border-radius.xxl` |
| `full` | `9999px` | compatibility alias, not a direct canonical token |

Recommendation:

- source semantic radii from `Radius/Mode 1`
- keep `full` as a repo alias for Tailwind ergonomics

### Typography

Current repo typography in [typography.js](/Users/miguelarias/community-ds/src/tokens/typography.js) is already substantially aligned to `Typography/Desktop`.

#### Font family

| Repo token | Current value | `tokens.json` source |
|---|---:|---|
| `fontFamily.sans` | `DM Sans` | `Typography/Desktop.family.font family` |
| `fontFamily.display` | `DM Sans` | `Typography/Desktop.family.font family` |

The repo also includes:

- `fontFamily.mono = JetBrains Mono`

This does not appear to come from the same canonical token group and should remain custom unless a mono token exists elsewhere in the JSON.

#### Font size

| Repo token | Current value | `tokens.json` source |
|---|---:|---|
| `display` / `4xl` | `32 / 42` | `Typography/Desktop.size.display` |
| `heading-1` / `2xl` / `3xl` | `24 / 28` | `Typography/Desktop.size.heading 1` |
| `heading-2` / `lg` / `xl` | `18 / 24` | `Typography/Desktop.size.heading 2` |
| `body` / `base` | `15 / 20` | `Typography/Desktop.size.body` |
| `label-lg` / `sm` | `14 / 20` | `Typography/Desktop.size.label lg` |
| `label-md` / `xs` | `12 / 16` | `Typography/Desktop.size.label md` |
| `label-sm` / `2xs` | `10 / 16` | `Typography/Desktop.size.label sm` |

#### Text colors

Repo semantic text colors should map from `Typography/Desktop.text-color` instead of from hand-written semantic aliases once migration happens.

Recommendation:

- treat `Typography/Desktop` as the canonical source for text colors and text styles
- keep Tailwind alias names like `base`, `sm`, `4xl`, `tracking-caps` as repo compatibility exports

### Shadows

The repo shadow scale in [effects.js](/Users/miguelarias/community-ds/src/tokens/effects.js) is currently hand-authored and not yet mapped from `tokens.json`.

`tokens.json` does contain shadow tokens, but the repo also adds:

- elevation aliases
- custom glows like `brand-glow`, `gold-glow`, `purple-glow`

Recommendation:

- map neutral elevation shadows from `tokens.json`
- keep glow tokens repo-specific unless the canonical token file introduces equivalent semantic effects

## Repo API Surface Actually in Use

The current codebase heavily uses these token families:

- semantic colors: `brand`, `surface`, `border`, `text`, `status`
- canonical color aliases: `neutral-*`, `raptive-*`, `green-*`, `yellow-*`, `red-*`, `orange-*`, `purple-*`
- spacing aliases: especially numeric Tailwind-style keys like `4`, `5`, `6`, `8`, `10`, `11`, `12`
- radius aliases: `rounded-full`, `rounded-2xl`, `rounded-3xl`, `rounded-lg`, plus arbitrary pixel radii
- typography aliases: `text-sm`, `text-base`, `text-lg`, `text-2xl`, `text-4xl`, `font-display`, `tracking-caps`
- shadow aliases: `shadow-xs`, `shadow-sm`, `shadow-brand-glow`

This means a safe migration should preserve:

- semantic color names
- numeric spacing aliases
- Tailwind-friendly typography aliases
- `full` radius
- custom glow tokens

## Recommended Migration Strategy

### Phase 1: Canonical alignment

- Replace hand-authored values in `colors.js`, `spacing.js`, `typography.js`, and the neutral portion of `effects.js` with values mapped from `tokens.json`.
- Preserve the repo export names.

### Phase 2: Runtime sync

- Update [globals.css](/Users/miguelarias/community-ds/src/globals.css) so CSS variables come from the same mapped semantic layer.

### Phase 3: Optional cleanup

- Reduce arbitrary aliases only after verifying they are unused or redundant.

## Recommended Non-Goals for First Pass

- Do not change button styling tokens at the same time as the token migration.
- Do not silently replace status colors with the canonical token palette unless approved.
- Do not remove Tailwind compatibility aliases yet.
- Do not refactor component class usage during the first token pass.

## Best Next Step

Build a single mapping module that reads the intended values from `tokens.json` and exports the repo-compatible token structure used by:

- `colors.js`
- `spacing.js`
- `typography.js`
- `effects.js`
- `globals.css`

This lets the repo move to `tokens.json` as the source of truth without forcing immediate component rewrites.
