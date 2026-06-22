export const selectableRowVariants = Object.freeze(['default'])
export const selectableRowSizes = Object.freeze(['sm'])

export function SelectableRow({
  title,
  description = null,
  icon = null,
  selected = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left transition-colors duration-150',
        selected
          ? 'border-brand bg-brand-subtle'
          : 'border-border bg-surface hover:bg-surface-sunken',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
      data-ds-component="SelectableRow"
      data-ds-variant="default"
      data-ds-size="sm"
      {...props}
    >
      {icon ? (
        <span
          className={[
            'mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md',
            selected ? 'bg-surface text-brand-dark' : 'bg-surface-sunken text-text-secondary',
          ].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 space-y-0.5">
        <span className="block text-sm font-semibold text-text">{title}</span>
        {description ? (
          <span className="block text-xs leading-snug text-text-secondary">{description}</span>
        ) : null}
      </span>
    </button>
  )
}
