/**
 * Avatar
 * Sizes: xs (24) | sm (32) | md (40) | lg (48) | xl (64) | 2xl (80)
 * Variants: image | initials | fallback
 * Optional status dot and badge count
 */

const sizes = {
  xs:  { container: 'w-6 h-6',   text: 'text-2xs', status: 'w-1.5 h-1.5', ring: 'ring-1' },
  sm:  { container: 'w-8 h-8',   text: 'text-xs',  status: 'w-2 h-2',     ring: 'ring-1' },
  md:  { container: 'w-10 h-10', text: 'text-sm',  status: 'w-2.5 h-2.5', ring: 'ring-2' },
  lg:  { container: 'w-12 h-12', text: 'text-base', status: 'w-3 h-3',    ring: 'ring-2' },
  xl:  { container: 'w-16 h-16', text: 'text-lg',  status: 'w-3.5 h-3.5', ring: 'ring-2' },
  '2xl': { container: 'w-20 h-20', text: 'text-xl', status: 'w-4 h-4',    ring: 'ring-2' },
}

const statusColors = {
  online:  'bg-status-success ring-white',
  away:    'bg-status-warning ring-white',
  busy:    'bg-status-error ring-white',
  offline: 'bg-neutral-300 ring-white',
}

// Deterministic color from a name string — same name always gets same color
const avatarColors = [
  'bg-raptive-100 text-raptive-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-600',
  'bg-orange-100 text-orange-600',
  'bg-purple-100 text-purple-600',
  'bg-red-100 text-red-700',
]

function getColorFromName(name = '') {
  const idx = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return avatarColors[idx % avatarColors.length]
}

function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function Avatar({
  src,
  name = '',
  size = 'md',
  status = null,
  count = null,
  shape = 'circle',
  className = '',
}) {
  const s = sizes[size]
  const initials = getInitials(name)
  const colorClass = getColorFromName(name)
  const shapeClass = shape === 'square' ? 'rounded-lg' : 'rounded-full'

  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`}>
      <div
        className={[
          'flex items-center justify-center overflow-hidden',
          'font-semibold select-none',
          s.container,
          shapeClass,
          !src ? colorClass : 'bg-surface-sunken',
        ].join(' ')}
        aria-label={name || 'Avatar'}
        title={name}
      >
        {src ? (
          <img
            src={src}
            alt={name || 'User avatar'}
            className="w-full h-full object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <span className={`${s.text} leading-none`}>
            {initials || '?'}
          </span>
        )}
      </div>

      {/* Status dot */}
      {status && (
        <span
          className={[
            'absolute bottom-0 right-0 rounded-full',
            s.status,
            s.ring,
            statusColors[status],
          ].join(' ')}
          aria-label={`Status: ${status}`}
        />
      )}

      {/* Notification count badge */}
      {count != null && count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-status-error text-white text-2xs font-bold ring-2 ring-white leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </div>
  )
}

// ─── Avatar Group ───────────────────────────────────────────────────────────────

export function AvatarGroup({ avatars = [], max = 4, size = 'sm' }) {
  const visible = avatars.slice(0, max)
  const overflow = avatars.length - max

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((av, i) => (
        <Avatar
          key={av.name || i}
          {...av}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {overflow > 0 && (
        <div
          className={[
            'flex items-center justify-center rounded-full ring-2 ring-white',
            'bg-surface-sunken text-text-secondary font-semibold',
            sizes[size].container,
            sizes[size].text,
          ].join(' ')}
        >
          +{overflow}
        </div>
      )}
    </div>
  )
}
