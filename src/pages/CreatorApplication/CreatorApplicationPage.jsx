import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, Check, Eye, Mail, Rocket, Search, Send, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import wonderVideoUrl from '../../assets/data-gathering-wonder.mp4'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { getDetectedSocialAccountHelperText } from '../../components/SocialUrlInput/SocialUrlInput.jsx'
import { CompactWysiwygStudio } from '../../patterns/CompactWysiwygStudio/CompactWysiwygStudio.jsx'
import { DataGatheringReview } from '../../patterns/DataGatheringReview/DataGatheringReview.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'

const flowStepIds = ['entry', 'gather', 'review', 'verify', 'submit']

const initialCreatorUrl = ''
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

export function CreatorApplicationPage({ onOpenLibrary }) {
  const [activeStep, setActiveStep] = useState(0)
  const [creatorUrl, setCreatorUrl] = useState(initialCreatorUrl)
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState(null)
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [fetchAccounts, setFetchAccounts] = useState(getInitialAccounts)
  const [gatherRowsResolved, setGatherRowsResolved] = useState(false)
  const [pendingPrimaryAction, setPendingPrimaryAction] = useState(null)
  const actionTimeoutRef = useRef(null)
  const instagramAccount = initialAccounts.find((account) => account.platform === 'Instagram')
  const verificationMethods = useMemo(() => [
    ...(instagramAccount ? [{
      value: 'instagram-dm',
      icon: <LucideIcon icon={Mail} size="lg" stroke="display" />,
      title: 'Confirm with an Instagram DM',
      description: 'We’ll send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long. Just DM code to @raptive_community from @culturecrave.',
    }] : []),
    {
      value: 'email-domain',
      icon: <LucideIcon icon={BadgeCheck} size="lg" stroke="display" />,
      title: 'Confirm with a creator email',
      description: 'Use a domain-linked creator email for a faster verification path when direct social access is not convenient.',
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
      setVerificationMethod(null)
      setVerificationConfirmed(false)
    }
  }, [verificationMethod, verificationMethods])

  const activeStepId = flowStepIds[activeStep] ?? 'current-step'
  const progressMeter = null

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
    const existingAccountIds = new Set(fetchAccounts.map((account) => account.id))
    const nextDetectedAccount = initialAccounts.find((account) => !existingAccountIds.has(account.id))

    if (nextDetectedAccount) {
      setFetchAccounts((current) => [...current, { ...nextDetectedAccount }])
    }
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
    setVerificationMethod(null)
    setVerificationConfirmed(false)
    setActiveStep(0)
  }

  let content = null

  if (activeStep === 0) {
    content = (
      <SingleFieldIntake
        title="Where do your fans live?"
        description="Paste a link to where we can find your fans: your main social account or website. We’ll do the rest!"
        value={creatorUrl}
        onChange={(event) => setCreatorUrl(event.target.value)}
        onSubmit={handleIntakeSubmit}
        progressMeter={progressMeter}
        loading={intakeLoading}
        helperText={getDetectedSocialAccountHelperText(creatorUrl)}
        ctaLabel="Continue"
        ctaSuccessLabel="Pulling data"
        ctaSuccessIcon={<LucideIcon icon={Search} size="md" stroke="standard" />}
        ctaDisabled={!creatorUrl.trim()}
        showAside={false}
      />
    )
  }

  if (activeStep === 1) {
    content = (
      <DataGatheringReview
        title={gatherRowsResolved ? 'Take a look at what we found.' : 'We’re finding your fandom'}
        description={gatherRowsResolved
          ? 'Confirm the creator profile before we use it to shape the first community preview.'
          : 'Give us a moment while we pull some details.'}
        detectedSource={getDetectedSourceLabel(creatorUrl)}
        submittedSourceValue={creatorUrl}
        progressMeter={progressMeter}
        rowRevealDelay={gatherVideoLeadInMs}
        headerClassName="pt-6"
        rowPresentation="accordion"
        aside={<GatherVideoAside />}
        socialAccounts={fetchAccounts}
        onSocialAccountChange={updateFetchAccount}
        onAddSocialAccount={addFetchAccount}
        onRemoveSocialAccount={removeFetchAccount}
        onResolvedChange={setGatherRowsResolved}
        secondaryAction={{ label: 'Start over', variant: 'ghost', onClick: resetApplicationFlow }}
        primaryAction={{
          label: gatherRowsResolved ? 'Looks right' : 'Continue',
          disabled: !gatherRowsResolved || pendingPrimaryAction === 'gather-primary',
          success: pendingPrimaryAction === 'gather-primary',
          successLabel: 'Sneak peaking...',
          successIcon: <LucideIcon icon={Eye} size="md" stroke="standard" />,
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
      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}
            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="max-w-2xl font-newsreader text-hero font-normal text-text">
                  We used your brand to jumpstart your community. How does it look?
                </h2>
                <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                  Pick your community name carefully. You can adjust the brand color below and see how it feels.
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
                successIcon: <LucideIcon icon={BadgeCheck} size="md" stroke="standard" />,
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
        title="One last check to know it's really you."
        description="Complete verification for one of your channels to wrap up your application."
        methods={verificationMethods}
        selectedMethod={verificationMethod}
        onSelectMethod={handleVerificationMethodChange}
        progressMeter={progressMeter}
        confirmed={verificationConfirmed}
        onConfirmChange={setVerificationConfirmed}
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
        instagramDmDetail={{
          code: 'CULTURE-453',
          destinationHandle: '@raptive_community',
          originHandle: instagramAccount?.handle ?? '@culturecrave',
        }}
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
          successIcon: <LucideIcon icon={Send} size="md" stroke="standard" />,
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
        summary="Hold application ID CULTURE-453 for reference. We’ll review the setup across brand, audience, and community fit. If there’s a match, our team may reach out with next steps."
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
            description: 'If there’s a fit, we may reach out with next steps.',
          },
          {
            step: 'live',
            title: 'Live',
            description: 'When you’re ready.',
          },
        ]}
        showAside={false}
        secondaryAction={null}
        primaryAction={{
          label: 'Start new application',
          variant: 'black',
          disabled: pendingPrimaryAction === 'submit-primary',
          success: pendingPrimaryAction === 'submit-primary',
          successLabel: "Let's begin...",
          successIcon: <LucideIcon icon={Check} size="md" stroke="standard" />,
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
      <main className="mx-auto max-w-6xl px-6 py-4">
        <div className="mb-4 flex justify-end">
          <Button size="sm" variant="ghost" onClick={onOpenLibrary}>Component library</Button>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeStepId}
            initial={{ opacity: 0, y: 16, scale: 0.996, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.996, filter: 'blur(3px)' }}
            transition={stepTransition}
            className="will-change-transform"
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
