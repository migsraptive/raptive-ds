import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')
const componentLibraryPrototypesSource = readFileSync(new URL('../src/prototypes/ComponentLibraryPrototypes/ComponentLibraryPrototypes.jsx', import.meta.url), 'utf8')
const viteConfigSource = readFileSync(new URL('../vite.config.js', import.meta.url), 'utf8')

test('surfaces the celebration modal in the animation section', () => {
  assert.match(componentLibrarySource, /import \{ CelebrationModal \}/)
  assert.match(componentLibrarySource, /title="Celebration Modal"/)
  assert.match(componentLibrarySource, /setCelebrationModalOpen\(true\)/)
})

test('separates exploratory work into a prototypes section', () => {
  assert.match(componentLibrarySource, /'Prototypes'/)
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
  assert.match(componentLibrarySource, /Verify with Persona/)
  assert.match(componentLibrarySource, /You're already verified!/)
})

test('lazy-loads prototype-only modules into a dedicated Vite chunk', () => {
  assert.match(componentLibrarySource, /import \{ Suspense, lazy, useEffect, useRef, useState \} from 'react'/)
  assert.match(componentLibrarySource, /lazy\(\(\) => import\('\.\.\/\.\.\/prototypes\/ComponentLibraryPrototypes\/ComponentLibraryPrototypes\.jsx'\)\)/)
  assert.doesNotMatch(componentLibrarySource, /import \{ MobileOnboardingFlow \}/)
  assert.doesNotMatch(componentLibrarySource, /import \{ CreatorOnboardingViewportDemo \}/)
  assert.doesNotMatch(componentLibrarySource, /import \{ DataGatheringWonderSequence \}/)
  assert.doesNotMatch(componentLibrarySource, /import \{ ProjectionMotionShowcase \}/)
  assert.match(viteConfigSource, /manualChunks/)
  assert.match(viteConfigSource, /return 'prototypes'/)
})
