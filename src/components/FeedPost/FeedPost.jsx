import { AuthorRow } from '../AuthorRow/AuthorRow.jsx'
import { PostContent } from '../PostContent/PostContent.jsx'
import { PostActionBar } from '../PostActionBar/PostActionBar.jsx'

/**
 * FeedPost
 * Full post card composing AuthorRow, MediaGallery, PostContent, and PostActionBar.
 * Maps to Figma: organisms/posts/desktop/feed
 */

export function FeedPost({
  author = {},
  images = [],
  title,
  body,
  readMore,
  attachment,
  reactionCount = 0,
  shareCount = 0,
  commentCount = 0,
  topReactions = ['helpful', 'insightful', 'uplifting'],
  showCommentField = false,
  commentAvatarName,
  onReact,
  onShare,
  onComment,
  onMore,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col items-start bg-white border border-border-strong rounded-lg overflow-hidden shadow-xs',
        className,
      ].join(' ')}
    >
      {/* Author */}
      <AuthorRow
        name={author.name}
        avatarSrc={author.avatarSrc}
        badges={author.badges || []}
        showFriendsIcon={author.showFriendsIcon}
        onMore={onMore}
      />

      {/* Media */}
      {images.length > 0 && (
        <div className="w-full aspect-square relative overflow-hidden">
          <img
            src={images[0].src}
            alt={images[0].alt || ''}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <PostContent
        title={title}
        body={body}
        readMore={readMore}
        attachment={attachment}
        showTitle={!!title}
      />

      {/* Action Bar */}
      <PostActionBar
        reactionCount={reactionCount}
        shareCount={shareCount}
        commentCount={commentCount}
        topReactions={topReactions}
        showCommentField={showCommentField}
        commentAvatarName={commentAvatarName}
        onReact={onReact}
        onShare={onShare}
        onComment={onComment}
      />
    </div>
  )
}
