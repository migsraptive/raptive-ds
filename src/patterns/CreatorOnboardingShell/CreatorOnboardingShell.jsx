import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Badge } from '../../components/Badge/Badge.jsx'

const toneClasses = {
  light: {
    section: 'border-border bg-surface text-text',
    main: 'bg-surface',
    aside: 'border-border bg-surface-raised/40',
    eyebrow: 'brand',
    description: 'text-text-secondary',
  },
  dark: {
    section: 'border-neutral-800 bg-neutral-950 text-white',
    main: 'bg-neutral-950',
    aside: 'border-neutral-800 bg-black/40',
    eyebrow: 'outline',
    description: 'text-white/80',
  },
}

export function CreatorOnboardingShell({
  eyebrow = null,
  title,
  description = null,
  progressMeter = null,
  aside = null,
  footer = null,
  contentAlignment = 'start',
  headerClassName = '',
  contentClassName = '',
  contentKey = 'default',
  tone = 'light',
  children,
}) {
  const shouldReduceMotion = useReducedMotion()
  const classes = toneClasses[tone] ?? toneClasses.light
  const contentAlignmentClass = contentAlignment === 'center' ? 'my-auto' : ''
  const headerKey = `${title}-${description ?? ''}`
  const contentMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
      }
  const headerMotion = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <section className={['overflow-hidden rounded-xl border shadow-sm', classes.section].join(' ')}>
      {/* no token available: guided-story onboarding previews need the same stable desktop floor as the current tallest creator-flow art rail. */}
      <div className={['grid min-h-[720px] gap-0', aside ? 'lg:grid-cols-[minmax(0,1fr)_360px]' : ''].filter(Boolean).join(' ')}>
        <div className={['flex h-full flex-col p-8 lg:p-12', classes.main].join(' ')}>
          <div className={contentAlignmentClass}>
            <div className="space-y-8">
              {progressMeter}

              <header className="space-y-4">
                {eyebrow ? (
                  <Badge variant={classes.eyebrow} size="sm">
                    {eyebrow}
                  </Badge>
                ) : null}
                <div className="space-y-3">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={headerKey}
                      className={['space-y-3', headerClassName].filter(Boolean).join(' ')}
                      initial={headerMotion.initial}
                      animate={headerMotion.animate}
                      exit={headerMotion.exit}
                      transition={headerMotion.transition}
                    >
                      <h2 className="max-w-3xl font-newsreader text-hero font-normal">
                        {title}
                      </h2>
                      {description ? (
                        <p className={['max-w-2xl text-base leading-relaxed', classes.description].join(' ')}>
                          {description}
                        </p>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </header>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={contentKey}
                  className={['space-y-6', contentClassName].filter(Boolean).join(' ')}
                  initial={contentMotion.initial}
                  animate={contentMotion.animate}
                  exit={contentMotion.exit}
                  transition={contentMotion.transition}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {footer ? (
            <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
              {footer}
            </footer>
          ) : null}
        </div>

        {aside ? (
          <aside className={['border-t p-0 lg:border-l lg:border-t-0', classes.aside].join(' ')}>
            <div className="h-full">
              {aside}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  )
}
