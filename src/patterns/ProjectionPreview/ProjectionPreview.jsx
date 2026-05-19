import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '../../components/Button/Button.jsx'

const revealTransition = {
  duration: 0.68,
  ease: [0.16, 1, 0.3, 1],
}

const barDurationMs = 840
const revealPauseMs = 1000
const pipelineCardHeight = 'min-h-[152px]'

function AnimatedPipelineBar({ id, width, delay }) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setFilled(true), delay * 1000)
    return () => window.clearTimeout(timeoutId)
  }, [delay])

  return (
    <div className="mt-4 h-3 overflow-hidden rounded-full" style={{ backgroundColor: '#D2FF66' }}>
      <motion.div
        key={id}
        className="h-full rounded-full"
        style={{ backgroundColor: '#166534' }}
        initial={false}
        animate={{ width: filled ? width : '0%' }}
        transition={{ duration: barDurationMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function PipelineSkeleton({ label }) {
  return (
    <div className={`h-full min-w-0 flex-1 rounded-[24px] border border-border bg-surface p-4 ${pipelineCardHeight}`}>
      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
        {label}
      </p>
      <div className="mt-1.5 h-9 w-40 rounded-full bg-surface-sunken" />
      <div className="mt-1 h-5 w-32 rounded-full bg-surface-sunken" />
      <div className="mt-3 h-3 overflow-hidden rounded-full" style={{ backgroundColor: '#D2FF66' }} />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-full bg-surface-sunken" />
        <div className="h-4 w-5/6 rounded-full bg-surface-sunken" />
      </div>
    </div>
  )
}

function PipelineNode({ label, value, sublabel, detail, width, barDelay = 0.12 }) {
  return (
    <motion.div
      className={`h-full min-w-0 flex-1 rounded-[24px] border border-border bg-surface p-4 ${pipelineCardHeight}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={revealTransition}
    >
      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">
        {value}
      </p>
      {sublabel && <p className="mt-1 text-sm text-text-secondary">{sublabel}</p>}
      <AnimatedPipelineBar id={`flow-${label}`} width={width} delay={barDelay} />
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">{detail}</p>
    </motion.div>
  )
}

export function ProjectionPreview({
  title,
  description,
  progressMeter = null,
  stats = [],
  note = null,
  primaryAction = { label: 'Continue to review' },
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const revealSecondAt = barDurationMs + revealPauseMs
    const revealThirdAt = revealSecondAt + barDurationMs + revealPauseMs

    const revealSecond = window.setTimeout(() => setStage(1), revealSecondAt)
    const revealThird = window.setTimeout(() => setStage(2), revealThirdAt)

    return () => {
      window.clearTimeout(revealSecond)
      window.clearTimeout(revealThird)
    }
  }, [])

  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-surface shadow-sm">
      <div className="p-8 lg:p-12">
        <div className="space-y-8">
          {progressMeter}

          <div className="space-y-4">
            <div className="space-y-3">
              <h2 className="max-w-3xl font-newsreader text-hero font-normal text-text">
                {title}
              </h2>
              {description && (
                <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            {stats[0] ? (
              <PipelineNode
                label={stats[0].label}
                value={stats[0].value}
                sublabel={stats[0].sublabel}
                detail={stats[0].detail}
                width="100%"
                barDelay={0.12}
              />
            ) : null}
            {stats[1] ? (
              stage >= 1 ? (
                <PipelineNode
                  label={stats[1].label}
                  value={stats[1].value}
                  sublabel={stats[1].sublabel}
                  detail={stats[1].detail}
                  width="74%"
                  barDelay={0.22}
                />
              ) : (
                <PipelineSkeleton label={stats[1].label} />
              )
            ) : null}
            {stats[2] ? (
              stage >= 2 ? (
                <PipelineNode
                  label={stats[2].label}
                  value={stats[2].value}
                  sublabel={stats[2].sublabel}
                  detail={stats[2].detail}
                  width="42%"
                  barDelay={0.22}
                />
              ) : (
                <PipelineSkeleton label={stats[2].label} />
              )
            ) : null}
          </div>

          {note && (
            <div className="rounded-[28px] border border-border bg-surface-raised p-5">
              <p className="text-sm leading-relaxed text-text-secondary">{note}</p>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {secondaryAction && (
            <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          {primaryAction && (
            <Button size="lg" variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
