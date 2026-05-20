import { forwardRef, useId, useMemo, useState } from 'react'
import { CircleAlert as AlertCircle, Globe, Link2 } from 'lucide-react'
import FacebookIcon from '@/assets/social/facebook.svg?react'
import InstagramIcon from '@/assets/social/instagram.svg?react'
import PinterestIcon from '@/assets/social/pinterest.svg?react'
import SubstackIcon from '@/assets/social/substack.svg?react'
import TikTokIcon from '@/assets/social/tiktok.svg?react'
import YouTubeIcon from '@/assets/social/youtube.svg?react'
import { LucideIcon } from '../Icon/LucideIcon.jsx'
import { TextInput } from '../TextInput/TextInput.jsx'

const platformIcon = (Icon, className = '') => <LucideIcon icon={Icon} size="md" stroke="display" className={className} />

function BrandSvgIcon({ src, label }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      data-platform-icon={label}
      className="h-full w-full object-contain"
      loading="eager"
      decoding="async"
    />
  )
}

const brandAssetIcon = (src, label) => <BrandSvgIcon src={src} label={label} />

const socialPlatforms = [
  {
    id: 'instagram',
    label: 'Instagram',
    domain: 'instagram.com',
    icon: brandAssetIcon(InstagramIcon, 'Instagram'),
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    domain: 'tiktok.com',
    icon: brandAssetIcon(TikTokIcon, 'TikTok'),
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    domain: 'pinterest.com',
    icon: brandAssetIcon(PinterestIcon, 'Pinterest'),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    domain: 'youtube.com',
    icon: brandAssetIcon(YouTubeIcon, 'YouTube'),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    domain: 'facebook.com',
    icon: brandAssetIcon(FacebookIcon, 'Facebook'),
  },
  {
    id: 'substack',
    label: 'Substack',
    domain: 'substack.com',
    icon: brandAssetIcon(SubstackIcon, 'Substack'),
  },
]

function normalizeHost(value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) return ''

  try {
    const url = new URL(/^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`)
    return url.hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

function hostMatchesDomain(host, domain) {
  return host === domain || host.endsWith(`.${domain}`)
}

function hasRecognizableUrlDomain(value) {
  const host = normalizeHost(value)

  if (!host || !host.includes('.')) return false

  const domainParts = host.split('.')
  const topLevelDomain = domainParts.at(-1)

  if (!topLevelDomain || topLevelDomain.length < 2) return false

  return domainParts.every((part) => (
    /^[a-z0-9-]+$/i.test(part)
    && !part.startsWith('-')
    && !part.endsWith('-')
  ))
}

export function detectSocialUrlPlatform(value) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return { id: 'empty', label: 'Link', icon: platformIcon(Link2) }
  }

  const host = normalizeHost(trimmedValue)
  const platform = socialPlatforms.find((item) => hostMatchesDomain(host, item.domain))

  if (platform) {
    return platform
  }

  if (/^(https?:\/\/|www\.)/i.test(trimmedValue)) {
    return { id: 'url', label: 'Website', icon: platformIcon(Globe) }
  }

  return { id: 'empty', label: 'Link', icon: platformIcon(Link2) }
}

export const SocialUrlInput = forwardRef(function SocialUrlInput(
  {
    value,
    defaultValue = '',
    id,
    onChange,
    onBlur,
    error: externalError,
    affixLineHeight = 'md',
    inputClassName = '',
    ...props
  },
  ref,
) {
  const isControlled = value != null
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [internalValue, setInternalValue] = useState(defaultValue)
  const [hasValidationError, setHasValidationError] = useState(false)
  const inputValue = isControlled ? value : internalValue
  const platform = useMemo(() => detectSocialUrlPlatform(inputValue), [inputValue])
  const error = hasValidationError ? 'Please enter a valid URL' : externalError
  const prefix = error ? platformIcon(AlertCircle, 'text-status-error') : platform.icon

  const handleChange = (event) => {
    if (hasValidationError) {
      setHasValidationError(false)
    }

    if (!isControlled) {
      setInternalValue(event.target.value)
    }

    onChange?.(event)
  }

  const handleBlur = (event) => {
    const trimmedValue = event.target.value.trim()

    setHasValidationError(Boolean(trimmedValue) && !hasRecognizableUrlDomain(trimmedValue))
    onBlur?.(event)
  }

  return (
    <TextInput
      ref={ref}
      id={inputId}
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      prefix={prefix}
      error={error}
      affixLineHeight={affixLineHeight}
      inputClassName={inputClassName}
      aria-label={props.label ? undefined : 'Social URL'}
      {...props}
    />
  )
})
