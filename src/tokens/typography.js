/**
 * TYPOGRAPHY TOKENS
 * Compatibility-first mapping of the exported Figma typography tokens.
 * The semantic keys mirror the source tokens, while Tailwind-friendly aliases
 * keep the existing component API working without further rewrites.
 */

export const typography = {
  fontFamily: {
    sans:    ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    display: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    mono:    ['"JetBrains Mono"', '"Fira Code"', 'ui-monospace', 'monospace'],
  },

  fontSize: {
    // Direct semantic mappings from Typography/Desktop.json
    'label-sm':   ['0.625rem', { lineHeight: '1rem', letterSpacing: '-0.0125rem' }], // 10/16
    'label-md':   ['0.75rem',  { lineHeight: '1rem', letterSpacing: '-0.0125rem' }], // 12/16
    'label-lg':   ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.00625rem' }], // 14/20
    body:         ['0.9375rem', { lineHeight: '1.25rem', letterSpacing: '0' }], // 15/20
    'heading-2':  ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.00625rem' }], // 18/24
    'heading-1':  ['1.5rem',   { lineHeight: '1.75rem', letterSpacing: '-0.00625rem' }], // 24/28
    display:      ['2rem',     { lineHeight: '2.625rem', letterSpacing: '0' }], // 32/42

    // Tailwind-friendly aliases for the existing scaffold
    '2xs': ['0.625rem', { lineHeight: '1rem', letterSpacing: '-0.0125rem' }],
    xs:    ['0.75rem',  { lineHeight: '1rem', letterSpacing: '-0.0125rem' }],
    sm:    ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '-0.00625rem' }],
    base:  ['0.9375rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
    lg:    ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.00625rem' }],
    xl:    ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '-0.00625rem' }],
    '2xl': ['1.5rem',   { lineHeight: '1.75rem', letterSpacing: '-0.00625rem' }],
    '3xl': ['1.5rem',   { lineHeight: '1.75rem', letterSpacing: '-0.00625rem' }],
    '4xl': ['2rem',     { lineHeight: '2.625rem', letterSpacing: '0' }],
    '5xl': ['2rem',     { lineHeight: '2.625rem', letterSpacing: '0' }],
    '6xl': ['2rem',     { lineHeight: '2.625rem', letterSpacing: '0' }],
  },

  fontWeight: {
    light:    '300',
    normal:   '400',
    medium:   '500',
    semibold: '500',
    bold:     '700',
    black:    '700',
  },

  lineHeight: {
    xs:      '1rem',
    sm:      '1.25rem',
    md:      '1.5rem',
    lg:      '1.75rem',
    xl:      '2.25rem',
    xxl:     '2.625rem',
    none:    '1',
    tight:   '1.25',
    snug:    '1.375',
    normal:  '1.5',
    relaxed: '1.625',
    loose:   '2',
  },

  letterSpacing: {
    sm:      '-0.0125rem',
    md:      '-0.00625rem',
    lg:      '0rem',
    tighter: '-0.04em',
    tight:   '-0.02em',
    normal:  '0em',
    wide:    '0.02em',
    wider:   '0.05em',
    widest:  '0.1em',
    caps:    '0.08em',
  },
}
