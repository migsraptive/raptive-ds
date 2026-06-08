# Desktop Onboarding Viewport Design

## Goal

Explore a desktop creator onboarding version that does not feel contained by a modal. The prototype keeps the existing illustration/media rail, but moves the question, body, and actions into a page-like viewport layout.

## Direction

The new version should live alongside the existing onboarding shell in the component library. It should not overwrite the live creator application flow.

The layout uses a full-height desktop canvas with a centered content column on the left and a full-height media rail on the right. The question area stays anchored near the top of the viewport. The step body occupies the flexible middle region. The back and primary action group stays anchored at the bottom of the viewport and aligns with the content column.

## Constraints

- Keep the right-side illustration/media rail for this version.
- Defer the alternate "image above headline" one-column variant.
- Compose existing primitives and pattern content.
- Avoid changing `CreatorApplicationPage.jsx` until the prototype direction feels right.
- Use token-backed Tailwind classes and existing design-system components.

## Acceptance Criteria

- A separate viewport onboarding prototype appears in the Component Library Patterns section.
- The existing `CreatorOnboardingShell` preview remains available.
- The new prototype removes the modal/card container feeling.
- Header/question content is visually anchored at the top.
- Actions are anchored to the bottom of the viewport.
- Media rail remains visible on desktop.
