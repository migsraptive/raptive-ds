import { Button } from '../../components/Button/Button.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'

export function StepLayout({
  eyebrow = null,
  title,
  description,
  titleClassName = '',
  step,
  totalSteps,
  progressMeter = null,
  aside = null,
  children,
  primaryAction = { label: 'Continue' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  const progress = step && totalSteps ? Math.min(100, Math.round((step / totalSteps) * 100)) : null
  const progressScale = progress != null ? progress / 100 : 0

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="h-1.5 bg-surface-sunken">
        {progress != null && (
          <div
            className="h-full w-full origin-left rounded-r-full bg-brand transition-transform duration-300 will-change-transform"
            style={{ transform: `scaleX(${progressScale})` }}
          />
        )}
      </div>

      <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:p-8">
        {/* no token available: generic step layout reserves a fixed aside width. */}
        <div className="flex h-full flex-col">
          <div className="space-y-8">
            {progressMeter}

            <header className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {eyebrow && <Badge variant="brand" size="sm">{eyebrow}</Badge>}
                {step && totalSteps && (
                  <span className="text-sm text-text-secondary">
                    Step {step} of {totalSteps}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <h2 className={['text-2xl font-semibold text-text', titleClassName].join(' ').trim()}>{title}</h2>
                {description && <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">{description}</p>}
              </div>
            </header>

            <div className="space-y-6">
              {children}
            </div>
          </div>

          <footer className="mt-auto flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:justify-between">
            {secondaryAction ? (
              <Button
                size="lg"
                variant={secondaryAction.variant ?? 'ghost'}
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            ) : <span />}

            {primaryAction ? (
              <Button
                size="lg"
                variant={primaryAction.variant ?? 'primary'}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            ) : null}
          </footer>
        </div>

        {aside && (
          <aside className="rounded-2xl border border-border bg-surface-raised p-5">
            {aside}
          </aside>
        )}
      </div>
    </section>
  )
}
