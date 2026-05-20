/**
 * COLOR TOKENS
 * Three-layer architecture:
 *   Primitives  → raw values, never used directly in components
 *   Semantic    → purpose-named aliases (maps to Figma variables)
 *   Component   → component-specific overrides when needed
 *
 * These feed into tailwind.config.js AND are exported as CSS vars via globals.css
 * Mirrors your Figma variable structure: keep these in sync.
 */

// ─── PRIMITIVES ────────────────────────────────────────────────────────────────
const primitives = {
  // Brand
  'raptive-50':  '#f4faff',
  'raptive-100': '#f0f8ff',
  'raptive-200': '#dbeafe',
  'raptive-300': '#93c5fd',
  'raptive-400': '#60a5fa',
  'raptive-500': '#6b65ff', // brand.primary-blue
  'raptive-action': '#6762f6', // brand.primary-blue darkened only enough to pass AA with white text
  'raptive-action-hover': '#655ff0',
  'raptive-action-active': '#615ce8',
  'raptive-600': '#2563eb',
  'raptive-700': '#354786', // brand.accent-blue
  'raptive-800': '#1e40af',
  'raptive-900': '#1e3a8a',
  'raptive-950': '#242526',

  // Neutrals
  'neutral-0':   '#ffffff',
  'neutral-50':  '#fdfdfd',
  'neutral-100': '#f8f8f8',
  'neutral-200': '#eff0f0',
  'neutral-300': '#e9e9ea',
  'neutral-400': '#d7d8d9',
  'neutral-500': '#8f9295',
  'neutral-600': '#7d8083',
  'neutral-700': '#6b6e70',
  'neutral-800': '#444648',
  'neutral-900': '#242526',
  'neutral-950': '#000000',

  // Status
  'green-50':  '#ebffe6',
  'green-100': '#d1f7cc',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'green-700': '#15803d',

  'yellow-50':  '#fff9dd',
  'yellow-100': '#ffeea3',
  'yellow-500': '#ffc50e',
  'yellow-600': '#dfb104',

  'red-50':  '#feeae7',
  'red-100': '#fdd4ce',
  'red-500': '#f75942',
  'red-600': '#f53c1b',
  'red-700': '#b91c1c',

  'orange-50':  '#ffefeb',
  'orange-100': '#fcdbd4',
  'orange-500': '#ff7858', // brand.secondary-orange
  'orange-600': '#dd543a',
  'orange-700': '#c05621',

  // Accent / gamification
  'gold-400': '#d2ff66',
  'gold-500': '#c2f054',
  'gold-600': '#a5d62f',

  'purple-100': '#faf5ff',
  'purple-400': '#a78bfa',
  'purple-500': '#8b5cf6',
  'purple-600': '#7c3aed',
}

// ─── SEMANTIC ──────────────────────────────────────────────────────────────────
// These are the tokens you use in components. Never reference primitives directly.
export const colors = {
  // Mapped to CSS vars in globals.css for runtime theming
  brand: {
    DEFAULT: primitives['raptive-500'],
    light:   primitives['raptive-400'],
    dark:    primitives['raptive-700'],
    subtle:  primitives['raptive-50'],
    muted:   primitives['raptive-100'],
  },

  action: {
    primary: primitives['raptive-action'],
    'primary-hover': primitives['raptive-action-hover'],
    'primary-active': primitives['raptive-action-active'],
  },

  surface: {
    DEFAULT:  primitives['neutral-0'],
    raised:   primitives['neutral-50'],
    sunken:   primitives['neutral-100'],
    overlay:  primitives['neutral-900'],
    invert:   primitives['neutral-950'],
  },

  border: {
    DEFAULT: primitives['neutral-200'],
    strong:  primitives['neutral-300'],
    subtle:  primitives['neutral-100'],
    focus:   primitives['raptive-500'],
  },

  text: {
    DEFAULT:  primitives['neutral-900'],
    secondary: primitives['neutral-800'],
    tertiary:  primitives['neutral-600'],
    placeholder: primitives['neutral-400'],
    'action-subtle': primitives['neutral-800'],
    disabled:  primitives['neutral-300'],
    invert:    primitives['neutral-0'],
    brand:     primitives['raptive-500'],
  },

  status: {
    success:        primitives['green-500'],
    'success-bg':   primitives['green-50'],
    'success-text': primitives['green-700'],
    warning:        primitives['yellow-500'],
    'warning-bg':   primitives['yellow-50'],
    'warning-text': primitives['yellow-600'],
    error:          primitives['red-500'],
    'error-bg':     primitives['red-50'],
    'error-text':   primitives['red-700'],
    info:           primitives['raptive-500'],
    'info-bg':      primitives['raptive-50'],
    'info-text':    primitives['raptive-600'],
  },

  // Gamification — badge, streak, celebration
  gamification: {
    gold:          primitives['gold-500'],
    'gold-light':  primitives['gold-400'],
    'gold-bg':     '#fffbeb',
    purple:        primitives['purple-500'],
    'purple-light': primitives['purple-400'],
    'purple-bg':   '#faf5ff',
  },

  // Raw primitives exposed for one-off needs
  ...primitives,
}
