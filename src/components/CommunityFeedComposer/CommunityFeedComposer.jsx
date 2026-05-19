import { Plus } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { Button } from '../Button/Button.jsx'

export function CommunityFeedComposer({
  className = '',
  authorName = 'Julia Child',
  authorAvatarSrc,
  placeholder = "What's on your mind?",
  actionLabel = 'Post',
  onAction,
}) {
  return (
    <div
      className={[
        'flex items-center gap-5 overflow-hidden rounded-lg border border-border-strong bg-white p-4 shadow-xs',
        className,
      ].join(' ')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Avatar name={authorName} src={authorAvatarSrc} size="md" />
        <button
          type="button"
          className="flex h-11 min-w-0 flex-1 items-center rounded-[32px] border border-text-placeholder bg-[#f8f8f9] px-6 text-left text-[15px] tracking-[-0.2px] text-text-tertiary"
        >
          <span className="truncate">{placeholder}</span>
        </button>
      </div>

      <Button
        variant="primary"
        className="h-11 gap-1 rounded-full px-4"
        iconBefore={<Plus className="h-4 w-4" />}
        onClick={onAction}
      >
        {actionLabel}
      </Button>
    </div>
  )
}
