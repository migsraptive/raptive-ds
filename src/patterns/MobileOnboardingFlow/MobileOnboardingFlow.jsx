import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, ChevronLeft, IdCard, Image as ImageIcon, Link2, LoaderCircle, Mail, Palette, ShieldCheck } from 'lucide-react'
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
    title: 'Take a look at what we found.',
    description: 'Confirm the creator profile before we use it to shape the first community preview.',
    primaryLabel: 'Looks right',
    primarySuccessLabel: 'Sneak peaking...',
    primarySuccessIcon: LoaderCircle,
    primarySuccessIconClassName: 'animate-spin',
  },
  preview: {
    label: 'Preview',
    title: 'We used your brand to jumpstart your community. How does it look?',
    description: 'Fine-tune the details fans will see first. The preview shows where your name, logo, copy, and color can appear.',
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

const gatherRows = [
  {
    id: 'identity',
    icon: IdCard,
    label: 'Identity',
    subtext: 'Culture Crave / instagram.com/culturecrave',
    trailing: <Badge variant="success" size="sm">Found</Badge>,
    content: (
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Creator name</p>
        <p className="text-base font-semibold text-text">Culture Crave</p>
        <p className="text-sm leading-relaxed text-text-secondary">instagram.com/culturecrave</p>
      </div>
    ),
  },
  {
    id: 'source',
    icon: Link2,
    label: 'Social accounts',
    subtext: 'Instagram, TikTok, Pinterest',
    trailing: <Badge variant="success" size="sm">Found</Badge>,
    content: (
      <div className="space-y-2 text-sm leading-relaxed text-text-secondary">
        {[
          ['Instagram', '@culturecrave', '318,000 followers'],
          ['TikTok', '@culturecrave', '124,000 followers'],
          ['Pinterest', '@culturecrave', '84,000 followers'],
        ].map(([platform, handle, followers]) => (
          <div key={platform} className="flex items-baseline justify-between gap-3">
            <span className="min-w-0">
              {platform}: <span className="font-semibold text-text">{handle}</span>
            </span>
            <span className="flex-shrink-0 text-xs text-text-tertiary">{followers}</span>
          </div>
        ))}
      </div>
    ),
  },
]

function mobileIcon(Icon) {
  return <LucideIcon icon={Icon} size="lg" stroke="display" />
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
  const [verificationMethod, setVerificationMethod] = useState('instagram-dm')
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [verificationTermsAccepted, setVerificationTermsAccepted] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)
  const [pendingPrimaryStep, setPendingPrimaryStep] = useState(null)
  const activeIndex = mobileStepOrder.indexOf(activeStep)
  const activeMeta = mobileStepMeta[activeStep]
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
  const communityTopicHelperText = communityTopic === COMMUNITY_VERTICAL_OTHER
    ? 'Our team will reach out to confirm your community topic.'
    : null
  const communityDescriptionHelperText = getCharacterCountLabel(communityDescription, descriptionCharacterLimit)
  const communityDiscoverHelperText = getCharacterCountLabel(communityDiscoverText, shortDescriptionCharacterLimit)

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
      label: 'Community colors',
      subtext: 'Brand and generated accent',
      content: (
        <div className="space-y-3">
          <p className="text-xs leading-relaxed text-text-secondary">
            Choose the brand color to preview how your community could feel. We’ll automatically create the accessible accent tint, hover states, and text colors from it.
          </p>
          <ColorInput
            label="Brand Color"
            description="Used for buttons, links, creator marks, and the generated highlight tint."
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
          onOpenRowChange={setOpenGatherRow}
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
            icon={mobileIcon(Mail)}
            title="Confirm with an Instagram DM"
            description="Send a short code from @culturecrave to @raptive_community."
            selected={verificationMethod === 'instagram-dm'}
            selectionStyle="radio"
            onClick={() => handleVerificationMethodChange('instagram-dm')}
            className="min-h-24 px-4 py-3"
          >
            {verificationMethod === 'instagram-dm' ? (
              <span className="mt-1 block rounded-lg border border-border bg-surface px-3 py-2">
                <span className="block text-xs font-medium uppercase tracking-caps text-text-secondary">Your code</span>
                <span className="mt-1 block font-mono text-2xl font-medium text-text">CULTURE-453</span>
                <span className="mt-1 block text-sm leading-relaxed text-text-secondary">
                  DM this code from @culturecrave. Then return here to submit.
                </span>
              </span>
            ) : null}
          </OptionTile>
          <OptionTile
            icon={mobileIcon(BadgeCheck)}
            title="Confirm with a creator email"
            description="Use a domain-linked email when social access is not nearby."
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
                You must agree to the{' '}
                <span className="font-bold text-action-primary underline underline-offset-2">Community Terms</span>
                {' '}before submitting your application.
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
