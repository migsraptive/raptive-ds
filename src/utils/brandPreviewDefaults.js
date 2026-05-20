import { colors } from '../tokens/index.js'

export const brandPreviewDefaults = {
  primary: colors.surface.overlay,
  secondary: colors.gamification['gold-light'],
  tertiary: colors.gamification['gold-bg'],
  link: colors.action.primary,
}

export const brandPreviewPalette = [
  brandPreviewDefaults.primary,
  brandPreviewDefaults.secondary,
  brandPreviewDefaults.tertiary,
]

export const compactWysiwygPalette = [
  brandPreviewDefaults.primary,
  brandPreviewDefaults.secondary,
  brandPreviewDefaults.link,
]
