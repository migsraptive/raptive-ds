export function SegmentedControl({
  label,
  value,
  options = [],
  onChange,
  className = '',
}) {
  return (
    <div className={['space-y-2', className].filter(Boolean).join(' ')}>
      {label && <p className="text-sm font-medium text-text-secondary">{label}</p>}
      <div className="inline-flex rounded-full border border-border bg-surface p-1">
        {options.map((option) => {
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              className={[
                'h-8 rounded-full px-3 text-sm font-medium transition-colors duration-150',
                isActive
                  ? 'bg-neutral-950 text-white'
                  : 'text-text-secondary hover:bg-surface-sunken hover:text-text',
              ].join(' ')}
              aria-pressed={isActive}
              onClick={() => onChange?.(option.value)}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
