import { forwardRef, useId } from 'react'
import { colors } from '../../tokens/index.js'
import { brandPreviewDefaults } from '../../utils/brandPreviewDefaults.js'
import { getAccessibleColorPair, normalizeHexColor } from '../../utils/colorContrast.js'
import { FieldHelperText } from '../FormField/FormField.jsx'

export const ColorInput = forwardRef(function ColorInput(
  {
    id,
    label,
    description,
    value,
    onChange,
    layout = 'stack',
    fallbackColor = brandPreviewDefaults.brand,
    className = '',
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? `color-${generatedId}`
  const normalizedColor = normalizeHexColor(value)
  const normalizedFallbackColor = normalizeHexColor(fallbackColor) ?? brandPreviewDefaults.brand
  const displayValue = normalizedColor ?? value ?? ''
  const hasValue = typeof value === 'string' && value.trim().length > 0
  const hasError = hasValue && !normalizedColor
  const descriptionId = (description || hasError) ? `${inputId}-description` : undefined
  const colorPair = getAccessibleColorPair(normalizedColor ?? normalizedFallbackColor)
  const foregroundOption = colorPair.foregroundOptions.find((option) => option.color === colorPair.foreground)
  const alternateForegroundOption = colorPair.foregroundOptions.find((option) => option.color !== colorPair.foreground)
  const foregroundLabel = foregroundOption?.label ?? (colorPair.foreground === colors.surface.invert ? 'Black text' : 'White text')
  const largeTextAlternative = alternateForegroundOption?.passesLargeText && !alternateForegroundOption.passesNormalText
    ? ` · ${alternateForegroundOption.label.replace(' text', '')} OK large`
    : ''
  const helperText = hasError
    ? 'Enter a valid hex color.'
    : `${foregroundLabel} · ${colorPair.contrast.toFixed(1)}:1${largeTextAlternative}`

  const handleValueChange = (nextValue) => {
    onChange?.(nextValue)
  }

  const isCompact = layout === 'compact'
  const swatchStyle = { backgroundColor: normalizedColor ?? normalizedFallbackColor }

  return (
    <div
      className={[
        // no token available: compact editor labels use a fixed rail to keep fields aligned.
        isCompact ? 'grid grid-cols-[92px_minmax(0,1fr)] items-start gap-x-3 gap-y-2' : 'flex flex-col gap-2',
        className,
      ].filter(Boolean).join(' ')}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={isCompact ? 'pt-2 text-sm font-medium text-text-secondary' : 'text-sm font-medium text-text'}
        >
          {label}
        </label>
      )}

      <div
        className={[
          'flex items-center overflow-hidden rounded-lg bg-surface-sunken transition-colors duration-150 focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2',
          isCompact ? 'h-10' : 'h-11',
          hasError ? 'ring-1 ring-status-error' : '',
        ].filter(Boolean).join(' ')}
      >
        <label
          className="relative ml-2 flex h-6 w-6 flex-shrink-0 cursor-pointer overflow-hidden rounded-xs border border-border"
          style={swatchStyle}
        >
          <input
            type="color"
            value={normalizedColor ?? normalizedFallbackColor}
            onChange={(event) => handleValueChange(event.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer appearance-none border-0 bg-transparent p-0 opacity-0"
            aria-label={`${label ?? 'Color'} picker`}
          />
        </label>
        <input
          ref={ref}
          id={inputId}
          type="text"
          value={displayValue.replace('#', '').toUpperCase()}
          onChange={(event) => handleValueChange(event.target.value)}
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent pl-2 pr-3 font-sans text-sm text-text outline-none focus:outline-none focus-visible:ring-0"
          aria-label={`${label ?? 'Color'} hex code`}
          aria-describedby={descriptionId}
          spellCheck="false"
          inputMode="text"
          placeholder={normalizedFallbackColor.replace('#', '').toUpperCase()}
          {...props}
        />
        <span className="h-full w-px flex-shrink-0 bg-white" aria-hidden="true" />
        <span className={['flex-shrink-0 whitespace-nowrap text-xs text-text-secondary', isCompact ? 'px-2' : 'px-3'].join(' ')}>
          {helperText}
        </span>
      </div>

      <FieldHelperText
        id={descriptionId}
        tone={hasError ? 'error' : 'default'}
        className={isCompact ? 'col-start-2' : ''}
      >
        {hasError ? 'Enter a valid hex color.' : description}
      </FieldHelperText>
    </div>
  )
})
