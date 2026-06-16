import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import Confetti from 'react-confetti'
import submissionIllustrationUrl from '../../assets/submission-illustration.png'
import { Button } from '../../components/Button/Button.jsx'
import { colors } from '../../tokens/index.js'

function CelebrationBackgroundDot({ style }) {
  return <span aria-hidden="true" className="absolute rounded-full animate-ping" style={style} />
}

const celebrationColors = [
  colors.status.warning,
  colors.gamification.purple,
  colors.brand.DEFAULT,
  colors.status.success,
  colors.gamification['purple-light'],
]

const cursorChargeMs = 2000

function useElementSize() {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const updateSize = () => {
      const bounds = element.getBoundingClientRect()
      setSize({
        width: Math.round(bounds.width),
        height: Math.round(bounds.height),
      })
    }

    updateSize()

    const observer = new ResizeObserver(updateSize)
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return [ref, size]
}

function ReactConfettiBackground({ shouldReduceMotion }) {
  const [containerRef, size] = useElementSize()
  const canRenderConfetti = size.width > 0 && size.height > 0 && !shouldReduceMotion

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-75">
      {canRenderConfetti ? (
        <Confetti
          width={size.width}
          height={size.height}
          colors={celebrationColors}
          numberOfPieces={96}
          recycle
          gravity={0.045}
          wind={0.004}
          opacity={0.72}
          initialVelocityX={3}
          initialVelocityY={8}
          confettiSource={{ x: 0, y: 0, w: size.width, h: 0 }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </div>
  )
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function CursorBurstConfettiBackground({ shouldReduceMotion }) {
  const [containerRef, size] = useElementSize()
  const [phase, setPhase] = useState('idle')
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const phaseRef = useRef(phase)
  const burstTimerRef = useRef(null)
  const canRenderConfetti = size.width > 0 && size.height > 0 && !shouldReduceMotion && phase !== 'idle' && phase !== 'complete'
  const isCharging = phase === 'charge'
  const sourceSize = isCharging ? 8 : 20

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (phase !== 'burst') return undefined

    const completeTimer = window.setTimeout(() => {
      setPhase('complete')
    }, 3500)

    return () => window.clearTimeout(completeTimer)
  }, [phase])

  useEffect(() => {
    if (size.width <= 0 || size.height <= 0 || phaseRef.current !== 'idle') return

    setCursor({
      x: Math.round(size.width / 2),
      y: Math.round(size.height * 0.36),
    })
  }, [size.height, size.width])

  useEffect(() => {
    if (shouldReduceMotion) return undefined

    const handlePointerMove = (event) => {
      const element = containerRef.current
      if (!element || phaseRef.current === 'burst' || phaseRef.current === 'complete') return

      const bounds = element.getBoundingClientRect()
      const isInside = (
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom
      )

      if (!isInside) return

      setCursor({
        x: Math.round(clamp(event.clientX - bounds.left, 0, bounds.width)),
        y: Math.round(clamp(event.clientY - bounds.top, 0, bounds.height)),
      })

      if (phaseRef.current === 'idle') {
        setPhase('charge')
        burstTimerRef.current = window.setTimeout(() => {
          setPhase('burst')
        }, cursorChargeMs)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (burstTimerRef.current) {
        window.clearTimeout(burstTimerRef.current)
      }
    }
  }, [containerRef, shouldReduceMotion])

  return (
    <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-80">
      {canRenderConfetti ? (
        <Confetti
          key={phase}
          width={size.width}
          height={size.height}
          colors={celebrationColors}
          numberOfPieces={isCharging ? 32 : 220}
          recycle={isCharging}
          gravity={isCharging ? 0.028 : 0.12}
          wind={isCharging ? 0 : 0.006}
          opacity={isCharging ? 0.82 : 0.76}
          initialVelocityX={isCharging ? 1 : 12}
          initialVelocityY={isCharging ? 3 : 18}
          tweenDuration={isCharging ? cursorChargeMs : 900}
          confettiSource={{
            x: cursor.x - sourceSize / 2,
            y: cursor.y - sourceSize / 2,
            w: sourceSize,
            h: sourceSize,
          }}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        />
      ) : null}
    </div>
  )
}

export function CelebrationBackground({ active, variant, shouldReduceMotion }) {
  if (!active) return null

  if (variant === 'react-confetti') {
    return <ReactConfettiBackground shouldReduceMotion={shouldReduceMotion} />
  }

  if (variant === 'cursor-burst') {
    return <CursorBurstConfettiBackground shouldReduceMotion={shouldReduceMotion} />
  }

  const reducedDuration = '0.01s'
  const dots = [
    { top: '10%', left: '12%', width: 10, height: 10, backgroundColor: colors.status.warning, animationDuration: shouldReduceMotion ? reducedDuration : '1.2s', animationDelay: '0s' },
    { top: '16%', left: '46%', width: 6, height: 6, backgroundColor: colors.gamification.purple, animationDuration: shouldReduceMotion ? reducedDuration : '1.4s', animationDelay: '0.2s' },
    { top: '12%', left: '82%', width: 12, height: 6, backgroundColor: colors.brand.DEFAULT, animationDuration: shouldReduceMotion ? reducedDuration : '1s', animationDelay: '0.1s' },
    { top: '32%', left: '24%', width: 7, height: 7, backgroundColor: colors.status.success, animationDuration: shouldReduceMotion ? reducedDuration : '1.3s', animationDelay: '0.3s' },
    { top: '44%', left: '72%', width: 9, height: 9, backgroundColor: colors.status.warning, animationDuration: shouldReduceMotion ? reducedDuration : '1.1s', animationDelay: '0.4s' },
    { top: '62%', left: '18%', width: 8, height: 8, backgroundColor: colors.gamification['purple-light'], animationDuration: shouldReduceMotion ? reducedDuration : '1.5s', animationDelay: '0.15s' },
    { top: '70%', left: '54%', width: 5, height: 5, backgroundColor: colors.brand.DEFAULT, animationDuration: shouldReduceMotion ? reducedDuration : '1.2s', animationDelay: '0.25s' },
    { top: '78%', left: '88%', width: 11, height: 6, backgroundColor: colors.status.warning, animationDuration: shouldReduceMotion ? reducedDuration : '1.0s', animationDelay: '0.35s' },
    { top: '86%', left: '34%', width: 6, height: 6, backgroundColor: colors.status.success, animationDuration: shouldReduceMotion ? reducedDuration : '1.35s', animationDelay: '0.45s' },
  ]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-80">
      {dots.map((dot, index) => (
        <CelebrationBackgroundDot key={index} style={dot} />
      ))}
    </div>
  )
}

export function SubmissionSuccess({
  title,
  description,
  progressMeter = null,
  summary = null,
  timeline = [],
  showAside = true,
  framed = true,
  footerContent = null,
  primaryAction = { label: 'Close' },
  secondaryAction = { label: 'Back to library', variant: 'ghost' },
  showCelebrationBackground = true,
  celebrationBackgroundVariant = 'cursor-burst',
  contentAlign = 'start',
  illustrationFrameClassName = null,
}) {
  const shouldReduceMotion = useReducedMotion()
  const centeredContentClassName = contentAlign === 'center' ? 'lg:mx-auto lg:w-full lg:max-w-2xl' : ''
  const illustrationFrameClasses = illustrationFrameClassName ?? (showAside ? 'aspect-[16/9]' : 'h-full min-h-[720px]')

  return (
    <section className={['relative overflow-hidden rounded-xl bg-neutral-950 shadow-sm', framed ? 'border border-neutral-800' : ''].filter(Boolean).join(' ')}>
      <div className="relative z-10 grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
        <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 lg:p-12">
          <CelebrationBackground active={showCelebrationBackground} variant={celebrationBackgroundVariant} shouldReduceMotion={shouldReduceMotion} />
          <div className={['relative z-10 space-y-8', centeredContentClassName].filter(Boolean).join(' ')}>
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

          <div className={['relative z-10 mt-auto space-y-4 pt-8', centeredContentClassName].filter(Boolean).join(' ')}>
            {footerContent && (
              <div className={contentAlign === 'center' ? 'lg:w-full' : 'ml-auto max-w-2xl'}>
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
                  data-ds-role="secondary-action"
                  data-ds-instance="creator-application.submission.secondary"
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
                  data-ds-role="primary-action"
                  data-ds-instance="creator-application.submission.primary"
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
              <div className={['relative', illustrationFrameClasses].join(' ')}>
                <img
                  src={submissionIllustrationUrl}
                  alt="Completion illustration for the creator application submission success step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              </div>
              {showAside && (
                <div className="border-t border-white/10 bg-neutral-950 px-4 py-3">
                  <p className="text-sm leading-relaxed text-white/68">
                    A memorable closing visual that makes the final state feel exclusive and worth the wait.
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
