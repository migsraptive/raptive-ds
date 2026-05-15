import { Check } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

export function Checkbox({
  id,
  label,
  description,
  checked = false,
  disabled = false,
  onChange,
  className = '',
}) {
  return (
    <label
      htmlFor={id}
      className={[
        'flex items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors duration-150',
        disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-surface-raised',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="relative mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className={[
          'flex h-5 w-5 items-center justify-center rounded-md peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2',
          checked ? 'border border-brand bg-brand' : 'border border-border bg-surface',
        ].join(' ')}>
          <span className={['text-white transition-opacity', checked ? 'opacity-100' : 'opacity-0'].join(' ')}>
            <LucideIcon icon={Check} size="sm" stroke="strong" />
          </span>
        </span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-sm font-medium text-text">{label}</span>
        {description && <span className="text-sm text-text-secondary">{description}</span>}
      </span>
    </label>
  )
}
