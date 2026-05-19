import previewIllustrationUrl from '../../assets/preview-illustration.png'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { HomeFeedPageTemplate } from '../../components/HomeFeedPageTemplate/HomeFeedPageTemplate.jsx'

export function CommunityPreviewCard({
  eyebrow = 'Preview',
  title,
  description,
  progressMeter = null,
  creator,
  categories = [],
  stats = [],
  posts = [],
  showAside = true,
  primaryAction = { label: 'This feels right' },
  secondaryAction = { label: 'Edit details', variant: 'ghost' },
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}

            <div className="space-y-4">
              <Badge variant="gold" size="sm">{eyebrow}</Badge>
              <div className="space-y-3">
                <h2 className="max-w-2xl text-4xl font-semibold tracking-tight text-text">
                  {title}
                </h2>
                {description && (
                  <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="relative h-[451px] w-[634px] overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
              <div
                className="absolute left-0 top-0"
                style={{
                  width: '1440px',
                  height: '1024px',
                  transform: 'scale(0.44)',
                  transformOrigin: 'top left',
                }}
              >
                <HomeFeedPageTemplate
                  brandName={creator.name}
                  audienceLabel={stats.find((stat) => stat.label === 'Early members')?.value ? `${stats.find((stat) => stat.label === 'Early members')?.value} members` : '186 members'}
                  onlineCount="117"
                  selectedCommunity={creator.name}
                  mode="preview"
                  posts={posts.map((post, index) => ({
                    author: {
                      name: post.author,
                      badges: index === 0 ? [{ variant: 'superfan', label: 'Superfan' }] : [],
                    },
                    images: index === 0 ? [{
                      src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
                      alt: 'Community preview food post',
                    }] : [],
                    title: post.title,
                    body: post.excerpt,
                    reactionCount: index === 0 ? 31 : 18,
                    shareCount: index === 0 ? 13 : 4,
                    commentCount: index === 0 ? 12 : 18,
                    commentAvatarName: post.author,
                  }))}
                  rightRail={{
                    title: `Welcome to the ${creator.name} Community!`,
                    description: creator.summary,
                    highlight: `Make genuine connections, discover ${categories.join(', ').toLowerCase()}, ask questions, and share your favorite ideas.`,
                    closing: 'This preview should feel real enough to imagine joining right away.',
                    readerCount: stats.find((stat) => stat.label === 'Early members')?.value ?? '186',
                    primaryLabel: 'This feels right',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {secondaryAction && (
              <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button size="lg" variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-4' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-[28px] border border-brand/20 bg-surface shadow-xs' : 'relative h-full'].join(' ')}>
              <div className={['relative', showAside ? 'aspect-[3/2]' : 'h-full min-h-[720px]'].join(' ')}>
                <img
                  src={previewIllustrationUrl}
                  alt="Preview mood illustration for the creator application emotional peak step"
                  className="h-full w-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
              <div className={showAside ? 'border-t border-border bg-surface px-4 py-3' : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-6'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'text-sm leading-relaxed text-white/92'}>
                  This is the emotional peak: aspirational art can make the mocked future feel worth pursuing.
                </p>
              </div>
            </div>
            {showAside && (
              <>
              <p className="text-sm font-medium text-text">Preview intent</p>
              <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
                <p>This is the emotional peak. It should feel close enough to real that the creator wants to keep going.</p>
                <p>Show just enough branded possibility to create momentum, not so much that it feels fake or overpromised.</p>
                <p>If this looks like a mockup instead of a future state, the moment loses power.</p>
              </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
