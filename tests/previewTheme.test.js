import assert from 'node:assert/strict'
import test from 'node:test'
import { contrastRatio } from '../src/utils/colorContrast.js'
import { createPreviewThemeStyle } from '../src/utils/previewTheme.js'

test('derives accent as an accessible light tint of the brand color', () => {
  const style = createPreviewThemeStyle({ brandColor: '#123456' })

  assert.equal(style['--preview-accent'], '#a0aebb')
  assert.ok(contrastRatio(style['--preview-accent'], style['--preview-accent-foreground']) >= 4.5)
})

test('falls back to the default brand when deriving accent from an invalid brand color', () => {
  const style = createPreviewThemeStyle({ brandColor: 'not-a-color' })

  assert.equal(style['--preview-accent'], '#bcddaf')
  assert.ok(contrastRatio(style['--preview-accent'], style['--preview-accent-foreground']) >= 4.5)
})
