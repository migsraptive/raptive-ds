import recognitionIllustrationUrl from '../../assets/recognition-illustration.png'
import { Avatar } from '../../components/Avatar/Avatar.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'

function SkeletonLine({ width }) {
  return (
    <div
      className="h-3 rounded-full bg-surface-sunken animate-pulse"
      style={{ width }}
      aria-hidden="true"
    />
  )
}

export function RecognitionState({
  eyebrow = 'Recognition',
  title,
  description,
  loading = false,
  profile = null,
  signals = [],
  showAside = true,
  primaryAction = { label: 'Looks right' },
  secondaryAction = { label: 'Edit details', variant: 'ghost' },
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_360px]">
        <div className="space-y-8 p-8 lg:p-12">
          <div className="space-y-4">
            <Badge variant={loading ? 'warning' : 'brand'} size="sm">
              {eyebrow}
            </Badge>
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

          <div className="rounded-[32px] border border-border bg-surface-raised p-6">
            {loading ? (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-surface-sunken animate-pulse" />
                  <div className="space-y-3">
                    <SkeletonLine width="180px" />
                    <SkeletonLine width="240px" />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-3xl border border-border bg-white p-4 space-y-3">
                    <SkeletonLine width="72px" />
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="70%" />
                  </div>
                  <div className="rounded-3xl border border-border bg-white p-4 space-y-3">
                    <SkeletonLine width="88px" />
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="60%" />
                  </div>
                  <div className="rounded-3xl border border-border bg-white p-4 space-y-3">
                    <SkeletonLine width="60px" />
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="65%" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Avatar
                    src={profile?.avatar}
                    name={profile?.name}
                    size="xl"
                    shape="square"
                  />
                  <div className="space-y-1">
                    <p className="text-xl font-semibold text-text">{profile?.name}</p>
                    <p className="text-sm text-text-secondary">{profile?.summary}</p>
                    {profile?.domain && <p className="text-sm text-text-secondary">{profile.domain}</p>}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {signals.map((signal) => (
                    <div key={signal.label} className="rounded-3xl border border-border bg-white p-4">
                      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{signal.label}</p>
                      <p className="mt-2 text-sm font-medium text-text">{signal.value}</p>
                      {signal.help && <p className="mt-1 text-sm text-text-secondary">{signal.help}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {secondaryAction && (
              <Button variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick} loading={loading}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-4' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-[28px] border border-brand/20 bg-white shadow-xs' : 'relative h-full'].join(' ')}>
              <div className={['relative', showAside ? 'aspect-[16/9]' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={recognitionIllustrationUrl}
                  alt="Recognition reveal illustration for the creator application fetch step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-border bg-white px-4 py-3' : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-6'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'text-sm leading-relaxed text-white/92'}>
                  A visual metaphor for the system recognizing the creator before asking for edits.
                </p>
              </div>
            </div>
            {showAside && (
              <>
              <p className="text-sm font-medium text-text">Why this matters</p>
              <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
                <p>The first reveal should feel like recognition, not backend plumbing.</p>
                <p>Use this step to prove the system understands who the creator is before asking for more work.</p>
                <p>Confidence should rise here, but the UI must still leave room for correction in the next stage.</p>
              </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
