# Desktop Onboarding Viewport Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a separate component-library prototype for a non-modal desktop creator onboarding viewport.

**Architecture:** Introduce `CreatorOnboardingViewportShell` as a presentation shell that accepts the same header, content, footer, tone, and aside inputs as the existing shell. Wire it into `ComponentLibrary.jsx` using the existing creator shell preview state so the prototype can be compared without touching the live creator application.

**Tech Stack:** React 18 JSX, Tailwind CSS v3 token classes, Motion, existing Raptive design-system primitives.

---

### Task 1: Add Viewport Shell

**Files:**
- Create: `src/patterns/CreatorOnboardingViewportShell/CreatorOnboardingViewportShell.jsx`

**Steps:**
- Build a shell component with props for `title`, `description`, `contentKey`, `tone`, `aside`, `footer`, `children`, and optional class overrides.
- Use a full-height grid with a left content area and a right `360px` media rail.
- Keep header in a top-aligned center column.
- Keep footer in a bottom-aligned action bar.
- Reuse `AnimatePresence`, `motion`, `useReducedMotion`, and `Badge` patterns from `CreatorOnboardingShell`.

### Task 2: Wire Component Library Preview

**Files:**
- Modify: `src/pages/ComponentLibrary/ComponentLibrary.jsx`

**Steps:**
- Import `CreatorOnboardingViewportShell`.
- Add a new Patterns section after the existing `Creator Onboarding Shell`.
- Reuse the existing segmented preview state, body content, media rail, and footer controls.
- Keep the current `CreatorOnboardingShell` section unchanged.

### Task 3: Verify

**Commands:**
- Run `npm run build`.
- Run `npm run lint`.
- Smoke check the Component Library Patterns section and Creator Application page in browser.

**Expected:**
- Build succeeds.
- Lint exits with 0 errors and 0 warnings.
- Existing onboarding and the new viewport prototype render without console errors.
