/**
 * SPACING TOKENS
 * Compatibility-first mapping of the exported Figma spacing tokens.
 * Semantic keys mirror the source token names; numeric aliases preserve the
 * existing Tailwind utility usage in the scaffold.
 */

export const spacing = {
  // Direct semantic mappings from Spacing/Mode 1.json
  xxxs: '2px',
  xxs:  '4px',
  xs:   '8px',
  s:    '16px',
  m:    '24px',
  l:    '32px',
  xl:   '48px',
  xxl:  '64px',
  xxxl: '96px',
  xxxxl: '128px',

  // Tailwind compatibility aliases
  'px':  '1px',
  '0':   '0px',
  '0.5': '2px',
  '1':   '4px',
  '1.5': '6px',
  '2':   '8px',
  '2.5': '10px',
  '3':   '12px',
  '3.5': '14px',
  '4':   '16px',
  '5':   '20px',
  '6':   '24px',
  '7':   '28px',
  '8':   '32px',
  '9':   '36px',
  '10':  '40px',
  '11':  '44px',
  '12':  '48px',
  '14':  '56px',
  '16':  '64px',
  '20':  '80px',
  '24':  '96px',
  '28':  '112px',
  '32':  '128px',
  '36':  '144px',
  '40':  '160px',
  '48':  '192px',
  '56':  '224px',
  '64':  '256px',

  // Semantic intent aliases
  'component-xs':  '4px',    // tight internal padding
  'component-sm':  '8px',    // button/tag padding
  'component-md':  '16px',   // input, card section
  'component-lg':  '16px',   // card padding
  'component-xl':  '24px',   // section gap
  'layout-sm':     '32px',   // small section gap
  'layout-md':     '48px',   // medium layout gap
  'layout-lg':     '64px',   // page section gap
  'layout-xl':     '96px',   // hero spacing
}
