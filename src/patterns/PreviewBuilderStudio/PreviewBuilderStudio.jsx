import { useMemo, useState } from 'react'
import { ColorSwatchButton } from '../../components/ColorSwatchButton/ColorSwatchButton.jsx'
import { HomeFeedPageTemplate } from '../../components/HomeFeedPageTemplate/HomeFeedPageTemplate.jsx'
import { FormField } from '../../components/FormField/FormField.jsx'
import { Select } from '../../components/Select/Select.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'
import { brandPreviewDefaults, brandPreviewPalette } from '../../utils/brandPreviewDefaults.js'

function studioCopy(vertical, creatorName) {
  const verticalMap = {
    food: {
      categories: ['Food', 'Family Cooking'],
      welcomeTitle: `Welcome to the ${creatorName} Kitchen Club!`,
      highlight: 'Trade practical dinners, weeknight shortcuts, and family-friendly recipes that feel useful immediately.',
      posts: [
        {
          author: creatorName,
          title: 'Three weeknight dinners my kids will actually eat',
          excerpt: 'A fast collection of reliable meals that do not require a second grocery run halfway through the week.',
        },
        {
          author: 'Community member',
          title: 'What do you pack for long tournament weekends?',
          excerpt: 'Looking for snack ideas that survive the car ride and still count as real food by day two.',
        },
      ],
    },
    parenting: {
      categories: ['Parenting', 'Home Rhythms'],
      welcomeTitle: `Welcome to the ${creatorName} Parenting Circle!`,
      highlight: 'Swap lived advice, calmer routines, and realistic support for the moments that make family life feel heavier.',
      posts: [
        {
          author: creatorName,
          title: 'What finally made bedtime less chaotic for us',
          excerpt: 'A few small shifts helped our evenings feel gentler without turning the whole house into a rules chart.',
        },
        {
          author: 'Community member',
          title: 'How do you handle long after-school meltdowns?',
          excerpt: 'Would love scripts, reset ideas, or routines that help when everyone is already overstimulated.',
        },
      ],
    },
    home: {
      categories: ['Home', 'Gathering'],
      welcomeTitle: `Welcome to the ${creatorName} Home Club!`,
      highlight: 'Share warm spaces, hosting rituals, and simple upgrades that make everyday life feel more intentional.',
      posts: [
        {
          author: creatorName,
          title: 'The one hosting ritual that makes guests exhale',
          excerpt: 'A few tiny touches make people feel looked after before dinner is even on the table.',
        },
        {
          author: 'Community member',
          title: 'What is worth buying once for a small dining room?',
          excerpt: 'Looking for pieces that actually change how the room gets used instead of just looking styled.',
        },
      ],
    },
    wellness: {
      categories: ['Wellness', 'Daily Practice'],
      welcomeTitle: `Welcome to the ${creatorName} Wellness Circle!`,
      highlight: 'Build supportive routines, compare honest experiments, and keep wellness from turning into performance.',
      posts: [
        {
          author: creatorName,
          title: 'The morning reset that actually keeps me steady',
          excerpt: 'This is the low-friction version I can repeat even when the rest of the day gets noisy.',
        },
        {
          author: 'Community member',
          title: 'How do you stay consistent without overtracking?',
          excerpt: 'Looking for practices that feel grounding without creating a new spreadsheet to manage.',
        },
      ],
    },
  }

  return verticalMap[vertical] ?? verticalMap.food
}

export function PreviewBuilderStudio({
  title = 'Shape the first version of your creator community.',
  description = 'This exploration merges correction and preview into one split studio so every meaningful edit can update the mocked experience immediately.',
  initialFields = {
    name: 'Julia Child',
    url: 'instagram.com/juliachild',
    vertical: 'food',
    audience: 'Community-led',
    summary: 'Food creator and community builder helping families cook smarter and gather more often.',
  },
  brandAssets = {
    palette: brandPreviewPalette,
    items: ['Editorial food photography', 'Short-form social avatars', 'Warm serif wordmark'],
  },
}) {
  const [fields, setFields] = useState(initialFields)
  const [selectedPalette, setSelectedPalette] = useState(brandAssets.palette?.[1] ?? brandPreviewDefaults.secondary)

  const contentModel = useMemo(
    () => studioCopy(fields.vertical, fields.name || 'Creator'),
    [fields.name, fields.vertical],
  )

  const previewPosts = contentModel.posts.map((post, index) => ({
    author: {
      name: post.author,
      badges: index === 0 ? [{ variant: 'superfan', label: 'Superfan' }] : [],
    },
    images: index === 0 ? [{
      src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
      alt: 'Preview content image',
    }] : [],
    title: post.title,
    body: post.excerpt,
    reactionCount: index === 0 ? 31 : 18,
    shareCount: index === 0 ? 13 : 4,
    commentCount: index === 0 ? 12 : 18,
    commentAvatarName: post.author,
  }))

  const updateField = (key, value) => {
    setFields((current) => ({ ...current, [key]: value }))
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[380px_minmax(0,1fr)]">
        {/* no token available: split-studio exploration keeps a fixed 380px editor rail. */}
        <div className="border-b border-border bg-surface lg:border-b-0 lg:border-r">
          <div className="flex h-full flex-col p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
                  Exploration
                </p>
                <h2 className="max-w-sm font-newsreader text-hero font-normal text-text">
                  {title}
                </h2>
                <p className="text-base leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>

              <div className="space-y-5">
                <div className="space-y-4">
                  <TextInput
                    label="Creator name"
                    value={fields.name}
                    onChange={(event) => updateField('name', event.target.value)}
                  />
                  <TextInput
                    label="Primary URL"
                    value={fields.url}
                    onChange={(event) => updateField('url', event.target.value)}
                  />
                  <Select
                    label="Primary vertical"
                    value={fields.vertical}
                    onChange={(event) => updateField('vertical', event.target.value)}
                    placeholder="Select a vertical"
                    options={[
                      { value: 'food', label: 'Food' },
                      { value: 'parenting', label: 'Parenting' },
                      { value: 'home', label: 'Home' },
                      { value: 'wellness', label: 'Wellness' },
                    ]}
                  />
                  <TextInput
                    label="Audience signal"
                    value={fields.audience}
                    onChange={(event) => updateField('audience', event.target.value)}
                  />
                  <Textarea
                    label="Positioning summary"
                    value={fields.summary}
                    onChange={(event) => updateField('summary', event.target.value)}
                    rows={4}
                  />
                </div>

                <FormField
                  label="Brand palette"
                  description="Pick the accent color that should lead the first preview impression."
                >
                  <div className="grid grid-cols-3 gap-3">
                    {brandAssets.palette?.map((color) => (
                      <ColorSwatchButton
                        key={color}
                        color={color}
                        selected={selectedPalette === color}
                        onClick={() => setSelectedPalette(color)}
                      />
                    ))}
                  </div>
                </FormField>

                <FormField
                  label="Asset signals"
                  description="These remain read-only in the exploration, but they can inform theme presets later."
                >
                  <div className="flex flex-wrap gap-2">
                    {brandAssets.items?.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-text-secondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </FormField>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-theme bg-gradient-to-b from-gamification-gold-bg to-surface-sunken p-8 lg:p-10" style={{ '--preview-primary': selectedPalette }}>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-text">Live community preview</p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Name, summary, vertical, and palette selection update this mock in place.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 shadow-xs">
                <span className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
                  Active accent
                </span>
                <span className="preview-accent-surface h-3.5 w-3.5 rounded-full border border-black/10" />
                <span className="text-xs font-mono text-text-secondary">{selectedPalette}</span>
              </div>
            </div>

            <div
              className="preview-accent-frame rounded-2xl border p-3"
            >
              <div className="preview-accent-tint mb-3 flex items-center gap-2 rounded-lg px-3 py-2">
                <span className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
                  Preview frame
                </span>
                <span className="text-xs text-text-secondary">
                  Accent updates now. Template theming can go deeper if this direction wins.
                </span>
              </div>

              {/* no token available: fixed preview frame preserves the scaled desktop mock aspect. */}
              <div className="relative h-[451px] w-[634px] overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
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
                    brandName={fields.name}
                    audienceLabel="186 members"
                    onlineCount="117"
                    selectedCommunity={fields.name}
                    mode="preview"
                    posts={previewPosts}
                    rightRail={{
                      title: contentModel.welcomeTitle,
                      description: fields.summary,
                      highlight: contentModel.highlight,
                      closing: 'This preview should feel real enough to imagine joining right away.',
                      readerCount: '186',
                      primaryLabel: 'Join the conversation',
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Mapped now</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Creator name updates the navigation, composer, and community title immediately.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Mapped now</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Positioning summary and vertical shift the welcome message and example post framing.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">Theme signal</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    Palette selection currently affects preview chrome first, which is enough to validate the studio concept before deeper theming.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
