# Performance Improvements — May 2026

## Summary
- 14 files changed
- 19 animation issues resolved across 4 passes
- 0 regressions — all passes verified with npm run build,
  npm run lint, and browser smoke checks

## What was fixed

| file | what changed | performance reason | pass |
|---|---|---|---|
| `src/components/Button/Button.jsx` | Replaced `transition-all` with explicit `background-color,color,border-color,opacity` | Avoids broad property watching on every button state change | 1. transition-all replacements and GPU audit |
| `src/components/OptionTile/OptionTile.jsx` | Replaced `transition-all` with explicit `background-color,color,box-shadow` | Keeps card transition work scoped to intended visual properties | 1. transition-all replacements and GPU audit |
| `src/components/ColorSwatchButton/ColorSwatchButton.jsx` | Replaced `transition-all` with explicit `background-color,border-color` | Prevents swatches from asking the browser to track unrelated properties | 1. transition-all replacements and GPU audit |
| `src/patterns/VerificationStep/VerificationStep.jsx` | Replaced method-card `transition-all` with explicit `background-color,color,border-color,box-shadow` | Reduces transition bookkeeping during verification method selection | 1. transition-all replacements and GPU audit |
| `src/pages/CreatorApplication/CreatorApplicationPage.jsx` | Changed main progress fill from width animation to full-width fill with `scaleX()` | Moves progress animation to compositor-friendly transform | 2. scaleX progress bar fixes |
| `src/patterns/CreatorFlowProgress/CreatorFlowProgress.jsx` | Changed progress fill from `width` to full-width fill with `scaleX()` | Avoids layout recalculation during progress updates | 2. scaleX progress bar fixes |
| `src/patterns/StepLayout/StepLayout.jsx` | Changed top progress fill from `width` to full-width fill with `scaleX()` | Keeps progress animation on transform instead of layout | 2. scaleX progress bar fixes |
| `src/patterns/ProjectionPreview/ProjectionPreview.jsx` | Changed pipeline fill reveal from width animation to full-width fill with `scaleX()` | Avoids animating layout-triggering width | 2. scaleX progress bar fixes |
| `src/patterns/ProjectionMotionShowcase/ProjectionMotionShowcase.jsx` | Changed pipeline fill only from width animation to full-width fill with `scaleX()` | Keeps the animated fill compositor-friendly while preserving showcase geometry | 2. scaleX progress bar fixes |
| `src/patterns/VerificationStep/VerificationStep.jsx` | Replaced Motion `height: 0` / `height: auto` reveal with CSS `max-h-0` / `max-h-96` and overflow hidden | Removes height auto layout animation from verification reveal panels | 3. height and layout property fixes |
| `src/components/Button/Button.jsx` | Added `useReducedMotion` for decorative button scale and default label swap duration | Respects reduced-motion preference without skipping state changes | 4. useReducedMotion |
| `src/components/OptionTile/OptionTile.jsx` | Added `useReducedMotion` to hover, tap, selected lift, icon, indicator, and title micro-motion | Shortens decorative motion while preserving selection feedback state | 4. useReducedMotion |
| `src/components/AccordionPanel/AccordionPanel.jsx` | Added `useReducedMotion` for chevron rotation duration | Keeps accordion state change intact while reducing decorative rotation | 4. useReducedMotion |
| `src/patterns/CelebrationModal/CelebrationModal.jsx` | Added `useReducedMotion` for modal entrance and confetti ping durations | Reduces non-essential celebration motion | 4. useReducedMotion |
| `src/patterns/DataGatheringLoader/DataGatheringLoader.jsx` | Added `useReducedMotion` to row entrance reveal only | Reduces decorative entrance motion while preserving loading indicators | 4. useReducedMotion |
| `src/patterns/CommunityPreviewCard/CommunityPreviewCard.jsx` | Added `useReducedMotion` for preview reveal animations | Shortens decorative preview movement | 4. useReducedMotion |
| `src/patterns/ProjectionPreview/ProjectionPreview.jsx` | Added `useReducedMotion` for pipeline node and bar reveal duration | Preserves staged pipeline state while reducing decorative motion | 4. useReducedMotion |
| `src/patterns/RecognitionState/RecognitionState.jsx` | Added `useReducedMotion` for non-loading reveal and layout transitions | Reduces decorative reveal motion while preserving loading feedback | 4. useReducedMotion |

## Intentionally preserved
- ProjectionMotionShowcase.jsx band overlays and markers —
  positional geometry, not progress fills
- Loading, success, and error animations — communicate state,
  must always run
- Loader shimmer/pulse and skeleton pulse — communicate loading

## Deferred — future pass
- FetchConfirmation.jsx — remaining decorative Motion transitions
- InstagramDmVerificationDetail.jsx — blur filter and label swap
- Creator step page transitions in App.jsx — low priority,
  compositor-friendly already
- Full motion/react dependency removal — architectural decision,
  separate discussion

## Approach
All fixes followed the read-only audit → approval → implement
pattern. No changes were made without a pre-check confirming
the element structure was compatible with the fix.
