import { getAccessibleColorPair } from '../../utils/colorContrast.js'

export function ColorSwatchButton({
  color,
  selected = false,
  onClick,
  label = color,
  size = 'md',
  className = '',
}) {
  const colorPair = getAccessibleColorPair(color)
  const sizeClassName = size === 'sm'
    ? 'h-10 rounded-lg p-1.5'
    : 'h-16 rounded-xl p-2'

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative flex w-full items-end border text-left shadow-xs transition-[background-color,border-color] duration-150',
        sizeClassName,
        selected ? 'border-text shadow-sm ring-2 ring-brand-subtle' : 'border-border hover:border-border-strong',
        className,
      ].filter(Boolean).join(' ')}
      style={{ backgroundColor: colorPair.background }}
      aria-label={`Select ${label}`}
      aria-pressed={selected}
    >
      <span
        className="rounded px-1.5 py-0.5 text-2xs font-mono font-semibold leading-none"
        style={{ color: colorPair.foreground }}
      >
        {label}
      </span>
    </button>
  )
}
