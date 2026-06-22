import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')
const componentLibraryDataSource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibraryData.js', import.meta.url), 'utf8')
const componentLibraryIntentDocsSource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibraryIntentDocs.jsx', import.meta.url), 'utf8')
const componentLibraryPrototypesSource = readFileSync(new URL('../src/prototypes/ComponentLibraryPrototypes/ComponentLibraryPrototypes.jsx', import.meta.url), 'utf8')
const viteConfigSource = readFileSync(new URL('../vite.config.js', import.meta.url), 'utf8')

test('surfaces the celebration modal in the animation section', () => {
  assert.match(componentLibrarySource, /import \{ CelebrationModal \}/)
  assert.match(componentLibrarySource, /title="Celebration Modal"/)
  assert.match(componentLibrarySource, /setCelebrationModalOpen\(true\)/)
})

test('separates exploratory work into a prototypes section', () => {
  assert.match(componentLibraryDataSource, /'Prototypes'/)
  assert.match(componentLibrarySource, /activeSection === 'Prototypes'/)
  assert.doesNotMatch(componentLibrarySource, /activeSection === 'Mobile'/)
  assert.match(componentLibrarySource, /ComponentLibraryPrototypes/)
  assert.match(componentLibraryPrototypesSource, /title="Mobile Creator Onboarding Flow"/)
  assert.match(componentLibraryPrototypesSource, /title="Creator Onboarding Viewport Direction"/)
  assert.match(componentLibraryPrototypesSource, /title: 'Submission Success: Cursor Burst Review'/)
  assert.match(componentLibraryPrototypesSource, /title="Projection Motion Lab"/)
  assert.match(componentLibraryPrototypesSource, /title="Verification Expansion"/)
})

test('documents the current verification paths and known lead variant', () => {
  assert.match(componentLibrarySource, /Login with Meta to verify your Instagram account/)
  assert.match(componentLibrarySource, /Submit with an email address/)
  assert.match(componentLibrarySource, /You're already verified!/)
})

test('lazy-loads prototype-only modules into a dedicated Vite chunk', () => {
  assert.match(componentLibrarySource, /import \{ Suspense, lazy, useEffect, useState \} from 'react'/)
  assert.match(componentLibrarySource, /from '\.\/ComponentLibraryScaffold\.jsx'/)
  assert.match(componentLibrarySource, /lazy\(\(\) => import\('\.\.\/\.\.\/prototypes\/ComponentLibraryPrototypes\/ComponentLibraryPrototypes\.jsx'\)\)/)
  assert.doesNotMatch(componentLibrarySource, /import \{ MobileOnboardingFlow \}/)
  assert.doesNotMatch(componentLibrarySource, /import \{ CreatorOnboardingViewportDemo \}/)
  assert.doesNotMatch(componentLibrarySource, /import \{ DataGatheringWonderSequence \}/)
  assert.doesNotMatch(componentLibrarySource, /import \{ ProjectionMotionShowcase \}/)
  assert.match(viteConfigSource, /manualChunks/)
  assert.match(viteConfigSource, /return 'prototypes'/)
})

test('renders component intent guidance in the Button section', () => {
  assert.match(componentLibrarySource, /import\.meta\.glob\('\.\.\/\.\.\/components\/\*\/intent\.md'/)
  assert.match(componentLibrarySource, /const buttonIntentMarkdown = componentIntentDocs\['\.\.\/\.\.\/components\/Button\/intent\.md'\]/)
  assert.match(componentLibraryIntentDocsSource, /function ComponentIntentDoc/)
  assert.match(componentLibrarySource, /from '\.\/ComponentLibraryIntentDocs\.jsx'/)
  assert.match(componentLibrarySource, /aria-label="Button Usage Guidance"/)
  assert.match(componentLibrarySource, /title="Action Hierarchy"/)
  assert.match(componentLibrarySource, /title="Composition"/)
  assert.match(componentLibrarySource, /title="Sizes And States"/)
  assert.match(componentLibrarySource, /<ComponentIntentDoc markdown=\{buttonIntentMarkdown\} \/>/)
})

test('renders color token intent guidance in the Colors section', () => {
  assert.match(componentLibrarySource, /import\.meta\.glob\('\.\.\/\.\.\/tokens\/\*\.intent\.md'/)
  assert.match(componentLibrarySource, /const colorIntentMarkdown = tokenIntentDocs\['\.\.\/\.\.\/tokens\/colors\.intent\.md'\]/)
  assert.match(componentLibrarySource, /activeSection === 'Colors'/)
  assert.match(componentLibrarySource, /aria-label="Color Usage Guidance"/)
  assert.match(componentLibrarySource, /eyebrow="Token guidance"/)
})

test('renders typography token intent guidance in the Typography section', () => {
  assert.match(componentLibrarySource, /const typographyIntentMarkdown = tokenIntentDocs\['\.\.\/\.\.\/tokens\/typography\.intent\.md'\]/)
  assert.match(componentLibrarySource, /activeSection === 'Typography'/)
  assert.match(componentLibraryIntentDocsSource, /function IntentPurposePanel/)
  assert.match(componentLibraryIntentDocsSource, /function IntentSectionPanel/)
  assert.match(componentLibrarySource, /title="Type Scale"/)
  assert.match(componentLibrarySource, /title="Text Color Roles"/)
  assert.match(componentLibrarySource, /title="Families And Metrics"/)
  assert.match(componentLibrarySource, /ariaLabel="Typography Use When Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Typography Do Not Use When Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Typography Type Roles Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Typography Usage Rules Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Typography Escalation Guidance"/)
})

test('renders form intent guidance in the Forms section', () => {
  assert.match(componentLibrarySource, /const formIntentMarkdown = componentIntentDocs\['\.\.\/\.\.\/components\/FormField\/intent\.md'\]/)
  assert.match(componentLibrarySource, /activeSection === 'Forms'/)
  assert.match(componentLibrarySource, /title="Text Input"/)
  assert.match(componentLibrarySource, /title="Textarea And Select"/)
  assert.match(componentLibrarySource, /title="Option Tiles"/)
  assert.match(componentLibrarySource, /title="Selectable Rows"/)
  assert.match(componentLibrarySource, /ariaLabel="Forms Use When Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Forms Do Not Use When Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Forms Control Families Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Forms Usage Rules Guidance"/)
  assert.match(componentLibrarySource, /ariaLabel="Forms Escalation Guidance"/)
})
