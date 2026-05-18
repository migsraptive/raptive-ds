import { Users, Ellipsis } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'
import { StreakBadge } from '../StreakBadge/StreakBadge.jsx'

/**
 * AuthorRow
 * Community member row showing avatar, name, role badges, and actions.
 * Maps to Figma: molecules/rows/author
 */

export function AuthorRow({
  name = '',
  avatarSrc,
  badges = [],
  showFriendsIcon = false,
  onMore,
  className = '',
}) {
  return (
    <div
      className={[
        'flex items-center gap-2 bg-white px-4 py-2 w-full rounded-xs',
        className,
      ].join(' ')}
    >
      <Avatar src={avatarSrc} name={name} size="md" />

      <div className="flex flex-col justify-center min-w-0 flex-1">
        <div className="flex items-center gap-[3px]">
          <span className="text-body font-bold leading-md tracking-tight text-text whitespace-nowrap">
            {name}
          </span>
          {showFriendsIcon && (
            <LucideIcon icon={Users} size="xs" className="text-text-secondary shrink-0" />
          )}
        </div>

        {badges.length > 0 && (
          <div className="flex items-center gap-1">
            {badges.map((badge) => (
              <StreakBadge
                key={badge.variant}
                variant={badge.variant}
                label={badge.label}
              />
            ))}
          </div>
        )}
      </div>

      {onMore && (
        <button
          type="button"
          onClick={onMore}
          className="shrink-0 flex items-center justify-center p-1 rounded-full hover:bg-surface-sunken transition-colors"
          aria-label="More options"
        >
          <LucideIcon icon={Ellipsis} size="md" className="text-text-secondary" />
        </button>
      )}
    </div>
  )
}
