import { useEffect, useRef, useState } from 'react'
import { BadgeCheck, IdCard, Link2, LoaderCircle, Mail, Plus } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import wonderVideoUrl from '../../assets/data-gathering-wonder.mp4'
import singleFieldIntakeIllustrationUrl from '../../assets/single-field-intake-illustration.png'
import submissionIllustrationUrl from '../../assets/submission-illustration.png'
import verificationIllustrationUrl from '../../assets/verification-illustration.png'
import { AccordionPanelGroup } from '../../components/AccordionPanelGroup/AccordionPanelGroup.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl.jsx'
import { getDetectedSocialAccountHelperText, SocialUrlInput } from '../../components/SocialUrlInput/SocialUrlInput.jsx'
import { CommunityTermsModal } from '../CommunityTermsModal/CommunityTermsModal.jsx'
import { CompactWysiwygStudio } from '../CompactWysiwygStudio/CompactWysiwygStudio.jsx'
import { CreatorOnboardingViewportShell } from '../CreatorOnboardingViewportShell/CreatorOnboardingViewportShell.jsx'
import { CelebrationBackground } from '../SubmissionSuccess/SubmissionSuccess.jsx'

const stepOrder = ['entry', 'gather', 'preview', 'verify', 'success']
const gatherVideoLeadInMs = 2000
const gatherVideoPlaybackRate = 0.45
const gatherRowFetchMs = 700
const gatherResolvedPauseMs = 1000
const stepOptions = [
  { value: 'entry', label: 'Entry' },
  { value: 'gather', label: 'Gather' },
  { value: 'preview', label: 'Preview' },
  { value: 'verify', label: 'Verify' },
  { value: 'success', label: 'Success' },
]
const loadingSuccessIcon = <LucideIcon icon={LoaderCircle} size="md" stroke="standard" className="animate-spin" />
const tileIcon = (Icon) => <LucideIcon icon={Icon} size="lg" stroke="display" />
const socialAccountDefaults = [
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
const reviewFields = {
  name: 'Culture Crave',
  url: 'instagram.com/culturecrave',
}
const previewSteps = {
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
    title: 'We used your brand to jumpstart your community. How does it look?',
    description: "Fine-tune the details fans will see first. The preview shows where your name, logo, copy, and color can appear. Really only worry about your community's name here, everything else can be customized again later.",
    primaryLabel: 'Continue to Verification',
    primarySuccessLabel: "Let's verify...",
    primarySuccessIcon: loadingSuccessIcon,
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
const gatherLoadingCopy = {
  identity: 'Matching the submitted URL to a creator profile.',
  source: 'Checking connected social accounts.',
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

export function CreatorOnboardingViewportDemo({
  framed = true,
  showStandaloneLink = false,
  standaloneUrl = '/community-ds/?view=creator-onboarding-viewport&step=preview',
  syncStepToUrl = false,
  onOpenStandalone,
}) {
  const shouldReduceMotion = useReducedMotion()
  const [previewStep, setPreviewStep] = useState(() => {
    if (!syncStepToUrl || typeof window === 'undefined') {
      return 'entry'
    }

    const stepParam = new URLSearchParams(window.location.search).get('step')
    return stepOrder.includes(stepParam) ? stepParam : 'entry'
  })
  const [openRow, setOpenRow] = useState('identity')
  const [resolvedRows, setResolvedRows] = useState([])
  const [creatorUrl, setCreatorUrl] = useState('')
  const [socialAccountPlatforms, setSocialAccountPlatforms] = useState(['Instagram', 'TikTok', 'Pinterest'])
  const [handleOverrides, setHandleOverrides] = useState({})
  const [editingHandlePlatform, setEditingHandlePlatform] = useState(null)
  const [handleDraft, setHandleDraft] = useState('')
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [verificationTermsAccepted, setVerificationTermsAccepted] = useState(false)
  const [termsModalOpen, setTermsModalOpen] = useState(false)

  const socialAccounts = socialAccountPlatforms.map((platform) => {
    const account = socialAccountDefaults.find((item) => item.platform === platform)
    if (!account) return null

    return {
      ...account,
      handle: handleOverrides[platform] ?? account.handle,
    }
  }).filter(Boolean)
  const nextSocialAccount = socialAccountDefaults.find((account) => (
    !socialAccountPlatforms.includes(account.platform)
  ))
  const socialAccountSummary = socialAccounts
    .map((account) => account.platform)
    .join(', ') || 'No accounts added'
  const preview = previewSteps[previewStep] ?? previewSteps.entry
  const isResolved = (rowId) => resolvedRows.includes(rowId)
  const gatherResolved = isResolved('source')
  const headerPreview = previewStep === 'gather' && gatherResolved
    ? previewSteps.confirm
    : preview
  const previewIndex = Math.max(0, stepOrder.indexOf(previewStep))
  const isFirstStep = previewIndex === 0
  const isLastStep = previewIndex === stepOrder.length - 1
  const verificationIncomplete = previewStep === 'verify'
    && (!verificationConfirmed || !verificationTermsAccepted)
  const alignedPreviewStep = previewStep === 'preview'
  const wideContainerClassName = alignedPreviewStep ? 'max-w-5xl text-left' : ''
  const shellViewportClassName = framed ? undefined : 'min-h-[640px] lg:h-[calc(100vh-144px)]'

  const handleStepChange = (value) => {
    setPreviewStep(value)
    setOpenRow(value === 'gather' ? 'identity' : 'source')
    if (syncStepToUrl) {
      const url = new URL(window.location.href)
      url.searchParams.set('step', value)
      window.history.replaceState({}, '', url)
    }
  }
  const handleNext = () => {
    if (isLastStep) {
      handleStepChange('entry')
      return
    }

    handleStepChange(stepOrder[previewIndex + 1])
  }
  const handleBack = () => {
    handleStepChange(stepOrder[Math.max(0, previewIndex - 1)])
  }
  const handleOpenRowChange = (nextOpenRow, row) => {
    if (!isResolved(row?.id)) return

    setOpenRow(nextOpenRow)
  }
  const startHandleEdit = (account) => {
    setEditingHandlePlatform(account.platform)
    setHandleDraft(account.handle)
  }
  const saveHandleEdit = () => {
    if (!editingHandlePlatform) return

    setHandleOverrides((current) => ({
      ...current,
      [editingHandlePlatform]: handleDraft.trim() || current[editingHandlePlatform] || '@culturecrave',
    }))
    setEditingHandlePlatform(null)
    setHandleDraft('')
  }
  const removeSocialAccount = (platform) => {
    setSocialAccountPlatforms((current) => current.filter((item) => item !== platform))
    if (editingHandlePlatform === platform) {
      setEditingHandlePlatform(null)
      setHandleDraft('')
    }
  }
  const addSocialAccount = () => {
    if (!nextSocialAccount) return

    setSocialAccountPlatforms((current) => [...current, nextSocialAccount.platform])
  }

  useEffect(() => {
    if (previewStep !== 'gather') {
      setResolvedRows([])
      return undefined
    }

    setResolvedRows([])
    setOpenRow(null)
    const identityResolveDelay = gatherVideoLeadInMs + gatherRowFetchMs
    const sourceLoadDelay = identityResolveDelay + gatherResolvedPauseMs
    const sourceResolveDelay = sourceLoadDelay + gatherRowFetchMs
    const timers = [
      window.setTimeout(() => {
        setResolvedRows(['identity'])
        setOpenRow('identity')
      }, identityResolveDelay),
      window.setTimeout(() => {
        setResolvedRows(['identity', 'source'])
        setOpenRow('source')
      }, sourceResolveDelay),
    ]

    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [previewStep])

  const socialAccountContent = (
    <div className="space-y-3">
      <div className="space-y-2">
        {socialAccounts.map((account) => (
          <div key={account.platform} className="flex items-baseline justify-between gap-3 text-sm leading-relaxed text-text-secondary">
            <div className="min-w-0">
              {account.platform}:{' '}
              {editingHandlePlatform === account.platform ? (
                <input
                  className="inline-block h-6 w-36 rounded-md border border-border bg-surface px-1.5 text-sm font-semibold leading-sm text-text outline-none transition-colors duration-150 focus:border-brand focus:ring-1 focus:ring-brand"
                  value={handleDraft}
                  onChange={(event) => setHandleDraft(event.target.value)}
                  onBlur={saveHandleEdit}
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
                  onClick={() => startHandleEdit(account)}
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
              onClick={() => removeSocialAccount(account.platform)}
              aria-label={`Remove ${account.platform} account`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

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
  )
  const identityContent = (
    <div className="space-y-1">
      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Creator name</p>
      <p className="text-base font-semibold text-text">{reviewFields.name}</p>
      <p className="text-sm leading-relaxed text-text-secondary">
        {reviewFields.url}
      </p>
    </div>
  )
  const gatherRows = [
    {
      id: 'identity',
      icon: IdCard,
      label: 'Identity',
      subtext: isResolved('identity')
        ? `${reviewFields.name} · ${reviewFields.url}`
        : <ShellRowShimmer label={gatherLoadingCopy.identity} />,
      trailing: isResolved('identity') ? <FoundBadgeReveal /> : null,
      content: isResolved('identity')
        ? identityContent
        : null,
    },
    {
      id: 'source',
      icon: Link2,
      label: 'Social accounts',
      subtext: isResolved('source')
        ? socialAccountSummary
        : <ShellRowShimmer label={gatherLoadingCopy.source} />,
      trailing: isResolved('source') ? <FoundBadgeReveal /> : null,
      content: isResolved('source')
        ? socialAccountContent
        : null,
    },
  ]
  const openStandalone = () => {
    if (onOpenStandalone) {
      onOpenStandalone()
      return
    }

    window.location.href = standaloneUrl
  }

  return (
    <>
      <div className="space-y-4">
      <div className={[
        'flex flex-wrap items-end gap-3',
        showStandaloneLink ? 'justify-between' : 'justify-center',
      ].join(' ')}>
        <SegmentedControl
          label="Preview screen"
          value={previewStep}
          options={stepOptions}
          onChange={handleStepChange}
          className={showStandaloneLink ? '' : 'text-center'}
        />
        {showStandaloneLink ? (
          <Button size="sm" variant="secondary" onClick={openStandalone}>
            Open full-screen preview
          </Button>
        ) : null}
      </div>

      <CreatorOnboardingViewportShell
        title={headerPreview.title}
        description={headerPreview.description}
        background={previewStep === 'success' ? (
          <CelebrationBackground
            active
            variant="cursor-burst"
            shouldReduceMotion={shouldReduceMotion}
          />
        ) : null}
        topMedia={preview.image || preview.video ? (
          <div className="relative h-full w-full overflow-hidden">
            {preview.video ? (
              <TimedShellVideo
                src={preview.video}
                label={preview.videoLabel}
                playbackRate={previewStep === 'gather' ? gatherVideoPlaybackRate : 1}
                pauseAfterMs={previewStep === 'gather' ? gatherVideoLeadInMs : 3000}
              />
            ) : (
              <img
                src={preview.image}
                alt={preview.imageAlt}
                className="h-full w-full object-cover"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ) : null}
        containerClassName={wideContainerClassName}
        contentClassName={previewStep === 'gather' ? 'min-h-80' : ''}
        contentKey={`viewport-${previewStep}`}
        tone={preview.tone}
        framed={framed}
        viewportClassName={shellViewportClassName}
        footer={(
          <>
            {!isFirstStep ? (
              <Button size="lg" variant="secondary" onClick={handleBack}>
                Back
              </Button>
            ) : null}
            <Button
              size="lg"
              variant={preview.primaryVariant ?? 'primary'}
              success={false}
              successLabel={preview.primarySuccessLabel}
              successIcon={preview.primarySuccessIcon}
              disabled={verificationIncomplete}
              onClick={handleNext}
              className={[
                preview.primaryVariant === 'black' ? '!border !border-white/12 !bg-neutral-950 !text-white hover:!bg-neutral-900' : '',
              ].filter(Boolean).join(' ')}
            >
              {preview.primaryLabel}
            </Button>
          </>
        )}
      >
        <>
          {previewStep === 'entry' ? (
            <div className="mx-auto w-full max-w-2xl space-y-6">
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
          {previewStep === 'gather' ? (
            <div className="mx-auto w-full max-w-3xl space-y-6">
              <AccordionPanelGroup
                rows={gatherRows}
                openRow={openRow}
                onOpenRowChange={handleOpenRowChange}
                allowCollapse={false}
                className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs"
              />
            </div>
          ) : null}
          {previewStep === 'preview' ? (
            <div>
              <CompactWysiwygStudio
                secondaryAction={null}
                primaryAction={null}
              />
            </div>
          ) : null}
          {previewStep === 'verify' ? (
            <div className="mx-auto w-full max-w-3xl space-y-6">
              <div className="grid gap-4">
                {[
                  {
                    icon: tileIcon(Mail),
                    title: 'Confirm with an Instagram DM',
                    description: 'We’ll send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long. Just DM code to @raptive_community from @culturecrave.',
                  },
                  {
                    icon: tileIcon(BadgeCheck),
                    title: 'Confirm with a creator email',
                    description: 'Use a domain-linked creator email for a faster verification path when direct social access is not convenient.',
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
                      You must agree to the{' '}
                      <span className="font-bold text-action-primary underline underline-offset-2">Community Terms</span>
                      {' '}before submitting your application.
                    </>
                  )}
                />
              </div>
            </div>
          ) : null}
          {previewStep === 'success' ? (
            <div className="mx-auto w-full max-w-2xl space-y-8">
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
      </CreatorOnboardingViewportShell>
      </div>
      <CommunityTermsModal
        isOpen={termsModalOpen}
        onDismiss={() => setTermsModalOpen(false)}
        onAccept={() => setVerificationTermsAccepted(true)}
      />
    </>
  )
}
