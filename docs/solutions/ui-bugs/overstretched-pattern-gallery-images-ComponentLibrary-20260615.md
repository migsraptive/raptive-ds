---
module: Component Library
date: 2026-06-15
problem_type: ui_bug
component: documentation
symptoms:
  - "Images in the Component Library Patterns section appeared broken after verification-flow changes"
  - "Pattern illustration rails rendered 641-758px tall in stacked review cards"
  - "Browser image checks showed naturalWidth and naturalHeight were valid, but rendered heights were too large"
root_cause: logic_error
resolution_type: code_fix
severity: medium
tags: [component-library, patterns, images, layout, review-surface]
---

# Troubleshooting: Overstretched Pattern Gallery Images

## Problem

Images in the Component Library Patterns section looked broken even though the
asset files were present and loading. The problem affected stacked pattern
review examples, not the image URLs themselves.

## Environment

- Module: Component Library
- Affected Component: `src/pages/ComponentLibrary/ComponentLibrary.jsx`
- Related patterns:
  - `src/patterns/SingleFieldIntake/SingleFieldIntake.jsx`
  - `src/patterns/DataGatheringReview/DataGatheringReview.jsx`
  - `src/patterns/VerificationStep/VerificationStep.jsx`
  - `src/patterns/SubmissionSuccess/SubmissionSuccess.jsx`
- Date: 2026-06-15

## Symptoms

- Pattern images appeared broken or visually blown out in the Patterns section.
- Browser checks showed every image had valid `naturalWidth` and `naturalHeight`.
- The rendered heights were the actual failure:
  - `SingleFieldIntake`: 720px
  - `DataGatheringReview`: 641px
  - `VerificationStep`: 737-758px
  - `SubmissionSuccess`: 720px

## What Didn't Work

**Checking only asset URLs**
- **Why it failed:** The assets were not missing. Dev and production preview both
  emitted and loaded the hashed images correctly.

**Checking only console errors**
- **Why it failed:** There were no network or console errors. The issue was a
  layout regression caused by container sizing.

## Solution

Add a review-only illustration frame override to pattern components that need
full-height production rails, then pass a bounded frame from the Component
Library Patterns examples.

```jsx
// Pattern component default keeps production behavior.
const illustrationFrameClasses =
  illustrationFrameClassName ?? (showAside ? 'aspect-square' : 'h-full min-h-[720px]')

<div className={['relative', illustrationFrameClasses].join(' ')}>
  <img
    src={verificationIllustrationUrl}
    alt="Verification trust illustration for the creator application verification step"
    className="h-full w-full object-cover"
  />
</div>
```

```jsx
// Component Library review example bounds the image rail.
<VerificationStep
  showAside={false}
  illustrationFrameClassName="h-96"
  {...reviewProps}
/>
```

Custom preview shells should use the same idea:

```jsx
<div className="relative h-96 overflow-hidden">
  <img className="h-full w-full object-cover" />
</div>
```

## Why This Works

The live creator application uses full-height side rails so the artwork can fill
the viewport-like flow layout. The Component Library Patterns section stacks
multiple examples vertically. When those examples reused the production rail
classes (`h-full min-h-[720px]`), the image wrappers inherited large card
heights and made the artwork look broken.

The frame override preserves the production default while giving review surfaces
a stable bounded height.

## Prevention

- When `showAside={false}` is used in the Component Library Patterns section,
  pass a bounded review frame such as `illustrationFrameClassName="h-96"`.
- Do not rely on image natural dimensions alone. Verify rendered dimensions too.
- Browser smoke checks for pattern image changes should inspect:
  - broken images: `naturalWidth === 0 || naturalHeight === 0`
  - over-stretched images: rendered height unexpectedly above the review frame
- Keep production full-height rails and review-gallery bounded rails as separate
  states instead of weakening the production layout to fix the review surface.

## Related Issues

No related issues documented yet.
