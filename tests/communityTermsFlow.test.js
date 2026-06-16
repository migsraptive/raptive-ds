import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const verificationStepSource = readFileSync(new URL('../src/patterns/VerificationStep/VerificationStep.jsx', import.meta.url), 'utf8')
const communityTermsModalSource = readFileSync(new URL('../src/patterns/CommunityTermsModal/CommunityTermsModal.jsx', import.meta.url), 'utf8')
const creatorApplicationSource = readFileSync(new URL('../src/pages/CreatorApplication/CreatorApplicationPage.jsx', import.meta.url), 'utf8')
const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')
const mobileFlowSource = readFileSync(new URL('../src/patterns/MobileOnboardingFlow/MobileOnboardingFlow.jsx', import.meta.url), 'utf8')
const viewportDemoSource = readFileSync(new URL('../src/patterns/CreatorOnboardingViewportDemo/CreatorOnboardingViewportDemo.jsx', import.meta.url), 'utf8')

test('desktop verification terms toggle directly without the modal', () => {
  assert.match(verificationStepSource, /I have read and accepted/)
  assert.match(verificationStepSource, /Raptive's Creator Agreement/)
  assert.doesNotMatch(verificationStepSource, /CommunityTermsModal/)
  assert.doesNotMatch(verificationStepSource, /setTermsModalOpen\(true\)/)
  assert.match(verificationStepSource, /href="#"/)
  assert.match(verificationStepSource, /text-action-primary underline underline-offset-2/)
  assert.match(verificationStepSource, /onTermsAcceptedChange\?\.\(event\.target\.checked\)/)
})

test('desktop verification uses action buttons before showing a completed state', () => {
  assert.match(verificationStepSource, /completedMethod/)
  assert.match(verificationStepSource, /pendingMethod/)
  assert.match(verificationStepSource, /verification-method-action/)
  assert.match(verificationStepSource, /facebookLoginButtonStyle/)
  assert.match(verificationStepSource, /actionBrand === 'facebook'/)
  assert.match(creatorApplicationSource, /Continue with Facebook/)
  assert.match(creatorApplicationSource, /actionBrand: 'facebook'/)
  assert.match(verificationStepSource, /You're all set!/)
  assert.doesNotMatch(verificationStepSource, /data-ds-variant="radio"/)
  assert.match(verificationStepSource, /verification-permission-title/)
  assert.match(verificationStepSource, /community_verify-IG/)
  assert.match(verificationStepSource, /instagram-permission-allow/)
  assert.match(verificationStepSource, /onConfirmMethod\?\.\(pendingMethodDetails\.value\)/)
  assert.match(verificationStepSource, /pendingMethodDetails\?\.modalTitle/)
  assert.match(creatorApplicationSource, /modalTitle: 'Verify with Persona'/)
  assert.match(creatorApplicationSource, /Your Persona verification has been completed\./)
  assert.doesNotMatch(creatorApplicationSource, /window\.open\(/)
  assert.match(creatorApplicationSource, /setVerificationPendingMethod\(value\)/)
  assert.match(creatorApplicationSource, /setVerificationMethod\(value\)/)
})

test('mobile and viewport verification demos expose the Community Terms modal flow', () => {
  for (const source of [mobileFlowSource, viewportDemoSource]) {
    assert.match(source, /Community Terms/)
    assert.match(source, /CommunityTermsModal/)
    assert.match(source, /setTermsModalOpen\(true\)/)
    assert.match(source, /setVerificationTermsAccepted\(true\)/)
  }
})

test('mobile verification uses an in-handset Community Terms modal', () => {
  assert.match(communityTermsModalSource, /presentation = 'desktop'/)
  assert.match(communityTermsModalSource, /presentation === 'mobile'/)
  assert.match(mobileFlowSource, /presentation="mobile"/)
  assert.match(mobileFlowSource, /relative flex h-\[812px\]/)
})

test('mobile review social accounts expose edit and remove actions', () => {
  assert.match(mobileFlowSource, /mobileSocialAccountDefaults/)
  assert.match(mobileFlowSource, /editingSocialAccountId/)
  assert.match(mobileFlowSource, /aria-label=\{`Edit \$\{account\.platform\} handle`\}/)
  assert.match(mobileFlowSource, /aria-label=\{`Remove \$\{account\.platform\} account`\}/)
  assert.match(mobileFlowSource, /setSocialAccounts\(\(current\) => current\.filter/)
  assert.match(mobileFlowSource, /Add another account/)
  assert.match(mobileFlowSource, /iconBefore=\{<LucideIcon icon=\{Plus\} size="sm" \/>/)
})

test('mobile review matches the desktop staged loader before resolved rows', () => {
  assert.match(mobileFlowSource, /resolvedGatherRows/)
  assert.match(mobileFlowSource, /ShellRowShimmer/)
  assert.match(mobileFlowSource, /Matching the submitted URL to a creator profile\./)
  assert.match(mobileFlowSource, /Checking connected social accounts\./)
  assert.match(mobileFlowSource, /FoundBadgeReveal/)
  assert.match(mobileFlowSource, /setResolvedGatherRows\(\['identity', 'source'\]\)/)
})

test('desktop verification starts without a completed method before checkbox acceptance', () => {
  for (const source of [creatorApplicationSource, componentLibrarySource]) {
    assert.match(source, /const \[verificationMethod, setVerificationMethod\] = useState\(null\)/)
    assert.doesNotMatch(source, /const \[verificationMethod, setVerificationMethod\] = useState\('meta-login'\)/)
  }
})

test('creator application step changes keep capture URLs in sync', () => {
  assert.match(creatorApplicationSource, /const getCaptureStepFromIndex = \(stepIndex\) => flowStepIds\[stepIndex\]/)
  assert.match(creatorApplicationSource, /const goToStep = \(stepIndex\) =>/)
  assert.match(creatorApplicationSource, /url\.searchParams\.set\('captureStep', getCaptureStepFromIndex\(nextStep\)\)/)
  assert.match(creatorApplicationSource, /window\.history\.replaceState\(\{\}, '', url\)/)
  assert.match(creatorApplicationSource, /run: \(\) => goToStep\(3\)/)
  assert.match(creatorApplicationSource, /goToStep\(0\)/)
})
