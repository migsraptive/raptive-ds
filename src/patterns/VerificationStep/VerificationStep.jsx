import verificationIllustrationUrl from '../../assets/verification-illustration.png'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { OptionTile } from '../../components/OptionTile/OptionTile.jsx'

export function VerificationStep({
  eyebrow = 'Verify',
  title,
  description,
  methods = [],
  selectedMethod = null,
  onSelectMethod,
  confirmed = false,
  onConfirmChange,
  reassurance = [],
  showAside = true,
  primaryAction = { label: 'Confirm identity' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_360px]">
        <div className="space-y-8 p-8 lg:p-12">
          <div className="space-y-4">
            <Badge variant="success" size="sm">{eyebrow}</Badge>
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

          <div className="grid gap-4">
            {methods.map((method) => (
              <OptionTile
                key={method.value}
                title={method.title}
                description={method.description}
                icon={method.icon}
                selected={selectedMethod === method.value}
                onClick={() => onSelectMethod?.(method.value)}
                className="min-h-[148px]"
              />
            ))}
          </div>

          <div className="rounded-[28px] border border-border bg-surface-raised p-5">
            <Checkbox
              checked={confirmed}
              onChange={(event) => onConfirmChange?.(event.target.checked)}
              label="I control this creator account and want to continue with verification."
              description="This keeps the last step feeling intentional without adding a long security ceremony."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {secondaryAction && (
              <Button variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button
                variant={primaryAction.variant ?? 'primary'}
                onClick={primaryAction.onClick}
                disabled={!selectedMethod || !confirmed}
              >
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-5' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-[28px] border border-brand/20 bg-white shadow-xs' : 'relative h-full'].join(' ')}>
              <div className={['relative', showAside ? 'aspect-square' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={verificationIllustrationUrl}
                  alt="Verification trust illustration for the creator application verification step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-border bg-white px-4 py-3' : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-6'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'text-sm leading-relaxed text-white/92'}>
                  A calmer support visual that keeps the final handshake from feeling cold or security-heavy.
                </p>
              </div>
            </div>
            {showAside && (
              <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text">Final handshake</p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Verification should feel like the last confident step before submission, not a cold compliance screen.
                </p>
              </div>

              <div className="rounded-[28px] border border-border bg-white p-5">
                <div className="space-y-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">What happens next</p>
                  <div className="space-y-3">
                    {reassurance.map((item) => (
                      <div key={item.title} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-subtle text-xs text-brand-dark">
                          {item.icon}
                        </span>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-text">{item.title}</p>
                          <p className="text-sm leading-relaxed text-text-secondary">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
