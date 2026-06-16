# Colors

## Purpose

Colors define the semantic palette for Community Design System surfaces, text, borders, actions, status, brand expression, and reward moments.

## Use When

- Choosing product UI color for a component or pattern.
- Mapping design variables to code through semantic color roles.
- Communicating state, feedback, emphasis, or hierarchy where an existing component expects a token-backed color.

## Do Not Use When

- A one-off custom color is requested for a single screen.
- You are trying to restyle a component internal.
- Color alone is the only way meaning is communicated.
- A component already owns the color for its state or variant.

## Token Groups

- Brand: identity accents and brand-led emphasis.
- Action: primary action backgrounds and interaction states.
- Surface: app backgrounds, raised areas, overlays, and inverted surfaces.
- Text: readable content hierarchy, placeholder, disabled, inverse, and brand text.
- Border: default, subtle, strong, and focus boundaries.
- Status: success, warning, error, and info feedback.
- Gamification: achievements, streaks, celebrations, and reward states.

## Usage Rules

- Prefer semantic color roles over primitive palette values.
- Use `action.primary` for primary actions rather than a brand color.
- Let components own their internal color choices.
- Consumers may compose colored components but may not override internal fills, strokes, text, or borders.
- Pair color with text, iconography, or state labels when meaning matters.
- Keep detected or dynamic brand colors behind approved preview variables and contrast checks.

## Escalate When

- A color need cannot be represented by an existing semantic group.
- A component requires a new color-bearing variant.
- A detected brand color fails contrast or creates unclear action hierarchy.
- A request depends on exposing token overrides as consumer-facing API.
