import submissionIllustrationUrl from '../../assets/submission-illustration.png'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'

export function SubmissionSuccess({
  eyebrow = 'Submit',
  title,
  description,
  highlights = [],
  timeline = [],
  showAside = true,
  primaryAction = { label: 'View creator dashboard' },
  secondaryAction = { label: 'Back to library', variant: 'ghost' },
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8 bg-gradient-to-br from-brand-subtle via-white to-gamification-gold-bg p-8 lg:p-12">
          <div className="space-y-4">
            <Badge variant="gold" size="sm">{eyebrow}</Badge>
            <div className="space-y-3">
              <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-text">
                {title}
              </h2>
              {description && (
                <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-white/90 p-6 shadow-sm backdrop-blur">
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className="rounded-3xl border border-border bg-white px-4 py-5">
                  <p className="text-2xl font-semibold text-text">{item.value}</p>
                  <p className="mt-1 text-sm font-medium text-text">{item.label}</p>
                  {item.help && <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.help}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {secondaryAction && (
              <Button variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-5' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-[28px] border border-brand/20 bg-white shadow-xs' : 'relative h-full'].join(' ')}>
              <div className={['relative', showAside ? 'aspect-[16/9]' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={submissionIllustrationUrl}
                  alt="Completion illustration for the creator application submission success step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-border bg-white px-4 py-3' : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-6'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'text-sm leading-relaxed text-white/92'}>
                  A memorable closing visual that makes the final state feel exclusive and worth the wait.
                </p>
              </div>
            </div>
            {showAside && (
              <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text">What happens now</p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  The closing state should feel memorable and exclusive. It is the last thing the creator sees, so it should reward the effort they just made.
                </p>
              </div>

              <div className="space-y-3">
                {timeline.map((item) => (
                  <div key={item.step} className="flex gap-3 rounded-[24px] border border-border bg-white p-4">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-subtle text-sm font-medium text-brand-dark">
                      {item.step}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-text">{item.title}</p>
                      <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
