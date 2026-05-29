import { useReducedMotion } from 'motion/react'
import submissionIllustrationUrl from '../../assets/submission-illustration.png'
import { Button } from '../../components/Button/Button.jsx'

export function SubmissionSuccess({
  title,
  description,
  progressMeter = null,
  summary = null,
  timeline = [],
  showAside = true,
  footerContent = null,
  primaryAction = { label: 'View creator dashboard' },
  secondaryAction = { label: 'Back to library', variant: 'ghost' },
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
        <div className="flex h-full flex-col bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter && (
              <div className="[&_.text-text-secondary]:!text-white/84 [&_.text-text-tertiary]:!text-white/72 [&_.bg-surface-sunken]:bg-white/10">
                {progressMeter}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="max-w-2xl font-newsreader text-hero font-normal text-white">
                  {title}
                </h2>
                {description && (
                  <p className="max-w-2xl text-base leading-relaxed text-white/84">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {summary && (
              <div className="max-w-2xl">
                <p className="text-base leading-relaxed text-white">{summary}</p>
              </div>
            )}

            {timeline.length > 0 && (
              <div className="max-w-2xl space-y-3">
                {timeline.map((item) => (
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
                          item.current && !shouldReduceMotion ? 'submission-status-dot-pulse' : '',
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
            )}
          </div>

          <div className="mt-auto space-y-4 pt-8">
            {footerContent && (
              <div className="ml-auto max-w-2xl">
                {footerContent}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              {secondaryAction && (
                <Button
                  size="lg"
                  variant={secondaryAction.variant ?? 'ghost'}
                  onClick={secondaryAction.onClick}
                  className={
                    secondaryAction.variant === 'secondary'
                      ? '!border-white/16 !bg-transparent !text-white hover:!bg-white/8'
                      : '!text-white hover:!bg-white/10'
                  }
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  size="lg"
                  variant={primaryAction.variant ?? 'primary'}
                  onClick={primaryAction.onClick}
                  disabled={primaryAction.disabled}
                  success={primaryAction.success}
                  successLabel={primaryAction.successLabel}
                  successIcon={primaryAction.successIcon}
                  className={
                    [
                      !secondaryAction ? 'ml-auto' : '',
                      primaryAction.variant === 'black' && !primaryAction.disabled
                      ? '!border !border-white/12 !bg-neutral-950 !text-white hover:!bg-neutral-900'
                      : '',
                    ].filter(Boolean).join(' ')
                  }
                >
                  {primaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </div>

        <aside className={['border-t border-neutral-800 lg:border-l lg:border-t-0', showAside ? 'bg-neutral-900 p-8 lg:p-10' : 'bg-black/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-5' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-xl border border-white/10 bg-neutral-950 shadow-xs' : 'relative h-full'].join(' ')}>
              {/* no token available: full-height illustration mock uses a fixed desktop minimum. */}
              <div className={['relative', showAside ? 'aspect-[16/9]' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={submissionIllustrationUrl}
                  alt="Completion illustration for the creator application submission success step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-white/10 bg-neutral-950 px-4 py-3' : 'hidden'}>
                <p className={showAside ? 'text-sm leading-relaxed text-white/68' : 'hidden'}>
                  A memorable closing visual that makes the final state feel exclusive and worth the wait.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
