export const COMMUNITY_VERTICAL_OTHER = 'Something else'

export const COMMUNITY_VERTICALS = [
  'Arts & Crafts',
  'Books',
  'Entertainment',
  'Family & Parenting',
  'Food & Drink',
  'Gaming',
  'Home & DIY',
  'Learning & Education',
  'Lifestyle',
  'Personal Finance',
  'Pets',
  'Sports',
  'Travel',
  'Wellness',
  COMMUNITY_VERTICAL_OTHER,
]

export const COMMUNITY_VERTICAL_OPTIONS = COMMUNITY_VERTICALS.map((vertical) => ({
  value: vertical,
  label: vertical,
}))

const closestVerticals = {
  art: 'Arts & Crafts',
  arts: 'Arts & Crafts',
  baking: 'Food & Drink',
  books: 'Books',
  cooking: 'Food & Drink',
  craft: 'Arts & Crafts',
  crafts: 'Arts & Crafts',
  decor: 'Home & DIY',
  decorating: 'Home & DIY',
  disney: 'Entertainment',
  diy: 'Home & DIY',
  education: 'Learning & Education',
  entertainment: 'Entertainment',
  family: 'Family & Parenting',
  finance: 'Personal Finance',
  fitness: 'Wellness',
  food: 'Food & Drink',
  gaming: 'Gaming',
  gardening: 'Home & DIY',
  health: 'Wellness',
  home: 'Home & DIY',
  learning: 'Learning & Education',
  lifestyle: 'Lifestyle',
  movies: 'Entertainment',
  music: 'Entertainment',
  parenting: 'Family & Parenting',
  pets: 'Pets',
  photography: 'Arts & Crafts',
  pop: 'Entertainment',
  'pop culture': 'Entertainment',
  pregnancy: 'Family & Parenting',
  reading: 'Books',
  recipe: 'Food & Drink',
  recipes: 'Food & Drink',
  running: 'Wellness',
  sports: 'Sports',
  tv: 'Entertainment',
  'tv shows': 'Entertainment',
  travel: 'Travel',
  weightlifting: 'Wellness',
  wellness: 'Wellness',
}

export function getClosestCommunityVertical(value) {
  if (!value) return ''

  const trimmedValue = value.trim()
  const exactMatch = COMMUNITY_VERTICALS.find((vertical) => vertical.toLowerCase() === trimmedValue.toLowerCase())

  if (exactMatch) return exactMatch

  return closestVerticals[trimmedValue.toLowerCase()] ?? COMMUNITY_VERTICAL_OTHER
}
