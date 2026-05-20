import previewIllustrationUrl from '../../assets/preview-illustration.png'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '../../components/Button/Button.jsx'
import { HomeFeedPageTemplate } from '../../components/HomeFeedPageTemplate/HomeFeedPageTemplate.jsx'

const revealTransition = {
  duration: 0.38,
  ease: [0.22, 1, 0.36, 1],
}

export function CommunityPreviewCard({
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
  const shouldReduceMotion = useReducedMotion()
  const duration = shouldReduceMotion ? 0.01 : revealTransition.duration
  const previewDuration = shouldReduceMotion ? 0.01 : 0.6
  const transition = { ...revealTransition, duration }
  const creatorName = creator?.name ?? 'Creator'
  const creatorSummary = creator?.summary ?? 'A creator-led community preview will appear here once the profile details are ready.'
  const communityCategories = categories.length > 0 ? categories.join(', ').toLowerCase() : 'this creator community'
  const previewPosts = posts.length > 0 ? posts : [
    {
      author: creatorName,
      title: 'Welcome to the first community thread',
      excerpt: 'This preview fills in a starter post so the screen still feels complete when creator content is sparse.',
    },
  ]
  const earlyMembersValue = stats.find((stat) => stat.label === 'Early members')?.value ?? '186'

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* no token available: creator-flow side rail uses a fixed 360px desktop column. */}
        <motion.div
          className="flex h-full flex-col p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          <div className="space-y-8">
            {progressMeter}

            <motion.div className="space-y-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
              <div className="space-y-3">
                <h2 className="max-w-2xl font-newsreader text-hero font-normal text-text">
                  {title}
                </h2>
                {description && (
                  <p className="max-w-2xl text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                )}
              </div>
            </motion.div>

            {/* no token available: fixed preview frame preserves the scaled desktop mock aspect. */}
            <motion.div
              className="relative h-[451px] w-[634px] overflow-hidden rounded-lg border border-border bg-surface shadow-sm will-change-transform"
              initial={{ opacity: 0, y: 22, scale: 0.975 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ ...transition, delay: 0.08 }}
            >
              <motion.div
                className="absolute left-0 top-0"
                style={{
                  width: '1440px',
                  height: '1024px',
                  transform: 'scale(0.44)',
                  transformOrigin: 'top left',
                }}
                animate={{ y: [8, 0], scale: [0.435, 0.44] }}
                transition={{ duration: previewDuration, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              >
                <HomeFeedPageTemplate
                  brandName={creatorName}
                  audienceLabel={`${earlyMembersValue} members`}
                  onlineCount="117"
                  selectedCommunity={creatorName}
                  mode="preview"
                  posts={previewPosts.map((post, index) => ({
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
                    title: `Welcome to the ${creatorName} Community!`,
                    description: creatorSummary,
                    highlight: `Make genuine connections, discover ${communityCategories}, ask questions, and share your favorite ideas.`,
                    closing: 'This preview should feel real enough to imagine joining right away.',
                    readerCount: earlyMembersValue,
                    primaryLabel: 'This feels right',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div className="mt-auto flex flex-wrap items-center justify-end gap-3 pt-8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: 0.16 }}>
            {secondaryAction && (
              <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button size="lg" variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick} disabled={primaryAction.disabled} success={primaryAction.success} successLabel={primaryAction.successLabel}>
                {primaryAction.label}
              </Button>
            )}
          </motion.div>
        </motion.div>

        <motion.aside
          className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...transition, delay: 0.1 }}
        >
          <div className={showAside ? 'space-y-4' : 'h-full'}>
            {/* no token available: fixed preview frame and full-height illustration mock preserve desktop composition. */}
            <div className={['overflow-hidden', showAside ? 'rounded-2xl border border-brand/20 bg-surface shadow-xs' : 'relative h-full'].join(' ')}>
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
              <div className={showAside ? 'border-t border-border bg-surface px-4 py-3' : 'hidden'}>
                <p className={showAside ? 'text-sm leading-relaxed text-text-secondary' : 'hidden'}>
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
        </motion.aside>
      </div>
    </section>
  )
}
