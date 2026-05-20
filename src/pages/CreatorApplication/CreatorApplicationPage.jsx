import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, Mail, Rocket, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { CommunityPreviewCard } from '../../patterns/CommunityPreviewCard/CommunityPreviewCard.jsx'
import { DataGatheringLoader } from '../../patterns/DataGatheringLoader/DataGatheringLoader.jsx'
import { FetchConfirmation } from '../../patterns/FetchConfirmation/FetchConfirmation.jsx'
import { ReviewCorrection } from '../../patterns/ReviewCorrection/ReviewCorrection.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'
import { brandPreviewPalette } from '../../utils/brandPreviewDefaults.js'

const flowSteps = [
  { id: 'entry', label: 'Entry' },
  { id: 'gather', label: 'Gather' },
  { id: 'fetch', label: 'Fetch' },
  { id: 'review', label: 'Review' },
  { id: 'preview', label: 'Preview' },
  { id: 'verify', label: 'Verify' },
  { id: 'submit', label: 'Submit' },
]

const initialCreatorUrl = 'https://instagram.com/juliachild'
const initialReviewFields = {
  name: 'Julia Child',
  url: 'instagram.com/juliachild',
  vertical: 'food',
  audience: 'Community-led',
  summary: 'Food creator and community builder helping families cook smarter and gather more often.',
}
const initialAccounts = [
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
]

function currentStepChipLabel(activeStep, recognitionLoading) {
  if (activeStep === 0) return 'Creator Application'
  if (activeStep === 1) return 'Gathering signals'
  if (activeStep === 2) return recognitionLoading ? 'Fetching identity' : 'Confirm details'
  if (activeStep === 3) return 'Review'
  if (activeStep === 4) return 'Preview'
  if (activeStep === 5) return 'Verify'
  if (activeStep === 6) return 'Submit'
  return 'Current stage'
}

function currentStepChipVariant() {
  return 'brand'
}

const stepTransition = {
  duration: 0.32,
  ease: [0.2, 0.9, 0.3, 1],
}

const stepSpring = {
  type: 'spring',
  stiffness: 260,
  damping: 26,
}

function FlowProgressMeter({
  label,
  variant,
  progress,
  loading = false,
  trackColor = null,
  fillColor = null,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Badge variant={variant} size="sm">{label}</Badge>
        <span className="text-sm text-text-secondary">{progress}%</span>
      </div>
      <div
        className={trackColor ? 'h-2 rounded-full' : 'h-2 rounded-full bg-surface-sunken'}
        style={trackColor ? { backgroundColor: trackColor } : undefined}
      >
        {loading ? (
          <div className="relative h-full overflow-hidden rounded-full">
            <motion.div
              className={fillColor ? 'absolute inset-y-0 rounded-full' : 'absolute inset-y-0 rounded-full bg-brand'}
              style={fillColor ? { backgroundColor: fillColor, width: '42%' } : { width: '42%' }}
              initial={{ x: '-58%' }}
              animate={{ x: ['-58%', '138%'] }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        ) : (
          <motion.div
            className={fillColor ? 'h-full rounded-full transition-[width] duration-300' : 'h-full rounded-full bg-brand transition-[width] duration-300'}
            style={fillColor ? { backgroundColor: fillColor } : undefined}
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={stepSpring}
          />
        )}
      </div>
    </div>
  )
}

export function CreatorApplicationPage({ onOpenLibrary }) {
  const [activeStep, setActiveStep] = useState(0)
  const [creatorUrl, setCreatorUrl] = useState(initialCreatorUrl)
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [recognitionLoading, setRecognitionLoading] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState(null)
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [pendingPrimaryAction, setPendingPrimaryAction] = useState(null)
  const [reviewFields, setReviewFields] = useState(initialReviewFields)
  const [estimatedReach] = useState({
    value: '526K',
    detail: '526,000 combined followers',
  })
  const [accounts, setAccounts] = useState(initialAccounts)
  const [editingField, setEditingField] = useState(null)
  const [editDraft, setEditDraft] = useState('')
  const actionTimeoutRef = useRef(null)
  const hasSocialAccounts = accounts.length > 0
  const instagramAccount = accounts.find((account) => account.platform === 'Instagram')
  const verificationMethods = useMemo(() => [
    ...(instagramAccount ? [{
      value: 'instagram-dm',
      icon: <LucideIcon icon={Mail} size="lg" stroke="display" />,
      title: 'Confirm with an Instagram DM',
      description: 'We’ll send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long. Just DM code to @raptive_community from @juliachild.',
    }] : []),
    {
      value: 'email-domain',
      icon: <LucideIcon icon={BadgeCheck} size="lg" stroke="display" />,
      title: 'Confirm with a creator email',
      description: 'Use a domain-linked creator email for a faster verification path when direct social access is not convenient.',
    },
  ], [instagramAccount])

  useEffect(() => {
    if (!recognitionLoading) return undefined

    const timeoutId = window.setTimeout(() => {
      setRecognitionLoading(false)
    }, 1100)

    return () => window.clearTimeout(timeoutId)
  }, [recognitionLoading])

  useEffect(() => (
    () => {
      if (actionTimeoutRef.current) {
        window.clearTimeout(actionTimeoutRef.current)
      }
    }
  ), [])

  useEffect(() => {
    if (activeStep !== 1) return undefined

    const timeoutId = window.setTimeout(() => {
      setActiveStep(2)
    }, 5000)

    return () => window.clearTimeout(timeoutId)
  }, [activeStep])

  useEffect(() => {
    if (verificationMethod && !verificationMethods.some((method) => method.value === verificationMethod)) {
      setVerificationMethod(null)
      setVerificationConfirmed(false)
    }
  }, [verificationMethod, verificationMethods])

  const progress = useMemo(
    () => Math.round(((activeStep + 1) / flowSteps.length) * 100),
    [activeStep],
  )
  const currentStepLabel = currentStepChipLabel(activeStep, recognitionLoading)
  const currentStepVariant = currentStepChipVariant()
  const activeStepId = flowSteps[activeStep]?.id ?? 'current-step'
  const progressMeter = (
    <FlowProgressMeter
      label={currentStepLabel}
      variant={currentStepVariant}
      progress={progress}
      loading={activeStep === 1}
    />
  )

  const updateReviewField = (key, value) => {
    setReviewFields((current) => ({ ...current, [key]: value }))
  }

  const handleIntakeSubmit = () => {
    if (intakeLoading || !creatorUrl.trim()) return

    setIntakeLoading(true)

    window.setTimeout(() => {
      setIntakeLoading(false)
      setRecognitionLoading(true)
      setActiveStep(1)
    }, 800)
  }

  const startEditing = (field, value) => {
    setEditingField(field)
    setEditDraft(value)
  }

  const cancelEditing = () => {
    setEditingField(null)
    setEditDraft('')
  }

  const saveEditing = () => {
    if (!editingField) return

    if (editingField === 'website') {
      updateReviewField('url', editDraft)
    } else {
      setAccounts((current) =>
        current.map((account) => (account.id === editingField ? { ...editDraft } : account)),
      )
    }

    cancelEditing()
  }

  const removeAccount = (accountId) => {
    setAccounts((current) => current.filter((account) => account.id !== accountId))
    if (editingField === accountId) {
      cancelEditing()
    }
  }

  const addAccount = () => {
    const nextId = `manual-${Date.now()}`
    const nextAccount = {
      id: nextId,
      platform: 'Instagram',
      handle: '@newhandle',
      url: 'https://instagram.com/newhandle',
      followers: 'Follower count pending',
    }

    setAccounts((current) => [...current, nextAccount])
    setEditingField(nextId)
    setEditDraft(nextAccount)
  }

  const handleVerificationMethodChange = (value) => {
    setVerificationMethod(value)
    setVerificationConfirmed(false)
  }

  const handleVerificationContinue = () => {
    setActiveStep(6)
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
    setRecognitionLoading(false)
    setCreatorUrl(initialCreatorUrl)
    setReviewFields(initialReviewFields)
    setAccounts(initialAccounts)
    setEditingField(null)
    setEditDraft('')
    setVerificationMethod(null)
    setVerificationConfirmed(false)
    setActiveStep(0)
  }

  let content = null

  if (activeStep === 0) {
    content = (
      <SingleFieldIntake
        progressMeter={progressMeter}
        title="Bring a creator into the application flow with one confident move."
        description="Paste a creator URL or social handle. We’ll recognize the profile, fetch the first identity signals, and show a preview before anything gets submitted."
        value={creatorUrl}
        onChange={(event) => setCreatorUrl(event.target.value)}
        onSubmit={handleIntakeSubmit}
        loading={intakeLoading}
        helperText="No long application form up front."
        ctaLabel="Continue"
        ctaSuccessLabel="Starting now"
        ctaDisabled={!creatorUrl.trim()}
        showAside={false}
      />
    )
  }

  if (activeStep === 1) {
    content = (
      <DataGatheringLoader
        progressMeter={progressMeter}
        creatorUrl={creatorUrl}
        secondaryAction={{ label: 'Back', variant: 'ghost', onClick: () => setActiveStep(0) }}
      />
    )
  }

  if (activeStep === 2) {
    content = (
      <FetchConfirmation
        loading={false}
        progressMeter={progressMeter}
        creator={{
          name: reviewFields.name,
          reach: estimatedReach.value,
          reachDetail: estimatedReach.detail,
        }}
        website={reviewFields.url}
        accounts={accounts}
        editingField={editingField}
        editDraft={editDraft}
        onEditDraftChange={setEditDraft}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
        onSaveEditing={saveEditing}
        onAddAccount={addAccount}
        onRemoveAccount={removeAccount}
        secondaryAction={{
          label: 'Back',
          variant: 'ghost',
          onClick: () => setActiveStep(1),
        }}
        primaryAction={{
          label: 'Looks right',
          disabled: !hasSocialAccounts || pendingPrimaryAction === 'fetch-primary',
          success: pendingPrimaryAction === 'fetch-primary',
          successLabel: 'Nice match',
          onClick: () => triggerPrimaryAction({
            key: 'fetch-primary',
            run: () => setActiveStep(3),
          }),
        }}
      />
    )
  }

  if (activeStep === 3) {
    content = (
      <ReviewCorrection
        progressMeter={progressMeter}
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
        secondaryAction={{ label: 'Back', variant: 'ghost', onClick: () => setActiveStep(2) }}
        primaryAction={{
          label: 'Continue to preview',
          disabled: pendingPrimaryAction === 'review-primary',
          success: pendingPrimaryAction === 'review-primary',
          successLabel: 'Preview next',
          onClick: () => triggerPrimaryAction({
            key: 'review-primary',
            run: () => setActiveStep(4),
          }),
        }}
      />
    )
  }

  if (activeStep === 4) {
    content = (
      <CommunityPreviewCard
        progressMeter={progressMeter}
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
            author: reviewFields.name,
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
        showAside={false}
        secondaryAction={{ label: 'Back', variant: 'ghost', onClick: () => setActiveStep(3) }}
        primaryAction={{
          label: 'Continue to verification',
          disabled: pendingPrimaryAction === 'preview-primary',
          success: pendingPrimaryAction === 'preview-primary',
          successLabel: 'Verify next',
          onClick: () => triggerPrimaryAction({
            key: 'preview-primary',
            run: () => setActiveStep(5),
          }),
        }}
      />
    )
  }

  if (activeStep === 5) {
    content = (
      <VerificationStep
        progressMeter={progressMeter}
        title="One last check so we know this request is really coming from the creator."
        description="Keep verification short and legible. This is the handshake that turns excitement into commitment."
        methods={verificationMethods}
        selectedMethod={verificationMethod}
        onSelectMethod={handleVerificationMethodChange}
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
          code: 'CHILD-453',
          destinationHandle: '@raptive_community',
          originHandle: instagramAccount?.handle ?? '@juliachild',
          confirmSentPending: pendingPrimaryAction === 'verify-dm-primary',
        }}
        onConfirmDmSent={() => triggerPrimaryAction({
          key: 'verify-dm-primary',
          run: () => setActiveStep(6),
        })}
        secondaryAction={{
          label: 'Back',
          variant: 'ghost',
          onClick: () => {
            setActiveStep(4)
          },
        }}
        primaryAction={verificationMethod === 'instagram-dm' ? null : {
          label: 'Continue',
          disabled: pendingPrimaryAction === 'verify-primary',
          success: pendingPrimaryAction === 'verify-primary',
          successLabel: 'Almost there',
          onClick: () => triggerPrimaryAction({
            key: 'verify-primary',
            run: handleVerificationContinue,
          }),
        }}
      />
    )
  }

  if (activeStep === 6) {
    content = (
      <SubmissionSuccess
        progressMeter={progressMeter}
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
        showAside={false}
        secondaryAction={{
          label: 'Start new application',
          variant: 'secondary',
          onClick: resetApplicationFlow,
        }}
        primaryAction={{
          label: 'Close',
          variant: 'black',
          disabled: pendingPrimaryAction === 'submit-primary',
          success: pendingPrimaryAction === 'submit-primary',
          successLabel: 'All set',
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
