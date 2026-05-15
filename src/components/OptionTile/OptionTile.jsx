import { Check } from 'lucide-react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

export function OptionTile({
  title,
  description,
  icon = null,
  selected = false,
  disabled = false,
  multiSelect = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={multiSelect ? selected : undefined}
      className={[
        'relative flex min-h-[132px] w-full flex-col items-start gap-3 rounded-3xl border px-5 py-4 text-left transition-all duration-150',
        selected
          ? 'border-brand bg-brand-subtle shadow-brand-glow'
          : 'border-border bg-surface hover:border-border-strong hover:bg-surface-raised',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="flex w-full items-start justify-between gap-3">
        {icon ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface-raised text-xl">
            {icon}
          </span>
        ) : <span />}
        <span className={[
          'flex h-6 w-6 items-center justify-center rounded-full border',
          selected ? 'border-brand bg-brand text-white' : 'border-border bg-surface text-transparent',
        ].join(' ')}>
          <LucideIcon icon={Check} size="sm" stroke="strong" />
        </span>
      </span>
      <span className="space-y-1">
        <span className="block text-base font-medium text-text">{title}</span>
        {description && <span className="block text-sm text-text-secondary">{description}</span>}
      </span>
    </button>
  )
}
