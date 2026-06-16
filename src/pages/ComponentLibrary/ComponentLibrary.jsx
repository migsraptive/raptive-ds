import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  Award,
  Baby,
  BadgeCheck,
  BriefcaseBusiness,
  HandCoins,
  House,
  IdCard,
  Image as ImageIcon,
  Link2,
  LoaderCircle,
  Mail,
  Megaphone,
  MessageSquare,
  Palette,
  Plane,
  Plus,
  Rocket,
  RotateCcw,
  Settings2,
  Sparkles,
  UtensilsCrossed,
  Waves,
} from 'lucide-react'
import wonderVideoUrl from '../../assets/data-gathering-wonder.mp4'
import singleFieldIntakeIllustrationUrl from '../../assets/single-field-intake-illustration.png'
import submissionIllustrationUrl from '../../assets/submission-illustration.png'
import verificationIllustrationUrl from '../../assets/verification-illustration.png'
import { Button } from '../../components/Button/Button.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { AccordionPanelGroup } from '../../components/AccordionPanelGroup/AccordionPanelGroup.jsx'
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
import { getDetectedSocialAccountHelperText, SocialUrlInput } from '../../components/SocialUrlInput/SocialUrlInput.jsx'
import { StepIndicator } from '../../components/StepIndicator/StepIndicator.jsx'
import { TextLink } from '../../components/TextLink/TextLink.jsx'
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
import { ApplicationEmailSet } from '../../patterns/ApplicationEmailSet/ApplicationEmailSet.jsx'
import { CategoryPicker } from '../../patterns/CategoryPicker/CategoryPicker.jsx'
import { CelebrationModal } from '../../patterns/CelebrationModal/CelebrationModal.jsx'
import { CommunityTermsModal } from '../../patterns/CommunityTermsModal/CommunityTermsModal.jsx'
import { CompactWysiwygStudio } from '../../patterns/CompactWysiwygStudio/CompactWysiwygStudio.jsx'
import { CreatorOnboardingShell } from '../../patterns/CreatorOnboardingShell/CreatorOnboardingShell.jsx'
import { DataGatheringReview } from '../../patterns/DataGatheringReview/DataGatheringReview.jsx'
import { FetchConfirmation } from '../../patterns/FetchConfirmation/FetchConfirmation.jsx'
import { GoalSelectionGrid } from '../../patterns/GoalSelectionGrid/GoalSelectionGrid.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { StepLayout } from '../../patterns/StepLayout/StepLayout.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'
import { colors as colorTokens } from '../../tokens/colors.js'
import { typography as typographyTokens } from '../../tokens/typography.js'
import { brandPreviewDefaults, brandPreviewPalette } from '../../utils/brandPreviewDefaults.js'
import { COMMUNITY_VERTICAL_OPTIONS } from '../../utils/communityVerticals.js'

const ComponentLibraryPrototypes = lazy(() => import('../../prototypes/ComponentLibraryPrototypes/ComponentLibraryPrototypes.jsx'))

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
    <div className="min-w-0">
      <div
        className="aspect-square w-full rounded-md border border-border shadow-xs"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="mt-2 space-y-0.5">
        <p className="break-words font-mono text-2xs leading-snug text-text-secondary">{token}</p>
        {label && <p className="text-2xs leading-snug text-text-tertiary">{label}</p>}
      </div>
    </div>
  )
}

function ColorSwatchGrid({ children }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {children}
    </div>
  )
}

function ColorSwatchGroup({ title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-secondary">{title}</p>
      <ColorSwatchGrid>{children}</ColorSwatchGrid>
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

const shimmerTransition = {
  repeat: Infinity,
  duration: 1.45,
  ease: 'easeInOut',
}

function FoundBadgeReveal() {
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <motion.span {...motionProps}>
      <Badge variant="success" size="sm">Found</Badge>
    </motion.span>
  )
}

function ShellRowShimmer({ label }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <span
      className="relative mt-1 block h-3 max-w-sm overflow-hidden rounded-full bg-border"
      aria-label={label}
    >
      {!shouldReduceMotion ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ x: ['0%', '420%'] }}
          transition={shimmerTransition}
        />
      ) : null}
      <span className="sr-only">{label}</span>
    </span>
  )
}

function DocumentationNote({ children }) {
  return (
    <aside className="rounded-xl border border-border bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-text-secondary">
      {children}
    </aside>
  )
}

const componentIntentDocs = import.meta.glob('../../components/*/intent.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const tokenIntentDocs = import.meta.glob('../../tokens/*.intent.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})
const buttonIntentMarkdown = componentIntentDocs['../../components/Button/intent.md']
const formIntentMarkdown = componentIntentDocs['../../components/FormField/intent.md']
const colorIntentMarkdown = tokenIntentDocs['../../tokens/colors.intent.md']
const typographyIntentMarkdown = tokenIntentDocs['../../tokens/typography.intent.md']

function parseIntentBlocks(lines) {
  const blocks = []
  let paragraphLines = []
  let listBlock = null

  const flushParagraph = () => {
    if (!paragraphLines.length) return
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') })
    paragraphLines = []
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      listBlock = null
      return
    }

    if (line.startsWith('- ')) {
      flushParagraph()
      if (!listBlock) {
        listBlock = { type: 'list', items: [] }
        blocks.push(listBlock)
      }
      listBlock.items.push(line.slice(2))
      return
    }

    if (listBlock && rawLine.startsWith('  ')) {
      const lastIndex = listBlock.items.length - 1
      listBlock.items[lastIndex] = `${listBlock.items[lastIndex]} ${line}`
      return
    }

    listBlock = null
    paragraphLines.push(line)
  })

  flushParagraph()
  return blocks
}

function parseIntentMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/)
  let title = 'Component'
  let currentSection = null
  const sections = []

  lines.forEach((line) => {
    if (line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim()
      return
    }

    if (line.startsWith('## ')) {
      currentSection = {
        title: line.replace(/^##\s+/, '').trim(),
        lines: [],
      }
      sections.push(currentSection)
      return
    }

    if (currentSection) {
      currentSection.lines.push(line)
    }
  })

  return {
    title,
    sections: sections.map((section) => ({
      ...section,
      blocks: parseIntentBlocks(section.lines),
    })),
  }
}

function InlineIntentText({ text }) {
  return text.split(/(`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${part}-${index}`} className="rounded-sm bg-surface-sunken px-1 py-0.5 font-mono text-xs text-text">
          {part.slice(1, -1)}
        </code>
      )
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function IntentSection({ section }) {
  const listBlock = section.blocks.find((block) => block.type === 'list')
  const paragraphBlocks = section.blocks.filter((block) => block.type === 'paragraph')
  const markerClassName = section.title === 'Escalate When' ? 'bg-status-warning' : 'bg-brand'

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-text">{section.title}</h3>
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        {paragraphBlocks.map((block, index) => (
          <p key={`${section.title}-paragraph-${index}`}>
            <InlineIntentText text={block.text} />
          </p>
        ))}
        {listBlock ? (
          <ul className="space-y-2">
            {listBlock.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className={['mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full', markerClassName].join(' ')} aria-hidden="true" />
                <span><InlineIntentText text={item} /></span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

function ComponentIntentDoc({ markdown, eyebrow = 'Usage guidance' }) {
  if (!markdown) return null

  const intent = parseIntentMarkdown(markdown)
  const purposeSection = intent.sections.find((section) => section.title === 'Purpose')
  const guidanceSections = intent.sections.filter((section) => section.title !== 'Purpose')

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xs">
      <div className="border-b border-border bg-surface px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-caps text-text-tertiary">{eyebrow}</p>
        <h3 className="mt-1 text-lg font-semibold text-text">{intent.title}</h3>
        {purposeSection ? (
          <div className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-text-secondary">
            {purposeSection.blocks.map((block, index) => (
              block.type === 'paragraph' ? (
                <p key={`purpose-${index}`}>
                  <InlineIntentText text={block.text} />
                </p>
              ) : null
            ))}
          </div>
        ) : null}
      </div>
      <div className="divide-y divide-border">
        {guidanceSections.map((section) => (
          <div key={section.title} className="px-5 py-4">
            <IntentSection section={section} />
          </div>
        ))}
      </div>
    </div>
  )
}

function IntentPurposePanel({ markdown, eyebrow = 'Usage guidance' }) {
  if (!markdown) return null

  const intent = parseIntentMarkdown(markdown)
  const purposeSection = intent.sections.find((section) => section.title === 'Purpose')

  return (
    <section className="h-full rounded-xl border border-border bg-surface-raised p-5 shadow-xs">
      <p className="text-xs font-semibold uppercase tracking-caps text-text-tertiary">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-semibold text-text">{intent.title}</h2>
      {purposeSection ? (
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
          {purposeSection.blocks.map((block, index) => (
            block.type === 'paragraph' ? (
              <p key={`purpose-panel-${index}`}>
                <InlineIntentText text={block.text} />
              </p>
            ) : null
          ))}
        </div>
      ) : null}
    </section>
  )
}

function IntentSectionPanel({ markdown, sectionTitle, eyebrow, ariaLabel }) {
  if (!markdown) return null

  const intent = parseIntentMarkdown(markdown)
  const section = intent.sections.find((item) => item.title === sectionTitle)

  if (!section) return null

  return (
    <aside className="h-full rounded-xl border border-border bg-surface-raised p-5 shadow-xs" aria-label={ariaLabel}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-caps text-text-tertiary">{eyebrow}</p>}
      <IntentSection section={section} />
    </aside>
  )
}

function TimedShellVideo({ src, label, playbackRate = 1, pauseAfterMs = 3000 }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.pause()
    video.currentTime = 0
    video.playbackRate = playbackRate

    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {})
    }

    const pauseTimer = window.setTimeout(() => {
      video.pause()
    }, pauseAfterMs)

    return () => {
      window.clearTimeout(pauseTimer)
      video.pause()
    }
  }, [pauseAfterMs, playbackRate, src])

  return (
    <video
      ref={videoRef}
      src={src}
      className="h-full w-full object-cover"
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const sections = ['Colors', 'Typography', 'Forms', 'Buttons', 'Badges', 'Avatars', 'Navigation', 'Pages', 'Patterns', 'Emails', 'Prototypes', 'Animation']

const tileIcon = (Icon) => <LucideIcon icon={Icon} size="lg" stroke="display" />
const miniIcon = (Icon) => <LucideIcon icon={Icon} size="sm" />
const affixIcon = (Icon) => <LucideIcon icon={Icon} size="md" stroke="display" />
const loadingSuccessIcon = <LucideIcon icon={LoaderCircle} size="md" stroke="standard" className="animate-spin" />
const creatorShellStepOrder = ['entry', 'gather', 'preview', 'verify', 'success']
const creatorShellGatherVideoLeadInMs = 2000
const creatorShellGatherVideoPlaybackRate = 0.45
const creatorShellGatherRowFetchMs = 700
const creatorShellGatherResolvedPauseMs = 1000
const creatorShellPreviewOptions = [
  { value: 'entry', label: 'Entry' },
  { value: 'gather', label: 'Gather' },
  { value: 'preview', label: 'Preview' },
  { value: 'verify', label: 'Verify' },
  { value: 'success', label: 'Success' },
]
const simplifiedVerificationOptions = [
  { value: 'standard', label: 'Standard' },
  { value: 'known-lead', label: 'Known lead' },
  { value: 'meta-fallback', label: 'Meta fallback' },
]
const submissionSuccessTimeline = [
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
const avatarImageSet = [
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
const socialUrlExamples = [
  { label: 'Empty state', value: '' },
  { label: 'Instagram', value: 'https://instagram.com/culturecrave' },
  { label: 'TikTok', value: 'https://www.tiktok.com/@culturecrave' },
  { label: 'Pinterest', value: 'https://pinterest.com/culturecrave' },
  { label: 'YouTube', value: 'https://youtube.com/@culturecrave' },
  { label: 'Facebook', value: 'https://facebook.com/culturecrave' },
  { label: 'Substack', value: 'https://culturecrave.substack.com' },
  { label: 'Default website', value: 'https://www.culturecrave.com' },
]
const creatorShellSocialAccountDefaults = [
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
const fetchConfirmationDemoAccountsSeed = [
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

function getFetchConfirmationDemoAccounts() {
  return fetchConfirmationDemoAccountsSeed.map((account) => ({ ...account }))
}

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
  const [goalValue, setGoalValue] = useState('grow-audience')
  const [selectedTiles, setSelectedTiles] = useState(['community'])
  const [selectedGoals, setSelectedGoals] = useState(['audience-growth', 'community'])
  const [newsletterOptIn, setNewsletterOptIn] = useState(true)
  const [brandColor, setBrandColor] = useState(brandPreviewDefaults.brand)
  const [selectedSwatch, setSelectedSwatch] = useState(brandPreviewDefaults.brand)
  const [demoAvatar, setDemoAvatar] = useState(null)
  const [demoShape, setDemoShape] = useState('circle')
  const [accordionDemoOpenRow, setAccordionDemoOpenRow] = useState('profile')
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(['food', 'parenting'])
  const [creatorUrl, setCreatorUrl] = useState('')
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [previewPatternCtaSuccess, setPreviewPatternCtaSuccess] = useState(false)
  const [creatorShellPreviewStep, setCreatorShellPreviewStep] = useState('entry')
  const [creatorShellPreviewOpenRow, setCreatorShellPreviewOpenRow] = useState('identity')
  const [creatorShellGatherResolvedRows, setCreatorShellGatherResolvedRows] = useState([])
  const [creatorShellSocialAccountPlatforms, setCreatorShellSocialAccountPlatforms] = useState(['Instagram', 'TikTok', 'Pinterest'])
  const [creatorShellHandleOverrides, setCreatorShellHandleOverrides] = useState({})
  const [creatorShellEditingHandlePlatform, setCreatorShellEditingHandlePlatform] = useState(null)
  const [creatorShellHandleDraft, setCreatorShellHandleDraft] = useState('')
  const [fetchConfirmationDemoAccounts, setFetchConfirmationDemoAccounts] = useState(getFetchConfirmationDemoAccounts)
  const [fetchConfirmationEditingAccountId, setFetchConfirmationEditingAccountId] = useState(null)
  const [fetchConfirmationEditDraft, setFetchConfirmationEditDraft] = useState({ platform: '', handle: '', url: '' })
  const [verificationMethod, setVerificationMethod] = useState('meta-login')
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [verificationTermsAccepted, setVerificationTermsAccepted] = useState(false)
  const [simplifiedVerificationState, setSimplifiedVerificationState] = useState('standard')
  const [simplifiedVerificationMethod, setSimplifiedVerificationMethod] = useState(null)
  const [simplifiedVerificationTermsAccepted, setSimplifiedVerificationTermsAccepted] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [celebrationModalOpen, setCelebrationModalOpen] = useState(false)
  const [reviewFields] = useState({
    name: 'Culture Crave',
    url: 'instagram.com/culturecrave',
    vertical: 'food',
    audience: 'Community-led',
    summary: 'Food creator and community builder helping families cook smarter and gather more often.',
  })
  const creatorShellSocialAccounts = creatorShellSocialAccountPlatforms.map((platform) => {
    const account = creatorShellSocialAccountDefaults.find((item) => item.platform === platform)
    if (!account) return null

    return {
      ...account,
      handle: creatorShellHandleOverrides[platform] ?? account.handle,
    }
  }).filter(Boolean)
  const nextCreatorShellSocialAccount = creatorShellSocialAccountDefaults.find((account) => (
    !creatorShellSocialAccountPlatforms.includes(account.platform)
  ))
  const creatorShellSocialAccountContent = (
    <div className="space-y-3">
      <div className="space-y-2">
        {creatorShellSocialAccounts.map((account) => (
          <div key={account.platform} className="flex items-baseline justify-between gap-3 text-sm leading-relaxed text-text-secondary">
            <div className="min-w-0">
              {account.platform}:{' '}
              {creatorShellEditingHandlePlatform === account.platform ? (
                <input
                  className="inline-block h-6 w-36 rounded-md border border-border bg-surface px-1.5 text-sm font-semibold leading-sm text-text outline-none transition-colors duration-150 focus:border-brand focus:ring-1 focus:ring-brand"
                  value={creatorShellHandleDraft}
                  onChange={(event) => setCreatorShellHandleDraft(event.target.value)}
                  onBlur={saveCreatorShellHandleEdit}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.currentTarget.blur()
                    }
                  }}
                  autoFocus
                  aria-label={`${account.platform} handle`}
                />
              ) : (
                <button
                  type="button"
                  className="group inline-flex items-center gap-1 rounded-md text-sm font-semibold leading-relaxed text-text transition-colors duration-150 hover:text-action-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                  onClick={() => startCreatorShellHandleEdit(account)}
                  aria-label={`Edit ${account.platform} handle`}
                >
                  <span>{account.handle}</span>
                  <span className="text-xs font-medium text-action-primary transition-colors duration-150 group-hover:text-action-primary-active group-focus-visible:text-action-primary-active">
                    Edit
                  </span>
                </button>
              )}{' '}
              · {account.followers}
            </div>
            <button
              type="button"
              className="flex-shrink-0 text-xs font-medium text-text-action-subtle transition-colors duration-150 hover:text-status-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              onClick={() => removeCreatorShellSocialAccount(account.platform)}
              aria-label={`Remove ${account.platform} account`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {nextCreatorShellSocialAccount ? (
        <Button
          size="sm"
          variant="secondary"
          iconBefore={<LucideIcon icon={Plus} size="sm" />}
          onClick={addCreatorShellSocialAccount}
        >
          Add another account
        </Button>
      ) : null}
    </div>
  )
  const creatorShellSocialAccountSummary = creatorShellSocialAccounts
    .map((account) => account.platform)
    .join(', ') || 'No accounts added'
  const creatorShellIdentityContent = (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Creator name</p>
      <p className="text-base font-semibold text-text">{reviewFields.name}</p>
      <p className="text-sm leading-relaxed text-text-secondary">
        {reviewFields.url}
      </p>
    </div>
  )
  const creatorShellGatherLoadingCopy = {
    identity: 'Matching the submitted URL to a creator profile.',
    source: 'Checking connected social accounts.',
  }
  const creatorShellPreviewSteps = {
    entry: {
      title: 'Where do your fans live?',
      description: 'Your Raptive community will be a new home for your fans. Paste a link to where we can find them: your main social account or website. We’ll do the rest!',
      primaryLabel: 'Continue',
      primarySuccessLabel: 'Pulling data',
      primarySuccessIcon: loadingSuccessIcon,
      image: singleFieldIntakeIllustrationUrl,
      imageAlt: 'Vibrant fantasy garden illustration for the creator application entry step',
    },
    gather: {
      title: 'We’re finding your fans.',
      description: 'Give us a moment while we pull some details.',
      primaryLabel: 'Continue',
      primarySuccessLabel: 'Finding...',
      primarySuccessIcon: loadingSuccessIcon,
      video: wonderVideoUrl,
      videoLabel: 'Fantastical garden video reveal for the creator data gathering step',
    },
    confirm: {
      title: 'Take a look at what we found.',
      description: "Check out what we found and make any changes you'd like before we continue. This doesn't have to be exactly perfect, it helps us figure out the potential of your community, and what branding to start with.",
      primaryLabel: 'Looks good',
      primarySuccessLabel: 'Sneak peaking...',
      primarySuccessIcon: loadingSuccessIcon,
      video: wonderVideoUrl,
      videoLabel: 'Fantastical garden video reveal for the creator confirmation step',
    },
    preview: {
      title: 'How does everything look?',
      description: "Fine-tune the details fans will see first. The preview shows where your name, logo, copy, and color can appear. Really only worry about your community's name here, everything else can be customized again later.",
      primaryLabel: 'Continue to Verification',
      primarySuccessLabel: "Let's verify...",
      primarySuccessIcon: loadingSuccessIcon,
      image: null,
      imageAlt: '',
    },
    verify: {
      title: "One last check to know it's really you.",
      description: 'Complete verification for one of your channels to wrap up your application.',
      primaryLabel: 'Submit application',
      primarySuccessLabel: 'Submitting...',
      primarySuccessIcon: loadingSuccessIcon,
      image: verificationIllustrationUrl,
      imageAlt: 'Verification trust illustration for the creator application verification step',
    },
    success: {
      title: 'You’re on the list. We’ll take it from here.',
      description: null,
      primaryLabel: 'Close',
      primarySuccessLabel: 'Close',
      primarySuccessIcon: loadingSuccessIcon,
      image: submissionIllustrationUrl,
      imageAlt: 'Completion illustration for the creator application submission success step',
      tone: 'dark',
      primaryVariant: 'black',
    },
  }
  const creatorShellPreview = creatorShellPreviewSteps[creatorShellPreviewStep] ?? creatorShellPreviewSteps.entry
  const isCreatorShellGatherRowResolved = (rowId) => creatorShellGatherResolvedRows.includes(rowId)
  const creatorShellGatherResolved = isCreatorShellGatherRowResolved('source')
  const creatorShellHeaderPreview = creatorShellPreviewStep === 'gather' && creatorShellGatherResolved
    ? creatorShellPreviewSteps.confirm
    : creatorShellPreview
  const creatorShellPreviewIndex = Math.max(0, creatorShellStepOrder.indexOf(creatorShellPreviewStep))
  const creatorShellIsFirstStep = creatorShellPreviewIndex === 0
  const creatorShellIsLastStep = creatorShellPreviewIndex === creatorShellStepOrder.length - 1
  const handleCreatorShellPreviewStepChange = (value) => {
    setCreatorShellPreviewStep(value)
    setCreatorShellPreviewOpenRow(value === 'gather' ? 'identity' : 'source')
  }
  const handleVerificationMethodChange = (value) => {
    setVerificationMethod(value)
    setVerificationConfirmed(false)
    setVerificationTermsAccepted(false)
  }
  const handleSimplifiedVerificationStateChange = (value) => {
    setSimplifiedVerificationState(value)
    setSimplifiedVerificationMethod(null)
    setSimplifiedVerificationTermsAccepted(false)
  }
  const simplifiedVerificationIsKnownLead = simplifiedVerificationState === 'known-lead'
  const simplifiedVerificationSelectedMethod = simplifiedVerificationIsKnownLead
    ? null
    : previewPatternCtaSuccess ? 'meta' : simplifiedVerificationMethod
  const simplifiedVerificationTermsValue = previewPatternCtaSuccess || simplifiedVerificationTermsAccepted
  const simplifiedVerificationFallbackMessage = simplifiedVerificationState === 'meta-fallback'
    ? 'That didn’t work. You can try Meta again or use Persona instead.'
    : null
  const creatorShellVerificationIncomplete = creatorShellPreviewStep === 'verify'
    && (!verificationConfirmed || !verificationTermsAccepted)
  const handleCreatorShellNext = () => {
    if (creatorShellIsLastStep) {
      handleCreatorShellPreviewStepChange('entry')
      return
    }

    handleCreatorShellPreviewStepChange(creatorShellStepOrder[creatorShellPreviewIndex + 1])
  }
  const handleCreatorShellBack = () => {
    handleCreatorShellPreviewStepChange(creatorShellStepOrder[Math.max(0, creatorShellPreviewIndex - 1)])
  }
  const handleCreatorShellGatherOpenRowChange = (nextOpenRow, row) => {
    if (!isCreatorShellGatherRowResolved(row?.id)) return

    setCreatorShellPreviewOpenRow(nextOpenRow)
  }
  function startCreatorShellHandleEdit(account) {
    setCreatorShellEditingHandlePlatform(account.platform)
    setCreatorShellHandleDraft(account.handle)
  }
  function saveCreatorShellHandleEdit() {
    if (!creatorShellEditingHandlePlatform) return

    setCreatorShellHandleOverrides((current) => ({
      ...current,
      [creatorShellEditingHandlePlatform]: creatorShellHandleDraft.trim() || current[creatorShellEditingHandlePlatform] || '@culturecrave',
    }))
    setCreatorShellEditingHandlePlatform(null)
    setCreatorShellHandleDraft('')
  }
  function removeCreatorShellSocialAccount(platform) {
    setCreatorShellSocialAccountPlatforms((current) => current.filter((item) => item !== platform))
    if (creatorShellEditingHandlePlatform === platform) {
      setCreatorShellEditingHandlePlatform(null)
      setCreatorShellHandleDraft('')
    }
  }
  function addCreatorShellSocialAccount() {
    if (!nextCreatorShellSocialAccount) return

    setCreatorShellSocialAccountPlatforms((current) => [...current, nextCreatorShellSocialAccount.platform])
  }
  const startFetchConfirmationAccountEdit = (accountId, account) => {
    setFetchConfirmationEditingAccountId(accountId)
    setFetchConfirmationEditDraft({
      platform: account.platform,
      handle: account.handle,
      url: account.url,
    })
  }
  const cancelFetchConfirmationAccountEdit = () => {
    setFetchConfirmationEditingAccountId(null)
    setFetchConfirmationEditDraft({ platform: '', handle: '', url: '' })
  }
  const saveFetchConfirmationAccountEdit = () => {
    setFetchConfirmationDemoAccounts((current) => current.map((account) => (
      account.id === fetchConfirmationEditingAccountId
        ? {
            ...account,
            platform: fetchConfirmationEditDraft.platform || account.platform,
            handle: fetchConfirmationEditDraft.handle.trim() || account.handle,
            url: fetchConfirmationEditDraft.url.trim() || account.url,
          }
        : account
    )))
    cancelFetchConfirmationAccountEdit()
  }
  const removeFetchConfirmationAccount = (accountId) => {
    setFetchConfirmationDemoAccounts((current) => current.filter((account) => account.id !== accountId))
    if (fetchConfirmationEditingAccountId === accountId) {
      cancelFetchConfirmationAccountEdit()
    }
  }
  const addFetchConfirmationAccount = () => {
    const existingAccountIds = new Set(fetchConfirmationDemoAccounts.map((account) => account.id))
    const nextDetectedAccount = fetchConfirmationDemoAccountsSeed.find((account) => !existingAccountIds.has(account.id))

    if (nextDetectedAccount) {
      setFetchConfirmationDemoAccounts((current) => [...current, { ...nextDetectedAccount }])
      startFetchConfirmationAccountEdit(nextDetectedAccount.id, nextDetectedAccount)
    }
  }

  useEffect(() => {
    if (creatorShellPreviewStep !== 'gather') {
      setCreatorShellGatherResolvedRows([])
      return undefined
    }

    setCreatorShellGatherResolvedRows([])
    setCreatorShellPreviewOpenRow(null)
    const identityResolveDelay = creatorShellGatherVideoLeadInMs + creatorShellGatherRowFetchMs
    const sourceLoadDelay = identityResolveDelay + creatorShellGatherResolvedPauseMs
    const sourceResolveDelay = sourceLoadDelay + creatorShellGatherRowFetchMs
    const timers = [
      window.setTimeout(() => {
        setCreatorShellGatherResolvedRows(['identity'])
        setCreatorShellPreviewOpenRow('identity')
      }, identityResolveDelay),
      window.setTimeout(() => {
        setCreatorShellGatherResolvedRows(['identity', 'source'])
        setCreatorShellPreviewOpenRow('source')
      }, sourceResolveDelay),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [creatorShellPreviewStep])

  const creatorShellGatherRows = [
    {
      id: 'identity',
      icon: IdCard,
      label: 'Identity',
      subtext: isCreatorShellGatherRowResolved('identity')
        ? `${reviewFields.name} · ${reviewFields.url}`
        : <ShellRowShimmer label={creatorShellGatherLoadingCopy.identity} />,
      trailing: isCreatorShellGatherRowResolved('identity') ? <FoundBadgeReveal /> : null,
      content: isCreatorShellGatherRowResolved('identity')
        ? creatorShellIdentityContent
        : null,
    },
    {
      id: 'source',
      icon: Link2,
      label: 'Social accounts',
      subtext: isCreatorShellGatherRowResolved('source')
        ? creatorShellSocialAccountSummary
        : <ShellRowShimmer label={creatorShellGatherLoadingCopy.source} />,
      trailing: isCreatorShellGatherRowResolved('source') ? <FoundBadgeReveal /> : null,
      content: isCreatorShellGatherRowResolved('source')
        ? creatorShellSocialAccountContent
        : null,
    },
  ]
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

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('section', activeSection)
    window.history.replaceState({}, '', url)
  }, [activeSection])

  return (
    <div className="min-h-screen bg-surface-raised">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center">
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
          activeSection === 'Pages' ? 'max-w-none' : ['Colors', 'Typography', 'Forms', 'Patterns', 'Emails', 'Prototypes'].includes(activeSection) ? 'max-w-6xl' : 'max-w-5xl',
          'mx-auto px-6 py-10 space-y-14',
        ].join(' ')}
      >

        {/* ── COLORS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Colors' && (
          <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
            <div className="space-y-8 xl:col-span-2">
              <Section title="Brand Colors" description="Primary brand palette. Use semantic tokens in components, not primitives.">
                <ColorSwatchGrid>
                  {[50,100,200,300,400,500,600,700,800,900,950].map(w => (
                    <ColorSwatch key={w} token={`raptive-${w}`} value={colorTokens[`raptive-${w}`]} label={w === 500 ? 'primary' : ''} />
                  ))}
                </ColorSwatchGrid>
              </Section>

              <Section title="Semantic Tokens" description="Purpose-named aliases. These map to Figma variables.">
                <div className="space-y-6">
                  <ColorSwatchGroup title="Brand">
                    <ColorSwatch token="brand.DEFAULT" value={colorTokens.brand.DEFAULT} label="primary" />
                    <ColorSwatch token="brand.light" value={colorTokens.brand.light} />
                    <ColorSwatch token="brand.dark" value={colorTokens.brand.dark} />
                    <ColorSwatch token="brand.subtle" value={colorTokens.brand.subtle} />
                    <ColorSwatch token="brand.muted" value={colorTokens.brand.muted} />
                  </ColorSwatchGroup>
                  <ColorSwatchGroup title="Action">
                    <ColorSwatch token="action.primary" value={colorTokens.action.primary} />
                    <ColorSwatch token="action.primary-hover" value={colorTokens.action['primary-hover']} />
                    <ColorSwatch token="action.primary-active" value={colorTokens.action['primary-active']} />
                  </ColorSwatchGroup>
                  <ColorSwatchGroup title="Surface">
                    <ColorSwatch token="surface.DEFAULT" value={colorTokens.surface.DEFAULT} />
                    <ColorSwatch token="surface.raised" value={colorTokens.surface.raised} />
                    <ColorSwatch token="surface.sunken" value={colorTokens.surface.sunken} />
                    <ColorSwatch token="surface.overlay" value={colorTokens.surface.overlay} />
                    <ColorSwatch token="surface.invert" value={colorTokens.surface.invert} />
                  </ColorSwatchGroup>
                  <ColorSwatchGroup title="Text">
                    <ColorSwatch token="text.DEFAULT" value={colorTokens.text.DEFAULT} />
                    <ColorSwatch token="text.secondary" value={colorTokens.text.secondary} />
                    <ColorSwatch token="text.tertiary" value={colorTokens.text.tertiary} />
                    <ColorSwatch token="text.placeholder" value={colorTokens.text.placeholder} />
                    <ColorSwatch token="text.action-subtle" value={colorTokens.text['action-subtle']} />
                    <ColorSwatch token="text.disabled" value={colorTokens.text.disabled} />
                    <ColorSwatch token="text.invert" value={colorTokens.text.invert} />
                    <ColorSwatch token="text.brand" value={colorTokens.text.brand} />
                  </ColorSwatchGroup>
                  <ColorSwatchGroup title="Border">
                    <ColorSwatch token="border.DEFAULT" value={colorTokens.border.DEFAULT} />
                    <ColorSwatch token="border.strong" value={colorTokens.border.strong} />
                    <ColorSwatch token="border.subtle" value={colorTokens.border.subtle} />
                    <ColorSwatch token="border.focus" value={colorTokens.border.focus} />
                  </ColorSwatchGroup>
                  <ColorSwatchGroup title="Status">
                    <ColorSwatch token="status.success" value={colorTokens.status.success} />
                    <ColorSwatch token="status.success-bg" value={colorTokens.status['success-bg']} />
                    <ColorSwatch token="status.success-text" value={colorTokens.status['success-text']} />
                    <ColorSwatch token="status.warning" value={colorTokens.status.warning} />
                    <ColorSwatch token="status.warning-bg" value={colorTokens.status['warning-bg']} />
                    <ColorSwatch token="status.warning-text" value={colorTokens.status['warning-text']} />
                    <ColorSwatch token="status.error" value={colorTokens.status.error} />
                    <ColorSwatch token="status.error-bg" value={colorTokens.status['error-bg']} />
                    <ColorSwatch token="status.error-text" value={colorTokens.status['error-text']} />
                    <ColorSwatch token="status.info" value={colorTokens.status.info} />
                    <ColorSwatch token="status.info-bg" value={colorTokens.status['info-bg']} />
                    <ColorSwatch token="status.info-text" value={colorTokens.status['info-text']} />
                  </ColorSwatchGroup>
                  <ColorSwatchGroup title="Gamification">
                    <ColorSwatch token="gamification.gold" value={colorTokens.gamification.gold} />
                    <ColorSwatch token="gamification.gold-light" value={colorTokens.gamification['gold-light']} />
                    <ColorSwatch token="gamification.gold-bg" value={colorTokens.gamification['gold-bg']} />
                    <ColorSwatch token="gamification.purple" value={colorTokens.gamification.purple} />
                    <ColorSwatch token="gamification.purple-light" value={colorTokens.gamification['purple-light']} />
                    <ColorSwatch token="gamification.purple-bg" value={colorTokens.gamification['purple-bg']} />
                  </ColorSwatchGroup>
                </div>
              </Section>
            </div>

            <aside className="xl:sticky xl:top-24" aria-label="Color Usage Guidance">
              <ComponentIntentDoc markdown={colorIntentMarkdown} eyebrow="Token guidance" />
            </aside>
          </div>
        )}

        {/* ── TYPOGRAPHY ─────────────────────────────────────────────────── */}
        {activeSection === 'Typography' && (
          <div className="space-y-8">
            <div className="grid gap-5 xl:grid-cols-3 xl:items-stretch">
              <IntentPurposePanel markdown={typographyIntentMarkdown} eyebrow="Type guidance" />
              <IntentSectionPanel
                markdown={typographyIntentMarkdown}
                sectionTitle="Use When"
                eyebrow="Decision fit"
                ariaLabel="Typography Use When Guidance"
              />
              <IntentSectionPanel
                markdown={typographyIntentMarkdown}
                sectionTitle="Do Not Use When"
                eyebrow="Avoid"
                ariaLabel="Typography Do Not Use When Guidance"
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
              <div className="xl:col-span-2">
                <Section title="Type Scale" description="Semantic text roles from tokens/typography.js, shown with their intended content hierarchy.">
                  <div className="space-y-6 divide-y divide-border">
                    {[
                      { label: tokenTypographyLabel('hero'), className: 'font-newsreader text-hero font-normal text-text', sample: 'Bring creators in with confidence' },
                      { label: tokenTypographyLabel('display'), className: 'font-display text-4xl font-bold text-text', sample: 'Community First' },
                      { label: tokenTypographyLabel('heading-1'), className: 'font-display text-2xl font-bold text-text', sample: 'Welcome Back, Maria' },
                      { label: tokenTypographyLabel('heading-2'), className: 'font-display text-lg font-medium text-text', sample: 'Your Achievements' },
                      { label: tokenTypographyLabel('body'), className: 'font-sans text-base text-text', sample: 'Share what\u2019s on your mind with your community.' },
                      { label: tokenTypographyLabel('label-lg'), className: 'font-sans text-sm font-medium text-text-secondary', sample: 'Joined 3 months ago · 142 posts · 1.2k reactions' },
                      { label: tokenTypographyLabel('label-md'), className: 'font-sans text-xs font-medium text-text-secondary', sample: 'This appears on your public profile.' },
                      { label: tokenTypographyLabel('label-sm'), className: 'font-sans text-2xs font-medium text-text-tertiary', sample: 'MEMBER SINCE 2026' },
                      { label: tokenTypographyLabel('body-sm'), className: 'font-sans text-sm text-text-placeholder', sample: 'Paste your website URL' },
                      { label: tokenTypographyLabel('label-lg'), className: 'font-sans text-sm font-medium text-text-action-subtle', sample: 'Cancel' },
                      { label: tokenTypographyLabel('body-sm'), className: 'font-sans text-sm text-text-disabled', sample: 'creator@raptive.com' },
                      { label: tokenTypographyLabel('label-lg'), className: 'font-sans text-sm font-medium text-text-brand', sample: 'View guidelines' },
                      { label: 'mono / utility', className: 'font-mono text-sm text-text-secondary', sample: 'badge_id: community-champion-v1' },
                    ].map(({ label, className, sample }) => (
                      <div key={`${label}-${sample}`} className="grid gap-2 pt-4 first:pt-0 md:grid-cols-3 md:items-baseline md:gap-6">
                        <span className="text-xs font-mono leading-snug text-text-secondary">{label}</span>
                        <span className={['md:col-span-2', className].join(' ')}>{sample}</span>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              <IntentSectionPanel
                markdown={typographyIntentMarkdown}
                sectionTitle="Type Roles"
                eyebrow="Role map"
                ariaLabel="Typography Type Roles Guidance"
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
              <div className="xl:col-span-2">
                <Section title="Text Color Roles" description="Typography color choices should support hierarchy and comprehension. Use the Colors guidance for broader token rules.">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-text-secondary">Text color tokens</p>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                        <ColorSwatch token="Typography.text-color.primary" value={colorTokens.text.DEFAULT} />
                        <ColorSwatch token="Typography.text-color.secondary" value={colorTokens.text.secondary} />
                        <ColorSwatch token="Typography.text-color.tertiary" value={colorTokens.text.tertiary} />
                        <ColorSwatch token="Typography.text-color.placeholder" value={colorTokens.text.placeholder} />
                        <ColorSwatch token="text.action-subtle" value={colorTokens.text['action-subtle']} />
                        <ColorSwatch token="text.disabled" value={colorTokens.text.disabled} />
                        <ColorSwatch token="text.brand" value={colorTokens.text.brand} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-text-secondary">Role notes</p>
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
                </Section>
              </div>

              <IntentSectionPanel
                markdown={typographyIntentMarkdown}
                sectionTitle="Usage Rules"
                eyebrow="Governance"
                ariaLabel="Typography Usage Rules Guidance"
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
              <div className="xl:col-span-2">
                <Section title="Families And Metrics" description="Reference values for families, weights, line height, and letter spacing. Keep selection guidance in the nearby review triggers.">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-text-secondary">Font family + weight tokens</p>
                      <div className="space-y-3 rounded-xl border border-border bg-surface-raised p-4">
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-xs font-mono text-text-tertiary">font-family.sans</span>
                          <span className="font-sans text-sm text-text">DM Sans</span>
                        </div>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-xs font-mono text-text-tertiary">font-family.newsreader</span>
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
                      <p className="text-xs font-semibold text-text-secondary">Line height + letter spacing tokens</p>
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
                              {name.startsWith('line-height') ? pxFromRemString(value) : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Section>
              </div>

              <IntentSectionPanel
                markdown={typographyIntentMarkdown}
                sectionTitle="Escalate When"
                eyebrow="Review triggers"
                ariaLabel="Typography Escalation Guidance"
              />
            </div>
          </div>
        )}

        {/* ── FORMS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Forms' && (
          <div className="space-y-8">
            <div className="grid gap-5 xl:grid-cols-3 xl:items-stretch">
              <IntentPurposePanel markdown={formIntentMarkdown} eyebrow="Form guidance" />
              <IntentSectionPanel
                markdown={formIntentMarkdown}
                sectionTitle="Use When"
                eyebrow="Decision fit"
                ariaLabel="Forms Use When Guidance"
              />
              <IntentSectionPanel
                markdown={formIntentMarkdown}
                sectionTitle="Do Not Use When"
                eyebrow="Avoid"
                ariaLabel="Forms Do Not Use When Guidance"
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
              <div className="space-y-8 xl:col-span-2">
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
                  value="Family & Parenting"
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

                <Section title="Social URL Input" description="Single URL field that detects supported social platforms locally as the value changes.">
              <div className="grid gap-6 md:grid-cols-2">
                <SocialUrlInput
                  label="Live detection"
                  description="Type or paste a creator URL to update the leading icon immediately."
                  placeholder="https://instagram.com/creator"
                />
                <SocialUrlInput
                  label="Error state"
                  defaultValue="not a url"
                  error="Please enter a valid URL"
                  placeholder="Paste a creator URL"
                />
                {socialUrlExamples.map((example) => (
                  <SocialUrlInput
                    key={example.label}
                    label={example.label}
                    defaultValue={example.value}
                    placeholder="Paste a creator URL"
                  />
                ))}
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
              </div>

              <IntentSectionPanel
                markdown={formIntentMarkdown}
                sectionTitle="Control Families"
                eyebrow="Choose a control"
                ariaLabel="Forms Control Families Guidance"
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
              <div className="space-y-8 xl:col-span-2">
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

                <Section title="Accordion Panel Group" description="Reusable collapsible editor rows with customizable icon, label, subtext, and content.">
              <div className="max-w-xl overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
                <AccordionPanelGroup
                  openRow={accordionDemoOpenRow}
                  onOpenRowChange={setAccordionDemoOpenRow}
                  rows={[
                    {
                      id: 'profile',
                      icon: IdCard,
                      label: 'Profile details',
                      subtext: 'Name, topic, summary',
                      trailing: <Badge variant="brand" size="xs">Live</Badge>,
                      content: (
                        <div className="space-y-2.5">
                          <CompactField label="name" value="Culture Crave Community" onChange={() => {}} />
                          <CompactField
                            label="topic"
                            type="select"
                            value="Entertainment"
                            onChange={() => {}}
                            options={COMMUNITY_VERTICAL_OPTIONS}
                          />
                          <CompactField
                            label="summary"
                            type="textarea"
                            value="A place to unpack the moments everyone is talking about."
                            onChange={() => {}}
                            helperText="0/130 characters"
                          />
                        </div>
                      ),
                    },
                    {
                      id: 'identity',
                      icon: ImageIcon,
                      label: 'Visual identity',
                      subtext: 'Avatar, shape, media',
                      content: (
                        <SegmentedControl
                          label="Logo shape"
                          value={demoShape}
                          options={[
                            { value: 'circle', label: 'Circle' },
                            { value: 'rectangle', label: 'Rectangle' },
                          ]}
                          onChange={setDemoShape}
                        />
                      ),
                    },
                    {
                      id: 'theme',
                      icon: Palette,
                      label: 'Brand color',
                      subtext: 'Generated accent tint',
                      content: (
                        <ColorInput
                          label="Brand Color"
                          description="Used for buttons, links, creator marks, and active community actions."
                          value={brandColor}
                          layout="compact"
                          fallbackColor={brandPreviewDefaults.brand}
                          onChange={setBrandColor}
                        />
                      ),
                    },
                  ]}
                />
              </div>
              <DocumentationNote>
                Use AccordionPanelGroup when a screen needs the same compact row shell with different labels and row bodies. Set allRowsOpen on editor surfaces where every option should remain visible.
              </DocumentationNote>
                </Section>
              </div>

              <IntentSectionPanel
                markdown={formIntentMarkdown}
                sectionTitle="Usage Rules"
                eyebrow="Governance"
                ariaLabel="Forms Usage Rules Guidance"
              />
            </div>

            <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
              <div className="space-y-8 xl:col-span-2">
                <Section title="Color Swatch Button" description="Reusable palette-choice control for theme and brand-preview flows.">
              <FormField
                label="Detected brand color"
                description="Use swatches when a detected color needs a compact visual confirmation."
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
              <div className="max-w-xl">
                <ColorInput
                  label="Brand Color"
                  value={brandColor}
                  fallbackColor={brandPreviewDefaults.brand}
                  onChange={setBrandColor}
                />
              </div>
                </Section>

                <Section title="Logo Upload Areas" description="Reusable upload controls for horizontal and square logo assets.">
              <div className="grid gap-6 md:grid-cols-2">
                <AvatarUpload
                  label="Horizontal"
                  uploadLabel="Upload asset"
                  previewLabel="Horizontal logo"
                  previewShape="rectangle"
                  layout="button"
                  value={demoAvatar}
                  onChange={setDemoAvatar}
                />
                <AvatarUpload
                  label="Square"
                  uploadLabel="Upload asset"
                  previewLabel="Square logo"
                  previewShape="square"
                  layout="button"
                  value={demoAvatar}
                  onChange={setDemoAvatar}
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
              <div className="max-w-sm">
                <OptionTile
                  icon={tileIcon(Mail)}
                  title="Verify with Persona"
                  description="Use an inline detail area when the selected tile needs a short next step."
                  selected
                  selectionStyle="radio"
                  onClick={() => {}}
                >
                  <span className="mt-1 block rounded-lg border border-border bg-surface px-3 py-2">
                    <span className="block text-xs font-medium uppercase tracking-caps text-text-secondary">Your code</span>
                    <span className="mt-1 block font-mono text-2xl font-medium text-text">CULTURE-453</span>
                    <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                      Detail content stays inside the selected tile.
                    </span>
                  </span>
                </OptionTile>
              </div>
              <DocumentationNote>
                Hover, tap, and selection animations respect prefers-reduced-motion. Use the optional detail slot for selected radio tiles that need a short inline confirmation step.
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
              </div>

              <IntentSectionPanel
                markdown={formIntentMarkdown}
                sectionTitle="Escalate When"
                eyebrow="Review triggers"
                ariaLabel="Forms Escalation Guidance"
              />
            </div>
          </div>
        )}

        {/* ── BUTTONS ────────────────────────────────────────────────────── */}
        {activeSection === 'Buttons' && (
          <div className="grid gap-8 xl:grid-cols-3 xl:items-start">
            <div className="space-y-8 xl:col-span-2">
              <Section title="Action Hierarchy" description="Choose the variant by product meaning first; layout and local spacing belong outside the Button.">
                <Row label="Primary decision area">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Inline action</Button>
                </Row>
                <Row label="High-risk and special contexts">
                  <Button variant="danger">Danger</Button>
                  <Button variant="black">Black</Button>
                </Row>
                <Row label="Brand-preview context">
                  <div className="preview-theme flex flex-wrap items-center gap-2 rounded-lg border border-border bg-surface px-4 py-3">
                    <Button variant="previewBrand">Preview brand</Button>
                    <Button variant="previewAccent">Preview accent</Button>
                  </div>
                </Row>
              </Section>

              <Section title="Composition" description="Icons, full-width behavior, and neighboring text links should preserve Button ownership of its own internals.">
                <Row label="Icon before and after">
                  <Button iconBefore={miniIcon(Sparkles)}>Create preview</Button>
                  <Button variant="secondary" iconAfter={miniIcon(Rocket)}>Continue</Button>
                </Row>
                <Row label="Full width inside a layout container">
                  <div className="w-full max-w-xs">
                    <Button fullWidth>Full Width Button</Button>
                  </div>
                </Row>
                <Row label="Adjacent text-link primitive">
                  <TextLink onClick={() => {}}>Left text link</TextLink>
                  <TextLink align="center" underline onClick={() => {}}>Centered underlined link</TextLink>
                </Row>
              </Section>

              <Section title="Sizes And States" description="Size and state props are part of the component contract; visual overrides are not.">
                <Row label="Shared button scale">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </Row>
                <Row label="Loading">
                  <Button loading>Primary</Button>
                  <Button variant="secondary" loading>Secondary</Button>
                  <Button loading loadingLabel="Saving">Save draft</Button>
                </Row>
                <Row label="Success">
                  <Button success>Submitted</Button>
                  <Button success successLabel="Saved">Save draft</Button>
                  <Button success successLabel="Finding" successIcon={loadingSuccessIcon}>Continue</Button>
                </Row>
                <Row label="Disabled">
                  <Button disabled>Primary</Button>
                  <Button variant="secondary" disabled>Secondary</Button>
                  <Button variant="ghost" disabled>Ghost</Button>
                  <Button variant="danger" disabled>Danger</Button>
                  <Button variant="black" disabled>Black</Button>
                  <Button variant="link" disabled>Link</Button>
                </Row>
                <DocumentationNote>
                  Decorative scale and label swap animations respect prefers-reduced-motion. Loading and success animations always run.
                </DocumentationNote>
              </Section>
            </div>

            <aside className="xl:sticky xl:top-24" aria-label="Button Usage Guidance">
              <ComponentIntentDoc markdown={buttonIntentMarkdown} />
            </aside>
          </div>
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
                  <Avatar key={s} name="Culture Crave" size={s} />
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
                <Avatar name="Culture Crave" size="md" count={3} />
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
              <div className="max-w-md border border-border rounded-xl overflow-hidden">
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
              <div className="max-w-md border border-border rounded-xl overflow-hidden mt-4">
                <AuthorRow
                  name="Culture Crave"
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
              <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
                <PostContent
                  title="This is the post title"
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  readMore={{ label: 'read more', onClick: () => {} }}
                />
              </div>
              <div className="max-w-2xl border border-border rounded-xl overflow-hidden mt-4">
                <PostContent
                  title="Post with attachment card"
                  body="Slow cooker recipes are the best for busy weeknights. Here's one I've been making on repeat."
                  attachment={{
                    authorName: 'Culture Crave',
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
                <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
                  <PostActionBar
                    reactionCount={31}
                    shareCount={13}
                    commentCount={12}
                    topReactions={['helpful', 'insightful', 'uplifting']}
                    showCommentField
                    commentAvatarName="Culture Crave"
                    onReact={() => {}}
                    onShare={() => {}}
                    onComment={() => {}}
                  />
                </div>
                <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
                  <PostActionBar
                    reactionCount={18}
                    shareCount={7}
                    commentCount={4}
                    aiPrompt="Need a reply starter? Try thanking the member and asking what they want to see next."
                    showCommentField
                    commentAvatarName="Culture Crave"
                    onReact={() => {}}
                    onShare={() => {}}
                    onComment={() => {}}
                  />
                </div>
                <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
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
                <div className="max-w-2xl border border-border rounded-xl overflow-hidden">
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
              <div className="max-w-md border border-border rounded-xl overflow-hidden">
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

            <Section title="Step Indicator" description="Compact dots for multi-step flows, plus the named StepLayout progress variants.">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  { label: 'Step 1 of 5 active', currentStep: 1 },
                  { label: 'Step 3 of 5 active', currentStep: 3 },
                  { label: 'Step 5 of 5 active', currentStep: 5 },
                ].map((example) => (
                  <div key={example.label} className="space-y-3 rounded-xl border border-border bg-surface p-4 shadow-xs">
                    <p className="text-sm font-medium text-text">{example.label}</p>
                    <StepIndicator steps={5} currentStep={example.currentStep} />
                  </div>
                ))}
              </div>

              <div className="grid gap-6">
                <div className="grid items-start gap-4 lg:grid-cols-4">
                  <p className="whitespace-nowrap text-sm font-medium text-text">dots variant</p>
                  <div className="lg:col-span-3">
                    <StepLayout
                      progressVariant="dots"
                      step={3}
                      totalSteps={5}
                      title="Confirm creator details"
                      description="The compact indicator sits centered in the header area."
                      primaryAction={{ label: 'Continue' }}
                      secondaryAction={{ label: 'Back', variant: 'ghost' }}
                    >
                      <div className="rounded-xl border border-border bg-surface-raised p-4 text-sm text-text-secondary">
                        Creator details, audience signal, and review controls render here.
                      </div>
                    </StepLayout>
                  </div>
                </div>

                <div className="grid items-start gap-4 lg:grid-cols-4">
                  <p className="whitespace-nowrap text-sm font-medium text-text">bar variant</p>
                  <div className="lg:col-span-3">
                    <StepLayout
                      progressVariant="bar"
                      step={3}
                      totalSteps={5}
                      title="Confirm creator details"
                      description="The original progress bar remains available as the default variant."
                      primaryAction={{ label: 'Continue' }}
                      secondaryAction={{ label: 'Back', variant: 'ghost' }}
                    >
                      <div className="rounded-xl border border-border bg-surface-raised p-4 text-sm text-text-secondary">
                        Creator details, audience signal, and review controls render here.
                      </div>
                    </StepLayout>
                  </div>
                </div>
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
            <div className="overflow-hidden rounded-xl border border-border-strong bg-surface-raised shadow-xs">
              <HomeFeedPageTemplate />
            </div>
          </div>
        )}

        {/* ── PATTERNS ───────────────────────────────────────────────────── */}
        {activeSection === 'Patterns' && (
          <>
            <div className="rounded-xl border border-border bg-surface px-4 py-3 shadow-xs">
              <Checkbox
                variant="plain"
                label="Preview CTA success labels"
                description="Forces applicable pattern CTAs into their success state so transition copy can be reviewed in place."
                checked={previewPatternCtaSuccess}
                onChange={(event) => setPreviewPatternCtaSuccess(event.target.checked)}
              />
            </div>

            <Section title="Creator Onboarding Shell" description="Stable guided-story frame for previewing onboarding height before wiring it into the live flow.">
              <div className="space-y-4">
                <SegmentedControl
                  label="Preview screen"
                  value={creatorShellPreviewStep}
                  options={creatorShellPreviewOptions}
                  onChange={handleCreatorShellPreviewStepChange}
                />

                <CreatorOnboardingShell
                  title={creatorShellHeaderPreview.title}
                  description={creatorShellHeaderPreview.description}
                  contentAlignment={creatorShellPreviewStep === 'gather' ? 'start' : 'center'}
                  headerClassName={creatorShellPreviewStep === 'gather' ? 'pt-6' : ''}
                  contentClassName={creatorShellPreviewStep === 'gather' ? 'min-h-80' : ''}
                  contentKey={creatorShellPreviewStep}
                  tone={creatorShellPreview.tone}
                  aside={creatorShellPreview.image || creatorShellPreview.video ? (
                    <div className="relative h-96 overflow-hidden">
                      {creatorShellPreview.video ? (
                          <TimedShellVideo
                            src={creatorShellPreview.video}
                            label={creatorShellPreview.videoLabel}
                            playbackRate={creatorShellPreviewStep === 'gather' ? creatorShellGatherVideoPlaybackRate : 1}
                            pauseAfterMs={creatorShellPreviewStep === 'gather' ? creatorShellGatherVideoLeadInMs : 3000}
                          />
                      ) : (
                        <img
                          src={creatorShellPreview.image}
                          alt={creatorShellPreview.imageAlt}
                          className="h-full w-full object-cover"
                          loading="eager"
                          decoding="async"
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                    </div>
                  ) : null}
                  footer={(
                    <>
                      {!creatorShellIsFirstStep ? (
                        <Button size="lg" variant="secondary" onClick={handleCreatorShellBack}>
                          Back
                        </Button>
                      ) : null}
                      <Button
                        size="lg"
                        variant={creatorShellPreview.primaryVariant ?? 'primary'}
                        success={previewPatternCtaSuccess}
                        successLabel={creatorShellPreview.primarySuccessLabel}
                        successIcon={creatorShellPreview.primarySuccessIcon}
                        disabled={creatorShellVerificationIncomplete}
                        onClick={handleCreatorShellNext}
                        className={[
                          creatorShellIsFirstStep ? 'ml-auto' : '',
                          creatorShellPreview.primaryVariant === 'black' ? '!border !border-white/12 !bg-neutral-950 !text-white hover:!bg-neutral-900' : '',
                        ].filter(Boolean).join(' ')}
                      >
                        {creatorShellPreview.primaryLabel}
                      </Button>
                    </>
                  )}
                >
                  <>
                    {creatorShellPreviewStep === 'entry' ? (
                      <div className="max-w-2xl space-y-6">
                        <SocialUrlInput
                          placeholder="Paste a creator URL or social profile"
                          value={creatorUrl}
                          onChange={(event) => setCreatorUrl(event.target.value)}
                          description={getDetectedSocialAccountHelperText(creatorUrl)}
                          inputClassName="text-lg"
                          affixLineHeight="md"
                        />
                      </div>
                    ) : null}
                    {creatorShellPreviewStep === 'gather' ? (
                      <div className="max-w-3xl space-y-6">
                        <AccordionPanelGroup
                          rows={creatorShellGatherRows}
                          openRow={creatorShellPreviewOpenRow}
                          onOpenRowChange={handleCreatorShellGatherOpenRowChange}
                          allowCollapse={false}
                          className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs"
                        />
                      </div>
                    ) : null}
                    {creatorShellPreviewStep === 'preview' ? (
                      <div>
                        <CompactWysiwygStudio
                          secondaryAction={null}
                          primaryAction={null}
                        />
                      </div>
                    ) : null}
                    {creatorShellPreviewStep === 'verify' ? (
                      <div className="max-w-3xl space-y-6">
                        <div className="grid gap-4">
                          {[
                            {
                              icon: tileIcon(Mail),
                              title: 'Login with Meta to verify your Instagram account',
                              description: 'Use Login with Meta to verify @culturecrave without a manual message.',
                            },
                            {
                              icon: tileIcon(BadgeCheck),
                              title: "Verify with Persona",
                              description: 'Use Persona when Meta login is not convenient today.',
                            },
                          ].map((method) => (
                            <div key={method.title} className="rounded-xl border border-border bg-surface px-5 py-4">
                              <div className="flex min-h-36 flex-col items-start gap-3">
                                <span className="flex w-full items-start justify-between gap-3">
                                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-raised text-xl">
                                    {method.icon}
                                  </span>
                                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface" />
                                </span>
                                <span className="space-y-1">
                                  <span className="block text-base font-medium text-text">{method.title}</span>
                                  <span className="block text-sm text-text-secondary">{method.description}</span>
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="grid gap-3">
                          <Checkbox
                            checked={verificationConfirmed}
                            onChange={(event) => setVerificationConfirmed(event.target.checked)}
                            variant="plain"
                            label="I control this creator account and want to continue with verification."
                            description="This keeps the last step feeling intentional without adding a long security ceremony."
                          />
                          <Checkbox
                            checked={verificationTermsAccepted}
                            onChange={() => setTermsModalOpen(true)}
                            variant="plain"
                            label={(
                              <>
                                I agree to the{' '}
                                <span className="font-bold text-action-primary underline underline-offset-2">Community Terms</span>
                              </>
                            )}
                          />
                        </div>
                      </div>
                    ) : null}
                    {creatorShellPreviewStep === 'success' ? (
                      <div className="max-w-2xl space-y-8">
                        <p className="text-base leading-relaxed text-white">
                          We’ll review the setup across brand, audience, and community fit. If there’s a match, our team will reach out with next steps.
                        </p>
                        <div className="space-y-3">
                          {[
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
                          ].map((item) => (
                            <div key={item.step} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                              <span
                                className={[
                                  'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border',
                                  item.current
                                    ? 'border-gamification-gold-light/30 bg-gamification-gold-light/15'
                                    : 'border-white/10 bg-white/5',
                                ].join(' ')}
                              >
                                <span
                                  className={[
                                    'h-2.5 w-2.5 rounded-full',
                                    item.current ? 'bg-gamification-gold-light' : 'bg-white/28',
                                  ].join(' ')}
                                />
                              </span>
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-white">{item.title}</p>
                                <p className="text-sm leading-relaxed text-white/80">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                </CreatorOnboardingShell>
              </div>
            </Section>

            <Section title="Single Field Intake" description="Desktop-first opening step for the real creator application flow.">
              <SingleFieldIntake
                title="Where do your fans live?"
                description="Your Raptive community will be a new home for your fans. Paste a link to where we can find them: your main social account or website. We’ll do the rest!"
                value={creatorUrl}
                onChange={(event) => setCreatorUrl(event.target.value)}
                onSubmit={() => {
                  setIntakeLoading(true)
                  window.setTimeout(() => setIntakeLoading(false), 900)
                }}
                loading={intakeLoading || previewPatternCtaSuccess}
                progressMeter={(
                  <div className="flex justify-center">
                    <StepIndicator steps={6} currentStep={1} />
                  </div>
                )}
                helperText={getDetectedSocialAccountHelperText(creatorUrl)}
                ctaLabel="Continue"
                ctaSuccessLabel="Pulling data"
                ctaSuccessIcon={loadingSuccessIcon}
                ctaDisabled={!creatorUrl.trim() && !previewPatternCtaSuccess}
                showAside={false}
                illustrationFrameClassName="h-96"
              />
            </Section>

            <Section title="Data Gathering Review" description="Exploratory staged loading state that resolves creator signals inline before the next confirmation step.">
              <DataGatheringReview
                detectedSource="Instagram"
                socialAccounts={fetchConfirmationDemoAccounts}
                onSocialAccountChange={(accountId, patch) => {
                  setFetchConfirmationDemoAccounts((current) => current.map((account) => (
                    account.id === accountId ? { ...account, ...patch } : account
                  )))
                }}
                onAddSocialAccount={addFetchConfirmationAccount}
                onRemoveSocialAccount={removeFetchConfirmationAccount}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{
                  label: 'Continue',
                  success: previewPatternCtaSuccess,
                  successLabel: 'Finding...',
                  successIcon: loadingSuccessIcon,
                }}
                illustrationFrameClassName="h-96"
              />
            </Section>

            <Section title="Data Gathering Review: No Data Found" description="Variation for submitted sources that resolve without a matching identity or connected social accounts.">
              <DataGatheringReview
                title="We’re finding your fans."
                description="Give us a moment while we pull some details."
                detectedSource="Website"
                submittedSourceValue="https://example.com"
                resultStatus="not-found"
                rowPresentation="accordion"
                socialAccounts={fetchConfirmationDemoAccounts}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{
                  label: 'Continue',
                  success: previewPatternCtaSuccess,
                  successLabel: 'Finding...',
                  successIcon: loadingSuccessIcon,
                }}
                illustrationFrameClassName="h-96"
              />
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
                accounts={fetchConfirmationDemoAccounts}
                editingField={fetchConfirmationEditingAccountId}
                editDraft={fetchConfirmationEditDraft}
                onEditDraftChange={setFetchConfirmationEditDraft}
                onStartEditing={startFetchConfirmationAccountEdit}
                onCancelEditing={cancelFetchConfirmationAccountEdit}
                onSaveEditing={saveFetchConfirmationAccountEdit}
                onAddAccount={addFetchConfirmationAccount}
                onRemoveAccount={removeFetchConfirmationAccount}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{
                  label: 'Looks good',
                  success: previewPatternCtaSuccess,
                  successLabel: 'Sneak peaking...',
                  successIcon: loadingSuccessIcon,
                }}
              />
            </Section>

            <Section title="Review Correction" description="Trust-recovery edit step for correcting fetched identity before the emotional preview stage.">
              <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
                <div className="flex h-full flex-col p-8 lg:p-12">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h2 className="max-w-2xl font-newsreader text-hero font-normal text-text">
                          How does everything look?
                        </h2>
                        <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                          Fine-tune the details fans will see first. The preview shows where your name, logo, copy, and color can appear. Really only worry about your community's name here, everything else can be customized again later.
                        </p>
                      </div>
                    </div>

                    <CompactWysiwygStudio
                      primaryAction={{
                        label: 'Continue to Verification',
                        success: previewPatternCtaSuccess,
                        successLabel: "Let's verify...",
                        successIcon: loadingSuccessIcon,
                      }}
                    />
                  </div>
                </div>
              </section>
            </Section>

            <Section title="Verification Step" description="Identity confirmation step before the final submission moment, matching the creator onboarding flow.">
              <VerificationStep
                title="One last check to know it's really you."
                description="Complete verification for one of your channels to wrap up your application."
                methods={[
                  {
                    value: 'meta-login',
                    icon: tileIcon(BadgeCheck),
                    title: 'Login with Meta to verify your Instagram account',
                    description: 'Use Login with Meta to verify @culturecrave without a manual message.',
                  },
                  {
                    value: 'email-domain',
                    icon: tileIcon(Mail),
                    title: "Verify with Persona",
                    description: 'Use Persona when Meta login is not convenient today.',
                  },
                ]}
                selectedMethod={previewPatternCtaSuccess ? 'meta-login' : verificationMethod}
                onSelectMethod={handleVerificationMethodChange}
                confirmed={previewPatternCtaSuccess || verificationConfirmed}
                onConfirmChange={setVerificationConfirmed}
                termsAccepted={previewPatternCtaSuccess || verificationTermsAccepted}
                onTermsAcceptedChange={setVerificationTermsAccepted}
                showAside={false}
                illustrationFrameClassName="h-96"
                secondaryAction={{ label: 'Back to preview', variant: 'secondary' }}
                primaryAction={{
                  label: 'Continue',
                  success: previewPatternCtaSuccess,
                  successLabel: 'Submitting...',
                  successIcon: loadingSuccessIcon,
                }}
              />
            </Section>

            <Section title="Verification Step: Simplified Option" description="Exploration for a lower-friction verification choice with known-lead and Meta fallback states.">
              <div className="space-y-4">
                <SegmentedControl
                  label="Verification state"
                  value={simplifiedVerificationState}
                  options={simplifiedVerificationOptions}
                  onChange={handleSimplifiedVerificationStateChange}
                />
                <VerificationStep
                  simplified
                  title={simplifiedVerificationIsKnownLead ? "You're already verified!" : 'Verify your creator account'}
                  description={simplifiedVerificationIsKnownLead
                    ? 'We’ve already confirmed ownership of @culturecrave, so you can continue your application.'
                    : 'Choose how you’d like to confirm ownership before submitting your application.'}
                  methods={[
                    {
                      value: 'meta',
                      icon: tileIcon(BadgeCheck),
                      badge: 'Recommended',
                      title: 'Login with Meta to verify your Instagram account',
                      description: 'Fastest option. Confirm ownership of @culturecrave in a few clicks.',
                    },
                    {
                      value: 'email',
                      icon: tileIcon(Mail),
                      title: "Verify with Persona",
                      description: 'Use Persona when Meta login is not convenient today.',
                    },
                  ]}
                  selectedMethod={simplifiedVerificationSelectedMethod}
                  onSelectMethod={setSimplifiedVerificationMethod}
                  termsAccepted={simplifiedVerificationTermsValue}
                  onTermsAcceptedChange={setSimplifiedVerificationTermsAccepted}
                  alreadyVerified={simplifiedVerificationIsKnownLead}
                  verifiedHandle="@culturecrave"
                  fallbackMessage={simplifiedVerificationFallbackMessage}
                  showAside={false}
                  illustrationFrameClassName="h-96"
                  secondaryAction={{ label: 'Back to preview', variant: 'secondary' }}
                  primaryAction={{
                    label: 'Continue',
                    success: previewPatternCtaSuccess,
                    successLabel: simplifiedVerificationSelectedMethod === 'email' ? 'Manual pending' : 'Continuing...',
                    successIcon: loadingSuccessIcon,
                  }}
                />
              </div>
            </Section>

            <Section title="Verification Step: Known Lead" description="Known-lead variation that skips method selection because the creator is already verified.">
              <VerificationStep
                title="You're already verified!"
                description="We found this creator on our known leads list."
                methods={[]}
                selectedMethod={null}
                confirmed
                termsAccepted={previewPatternCtaSuccess || verificationTermsAccepted}
                onTermsAcceptedChange={setVerificationTermsAccepted}
                alreadyVerified
                showAside={false}
                illustrationFrameClassName="h-96"
                secondaryAction={{ label: 'Back to preview', variant: 'secondary' }}
                primaryAction={{
                  label: 'Continue',
                  success: previewPatternCtaSuccess,
                  successLabel: 'Submitting...',
                  successIcon: loadingSuccessIcon,
                }}
              />
            </Section>

            <Section title="Submission Success: Cursor Burst" description="Completion state with confetti charged around the cursor before bursting from that point.">
              <SubmissionSuccess
                title="You’re on the list. We’ll take it from here."
                summary="We’ll review the setup across brand, audience, and community fit. If there’s a match, our team will reach out with next steps."
                timeline={submissionSuccessTimeline}
                showAside={false}
                illustrationFrameClassName="h-96"
                secondaryAction={null}
                primaryAction={{
                  label: 'Close',
                  variant: 'black',
                  success: previewPatternCtaSuccess,
                  successLabel: 'Close',
                  successIcon: loadingSuccessIcon,
                }}
              />
            </Section>

          </>
        )}

        {/* ── EMAILS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Emails' && (
          <Section title="Application Emails" description="First-pass creator application email set mapped to verification, review, submission, approval, and not-a-fit moments.">
            <ApplicationEmailSet />
          </Section>
        )}

        {/* ── PROTOTYPES ────────────────────────────────────────────────── */}
        {activeSection === 'Prototypes' && (
          <Suspense fallback={(
            <div className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary shadow-xs" aria-live="polite">
              Loading prototypes...
            </div>
          )}
          >
            <ComponentLibraryPrototypes
              previewPatternCtaSuccess={previewPatternCtaSuccess}
              onPreviewPatternCtaSuccessChange={setPreviewPatternCtaSuccess}
              verificationMethod={verificationMethod}
              onVerificationMethodChange={handleVerificationMethodChange}
              verificationConfirmed={verificationConfirmed}
              onVerificationConfirmedChange={setVerificationConfirmed}
              verificationTermsAccepted={verificationTermsAccepted}
              onVerificationTermsAcceptedChange={setVerificationTermsAccepted}
            />
          </Suspense>
        )}

        {activeSection === 'Animation' && (
          <>
            <Section
              title="Celebration Modal"
              description="Reference point for badge, streak, milestone, and role-earned celebration moments."
            >
              <div className="flex max-w-xl flex-col gap-4 rounded-xl border border-border bg-surface p-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="space-y-1">
                    <Badge variant="gold" size="sm" dot>Milestone</Badge>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      Opens the existing celebration pattern with confetti, badge focus, stats, and reduced-motion support.
                    </p>
                  </div>
                  <Button onClick={() => setCelebrationModalOpen(true)}>
                    Preview celebration
                  </Button>
                </div>
              </div>
              <CelebrationModal
                type="milestone"
                title="Community milestone reached"
                description="Culture Crave unlocked a new contributor milestone after a strong week of helpful discussion."
                badge={{
                  icon: <LucideIcon icon={Award} size="xl" stroke="display" />,
                  name: 'Top Contributor',
                  tier: '2',
                }}
                user={{
                  name: 'Culture Crave',
                  avatar: avatarImageSet[0].src,
                }}
                stats={[
                  { value: '18', label: 'Posts' },
                  { value: '42', label: 'Replies' },
                  { value: '7d', label: 'Streak' },
                ]}
                ctaLabel="Share Achievement"
                secondaryLabel="Close"
                isOpen={celebrationModalOpen}
                onConfirm={() => setCelebrationModalOpen(false)}
                onDismiss={() => setCelebrationModalOpen(false)}
              />
            </Section>

          </>
        )}

      </main>

      <CommunityTermsModal
        isOpen={termsModalOpen}
        onDismiss={() => setTermsModalOpen(false)}
        onAccept={() => setVerificationTermsAccepted(true)}
      />
    </div>
  )
}
