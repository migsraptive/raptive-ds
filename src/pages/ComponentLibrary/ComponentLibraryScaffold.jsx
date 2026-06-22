import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Badge } from '../../components/Badge/Badge.jsx'

export const explorationNoticeLabel = 'exploration - do not use or refer'

const shimmerTransition = {
  repeat: Infinity,
  duration: 1.45,
  ease: 'easeInOut',
}

export function Section({ title, description, children, titleBadge = null }) {
  return (
    <section className="space-y-4">
      <div className="space-y-0.5 border-b border-border pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold text-text">{title}</h2>
          {titleBadge}
        </div>
        {description && <p className="text-sm text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  )
}

export function PatternSection({ title, description, children }) {
  return (
    <Section
      title={title}
      description={description}
      titleBadge={(
        <Badge variant="warning" size="sm">
          {explorationNoticeLabel}
        </Badge>
      )}
    >
      {children}
    </Section>
  )
}

export function ColorSwatch({ token, value, label }) {
  return (
    <div className="min-w-0">
      <div
        className="aspect-square w-full rounded-md border border-border shadow-xs"
        style={{ backgroundColor: value }}
        title={value}
      />
      <div className="mt-2 space-y-0.5">
        <p className="break-words font-mono text-2xs leading-snug text-text-secondary">{token}</p>
        {label && <p className="text-2xs leading-snug text-text-tertiary">{label}</p>}
      </div>
    </div>
  )
}

export function ColorSwatchGrid({ children }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
      {children}
    </div>
  )
}

export function ColorSwatchGroup({ title, children }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-text-secondary">{title}</p>
      <ColorSwatchGrid>{children}</ColorSwatchGrid>
    </div>
  )
}

export function Row({ label, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

export function FoundBadgeReveal() {
  const shouldReduceMotion = useReducedMotion()
  const motionProps = shouldReduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <motion.span {...motionProps}>
      <Badge variant="success" size="sm">Found</Badge>
    </motion.span>
  )
}

export function ShellRowShimmer({ label }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <span
      className="relative mt-1 block h-3 max-w-sm overflow-hidden rounded-full bg-border"
      aria-label={label}
    >
      {!shouldReduceMotion ? (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/80 to-transparent"
          animate={{ x: ['0%', '420%'] }}
          transition={shimmerTransition}
        />
      ) : null}
      <span className="sr-only">{label}</span>
    </span>
  )
}

export function DocumentationNote({ children }) {
  return (
    <aside className="rounded-xl border border-border bg-surface-sunken px-3 py-2 text-sm leading-relaxed text-text-secondary">
      {children}
    </aside>
  )
}

export function TimedShellVideo({ src, label, playbackRate = 1, pauseAfterMs = 3000 }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    video.pause()
    video.currentTime = 0
    video.playbackRate = playbackRate

    const playPromise = video.play()
    if (playPromise) {
      playPromise.catch(() => {})
    }

    const pauseTimer = window.setTimeout(() => {
      video.pause()
    }, pauseAfterMs)

    return () => {
      window.clearTimeout(pauseTimer)
      video.pause()
    }
  }, [pauseAfterMs, playbackRate, src])

  return (
    <video
      ref={videoRef}
      src={src}
      className="h-full w-full object-cover"
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    />
  )
}
