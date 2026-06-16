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
- Preserve component traceability in prototypes and organisms. Base components
  should render `data-ds-component`, `data-ds-variant`, and size when
  applicable. Flow screens may add `data-ds-role` and `data-ds-instance` to
  identify how that base component is being used.
- Treat traceability attributes as review and automation metadata, not styling
  hooks. Do not create trace-only variants or duplicate DOM ids for component
  correlation.
- If a prototype temporarily reimplements a control shape, map it back to the
  closest existing base component and variant with `data-ds-*` attributes. If
  the mapping is unclear, flag the gap instead of guessing.
- Treat detected brand colors as inputs that must be validated before use. The first usable detected color becomes the primary action color, the second becomes the secondary action color, and both must compute black or white foreground text that passes WCAG AA contrast.
- Bound media rails in review surfaces. Production creator-flow screens may use full-height illustration rails, but Component Library pattern examples are stacked review cards and should pass a bounded frame class, such as `illustrationFrameClassName="h-96"`, or use an explicit aspect ratio. Do not let `h-full` side rails inherit the full content height of a long review card.

## Pattern review image rules

Pattern components can expose a frame override for review-only sizing while
keeping their production defaults. Use this when the same pattern needs a tall
side rail in the live creator application but a compact image in the Component
Library Patterns section.

```jsx
<VerificationStep
  showAside={false}
  illustrationFrameClassName="h-96"
  {...reviewProps}
/>
```

For custom preview shells, place the image or video in a stable wrapper:

```jsx
<div className="relative h-96 overflow-hidden">
  <img className="h-full w-full object-cover" />
</div>
```

When verifying image fixes, check both asset loading and layout dimensions. A
successful `naturalWidth` / `naturalHeight` only proves the file loaded; also
confirm the rendered height is intentionally bounded in the review surface.

## Questions to answer before adding a new pattern

- What existing pattern is closest?
- Why is that pattern insufficient?
- Which parts are genuinely new: layout, interaction, data mapping, or visual treatment?
- Should this begin as an exploration instead of a production flow change?
- What should be editable, and what should remain read-only?

## Documentation to add over time

- page-level layout guidance
- motion guidance for screen transitions and loading states
- form-to-preview mapping rules
- archive policy for retired flow screens
