# Design System Usage Guide

## Purpose

This guide gives contributors and agents a practical way to work inside the design system without introducing unnecessary new patterns.

## Default approach

When building something new:

1. Start by checking whether a current pattern already solves most of the problem.
2. Reuse components and pattern structure before creating new variants.
3. Extend existing patterns only when the new behavior is clearly compatible.
4. Create a new pattern only when the interaction model or layout is materially different.

## Use the system in this order

1. Tokens
   Colors, typography, spacing, radius, and elevation should come from the existing token layer.
2. Components
   Prefer base components like buttons, inputs, fields, badges, and layout shells.
3. Patterns
   Use patterns when the UI already has an established composition in the system. Patterns should compose library components rather than define their own native controls.
4. Explorations
   New ideas should land as explorations before they replace live flow screens.

## Working rules

- Match the current visual language before introducing a new one.
- Keep interaction changes grounded in real user flow needs.
- Avoid decorative motion that does not communicate state or progression.
- Prefer editable previews over disconnected form-only screens when the user benefits from immediate feedback.
- Archive displaced concepts instead of deleting them when they may still be useful references.
- Do not hand-roll native `button`, `input`, `textarea`, or `select` controls inside patterns. Promote new interactive controls to `src/components` first, add them to the component library, and then compose them from patterns.
- Treat detected brand colors as inputs that must be validated before use. The first usable detected color becomes the primary action color, the second becomes the secondary action color, and both must compute black or white foreground text that passes WCAG AA contrast.

## Questions to answer before adding a new pattern

- What existing pattern is closest?
- Why is that pattern insufficient?
- Which parts are genuinely new: layout, interaction, data mapping, or visual treatment?
- Should this begin as an exploration instead of a production flow change?
- What should be editable, and what should remain read-only?

## Documentation to add over time

- page-level layout guidance
- sidebar image usage rules
- motion guidance for screen transitions and loading states
- form-to-preview mapping rules
- archive policy for retired flow screens
