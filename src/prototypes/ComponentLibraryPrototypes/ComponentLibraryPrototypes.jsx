import { useState } from 'react'
import { BadgeCheck, LoaderCircle, Mail, Rocket, ShieldCheck } from 'lucide-react'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { MobileOnboardingFlow } from '../../patterns/MobileOnboardingFlow/MobileOnboardingFlow.jsx'
import { CreatorOnboardingViewportDemo } from '../../patterns/CreatorOnboardingViewportDemo/CreatorOnboardingViewportDemo.jsx'
import { DataGatheringWonderSequence } from '../../patterns/DataGatheringWonderSequence/DataGatheringWonderSequence.jsx'
import { ProjectionMotionShowcase } from '../../patterns/ProjectionMotionShowcase/ProjectionMotionShowcase.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'

function Section({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div className="space-y-0.5 border-b border-border pb-3">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        {description ? <p className="text-sm text-text-secondary">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

function DocumentationNote({ children }) {
  return (
    <aside className="rounded-xl border border-border bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-text-secondary">
      {children}
    </aside>
  )
}

const tileIcon = (Icon) => <LucideIcon icon={Icon} size="lg" stroke="display" />
const miniIcon = (Icon) => <LucideIcon icon={Icon} size="sm" />
const loadingSuccessIcon = <LucideIcon icon={LoaderCircle} size="md" stroke="standard" className="animate-spin" />
const emailAddressPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

export default function ComponentLibraryPrototypes({
  previewPatternCtaSuccess,
  onPreviewPatternCtaSuccessChange,
  verificationMethod,
  onVerificationMethodChange,
  verificationTermsAccepted,
  onVerificationTermsAcceptedChange,
}) {
  const [verificationEmail, setVerificationEmail] = useState('')
  const verificationEmailIsReady = emailAddressPattern.test(verificationEmail.trim())

  return (
    <>
      <div className="rounded-xl border border-border bg-surface px-4 py-3 shadow-xs">
        <Checkbox
          variant="plain"
          label="Preview prototype CTA success labels"
          description="Forces prototype CTAs into their success state so transition copy can be reviewed in place."
          checked={previewPatternCtaSuccess}
          onChange={(event) => onPreviewPatternCtaSuccessChange(event.target.checked)}
        />
      </div>

      <Section title="Mobile Creator Onboarding Flow" description="Handset-first preview of the creator application onboarding story.">
        <MobileOnboardingFlow forceSuccess={previewPatternCtaSuccess} />
      </Section>

      <DocumentationNote>
        Mobile onboarding keeps the same behavior as the desktop flow: URL intake, fetched creator confirmation, preview editing, ownership verification, and submission. The layout changes to stacked content, a compact handset header, and bottom actions.
      </DocumentationNote>

      <Section title="Creator Onboarding Viewport Direction" description="Exploration of the desktop onboarding as a full-height viewport instead of a modal-like container. Existing onboarding remains unchanged.">
        <CreatorOnboardingViewportDemo showStandaloneLink />
      </Section>

      <Section title="Data Gathering Wonder Sequence" description="Standalone prototype for the data gathering review into fetch confirmation transition. Not wired into onboarding.">
        <DataGatheringWonderSequence previewCtaSuccess={previewPatternCtaSuccess} />
      </Section>

      {[
        {
          title: 'Submission Success: Cursor Burst Review',
          description: 'Design review duplicate for checking cursor-burst celebration with the submission timeline.',
        },
        {
          title: 'Submission Success: Cursor Burst Interaction',
          description: 'Interaction review for the shared cursor-burst completion background.',
        },
      ].map((prototype) => (
        <Section key={prototype.title} title={prototype.title} description={prototype.description}>
          <SubmissionSuccess
            title="You’re on the list. We’ll take it from here."
            summary="We’ll review the setup across brand, audience, and community fit. If there’s a match, our team will reach out with next steps."
            timeline={submissionSuccessTimeline}
            showAside={false}
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
      ))}

      <Section
        title="Projection Motion Lab"
        description="Exploration area for animated data storytelling patterns before they are introduced into creator onboarding flows."
      >
        <ProjectionMotionShowcase />
      </Section>

      <Section
        title="Verification Expansion"
        description="Exploration area for the verification step where Meta login is primary and email submission is available when Meta is not convenient."
      >
        <VerificationStep
          title="One last check to know it's really you."
          description="Use Meta to verify your Instagram account, or submit with an email address to wrap up your application."
          methods={[
            {
              value: 'meta-login',
              icon: tileIcon(BadgeCheck),
              title: 'Login with Meta to verify your Instagram account',
              description: 'Use Login with Meta to verify @culturecrave without a manual message.',
              actionLabel: 'Continue with Facebook',
              actionBrand: 'facebook',
              pendingLabel: 'Opening Meta...',
              successTitle: 'Your Instagram account has been verified.',
              successDescription: "You're all set!",
              modalBrand: 'Instagram',
              modalTitle: 'You previously connected community_verify-IG to your instagram account.',
              modalPrompt: 'Would you like to continue sharing information about @culturecrave to community_verify-IG?',
              modalDescription: 'By allowing, community_verify-IG will receive ongoing access to your information and Instagram will record when community_verify-IG accesses it. Learn More about this sharing and the settings you have. community_verify-IG Privacy Policy.',
            },
            {
              value: 'email-domain',
              icon: tileIcon(Mail),
              title: 'Submit with an email address',
              description: 'Enter the email address you want us to use for this application.',
              inlineCompletion: true,
              hideAction: true,
              isComplete: verificationEmailIsReady,
              input: {
                id: 'prototype-verification-email',
                type: 'email',
                placeholder: 'you@example.com',
                value: verificationEmail,
                onChange: (event) => {
                  setVerificationEmail(event.target.value)
                  onVerificationMethodChange('email-domain')
                },
              },
            },
          ]}
          completedMethod={verificationMethod}
          onSelectMethod={onVerificationMethodChange}
          termsAccepted={verificationTermsAccepted}
          onTermsAcceptedChange={onVerificationTermsAcceptedChange}
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
          secondaryAction={{ label: 'Back to preview', variant: 'secondary' }}
          primaryAction={{
            label: 'Continue',
            successLabel: 'Submitting...',
            successIcon: loadingSuccessIcon,
          }}
        />
      </Section>
    </>
  )
}
