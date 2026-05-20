import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const revealTransition = {
  duration: 0.68,
  ease: [0.16, 1, 0.3, 1],
}

const barDurationMs = 840
const revealPauseMs = 1000
const pipelineCardHeight = 'min-h-40'

function AnimatedPipelineBar({ id, width, filled }) {
  return (
    <div className="mt-5 h-3 overflow-hidden rounded-full bg-surface-sunken">
      <motion.div
        key={id}
        className="h-full rounded-full bg-brand"
        initial={false}
        animate={{ width: filled ? width : '0%' }}
        transition={{ duration: barDurationMs / 1000, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  )
}

function LabCard({ eyebrow, title, description, children }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-xs">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{eyebrow}</p>
        <h3 className="font-display text-xl font-semibold tracking-tight text-text">{title}</h3>
        <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  )
}

function StatPill({ label, value }) {
  return (
    <div className="rounded-full border border-border bg-surface px-3 py-1.5">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className="ml-2 text-sm font-medium text-text">{value}</span>
    </div>
  )
}

function PipelineSkeleton({ label }) {
  return (
    <div className={`h-full min-w-0 flex-1 rounded-xl border border-border bg-surface p-4 ${pipelineCardHeight}`}>
      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{label}</p>
      <div className="mt-1.5 h-9 w-40 rounded-full bg-surface-sunken" />
      <div className="mt-1 h-5 w-32 rounded-full bg-surface-sunken" />
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-sunken" />
    </div>
  )
}

function PipelineNode({ label, value, sublabel, width, exposed = false, barDelay = 0.12 }) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setFilled(true), barDelay * 1000)
    return () => window.clearTimeout(timeoutId)
  }, [barDelay])

  return (
    <motion.div
      className={`h-full min-w-0 flex-1 rounded-xl border border-border bg-surface p-4 ${pipelineCardHeight}`}
      initial={false}
      animate={{ opacity: exposed ? 1 : 0, y: exposed ? 0 : 10 }}
      transition={revealTransition}
    >
      <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">{value}</p>
      <p className="mt-1 text-sm text-text-secondary">{sublabel}</p>
      <AnimatedPipelineBar id={`lab-${label}`} width={width} filled={filled} />
    </motion.div>
  )
}

function RangeTrack({ low, high, caption }) {
  return (
    <div className="space-y-3">
      <div className="relative h-4 rounded-full bg-surface-sunken">
        <motion.div
          className="absolute inset-y-0 rounded-full bg-brand/16"
          initial={{ left: '18%', right: '50%' }}
          animate={{ left: '18%', right: '22%' }}
          transition={{ ...revealTransition, delay: 0.08 }}
        />
        <motion.div
          className="absolute top-1/2 h-6 w-px -translate-y-1/2 bg-brand"
          initial={{ left: '18%', opacity: 0 }}
          animate={{ left: '18%', opacity: 1 }}
          transition={{ ...revealTransition, delay: 0.14 }}
        />
        <motion.div
          className="absolute top-1/2 h-6 w-px -translate-y-1/2 bg-brand"
          initial={{ left: '78%', opacity: 0 }}
          animate={{ left: '78%', opacity: 1 }}
          transition={{ ...revealTransition, delay: 0.18 }}
        />
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-text">{low}</span>
        <span className="text-text-secondary">{caption}</span>
        <span className="font-medium text-text">{high}</span>
      </div>
    </div>
  )
}

function OverlapBand() {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-full bg-surface-sunken">
        <div className="relative h-4">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-brand"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={revealTransition}
          />
          <motion.div
            className="absolute inset-y-0 right-0 rounded-r-full bg-brand-subtle"
            initial={{ width: '0%' }}
            animate={{ width: '32%' }}
            transition={{ ...revealTransition, delay: 0.24 }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-text">526,000 raw total</span>
        <span className="text-text-secondary">shared followers removed</span>
      </div>
    </div>
  )
}

function PipelineRevealDemo() {
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
    <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
      <PipelineNode
        label="Followers"
        value="526,000"
        sublabel="Cross-platform raw total"
        width="100%"
        exposed
        barDelay={0.12}
      />
      {stage >= 1 ? (
        <PipelineNode
          label="Unique reach"
          value="315.6K–420.8K"
          sublabel="Overlap reduced"
          width="74%"
          exposed
          barDelay={0.22}
        />
      ) : (
        <PipelineSkeleton label="Unique reach" />
      )}
      {stage >= 2 ? (
        <PipelineNode
          label="Revenue"
          value="$426–$3,787"
          sublabel="Monthly modeled range"
          width="42%"
          exposed
          barDelay={0.22}
        />
      ) : (
        <PipelineSkeleton label="Revenue" />
      )}
    </div>
  )
}

export function ProjectionMotionShowcase() {
  return (
    <div className="space-y-6">
      <LabCard
        eyebrow="Experiment 01"
        title="Projection Pipeline"
        description="Treat the projection story like a transformation path: raw followers compress into unique reach, then hand off to a revenue outcome."
      >
        <PipelineRevealDemo />
      </LabCard>

      <LabCard
        eyebrow="Experiment 02"
        title="Range Band Readout"
        description="Keep the story flatter and more analytical: use forecast bands to show uncertainty without breaking the grid."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Unique reach band</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">315.6K to 420.8K</p>
            <div className="mt-5">
              <RangeTrack low="315.6K" high="420.8K" caption="Modeled overlap range" />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Revenue band</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">$426 to $3,787</p>
            <div className="mt-5">
              <RangeTrack low="$426" high="$3,787" caption="Traffic-to-revenue forecast" />
            </div>
          </div>
        </div>
      </LabCard>

      <LabCard
        eyebrow="Experiment 03"
        title="Overlap Reduction"
        description="Explain why the modeled audience shrinks from the raw total by visualizing the removed overlap directly before introducing the forecast."
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_320px]">
          {/* no token available: motion showcase reserves a fixed stat column width. */}
          <div className="rounded-xl border border-border bg-surface p-4">
            <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Deduping audience</p>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-text">526,000 → 315.6K–420.8K</p>
            <div className="mt-5">
              <OverlapBand />
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
            <StatPill label="Overlap removed" value="~20% to 40%" />
            <StatPill label="Reach retained" value="~60% to 80%" />
            <StatPill label="Revenue handoff" value="$426 to $3,787" />
          </div>
        </div>
      </LabCard>
    </div>
  )
}
