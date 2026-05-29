import { CommunityFeedComposer } from '../CommunityFeedComposer/CommunityFeedComposer.jsx'
import { CommunitySidebar } from '../CommunitySidebar/CommunitySidebar.jsx'
import { CommunityTopNavigation } from '../CommunityTopNavigation/CommunityTopNavigation.jsx'
import { FeedPost } from '../FeedPost/FeedPost.jsx'
import { RightRailWelcomeCard } from '../RightRailWelcomeCard/RightRailWelcomeCard.jsx'
import { RightRailCommunityRulesCard } from '../RightRailCommunityRulesCard/RightRailCommunityRulesCard.jsx'

const homeFeedPosts = [
  {
    author: {
      name: 'Culture Crave',
      avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
      badges: [{ variant: 'superfan', label: 'Superfan' }],
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
        alt: 'Salad bowl on a table',
      },
    ],
    title: 'What are your favorite high-protein lunches this week?',
    body: 'I am trying to break out of my usual rotation and would love ideas that still feel realistic on a workday. Bonus points if they hold up well for leftovers.',
    reactionCount: 31,
    shareCount: 13,
    commentCount: 12,
    commentAvatarName: 'Culture Crave',
  },
  {
    author: {
      name: 'Nicole PM',
      avatarSrc: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=128&q=80',
      badges: [{ variant: 'leader', label: 'Community Leader' }],
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80',
        alt: 'Breakfast spread with eggs and toast',
      },
    ],
    title: 'Meal prep win: sheet-pan breakfast sandwiches',
    body: 'Made a batch on Sunday and froze the extras. Reheated one this morning and it actually stayed crisp. Posting the steps below in case anyone wants the shortcut version.',
    reactionCount: 18,
    shareCount: 4,
    commentCount: 7,
    commentAvatarName: 'Nicole PM',
  },
  {
    author: {
      name: 'Brynne B',
      avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&q=80',
    },
    title: 'Question for the group',
    body: 'When you are introducing a new dinner into the family rotation, do you test it as written first or do you adapt it right away for your household?',
    reactionCount: 9,
    shareCount: 2,
    commentCount: 15,
    commentAvatarName: 'Brynne B',
  },
]

export function HomeFeedPageTemplate({
  className = '',
  brandName = 'Culture Crave',
  audienceLabel = '20k readers',
  onlineCount = '117',
  selectedCommunity = 'Culture Crave',
  posts = homeFeedPosts,
  rightRail = {},
  mode = 'default',
}) {
  const welcomeTitle = rightRail.title ?? `Welcome to the ${brandName} Community!`
  const isPreview = mode === 'preview'
  const visiblePosts = isPreview ? posts.slice(0, 1) : posts
  // no token available: home-feed mock renders a fixed desktop artboard for scaled previews.
  const frameClassName = isPreview
    ? 'h-[1024px] w-[1440px] overflow-hidden bg-gradient-to-br from-brand-subtle via-white to-gamification-purple-bg'
    : 'h-[1024px] w-[1440px] overflow-hidden rounded-xl border border-border-strong bg-gradient-to-br from-brand-subtle via-white to-gamification-purple-bg'

  return (
    <div className={[frameClassName, className].join(' ')}>
      <CommunityTopNavigation
        className="rounded-none"
        brandName={brandName}
        audienceLabel={audienceLabel}
        onlineCount={onlineCount}
      />

      {/* no token available: fixed artboard grid mirrors the Discourse desktop layout proportions. */}
      <div className="grid h-[calc(1024px-57px)] grid-cols-[352px_minmax(0,1fr)_340px] gap-8 overflow-hidden">
        <div className="min-w-0 self-stretch pt-px">
          {/* no token available: sidebar height compensates for the one-pixel nav divider. */}
          <CommunitySidebar
            className="h-[calc(100%-1px)] rounded-none border-0 border-r border-border-strong bg-white shadow-none"
            compact={isPreview}
            selectedCommunity={selectedCommunity}
          />
        </div>

        <main className="min-w-0 py-6">
          <div className="flex w-full flex-col gap-6">
            <CommunityFeedComposer
              authorName={brandName}
              authorAvatarSrc={posts[0]?.author?.avatarSrc}
              actionLabel="Post"
            />
            {visiblePosts.map((post) => (
              <FeedPost
                key={`${post.author.name}-${post.title}`}
                author={post.author}
                images={post.images}
                title={post.title}
                body={post.body}
                reactionCount={post.reactionCount}
                shareCount={post.shareCount}
                commentCount={post.commentCount}
                commentAvatarName={post.commentAvatarName}
                onMore={() => {}}
                onReact={() => {}}
                onShare={() => {}}
                onComment={() => {}}
              />
            ))}
          </div>
        </main>

        <aside className="min-w-0 py-6 pr-4">
          <div className="flex flex-col gap-4">
            <RightRailWelcomeCard
              creatorName={brandName}
              title={welcomeTitle}
              description={rightRail.description}
              highlight={rightRail.highlight}
              closing={rightRail.closing}
              readerCount={rightRail.readerCount ?? audienceLabel.replace(/\s*readers?$/i, '')}
              onlineCount={onlineCount}
              primaryLabel={rightRail.primaryLabel}
            />
            <RightRailCommunityRulesCard />
          </div>
        </aside>
      </div>
    </div>
  )
}
