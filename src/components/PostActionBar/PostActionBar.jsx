import { Heart, Lightbulb, Sun, Laugh, Send, MessageCircle, Image, ArrowRight, Sparkles, HandHeart } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

/**
 * PostActionBar
 * Post engagement bar with reaction summary, reaction buttons, optional AI prompt,
 * and comment composer.
 * Maps to Figma: molecules/actionbar/post/desktop/feed
 */

const reactionTypes = [
  { key: 'helpful', label: 'Helpful', icon: HandHeart, bg: 'bg-green-100' },
  { key: 'insightful', label: 'Insightful', icon: Lightbulb, bg: 'bg-yellow-100' },
  { key: 'uplifting', label: 'Uplifting', icon: Sun, bg: 'bg-orange-50' },
  { key: 'haha', label: 'Haha', icon: Laugh, bg: 'bg-yellow-50' },
  { key: 'like', label: 'Like', icon: Heart, bg: 'bg-red-50' },
]

export function PostActionBar({
  reactionCount = 0,
  shareCount = 0,
  commentCount = 0,
  topReactions = ['helpful', 'insightful', 'uplifting'],
  aiPrompt,
  showCommentField = true,
  commentAvatar,
  commentAvatarName,
  onReact,
  onShare,
  onComment,
  className = '',
}) {
  const topReactionItems = topReactions
    .map((key) => reactionTypes.find((r) => r.key === key))
    .filter(Boolean)

  return (
    <div
      className={[
        'flex flex-col items-start justify-center bg-white py-1 w-full',
        className,
      ].join(' ')}
    >
      {/* Reaction summary + share/comment counts */}
      <div className="flex items-center gap-1 px-4 py-1 w-full">
        <div className="flex items-center gap-1 flex-1 min-w-0">
          {/* Stacked reaction icons */}
          <div className="flex items-center">
            {topReactionItems.map((reaction, i) => (
              <div
                key={reaction.key}
                className={[
                  'flex items-center justify-center w-5 h-5 rounded-full border border-white p-0.5',
                  reaction.bg,
                  i > 0 ? '-ml-0.5' : '',
                ].join(' ')}
              >
                <LucideIcon icon={reaction.icon} size="xs" className="paired-label-icon text-xs leading-none text-text" />
              </div>
            ))}
          </div>
          {reactionCount > 0 && (
            <span className="text-xs font-bold leading-none text-text whitespace-nowrap">
              {reactionCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {shareCount > 0 && (
            <button
              type="button"
              onClick={onShare}
              aria-label="Share post"
              className="flex items-center gap-1 px-2 py-1 rounded-full hover:bg-surface-sunken transition-colors"
            >
              <LucideIcon icon={Send} size="sm" className="paired-label-icon text-xs leading-none text-text" />
              <span className="text-xs font-bold leading-none text-text">{shareCount}</span>
            </button>
          )}
          {commentCount > 0 && (
            <button
              type="button"
              onClick={onComment}
              aria-label="View post comments"
              className="flex items-center gap-1 pl-3 pr-1 py-1 rounded-full border border-border-strong hover:bg-surface-sunken transition-colors"
            >
              <LucideIcon icon={MessageCircle} size="sm" className="paired-label-icon text-xs leading-none text-text" />
              <span className="text-xs font-bold leading-none text-text">{commentCount}</span>
            </button>
          )}
        </div>
      </div>

      {/* Reaction buttons */}
      <div className="flex items-center gap-2 px-4 py-2 w-full">
        {reactionTypes.map((reaction) => (
          <button
            key={reaction.key}
            type="button"
            onClick={() => onReact?.(reaction.key)}
            className="flex flex-1 items-center justify-center gap-0.5 h-8 px-2 py-1 rounded-full border border-border-strong bg-white hover:bg-surface-sunken transition-colors min-w-0"
          >
            <LucideIcon icon={reaction.icon} size="sm" className="paired-label-icon text-2xs leading-none text-text-secondary" />
            <span className="text-2xs font-bold leading-none text-text-secondary whitespace-nowrap">
              {reaction.label}
            </span>
          </button>
        ))}
      </div>

      {/* AI prompt */}
      {aiPrompt && (
        <div className="flex items-center justify-center px-4 py-1 w-full">
          <div className="flex items-center gap-2.5 flex-1 px-3 py-2 bg-brand-subtle border border-brand-muted rounded-xs">
            <LucideIcon icon={Sparkles} size="sm" className="paired-label-icon text-sm leading-sm text-brand" />
            <p className="text-sm text-brand flex-1 min-w-0">
              {aiPrompt}
            </p>
          </div>
        </div>
      )}

      {/* Comment field */}
      {showCommentField && (
        <div className="flex items-center gap-2 px-4 py-2 w-full">
          <Avatar src={commentAvatar} name={commentAvatarName || ''} size="md" />
          <div className="flex items-center flex-1 min-w-0 h-10 bg-surface-sunken rounded-3xl pl-4 pr-1">
            <div className="flex-1 min-w-0">
              <p className="text-body leading-md text-text-secondary tracking-tight">
                Leave a comment....
              </p>
            </div>
            <div className="flex items-center gap-2.5 pr-1 shrink-0">
              <button type="button" aria-label="Open image upload" className="flex items-center justify-center w-6 h-6 hover:opacity-70 transition-opacity">
                <LucideIcon icon={Image} size="sm" className="text-text-tertiary" />
              </button>
              <button type="button" aria-label="Send comment" className="flex items-center justify-center w-6 h-6 rounded-full bg-neutral-400 hover:bg-neutral-500 transition-colors">
                <LucideIcon icon={ArrowRight} size="sm" className="text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
