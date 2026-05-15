/**
 * EFFECTS TOKENS
 * Border radius is mapped from the exported Figma radius tokens.
 * Shadow tokens remain compatibility utilities because the export does not
 * include a comparable shadow scale.
 */

export const radius = {
  none:  '0px',
  xs:    '8px',
  sm:    '8px',
  DEFAULT: '12px',
  md:    '12px',
  lg:    '16px',
  xl:    '24px',
  '2xl': '32px',
  '3xl': '32px',
  full:  '9999px',
}

export const shadows = {
  none: 'none',
  xs:   '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  sm:   '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  md:   '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg:   '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl:   '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  // Elevation aliases — use these in components
  'elevation-1': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'elevation-2': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'elevation-3': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'elevation-4': '0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.1)',

  // Colored shadows for gamification UI
  'brand-glow':  '0 0 0 3px rgb(107 101 255 / 0.3)',
  'gold-glow':   '0 0 20px rgb(194 240 84 / 0.4), 0 0 40px rgb(194 240 84 / 0.2)',
  'purple-glow': '0 0 20px rgb(139 92 246 / 0.4), 0 0 40px rgb(139 92 246 / 0.2)',
}
