const alignClasses = {
  left: 'justify-start text-left',
  center: 'justify-center text-center',
  right: 'justify-end text-right',
}

const toneClasses = {
  default: 'text-action-primary hover:text-action-primary-active active:text-action-primary-active',
  invert: 'text-text-invert hover:text-text-invert active:text-text-invert',
  current: 'text-current hover:text-current active:text-current',
}

export function TextLink({
  children,
  align = 'left',
  tone = 'default',
  underline = false,
  href,
  type = 'button',
  className = '',
  ...props
}) {
  const classes = [
    'inline-flex min-w-0 items-center bg-transparent p-0 font-bold underline-offset-2 transition-colors duration-150',
    'disabled:cursor-not-allowed disabled:opacity-40',
    alignClasses[align] ?? alignClasses.left,
    toneClasses[tone] ?? toneClasses.default,
    underline ? 'underline' : 'no-underline',
    className,
  ].filter(Boolean).join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
