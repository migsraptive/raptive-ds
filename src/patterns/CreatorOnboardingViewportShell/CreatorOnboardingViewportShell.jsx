import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Badge } from '../../components/Badge/Badge.jsx'

const toneClasses = {
  light: {
    section: 'border-border bg-surface text-text',
    main: 'bg-surface',
    aside: 'border-border bg-surface-raised/40',
    footer: 'border-border bg-surface/96',
    eyebrow: 'brand',
    description: 'text-text-secondary',
  },
  dark: {
    section: 'border-neutral-800 bg-neutral-950 text-white',
    main: 'bg-neutral-950',
    aside: 'border-neutral-800 bg-black/40',
    footer: 'border-neutral-800 bg-neutral-950/96',
    eyebrow: 'outline',
    description: 'text-white/80',
  },
}

export function CreatorOnboardingViewportShell({
  eyebrow = null,
  title,
  description = null,
  aside = null,
  background = null,
  footer = null,
  topMedia = null,
  containerClassName = '',
  headerClassName = '',
  contentClassName = '',
  contentKey = 'default',
  framed = true,
  viewportClassName = 'min-h-[720px] lg:min-h-[calc(100vh-96px)]',
  tone = 'light',
  children,
}) {
  const shouldReduceMotion = useReducedMotion()
  const classes = toneClasses[tone] ?? toneClasses.light
  const headerKey = `${title}-${description ?? ''}`
  const columnClassName = ['mx-auto w-full max-w-3xl', containerClassName].filter(Boolean).join(' ')
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
    <section className={['overflow-hidden', framed ? 'border shadow-sm' : '', classes.section].filter(Boolean).join(' ')}>
      {/* no token available: viewport prototype needs a stable desktop floor plus a viewport-relative height inside component-library chrome. */}
      <div className={['grid', viewportClassName, aside ? 'lg:grid-cols-[minmax(0,1fr)_360px]' : ''].filter(Boolean).join(' ')}>
        <div className={['relative flex min-h-0 flex-col overflow-hidden', classes.main].join(' ')}>
          {background}
          <div className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-8 pb-8 pt-8 text-left lg:px-12 lg:pt-12">
            <header className={[columnClassName, 'text-left'].join(' ')}>
              {topMedia ? (
                <div className="aspect-[4/1] w-full overflow-hidden rounded-lg border border-border bg-surface-raised">
                  {topMedia}
                </div>
              ) : null}
              {eyebrow ? (
                <Badge variant={classes.eyebrow} size="sm">
                  {eyebrow}
                </Badge>
              ) : null}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={headerKey}
                  className={['w-full space-y-3 pt-8 text-left', headerClassName].filter(Boolean).join(' ')}
                  initial={headerMotion.initial}
                  animate={headerMotion.animate}
                  exit={headerMotion.exit}
                  transition={headerMotion.transition}
                >
                  <h2 className="font-newsreader text-hero font-normal">
                    {title}
                  </h2>
                  {description ? (
                    <p className={['max-w-2xl text-base leading-relaxed', classes.description].join(' ')}>
                      {description}
                    </p>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </header>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={contentKey}
                className={[columnClassName, 'space-y-6 pt-6', contentClassName].filter(Boolean).join(' ')}
                initial={contentMotion.initial}
                animate={contentMotion.animate}
                exit={contentMotion.exit}
                transition={contentMotion.transition}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>

          {footer ? (
            <footer className={['relative z-10 flex-shrink-0 border-t px-8 py-5 lg:px-12', classes.footer].join(' ')}>
              <div className={[columnClassName, 'flex flex-wrap items-center justify-end gap-3'].join(' ')}>
                {footer}
              </div>
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
