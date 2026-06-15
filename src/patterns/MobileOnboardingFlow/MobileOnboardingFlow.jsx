import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, ChevronLeft, IdCard, Image as ImageIcon, Link2, LoaderCircle, Mail, Palette, Plus, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import wonderVideoUrl from '../../assets/data-gathering-wonder.mp4'
import singleFieldIntakeIllustrationUrl from '../../assets/single-field-intake-illustration.png'
import submissionIllustrationUrl from '../../assets/submission-illustration.png'
import { AccordionPanelGroup } from '../../components/AccordionPanelGroup/AccordionPanelGroup.jsx'
import { AvatarUpload } from '../../components/AvatarUpload/AvatarUpload.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { ColorInput } from '../../components/ColorInput/ColorInput.jsx'
import { CompactField } from '../../components/CompactField/CompactField.jsx'
import { CommunityAnswersCard } from '../../components/CommunityAnswersCard/CommunityAnswersCard.jsx'
import { CommunityCreatorDiscoverCard } from '../../components/CommunityCreatorDiscoverCard/CommunityCreatorDiscoverCard.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { OptionTile } from '../../components/OptionTile/OptionTile.jsx'
import { RightRailWelcomeCard } from '../../components/RightRailWelcomeCard/RightRailWelcomeCard.jsx'
import { SocialUrlInput, getDetectedSocialAccountHelperText } from '../../components/SocialUrlInput/SocialUrlInput.jsx'
import { brandPreviewDefaults, compactWysiwygPalette } from '../../utils/brandPreviewDefaults.js'
import { normalizeHexColor } from '../../utils/colorContrast.js'
import { createPreviewThemeStyle } from '../../utils/previewTheme.js'
import { COMMUNITY_VERTICAL_OPTIONS, COMMUNITY_VERTICAL_OTHER, getClosestCommunityVertical } from '../../utils/communityVerticals.js'
import { CommunityTermsModal } from '../CommunityTermsModal/CommunityTermsModal.jsx'
import { CelebrationBackground } from '../SubmissionSuccess/SubmissionSuccess.jsx'

const mobileStepOrder = ['entry', 'gather', 'preview', 'verify', 'success']
const descriptionCharacterLimit = 130
const shortDescriptionCharacterLimit = 40
const mobilePrimaryActionDelayMs = 900
const mobileGatherVideoLeadInMs = 2000
const mobileGatherRowFetchMs = 700
const mobileGatherResolvedPauseMs = 1000
const shimmerTransition = {
  repeat: Infinity,
  duration: 1.45,
  ease: 'easeInOut',
}

function getCharacterCountLabel(value, limit) {
  return `${value.length}/${limit} characters`
}

const mobileStepMeta = {
  entry: {
    label: 'Source',
    title: 'Where do your fans live?',
    description: "Your Raptive community will be a new home for your fans. Paste a link to where we can find them: your main social account or website. We’ll do the rest!",
    primaryLabel: 'Continue',
    primarySuccessLabel: 'Pulling data',
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
  gather: {
    label: 'Review',
    title: 'We’re finding your fans.',
    description: 'Give us a moment while we pull some details.',
    primaryLabel: 'Continue',
    primarySuccessLabel: 'Finding...',
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
  confirm: {
    label: 'Review',
    title: 'Take a look at what we found.',
    description: "Check out what we found and make any changes you'd like before we continue. This doesn't have to be exactly perfect, it helps us figure out the potential of your community, and what branding to start with.",
    primaryLabel: 'Looks good',
    primarySuccessLabel: 'Sneak peaking...',
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
  preview: {
    label: 'Preview',
    title: 'How does everything look?',
    description: "Fine-tune the details fans will see first. The preview shows where your name, logo, copy, and color can appear. Really only worry about your community's name here, everything else can be customized again later.",
    primaryLabel: 'Continue to Verification',
    primarySuccessLabel: "Let's verify...",
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
  verify: {
    label: 'Verify',
    title: "One last check to know it's really you.",
    description: 'Complete verification for one of your channels to wrap up your application.',
    primaryLabel: 'Submit application',
    primarySuccessLabel: 'Submitting...',
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
  success: {
    label: 'Done',
    title: "You're on the list. We'll take it from here.",
    description: "We'll review the setup across brand, audience, and community fit. If there's a match, our team will reach out with next steps.",
    primaryLabel: 'Close',
    primarySuccessLabel: 'Close',
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
}

const mobileSocialAccountDefaults = [
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@culturecrave',
    followers: '318,000 followers',
  },
  {
    id: 'tiktok',
    platform: 'TikTok',
    handle: '@culturecrave',
    followers: '124,000 followers',
  },
  {
    id: 'pinterest',
    platform: 'Pinterest',
    handle: '@culturecrave',
    followers: '84,000 followers',
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    handle: '@culturecrave',
    followers: 'Followers unavailable',
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    handle: '@culturecrave',
    followers: 'Followers unavailable',
  },
]

function getInitialMobileSocialAccounts() {
  return mobileSocialAccountDefaults.slice(0, 3).map((account) => ({ ...account }))
}

function mobileIcon(Icon) {
  return <LucideIcon icon={Icon} size="lg" stroke="display" />
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

function MobileIntro({ title, description, dark = false }) {
  return (
    <div className="space-y-2">
      <h2 className={['font-newsreader text-display font-normal leading-xl', dark ? 'text-white' : 'text-text'].join(' ')}>
        {title}
      </h2>
      {description ? (
        <p className={['text-sm leading-relaxed', dark ? 'text-white/80' : 'text-text-secondary'].join(' ')}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

function MobileFooter({
  canGoBack,
  onBack,
  onPrimary,
  primaryAction,
  forceSuccess,
  dark = false,
}) {
  const SuccessIcon = primaryAction.successIcon

  return (
    <footer className={['border-t px-4 py-2.5', dark ? 'border-neutral-800 bg-neutral-950' : 'border-border bg-surface'].join(' ')}>
      <div className="flex items-center gap-3">
        {canGoBack ? (
          <Button
            size="md"
            variant="ghost"
            iconBefore={<LucideIcon icon={ChevronLeft} size="md" />}
            onClick={onBack}
          >
            Back
          </Button>
        ) : null}
        <Button
          size="md"
          onClick={onPrimary}
          disabled={primaryAction.disabled}
          success={forceSuccess || primaryAction.success}
          successLabel={primaryAction.successLabel}
          successIcon={<LucideIcon icon={SuccessIcon} size="md" stroke="standard" className={primaryAction.successIconClassName} />}
          className={canGoBack ? 'flex-1' : ''}
          fullWidth={!canGoBack}
        >
          {primaryAction.label}
        </Button>
      </div>
    </footer>
  )
}

export function MobileOnboardingFlow({ forceSuccess = false }) {
  const detectedBrandColor = normalizeHexColor(compactWysiwygPalette[0]) ?? brandPreviewDefaults.brand
  const shouldReduceMotion = useReducedMotion()
  const actionTimeoutRef = useRef(null)
  const [activeStep, setActiveStep] = useState('entry')
  const [creatorUrl, setCreatorUrl] = useState('https://instagram.com/culturecrave')
  const [openGatherRow, setOpenGatherRow] = useState('identity')
  const [communityName, setCommunityName] = useState('Culture Crave Community')
  const [communityTopic, setCommunityTopic] = useState(getClosestCommunityVertical('Pop Culture'))
  const [communityDescription, setCommunityDescription] = useState('Pop culture community tracking movies, TV, music, celebrity moments, and the fandom conversations people cannot stop discussing.')
  const [communityDiscoverText, setCommunityDiscoverText] = useState('React to the moments fans love most.')
  const [horizontalLogoUrl, setHorizontalLogoUrl] = useState(null)
  const [squareLogoUrl, setSquareLogoUrl] = useState(null)
  const [brandColor, setBrandColor] = useState(detectedBrandColor)
  const [resolvedGatherRows, setResolvedGatherRows] = useState([])
  const [socialAccounts, setSocialAccounts] = useState(getInitialMobileSocialAccounts)
  const [editingSocialAccountId, setEditingSocialAccountId] = useState(null)
  const [socialAccountDraft, setSocialAccountDraft] = useState('')
  const [verificationMethod, setVerificationMethod] = useState('meta-login')
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [verificationTermsAccepted, setVerificationTermsAccepted] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [pendingPrimaryStep, setPendingPrimaryStep] = useState(null)
  const activeIndex = mobileStepOrder.indexOf(activeStep)
  const mobileGatherResolved = activeStep === 'gather' && resolvedGatherRows.includes('source')
  const activeMeta = activeStep === 'gather' && mobileGatherResolved
    ? mobileStepMeta.confirm
    : mobileStepMeta[activeStep]
  const previewThemeStyle = useMemo(() => createPreviewThemeStyle({ brandColor }), [brandColor])
  const isSuccessStep = activeStep === 'success'
  const screenTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }

  const primaryDisabled = (
    (activeStep === 'entry' && !creatorUrl.trim())
    || (activeStep === 'verify' && (!verificationMethod || !verificationConfirmed || !verificationTermsAccepted))
  )
  const primaryPending = pendingPrimaryStep === activeStep
  const primaryAction = {
    label: activeMeta.primaryLabel,
    successLabel: activeMeta.primarySuccessLabel,
    successIcon: activeMeta.primarySuccessIcon,
    successIconClassName: activeMeta.primarySuccessIconClassName,
    success: primaryPending,
    disabled: primaryDisabled || Boolean(pendingPrimaryStep),
  }

  useEffect(() => (
    () => {
      if (actionTimeoutRef.current) {
        window.clearTimeout(actionTimeoutRef.current)
      }
    }
  ), [])

  useEffect(() => {
    if (activeStep !== 'gather') {
      setResolvedGatherRows([])
      return undefined
    }

    setResolvedGatherRows([])
    setOpenGatherRow(null)
    const identityResolveDelay = mobileGatherVideoLeadInMs + mobileGatherRowFetchMs
    const sourceLoadDelay = identityResolveDelay + mobileGatherResolvedPauseMs
    const sourceResolveDelay = sourceLoadDelay + mobileGatherRowFetchMs
    const timers = [
      window.setTimeout(() => {
        setResolvedGatherRows(['identity'])
        setOpenGatherRow('identity')
      }, identityResolveDelay),
      window.setTimeout(() => {
        setResolvedGatherRows(['identity', 'source'])
        setOpenGatherRow('source')
      }, sourceResolveDelay),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [activeStep])

  const goToNextStep = () => {
    if (primaryDisabled || pendingPrimaryStep) return

    setPendingPrimaryStep(activeStep)

    actionTimeoutRef.current = window.setTimeout(() => {
      setPendingPrimaryStep(null)
      actionTimeoutRef.current = null

      if (activeStep === 'success') {
        setActiveStep('entry')
        return
      }

      setActiveStep(mobileStepOrder[Math.min(activeIndex + 1, mobileStepOrder.length - 1)])
    }, mobilePrimaryActionDelayMs)
  }

  const goToPreviousStep = () => {
    if (pendingPrimaryStep) return

    setActiveStep(mobileStepOrder[Math.max(activeIndex - 1, 0)])
  }

  const handleVerificationMethodChange = (value) => {
    setVerificationMethod(value)
    setVerificationConfirmed(false)
    setVerificationTermsAccepted(false)
  }
  const isGatherRowResolved = (rowId) => resolvedGatherRows.includes(rowId)
  const handleGatherOpenRowChange = (nextOpenRow, row) => {
    if (!isGatherRowResolved(row?.id)) return

    setOpenGatherRow(nextOpenRow)
  }
  const startSocialAccountEdit = (account) => {
    setEditingSocialAccountId(account.id)
    setSocialAccountDraft(account.handle)
  }
  const cancelSocialAccountEdit = () => {
    setEditingSocialAccountId(null)
    setSocialAccountDraft('')
  }
  const saveSocialAccountEdit = () => {
    if (!editingSocialAccountId) return

    setSocialAccounts((current) => current.map((account) => (
      account.id === editingSocialAccountId
        ? { ...account, handle: socialAccountDraft.trim() || account.handle }
        : account
    )))
    cancelSocialAccountEdit()
  }
  const removeSocialAccount = (accountId) => {
    setSocialAccounts((current) => current.filter((account) => account.id !== accountId))

    if (editingSocialAccountId === accountId) {
      cancelSocialAccountEdit()
    }
  }
  const nextSocialAccount = mobileSocialAccountDefaults.find((account) => (
    !socialAccounts.some((currentAccount) => currentAccount.id === account.id)
  ))
  const addSocialAccount = () => {
    if (!nextSocialAccount) return

    setSocialAccounts((current) => [...current, { ...nextSocialAccount }])
  }
  const communityTopicHelperText = communityTopic === COMMUNITY_VERTICAL_OTHER
    ? 'Our team will reach out to confirm your community topic.'
    : null
  const communityDescriptionHelperText = getCharacterCountLabel(communityDescription, descriptionCharacterLimit)
  const communityDiscoverHelperText = getCharacterCountLabel(communityDiscoverText, shortDescriptionCharacterLimit)
  const socialAccountsSummary = socialAccounts.length > 0
    ? socialAccounts.map((account) => account.platform).join(', ')
    : 'No social accounts'

  const gatherRows = [
    {
      id: 'identity',
      icon: IdCard,
      label: 'Identity',
      subtext: isGatherRowResolved('identity')
        ? 'Culture Crave / instagram.com/culturecrave'
        : <ShellRowShimmer label="Matching the submitted URL to a creator profile." />,
      trailing: isGatherRowResolved('identity') ? <FoundBadgeReveal /> : null,
      content: isGatherRowResolved('identity')
        ? (
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Creator name</p>
            <p className="text-base font-semibold text-text">Culture Crave</p>
            <p className="text-sm leading-relaxed text-text-secondary">instagram.com/culturecrave</p>
          </div>
        )
        : null,
    },
    {
      id: 'source',
      icon: Link2,
      label: 'Social accounts',
      subtext: isGatherRowResolved('source')
        ? socialAccountsSummary
        : <ShellRowShimmer label="Checking connected social accounts." />,
      trailing: isGatherRowResolved('source') ? <FoundBadgeReveal /> : null,
      content: isGatherRowResolved('source') ? (
        <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
          {socialAccounts.length > 0 ? (
            <div className="space-y-2">
              {socialAccounts.map((account) => (
                <div key={account.id} className="flex items-baseline justify-between gap-3 text-sm leading-relaxed text-text-secondary">
                  <div className="min-w-0">
                    {account.platform}:{' '}
                    {editingSocialAccountId === account.id ? (
                      <input
                        className="inline-block h-6 w-36 rounded-md border border-border bg-surface px-1.5 text-sm font-semibold leading-sm text-text outline-none transition-colors duration-150 focus:border-brand focus:ring-1 focus:ring-brand"
                        value={socialAccountDraft}
                        onChange={(event) => setSocialAccountDraft(event.target.value)}
                        onBlur={saveSocialAccountEdit}
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
                        onClick={() => startSocialAccountEdit(account)}
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
                    onClick={() => removeSocialAccount(account.id)}
                    aria-label={`Remove ${account.platform} account`}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed text-text-secondary">
              No social accounts are attached. Go back to the source step to use a different link.
            </p>
          )}

          {nextSocialAccount ? (
            <Button
              size="sm"
              variant="secondary"
              iconBefore={<LucideIcon icon={Plus} size="sm" />}
              onClick={addSocialAccount}
            >
              Add another account
            </Button>
          ) : null}
        </div>
      ) : null,
    },
  ]

  const previewEditorRows = [
    {
      id: 'community',
      icon: IdCard,
      label: 'Community info',
      subtext: 'Name, topic, description',
      content: (
        <div className="space-y-2.5">
          <CompactField
            label="name"
            labelEmphasis="strong"
            value={communityName}
            onChange={setCommunityName}
          />
          <CompactField
            label="main topic"
            type="select"
            value={communityTopic}
            onChange={setCommunityTopic}
            options={COMMUNITY_VERTICAL_OPTIONS}
            helperText={communityTopicHelperText}
          />
          <CompactField
            label="description"
            type="textarea"
            value={communityDescription}
            onChange={setCommunityDescription}
            rows={2}
            maxLength={descriptionCharacterLimit}
            helperText={communityDescriptionHelperText}
          />
          <CompactField
            label="short description"
            type="textarea"
            value={communityDiscoverText}
            onChange={setCommunityDiscoverText}
            rows={2}
            maxLength={shortDescriptionCharacterLimit}
            helperText={communityDiscoverHelperText}
          />
        </div>
      ),
    },
    {
      id: 'logo',
      icon: ImageIcon,
      label: 'Logo',
      subtext: 'Horizontal and square logos',
      content: (
        <div className="grid gap-3 sm:grid-cols-2">
          <AvatarUpload
            label="Horizontal"
            uploadLabel="Upload asset"
            previewLabel="Horizontal logo"
            previewShape="rectangle"
            layout="button"
            value={horizontalLogoUrl}
            onChange={setHorizontalLogoUrl}
          />
          <AvatarUpload
            label="Square"
            uploadLabel="Upload asset"
            previewLabel="Square logo"
            previewShape="square"
            layout="button"
            value={squareLogoUrl}
            onChange={setSquareLogoUrl}
          />
        </div>
      ),
    },
    {
      id: 'colors',
      icon: Palette,
      label: 'Community color',
      subtext: 'Brand and generated accent',
      content: (
        <div className="space-y-3">
          <p className="text-xs leading-relaxed text-text-secondary">
            Choose the brand color to preview how your community could feel. We’ll automatically create the accessible accent tint, hover states, and text colors from it.
          </p>
          <ColorInput
            label="Brand Color"
            value={brandColor}
            layout="compact"
            fallbackColor={brandPreviewDefaults.brand}
            onChange={setBrandColor}
          />
        </div>
      ),
    },
  ]

  const content = {
    entry: (
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xs">
          <div className="relative h-40">
            <img
              src={singleFieldIntakeIllustrationUrl}
              alt="Vibrant fantasy garden illustration for the creator application entry step"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        <MobileIntro title={activeMeta.title} description={activeMeta.description} />

        <SocialUrlInput
          label="Creator source"
          placeholder="Paste a creator URL"
          value={creatorUrl}
          onChange={(event) => setCreatorUrl(event.target.value)}
          description={getDetectedSocialAccountHelperText(creatorUrl)}
        />
      </div>
    ),
    gather: (
      <div className="space-y-4">
        <div className="overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xs">
          <video
            src={wonderVideoUrl}
            className="h-36 w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Fantastical garden video reveal for the creator data gathering step"
          />
        </div>

        <MobileIntro title={activeMeta.title} description={activeMeta.description} />

        <AccordionPanelGroup
          rows={gatherRows}
          openRow={openGatherRow}
          onOpenRowChange={handleGatherOpenRowChange}
          allowCollapse={false}
          className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs"
        />
      </div>
    ),
    preview: (
      <div className="space-y-4">
        <MobileIntro title={activeMeta.title} description={activeMeta.description} />

        <AccordionPanelGroup
          rows={previewEditorRows}
          allRowsOpen
          className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs"
        />

        <div className="preview-theme grid gap-2.5" style={previewThemeStyle}>
          <div className="flex justify-center">
            <RightRailWelcomeCard
              className="h-full"
              creatorName={communityName}
              title={communityName}
              description={communityDescription}
              websiteUrl="www.culturecrave.com"
              highlight={null}
              closing={null}
              readerCount="186"
              onlineCount="12"
              primaryLabel="Join the community"
            />
          </div>
          <div className="grid gap-2.5">
            <CommunityCreatorDiscoverCard
              name={communityName}
              activeMembersLabel="186 early members"
              topicLabel={communityTopic}
              description={communityDiscoverText}
              avatarSrc={squareLogoUrl}
              avatarShape="square"
              ctaLabel="Explore community"
              onExplore={() => {}}
            />
          </div>
          <CommunityAnswersCard
            authorName="Culture Crave"
            communityName={communityName}
            question="Which pop culture moment should we unpack first?"
            answerCount={12}
            avatarSrc={squareLogoUrl}
            avatarShape="square"
            onAnswer={() => {}}
            onViewAnswers={() => {}}
            className="aspect-auto min-h-48"
          />
        </div>
      </div>
    ),
    verify: (
      <div className="space-y-4">
        <MobileIntro title={activeMeta.title} description={activeMeta.description} />

        <div className="space-y-2.5">
          <OptionTile
            icon={mobileIcon(BadgeCheck)}
            title="Login with Meta to verify your Instagram account"
            description="Verify @culturecrave without a manual message."
            selected={verificationMethod === 'meta-login'}
            selectionStyle="radio"
            onClick={() => handleVerificationMethodChange('meta-login')}
            className="min-h-24 px-4 py-3"
          />
          <OptionTile
            icon={mobileIcon(Mail)}
            title="Verify with Persona"
            description="Use Persona when Meta login is not convenient today."
            selected={verificationMethod === 'email-domain'}
            selectionStyle="radio"
            onClick={() => handleVerificationMethodChange('email-domain')}
            className="min-h-24 px-4 py-3"
          />
        </div>

        <div className="grid gap-3">
          <Checkbox
            checked={verificationConfirmed}
            onChange={(event) => setVerificationConfirmed(event.target.checked)}
            variant="plain"
            label="I control this creator account and want to continue with verification."
            description="This keeps the mobile step intentional without adding a long ceremony."
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
        ),
        success: (
          <div className="relative overflow-hidden">
            <CelebrationBackground active variant="token-burst" shouldReduceMotion={shouldReduceMotion} />

            <div className="relative z-10 space-y-4">
          <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-xs">
            <div className="relative h-44">
              <img
                src={submissionIllustrationUrl}
                alt="Completion illustration for the creator application submission success step"
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>
          </div>

          <MobileIntro title={activeMeta.title} description={activeMeta.description} dark />

          <div className="space-y-2.5">
            {[
              ['Submitted', 'Today your details move into review.', true],
              ['Approved', 'If there is a fit, we will reach out with next steps.', false],
              ['Live', "When you're ready.", false],
            ].map(([title, description, current]) => (
              <div key={title} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <span
                  className={[
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border',
                    current ? 'border-gamification-gold-light/30 bg-gamification-gold-light/15' : 'border-white/10 bg-white/5',
                  ].join(' ')}
                >
                  <span className={['h-2.5 w-2.5 rounded-full', current ? 'bg-gamification-gold-light' : 'bg-white/28'].join(' ')} />
                </span>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-white">{title}</p>
                  <p className="text-sm leading-relaxed text-white/80">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
      {/* no token available: mobile design review uses a fixed phone preview rail. */}
      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
          <div className="space-y-3">
            <Badge variant="brand" size="sm" icon={<LucideIcon icon={ShieldCheck} size="sm" />}>
              Mobile onboarding
            </Badge>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-text">Creator flow, handset first</h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                The mobile preview keeps the same onboarding story as desktop while moving media, fetched signals, editing, verification, and submission into a single stacked viewport.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {mobileStepOrder.map((stepId, index) => {
            const isActive = stepId === activeStep
            const stepMeta = mobileStepMeta[stepId]

            return (
              <div
                key={stepId}
                className={[
                  'rounded-xl border p-4 transition-colors duration-150',
                  isActive ? 'border-brand bg-brand-subtle' : 'border-border bg-surface',
                ].join(' ')}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{`0${index + 1}`}</p>
                    <p className="text-sm font-semibold text-text">{stepMeta.label}</p>
                  </div>
                  {isActive ? <LucideIcon icon={Palette} size="sm" className="text-brand" /> : null}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mx-auto w-full max-w-sm">
        {/* no token available: fixed 390px-class handset frame for mobile review fidelity. */}
        <div className="overflow-hidden rounded-[32px] border border-border-strong bg-neutral-950 p-2 shadow-4">
          <div className={['relative flex h-[812px] flex-col overflow-hidden rounded-[24px]', isSuccessStep ? 'bg-neutral-950' : 'bg-surface'].join(' ')}>
            <header className={['border-b px-4 py-s', isSuccessStep ? 'border-neutral-800 bg-neutral-950' : 'border-border bg-surface'].join(' ')}>
              <div className="flex items-center justify-between gap-3">
                <BrandLogo size="sm" />
                <Badge variant="brand" size="xs">
                  {activeMeta.label}
                </Badge>
              </div>
            </header>

            <main className="scrollbar-hide flex-1 overflow-y-auto px-4 py-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={screenTransition}
                >
                  {content[activeStep]}
                </motion.div>
              </AnimatePresence>
            </main>

            <MobileFooter
              canGoBack={activeIndex > 0 && !isSuccessStep}
              onBack={goToPreviousStep}
              onPrimary={goToNextStep}
              primaryAction={primaryAction}
              forceSuccess={forceSuccess}
              dark={isSuccessStep}
            />
            <CommunityTermsModal
              isOpen={termsModalOpen}
              onDismiss={() => setTermsModalOpen(false)}
              onAccept={() => setVerificationTermsAccepted(true)}
              presentation="mobile"
            />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
