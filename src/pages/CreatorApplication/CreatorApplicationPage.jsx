import { useEffect, useMemo, useRef, useState } from 'react'
import { BadgeCheck, Mail, Rocket, ShieldCheck } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { StepIndicator } from '../../components/StepIndicator/StepIndicator.jsx'
import { CommunityPreviewCard } from '../../patterns/CommunityPreviewCard/CommunityPreviewCard.jsx'
import { DataGatheringLoader } from '../../patterns/DataGatheringLoader/DataGatheringLoader.jsx'
import { FetchConfirmation } from '../../patterns/FetchConfirmation/FetchConfirmation.jsx'
import { ReviewCorrection } from '../../patterns/ReviewCorrection/ReviewCorrection.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'
import { brandPreviewPalette } from '../../utils/brandPreviewDefaults.js'

const flowStepIds = ['entry', 'gather', 'fetch', 'review', 'preview', 'verify', 'submit']

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

const stepTransition = {
  duration: 0.32,
  ease: [0.2, 0.9, 0.3, 1],
}

export function CreatorApplicationPage({ onOpenLibrary }) {
  const [activeStep, setActiveStep] = useState(0)
  const [creatorUrl, setCreatorUrl] = useState(initialCreatorUrl)
  const [intakeLoading, setIntakeLoading] = useState(false)
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
  const [termsAccepted, setTermsAccepted] = useState(false)
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

  const activeStepId = flowStepIds[activeStep] ?? 'current-step'
  const totalFlowSteps = flowStepIds.length
  const currentFlowStep = activeStep + 1
  const progressMeter = (
    <div className="flex justify-center">
      <StepIndicator steps={totalFlowSteps} currentStep={currentFlowStep} />
    </div>
  )

  const updateReviewField = (key, value) => {
    setReviewFields((current) => ({ ...current, [key]: value }))
  }

  const handleIntakeSubmit = () => {
    if (intakeLoading || !creatorUrl.trim()) return

    setIntakeLoading(true)

    window.setTimeout(() => {
      setIntakeLoading(false)
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
    setCreatorUrl(initialCreatorUrl)
    setReviewFields(initialReviewFields)
    setAccounts(initialAccounts)
    setEditingField(null)
    setEditDraft('')
    setTermsAccepted(false)
    setVerificationMethod(null)
    setVerificationConfirmed(false)
    setActiveStep(0)
  }

  let content = null

  if (activeStep === 0) {
    content = (
      <SingleFieldIntake
        title="Bring a creator into the application flow with one confident move."
        description="Paste a creator URL or social handle. We’ll recognize the profile, fetch the first identity signals, and show a preview before anything gets submitted."
        value={creatorUrl}
        onChange={(event) => setCreatorUrl(event.target.value)}
        onSubmit={handleIntakeSubmit}
        progressMeter={progressMeter}
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
        creatorUrl={creatorUrl}
        progressVariant="dots"
        step={currentFlowStep}
        totalSteps={totalFlowSteps}
        secondaryAction={{ label: 'Start over', variant: 'ghost', onClick: resetApplicationFlow }}
      />
    )
  }

  if (activeStep === 2) {
    content = (
      <FetchConfirmation
        loading={false}
        creator={{
          name: reviewFields.name,
          reach: estimatedReach.value,
          reachDetail: estimatedReach.detail,
        }}
        website={reviewFields.url}
        accounts={accounts}
        progressMeter={progressMeter}
        editingField={editingField}
        editDraft={editDraft}
        onEditDraftChange={setEditDraft}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
        onSaveEditing={saveEditing}
        onAddAccount={addAccount}
        onRemoveAccount={removeAccount}
        secondaryAction={{
          label: 'Start over',
          variant: 'ghost',
          onClick: resetApplicationFlow,
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
        title="Make any corrections before we build the preview."
        description="This should feel like refining a strong starting point, not filling out a form from scratch."
        fields={reviewFields}
        onFieldChange={updateReviewField}
        progressMeter={progressMeter}
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
        title="This is what the creator experience could start to look like."
        description="The preview should feel plausible, branded, and emotionally rewarding without pretending it is final."
        creator={{
          name: reviewFields.name,
          summary: reviewFields.summary,
        }}
        progressMeter={progressMeter}
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
        title="One last check so we know this request is really coming from the creator."
        description="Keep verification short and legible. This is the handshake that turns excitement into commitment."
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
        title="Ready to submit. We’ll take it from here."
        summary="Hold application ID CHILD-453 for reference. Next, we’ll review the setup across brand, audience, and community fit before making a decision. Expect a follow-up by email within 24–48 hours."
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
            description: 'In 1-2 weeks we’ll send word.',
          },
          {
            step: 'live',
            title: 'Live',
            description: 'When you’re ready.',
          },
        ]}
        showAside={false}
        footerContent={(
          <Checkbox
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
            label="I agree to the Raptive Community Terms of Service"
          />
        )}
        secondaryAction={{
          label: 'Start new application',
          variant: 'secondary',
          onClick: resetApplicationFlow,
        }}
        primaryAction={{
          label: 'Submit application',
          variant: 'black',
          disabled: !termsAccepted || pendingPrimaryAction === 'submit-primary',
          success: pendingPrimaryAction === 'submit-primary',
          successLabel: 'Submitted',
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
