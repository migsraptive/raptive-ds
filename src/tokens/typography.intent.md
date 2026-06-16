# Typography

## Purpose

Typography defines semantic text roles for hierarchy, readability, scanning, metadata, labels, utility text, and editorial moments.

## Use When

- Choosing the text hierarchy for a component, pattern, or page section.
- Aligning product copy with a semantic text role instead of a one-off size.
- Reviewing whether text density, emphasis, and scan behavior match the task.
- Pairing text color roles with typography roles for readable hierarchy.

## Do Not Use When

- A consuming surface wants to resize or restyle text inside a component.
- A visual request depends on one-off font size, weight, line-height, or letter-spacing overrides.
- Typography is being used as decoration without a clear information hierarchy.
- A component already owns the text treatment for its state, label, helper text, or content slot.

## Type Roles

- Hero: largest editorial or first-impression message.
- Display: major page or product surface title.
- Heading: section structure and scannable hierarchy.
- Body: primary readable content and ordinary product copy.
- Label: field labels, helper context, metadata, badges, and compact UI text.
- Mono: utility identifiers, technical references, and token labels.

## Usage Rules

- Choose typography by content role and hierarchy, not visual preference.
- Let components own their internal typography.
- Consumers may arrange text components and content, but may not override internal type styling.
- Do not expose font family, font size, weight, line-height, letter-spacing, or typography token overrides as consumer-facing APIs.
- Do not use low-emphasis text roles where accessibility or form comprehension requires stronger contrast.
- Keep paired icons aligned to the label line-height when an icon sits inline with text.

## Escalate When

- No existing type role matches the information hierarchy.
- A layout cannot support the required copy length without truncation, overlap, or unclear hierarchy.
- A request requires arbitrary type values or component-internal overrides.
- A new product pattern needs a repeated text treatment that may deserve a semantic role.
