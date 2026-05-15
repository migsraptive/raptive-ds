export function RadioGroup({
  name,
  label,
  description,
  options = [],
  value,
  onChange,
  className = '',
}) {
  return (
    <fieldset className={['space-y-3', className].filter(Boolean).join(' ')}>
      {(label || description) && (
        <legend className="mb-2 space-y-1">
          {label && <span className="block text-sm font-medium text-text">{label}</span>}
          {description && <span className="block text-sm text-text-secondary">{description}</span>}
        </legend>
      )}
      <div className="space-y-2">
        {options.map((option) => {
          const checked = value === option.value
          return (
            <label
              key={option.value}
              className={[
                'flex items-start gap-3 rounded-2xl border px-4 py-3 transition-colors duration-150',
                checked ? 'border-brand bg-brand-subtle' : 'border-border bg-surface hover:bg-surface-raised',
                option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              ].join(' ')}
            >
              <span className="relative mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={checked}
                  disabled={option.disabled}
                  onChange={() => onChange?.(option.value)}
                  className="peer sr-only"
                />
                <span className={[
                  'flex h-5 w-5 items-center justify-center rounded-full bg-surface peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2',
                  checked ? 'border border-brand' : 'border border-border',
                ].join(' ')}>
                  <span className={['transition-opacity', checked ? 'opacity-100' : 'opacity-0'].join(' ')}>
                    <span className="block h-2.5 w-2.5 rounded-full bg-brand" />
                  </span>
                </span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-sm font-medium text-text">{option.label}</span>
                {option.description && <span className="text-sm text-text-secondary">{option.description}</span>}
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
