export function CreatorFlowProgress({
  steps = [],
  activeStep = 0,
  progress = 0,
}) {
  return (
    <div className="space-y-4 rounded-[28px] border border-border bg-surface-raised p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Flow progress</p>
          <div className="flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={[
                  'rounded-full border px-3 py-1.5 text-sm transition-colors',
                  index === activeStep
                    ? 'border-brand bg-brand-subtle text-brand-dark'
                    : index < activeStep
                      ? 'border-border bg-surface text-text'
                      : 'border-border bg-surface/70 text-text-secondary',
                ].join(' ')}
              >
                {String(index + 1).padStart(2, '0')} {step.label}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-[220px] space-y-2">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>Current stage</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-surface-sunken">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
