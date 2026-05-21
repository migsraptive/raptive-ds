function boundedStep(currentStep, steps) {
  const numericStep = Number.isFinite(currentStep) ? Math.floor(currentStep) : 1
  return Math.min(Math.max(numericStep, 1), steps)
}

export function StepIndicator({ steps, currentStep }) {
  const totalSteps = Number.isFinite(steps) ? Math.max(0, Math.floor(steps)) : 0
  const activeStep = boundedStep(currentStep, totalSteps)

  if (!totalSteps) return null

  return (
    <div
      className="flex items-center justify-center gap-[4px]"
      aria-label="Progress"
      role="group"
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1
        const isCurrent = step === activeStep
        const isComplete = step < activeStep
        const stepState = isCurrent ? 'current' : isComplete ? 'completed' : 'not started'

        return (
          /* no token available: compact step indicator dots are specified at 6px. */
          <span
            key={step}
            aria-current={isCurrent ? 'step' : undefined}
            aria-label={`Step ${step} of ${totalSteps}, ${stepState}`}
            role="img"
            className={[
              'block h-[6px] flex-shrink-0 rounded-full transition-all duration-200',
              isCurrent
                ? 'w-[20px] border border-neutral-950 bg-neutral-950'
                : 'w-[6px]',
              isComplete
                ? 'border border-neutral-950 bg-neutral-950'
                : '',
              !isCurrent && !isComplete
                ? 'bg-neutral-500'
                : '',
            ].filter(Boolean).join(' ')}
          />
        )
      })}
    </div>
  )
}
