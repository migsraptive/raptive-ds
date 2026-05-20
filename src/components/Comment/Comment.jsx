import { Heart, Send, Ellipsis, SmilePlus } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { StreakBadge } from '../StreakBadge/StreakBadge.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

/**
 * Comment
 * Threaded comment with avatar, author badges, body, and action bar.
 * Maps to Figma: organisms/comment/post
 */

export function Comment({
  authorName = '',
  username = '',
  timestamp = '',
  avatarSrc,
  body = '',
  badges = [],
  isAuthor = false,
  reactionCount = 0,
  shareCount = 0,
  showReply = true,
  onReact,
  onShare,
  onReply,
  onMore,
  className = '',
}) {
  return (
    <div className={['flex flex-col items-start py-1 w-full', className].join(' ')}>
      {/* Main row */}
      <div className="flex gap-2 items-start pt-1 px-4 w-full">
        {/* Avatar + thread line */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <Avatar src={avatarSrc} name={authorName} size="sm" status="online" />
        </div>

        {/* Content bubble — grey container */}
        <div className="flex flex-col items-start flex-1 min-w-0 bg-surface-sunken rounded-xs px-2 py-1">
          {/* Author header */}
          <div className="flex items-center gap-0.5 w-full">
            <span className="text-xs font-bold leading-none text-text whitespace-nowrap">
              {authorName}
            </span>
            <span className="text-xs font-medium leading-none text-text-secondary truncate flex-1 min-w-0">
              {username && `@${username}`}{timestamp && ` · ${timestamp}`}
            </span>
            {onMore && (
              <button
                type="button"
                onClick={onMore}
                aria-label="More comment options"
                className="shrink-0 flex items-center justify-center w-4 h-4 hover:opacity-70 transition-opacity"
              >
                <LucideIcon icon={Ellipsis} size="xs" className="text-text-tertiary" />
              </button>
            )}
          </div>

          {/* Badges */}
          {(isAuthor || badges.length > 0) && (
            <div className="flex items-center gap-1 w-full mt-0.5">
              {isAuthor && (
                <span className="inline-flex h-4 items-center whitespace-nowrap rounded-xs bg-neutral-900 px-1 text-2xs font-bold leading-none text-white">
                  Author
                </span>
              )}
              {badges.map((badge) => (
                <StreakBadge
                  key={badge.variant}
                  variant={badge.variant}
                  label={badge.label}
                />
              ))}
            </div>
          )}

          {/* Body */}
          {body && (
            <p className="text-sm font-normal leading-md tracking-tight text-text w-full py-1">
              {body}
            </p>
          )}
        </div>
      </div>

      {/* Action bar */}
      <div className="flex items-center pl-14 pr-2 w-full">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {reactionCount > 0 && (
            <div className="flex items-center gap-1">
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-50 border border-white p-0.5">
                <LucideIcon icon={Heart} size="xs" className="paired-label-icon text-xs leading-none text-red-500" />
              </div>
              <span className="text-xs font-bold leading-none text-text">{reactionCount}</span>
            </div>
          )}
        </div>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onReact}
            aria-label="React to comment"
            className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-surface-sunken transition-colors"
          >
            <LucideIcon icon={SmilePlus} size="sm" className="text-text-tertiary" />
          </button>

          {shareCount > 0 && (
            <button
              type="button"
              onClick={onShare}
              aria-label="Share comment"
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-surface-sunken transition-colors"
            >
              <LucideIcon icon={Send} size="xs" className="paired-label-icon text-xs leading-none text-text" />
              <span className="text-xs font-bold leading-none text-text">{shareCount}</span>
            </button>
          )}

          {showReply && (
            <button
              type="button"
              onClick={onReply}
              className="flex items-center px-3 py-1 rounded-full hover:bg-surface-sunken transition-colors"
            >
              <span className="text-xs font-bold leading-none text-text">Reply</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
