import { Link2, LoaderCircle } from 'lucide-react'
import entryIllustrationUrl from '../../assets/entry-illustration.png'
import { Button } from '../../components/Button/Button.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'

export function SingleFieldIntake({
  title,
  description,
  progressMeter = null,
  value = '',
  onChange,
  onSubmit,
  loading = false,
  trustPoints = [],
  helperText = null,
  ctaLabel = 'Continue',
  ctaSuccessLabel = null,
  ctaDisabled = false,
  showAside = true,
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-surface shadow-sm">
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_360px]">
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}

            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="max-w-2xl font-newsreader text-hero font-normal text-text">
                  {title}
                </h2>
                {description && (
                  <p className="max-w-xl text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="max-w-2xl">
              <TextInput
                placeholder="Paste a creator URL or social profile"
                value={value}
                onChange={onChange}
                prefix={<LucideIcon icon={Link2} size="md" stroke="display" />}
                suffix={loading ? (
                  <span className="flex items-center text-text-tertiary">
                    <LucideIcon icon={LoaderCircle} size="sm" stroke="standard" className="animate-spin" />
                  </span>
                ) : null}
                inputClassName="text-lg"
              />
            </div>

            {trustPoints.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-3">
                {trustPoints.map((point) => (
                  <div key={point.title} className="rounded-3xl border border-border bg-surface-raised p-4">
                    <p className="text-sm font-medium text-text">{point.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-text-secondary">{point.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" onClick={onSubmit} success={loading} successLabel={ctaSuccessLabel} disabled={ctaDisabled}>
                {ctaLabel}
              </Button>
              {helperText && <p className="text-sm text-text-secondary">{helperText}</p>}
            </div>
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-5' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-[28px] border border-brand/20 bg-surface shadow-xs' : 'relative h-full'].join(' ')}>
              <div className={['relative', showAside ? 'aspect-[4/3]' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={entryIllustrationUrl}
                  alt="Warm curiosity-building illustration for the creator application entry step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-border bg-surface px-4 py-3' : 'hidden'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'hidden'}>
                  Warm, curiosity-building art that makes the first step feel premium instead of form-like.
                </p>
              </div>
            </div>
            {showAside && (
              <>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text">What happens next</p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  We recognize the creator, pull initial identity signals, and show a reviewable preview before anything is submitted.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { step: '01', label: 'Paste URL', active: true },
                  { step: '02', label: 'We fetch identity' },
                  { step: '03', label: 'You review and preview' },
                  { step: '04', label: 'Verify and submit' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={[
                      'flex items-center gap-3 rounded-2xl border px-4 py-3',
                      item.active ? 'border-brand bg-surface' : 'border-border bg-surface/70',
                    ].join(' ')}
                  >
                    <span className={[
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                      item.active ? 'bg-brand text-white' : 'bg-surface-sunken text-text-secondary',
                    ].join(' ')}>
                      {item.step}
                    </span>
                    <span className="text-sm font-medium text-text">{item.label}</span>
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
