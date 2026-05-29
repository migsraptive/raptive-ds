import { colors } from '../tokens/index.js'
import { brandPreviewDefaults } from './brandPreviewDefaults.js'
import {
  getAccessibleColorPair,
  normalizeHexColor,
  relativeLuminance,
} from './colorContrast.js'

const SOFT_MIX_WEIGHT = 0.12
const MUTED_MIX_WEIGHT = 0.28
const HOVER_DARK_MIX_WEIGHT = 0.16
const ACTIVE_DARK_MIX_WEIGHT = 0.24
const HOVER_LIGHT_MIX_WEIGHT = 0.12
const ACTIVE_LIGHT_MIX_WEIGHT = 0.18
const DARK_COLOR_LUMINANCE = 0.2

function hexChannelToString(value) {
  return Math.round(value).toString(16).padStart(2, '0')
}

export function mixHexColors(color, mixColor, colorWeight) {
  const normalizedColor = normalizeHexColor(color)
  const normalizedMixColor = normalizeHexColor(mixColor)
  if (!normalizedColor || !normalizedMixColor) return normalizedColor ?? normalizedMixColor

  const weight = Math.min(Math.max(colorWeight, 0), 1)
  const colorValue = normalizedColor.slice(1)
  const mixValue = normalizedMixColor.slice(1)
  const mixedChannels = [0, 2, 4].map((index) => {
    const baseChannel = parseInt(colorValue.slice(index, index + 2), 16)
    const mixChannel = parseInt(mixValue.slice(index, index + 2), 16)

    return hexChannelToString((baseChannel * weight) + (mixChannel * (1 - weight)))
  })

  return `#${mixedChannels.join('')}`
}

function resolvePreviewColor(color, fallbackColor) {
  return normalizeHexColor(color) ?? normalizeHexColor(fallbackColor)
}

function deriveSoftColor(color) {
  return mixHexColors(color, colors.surface.DEFAULT, SOFT_MIX_WEIGHT)
}

function deriveMutedColor(color) {
  return mixHexColors(color, colors.surface.DEFAULT, MUTED_MIX_WEIGHT)
}

function deriveInteractiveColor(color, darkMixWeight, lightMixWeight) {
  const luminance = relativeLuminance(color) ?? 1
  const mixTarget = luminance <= DARK_COLOR_LUMINANCE ? colors.text.invert : colors.surface.invert
  const mixWeight = luminance <= DARK_COLOR_LUMINANCE ? lightMixWeight : darkMixWeight

  return mixHexColors(color, mixTarget, 1 - mixWeight)
}

export function createPreviewThemeStyle({
  brandColor = brandPreviewDefaults.brand,
  accentColor = brandPreviewDefaults.accent,
  linkColor,
} = {}) {
  const brand = getAccessibleColorPair(resolvePreviewColor(brandColor, brandPreviewDefaults.brand))
  const accentBackground = resolvePreviewColor(accentColor, brandPreviewDefaults.accent)
  const accentSoft = deriveSoftColor(accentBackground)
  const accent = getAccessibleColorPair(accentSoft)
  const link = resolvePreviewColor(linkColor, brand.background) ?? brand.background

  return {
    // Brand Color maps to Discourse tertiary / --tertiary.
    '--preview-brand': brand.background,
    '--preview-brand-foreground': brand.foreground,
    '--preview-brand-soft': deriveSoftColor(brand.background),
    '--preview-brand-muted': deriveMutedColor(brand.background),
    '--preview-brand-hover': deriveInteractiveColor(brand.background, HOVER_DARK_MIX_WEIGHT, HOVER_LIGHT_MIX_WEIGHT),
    '--preview-brand-active': deriveInteractiveColor(brand.background, ACTIVE_DARK_MIX_WEIGHT, ACTIVE_LIGHT_MIX_WEIGHT),
    // Accent remains preview-scoped unless a safe Discourse mapping is confirmed.
    '--preview-accent': accentBackground,
    '--preview-accent-foreground': accent.foreground,
    '--preview-accent-soft': accentSoft,
    '--preview-accent-muted': deriveMutedColor(accentBackground),
    '--preview-link': link,
  }
}
