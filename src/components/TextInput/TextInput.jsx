import { forwardRef } from 'react'
import { FieldShell } from '../FormField/FieldShell.jsx'
import { FormField } from '../FormField/FormField.jsx'

const baseInputClassName = [
  'w-full appearance-none bg-transparent px-0',
  'text-base text-text placeholder:text-text-tertiary',
  'transition-colors duration-150 disabled:opacity-100',
  'outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
  'disabled:cursor-not-allowed disabled:text-text-disabled',
].join(' ')

export const TextInput = forwardRef(function TextInput(
  {
    id,
    label,
    description,
    error,
    required = false,
    optional = false,
    type = 'text',
    className = '',
    inputClassName = '',
    prefix = null,
    suffix = null,
    ...props
  },
  ref,
) {
  const hasError = Boolean(error)
  const isDisabled = Boolean(props.disabled)
  const isReadOnly = Boolean(props.readOnly)
  const affixClassName = [
    'flex-shrink-0 text-sm',
    isDisabled ? 'text-text-disabled' : 'text-text-secondary',
  ].join(' ')

  const input = (
    <FieldShell error={hasError} disabled={isDisabled} readOnly={isReadOnly}>
      {prefix && <span className={affixClassName}>{prefix}</span>}
      <input
        ref={ref}
        id={id}
        type={type}
        className={[
          baseInputClassName,
          'h-auto border-0 bg-transparent px-0 shadow-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0',
          isReadOnly && !isDisabled ? 'text-text-secondary' : '',
          inputClassName,
        ].filter(Boolean).join(' ')}
        {...props}
      />
      {suffix && <span className={affixClassName}>{suffix}</span>}
    </FieldShell>
  )

  if (!label && !description && !error && !required && !optional) {
    return <div className={className}>{input}</div>
  }

  return (
    <FormField
      id={id}
      label={label}
      description={description}
      error={error}
      required={required}
      optional={optional}
      className={className}
    >
      {input}
    </FormField>
  )
})
