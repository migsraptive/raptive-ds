export function FieldShell({
  children,
  error = false,
  disabled = false,
  readOnly = false,
  className = '',
}) {
  return (
    <div
      className={[
        'flex h-11 items-center gap-3 rounded-full border px-4 shadow-xs transition-colors duration-150',
        error
          ? 'border-status-error focus-within:ring-2 focus-within:ring-status-error focus-within:ring-offset-2'
          : 'border-border focus-within:border-brand focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2',
        disabled ? 'bg-surface-sunken' : '',
        readOnly && !disabled ? 'bg-surface-raised' : '',
        !disabled && !readOnly ? 'bg-surface' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
