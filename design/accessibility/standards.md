# Accessibility Standards

These standards apply to every component spec in this design system.

## Baseline

- Interactive elements must be keyboard reachable.
- Native HTML controls are preferred where possible.
- Visible focus states are required.
- Disabled, loading, selected, expanded, and invalid states must be exposed to assistive technology when relevant.
- Text alternatives are required for meaningful icons and images.
- Decorative icons must be hidden from assistive technology.
- Component specs must identify the accessible name source for icon-only controls.

## Forms

- Inputs must have a programmatic label.
- Error text must be linked to the control.
- Required and optional states must not rely on color alone.
- Placeholder text is not a replacement for a label.

## Buttons

- Buttons must use native button behavior unless they are links.
- Loading buttons should expose busy state.
- Icon-only buttons require an accessible label.
- Button text should remain visible unless the icon has an explicit accessible label.

## Detected Brand Colors

- The first detected brand color is the primary action color.
- The second detected brand color is the secondary action color.
- Text rendered on detected brand colors must pass WCAG AA contrast for normal text, minimum 4.5:1.
- Use white text on dark detected colors and black text on bright detected colors, based on computed contrast rather than visual guesswork.
- If a detected color cannot produce accessible foreground contrast, do not use it for action backgrounds; fall back to the system action token and flag the palette for manual review.
- Labels displayed directly on swatches must use the same foreground contrast rule.
- User-entered hex overrides follow the same rules as detected colors and must recompute foreground text immediately.

## Dialogs

- Dialogs must have a title.
- Dialogs must identify modal behavior.
- Escape and outside-click dismissal rules must be documented.
- Focus handling must be implemented by the target framework, not recreated from scratch unless the framework lacks a primitive.

## Validation Target

For the Community monolith, generated components should pass lint and QUnit coverage for accessibility-critical behavior. Complex flows should also get Playwright coverage once the first proof works.
