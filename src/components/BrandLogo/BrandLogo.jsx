import logoUrl from '../../assets/raptive-community.svg'

const sizes = {
  sm: 'h-[22px] w-auto',
  md: 'h-[26px] w-auto',
  lg: 'h-[30px] w-auto',
}

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
    />
  )
}
