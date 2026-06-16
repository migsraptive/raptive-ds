# Component Or Token Family Name

Intent docs should stay focused on selection guidance, not implementation
details. Do not include CSS classes, Tailwind values, fixed design tokens,
border radius, spacing, typography values, color tokens, or internal styling
instructions.

Save this file as `src/components/ComponentName/intent.md` beside the component
implementation. For token-family guidance, save it as
`src/tokens/token-family.intent.md` beside the token source file.

## Purpose

Describe what this component or token family is for in product and
design-system terms.

## Use When

- List the situations where this component or token family is the right choice.

## Do Not Use When

- List the situations where another component, pattern, or native semantic
  element is more appropriate.
- For token families, list situations where a one-off value or consumer-facing
  token override would violate governance.

## Variants

- Document only variants that exist in the component code.
- Describe the product or design meaning of each variant, not its styling.
- For token-family docs, replace this section with a role section such as
  `## Token Groups`, `## Type Roles`, or another semantic grouping that matches
  the token family.

## Usage Rules

- List constraints that help agents choose and compose the component or token
  family correctly.

## Escalate When

- List the moments when an agent should ask a question or flag design/system
  review instead of guessing.
