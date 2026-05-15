# Creator Journey Flow Backlog

## Goal

Implement the actual creator application flow reflected in the customer journey map:

1. `Entry`
2. `URL Input`
3. `Fetch`
4. `Review`
5. `Preview`
6. `Verify`
7. `Submit`

This backlog supersedes the generic creator-onboarding priority order for immediate product work.

## Delivery Constraint

This implementation is `desktop-first`.

That means:

- primary design target is desktop width and desktop interaction density
- preview fidelity on desktop matters more than early mobile completeness
- mobile support can follow after the desktop journey is visually and behaviorally correct
- patterns should still avoid impossible-to-adapt structures, but they do not need to optimize for mobile-first composition yet

## Source Flow

Based on the journey map, the live onboarding is not a broad profile-builder first. It is a tighter recognition-and-confirmation flow with these emotional beats:

1. Curiosity
2. Intentional first action
3. Recognition surprise
4. Trust-risk correction moment
5. Emotional peak through preview
6. Commitment ritual
7. High-confidence completion

That means the next implementation work should optimize for momentum, trust, and perceived intelligence, not generic preference collection.

## Product Principles From The Journey

- One-field first interaction
- Recognition before data entry
- Corrections instead of forms
- Preview as emotional proof
- Verification as commitment, not bureaucracy
- Submission must feel exclusive and final
- Desktop presentation should feel premium, spacious, and deliberate

## Revised Implementation Order

### Wave 1: Core Shared Primitives

These remain foundational and either already exist or are close:

1. `Button`
2. `TextInput`
3. `Textarea`
4. `Select`
5. `Checkbox`
6. `RadioGroup`
7. `OptionTile`
8. `Badge`
9. `Avatar`
10. `StepLayout`

### Wave 2: Flow-Specific Patterns

These are now the highest-priority patterns:

1. `LandingHero`
2. `SingleFieldIntake`
3. `RecognitionState`
4. `ReviewCorrection`
5. `CommunityPreviewCard`
6. `VerificationStep`
7. `SubmissionSuccess`

### Wave 3: Screen Assembly

1. `EntryScreen`
2. `UrlInputScreen`
3. `FetchScreen`
4. `ReviewScreen`
5. `PreviewScreen`
6. `VerifyScreen`
7. `SubmitScreen`

## Screen-By-Screen Breakdown

## 1. Entry

- Stage goal: set tone and reduce perceived effort
- Emotional target: `Curious`
- UX rule: do not present a normal application form yet
- Needed pattern: `LandingHero`

### LandingHero

- Type: `pattern`
- Purpose: explain the value proposition and make the next step feel small
- Required elements:
  - headline
  - subhead
  - primary CTA
  - minimal reassurance copy
  - optional social proof or creator proof
- Acceptance criteria:
  - looks like an invitation, not a generic sign-up wall
  - supports one primary action only
  - preserves the “arrives warm” tone from the journey
  - is designed first for desktop composition and hierarchy

## 2. URL Input

- Stage goal: capture intent with minimal friction
- Emotional target: `Intrigued`
- UX rule: one field only, no obvious long-form application
- Needed pattern: `SingleFieldIntake`

### SingleFieldIntake

- Type: `pattern`
- Purpose: capture one creator URL or social handle
- Dependencies:
  - `TextInput`
  - `Button`
  - optional inline validation state
- Required elements:
  - single prominent field
  - subtle helper copy
  - clear CTA
  - loading state
- Acceptance criteria:
  - feels like a single intentional action, not paperwork
  - supports URL and handle examples
  - has polished pending/loading feedback
  - desktop spacing and focus treatment feel premium, not utilitarian

## 3. Fetch

- Stage goal: prove the system recognizes the creator
- Emotional target: `Surprised`
- UX rule: show momentum and intelligence while avoiding uncanny over-claiming
- Needed pattern: `RecognitionState`

### RecognitionState

- Type: `pattern`
- Purpose: show the system fetching and recognizing creator identity
- Dependencies:
  - `StepLayout`
  - `Avatar`
  - `Badge`
  - loading indicators
- Required elements:
  - loading state
  - recognition reveal
  - fetched logo/image/domain/creator name
  - graceful fallback if confidence is low
- Acceptance criteria:
  - conveys “we found you” quickly
  - supports progressive reveal
  - avoids making uncertain data look final
  - desktop reveal has enough visual drama to reward the wait

## 4. Review

- Stage goal: let the creator correct the system without losing trust
- Emotional target: `Uncertain` but recoverable
- UX rule: corrections should feel easy and contained
- Needed pattern: `ReviewCorrection`

### ReviewCorrection

- Type: `pattern`
- Purpose: present fetched data and allow quick edits
- Dependencies:
  - `StepLayout`
  - `FormField`
  - `TextInput`
  - `Textarea`
  - `Select` if needed
- Required elements:
  - fetched fields
  - editable fields
  - clear explanation of why edits are allowed
  - high-confidence save/continue action
- Acceptance criteria:
  - correction is framed as refinement, not failure
  - edits are fast and low-friction
  - the screen restores trust after ambiguity
  - desktop layout keeps edit controls and context visible without crowding

## 5. Preview

- Stage goal: create the emotional peak
- Emotional target: `Excited`
- UX rule: the preview must feel real enough to want
- Needed pattern: `CommunityPreviewCard`

### CommunityPreviewCard

- Type: `pattern`
- Purpose: show what the creator’s future community or page could look like
- Dependencies:
  - `Card`
  - `Avatar`
  - `Badge`
  - possibly `OptionTile` or content cards
- Required elements:
  - creator identity
  - branded preview frame
  - example content or social proof
  - fast load perception
- Acceptance criteria:
  - feels aspirational without looking fake
  - visually stronger than a wireframe
  - clearly connects current inputs to future output
  - desktop version should be the flagship presentation

## 6. Verify

- Stage goal: turn desire into commitment
- Emotional target: `Committed`
- UX rule: verification should feel like a final handshake, not compliance theater
- Needed pattern: `VerificationStep`

### VerificationStep

- Type: `pattern`
- Purpose: confirm identity or ownership before submission
- Dependencies:
  - `StepLayout`
  - `Button`
  - `TextInput` or verification channel UI
- Required elements:
  - concise explanation
  - verification method
  - progress reassurance
  - continue action
- Acceptance criteria:
  - clearly explains why the step exists
  - preserves the momentum from preview
  - avoids bureaucratic wording and visual heaviness
  - desktop layout should keep explanation and action close together

## 7. Submit

- Stage goal: end on a memorable peak
- Emotional target: `Confident`
- UX rule: the finish should feel exclusive, complete, and worth the wait
- Needed pattern: `SubmissionSuccess`

### SubmissionSuccess

- Type: `pattern`
- Purpose: confirm completion and establish what happens next
- Dependencies:
  - `StepLayout` or a simplified final layout
  - `Button`
  - `Badge`
  - optional `CelebrationModal` language or tone
- Required elements:
  - confirmation headline
  - what happens next
  - optional expectation-setting copy
  - one strong completion state
- Acceptance criteria:
  - feels like a completed application, not just a form receipt
  - explains next steps clearly
  - leaves the creator with confidence, not ambiguity
  - desktop end-state should feel memorable and intentionally composed

## New Priority Queue

This is the recommended order from this point forward.

1. `SingleFieldIntake`
2. `RecognitionState`
3. `ReviewCorrection`
4. `CommunityPreviewCard`
5. `VerificationStep`
6. `SubmissionSuccess`
7. `LandingHero`
8. Assemble `UrlInputScreen`
9. Assemble `FetchScreen`
10. Assemble `ReviewScreen`
11. Assemble `PreviewScreen`
12. Assemble `VerifyScreen`
13. Assemble `SubmitScreen`

## What Moves Down In Priority

These are still useful system assets, but they are not the critical path for the real journey:

- `GoalSelectionGrid`
- `CategoryPicker`
- `AudienceSelection`
- `TagInput`
- broad profile-builder screens

They should now be treated as secondary unless the actual flow introduces them later.

## Suggested Immediate Next Step

Build `SingleFieldIntake` next.

Reason:

- it is the first true product-specific step
- it defines the tone of the whole flow
- it is small enough to implement quickly
- it unlocks the `Fetch` and `Review` stages directly
