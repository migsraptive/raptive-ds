import recognitionIllustrationUrl from '../../assets/recognition-illustration.png'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Avatar } from '../../components/Avatar/Avatar.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'

const sectionTransition = {
  duration: 0.34,
  ease: [0.22, 1, 0.36, 1],
}

const cardSpring = {
  type: 'spring',
  stiffness: 280,
  damping: 28,
}

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
  const shouldReduceMotion = useReducedMotion()
  const duration = shouldReduceMotion ? 0.01 : sectionTransition.duration
  const transition = { ...sectionTransition, duration }
  const layoutTransition = shouldReduceMotion ? { duration: 0.01 } : cardSpring

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.1fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
        <motion.div
          className="space-y-8 p-8 lg:p-12"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
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
          </motion.div>

          <motion.div
            className="rounded-xl border border-border bg-surface-raised p-6"
            layout
            transition={layoutTransition}
          >
            <AnimatePresence mode="wait" initial={false}>
              {loading ? (
                <motion.div
                  key="recognition-loading"
                  className="space-y-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={sectionTransition}
                >
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-3xl bg-surface-sunken animate-pulse" />
                  <div className="space-y-3">
                    <SkeletonLine width="180px" />
                    <SkeletonLine width="240px" />
                  </div>
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-white p-4 space-y-3">
                    <SkeletonLine width="72px" />
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="70%" />
                  </div>
                  <div className="rounded-xl border border-border bg-white p-4 space-y-3">
                    <SkeletonLine width="88px" />
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="60%" />
                  </div>
                  <div className="rounded-xl border border-border bg-white p-4 space-y-3">
                    <SkeletonLine width="60px" />
                    <SkeletonLine width="100%" />
                    <SkeletonLine width="65%" />
                  </div>
                </div>
                </motion.div>
              ) : (
                <motion.div
                  key="recognition-loaded"
                  className="space-y-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={transition}
                >
                <motion.div className="flex items-center gap-4" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.04 }}>
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
                </motion.div>

                <div className="grid gap-3 md:grid-cols-3">
                  {signals.map((signal, index) => (
                    <motion.div
                      key={signal.label}
                      className="rounded-xl border border-border bg-white p-4"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...transition, delay: 0.08 + index * 0.06 }}
                    >
                      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{signal.label}</p>
                      <p className="mt-2 text-sm font-medium text-text">{signal.value}</p>
                      {signal.help && <p className="mt-1 text-sm text-text-secondary">{signal.help}</p>}
                    </motion.div>
                  ))}
                </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="flex flex-wrap items-center justify-between gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.12 }}>
            {secondaryAction && (
              <Button variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick} loading={loading} className={secondaryAction ? '' : 'ml-auto'}>
                {primaryAction.label}
              </Button>
            )}
          </motion.div>
        </motion.div>

        <motion.aside
          className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, delay: 0.08 }}
        >
          <div className={showAside ? 'space-y-4' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-xl border border-brand/20 bg-white shadow-xs' : 'relative h-full'].join(' ')}>
              {/* no token available: full-height illustration mock uses a fixed desktop minimum. */}
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
        </motion.aside>
      </div>
    </section>
  )
}
