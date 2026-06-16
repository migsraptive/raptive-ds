import logoUrl from '../../assets/raptive-community.svg'

const sizes = {
  sm: 'h-6 w-auto',
  md: 'h-7 w-auto',
  lg: 'h-8 w-auto',
}

export const brandLogoVariants = Object.freeze(['default'])
export const brandLogoSizes = Object.freeze(['sm', 'md', 'lg'])

export function BrandLogo({
  size = 'md',
  className = '',
  alt = 'Raptive Community',
}) {
  return (
    <img
      src={logoUrl}
      alt={alt}
      className={[sizes[size], 'block shrink-0 object-contain', className].filter(Boolean).join(' ')}
      loading="eager"
      decoding="async"
      data-ds-component="BrandLogo"
      data-ds-variant="default"
      data-ds-size={size}
    />
  )
}
