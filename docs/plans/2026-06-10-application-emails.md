# Application Emails Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a first-pass application email set that reflects the new creator application onboarding flow.

**Architecture:** Keep this as a design-system artifact, not an email delivery implementation. Store email scenario data in a small module, render it through a reusable `ApplicationEmailSet` pattern, and document the pattern in the Component Library.

**Tech Stack:** React 18, Vite, Tailwind CSS tokens, Lucide React, Node test runner.

---

### Task 1: Add Email Scenario Data

**Files:**
- Create: `src/patterns/ApplicationEmailSet/applicationEmails.js`
- Test: `tests/applicationEmails.test.js`

**Step 1:** Write a failing test that imports `applicationEmailTemplates` and verifies the lifecycle IDs and no approval email implies launch.

**Step 2:** Run `npm run test -- tests/applicationEmails.test.js` and confirm it fails because the module does not exist.

**Step 3:** Add six first-pass email scenarios: verification code, review/resume, submitted, needs more information, approved next step, and not-a-fit.

**Step 4:** Re-run the focused test and confirm it passes.

### Task 2: Render Email Preview Pattern

**Files:**
- Create: `src/patterns/ApplicationEmailSet/ApplicationEmailSet.jsx`
- Modify: `src/pages/ComponentLibrary/ComponentLibrary.jsx`

**Step 1:** Add `ApplicationEmailSet` using existing primitives (`Badge`, `Button`, `SegmentedControl`, `LucideIcon`) and token classes.

**Step 2:** Import the pattern in Component Library and add an `Application Emails` section under Patterns.

**Step 3:** Add/update the structure test so the library documents the pattern.

### Task 3: Verify And Publish

**Files:**
- Modify only files touched by Tasks 1-2.

**Step 1:** Run `npm run test -- tests/applicationEmails.test.js tests/componentLibraryStructure.test.js`.

**Step 2:** Run `npm run build`.

**Step 3:** Run `npm run lint`.

**Step 4:** Start the dev server and smoke-check Component Library and Creator Application in browser with no console errors.

**Step 5:** Commit, push `codex/application-email-first-pass`, and open a PR.
