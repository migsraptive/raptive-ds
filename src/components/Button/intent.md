# Button

## Purpose

Button triggers an action. Use it when the user is doing something in the
current experience, such as submitting, confirming, saving, opening a controlled
surface, or starting a process.

## Use When

- The user is taking an action instead of moving to another page or resource.
- The action needs clear priority in the current decision area.
- The action can have disabled, loading, or completed states.
- A flow step needs an explicit submit, continue, confirm, or final action.

## Do Not Use When

- The element navigates to another destination and a link is semantically
  correct.
- The user is selecting a persistent option; use a selection component instead.
- The UI needs a one-off visual treatment that is not represented by a named
  semantic variant.
- The request requires changing radius, spacing, typography, color, or token
  values from a consuming surface.

## Variants

- `primary`: Highest-emphasis action. Use for major entry points or the most
  important action in a viewport.
- `secondary`: Standard action for progression, alternatives, and supporting
  choices.
- `ghost`: Low-emphasis action where surrounding layout already provides enough
  structure.
- `danger`: Destructive or high-risk action.
- `black`: Special high-emphasis treatment for brand-forward or editorial
  moments already approved by the system.
- `link`: Button behavior with link-like emphasis for inline actions that are
  not navigation.
- `previewBrand`: Brand-preview action using validated dynamic brand colors.
- `previewAccent`: Supporting brand-preview action using validated dynamic brand
  colors.

## Usage Rules

- Only one primary button should be visible per viewport.
- Inside flows, use secondary buttons for progression unless there is a clear
  final or confirming action.
- Do not use buttons for navigation when a link is semantically correct.
- Do not expose or request radius, spacing, typography, color, or token
  overrides.
- Only true semantic variants should become part of the documented contract.
- Styling differences should become named variants only when they represent a
  meaningful product or design distinction.
- Consumers may position a Button from the outside, but may not style its
  internals.
- Button renders its own traceability identity with `data-ds-component="Button"`,
  the selected `data-ds-variant`, and the selected `data-ds-size`.
- Flow screens may add `data-ds-role` or `data-ds-instance` to clarify the
  button's job in an organism, but those attributes do not change the Button
  variant.

## Escalate When

- No existing variant matches the intended product meaning.
- More than one primary action appears necessary in the same viewport.
- A consuming surface wants to override visual details owned by Button.
- A requested style change is cosmetic rather than semantic.
- The action behaves like navigation, selection, or disclosure instead of a
  button action.
- A prototype button cannot be mapped back to an existing Button variant.
