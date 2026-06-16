# Design System Governance

This governance model keeps design-system guidance small enough for AI agents to
use with minimal context while leaving implementation details in the component
source.

## Current Documentation Map

Use these files as the design-system source map:

| layer | location | purpose |
|---|---|---|
| Global agent rules | `AGENTS.md` | Rules all AI agents must follow before selecting, composing, or changing components. |
| Governance model | `docs/design-system-governance.md` | How intent docs, code, YAML contracts, and token files work together. |
| Intent template | `docs/component-intent-template.md` | Starting point for lean component and token intent docs. |
| Component implementation | `src/components/ComponentName/ComponentName.jsx` | Source of truth for props, state behavior, accessibility wiring, slots, and internal styling. |
| Component intent docs | `src/components/ComponentName/intent.md` | Selection guidance, usage rules, and escalation triggers for agents, designers, PMs, and engineers. |
| Token implementation | `src/tokens/*.js` | Source of truth for token values and exports consumed by Tailwind and application code. |
| Token intent docs | `src/tokens/*.intent.md` | Selection guidance for token families without duplicating fixed token values. |
| Component contracts | `design/components/*.yml` | Machine-readable component contract metadata aligned to the same black-box governance rules. |
| Rendered review surface | `src/pages/ComponentLibrary/ComponentLibrary.jsx` | Internal design review surface that renders examples and colocated intent guidance. |

## Current Intent Docs

The current pilot coverage is:

| area | intent doc | rendered in Component Library |
|---|---|---|
| Button | `src/components/Button/intent.md` | Buttons section |
| Forms | `src/components/FormField/intent.md` | Forms section |
| Colors | `src/tokens/colors.intent.md` | Colors section |
| Typography | `src/tokens/typography.intent.md` | Typography section |

Spacing and effects are still implementation-only token families at
`src/tokens/spacing.js` and `src/tokens/effects.js`. Add intent docs for them
only when the Component Library needs selection guidance for those token
families.

## Model

- Component intent lives in colocated markdown at `src/components/ComponentName/intent.md`.
- Token intent lives in colocated markdown at `src/tokens/token-family.intent.md`.
- Implementation lives in code.
- Global constraints live in `AGENTS.md`.
- Component contract metadata lives in `design/components/*.yml`.
- Components are black boxes.
- Agents should read intent docs first, then code only when implementation
  details are needed.
- Design tokens and fixed styling values should not be exposed as
  consumer-facing contract options.
- If visual variation is needed, prefer a named semantic variant over token
  overrides.
- Missing guidance should be surfaced as ambiguity, not guessed.

## React API Compatibility

The governance model does not require breaking existing React APIs. A prop can
exist in implementation without becoming a design-system styling contract.

Compatibility props should be documented as restricted when they exist:

- `className` may support legacy compatibility or outside layout hooks, but it
  must not be used to override component-owned visual styling.
- `style` may support controlled CSS custom properties or measured runtime
  values, but it must not become an arbitrary styling API.
- Pass-through props may support accessibility, form behavior, ids, native
  attributes, and data attributes.

Restricted compatibility props are not a substitute for semantic variants. If a
consumer needs a visual difference that changes product meaning, propose a named
variant for design-system review.

## Documentation Responsibilities

Intent docs answer selection questions:

- Should this component be used?
- Which variant communicates the right product meaning?
- What should consumers avoid?
- When should an agent ask for design or system review?

Intent docs should live beside the component source so agents can inspect a
single component folder for both selection guidance and implementation details.
For example, Button intent lives at `src/components/Button/intent.md` and Button
implementation lives at `src/components/Button/Button.jsx`.

Token intent docs answer token-family selection questions:

- When should this token family guide a design or implementation choice?
- Which semantic group or role should be considered first?
- What should consumers avoid?
- When should a new token, role, or semantic group be reviewed?

Token intent docs should live beside token source files. For example, color
intent lives at `src/tokens/colors.intent.md` and color implementation lives at
`src/tokens/colors.js`.

Component code answers implementation questions:

- Which props exist?
- How states are rendered.
- Which native element or library primitive is used.
- How styling, motion, accessibility wiring, and internal structure work.

Token code answers implementation questions:

- Which token values exist.
- Which aliases are exported.
- How token families map into Tailwind, CSS custom properties, or runtime
  utilities.
- Which fallback values or compatibility aliases exist.

YAML contracts answer machine-readable contract questions:

- Which component variants, states, slots, and usage constraints are public.
- Which props are semantic contract options.
- Which compatibility props exist but should not be treated as styling
  contract options.
- Which governance warnings should be surfaced to agents.

## Component Library Rendering

The Component Library is the rendered review surface for this governance model.
It should show examples and intent guidance together:

- Buttons use a component intent rail beside action, composition, size, and state
  examples.
- Forms split intent guidance by proximity: decision guidance first, control
  families beside text fields, usage rules beside field and selection controls,
  and escalation guidance beside brand and choice patterns.
- Colors render token swatches beside token-family guidance.
- Typography places decision, role, usage, and escalation guidance beside the
  relevant type examples and reference values.

When adding documentation for another component or token family, keep the same
principle: put selection guidance close to the examples it governs.

## Acceptance Criteria

A component intent doc is complete when an agent can answer:

- Should I use this component?
- Which variant should I use?
- When should I not use it?
- When do I need design/system review?

A component intent doc is too detailed if it includes:

- CSS classes
- Tailwind values
- Radius values
- Padding/spacing values
- Typography scale values
- Color tokens
- Internal component structure

A token intent doc is complete when an agent can answer:

- Should I use this token family to make this decision?
- Which semantic role or group should I consider?
- When should I not introduce a one-off value?
- When does the token model need design/system review?

A token intent doc is too detailed if it includes:

- Hex values
- Tailwind classes
- Pixel/rem token values
- Component internals
- Implementation aliases that are already clear in code

## Review Standard

When a component needs new behavior, first decide whether the change is semantic
or cosmetic. Semantic differences may become named variants after design-system
review. Cosmetic differences should not become consumer overrides.

If an agent cannot determine the correct component or variant from the intent
doc, the correct behavior is to ask a question or flag the gap for review.
