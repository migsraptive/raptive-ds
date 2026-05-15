# Creator Onboarding Component Backlog

## Goal

Build the creator onboarding UI from the design system outward, prioritizing reusable components before screen-specific assembly.

The ordering principle is:

1. Highest reuse first
2. Shared primitives before composites
3. Composites before full screens
4. Exact Figma parity where it improves consistency
5. Normalization where Figma variants are duplicative or overfit

## Scope

This backlog is for the `creator onboarding` flow specifically, but each item should be implemented so it can survive outside that flow when the product expands.

## Implementation Waves

### Wave 1: Foundations

These should be verified before adding more components.

- Tokens
  - Status: mostly in place
  - Notes: continue tightening 1:1 parity with exported Figma tokens where practical
- Layout rules
  - Define max content widths, step container spacing, mobile behavior, and vertical rhythm
- Interaction rules
  - Define focus styles, disabled states, loading states, and error presentation

### Wave 2: Shared Primitives

These components should be built to support most creator onboarding screens.

1. `FormField`
2. `Button`
3. `TextInput`
4. `Textarea`
5. `Select`
6. `Checkbox`
7. `RadioGroup`
8. `OptionTile`
9. `ProgressIndicator`
10. `Card`
11. `Avatar`
12. `ImageUpload`
13. `Modal`

### Wave 3: Creator Onboarding Composites

These should compose the primitives without introducing new low-level styling patterns.

1. `StepLayout`
2. `StepHeader`
3. `StepFooter`
4. `CategoryPicker`
5. `GoalSelectionGrid`
6. `AudienceSelection`
7. `TagInput`
8. `ProfilePreviewCard`
9. `ReviewSummary`
10. `SuccessPanel`

### Wave 4: Screen Assembly

Assemble the flow from the shared composites.

1. Welcome
2. Profile Basics
3. Category and Niche Selection
4. Goals and Preferences
5. Audience or Community Setup
6. Profile Review
7. Completion

### Wave 5: Parity and Polish

- Figma comparison pass
- Responsive QA
- Keyboard navigation QA
- Empty, loading, and error state QA
- Visual normalization pass across all onboarding screens

## Backlog Order

This is the recommended implementation order for the first pass.

1. `FormField`
2. `Button`
3. `TextInput`
4. `Textarea`
5. `Select`
6. `Checkbox`
7. `RadioGroup`
8. `OptionTile`
9. `ProgressIndicator`
10. `Card`
11. `Avatar`
12. `ImageUpload`
13. `StepLayout`
14. `StepHeader`
15. `CategoryPicker`
16. `GoalSelectionGrid`
17. `TagInput`
18. `ProfilePreviewCard`
19. `ReviewSummary`
20. `SuccessPanel`

## Component Intake Template

Use this template before implementing each item.

### Name

Component name

### Type

`primitive`, `pattern`, or `screen`

### Used On Screens

List the creator onboarding screens that use it.

### Purpose

State the job this component does in the flow.

### Variants

List visual or semantic variants.

### States

List default, hover, focus, active, disabled, loading, error, selected, and empty states as applicable.

### Responsive Differences

Describe any desktop and mobile changes.

### Dependencies

List the lower-level components or tokens it depends on.

### Accessibility Notes

Document label behavior, keyboard support, announcements, semantics, and focus handling.

### Parity Target

Mark one:

- `exact`
- `normalized`
- `intentional deviation`

### Acceptance Criteria

Define what must be true before the item is considered done.

## Ticket-Sized Backlog

## 1. FormField

- Type: `primitive`
- Used on screens: Profile Basics, Goals, Audience, Review
- Purpose: Standard wrapper for label, hint text, required indicator, error text, and control spacing
- Variants: default, required, optional, invalid
- States: default, focused child, error, disabled child
- Dependencies: typography, spacing, colors
- Accessibility notes: connect label, hint, and error via `htmlFor`, `aria-describedby`, `aria-invalid`
- Parity target: `normalized`
- Acceptance criteria:
  - wraps input controls consistently
  - supports label, description, and inline error copy
  - renders required and optional states without custom per-screen markup

## 2. Button

- Type: `primitive`
- Used on screens: all
- Purpose: Primary action, secondary action, tertiary action, back, continue, submit
- Variants: primary, secondary, ghost, link, destructive if needed
- States: default, hover, active, focus, disabled, loading
- Dependencies: tokens
- Accessibility notes: loading state should preserve accessible name
- Parity target: `exact`
- Acceptance criteria:
  - all current design variants exist
  - supports icon slots if Figma uses them
  - no step creates bespoke button styling

## 3. TextInput

- Type: `primitive`
- Used on screens: Profile Basics, Review edits
- Purpose: Single-line text entry for name, handle, headline, and similar fields
- Variants: default, invalid
- States: default, focus, filled, disabled, error
- Dependencies: FormField
- Accessibility notes: proper label wiring and error semantics
- Parity target: `exact`
- Acceptance criteria:
  - matches token spacing and radius
  - supports prefix and suffix content only if Figma needs it
  - visual error state is consistent with all other fields

## 4. Textarea

- Type: `primitive`
- Used on screens: Bio, About Creator
- Purpose: Multi-line description input
- Variants: default, invalid
- States: default, focus, disabled, error
- Dependencies: FormField
- Accessibility notes: label and description behavior mirrors TextInput
- Parity target: `exact`
- Acceptance criteria:
  - sizing and spacing match the field system
  - line-height and placeholder styling match tokens

## 5. Select

- Type: `primitive`
- Used on screens: Category and Niche, Audience, Preferences
- Purpose: Controlled choice input for structured options
- Variants: default, invalid
- States: default, open, selected, disabled, error
- Dependencies: FormField, Button or popover primitives if needed
- Accessibility notes: native select first unless custom behavior is required by Figma
- Parity target: `normalized`
- Acceptance criteria:
  - prefer native semantics unless design requires searchable/custom menu
  - option presentation matches the rest of the form system

## 6. Checkbox

- Type: `primitive`
- Used on screens: Preferences, consents
- Purpose: Multi-select and consent choices
- Variants: unchecked, checked, indeterminate if needed
- States: default, hover, focus, disabled, error
- Dependencies: FormField
- Accessibility notes: native input semantics preserved
- Parity target: `exact`
- Acceptance criteria:
  - keyboard and screen reader behavior are correct
  - label hit area is generous on mobile

## 7. RadioGroup

- Type: `primitive`
- Used on screens: Goal selection, audience selection where single choice is required
- Purpose: Single-select option set
- Variants: vertical, horizontal if needed
- States: default, selected, hover, focus, disabled
- Dependencies: FormField
- Accessibility notes: correct group labeling and roving focus or native semantics
- Parity target: `exact`
- Acceptance criteria:
  - renders a clearly labeled single-choice group
  - selected state is obvious without relying on color alone

## 8. OptionTile

- Type: `primitive`
- Used on screens: Goals, Audience, Category selection
- Purpose: Card-like selectable option used repeatedly across onboarding
- Variants: default, selected, multi-select, single-select, with icon, with description
- States: default, hover, focus, selected, disabled
- Dependencies: Card, typography, spacing
- Accessibility notes: should be built on button or input semantics, not clickable divs
- Parity target: `normalized`
- Acceptance criteria:
  - one reusable selectable tile replaces bespoke per-screen option cards
  - selected and focused states are clearly distinct

## 9. ProgressIndicator

- Type: `primitive`
- Used on screens: all step-based onboarding screens
- Purpose: Show current progress and remaining steps
- Variants: compact, full
- States: current, complete, upcoming
- Dependencies: tokens
- Accessibility notes: progress announced semantically where appropriate
- Parity target: `normalized`
- Acceptance criteria:
  - works on mobile and desktop
  - supports total steps and current step as props

## 10. Card

- Type: `primitive`
- Used on screens: broadly reused
- Purpose: Base container for grouped content
- Variants: default, raised, selected, outlined
- States: default, hover if interactive, selected
- Dependencies: tokens
- Accessibility notes: interactive cards must expose interactive semantics
- Parity target: `normalized`
- Acceptance criteria:
  - all onboarding panels use shared card styles
  - spacing and radius come from the token system only

## 11. Avatar

- Type: `primitive`
- Used on screens: Profile Basics, Review, Success
- Purpose: Represent creator identity visually
- Variants: initials, uploaded image, placeholder
- States: default, with badge or status only if design requires it
- Dependencies: tokens
- Accessibility notes: avatar image alt handling should be intentional
- Parity target: `exact`
- Acceptance criteria:
  - matches onboarding identity preview needs
  - works cleanly with ImageUpload

## 12. ImageUpload

- Type: `primitive`
- Used on screens: Profile Basics
- Purpose: Upload avatar or creator profile image
- Variants: empty, uploaded, replacing, error
- States: idle, dragover if supported, uploading, success, error
- Dependencies: Button, Avatar, FormField
- Accessibility notes: file input must remain accessible and keyboard-triggerable
- Parity target: `normalized`
- Acceptance criteria:
  - supports preview, replace, and remove
  - integrates cleanly with Avatar preview

## 13. StepLayout

- Type: `pattern`
- Used on screens: all
- Purpose: Shared shell for creator onboarding steps
- Variants: standard, review, success
- States: loading only if the flow needs it
- Dependencies: ProgressIndicator, StepHeader, StepFooter
- Accessibility notes: preserve heading hierarchy and landmarks
- Parity target: `normalized`
- Acceptance criteria:
  - all onboarding screens share one shell
  - spacing and width are consistent across the flow

## 14. StepHeader

- Type: `pattern`
- Used on screens: all
- Purpose: Step title, description, optional supporting badge or eyebrow
- Variants: default, compact
- States: static
- Dependencies: typography, spacing
- Accessibility notes: step title should be the page heading when appropriate
- Parity target: `exact`
- Acceptance criteria:
  - no screen invents its own heading block

## 15. CategoryPicker

- Type: `pattern`
- Used on screens: Category and Niche Selection
- Purpose: Allow creators to choose categories and possibly subcategories
- Variants: single-select or multi-select based on flow definition
- States: default, selected, filtered, empty search if needed
- Dependencies: OptionTile, Select, TagInput if chips are used
- Accessibility notes: selected state and keyboard interaction must be explicit
- Parity target: `normalized`
- Acceptance criteria:
  - handles the full category choice interaction from the design
  - no duplicated logic across category-related screens

## 16. GoalSelectionGrid

- Type: `pattern`
- Used on screens: Goals and Preferences
- Purpose: Reusable grid for choosing creator goals
- Variants: single-select, multi-select
- States: default, selected, disabled
- Dependencies: OptionTile
- Accessibility notes: use fieldset or grouped semantics
- Parity target: `exact`
- Acceptance criteria:
  - powered entirely by shared selectable tile components

## 17. TagInput

- Type: `pattern`
- Used on screens: niche tags, interests, topics
- Purpose: Enter or manage a short list of tags
- Variants: freeform, suggested options
- States: empty, focused, with tags, invalid
- Dependencies: TextInput, Badge
- Accessibility notes: removable tags must be keyboard accessible
- Parity target: `normalized`
- Acceptance criteria:
  - chip add/remove behavior is consistent
  - no custom one-off tag UI per screen

## 18. ProfilePreviewCard

- Type: `pattern`
- Used on screens: Profile Basics, Review, Success
- Purpose: Show a live preview of the creator profile using entered data
- Variants: compact, full
- States: partial data, complete data
- Dependencies: Avatar, Card, typography
- Accessibility notes: preview content must not confuse form navigation order
- Parity target: `exact`
- Acceptance criteria:
  - reflects current form state
  - can be reused in review and completion states

## 19. ReviewSummary

- Type: `pattern`
- Used on screens: Profile Review
- Purpose: Summarize all chosen values before submit
- Variants: editable sections if the flow supports jump-back editing
- States: complete, incomplete warnings if needed
- Dependencies: Card, StepLayout, Button
- Accessibility notes: section headings and edit actions must be clear
- Parity target: `normalized`
- Acceptance criteria:
  - presents one consistent review screen structure

## 20. SuccessPanel

- Type: `pattern`
- Used on screens: Completion
- Purpose: Completion confirmation and next-step guidance
- Variants: standard, celebratory
- States: static
- Dependencies: Button, CelebrationModal or related feedback pattern if reused
- Accessibility notes: completion heading and CTA order should be clear
- Parity target: `exact`
- Acceptance criteria:
  - supports the final completion state without bespoke styling

## Delivery Rules

- No screen-specific styling before checking whether the pattern belongs in a shared primitive or composite
- No direct hex values or hard-coded spacing in components
- No clickable non-semantic containers for selections when button, checkbox, or radio semantics fit
- Every new component should land with a parity example in the component library
- Every composite should declare which primitives it depends on

## Suggested Next Move

Start implementation with these five items in order:

1. `FormField`
2. `TextInput`
3. `Textarea`
4. `Select`
5. `OptionTile`

That set unlocks most onboarding form construction while keeping the system coherent.
