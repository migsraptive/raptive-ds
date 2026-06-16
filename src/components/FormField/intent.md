# Forms

## Purpose

Forms collect, validate, confirm, or refine creator-provided information through accessible field, choice, upload, and progressive editor controls.

## Use When

- A user needs to enter, edit, select, confirm, or review information.
- A workflow needs visible labels, helper text, error feedback, optional or required markers, and accessible control state.
- A screen needs a consistent field family rather than one-off native controls.
- A choice set needs a clear selection model such as single choice, multi choice, consent, or inline detail.

## Do Not Use When

- The interaction is navigation, disclosure, or a command; use the semantically correct component instead.
- A consuming surface wants to restyle component internals.
- A pattern can reuse an existing form primitive but asks for a custom native control.
- The request depends on hiding labels, relying on placeholder text as the only instruction, or using color alone for validation.

## Control Families

- Text inputs: short single-line values such as names, handles, emails, and URLs.
- Textareas: longer freeform content where multiple lines are expected.
- Selects: compact single-choice menus from a known option list.
- Checkboxes: independent consent, opt-in, or multi-select decisions.
- Radio groups: one required choice from a small visible set.
- Option tiles: richer choices that need descriptions, icons, selection animation, or inline detail.
- Color and upload inputs: brand, theme, and asset collection with preview or confirmation.
- Field wrappers: custom controls that still need shared label, helper, and error behavior.

## Usage Rules

- Always provide a visible label for user-editable controls.
- Prefer component-owned label, helper, error, disabled, read-only, required, and optional props over custom adjacent markup.
- Choose the control by the decision model, not by visual preference.
- Let form components own their internal spacing, borders, icons, and state styling.
- Consumers may arrange fields in a layout but may not target or restyle field internals.
- Pair validation with clear text feedback, not color alone.
- Use existing form primitives inside patterns before creating new controls.

## Escalate When

- No existing control matches the interaction model.
- A workflow needs a new validation, masking, formatting, or async-detection pattern.
- A consuming surface needs to alter internal control structure or state styling.
- Labels, helper text, error feedback, or accessibility relationships are unclear.
- A repeated form pattern appears across flows and may need a named composite pattern.
