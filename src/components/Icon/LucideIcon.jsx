const sizes = {
  xs: 'h-2.5 w-2.5',
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-9 w-9',
}

const strokes = {
  standard: 2,
  display: 1.75,
  strong: 2.25,
}

export function LucideIcon({
  icon: Icon,
  size = 'md',
  stroke = 'standard',
  className = '',
  ...props
}) {
  return (
    <Icon
      className={[sizes[size], className].filter(Boolean).join(' ')}
      aria-hidden="true"
      strokeWidth={strokes[stroke]}
      {...props}
    />
  )
}
