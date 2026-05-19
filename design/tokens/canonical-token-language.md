# Canonical Token Language

This document defines the shared token vocabulary agents should use when translating design specs into implementation-specific systems.

The token names here are not required to be literal CSS custom properties. They describe intent. Each target implementation maps them to its own technical token names.

## Principles

- Use semantic token meaning in specs, not Tailwind utility names.
- Prefer product intent over raw color names.
- Keep implementation-specific variables out of design specs.
- Mark approximate mappings honestly instead of pretending every token has a one-to-one target.

## Starting Categories

### Color

```text
color.surface.default
color.surface.raised
color.surface.sunken
color.surface.overlay
color.text.primary
color.text.secondary
color.text.tertiary
color.text.placeholder
color.text.inverse
color.action.primary
color.action.primary.hover
color.action.secondary
color.action.danger
color.border.default
color.border.strong
color.border.focus
color.status.success
color.status.warning
color.status.error
color.status.info
```

### Spacing

```text
spacing.xxxs = 2px
spacing.xxs = 4px
spacing.xs = 8px
spacing.s = 16px
spacing.m = 24px
spacing.l = 32px
spacing.xl = 48px
spacing.xxl = 64px
spacing.xxxl = 96px
spacing.xxxxl = 128px
```

### Radius

```text
radius.sm = 8px
radius.md = 12px
radius.lg = 16px
radius.xl = 24px
radius.xxl = 32px
radius.pill = fully rounded capsule
radius.circle = circular media/avatar shape
```

### Typography

```text
type.label.sm
type.label.md
type.label.lg
type.body
type.heading.2
type.heading.1
type.display
type.hero
```

### Elevation And Motion

```text
elevation.1
elevation.2
elevation.3
motion.duration.fast
motion.duration.base
motion.duration.slow
motion.easing.standard
motion.easing.emphasized
```

## Implementation Notes

In `community-ds`, these concepts map to JS token exports and Tailwind aliases.

In `cafemedia/community`, these concepts map to Discourse core variables and Raptive plugin variables. For example, `color.action.primary` may map to `--raptive-primary-blue` in branded surfaces or `--tertiary` in framework-native Discourse surfaces.
