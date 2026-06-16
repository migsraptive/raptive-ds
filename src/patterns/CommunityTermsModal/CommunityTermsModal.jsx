import { useEffect, useId, useState } from 'react'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'

const communityTermsSections = [
  {
    title: 'Community participation',
    copy: 'Raptive Communities are shared spaces for creators and their audiences. You agree to keep your community activity respectful, lawful, and aligned with the creator identity submitted in this application.',
  },
  {
    title: 'Creator ownership',
    copy: 'You confirm that you control the creator account or domain used for verification and that the information submitted here is accurate enough for Raptive to review community eligibility.',
  },
  {
    title: 'Review and communication',
    copy: 'Submitting this application lets Raptive review your community fit and contact you about setup, approval, launch timing, product updates, and related support.',
  },
]

export function CommunityTermsModal({
  isOpen = false,
  onAccept,
  onDismiss,
  presentation = 'desktop',
}) {
  const titleId = useId()
  const [reviewConfirmed, setReviewConfirmed] = useState(false)
  const isMobile = presentation === 'mobile'

  useEffect(() => {
    if (isOpen) {
      setReviewConfirmed(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    const handler = (event) => {
      if (event.key === 'Escape') {
        onDismiss?.()
      }
    }

    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onDismiss])

  if (!isOpen) return null

  const handleAccept = () => {
    onAccept?.()
    onDismiss?.()
  }

  const overlayClassName = isMobile
    ? 'absolute inset-0 z-50 flex items-end bg-neutral-950/70 p-3 backdrop-blur-sm'
    : 'fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm'
  const dialogClassName = isMobile
    ? 'flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl'
    : 'flex max-h-screen w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl'
  const headerClassName = isMobile
    ? 'border-b border-border bg-surface-raised px-4 py-4'
    : 'border-b border-border bg-surface-raised px-6 py-5'
  const titleClassName = isMobile
    ? 'mt-2 font-newsreader text-2xl font-normal leading-tight text-text'
    : 'mt-2 font-newsreader text-3xl font-normal leading-tight text-text'
  const contentClassName = isMobile
    ? 'min-h-0 flex-1 overflow-y-auto px-4 py-4'
    : 'min-h-0 flex-1 overflow-y-auto px-6 py-5'
  const sectionClassName = isMobile
    ? 'rounded-xl border border-border bg-surface-raised p-3'
    : 'rounded-xl border border-border bg-surface-raised p-4'
  const footerClassName = isMobile
    ? 'space-y-4 border-t border-border bg-surface px-4 py-4'
    : 'space-y-4 border-t border-border bg-surface px-6 py-5'
  const actionsClassName = isMobile
    ? 'grid gap-2'
    : 'flex flex-wrap justify-end gap-2'

  return (
    <div
      className={overlayClassName}
      role="presentation"
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          onDismiss?.()
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={dialogClassName}
      >
        <div className={headerClassName}>
          <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Required review</p>
          <h2 id={titleId} className={titleClassName}>
            Raptive’s Creator Agreement
          </h2>
        </div>

        <div className={contentClassName}>
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-text-secondary">
              Review the terms below before submitting your creator application. You can return to verification after agreeing.
            </p>

            <div className="space-y-4">
              {communityTermsSections.map((section) => (
                <section key={section.title} className={sectionClassName}>
                  <h3 className="text-sm font-semibold text-text">{section.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{section.copy}</p>
                </section>
              ))}
            </div>
          </div>
        </div>

        <div className={footerClassName}>
          <Checkbox
            checked={reviewConfirmed}
            onChange={(event) => setReviewConfirmed(event.target.checked)}
            variant="plain"
            label="I have read and accept Raptive’s Creator Agreement"
            description="This agreement is required before the application can be submitted."
          />
          <div className={actionsClassName}>
            <Button variant="ghost" onClick={onDismiss} fullWidth={isMobile}>
              Back to verification
            </Button>
            <Button onClick={handleAccept} disabled={!reviewConfirmed} fullWidth={isMobile}>
              Agree and continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
