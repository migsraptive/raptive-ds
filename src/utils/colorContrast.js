import { colors } from '../tokens/index.js'
import { brandPreviewDefaults } from './brandPreviewDefaults.js'

const ACCESSIBLE_DARK_TEXT = colors.surface.invert
const ACCESSIBLE_LIGHT_TEXT = colors.text.invert
export const MINIMUM_TEXT_CONTRAST = 4.5

export function normalizeHexColor(color) {
  if (typeof color !== 'string') return null

  const trimmed = color.trim()
  const match = trimmed.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!match) return null

  const value = match[1].toLowerCase()
  if (value.length === 3) {
    return `#${value.split('').map((char) => `${char}${char}`).join('')}`
  }

  return `#${value}`
}

export function hexToRgb(color) {
  const normalized = normalizeHexColor(color)
  if (!normalized) return null

  const value = normalized.slice(1)
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  }
}

function channelToLinear(value) {
  const normalized = value / 255
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance(color) {
  const rgb = hexToRgb(color)
  if (!rgb) return null

  return (
    0.2126 * channelToLinear(rgb.r)
    + 0.7152 * channelToLinear(rgb.g)
    + 0.0722 * channelToLinear(rgb.b)
  )
}

export function contrastRatio(colorA, colorB) {
  const luminanceA = relativeLuminance(colorA)
  const luminanceB = relativeLuminance(colorB)
  if (luminanceA === null || luminanceB === null) return 1

  const lighter = Math.max(luminanceA, luminanceB)
  const darker = Math.min(luminanceA, luminanceB)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getReadableForegroundColor(backgroundColor) {
  const blackContrast = contrastRatio(backgroundColor, ACCESSIBLE_DARK_TEXT)
  const whiteContrast = contrastRatio(backgroundColor, ACCESSIBLE_LIGHT_TEXT)

  return blackContrast >= whiteContrast ? ACCESSIBLE_DARK_TEXT : ACCESSIBLE_LIGHT_TEXT
}

export function getAccessibleColorPair(backgroundColor, fallbackBackground = brandPreviewDefaults.primary) {
  const background = normalizeHexColor(backgroundColor) ?? fallbackBackground
  const foreground = getReadableForegroundColor(background)

  return {
    background,
    foreground,
    contrast: contrastRatio(background, foreground),
    passes: contrastRatio(background, foreground) >= MINIMUM_TEXT_CONTRAST,
  }
}
