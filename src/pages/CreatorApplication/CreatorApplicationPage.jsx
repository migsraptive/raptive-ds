import { useEffect, useMemo, useState } from 'react'
import { BadgeCheck, Mail, Rocket, ShieldCheck } from 'lucide-react'
import { Badge } from '../../components/Badge/Badge.jsx'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { CommunityPreviewCard } from '../../patterns/CommunityPreviewCard/CommunityPreviewCard.jsx'
import { FetchConfirmation } from '../../patterns/FetchConfirmation/FetchConfirmation.jsx'
import { ReviewCorrection } from '../../patterns/ReviewCorrection/ReviewCorrection.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'

const flowSteps = [
  { id: 'entry', label: 'Entry' },
  { id: 'fetch', label: 'Fetch' },
  { id: 'review', label: 'Review' },
  { id: 'preview', label: 'Preview' },
  { id: 'verify', label: 'Verify' },
  { id: 'submit', label: 'Submit' },
]

function FlowProgressMeter({ label, progress }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-surface-sunken">
        <div
          className="h-full rounded-full bg-brand transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export function CreatorApplicationPage({ onOpenLibrary }) {
  const [activeStep, setActiveStep] = useState(0)
  const [creatorUrl, setCreatorUrl] = useState('https://instagram.com/juliachild')
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [recognitionLoading, setRecognitionLoading] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState('instagram-dm')
  const [verificationConfirmed, setVerificationConfirmed] = useState(true)
  const [reviewFields, setReviewFields] = useState({
    name: 'Julia Child',
    url: 'instagram.com/juliachild',
    vertical: 'food',
    audience: 'Community-led',
    summary: 'Food creator and community builder helping families cook smarter and gather more often.',
  })
  const [estimatedReach] = useState({
    value: '526K',
    detail: '526,000 combined followers',
  })
  const [newsletter, setNewsletter] = useState('ConvertKit')
  const [accounts, setAccounts] = useState([
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
  ])
  const [editingField, setEditingField] = useState(null)
  const [editDraft, setEditDraft] = useState('')

  useEffect(() => {
    if (!recognitionLoading) return undefined

    const timeoutId = window.setTimeout(() => {
      setRecognitionLoading(false)
    }, 1100)

    return () => window.clearTimeout(timeoutId)
  }, [recognitionLoading])

  const progress = useMemo(
    () => Math.round(((activeStep + 1) / flowSteps.length) * 100),
    [activeStep],
  )
  const currentStepLabel = flowSteps[activeStep]?.label ?? 'Current stage'
  const progressMeter = (
    <FlowProgressMeter label={currentStepLabel} progress={progress} />
  )

  const updateReviewField = (key, value) => {
    setReviewFields((current) => ({ ...current, [key]: value }))
  }

  const handleIntakeSubmit = () => {
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
    } else if (editingField === 'newsletter') {
      setNewsletter(editDraft)
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
        showAside={false}
        trustPoints={[
          {
            title: 'Recognition first',
            description: 'The first response should feel intelligent, not administrative.',
          },
          {
            title: 'Reviewable output',
            description: 'Every fetched detail can be corrected before commitment.',
          },
          {
            title: 'Exclusive finish',
            description: 'The final submit should feel intentional and worth the wait.',
          },
        ]}
      />
    )
  }

  if (activeStep === 1) {
    content = (
      <FetchConfirmation
        loading={recognitionLoading}
        progressMeter={progressMeter}
        creator={{
          name: reviewFields.name,
          reach: estimatedReach.value,
          reachDetail: estimatedReach.detail,
        }}
        website={reviewFields.url}
        newsletter={newsletter}
        accounts={accounts}
        editingField={editingField}
        editDraft={editDraft}
        onEditDraftChange={setEditDraft}
        onStartEditing={startEditing}
        onCancelEditing={cancelEditing}
        onSaveEditing={saveEditing}
        onRemoveAccount={removeAccount}
        secondaryAction={{
          label: 'Needs edits',
          variant: 'ghost',
          onClick: () => setActiveStep(2),
        }}
        primaryAction={{
          label: recognitionLoading ? 'Fetching…' : 'Looks right',
          onClick: recognitionLoading ? undefined : () => setActiveStep(2),
        }}
      />
    )
  }

  if (activeStep === 2) {
    content = (
      <ReviewCorrection
        progressMeter={progressMeter}
        title="Make any corrections before we build the preview."
        description="This should feel like refining a strong starting point, not filling out a form from scratch."
        fields={reviewFields}
        onFieldChange={updateReviewField}
        note="If this step feels bureaucratic, the recognition stage failed to earn trust."
        showAside={false}
        secondaryAction={{ label: 'Back', variant: 'ghost', onClick: () => setActiveStep(1) }}
        primaryAction={{ label: 'Continue to preview', onClick: () => setActiveStep(3) }}
      />
    )
  }

  if (activeStep === 3) {
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
        secondaryAction={{ label: 'Back to edits', variant: 'ghost', onClick: () => setActiveStep(2) }}
        primaryAction={{ label: 'Continue to verification', onClick: () => setActiveStep(4) }}
      />
    )
  }

  if (activeStep === 4) {
    content = (
      <VerificationStep
        progressMeter={progressMeter}
        title="One last check so we know this request is really coming from the creator."
        description="Keep verification short and legible. This is the handshake that turns excitement into commitment."
        methods={[
          {
            value: 'instagram-dm',
            icon: <LucideIcon icon={Mail} size="lg" stroke="display" />,
            title: 'Confirm with an Instagram DM',
            description: 'We send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long.',
          },
        ]}
        selectedMethod={verificationMethod}
        onSelectMethod={setVerificationMethod}
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
        secondaryAction={{ label: 'Back to preview', variant: 'ghost', onClick: () => setActiveStep(3) }}
        primaryAction={{ label: 'Confirm and submit', onClick: () => setActiveStep(5) }}
      />
    )
  }

  if (activeStep === 5) {
    content = (
      <SubmissionSuccess
        progressMeter={progressMeter}
        title="You’re on the list. We’ll take it from here."
        description="The request is in, the creator identity is confirmed, and the final screen should feel worth the wait rather than procedural."
        highlights={[
          {
            value: 'Submitted',
            label: 'Application status',
            help: 'The creator request has been received and routed for review.',
          },
          {
            value: '< 24h',
            label: 'Expected follow-up',
            help: 'Fast confirmation keeps the ending sharp instead of vague.',
          },
          {
            value: 'Warm',
            label: 'Momentum',
            help: 'The closing copy should preserve the confidence built in preview and verification.',
          },
        ]}
        timeline={[
          {
            step: '1',
            title: 'Confirmation lands first',
            description: 'A short follow-up confirms the creator request is officially in motion.',
          },
          {
            step: '2',
            title: 'Team review stays invisible',
            description: 'Internal evaluation happens behind the scenes so the user does not have to think about operations.',
          },
          {
            step: '3',
            title: 'Decision arrives with context',
            description: 'The eventual response should feel curated and deliberate, not auto-generated.',
          },
        ]}
        showAside={false}
        secondaryAction={{ label: 'Start over', variant: 'ghost', onClick: () => setActiveStep(0) }}
        primaryAction={{ label: 'Open library', onClick: onOpenLibrary }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-sunken via-surface to-brand-subtle">
      <header className="border-b border-border/80 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <BrandLogo size="lg" />
              <Badge variant="outline" size="sm">Desktop First</Badge>
            </div>
            <p className="text-sm text-text-secondary">
              Creator application flow: entry, fetch, review, preview, verify, submit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button size="lg" variant="ghost" onClick={onOpenLibrary}>Component library</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 rounded-[28px] border border-border bg-surface/80 p-5 shadow-xs backdrop-blur">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Flow progress</p>
            <div className="flex flex-wrap gap-2">
              {flowSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={[
                    'rounded-full border px-3 py-1.5 text-sm transition-colors',
                    index === activeStep
                      ? 'border-brand bg-brand-subtle text-brand-dark'
                      : index < activeStep
                        ? 'border-border bg-surface-raised text-text'
                        : 'border-border bg-surface text-text-secondary',
                  ].join(' ')}
                >
                  {String(index + 1).padStart(2, '0')} {step.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {content}
      </main>
    </div>
  )
}
