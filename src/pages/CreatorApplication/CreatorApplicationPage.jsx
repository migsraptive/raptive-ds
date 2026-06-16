import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, LoaderCircle, Mail, Rocket, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import wonderVideoUrl from '../../assets/data-gathering-wonder.mp4'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { getDetectedSocialAccountHelperText } from '../../components/SocialUrlInput/SocialUrlInput.jsx'
import { CompactWysiwygStudio } from '../../patterns/CompactWysiwygStudio/CompactWysiwygStudio.jsx'
import { DataGatheringReview } from '../../patterns/DataGatheringReview/DataGatheringReview.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'

const flowStepIds = ['entry', 'gather', 'review', 'verify', 'submit']
const captureStepIndexes = {
  entry: 0,
  gather: 1,
  review: 2,
  verify: 3,
  verification: 3,
  success: 4,
  submit: 4,
}
const loadingSuccessIcon = <LucideIcon icon={LoaderCircle} size="md" stroke="standard" className="animate-spin" />

const initialCreatorUrl = ''
const captureCreatorUrl = 'https://instagram.com/culturecrave'
const initialAccounts = [
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

const manualAccountPlatformOptions = [
  'Instagram',
  'TikTok',
  'Pinterest',
  'YouTube',
  'X/Twitter',
  'Facebook',
  'Substack',
  'Website',
]

const getInitialAccounts = () => initialAccounts.map((account) => ({ ...account }))

const stepTransition = {
  duration: 0.32,
  ease: [0.2, 0.9, 0.3, 1],
}

const gatherVideoLeadInMs = 2000
const gatherVideoPlaybackRate = 0.45

function GatherVideoAside() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.pause()
    video.currentTime = 0
    video.playbackRate = gatherVideoPlaybackRate

    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {})
    }

    const pauseTimer = window.setTimeout(() => {
      video.pause()
    }, gatherVideoLeadInMs)

    return () => {
      window.clearTimeout(pauseTimer)
      video.pause()
    }
  }, [])

  return (
    /* no token available: full-height video rail uses the same fixed desktop minimum as the previous gather illustration rail. */
    <div className="relative h-full min-h-[620px] overflow-hidden">
      <video
        ref={videoRef}
        src={wonderVideoUrl}
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
        aria-label="Fantastical garden video reveal for the creator data gathering step"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
    </div>
  )
}

function getDetectedSourceLabel(value) {
  const normalizedValue = value.trim().toLowerCase()

  if (!normalizedValue) return 'Instagram'
  if (normalizedValue.includes('tiktok')) return 'TikTok'
  if (normalizedValue.includes('pinterest')) return 'Pinterest'
  if (normalizedValue.includes('youtube') || normalizedValue.includes('youtu.be')) return 'YouTube'
  if (normalizedValue.includes('twitter') || normalizedValue.includes('x.com')) return 'X/Twitter'
  if (normalizedValue.includes('facebook') || normalizedValue.includes('fb.com')) return 'Facebook'
  if (normalizedValue.includes('substack')) return 'Substack'
  if (normalizedValue.includes('instagram') || normalizedValue.includes('instagr.am')) return 'Instagram'

  return 'Website'
}

export function CreatorApplicationPage({ onOpenLibrary, standalone = false }) {
  const captureConfig = useMemo(() => {
    if (typeof window === 'undefined') {
      return {
        captureMode: false,
        stepIndex: null,
      }
    }

    const params = new URLSearchParams(window.location.search)
    const captureStep = params.get('captureStep')?.trim().toLowerCase()
    const stepIndex = captureStepIndexes[captureStep] ?? null

    return {
      captureMode: params.get('capture') === 'true' || stepIndex !== null,
      stepIndex,
    }
  }, [])
  const initialCaptureStep = captureConfig.stepIndex ?? 0
  const initialCaptureUrl = initialCaptureStep > 0 ? captureCreatorUrl : initialCreatorUrl
  const [activeStep, setActiveStep] = useState(initialCaptureStep)
  const [creatorUrl, setCreatorUrl] = useState(initialCaptureUrl)
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState('meta-login')
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [verificationTermsAccepted, setVerificationTermsAccepted] = useState(false)
  const [fetchAccounts, setFetchAccounts] = useState(getInitialAccounts)
  const [gatherRowsResolved, setGatherRowsResolved] = useState(initialCaptureStep === 1)
  const [pendingPrimaryAction, setPendingPrimaryAction] = useState(null)
  const actionTimeoutRef = useRef(null)
  const instagramAccount = initialAccounts.find((account) => account.platform === 'Instagram')
  const creatorIsKnownLead = false
  const verificationMethods = useMemo(() => [
    ...(instagramAccount ? [{
      value: 'meta-login',
      icon: <LucideIcon icon={BadgeCheck} size="lg" stroke="display" />,
      title: 'Login with Meta to verify your Instagram account',
      description: `Use Login with Meta to verify ${instagramAccount.handle} without a manual message.`,
    }] : []),
    {
      value: 'email-domain',
      icon: <LucideIcon icon={Mail} size="lg" stroke="display" />,
      title: "Verify with Persona",
      description: 'Use Persona when Meta login is not convenient today.',
    },
  ], [instagramAccount])

  useEffect(() => (
    () => {
      if (actionTimeoutRef.current) {
        window.clearTimeout(actionTimeoutRef.current)
      }
    }
  ), [])

  useEffect(() => {
    if (verificationMethod && !verificationMethods.some((method) => method.value === verificationMethod)) {
      setVerificationMethod(verificationMethods[0]?.value)
      setVerificationConfirmed(false)
      setVerificationTermsAccepted(false)
    }
  }, [verificationMethod, verificationMethods])

  const activeStepId = flowStepIds[activeStep] ?? 'current-step'
  const progressMeter = null
  const gatherRowRevealDelay = captureConfig.captureMode ? 0 : gatherVideoLeadInMs
  const stepMotionProps = captureConfig.captureMode
    ? {
        initial: false,
        animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 16, scale: 0.996, filter: 'blur(4px)' },
        animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
        exit: { opacity: 0, y: -10, scale: 0.996, filter: 'blur(3px)' },
        transition: stepTransition,
      }

  const handleIntakeSubmit = () => {
    if (intakeLoading || !creatorUrl.trim()) return

    setIntakeLoading(true)

    window.setTimeout(() => {
      setIntakeLoading(false)
      setGatherRowsResolved(false)
      setActiveStep(1)
    }, 800)
  }

  const handleVerificationMethodChange = (value) => {
    setVerificationMethod(value)
    setVerificationConfirmed(false)
    setVerificationTermsAccepted(false)
  }

  const handleVerificationContinue = () => {
    setActiveStep(4)
  }

  const updateFetchAccount = (accountId, patch) => {
    setFetchAccounts((current) => current.map((account) => (
      account.id === accountId ? { ...account, ...patch } : account
    )))
  }

  const removeFetchAccount = (accountId) => {
    setFetchAccounts((current) => current.filter((account) => account.id !== accountId))
  }

  const addFetchAccount = () => {
    setFetchAccounts((current) => {
      const existingAccountIds = new Set(current.map((account) => account.id))
      const nextDetectedAccount = initialAccounts.find((account) => !existingAccountIds.has(account.id))

      if (nextDetectedAccount) {
        return [...current, { ...nextDetectedAccount }]
      }

      const manualAccountCount = current.filter((account) => account.id.startsWith('manual-account-')).length + 1
      const currentPlatforms = new Set(current.map((account) => account.platform))
      const nextPlatform = manualAccountPlatformOptions.find((platform) => !currentPlatforms.has(platform)) ?? 'Website'

      return [
        ...current,
        {
          id: `manual-account-${Date.now()}`,
          platform: nextPlatform,
          handle: '',
          url: '',
          followers: manualAccountCount === 1 ? 'Add details' : `Additional account ${manualAccountCount}`,
          isManual: true,
        },
      ]
    })
  }

  const triggerPrimaryAction = ({ key, delay = 1100, run }) => {
    if (pendingPrimaryAction === key) return

    if (actionTimeoutRef.current) {
      window.clearTimeout(actionTimeoutRef.current)
    }

    setPendingPrimaryAction(key)

    actionTimeoutRef.current = window.setTimeout(() => {
      setPendingPrimaryAction(null)
      actionTimeoutRef.current = null
      run()
    }, delay)
  }

  const resetApplicationFlow = () => {
    if (actionTimeoutRef.current) {
      window.clearTimeout(actionTimeoutRef.current)
      actionTimeoutRef.current = null
    }

    setPendingPrimaryAction(null)
    setIntakeLoading(false)
    setCreatorUrl(initialCreatorUrl)
    setFetchAccounts(getInitialAccounts())
    setGatherRowsResolved(false)
    setVerificationMethod(verificationMethods[0]?.value)
    setVerificationConfirmed(false)
    setVerificationTermsAccepted(false)
    setActiveStep(0)
  }

  let content = null

  if (activeStep === 0) {
    content = (
      <SingleFieldIntake
        title="Where do your fans live?"
        description="Your Raptive community will be a new home for your fans. Paste a link to where we can find them: your main social account or website. We’ll do the rest!"
        value={creatorUrl}
        onChange={(event) => setCreatorUrl(event.target.value)}
        onSubmit={handleIntakeSubmit}
        progressMeter={progressMeter}
        loading={intakeLoading}
        helperText={getDetectedSocialAccountHelperText(creatorUrl)}
        ctaLabel="Let's go"
        ctaSuccessLabel="Pulling data"
        ctaSuccessIcon={loadingSuccessIcon}
        ctaDisabled={!creatorUrl.trim()}
        showAside={false}
        framed={!standalone}
        contentAlign="center"
      />
    )
  }

  if (activeStep === 1) {
    content = (
      <DataGatheringReview
        title={gatherRowsResolved ? 'Take a look at what we found.' : 'We’re finding your fans.'}
        description={gatherRowsResolved
          ? "Check out what we found and make any changes you'd like before we continue. This doesn't have to be exactly perfect, it helps us figure out the potential of your community, and what branding to start with."
          : 'Give us a moment while we pull some details.'}
        detectedSource={getDetectedSourceLabel(creatorUrl)}
        submittedSourceValue={creatorUrl}
        progressMeter={progressMeter}
        rowRevealDelay={gatherRowRevealDelay}
        headerClassName="pt-6"
        rowPresentation="accordion"
        aside={<GatherVideoAside />}
        socialAccounts={fetchAccounts}
        onSocialAccountChange={updateFetchAccount}
        onAddSocialAccount={addFetchAccount}
        onRemoveSocialAccount={removeFetchAccount}
        onResolvedChange={setGatherRowsResolved}
        framed={!standalone}
        contentAlign="center"
        secondaryAction={{ label: 'Start over', variant: 'ghost', onClick: resetApplicationFlow }}
        primaryAction={{
          label: gatherRowsResolved ? 'Looks good' : 'Continue',
          disabled: !gatherRowsResolved || pendingPrimaryAction === 'gather-primary',
          success: pendingPrimaryAction === 'gather-primary',
          successLabel: 'Sneak peaking...',
          successIcon: loadingSuccessIcon,
          onClick: () => triggerPrimaryAction({
            key: 'gather-primary',
            run: () => setActiveStep(2),
          }),
        }}
      />
    )
  }

  if (activeStep === 2) {
    content = (
      <section className={['overflow-hidden rounded-xl bg-surface shadow-sm', !standalone ? 'border border-border' : ''].filter(Boolean).join(' ')}>
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8 lg:mx-auto lg:w-full lg:max-w-5xl">
            {progressMeter}
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
              secondaryAction={{
                label: 'Back',
                variant: 'secondary',
                onClick: () => {
                  setGatherRowsResolved(false)
                  setActiveStep(1)
                },
              }}
              primaryAction={{
                label: 'Continue to Verification',
                disabled: pendingPrimaryAction === 'review-primary',
                success: pendingPrimaryAction === 'review-primary',
                successLabel: "Let's verify...",
                successIcon: loadingSuccessIcon,
                onClick: () => triggerPrimaryAction({
                  key: 'review-primary',
                  run: () => setActiveStep(3),
                }),
              }}
            />
          </div>
        </div>
      </section>
    )
  }

  if (activeStep === 3) {
    content = (
      <VerificationStep
        title={creatorIsKnownLead ? "You're already verified!" : "One last check to know it's really you."}
        description={creatorIsKnownLead
          ? 'We found this creator on our known leads list, so you can skip channel verification.'
          : 'Complete verification for one of your channels to wrap up your application.'}
        methods={verificationMethods}
        selectedMethod={verificationMethod}
        onSelectMethod={handleVerificationMethodChange}
        progressMeter={progressMeter}
        confirmed={verificationConfirmed}
        onConfirmChange={setVerificationConfirmed}
        termsAccepted={verificationTermsAccepted}
        onTermsAcceptedChange={setVerificationTermsAccepted}
        alreadyVerified={creatorIsKnownLead}
        reassurance={[
          {
            icon: <LucideIcon icon={BadgeCheck} size="sm" />,
            title: 'Short confirmation',
            description: 'The creator receives a quick ownership check, not a full application form all over again.',
          },
          {
            icon: <LucideIcon icon={Rocket} size="sm" />,
            title: 'Submission follows immediately',
            description: 'Once confirmed, the final step can feel exclusive and complete instead of stalled.',
          },
          {
            icon: <LucideIcon icon={ShieldCheck} size="sm" />,
            title: 'Trust stays intact',
            description: 'The screen explains why verification exists so the momentum from preview does not collapse here.',
          },
        ]}
        showAside={false}
        framed={!standalone}
        contentAlign="center"
        secondaryAction={{
          label: 'Back',
          variant: 'secondary',
          onClick: () => {
            setActiveStep(2)
          },
        }}
        primaryAction={{
          label: 'Submit application',
          disabled: pendingPrimaryAction === 'verify-primary',
          success: pendingPrimaryAction === 'verify-primary',
          successLabel: 'Submitting...',
          successIcon: loadingSuccessIcon,
          onClick: () => triggerPrimaryAction({
            key: 'verify-primary',
            run: handleVerificationContinue,
          }),
        }}
      />
    )
  }

  if (activeStep === 4) {
    content = (
      <SubmissionSuccess
        title="You're on the list. We'll take it from here."
        summary="We’ll review the setup across brand, audience, and community fit. If there’s a match, our team will reach out with next steps."
        progressMeter={progressMeter}
        timeline={[
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
        ]}
        showAside={false}
        framed={!standalone}
        contentAlign="center"
        secondaryAction={null}
        primaryAction={{
          label: 'Close',
          variant: 'black',
          disabled: pendingPrimaryAction === 'submit-primary',
          success: pendingPrimaryAction === 'submit-primary',
          successLabel: 'Close',
          successIcon: loadingSuccessIcon,
          onClick: () => triggerPrimaryAction({
            key: 'submit-primary',
            run: onOpenLibrary,
          }),
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-sunken via-surface to-brand-subtle">
      {standalone ? (
        <header className="border-b border-border bg-surface">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-4">
            <a href="https://raptive.com/community/creators/" aria-label="Raptive Community">
              <BrandLogo size="md" />
            </a>
          </div>
        </header>
      ) : null}
      <main className="mx-auto max-w-6xl px-6 py-4">
        <div className="mb-4 flex justify-end">
          <Button size="sm" variant="ghost" onClick={onOpenLibrary}>Component library</Button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStepId}
            {...stepMotionProps}
            className="will-change-transform"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
