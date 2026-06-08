import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const submissionSuccessSource = readFileSync(new URL('../src/patterns/SubmissionSuccess/SubmissionSuccess.jsx', import.meta.url), 'utf8')
const mobileFlowSource = readFileSync(new URL('../src/patterns/MobileOnboardingFlow/MobileOnboardingFlow.jsx', import.meta.url), 'utf8')
const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')

test('submission success screens use cursor burst by default while mobile uses automatic burst', () => {
  assert.match(submissionSuccessSource, /showCelebrationBackground = true/)
  assert.match(submissionSuccessSource, /celebrationBackgroundVariant = 'cursor-burst'/)
  assert.match(mobileFlowSource, /<CelebrationBackground/)
  assert.match(mobileFlowSource, /variant="token-burst"/)
  assert.doesNotMatch(mobileFlowSource, /variant="cursor-burst"/)
  assert.doesNotMatch(componentLibrarySource, /celebrationBackgroundVariant="react-confetti"/)
})

test('cursor burst stops after one burst instead of resetting to loop', () => {
  assert.match(submissionSuccessSource, /setPhase\('complete'\)/)
  assert.match(submissionSuccessSource, /phase !== 'complete'/)
  assert.doesNotMatch(submissionSuccessSource, /setPhase\('idle'\)\s+}, 3500/)
})
