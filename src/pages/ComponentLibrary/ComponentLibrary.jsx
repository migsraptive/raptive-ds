import { useEffect, useState } from 'react'
import {
  Award,
  Baby,
  BadgeCheck,
  BriefcaseBusiness,
  Flame,
  HandCoins,
  Heart,
  House,
  Mail,
  Megaphone,
  MessageSquare,
  Plane,
  Rocket,
  RotateCcw,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  Waves,
} from 'lucide-react'
import { Button } from '../../components/Button/Button.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { AccordionPanel } from '../../components/AccordionPanel/AccordionPanel.jsx'
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar.jsx'
import { AvatarUpload } from '../../components/AvatarUpload/AvatarUpload.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { ColorInput } from '../../components/ColorInput/ColorInput.jsx'
import { ColorSwatchButton } from '../../components/ColorSwatchButton/ColorSwatchButton.jsx'
import { CompactField } from '../../components/CompactField/CompactField.jsx'
import { FieldShell } from '../../components/FormField/FieldShell.jsx'
import { FormField } from '../../components/FormField/FormField.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { OptionTile } from '../../components/OptionTile/OptionTile.jsx'
import { RadioGroup } from '../../components/RadioGroup/RadioGroup.jsx'
import { Select } from '../../components/Select/Select.jsx'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { AuthorRow } from '../../components/AuthorRow/AuthorRow.jsx'
import { StreakBadge } from '../../components/StreakBadge/StreakBadge.jsx'
import { MediaGallery } from '../../components/MediaGallery/MediaGallery.jsx'
import { PostContent } from '../../components/PostContent/PostContent.jsx'
import { PostActionBar } from '../../components/PostActionBar/PostActionBar.jsx'
import { FeedPost } from '../../components/FeedPost/FeedPost.jsx'
import { Comment } from '../../components/Comment/Comment.jsx'
import { CommunitySidebar } from '../../components/CommunitySidebar/CommunitySidebar.jsx'
import { CommunityTopNavigation } from '../../components/CommunityTopNavigation/CommunityTopNavigation.jsx'
import { HomeFeedPageTemplate } from '../../components/HomeFeedPageTemplate/HomeFeedPageTemplate.jsx'
import { RightRailWelcomeCard } from '../../components/RightRailWelcomeCard/RightRailWelcomeCard.jsx'
import { RightRailCommunityRulesCard } from '../../components/RightRailCommunityRulesCard/RightRailCommunityRulesCard.jsx'
import { CategoryPicker } from '../../patterns/CategoryPicker/CategoryPicker.jsx'
import { CommunityPreviewCard } from '../../patterns/CommunityPreviewCard/CommunityPreviewCard.jsx'
import { CompactWysiwygStudio } from '../../patterns/CompactWysiwygStudio/CompactWysiwygStudio.jsx'
import { CelebrationModal } from '../../patterns/CelebrationModal/CelebrationModal.jsx'
import { DataGatheringLoader } from '../../patterns/DataGatheringLoader/DataGatheringLoader.jsx'
import { FetchConfirmation } from '../../patterns/FetchConfirmation/FetchConfirmation.jsx'
import { GoalSelectionGrid } from '../../patterns/GoalSelectionGrid/GoalSelectionGrid.jsx'
import { InstagramDmVerificationDetail } from '../../patterns/InstagramDmVerificationDetail/InstagramDmVerificationDetail.jsx'
import { ProjectionMotionShowcase } from '../../patterns/ProjectionMotionShowcase/ProjectionMotionShowcase.jsx'
import { ProjectionPreview } from '../../patterns/ProjectionPreview/ProjectionPreview.jsx'
import { PreviewBuilderStudio } from '../../patterns/PreviewBuilderStudio/PreviewBuilderStudio.jsx'
import { ReviewCorrection } from '../../patterns/ReviewCorrection/ReviewCorrection.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { StepLayout } from '../../patterns/StepLayout/StepLayout.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'
import { colors as colorTokens } from '../../tokens/colors.js'
import { typography as typographyTokens } from '../../tokens/typography.js'
import { brandPreviewDefaults, brandPreviewPalette } from '../../utils/brandPreviewDefaults.js'

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div className="space-y-0.5 pb-3 border-b border-border">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        {description && <p className="text-sm text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  )
}

// ─── Token swatch ──────────────────────────────────────────────────────────────
function ColorSwatch({ token, value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="w-full h-10 rounded-md border border-border shadow-xs"
        style={{ backgroundColor: value }}
        title={value}
      />
      <p className="text-2xs font-mono text-text-secondary leading-snug">{token}</p>
      {label && <p className="text-2xs text-text-tertiary">{label}</p>}
    </div>
  )
}

// ─── Row layout ───────────────────────────────────────────────────────────────
function Row({ label, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <p className="text-xs font-medium text-text-tertiary uppercase tracking-caps">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

function DocumentationNote({ children }) {
  return (
    <aside className="rounded-lg border border-border bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-text-secondary">
      {children}
    </aside>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const sections = ['Colors', 'Typography', 'Forms', 'Buttons', 'Badges', 'Avatars', 'Navigation', 'Pages', 'Patterns', 'Animation']

const tileIcon = (Icon) => <LucideIcon icon={Icon} size="lg" stroke="display" />
const celebrationIcon = (Icon) => <LucideIcon icon={Icon} size="xl" stroke="display" />
const miniIcon = (Icon) => <LucideIcon icon={Icon} size="sm" />
const affixIcon = (Icon) => <LucideIcon icon={Icon} size="md" stroke="display" />
const avatarImageSet = [
  {
    name: 'Julia Child',
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

function tokenTypographyLabel(tokenName) {
  const token = typographyTokens.fontSize[tokenName]
  if (!token) return tokenName
  const [size, meta] = token
  const pxSize = Math.round(parseFloat(size) * 16)
  const pxLineHeight = Math.round(parseFloat(meta.lineHeight) * 16)
  return `${tokenName} / ${pxSize}px / ${pxLineHeight}px`
}

function pxFromRemString(remString) {
  return `${Math.round(parseFloat(remString) * 16)}px`
}

export function ComponentLibrary() {
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === 'undefined') {
      return 'Colors'
    }

    const sectionParam = new URLSearchParams(window.location.search).get('section')
    return sections.includes(sectionParam) ? sectionParam : 'Colors'
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('badge')
  const [goalValue, setGoalValue] = useState('grow-audience')
  const [selectedTiles, setSelectedTiles] = useState(['community'])
  const [selectedGoals, setSelectedGoals] = useState(['audience-growth', 'community'])
  const [newsletterOptIn, setNewsletterOptIn] = useState(true)
  const [primaryButtonColor, setPrimaryButtonColor] = useState(brandPreviewDefaults.primary)
  const [secondaryButtonColor, setSecondaryButtonColor] = useState(brandPreviewDefaults.secondary)
  const [selectedSwatch, setSelectedSwatch] = useState(brandPreviewDefaults.secondary)
  const [demoAvatar, setDemoAvatar] = useState(null)
  const [demoShape, setDemoShape] = useState('circle')
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(['food', 'parenting'])
  const [creatorUrl, setCreatorUrl] = useState('https://instagram.com/juliachild')
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState('instagram-dm')
  const [verificationConfirmed, setVerificationConfirmed] = useState(true)
  const [reviewFields, setReviewFields] = useState({
    name: 'Julia Child',
    url: 'instagram.com/juliachild',
    vertical: 'food',
    audience: 'Community-led',
    summary: 'Food creator and community builder helping families cook smarter and gather more often.',
  })

  const modalExamples = {
    badge: {
      type: 'badge',
      title: 'Achievement Unlocked!',
      description: 'You just earned the "Community Champion" badge for helping 10 members this month.',
      badge: { icon: celebrationIcon(Trophy), name: 'Community Champion', tier: tileIcon(Sparkles) },
      stats: [{ value: '10', label: 'Members helped' }, { value: '47', label: 'Points earned' }],
    },
    streak: {
      type: 'streak',
      title: '30-Day Streak!',
      description: "You've been active every day for a month. That's incredible consistency.",
      badge: { icon: celebrationIcon(Flame), name: '30-Day Streak' },
      stats: [{ value: '30', label: 'Days active' }, { value: '12', label: 'Posts written' }],
    },
    milestone: {
      type: 'milestone',
      title: 'First 100 Reactions!',
      description: "Your posts have resonated with the community. Keep sharing your insights.",
      badge: { icon: celebrationIcon(Heart), name: 'Reaction Milestone' },
      stats: [{ value: '100', label: 'Reactions' }, { value: '#4', label: 'This week' }],
    },
    role: {
      type: 'role',
      title: 'You\u2019re a Moderator Now',
      description: "The community has recognized your leadership. Welcome to the team.",
      badge: { icon: celebrationIcon(Shield), name: 'Moderator' },
      stats: [{ value: '2.1k', label: 'Posts read' }, { value: '98%', label: 'Helpful rate' }],
    },
  }

  const toggleTile = (value) => {
    setSelectedTiles((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ))
  }

  const toggleGoal = (value) => {
    setSelectedGoals((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ))
  }

  const toggleCategory = (value) => {
    setSelectedCategories((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ))
  }

  const updateReviewField = (key, value) => {
    setReviewFields((current) => ({ ...current, [key]: value }))
  }

  const verificationExampleMethods = [
    {
      value: 'instagram-dm',
      icon: tileIcon(Mail),
      title: 'Confirm with an Instagram DM',
      description: 'Send the verification code from the connected Instagram account.',
    },
    {
      value: 'email-domain',
      icon: tileIcon(BadgeCheck),
      title: 'Confirm with a creator email',
      description: 'Use a detected creator email when social access is not convenient.',
    },
  ]

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('section', activeSection)
    window.history.replaceState({}, '', url)
  }, [activeSection])

  return (
    <div className="min-h-screen bg-surface-raised">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <Badge variant="default" size="xs">v0.1</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-0.5">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={[
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  activeSection === s
                    ? 'bg-brand-subtle text-brand-dark'
                    : 'text-text-secondary hover:bg-surface-sunken hover:text-text',
                ].join(' ')}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main
        className={[
          activeSection === 'Pages' ? 'max-w-none' : activeSection === 'Patterns' ? 'max-w-6xl' : 'max-w-5xl',
          'mx-auto px-6 py-10 space-y-14',
        ].join(' ')}
      >

        {/* ── COLORS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Colors' && (
          <>
            <Section title="Brand Colors" description="Primary brand palette. Use semantic tokens in components, not primitives.">
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50,100,200,300,400,500,600,700,800,900,950].map(w => (
                  <ColorSwatch key={w} token={`raptive-${w}`} value={colorTokens[`raptive-${w}`]} label={w === 500 ? 'primary' : ''} />
                ))}
              </div>
            </Section>

            <Section title="Semantic Tokens" description="Purpose-named aliases. These map to Figma variables.">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Brand</p>
                  <ColorSwatch token="brand.DEFAULT" value={colorTokens.brand.DEFAULT} label="primary" />
                  <ColorSwatch token="brand.light" value={colorTokens.brand.light} />
                  <ColorSwatch token="brand.dark" value={colorTokens.brand.dark} />
                  <ColorSwatch token="brand.subtle" value={colorTokens.brand.subtle} />
                  <ColorSwatch token="brand.muted" value={colorTokens.brand.muted} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Surface</p>
                  <ColorSwatch token="surface.DEFAULT" value={colorTokens.surface.DEFAULT} />
                  <ColorSwatch token="surface.raised" value={colorTokens.surface.raised} />
                  <ColorSwatch token="surface.sunken" value={colorTokens.surface.sunken} />
                  <ColorSwatch token="surface.overlay" value={colorTokens.surface.overlay} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Text + Border</p>
                  <ColorSwatch token="text.DEFAULT" value={colorTokens.text.DEFAULT} />
                  <ColorSwatch token="text.secondary" value={colorTokens.text.secondary} />
                  <ColorSwatch token="text.tertiary" value={colorTokens.text.tertiary} />
                  <ColorSwatch token="border.DEFAULT" value={colorTokens.border.DEFAULT} />
                  <ColorSwatch token="border.strong" value={colorTokens.border.strong} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Status + Gamification</p>
                  <ColorSwatch token="status.success" value={colorTokens.status.success} />
                  <ColorSwatch token="status.warning" value={colorTokens.status.warning} />
                  <ColorSwatch token="status.error" value={colorTokens.status.error} />
                  <ColorSwatch token="status.info" value={colorTokens.status.info} />
                  <ColorSwatch token="gamification.gold" value={colorTokens.gamification.gold} />
                  <ColorSwatch token="gamification.purple" value={colorTokens.gamification.purple} />
                </div>
              </div>
            </Section>
          </>
        )}

        {/* ── TYPOGRAPHY ─────────────────────────────────────────────────── */}
        {activeSection === 'Typography' && (
          <Section title="Typography Scale" description="Current token values from tokens/typography.js. This section reflects both the size scale and the text-color intent from the provided token set.">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Text Color Tokens</p>
                  <ColorSwatch token="Typography.text-color.primary" value={colorTokens.text.DEFAULT} />
                  <ColorSwatch token="Typography.text-color.secondary" value={colorTokens.text.secondary} />
                  <ColorSwatch token="Typography.text-color.tertiary" value={colorTokens.text.tertiary} />
                  <ColorSwatch token="Typography.text-color.placeholder" value={colorTokens.text.placeholder} />
                  <ColorSwatch token="text.action-subtle" value={colorTokens.text['action-subtle']} />
                  <ColorSwatch token="text.disabled" value={colorTokens.text.disabled} />
                  <ColorSwatch token="text.brand" value={colorTokens.text.brand} />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Usage Notes</p>
                  <div className="space-y-2 rounded-xl border border-border bg-surface-raised p-4">
                    <p className="text-sm text-text"><span className="font-medium">Primary:</span> headings, body, default actions</p>
                    <p className="text-sm text-text-secondary"><span className="font-medium text-text">Secondary:</span> supporting labels, helper text, and metadata</p>
                    <p className="text-sm text-text-tertiary"><span className="font-medium text-text">Tertiary:</span> lower-emphasis metadata and optional inline qualifiers</p>
                    <p className="text-sm text-text-placeholder"><span className="font-medium text-text">Placeholder:</span> empty field hints and example input text</p>
                    <p className="text-sm text-text-action-subtle"><span className="font-medium text-text">Action Subtle:</span> quiet form actions like cancel and remove</p>
                    <p className="text-sm text-text-disabled"><span className="font-medium text-text">Disabled:</span> unavailable or locked input content</p>
                    <p className="text-sm text-text-brand"><span className="font-medium text-text">Brand:</span> branded links, accents, and emphasized inline actions</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Font Family + Weight Tokens</p>
                  <div className="space-y-3 rounded-xl border border-border bg-surface-raised p-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-xs font-mono text-text-tertiary">family.font family</span>
                      <span className="font-sans text-sm text-text">DM Sans</span>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-xs font-mono text-text-tertiary">family.newsreader</span>
                      <span className="font-newsreader text-sm text-text">Newsreader</span>
                    </div>
                    {[
                      ['light', typographyTokens.fontWeight.light],
                      ['regular', typographyTokens.fontWeight.normal],
                      ['medium', typographyTokens.fontWeight.medium],
                      ['bold', typographyTokens.fontWeight.bold],
                    ].map(([name, value]) => (
                      <div key={name} className="flex items-baseline justify-between gap-4">
                        <span className="text-xs font-mono text-text-tertiary">{`font-weight.${name}`}</span>
                        <span className="text-sm text-text">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Line Height + Letter Spacing Tokens</p>
                  <div className="space-y-3 rounded-xl border border-border bg-surface-raised p-4">
                    {[
                      ['line-height.xs', typographyTokens.lineHeight.xs],
                      ['line-height.sm', typographyTokens.lineHeight.sm],
                      ['line-height.md', typographyTokens.lineHeight.md],
                      ['line-height.lg', typographyTokens.lineHeight.lg],
                      ['line-height.xl', typographyTokens.lineHeight.xl],
                      ['line-height.xxl', typographyTokens.lineHeight.xxl],
                      ['letter-spacing.sm', typographyTokens.letterSpacing.sm],
                      ['letter-spacing.md', typographyTokens.letterSpacing.md],
                      ['letter-spacing.lg', typographyTokens.letterSpacing.lg],
                    ].map(([name, value]) => (
                      <div key={name} className="flex items-baseline justify-between gap-4">
                        <span className="text-xs font-mono text-text-tertiary">{name}</span>
                        <span className="text-sm text-text">
                          {name.startsWith('line-height') ? pxFromRemString(value) : `${value}rem`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 divide-y divide-border">
              {[
                { label: `${tokenTypographyLabel('hero')} · text-color.primary`, className: 'font-newsreader text-hero font-normal text-text', sample: 'Bring creators in with confidence' },
                { label: `${tokenTypographyLabel('display')} · text-color.primary`, className: 'font-display text-4xl font-bold text-text', sample: 'Community First' },
                { label: `${tokenTypographyLabel('heading-1')} · text-color.primary`, className: 'font-display text-2xl font-bold text-text', sample: 'Welcome Back, Maria' },
                { label: `${tokenTypographyLabel('heading-2')} · text-color.primary`, className: 'font-display text-lg font-medium text-text', sample: 'Your Achievements' },
                { label: `${tokenTypographyLabel('body')} · text-color.primary`, className: 'font-sans text-base text-text', sample: 'Share what\u2019s on your mind with your community.' },
                { label: `${tokenTypographyLabel('label-lg')} · text-color.secondary`, className: 'font-sans text-sm font-medium text-text-secondary', sample: 'Joined 3 months ago · 142 posts · 1.2k reactions' },
                { label: `${tokenTypographyLabel('label-md')} · text-color.secondary`, className: 'font-sans text-xs font-medium text-text-secondary', sample: 'This appears on your public profile.' },
                { label: `${tokenTypographyLabel('label-sm')} · text-color.tertiary`, className: 'font-sans text-2xs font-medium text-text-tertiary', sample: 'MEMBER SINCE 2026' },
                { label: `${tokenTypographyLabel('body-sm')} · text-color.placeholder`, className: 'font-sans text-sm text-text-placeholder', sample: 'Paste your website URL' },
                { label: `${tokenTypographyLabel('label-lg')} · text.action-subtle`, className: 'font-sans text-sm font-medium text-text-action-subtle', sample: 'Cancel' },
                { label: `${tokenTypographyLabel('body-sm')} · text.disabled`, className: 'font-sans text-sm text-text-disabled', sample: 'creator@raptive.com' },
                { label: `${tokenTypographyLabel('label-lg')} · text.brand`, className: 'font-sans text-sm font-medium text-text-brand', sample: 'View guidelines' },
                { label: 'mono / utility', className: 'font-mono text-sm text-text-secondary', sample: 'badge_id: community-champion-v1' },
              ].map(({ label, className, sample }) => (
                <div key={label} className="pt-4 flex items-baseline justify-between gap-8 first:pt-0">
                  <span className="text-xs font-mono text-text-secondary w-40 flex-shrink-0">{label}</span>
                  <span className={className}>{sample}</span>
                </div>
              ))}
            </div>
            </div>
          </Section>
        )}

        {/* ── FORMS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Forms' && (
          <>
            <Section title="Text Input" description="Reusable single-line field built on the shared FormField wrapper.">
              <div className="grid gap-6 md:grid-cols-2">
                <TextInput
                  label="Creator Name"
                  description="This appears on your public profile."
                  placeholder="Maria Chen"
                />
                <TextInput
                  label="Raptive Handle"
                  prefix="@"
                  placeholder="mariawrites"
                  required
                />
                <TextInput
                  label="Website"
                  prefix="https://"
                  placeholder="yourdomain.com"
                  optional
                />
                <TextInput
                  label="Primary Niche"
                  value="Parenting"
                  readOnly
                  suffix="Locked"
                />
                <TextInput
                  label="Creator Email"
                  type="email"
                  prefix={affixIcon(Mail)}
                  placeholder="creator@example.com"
                />
                <TextInput
                  label="Verified Website"
                  suffix={affixIcon(BadgeCheck)}
                  placeholder="yourdomain.com"
                />
                <TextInput
                  label="Large Affix Alignment"
                  prefix={affixIcon(Rocket)}
                  placeholder="Paste a creator URL"
                  inputClassName="text-lg leading-md"
                  affixLineHeight="md"
                />
              </div>
            </Section>

            <Section title="Field States">
              <div className="grid gap-6 md:grid-cols-2">
                <TextInput
                  label="Headline"
                  placeholder="Helping families cook smarter"
                />
                <TextInput
                  label="Email"
                  type="email"
                  value="creator@raptive.com"
                  disabled
                  onChange={() => {}}
                />
                <TextInput
                  label="Instagram"
                  prefix="@"
                  placeholder="creatorhandle"
                  error="Please enter a valid handle."
                />
                <FormField
                  label="Custom Field Wrapper"
                  description="Use FormField directly when a control is not a text input."
                >
                  <FieldShell readOnly>
                    Placeholder control
                  </FieldShell>
                </FormField>
              </div>
            </Section>

            <Section title="Textarea And Select" description="Shared field family extended to multi-line and native selection controls.">
              <div className="grid gap-6 md:grid-cols-2">
                <Textarea
                  label="Creator Bio"
                  description="A short introduction shown on your profile."
                  placeholder="Tell your audience what you create and who you help."
                />
                <Textarea
                  label="Voice And Tone"
                  placeholder="Warm, practical, and expert-led."
                  readOnly
                  value="Warm, practical, and expert-led."
                />
                <Select
                  label="Primary Goal"
                  defaultValue=""
                  options={[
                    { value: 'grow-audience', label: 'Grow audience' },
                    { value: 'increase-revenue', label: 'Increase revenue' },
                    { value: 'build-community', label: 'Build community' },
                  ]}
                  description="Choose the main outcome you want from onboarding."
                />
                <Select
                  label="Creator Stage"
                  value="emerging"
                  disabled
                  onChange={() => {}}
                  options={[
                    { value: 'emerging', label: 'Emerging creator' },
                    { value: 'established', label: 'Established creator' },
                  ]}
                />
                <Select
                  label="Revenue Goal"
                  defaultValue=""
                  error="Choose a revenue goal to continue."
                  options={[
                    { value: 'ads', label: 'Grow ad revenue' },
                    { value: 'sponsorships', label: 'Book more sponsorships' },
                  ]}
                />
                <Select
                  label="Review Status"
                  value="approved"
                  readOnly
                  onChange={() => {}}
                  options={[
                    { value: 'approved', label: 'Approved for preview' },
                    { value: 'pending', label: 'Pending review' },
                  ]}
                />
              </div>
              <DocumentationNote>
                Always pair with a visible label. The chevron affordance is decorative — do not rely on it as the only indicator of interactivity.
              </DocumentationNote>
            </Section>

            <Section title="Selection Controls" description="Primitives for onboarding choices, consents, and goal selection.">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Checkbox
                    id="weekly-updates"
                    label="Weekly creator updates"
                    description="Get onboarding tips and product updates by email."
                    checked={newsletterOptIn}
                    onChange={(event) => setNewsletterOptIn(event.target.checked)}
                  />
                  <Checkbox
                    id="community-guidelines"
                    label="Community guidelines accepted"
                    description="Required before publishing your first profile."
                    checked
                    disabled
                    onChange={() => {}}
                  />
                </div>
                <RadioGroup
                  name="primary-goal"
                  label="Primary onboarding goal"
                  description="Choose the single most important outcome for this creator."
                  value={goalValue}
                  onChange={setGoalValue}
                  options={[
                    { value: 'grow-audience', label: 'Grow audience', description: 'Build reach across content and email.' },
                    { value: 'increase-revenue', label: 'Increase revenue', description: 'Focus on monetization and sponsorship readiness.' },
                    { value: 'build-community', label: 'Build community', description: 'Encourage repeat participation and loyalty.' },
                  ]}
                />
              </div>
            </Section>

            <Section title="Color Swatch Button" description="Reusable palette-choice control for theme and brand-preview flows.">
              <FormField
                label="Brand palette"
                description="Pick the accent color that should lead the first preview impression."
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {brandPreviewPalette.map((color) => (
                    <ColorSwatchButton
                      key={color}
                      color={color}
                      selected={selectedSwatch === color}
                      onClick={() => setSelectedSwatch(color)}
                    />
                  ))}
                </div>
              </FormField>
            </Section>

            <Section title="Color Input" description="Hex entry plus native color picker with automatic black/white foreground guidance.">
              <div className="grid gap-4 md:grid-cols-2">
                <ColorInput
                  label="Main button"
                  value={primaryButtonColor}
                  onChange={setPrimaryButtonColor}
                />
                <ColorInput
                  label="Back button"
                  value={secondaryButtonColor}
                  onChange={setSecondaryButtonColor}
                />
              </div>
            </Section>

            <Section title="Avatar Upload And Shape" description="Reusable upload and shape controls for preview/editor surfaces.">
              <div className="grid gap-6 md:grid-cols-2">
                <AvatarUpload
                  label="Avatar"
                  value={demoAvatar}
                  onChange={setDemoAvatar}
                />
                <SegmentedControl
                  label="Logo shape"
                  value={demoShape}
                  options={[
                    { value: 'circle', label: 'Circle' },
                    { value: 'rectangle', label: 'Rectangle' },
                  ]}
                  onChange={setDemoShape}
                />
              </div>
            </Section>

            <Section title="Option Tiles" description="Reusable selectable cards for goals, audiences, and category pickers.">
              <div className="grid gap-4 md:grid-cols-3">
                <OptionTile
                  icon={tileIcon(Megaphone)}
                  title="Audience Growth"
                  description="Prioritize discovery, distribution, and repeat visits."
                  selected={selectedTiles.includes('audience')}
                  multiSelect
                  onClick={() => toggleTile('audience')}
                />
                <OptionTile
                  icon={tileIcon(MessageSquare)}
                  title="Community"
                  description="Focus on conversations, comments, and member connection."
                  selected={selectedTiles.includes('community')}
                  multiSelect
                  onClick={() => toggleTile('community')}
                />
                <OptionTile
                  icon={tileIcon(HandCoins)}
                  title="Revenue"
                  description="Build packages, performance proof, and advertiser readiness."
                  selected={selectedTiles.includes('revenue')}
                  multiSelect
                  onClick={() => toggleTile('revenue')}
                />
              </div>
              <DocumentationNote>
                Hover, tap, and selection animations respect prefers-reduced-motion.
              </DocumentationNote>
            </Section>

            <Section title="Goal Selection Grid" description="First onboarding pattern composed directly from OptionTile primitives.">
              <GoalSelectionGrid
                title="What do you want this creator to prioritize?"
                description="Choose one or more outcomes so onboarding can tailor recommendations and next steps."
                selected={selectedGoals}
                onToggle={toggleGoal}
                goals={[
                  {
                    value: 'audience-growth',
                    icon: tileIcon(Megaphone),
                    title: 'Audience growth',
                    description: 'Improve discovery, distribution, and repeat visits.',
                  },
                  {
                    value: 'community',
                    icon: tileIcon(MessageSquare),
                    title: 'Community',
                    description: 'Strengthen comments, participation, and belonging.',
                  },
                  {
                    value: 'revenue',
                    icon: tileIcon(HandCoins),
                    title: 'Revenue',
                    description: 'Increase sponsorship readiness and monetization confidence.',
                  },
                  {
                    value: 'workflow',
                    icon: tileIcon(Settings2),
                    title: 'Workflow efficiency',
                    description: 'Reduce publishing friction and speed up daily operations.',
                  },
                  {
                    value: 'authority',
                    icon: tileIcon(Award),
                    title: 'Authority',
                    description: 'Present expertise more clearly across profile and content.',
                  },
                  {
                    value: 'retention',
                    icon: tileIcon(RotateCcw),
                    title: 'Retention',
                    description: 'Create stronger habits and bring audiences back more often.',
                  },
                ]}
              />
            </Section>

            <Section title="Category Picker" description="Searchable, multi-select pattern for creator verticals and niche selection.">
              <CategoryPicker
                title="Choose the creator categories that fit best"
                description="These guide recommendations, examples, and profile framing across onboarding."
                searchValue={categorySearch}
                onSearchChange={setCategorySearch}
                selected={selectedCategories}
                onToggle={toggleCategory}
                categories={[
                  {
                    value: 'food',
                    icon: tileIcon(UtensilsCrossed),
                    title: 'Food',
                    description: 'Recipes, meal planning, kitchen tips, and cooking inspiration.',
                    tags: ['recipes', 'meal planning', 'cooking'],
                  },
                  {
                    value: 'parenting',
                    icon: tileIcon(Baby),
                    title: 'Parenting',
                    description: 'Family routines, child development, and parent life.',
                    tags: ['family', 'kids', 'home'],
                  },
                  {
                    value: 'home',
                    icon: tileIcon(House),
                    title: 'Home',
                    description: 'Decor, organization, hosting, and DIY improvements.',
                    tags: ['decor', 'organization', 'hosting'],
                  },
                  {
                    value: 'wellness',
                    icon: tileIcon(Waves),
                    title: 'Wellness',
                    description: 'Fitness, mindfulness, habits, and sustainable self-care.',
                    tags: ['fitness', 'habits', 'mindfulness'],
                  },
                  {
                    value: 'finance',
                    icon: tileIcon(BriefcaseBusiness),
                    title: 'Personal Finance',
                    description: 'Budgeting, saving, planning, and practical money education.',
                    tags: ['budgeting', 'saving', 'career'],
                  },
                  {
                    value: 'travel',
                    icon: tileIcon(Plane),
                    title: 'Travel',
                    description: 'Guides, itineraries, family trips, and destination recs.',
                    tags: ['guides', 'itineraries', 'destinations'],
                  },
                ]}
              />
            </Section>
          </>
        )}

        {/* ── BUTTONS ────────────────────────────────────────────────────── */}
        {activeSection === 'Buttons' && (
          <>
            <Section title="Variants" description="Six semantic variants covering all use cases. Secondary maps to the Figma outline treatment.">
              <Row>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="black">Black</Button>
                <Button variant="link">Link</Button>
              </Row>
            </Section>
            <Section title="Paired Icons" description="Inline icons inherit the label line-height through the shared paired icon utility.">
              <Row label="Icon before and after">
                <Button iconBefore={miniIcon(Sparkles)}>Create preview</Button>
                <Button variant="secondary" iconAfter={miniIcon(Rocket)}>Continue</Button>
              </Row>
            </Section>
            <Section title="Canonical Token References" description="Reference button treatments aligned to the current shared action tokens.">
              <Row label="Action token treatment">
                <Button
                  variant="ghost"
                  className="bg-transparent text-text hover:bg-surface-sunken active:bg-neutral-100"
                >
                  Naked
                </Button>
                <Button>Action Primary</Button>
              </Row>
            </Section>
            <Section title="Sizes">
              <Row label="Shared button scale">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Row>
              <Row label="Canonical treatment references">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-transparent text-text hover:bg-surface-sunken active:bg-neutral-100"
                >
                  Naked / Small
                </Button>
                <Button size="md" variant="secondary">
                  Secondary / Outline
                </Button>
                <Button size="lg">Action Primary / Large</Button>
              </Row>
            </Section>
            <Section title="States">
              <Row label="Loading">
                <Button loading>Primary</Button>
                <Button variant="secondary" loading>Secondary</Button>
                <Button loading loadingLabel="Saving">Save draft</Button>
              </Row>
              <Row label="Success">
                <Button success>Submitted</Button>
                <Button success successLabel="Saved">Save draft</Button>
              </Row>
              <Row label="Disabled">
                <Button disabled>Primary</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="ghost" disabled>Ghost</Button>
              </Row>
              <Row label="Full Width">
                <div className="w-full max-w-xs">
                  <Button fullWidth>Full Width Button</Button>
                </div>
              </Row>
              <DocumentationNote>
                Decorative scale and label swap animations respect prefers-reduced-motion. Loading and success animations always run.
              </DocumentationNote>
            </Section>
          </>
        )}

        {/* ── BADGES ─────────────────────────────────────────────────────── */}
        {activeSection === 'Badges' && (
          <>
            <Section title="Variants" description="Covers status, brand, and gamification contexts.">
              <Row>
                <Badge variant="default">Default</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="gold">Gold</Badge>
                <Badge variant="purple">Purple</Badge>
                <Badge variant="outline">Outline</Badge>
              </Row>
            </Section>
            <Section title="Sizes">
              <Row>
                <Badge size="xs">Extra Small</Badge>
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </Row>
            </Section>
            <Section title="With Icon">
              <Row>
                <Badge size="xs" variant="brand" icon={miniIcon(BadgeCheck)}>Extra Small</Badge>
                <Badge size="sm" variant="success" icon={miniIcon(Sparkles)}>Small</Badge>
                <Badge size="md" variant="gold" icon={miniIcon(Award)}>Medium</Badge>
              </Row>
            </Section>
            <Section title="With Dot">
              <Row>
                <Badge variant="success" dot>Online</Badge>
                <Badge variant="warning" dot>Away</Badge>
                <Badge variant="error" dot>Busy</Badge>
                <Badge variant="gold" dot>Top Contributor</Badge>
              </Row>
            </Section>
            <Section title="Removable">
              <Row>
                {['React', 'Design Systems', 'Gamification'].map(t => (
                  <Badge key={t} variant="brand" onRemove={() => {}}>#{t}</Badge>
                ))}
              </Row>
              <DocumentationNote>
                Removable badges require an aria-label on the remove button. Example: aria-label='Remove [badge label]'
              </DocumentationNote>
            </Section>
          </>
        )}

        {/* ── AVATARS ────────────────────────────────────────────────────── */}
        {activeSection === 'Avatars' && (
          <>
            <Section title="Sizes">
              <Row>
                {['xs','sm','md','lg','xl','2xl'].map(s => (
                  <Avatar key={s} name="Julia Child" size={s} />
                ))}
              </Row>
            </Section>
            <Section title="Image Variant" description="Avatar with photo source instead of initials fallback.">
              <Row>
                {['xs','sm','md','lg'].map((size, index) => (
                  <Avatar
                    key={size}
                    name={avatarImageSet[index].name}
                    src={avatarImageSet[index].src}
                    size={size}
                  />
                ))}
              </Row>
            </Section>
            <Section title="With Status">
              <Row>
                <Avatar name="Nicole PM" size="md" status="online" />
                <Avatar name="Brynne B" size="md" status="away" />
                <Avatar name="Cyle C" size="md" status="busy" />
                <Avatar name="Kimm SVP" size="md" status="offline" />
              </Row>
            </Section>
            <Section title="With Notification Count">
              <Row>
                <Avatar name="Julia Child" size="md" count={3} />
                <Avatar name="Nicole PM" size="md" count={12} />
                <Avatar name="Kimm SVP" size="md" count={100} />
              </Row>
            </Section>
            <Section title="Avatar Group">
              <Row>
                <AvatarGroup
                  size="sm"
                  avatars={[
                    avatarImageSet[0],
                    avatarImageSet[1],
                    avatarImageSet[2],
                    avatarImageSet[3],
                    { name: 'Kimm SVP' },
                    { name: 'Will CPO' },
                  ]}
                  max={4}
                />
              </Row>
            </Section>
          </>
        )}

        {/* ── AUTHOR ROW ────────────────────────────────────────────────── */}
        {activeSection === 'Avatars' && (
          <>
            <Section title="Streak Badges" description="Gradient role badges for community gamification.">
              <Row>
                <StreakBadge variant="leader" label="Community Leader" />
                <StreakBadge variant="superfan" label="Superfan" />
                <StreakBadge variant="tastemaker" label="Tastemaker" />
              </Row>
            </Section>

            <Section title="Author Row" description="Community member row from Figma: molecules/rows/author.">
              <div className="max-w-md border border-border rounded-xs overflow-hidden">
                <AuthorRow
                  name="Jane Doe"
                  showFriendsIcon
                  badges={[
                    { variant: 'leader', label: 'Community Leader' },
                    { variant: 'superfan', label: 'Superfan' },
                    { variant: 'tastemaker', label: 'Tastemaker' },
                  ]}
                  onMore={() => {}}
                />
              </div>
              <div className="max-w-md border border-border rounded-xs overflow-hidden mt-4">
                <AuthorRow
                  name="Julia Child"
                  badges={[
                    { variant: 'superfan', label: 'Superfan' },
                  ]}
                  onMore={() => {}}
                />
              </div>
              <DocumentationNote>
                More-actions icon button requires an explicit aria-label. Example: aria-label='More options for [author name]'
              </DocumentationNote>
            </Section>

            <Section title="Media Gallery" description="Image gallery from Figma: molecules/media/gallery. Single or 5+ grid layout.">
              <Row label="Single image">
                <MediaGallery
                  images={[
                    { src: new URL('../../assets/entry-illustration.png', import.meta.url).href, alt: 'Entry' },
                  ]}
                />
              </Row>
              <Row label="5+ grid with overflow" className="mt-4">
                <MediaGallery
                  images={[
                    { src: new URL('../../assets/entry-illustration.png', import.meta.url).href, alt: 'Entry' },
                    { src: new URL('../../assets/recognition-illustration.png', import.meta.url).href, alt: 'Recognition' },
                    { src: new URL('../../assets/preview-illustration.png', import.meta.url).href, alt: 'Preview' },
                    { src: new URL('../../assets/verification-illustration.png', import.meta.url).href, alt: 'Verification' },
                    { src: new URL('../../assets/submission-illustration.png', import.meta.url).href, alt: 'Submission' },
                    { src: new URL('../../assets/entry-illustration.png', import.meta.url).href, alt: 'Extra' },
                  ]}
                />
              </Row>
            </Section>

            <Section title="Post Content" description="Community post body from Figma: post-content. Optional title, attachment card, and read more.">
              <div className="max-w-2xl border border-border rounded-xs overflow-hidden">
                <PostContent
                  title="This is the post title"
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  readMore={{ label: 'read more', onClick: () => {} }}
                />
              </div>
              <div className="max-w-2xl border border-border rounded-xs overflow-hidden mt-4">
                <PostContent
                  title="Post with attachment card"
                  body="Slow cooker recipes are the best for busy weeknights. Here's one I've been making on repeat."
                  attachment={{
                    authorName: 'Julia Child',
                    date: '2 October 12',
                    title: 'Slow Cooker Pork and Green Chili Stew',
                    excerpt: 'Slow Cooker Pork and Green Chili Stew - Chunks of lean pork, slow cooked...',
                    readingTime: 'Estimated reading time: 3 minutes',
                  }}
                  readMore={{ label: 'read more', onClick: () => {} }}
                />
              </div>
            </Section>

            <Section title="Post Action Bar" description="Post engagement bar from Figma: molecules/actionbar/post/desktop/feed.">
              <div className="space-y-4">
                <div className="max-w-2xl border border-border rounded-xs overflow-hidden">
                  <PostActionBar
                    reactionCount={31}
                    shareCount={13}
                    commentCount={12}
                    topReactions={['helpful', 'insightful', 'uplifting']}
                    showCommentField
                    commentAvatarName="Julia Child"
                    onReact={() => {}}
                    onShare={() => {}}
                    onComment={() => {}}
                  />
                </div>
                <div className="max-w-2xl border border-border rounded-xs overflow-hidden">
                  <PostActionBar
                    reactionCount={18}
                    shareCount={7}
                    commentCount={4}
                    aiPrompt="Need a reply starter? Try thanking the member and asking what they want to see next."
                    showCommentField
                    commentAvatarName="Julia Child"
                    onReact={() => {}}
                    onShare={() => {}}
                    onComment={() => {}}
                  />
                </div>
                <div className="max-w-2xl border border-border rounded-xs overflow-hidden">
                  <PostActionBar
                    reactionCount={8}
                    shareCount={2}
                    commentCount={1}
                    showCommentField={false}
                    onReact={() => {}}
                    onShare={() => {}}
                    onComment={() => {}}
                  />
                </div>
                <div className="max-w-2xl border border-border rounded-xs overflow-hidden">
                  <PostActionBar
                    reactionCount={0}
                    shareCount={0}
                    commentCount={0}
                    topReactions={[]}
                    showCommentField={false}
                    onReact={() => {}}
                    onShare={() => {}}
                    onComment={() => {}}
                  />
                </div>
              </div>
              <DocumentationNote>
                All icon-only action buttons require explicit aria-label. Examples: Share post, Open image upload.
              </DocumentationNote>
            </Section>

            <Section title="Feed Post" description="Full post card from Figma: organisms/posts/desktop/feed. Composes AuthorRow, image, PostContent, and PostActionBar.">
              <div className="max-w-xl">
                <FeedPost
                  author={{
                    name: 'Shari Patterson',
                  }}
                  images={[
                    { src: new URL('../../assets/entry-illustration.png', import.meta.url).href, alt: 'Food spread' },
                  ]}
                  title="If you're looking to curry flavor with your family"
                  body="Look no further! Two great and super simple recipes from the OG book will curry your tastebuds to a far off land! (Chickpea and Potato Curry, pg. 260 and Turmeric-Roasted Cauliflower, pg. 270). I served this with homemade naan instead of rice. What I love about these recipes is that they use pantry and fridge staples and come together quickly. Oh… and they taste amazing!"
                  reactionCount={31}
                  shareCount={13}
                  commentCount={12}
                  topReactions={['helpful', 'insightful', 'uplifting']}
                  onMore={() => {}}
                  onReact={() => {}}
                  onShare={() => {}}
                  onComment={() => {}}
                />
              </div>
            </Section>

            <Section title="Comment" description="Threaded comment from Figma: organisms/comment/post.">
              <div className="max-w-md border border-border rounded-xs overflow-hidden">
                <Comment
                  authorName="First Last"
                  username="username"
                  timestamp="2h"
                  isAuthor
                  badges={[
                    { variant: 'leader', label: 'Community Leader' },
                  ]}
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  reactionCount={4}
                  shareCount={13}
                  onMore={() => {}}
                  onReact={() => {}}
                  onShare={() => {}}
                  onReply={() => {}}
                />
              </div>
            </Section>
          </>
        )}

        {/* ── NAVIGATION ─────────────────────────────────────────────────── */}
        {activeSection === 'Navigation' && (
          <>
            <Section title="Community Top Navigation" description="Logged-out desktop top navigation adapted from Figma: organisms/navigation/top/desktop/default.">
              <div className="overflow-hidden rounded-xl border border-border-strong bg-white shadow-xs">
                <CommunityTopNavigation />
              </div>
            </Section>

            <Section title="Community Sidebar" description="Desktop community navigation sidebar adapted from Figma: organisms/navigation/desktop/sidebar.">
              <div className="overflow-hidden rounded-xl border border-border-strong bg-white shadow-xs">
                <CommunitySidebar />
              </div>
            </Section>

            <Section title="Community Sidebar Compact" description="Condensed community navigation rail for constrained review surfaces.">
              <div className="inline-flex overflow-hidden rounded-xl border border-border-strong bg-white shadow-xs">
                <CommunitySidebar compact />
              </div>
            </Section>

            <Section title="Right Rail Modules" description="Home feed right-rail stack adapted from Figma: welcome card plus community rules module.">
              <div className="inline-flex flex-col gap-4 overflow-hidden rounded-xl border border-border-strong bg-surface-raised p-4 shadow-xs">
                <RightRailWelcomeCard />
                <RightRailCommunityRulesCard />
              </div>
            </Section>
          </>
        )}

        {/* ── PAGES ─────────────────────────────────────────────────────── */}
        {activeSection === 'Pages' && (
          <div className="mx-auto flex w-[1440px] flex-col gap-4">
            {/* no token available: page-template review intentionally renders the fixed desktop frame width. */}
            <div className="space-y-1 text-left">
              <h3 className="text-base font-semibold text-text">Home Feed Template</h3>
              <p className="text-sm text-text-secondary">
                Edge-to-edge top navigation with left community sidebar, center stacked feed posts, and right-rail support modules.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border-strong bg-surface-raised shadow-xs">
              <HomeFeedPageTemplate />
            </div>
          </div>
        )}

        {/* ── PATTERNS ───────────────────────────────────────────────────── */}
        {activeSection === 'Patterns' && (
          <>
            <Section title="Single Field Intake" description="Desktop-first opening step for the real creator application flow.">
              <SingleFieldIntake
                title="Bring a creator into the application flow with one confident move."
                description="Paste a creator URL or social handle. We’ll recognize the profile, fetch the first identity signals, and show a preview before anything gets submitted."
                value={creatorUrl}
                onChange={(event) => setCreatorUrl(event.target.value)}
                onSubmit={() => {
                  setIntakeLoading(true)
                  window.setTimeout(() => setIntakeLoading(false), 900)
                }}
                loading={intakeLoading}
                helperText="No long application form up front."
              />
            </Section>

            <Section title="Single Field Intake Variants" description="Trust points, disabled CTA, custom success copy, and the no-aside layout state.">
              <div className="space-y-8">
                <SingleFieldIntake
                  title="Show trust cues while recognition runs."
                  description="Use short proof points to explain why the first step is lightweight."
                  value="https://instagram.com/juliachild"
                  onChange={() => {}}
                  onSubmit={() => {}}
                  loading
                  ctaLabel="Recognize creator"
                  ctaSuccessLabel="Recognized"
                  helperText="The success label confirms the recognition pass."
                  trustPoints={[
                    {
                      title: 'Fast recognition',
                      description: 'We pull only the early signals needed to start a preview.',
                    },
                    {
                      title: 'Editable later',
                      description: 'Fetched profile details can be corrected before submission.',
                    },
                    {
                      title: 'No commitment yet',
                      description: 'Nothing is submitted until the creator confirms the final step.',
                    },
                  ]}
                />
                <SingleFieldIntake
                  title="Hold the CTA until the creator URL is usable."
                  description="The disabled state keeps the first step from advancing before a recognizable profile is present."
                  value=""
                  onChange={() => {}}
                  onSubmit={() => {}}
                  ctaDisabled
                  helperText="Paste a creator URL to unlock the action."
                />
                <SingleFieldIntake
                  title="Use the focused no-aside layout when the art should become the full rail."
                  description="This state keeps the same form contract while removing the explanatory aside content."
                  value="juliachild.com"
                  onChange={() => {}}
                  onSubmit={() => {}}
                  showAside={false}
                  helperText="The image rail expands without changing the form behavior."
                />
              </div>
            </Section>

            <Section title="Data Gathering Loader" description="Dedicated in-between loading step that confirms creator data is being gathered before the fetch confirmation appears.">
              <DataGatheringLoader
                creatorUrl={creatorUrl}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
              />
              <DocumentationNote>
                Row entrance respects prefers-reduced-motion. Shimmer and pulse always run — they communicate loading.
              </DocumentationNote>
            </Section>

            <Section title="Fetch Confirmation" description="Fetched creator confirmation step with editable website and account handles before review.">
              <FetchConfirmation
                loading={false}
                creator={{
                  name: reviewFields.name,
                  reach: '526K',
                  reachDetail: '526,000 combined followers',
                }}
                website={reviewFields.url}
                accounts={[
                  {
                    id: 'instagram',
                    platform: 'Instagram',
                    handle: '@juliachild',
                    url: 'https://instagram.com/juliachild',
                    followers: '318,000 followers',
                  },
                  {
                    id: 'tiktok',
                    platform: 'TikTok',
                    handle: '@juliachild',
                    url: 'https://tiktok.com/@juliachild',
                    followers: '124,000 followers',
                  },
                  {
                    id: 'pinterest',
                    platform: 'Pinterest',
                    handle: '@juliachild',
                    url: 'https://pinterest.com/juliachild',
                    followers: '84,000 followers',
                  },
                ]}
                editingField={null}
                editDraft=""
                onEditDraftChange={() => {}}
                onStartEditing={() => {}}
                onCancelEditing={() => {}}
                onSaveEditing={() => {}}
                onAddAccount={() => {}}
                onRemoveAccount={() => {}}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{ label: 'Looks right' }}
              />
              <DocumentationNote>
                Non-loading reveal transitions respect prefers-reduced-motion. Skeleton pulse always runs.
              </DocumentationNote>
            </Section>

            <Section title="Archive · Projection Preview" description="Archived projections step kept for reference, with staged pipeline reveal from combined followers through reach and modeled revenue.">
              <ProjectionPreview
                title="Before we ask for edits, here’s the scale this creator could unlock."
                description="These early projections should make the opportunity legible without pretending they are final. The goal is confidence, not false precision."
                stats={[
                  {
                    label: 'Combined followers before overlap',
                    value: '526,000',
                    sublabel: 'Cross-platform raw total',
                    detail: 'This is the total audience signal pulled across the connected creator profiles before shared followers are removed.',
                  },
                  {
                    label: 'Estimated unique reach',
                    value: '315.6K to 420.8K',
                    sublabel: 'Overlap reduced',
                    detail: 'This assumes meaningful cross-platform overlap and reframes the audience as a more realistic blended reach range.',
                  },
                  {
                    label: 'Potential monthly ad revenue',
                    value: '$426 to $3,787',
                    sublabel: 'Monthly modeled range',
                    detail: 'This models an early monthly revenue range from projected traffic, based on how much of that reach returns as readership.',
                  },
                ]}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{ label: 'Continue to review' }}
              />
              <DocumentationNote>
                Pipeline node and bar reveal animations respect prefers-reduced-motion. Stage sequencing always runs.
              </DocumentationNote>
            </Section>

            <Section title="Review Correction" description="Trust-recovery edit step for correcting fetched identity before the emotional preview stage.">
              <ReviewCorrection
                title="Make any corrections before we build the preview."
                description="This should feel like refining a strong starting point, not filling out a form from scratch."
                fields={reviewFields}
                onFieldChange={updateReviewField}
                brandAssets={{
                  palette: brandPreviewPalette,
                  items: ['Editorial food photography', 'Short-form social avatars', 'Warm serif wordmark'],
                }}
                note="If this step feels bureaucratic, the recognition stage failed to earn trust."
                showAside={false}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{ label: 'Continue to preview' }}
              />
            </Section>

            <Section title="Exploration · Split Studio" description="Merged review + live preview exploration where meaningful edits update the mocked creator community experience immediately.">
              <PreviewBuilderStudio
                initialFields={reviewFields}
                brandAssets={{
                  palette: brandPreviewPalette,
                  items: ['Editorial food photography', 'Short-form social avatars', 'Warm serif wordmark'],
                }}
              />
            </Section>

            <Section title="Exploration · Compact WYSIWYG Option" description="A calmer, tighter editor option with plain-language fields and a small live preview for less technical users.">
              <CompactWysiwygStudio />
            </Section>

            <Section title="Accordion Panel" description="Standalone panel states for compact editor groups.">
              <div className="max-w-xl divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                <AccordionPanel
                  icon={Settings2}
                  label="Community basics"
                  sublabel="Name, summary, and category fields"
                  open
                  onToggle={() => {}}
                >
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Open panels reveal the field group while keeping the paired icon, label, sublabel, and chevron aligned.
                  </p>
                </AccordionPanel>
                <AccordionPanel
                  icon={ShieldCheck}
                  label="Verification"
                  sublabel="Collapsed section"
                  open={false}
                  onToggle={() => {}}
                >
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Closed content stays hidden until the panel opens.
                  </p>
                </AccordionPanel>
              </div>
              <DocumentationNote>
                Trigger uses aria-expanded and aria-controls pointing to the panel id. Panel id is generated with useId.
              </DocumentationNote>
              <DocumentationNote>
                Chevron rotation respects prefers-reduced-motion.
              </DocumentationNote>
            </Section>

            <Section title="Compact Field" description="Compact editor field variants used inside tighter creator setup surfaces.">
              <div className="max-w-xl space-y-4 rounded-2xl border border-border bg-surface p-4">
                <CompactField
                  label="Name"
                  value="Julia Child"
                  onChange={() => {}}
                />
                <CompactField
                  label="Summary"
                  type="textarea"
                  rows={3}
                  value="Food creator and community builder helping families cook smarter."
                  onChange={() => {}}
                />
                <CompactField
                  label="Vertical"
                  type="select"
                  value="food"
                  onChange={() => {}}
                  options={[
                    { value: 'food', label: 'Food' },
                    { value: 'parenting', label: 'Parenting' },
                    { value: 'wellness', label: 'Wellness' },
                  ]}
                />
              </div>
            </Section>

            <Section title="Community Preview Card" description="Aspirational preview moment that turns corrected inputs into something the creator can want.">
              <CommunityPreviewCard
                title="This is what the creator experience could start to look like."
                description="The preview should feel plausible, branded, and emotionally rewarding without pretending it is final."
                creator={{
                  name: reviewFields.name,
                  summary: reviewFields.summary,
                }}
                categories={['Food', 'Parenting']}
                stats={[
                  { label: 'Example posts', value: '12' },
                  { label: 'Early members', value: '186' },
                  { label: 'Weekly cadence', value: '3x' },
                ]}
                posts={[
                  {
                    author: 'Julia Child',
                    title: 'Three weeknight dinners my kids will actually eat',
                    excerpt: 'A fast collection of reliable meals that don’t require a second grocery run halfway through the week.',
                    meta: 'Pinned discussion • 2h ago',
                  },
                  {
                    author: 'Community member',
                    title: 'What do you pack for long tournament weekends?',
                    excerpt: 'Looking for snack ideas that survive the car ride and still count as real food by day two.',
                    meta: 'Newest thread • 18 replies',
                  },
                ]}
                secondaryAction={{ label: 'Back to edits', variant: 'ghost' }}
                primaryAction={{ label: 'Continue to verification' }}
              />
              <DocumentationNote>
                Preview reveal animation respects prefers-reduced-motion.
              </DocumentationNote>
            </Section>

            <Section title="Verification Step" description="Lightweight commitment and identity confirmation step before the final submission moment, with the Instagram DM path expanding inline.">
              <VerificationStep
                title="One last check so we know this request is really coming from the creator."
                description="Keep verification short and legible. This is the handshake that turns excitement into commitment."
                methods={[
                  {
                    value: 'instagram-dm',
                    icon: tileIcon(Mail),
                    title: 'Confirm with an Instagram DM',
                    description: 'We’ll send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long. Just DM code to @raptive_community from @juliachild.',
                  },
                  {
                    value: 'email-domain',
                    icon: tileIcon(BadgeCheck),
                    title: 'Confirm with a creator email',
                    description: 'Use a domain-linked creator email for a faster verification path when direct social access is not convenient.',
                  },
                ]}
                selectedMethod={verificationMethod}
                onSelectMethod={setVerificationMethod}
                confirmed={verificationConfirmed}
                onConfirmChange={setVerificationConfirmed}
                instagramDmDetail={{
                  code: 'CHILD-453',
                  destinationHandle: '@raptive_community',
                  originHandle: '@juliachild',
                  confirmSentPending: false,
                }}
                onConfirmDmSent={() => {}}
                reassurance={[
                  {
                    icon: miniIcon(BadgeCheck),
                    title: 'Short confirmation',
                    description: 'The creator receives a quick ownership check, not a full application form all over again.',
                  },
                  {
                    icon: miniIcon(Rocket),
                    title: 'Submission follows immediately',
                    description: 'Once confirmed, the final step can feel exclusive and complete instead of stalled.',
                  },
                  {
                    icon: miniIcon(ShieldCheck),
                    title: 'Trust stays intact',
                    description: 'The screen explains why verification exists so the momentum from preview does not collapse here.',
                  },
                ]}
                secondaryAction={{ label: 'Back to preview', variant: 'ghost' }}
                primaryAction={{ label: 'Confirm and submit' }}
              />
              <DocumentationNote>
                Expand/collapse controls use aria-expanded. Confirmation checkbox requires an associated label.
              </DocumentationNote>
            </Section>

            <Section title="Verification Step Variants" description="Empty, email-selected, and no-aside verification states.">
              <div className="space-y-8">
                <VerificationStep
                  title="Verification will unlock once we detect a contact path."
                  description="Use the empty state when the creator profile has not exposed a usable social or email confirmation route yet."
                  methods={[]}
                  selectedMethod={null}
                  onSelectMethod={() => {}}
                  confirmed={false}
                  onConfirmChange={() => {}}
                  reassurance={[]}
                  secondaryAction={{ label: 'Back to preview', variant: 'ghost' }}
                  primaryAction={{ label: 'Confirm and submit' }}
                />
                <VerificationStep
                  title="Confirm with the creator email instead."
                  description="The email path should feel equally legitimate when Instagram access is inconvenient."
                  methods={verificationExampleMethods}
                  selectedMethod="email-domain"
                  onSelectMethod={() => {}}
                  confirmed
                  onConfirmChange={() => {}}
                  reassurance={[
                    {
                      icon: miniIcon(BadgeCheck),
                      title: 'Domain-backed',
                      description: 'The email path uses the creator contact already detected during review.',
                    },
                    {
                      icon: miniIcon(ShieldCheck),
                      title: 'No social handoff',
                      description: 'The creator can finish verification without opening Instagram.',
                    },
                  ]}
                  showAside={false}
                  secondaryAction={{ label: 'Back to preview', variant: 'ghost' }}
                  primaryAction={{ label: 'Confirm and submit' }}
                />
              </div>
            </Section>

            <Section title="Instagram DM Verification Detail" description="Standalone detail step for the expanded Instagram DM verification path.">
              <InstagramDmVerificationDetail
                title="Send this code from the creator account."
                description="This standalone version gives creators a focused verification step when the DM handoff needs more room."
                code="CHILD-453"
                destinationHandle="@raptive_community"
                originHandle="@juliachild"
                creatorEmail="hello@juliachild.com"
                confirmSentPending={false}
                onConfirmSent={() => {}}
                onUseEmailInstead={() => {}}
                secondaryAction={{ label: 'Back to verification', variant: 'ghost' }}
              />
            </Section>

            <Section title="Submission Success" description="Exclusive completion state that closes the journey with confidence instead of a generic success message.">
              <SubmissionSuccess
                title="You’re on the list. We’ll take it from here."
                summary="Hold application ID CHILD-453 for reference. Next, we’ll review the setup across brand, audience, and community fit before making a decision. Expect a follow-up by email within 24–48 hours."
                timeline={[
                  {
                    step: 'submitted',
                    title: 'Submitted',
                    description: 'Today we received your details.',
                    current: true,
                  },
                  {
                    step: 'approved',
                    title: 'Approved',
                    description: 'In 1-2 weeks we’ll send word.',
                  },
                  {
                    step: 'live',
                    title: 'Live',
                    description: 'When you’re ready.',
                  },
                ]}
                secondaryAction={{ label: 'Start new application', variant: 'secondary' }}
                primaryAction={{ label: 'Close', variant: 'black' }}
              />
            </Section>

            <Section title="Step Layout" description="Shared shell for multi-step creator onboarding screens with progress, content, and preview rail.">
              <StepLayout
                eyebrow="Creator Onboarding"
                step={2}
                totalSteps={6}
                title="Choose your creator categories"
                description="Pick the verticals that best describe this creator so onboarding can tailor guidance, examples, and profile recommendations."
                primaryAction={{ label: 'Continue' }}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                aside={(
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-text">Profile Preview</p>
                      <p className="text-sm text-text-secondary">How this step influences the public profile.</p>
                    </div>
                    <div className="rounded-3xl border border-border bg-white p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-base font-medium text-text">Julia Child</p>
                        <p className="text-sm text-text-secondary">Food creator and community builder</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="brand">Food</Badge>
                        <Badge variant="brand">Parenting</Badge>
                      </div>
                    </div>
                  </div>
                )}
              >
                <CategoryPicker
                  title="Best-fit categories"
                  description="Select all categories that apply right now."
                  searchValue={categorySearch}
                  onSearchChange={setCategorySearch}
                  selected={selectedCategories}
                  onToggle={toggleCategory}
                  categories={[
                    {
                      value: 'food',
                      icon: tileIcon(UtensilsCrossed),
                      title: 'Food',
                      description: 'Recipes, meal planning, kitchen tips, and cooking inspiration.',
                      tags: ['recipes', 'meal planning', 'cooking'],
                    },
                    {
                      value: 'parenting',
                      icon: tileIcon(Baby),
                      title: 'Parenting',
                      description: 'Family routines, child development, and parent life.',
                      tags: ['family', 'kids', 'home'],
                    },
                    {
                      value: 'home',
                      icon: tileIcon(House),
                      title: 'Home',
                      description: 'Decor, organization, hosting, and DIY improvements.',
                      tags: ['decor', 'organization', 'hosting'],
                    },
                    {
                      value: 'wellness',
                      icon: tileIcon(Waves),
                      title: 'Wellness',
                      description: 'Fitness, mindfulness, habits, and sustainable self-care.',
                      tags: ['fitness', 'habits', 'mindfulness'],
                    },
                    {
                      value: 'finance',
                      icon: tileIcon(BriefcaseBusiness),
                      title: 'Personal Finance',
                      description: 'Budgeting, saving, planning, and practical money education.',
                      tags: ['budgeting', 'saving', 'career'],
                    },
                    {
                      value: 'travel',
                      icon: tileIcon(Plane),
                      title: 'Travel',
                      description: 'Guides, itineraries, family trips, and destination recs.',
                      tags: ['guides', 'itineraries', 'destinations'],
                    },
                  ]}
                />
              </StepLayout>
            </Section>

            <Section title="Celebration Modal" description="Used for badge earned, streak milestone, new role, and other gamification moments.">
              <Row label="Trigger by type">
                {Object.keys(modalExamples).map(type => (
                  <Button
                    key={type}
                    variant="secondary"
                    size="sm"
                    onClick={() => { setModalType(type); setModalOpen(true) }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </Row>
              <div className="mt-4 p-4 bg-surface-sunken rounded-lg text-sm text-text-secondary space-y-1">
                <p className="font-medium text-text">Usage notes</p>
                <p>• Trigger on: badge earned, streak milestone, reaction milestone, role assignment</p>
                <p>• CTA leads to shareable achievement card (not yet built — next pattern)</p>
                <p>• "Maybe Later" dismisses — don't suppress it, community members should opt in to sharing</p>
                <p>• Confetti is CSS-only, no library dependency</p>
              </div>
              <DocumentationNote>
                Modal entrance and confetti animations respect prefers-reduced-motion.
              </DocumentationNote>
            </Section>
          </>
        )}

        {activeSection === 'Animation' && (
          <>
            <Section
              title="Projection Motion Lab"
              description="Exploration area for animated data storytelling patterns before they are introduced into creator onboarding flows."
            >
              <ProjectionMotionShowcase />
            </Section>

            <Section
              title="Verification Expansion"
              description="Exploration area for the verification step where the Instagram DM option expands inline and compresses the alternate path."
            >
              <VerificationStep
                title="One last check so we know this request is really coming from the creator."
                description="Keep verification short and legible. This is the handshake that turns excitement into commitment."
                methods={[
                  {
                    value: 'instagram-dm',
                    icon: tileIcon(Mail),
                    title: 'Confirm with an Instagram DM',
                    description: 'We’ll send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long. Just DM code to @raptive_community from @juliachild.',
                  },
                  {
                    value: 'email-domain',
                    icon: tileIcon(BadgeCheck),
                    title: 'Confirm with a creator email',
                    description: 'Use a domain-linked creator email for a faster verification path when direct social access is not convenient.',
                  },
                ]}
                selectedMethod={verificationMethod}
                onSelectMethod={setVerificationMethod}
                confirmed={verificationConfirmed}
                onConfirmChange={setVerificationConfirmed}
                instagramDmDetail={{
                  code: 'CHILD-453',
                  destinationHandle: '@raptive_community',
                  originHandle: '@juliachild',
                  confirmSentPending: false,
                }}
                onConfirmDmSent={() => {}}
                onUseEmailInstead={() => setVerificationMethod('email-domain')}
                reassurance={[
                  {
                    icon: miniIcon(BadgeCheck),
                    title: 'Short confirmation',
                    description: 'The creator receives a quick ownership check, not a full application form all over again.',
                  },
                  {
                    icon: miniIcon(Rocket),
                    title: 'Submission follows immediately',
                    description: 'Once confirmed, the final step can feel exclusive and complete instead of stalled.',
                  },
                  {
                    icon: miniIcon(ShieldCheck),
                    title: 'Trust stays intact',
                    description: 'The screen explains why verification exists so the momentum from preview does not collapse here.',
                  },
                ]}
                showAside={false}
                secondaryAction={{ label: 'Back to preview', variant: 'ghost' }}
                primaryAction={verificationMethod === 'instagram-dm' ? null : { label: 'Confirm and submit' }}
              />
            </Section>
          </>
        )}

      </main>

      {/* Modal rendered at root */}
      {modalOpen && (
        <CelebrationModal
          {...modalExamples[modalType]}
          isOpen={modalOpen}
          onConfirm={() => setModalOpen(false)}
          onDismiss={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
