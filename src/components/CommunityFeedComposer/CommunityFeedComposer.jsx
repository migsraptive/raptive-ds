import { Plus } from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { Button } from '../Button/Button.jsx'

export function CommunityFeedComposer({
  className = '',
  authorName = 'Culture Crave',
  authorAvatarSrc,
  placeholder = "What's on your mind?",
  actionLabel = 'Post',
  onAction,
}) {
  return (
    <div
      className={[
        'flex items-center gap-5 overflow-hidden rounded-xl border border-border-strong bg-white p-4 shadow-xs',
        className,
      ].join(' ')}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <Avatar name={authorName} src={authorAvatarSrc} size="md" />
        <button
          type="button"
          className="flex h-11 min-w-0 flex-1 items-center rounded-2xl border border-text-placeholder bg-surface-sunken px-6 text-left text-body tracking-sm text-text-tertiary"
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
