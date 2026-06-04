import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')

test('surfaces the celebration modal in the animation section', () => {
  assert.match(componentLibrarySource, /import \{ CelebrationModal \}/)
  assert.match(componentLibrarySource, /title="Celebration Modal"/)
  assert.match(componentLibrarySource, /setCelebrationModalOpen\(true\)/)
})
