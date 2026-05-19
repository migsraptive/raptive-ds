# Community Token Translation Reference

Date: 2026-05-18

## Purpose

This document translates the design-system token language used in this repo into the actual styling framework used by Community on Discourse.

It is a handoff aid, not a migration plan.

Use it when:

- reviewing designs against Community implementation constraints
- explaining tokens to Discourse developers
- translating repo/Tailwind semantics into Community styling concepts

Primary framework reference:

- [STYLING-TOKENS.md](/Users/miguelarias/cafemedia/community/docs/code/STYLING-TOKENS.md)

## Working Model

Community should be treated as an implementation target with its own token framework.

The safe communication model is:

1. state the repo or canonical token concept
2. translate it to the closest Community token or token category
3. note whether it is:
   - direct
   - approximate
   - framework-specific
   - requires local override

## Translation Table

### Text and semantic color

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| `text-text` | `--primary` or `--semantics-text-primary` when present | approximate | Community core semantics are the first stop for text color |
| `text-text-secondary` | `--semantics-text-secondary` | direct | This is the closest plugin-layer translation |
| `text-text-tertiary` | `--tertiary` or a lower-contrast semantic text token | approximate | Depends on actual component context |
| inverse text | `--secondary` on dark surfaces or framework inverse text treatment | approximate | Community handles many inverse states semantically |
| link brand text | `--raptive-primary-blue` or a semantic link token | approximate | Prefer semantic link treatment where available |

### Surface and border

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| `bg-surface` | `--secondary` or component default background | approximate | Community surfaces are often semantic, not palette-first |
| `bg-surface-raised` | `--primary-low` or feature-specific background token | approximate | Depends on elevation intent |
| `bg-surface-sunken` | `--primary-low` / `--primary-low-mid` style treatment | approximate | Confirm against component usage |
| `border-border` | semantic border tone derived from core framework tokens | approximate | Often computed rather than raw |
| `border-border-strong` | stronger semantic border token or locally derived border | approximate | No single guaranteed 1:1 |

### Brand color

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| `bg-brand` | `--raptive-primary-blue` | direct | Best Community brand-color equivalent |
| `text-brand-dark` | `--raptive-primary-blue` or `--accent-blue` style plugin token | approximate | Check exact plugin token availability |
| secondary orange brand use | `--raptive-secondary-orange` or mobile orange variant | direct | Plugin layer owns this brand token family |
| yellow/gold accent use | plugin yellow/brand accent token | approximate | Verify specific feature context |

### Status color

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| success | `--success` | direct | Use Community semantic token first |
| danger / error | `--danger` | direct | Use Community semantic token first |
| warning | semantic warning treatment if present, otherwise feature-level token | approximate | Community is less uniform here |

### Spacing

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| `spacing-xxs` | `--spacing-xxs` | direct | Plugin token layer |
| `spacing-xs` | `--spacing-xs` | direct | Plugin token layer |
| `spacing-s` | `--spacing-s` | direct | Plugin token layer |
| `spacing-m` | `--spacing-m` | direct | Plugin token layer |
| `spacing-l` | `--spacing-l` | direct | Plugin token layer |
| Tailwind spacing aliases like `p-4`, `gap-3`, `h-11` | convert back to spacing token intent first | requires translation | Do not hand these off as literal implementation guidance |

### Radius

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| `rounded-md` | `--border-radius-md` | direct | Plugin token layer |
| `rounded-lg` | `--border-radius-lg` | direct | Plugin token layer |
| `rounded-xl` | closest exported border-radius token | approximate | Confirm exact token in plugin files |
| `rounded-full` | `--d-button-border-radius` or component-specific full pill treatment | approximate | Community often handles this at component level |

### Typography

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| `font-sans` | Community base font variables | direct | See font variable layer |
| `text-base` | `--font-size-body` | direct | Plugin token layer |
| `text-sm` | `--font-size-label-lg` | approximate | Depends on exact semantic intent |
| `text-2xl` | `--font-size-heading-1` | direct | Plugin token layer |
| display headline | Discourse font scale variables plus plugin heading tokens | approximate | Some heading behavior is still mixed with hardcoded styles |
| line-height token use | `--line-height-md`, `--line-height-large` | direct | Core framework layer |

### Component and feature tokens

| Repo / design-system concept | Community translation | Status | Notes |
|---|---|---|---|
| generic component background | prefer semantic/core token first | approximate | Avoid jumping straight to feature tokens |
| feature-specific UI treatment | feature-specific plugin token such as `--fkb-bg`, `--qotd-carousel-bg` | framework-specific | Only use when matching that exact Community feature |

## Token Categories To Prefer In Community

When speaking to Community developers, prefer these categories in this order:

1. core semantic tokens
2. plugin semantic tokens
3. plugin brand/layout/type tokens
4. feature-specific tokens only when the feature is actually the same

That means:

- prefer `--primary`, `--secondary`, `--tertiary`, `--danger`, `--success`
- then use tokens like `--semantics-text-secondary`
- then use tokens like `--raptive-primary-blue`, `--spacing-s`, `--border-radius-lg`
- only then use feature tokens like `--fkb-bg`

## Handoff Rule

Do not hand off Tailwind classes as the source of truth to Community developers.

Instead use this format:

- Repo implementation: `text-text-secondary`
- Canonical meaning: secondary supporting text
- Community target: `--semantics-text-secondary`
- Status: direct

Another example:

- Repo implementation: `bg-brand`
- Canonical meaning: primary brand fill
- Community target: `--raptive-primary-blue`
- Status: direct

## Important Constraints

Community is not a clean runtime-only token environment.

Keep these constraints explicit in handoff:

- some values are computed in Sass
- some values exist only as runtime CSS variables
- some values are semantic and theme-aware
- some plugin tokens overlap or duplicate each other
- some component behavior is framework-constrained, not token-constrained

## Default Guidance

When a direct token match is unclear:

1. prefer a Community semantic token over a raw color token
2. prefer a plugin token over a hardcoded value
3. call the mapping approximate instead of pretending it is exact
4. note when implementation may require a local component override
