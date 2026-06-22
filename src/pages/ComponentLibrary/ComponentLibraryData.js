export const sections = ['Colors', 'Typography', 'Forms', 'Buttons', 'Badges', 'Avatars', 'Navigation', 'Pages', 'Patterns', 'Emails', 'Prototypes', 'Animation']

export const emailAddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const creatorShellStepOrder = ['entry', 'gather', 'preview', 'verify', 'success']

export const creatorShellGatherVideoLeadInMs = 2000
export const creatorShellGatherVideoPlaybackRate = 0.45
export const creatorShellGatherRowFetchMs = 700
export const creatorShellGatherResolvedPauseMs = 1000

export const creatorShellPreviewOptions = [
  { value: 'entry', label: 'Entry' },
  { value: 'gather', label: 'Gather' },
  { value: 'preview', label: 'Preview' },
  { value: 'verify', label: 'Verify' },
  { value: 'success', label: 'Success' },
]

export const simplifiedVerificationOptions = [
  { value: 'standard', label: 'Standard' },
  { value: 'known-lead', label: 'Known lead' },
  { value: 'meta-fallback', label: 'Meta fallback' },
]

export const submissionSuccessTimeline = [
  {
    step: 'submitted',
    title: 'Submitted',
    description: 'Today your details move into review.',
    current: true,
  },
  {
    step: 'approved',
    title: 'Approved',
    description: "If there's a fit, we will reach out with next steps.",
  },
  {
    step: 'live',
    title: 'Live',
    description: 'When you’re ready.',
  },
]

export const avatarImageSet = [
  {
    name: 'Culture Crave',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
  },
  {
    name: 'Nicole PM',
    src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=128&q=80',
  },
  {
    name: 'Brynne B',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80',
  },
  {
    name: 'Cyle C',
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&q=80',
  },
]

export const socialUrlExamples = [
  { label: 'Empty state', value: '' },
  { label: 'Instagram', value: 'https://instagram.com/culturecrave' },
  { label: 'TikTok', value: 'https://www.tiktok.com/@culturecrave' },
  { label: 'Pinterest', value: 'https://pinterest.com/culturecrave' },
  { label: 'YouTube', value: 'https://youtube.com/@culturecrave' },
  { label: 'Facebook', value: 'https://facebook.com/culturecrave' },
  { label: 'Substack', value: 'https://culturecrave.substack.com' },
  { label: 'Default website', value: 'https://www.culturecrave.com' },
]

export function buildTraceabilityRows({
  badgeSizes,
  badgeVariants,
  buttonSizes,
  buttonVariants,
  checkboxVariants,
  optionTileVariants,
  selectVariants,
  selectableRowSizes,
  selectableRowVariants,
  textInputVariants,
  textareaVariants,
}) {
  return [
    {
      component: 'Button',
      variants: buttonVariants.join(', '),
      sizes: buttonSizes.join(', '),
      example: 'data-ds-component="Button" data-ds-variant="primary"',
    },
    {
      component: 'Badge',
      variants: badgeVariants.join(', '),
      sizes: badgeSizes.join(', '),
      example: 'data-ds-component="Badge" data-ds-variant="success"',
    },
    {
      component: 'TextInput',
      variants: textInputVariants.join(', '),
      sizes: 'md',
      example: 'data-ds-component="TextInput" data-ds-variant="default"',
    },
    {
      component: 'Select',
      variants: selectVariants.join(', '),
      sizes: 'md',
      example: 'data-ds-component="Select" data-ds-variant="default"',
    },
    {
      component: 'Textarea',
      variants: textareaVariants.join(', '),
      sizes: 'md',
      example: 'data-ds-component="Textarea" data-ds-variant="default"',
    },
    {
      component: 'Checkbox',
      variants: checkboxVariants.join(', '),
      sizes: 'md',
      example: 'data-ds-component="Checkbox" data-ds-variant="plain"',
    },
    {
      component: 'OptionTile',
      variants: optionTileVariants.join(', '),
      sizes: 'md',
      example: 'data-ds-component="OptionTile" data-ds-variant="radio"',
    },
    {
      component: 'SelectableRow',
      variants: selectableRowVariants.join(', '),
      sizes: selectableRowSizes.join(', '),
      example: 'data-ds-component="SelectableRow" data-ds-variant="default"',
    },
  ]
}

export const creatorShellSocialAccountDefaults = [
  {
    platform: 'Instagram',
    handle: '@culturecrave',
    followers: '318,000 followers',
  },
  {
    platform: 'TikTok',
    handle: '@culturecrave',
    followers: '124,000 followers',
  },
  {
    platform: 'Pinterest',
    handle: '@culturecrave',
    followers: '84,000 followers',
  },
  {
    platform: 'YouTube',
    handle: '@culturecrave',
    followers: 'Followers unavailable',
  },
  {
    platform: 'Facebook',
    handle: '@culturecrave',
    followers: 'Followers unavailable',
  },
]

export const fetchConfirmationDemoAccountsSeed = [
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@culturecrave',
    url: 'https://instagram.com/culturecrave',
    followers: '318,000 followers',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@culturecrave',
    url: 'https://tiktok.com/@culturecrave',
    followers: '124,000 followers',
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    handle: '@culturecrave',
    url: 'https://pinterest.com/culturecrave',
    followers: '84,000 followers',
  },
]

export function getFetchConfirmationDemoAccounts() {
  return fetchConfirmationDemoAccountsSeed.map((account) => ({ ...account }))
}
