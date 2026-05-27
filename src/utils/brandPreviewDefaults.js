import { colors } from '../tokens/index.js'

export const brandPreviewDefaults = {
  // no token available: demo WYSIWYG primary default requested for brand preview exploration.
  primary: '#02B3A6',
  // no token available: demo WYSIWYG secondary default requested for brand preview exploration.
  secondary: '#F15438',
  // no token available: demo WYSIWYG tertiary default requested for brand preview exploration.
  tertiary: '#FFFAEE',
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
  brandPreviewDefaults.tertiary,
]
