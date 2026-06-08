import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const verificationStepSource = readFileSync(new URL('../src/patterns/VerificationStep/VerificationStep.jsx', import.meta.url), 'utf8')
const communityTermsModalSource = readFileSync(new URL('../src/patterns/CommunityTermsModal/CommunityTermsModal.jsx', import.meta.url), 'utf8')
const creatorApplicationSource = readFileSync(new URL('../src/pages/CreatorApplication/CreatorApplicationPage.jsx', import.meta.url), 'utf8')
const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')
const mobileFlowSource = readFileSync(new URL('../src/patterns/MobileOnboardingFlow/MobileOnboardingFlow.jsx', import.meta.url), 'utf8')
const viewportDemoSource = readFileSync(new URL('../src/patterns/CreatorOnboardingViewportDemo/CreatorOnboardingViewportDemo.jsx', import.meta.url), 'utf8')

test('verification terms must be reviewed and accepted inside the modal', () => {
  assert.match(verificationStepSource, /Community Terms/)
  assert.match(verificationStepSource, /CommunityTermsModal/)
  assert.match(verificationStepSource, /setTermsModalOpen\(true\)/)
  assert.match(verificationStepSource, /text-action-primary underline underline-offset-2/)
  assert.match(verificationStepSource, /onTermsAcceptedChange\?\.\(true\)/)
  assert.match(communityTermsModalSource, /role="dialog"/)
  assert.match(communityTermsModalSource, /Agree and continue/)
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

test('desktop verification defaults to an available method before checkbox acceptance', () => {
  for (const source of [creatorApplicationSource, componentLibrarySource]) {
    assert.match(source, /useState\('instagram-dm'\)/)
  }

  assert.doesNotMatch(creatorApplicationSource, /setVerificationMethod\(null\)/)
})
