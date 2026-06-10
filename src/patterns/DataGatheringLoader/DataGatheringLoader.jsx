import { motion, useReducedMotion } from 'motion/react'
import { StepLayout } from '../StepLayout/StepLayout.jsx'

const revealTransition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
}

const pulseTransition = {
  repeat: Infinity,
  repeatType: 'mirror',
  duration: 0.9,
  ease: 'easeInOut',
}

function SignalRow({ label, value, delay = 0 }) {
  const shouldReduceMotion = useReducedMotion()
  const duration = shouldReduceMotion ? 0.01 : revealTransition.duration

  return (
    <motion.div
      className="relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-surface px-4 py-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...revealTransition, duration, delay }}
    >
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/55 to-transparent"
        animate={{ x: ['0%', '420%'] }}
        transition={{
          repeat: Infinity,
          duration: 1.6,
          ease: 'easeInOut',
          delay,
        }}
      />
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{label}</p>
        <p className="text-sm text-text-secondary">{value}</p>
      </div>
      <motion.span
        className="h-2.5 w-2.5 rounded-full bg-brand"
        animate={{ scale: [0.92, 1.08, 0.92], opacity: [0.55, 1, 0.55] }}
        transition={{ ...pulseTransition, delay }}
      />
    </motion.div>
  )
}

export function DataGatheringLoader({
  progressMeter = null,
  progressVariant = 'bar',
  step = null,
  totalSteps = null,
  creatorUrl,
  secondaryAction = { label: 'Back', variant: 'ghost' },
}) {
  return (
    <StepLayout
      progressMeter={progressMeter}
      progressVariant={progressVariant}
      step={step}
      totalSteps={totalSteps}
      title="We're finding your fans."
      titleClassName="max-w-3xl font-newsreader text-hero font-normal"
      description="Give us a moment while we pull some details."
      primaryAction={null}
      secondaryAction={secondaryAction}
      showFooterDivider={false}
      aside={(
        <div className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
            Source
          </p>
          <p className="break-all text-sm leading-relaxed text-text">{creatorUrl}</p>
          <p className="text-sm leading-relaxed text-text-secondary">
            We&apos;re turning the submitted creator URL into a reviewable application draft.
          </p>
        </div>
      )}
    >
      <div className="space-y-5">
        <div className="grid gap-3">
          <SignalRow label="Identity" value="Matching the submitted URL to a creator profile." />
          <SignalRow label="Audience" value="Estimating cross-platform follower signal." delay={0.05} />
          <SignalRow label="Newsletter" value="Checking for newsletter and ownership clues on the site." delay={0.1} />
        </div>
      </div>
    </StepLayout>
  )
}
