export const COMMUNITY_VERTICAL_OTHER = 'Something else'

export const COMMUNITY_VERTICALS = [
  'Art',
  'Baking',
  'Cooking',
  'Healthy Eating',
  'Crafting',
  'DIY',
  'Decorating',
  'Disney',
  'Fitness',
  'Gardening',
  'Health & Wellness',
  'Movies',
  'Music',
  'Parenting',
  'Parenting Babies',
  'Parenting K-5',
  'Parenting Toddlers',
  'Parenting Tweens & Teens',
  'Pets',
  'Pop Culture',
  'Pregnancy',
  'Reading',
  'Running',
  'Sports',
  'TV Shows',
  'Travel',
  'Weightlifting',
  COMMUNITY_VERTICAL_OTHER,
]

export const COMMUNITY_VERTICAL_OPTIONS = COMMUNITY_VERTICALS.map((vertical) => ({
  value: vertical,
  label: vertical,
}))

const closestVerticals = {
  books: 'Reading',
  craft: 'Crafting',
  crafts: 'Crafting',
  decor: 'Decorating',
  decorating: 'Decorating',
  disney: 'Disney',
  diy: 'DIY',
  family: 'Parenting',
  fitness: 'Fitness',
  food: 'Cooking',
  gaming: COMMUNITY_VERTICAL_OTHER,
  health: 'Health & Wellness',
  home: 'Decorating',
  movies: 'Movies',
  music: 'Music',
  parenting: 'Parenting',
  pets: 'Pets',
  photography: 'Art',
  recipe: 'Cooking',
  recipes: 'Cooking',
  sports: 'Sports',
  travel: 'Travel',
  wellness: 'Health & Wellness',
}

export function getClosestCommunityVertical(value) {
  if (!value) return ''

  const trimmedValue = value.trim()
  const exactMatch = COMMUNITY_VERTICALS.find((vertical) => vertical.toLowerCase() === trimmedValue.toLowerCase())

  if (exactMatch) return exactMatch

  return closestVerticals[trimmedValue.toLowerCase()] ?? COMMUNITY_VERTICAL_OTHER
}
