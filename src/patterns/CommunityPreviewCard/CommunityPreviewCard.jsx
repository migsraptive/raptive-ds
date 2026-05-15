import previewIllustrationUrl from '../../assets/preview-illustration.png'
import { Avatar } from '../../components/Avatar/Avatar.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'

function PreviewPost({ author, title, excerpt, meta }) {
  return (
    <article className="rounded-3xl border border-border bg-white p-4 shadow-xs">
      <div className="flex items-center gap-3">
        <Avatar name={author} size="sm" />
        <div className="space-y-0.5">
          <p className="text-sm font-medium text-text">{author}</p>
          <p className="text-xs text-text-tertiary">{meta}</p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <h4 className="text-sm font-medium text-text">{title}</h4>
        <p className="text-sm leading-relaxed text-text-secondary">{excerpt}</p>
      </div>
    </article>
  )
}

export function CommunityPreviewCard({
  eyebrow = 'Preview',
  title,
  description,
  creator,
  categories = [],
  stats = [],
  posts = [],
  showAside = true,
  primaryAction = { label: 'This feels right' },
  secondaryAction = { label: 'Edit details', variant: 'ghost' },
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-white shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-8 p-8 lg:p-12">
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

          <div className="rounded-[32px] border border-border bg-gradient-to-br from-brand-subtle via-white to-gamification-purple-bg p-6">
            <div className="rounded-[28px] border border-border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar name={creator.name} size="xl" />
                  <div className="space-y-1">
                    <p className="text-xl font-semibold text-text">{creator.name}</p>
                    <p className="text-sm text-text-secondary">{creator.summary}</p>
                  </div>
                </div>
                <Badge variant="brand" size="sm">Preview</Badge>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category} variant="brand">{category}</Badge>
                ))}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl bg-surface-raised px-4 py-3">
                    <p className="text-lg font-semibold text-text">{stat.value}</p>
                    <p className="text-xs uppercase tracking-caps text-text-tertiary">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {posts.map((post) => (
                  <PreviewPost key={post.title} {...post} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {secondaryAction && (
              <Button variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        <aside className={['border-t border-border lg:border-l lg:border-t-0', showAside ? 'bg-surface-raised p-8 lg:p-10' : 'bg-surface-raised/40 p-0'].join(' ')}>
          <div className={showAside ? 'space-y-4' : 'h-full'}>
            <div className={['overflow-hidden', showAside ? 'rounded-[28px] border border-brand/20 bg-white shadow-xs' : 'relative h-full'].join(' ')}>
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
              <div className={showAside ? 'border-t border-border bg-white px-4 py-3' : 'absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-6'}>
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
