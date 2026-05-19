# Discourse Token Handoff Reference

Date: 2026-05-18

## Purpose

This is a quick translation sheet for communication between the current repo token API and the canonical token names defined in `tokens.json`.

Use this document during:

- design reviews
- engineering handoff
- Discourse implementation conversations
- token naming translation when reviewing mockups or specs

This document is intentionally shorter than the full audit in [token-mapping-2026-05-18.md](/Users/miguelarias/raptive-ds/docs/token-mapping-2026-05-18.md).

## How To Use It

When handing off designs:

1. Reference the repo token or utility currently visible in the implementation.
2. Translate it to the canonical token name here.
3. Use the canonical token language when speaking with Discourse developers.

## Core Translation Table

### Brand and neutral colors

| Repo usage | Current value | Canonical token |
|---|---:|---|
| `bg-brand` | `#6b65ff` | `brand.primary-blue` |
| `text-brand-dark` | `#354786` | `brand.accent-blue` |
| `bg-brand-subtle` | `#f4faff` | `light.accent.brand-subtle` or repo alias from brand/neutral mix |
| `bg-surface-raised` | `#fdfdfd` | `neutral.10` |
| `bg-surface-sunken` | `#f8f8f8` | `neutral.20` |
| `border-border` | `#eff0f0` | `neutral.30` |
| `border-border-strong` | `#e9e9ea` | `neutral.50` |
| `text-text` | `#242526` | `Typography/Desktop.text-color.primary` |
| `text-text-secondary` | `#8f9295` | `Typography/Desktop.text-color.tertiary` |
| `text-text-tertiary` | `#d7d8d9` | `Typography/Desktop.text-color.placeholder` |
| `text-white` | `#ffffff` | `Typography/Desktop.text-color.inverse` |

### Brand accent and support colors

| Repo usage | Current value | Canonical token |
|---|---:|---|
| `bg-orange-500` | `#ff7858` | `brand.secondary-orange` |
| `bg-gamification-gold` | `#c2f054` | `brand.tertiary-yellow-600` |
| `bg-gamification-gold-light` | `#d2ff66` | `brand.tertiary-yellow-brand-500` |

### Spacing

| Repo token | Current value | Canonical token |
|---|---:|---|
| `space-xxxs` | `2px` | `Spacing/Mode 1.spacing.xxxs` |
| `space-xxs` | `4px` | `Spacing/Mode 1.spacing.xxs` |
| `space-xs` | `8px` | `Spacing/Mode 1.spacing.xs` |
| `space-s` | `16px` | `Spacing/Mode 1.spacing.s` |
| `space-m` | `24px` | `Spacing/Mode 1.spacing.m` |
| `space-l` | `32px` | `Spacing/Mode 1.spacing.l` |
| `space-xl` | `48px` | `Spacing/Mode 1.spacing.xl` |
| `space-xxl` | `64px` | `Spacing/Mode 1.spacing.xxl` |

### Radius

| Repo token | Current value | Canonical token |
|---|---:|---|
| `rounded-sm` | `8px` | `Radius/Mode 1.border-radius.sm` |
| `rounded-md` | `12px` | `Radius/Mode 1.border-radius.md` |
| `rounded-lg` | `16px` | `Radius/Mode 1.border-radius.lg` |
| `rounded-xl` | `24px` | `Radius/Mode 1.border-radius.xl` |
| `rounded-2xl` / `rounded-3xl` | `32px` | `Radius/Mode 1.border-radius.xxl` |
| `rounded-full` | `9999px` | repo compatibility alias |

### Typography

| Repo token | Current value | Canonical token |
|---|---:|---|
| `font-sans` | `DM Sans` | `Typography/Desktop.family.font family` |
| `font-display` | `DM Sans` | `Typography/Desktop.family.font family` |
| `text-2xs` | `10 / 16` | `Typography/Desktop.size.label sm` |
| `text-xs` | `12 / 16` | `Typography/Desktop.size.label md` |
| `text-sm` | `14 / 20` | `Typography/Desktop.size.label lg` |
| `text-base` | `15 / 20` | `Typography/Desktop.size.body` |
| `text-lg` | `18 / 24` | `Typography/Desktop.size.heading 2` |
| `text-2xl` | `24 / 28` | `Typography/Desktop.size.heading 1` |
| `text-4xl` | `32 / 42` | `Typography/Desktop.size.display` |
| `tracking-caps` | `0.08em` | repo compatibility alias from canonical letter-spacing scale |

## Special Cases

### Status colors

Status tokens in the repo are not currently a clean direct translation to the canonical token file.

Examples:

- `status.success`
- `status.warning`
- `status.error`

Use caution when handing these off. Treat them as repo-specific until approved for canonical remapping.

### Shadows and glows

These are not yet cleanly normalized:

- `shadow-xs`
- `shadow-sm`
- `shadow-brand-glow`
- `shadow-gold-glow`
- `shadow-purple-glow`

When handing off:

- use the repo token name if implementation already exists
- reference the full audit if a canonical shadow mapping is needed

### Numeric Tailwind aliases

The repo uses many Tailwind-style aliases like:

- `p-4`
- `gap-3`
- `px-5`
- `h-11`

These are compatibility conveniences. When communicating with Discourse developers, prefer the canonical spacing/radius/type token names rather than Tailwind shorthand.

## Recommended Handoff Format

For each reviewed UI element, communicate tokens in this format:

- Repo implementation: `text-text-secondary`, `bg-surface-raised`, `rounded-full`
- Canonical token: `Typography/Desktop.text-color.tertiary`, `neutral.10`, `Radius/Mode 1.border-radius.xxl` or repo alias for full capsule
- Notes: direct match, compatibility alias, or repo-specific

## Default Rule

When there is a mismatch between repo naming and canonical naming:

- keep the repo token name for local implementation discussion
- use the canonical token name for design-system and Discourse translation
- flag anything repo-specific instead of inventing a false 1:1 mapping
