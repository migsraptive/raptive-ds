import { useState } from 'react'
import {
  Award,
  Baby,
  BadgeCheck,
  BriefcaseBusiness,
  Flame,
  HandCoins,
  Heart,
  House,
  Mail,
  Megaphone,
  MessageSquare,
  Plane,
  Rocket,
  RotateCcw,
  Settings2,
  Shield,
  ShieldCheck,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  Waves,
} from 'lucide-react'
import { Button } from '../../components/Button/Button.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { BrandLogo } from '../../components/BrandLogo/BrandLogo.jsx'
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar.jsx'
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx'
import { FieldShell } from '../../components/FormField/FieldShell.jsx'
import { FormField } from '../../components/FormField/FormField.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { OptionTile } from '../../components/OptionTile/OptionTile.jsx'
import { RadioGroup } from '../../components/RadioGroup/RadioGroup.jsx'
import { Select } from '../../components/Select/Select.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { CategoryPicker } from '../../patterns/CategoryPicker/CategoryPicker.jsx'
import { CommunityPreviewCard } from '../../patterns/CommunityPreviewCard/CommunityPreviewCard.jsx'
import { CelebrationModal } from '../../patterns/CelebrationModal/CelebrationModal.jsx'
import { GoalSelectionGrid } from '../../patterns/GoalSelectionGrid/GoalSelectionGrid.jsx'
import { RecognitionState } from '../../patterns/RecognitionState/RecognitionState.jsx'
import { ReviewCorrection } from '../../patterns/ReviewCorrection/ReviewCorrection.jsx'
import { SingleFieldIntake } from '../../patterns/SingleFieldIntake/SingleFieldIntake.jsx'
import { StepLayout } from '../../patterns/StepLayout/StepLayout.jsx'
import { SubmissionSuccess } from '../../patterns/SubmissionSuccess/SubmissionSuccess.jsx'
import { VerificationStep } from '../../patterns/VerificationStep/VerificationStep.jsx'

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div className="space-y-0.5 pb-3 border-b border-border">
        <h2 className="text-lg font-semibold text-text">{title}</h2>
        {description && <p className="text-sm text-text-secondary">{description}</p>}
      </div>
      {children}
    </section>
  )
}

// ─── Token swatch ──────────────────────────────────────────────────────────────
function ColorSwatch({ token, value, label }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="w-full h-10 rounded-md border border-border shadow-xs"
        style={{ backgroundColor: value }}
        title={value}
      />
      <p className="text-2xs font-mono text-text-secondary leading-snug">{token}</p>
      {label && <p className="text-2xs text-text-tertiary">{label}</p>}
    </div>
  )
}

// ─── Row layout ───────────────────────────────────────────────────────────────
function Row({ label, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <p className="text-xs font-medium text-text-tertiary uppercase tracking-caps">{label}</p>}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const sections = ['Colors', 'Typography', 'Forms', 'Buttons', 'Badges', 'Avatars', 'Patterns']

const tileIcon = (Icon) => <LucideIcon icon={Icon} size="lg" stroke="display" />
const celebrationIcon = (Icon) => <LucideIcon icon={Icon} size="xl" stroke="display" />
const miniIcon = (Icon) => <LucideIcon icon={Icon} size="sm" />

export function ComponentLibrary() {
  const [activeSection, setActiveSection] = useState('Colors')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('badge')
  const [goalValue, setGoalValue] = useState('grow-audience')
  const [selectedTiles, setSelectedTiles] = useState(['community'])
  const [selectedGoals, setSelectedGoals] = useState(['audience-growth', 'community'])
  const [newsletterOptIn, setNewsletterOptIn] = useState(true)
  const [categorySearch, setCategorySearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState(['food', 'parenting'])
  const [creatorUrl, setCreatorUrl] = useState('https://instagram.com/juliachild')
  const [intakeLoading, setIntakeLoading] = useState(false)
  const [recognitionLoading, setRecognitionLoading] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState('instagram-dm')
  const [verificationConfirmed, setVerificationConfirmed] = useState(true)
  const [reviewFields, setReviewFields] = useState({
    name: 'Julia Child',
    url: 'instagram.com/juliachild',
    vertical: 'food',
    audience: 'Community-led',
    summary: 'Food creator and community builder helping families cook smarter and gather more often.',
  })

  const modalExamples = {
    badge: {
      type: 'badge',
      title: 'Achievement Unlocked!',
      description: 'You just earned the "Community Champion" badge for helping 10 members this month.',
      badge: { icon: celebrationIcon(Trophy), name: 'Community Champion', tier: tileIcon(Sparkles) },
      stats: [{ value: '10', label: 'Members helped' }, { value: '47', label: 'Points earned' }],
    },
    streak: {
      type: 'streak',
      title: '30-Day Streak!',
      description: "You've been active every day for a month. That's incredible consistency.",
      badge: { icon: celebrationIcon(Flame), name: '30-Day Streak' },
      stats: [{ value: '30', label: 'Days active' }, { value: '12', label: 'Posts written' }],
    },
    milestone: {
      type: 'milestone',
      title: 'First 100 Reactions!',
      description: "Your posts have resonated with the community. Keep sharing your insights.",
      badge: { icon: celebrationIcon(Heart), name: 'Reaction Milestone' },
      stats: [{ value: '100', label: 'Reactions' }, { value: '#4', label: 'This week' }],
    },
    role: {
      type: 'role',
      title: 'You\u2019re a Moderator Now',
      description: "The community has recognized your leadership. Welcome to the team.",
      badge: { icon: celebrationIcon(Shield), name: 'Moderator' },
      stats: [{ value: '2.1k', label: 'Posts read' }, { value: '98%', label: 'Helpful rate' }],
    },
  }

  const toggleTile = (value) => {
    setSelectedTiles((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ))
  }

  const toggleGoal = (value) => {
    setSelectedGoals((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ))
  }

  const toggleCategory = (value) => {
    setSelectedCategories((current) => (
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    ))
  }

  const updateReviewField = (key, value) => {
    setReviewFields((current) => ({ ...current, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-surface-raised">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <Badge variant="default" size="xs">v0.1</Badge>
          </div>
          <nav className="hidden md:flex items-center gap-0.5">
            {sections.map(s => (
              <button
                key={s}
                onClick={() => setActiveSection(s)}
                className={[
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  activeSection === s
                    ? 'bg-brand-subtle text-brand-dark'
                    : 'text-text-secondary hover:bg-surface-sunken hover:text-text',
                ].join(' ')}
              >
                {s}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-14">

        {/* ── COLORS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Colors' && (
          <>
            <Section title="Brand Colors" description="Primary brand palette. Use semantic tokens in components, not primitives.">
              <div className="grid grid-cols-5 md:grid-cols-11 gap-2">
                {[50,100,200,300,400,500,600,700,800,900,950].map(w => (
                  <ColorSwatch key={w} token={`raptive-${w}`} value={`var(--tw-color-raptive-${w}, #4361ee)`} label={w === 500 ? 'primary' : ''} />
                ))}
              </div>
            </Section>

            <Section title="Semantic Tokens" description="Purpose-named aliases. These map to Figma variables.">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Brand</p>
                  <ColorSwatch token="brand.DEFAULT" value="#4361ee" label="primary" />
                  <ColorSwatch token="brand.light" value="#6d88ff" />
                  <ColorSwatch token="brand.dark" value="#2035b0" />
                  <ColorSwatch token="brand.subtle" value="#f0f4ff" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Surface</p>
                  <ColorSwatch token="surface.DEFAULT" value="#ffffff" />
                  <ColorSwatch token="surface.raised" value="#f9fafb" />
                  <ColorSwatch token="surface.sunken" value="#f3f4f6" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Status</p>
                  <ColorSwatch token="status.success" value="#22c55e" />
                  <ColorSwatch token="status.warning" value="#eab308" />
                  <ColorSwatch token="status.error" value="#ef4444" />
                  <ColorSwatch token="status.info" value="#4361ee" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-text-secondary">Gamification</p>
                  <ColorSwatch token="gamification.gold" value="#f59e0b" />
                  <ColorSwatch token="gamification.gold-bg" value="#fffbeb" />
                  <ColorSwatch token="gamification.purple" value="#a855f7" />
                  <ColorSwatch token="gamification.purple-bg" value="#faf5ff" />
                </div>
              </div>
            </Section>
          </>
        )}

        {/* ── TYPOGRAPHY ─────────────────────────────────────────────────── */}
        {activeSection === 'Typography' && (
          <Section title="Typography Scale" description="DM Sans mapped from the exported Figma typography tokens in tokens/typography.js.">
            <div className="space-y-6 divide-y divide-border">
              {[
                { label: 'Display / 32px / 42px', className: 'font-display text-5xl font-bold text-text', sample: 'Community First' },
                { label: 'Heading 1 / 24px / 28px', className: 'font-display text-2xl font-bold text-text', sample: 'Welcome Back, Maria' },
                { label: 'Heading 2 / 18px / 24px', className: 'font-display text-lg font-medium text-text', sample: 'Your Achievements' },
                { label: 'Body / 15px / 20px', className: 'font-sans text-base text-text', sample: 'Share what\u2019s on your mind with your community.' },
                { label: 'Label LG / 14px / 20px', className: 'font-sans text-sm font-medium text-text-secondary', sample: 'Joined 3 months ago · 142 posts · 1.2k reactions' },
                { label: 'Label MD / 12px / 16px', className: 'font-sans text-xs font-medium text-text-tertiary', sample: 'Last active 2 hours ago' },
                { label: 'Label SM / 10px / 16px', className: 'font-sans text-2xs font-medium text-text-tertiary', sample: 'MEMBER SINCE 2026' },
                { label: 'Mono / Utility', className: 'font-mono text-sm text-text-secondary', sample: 'badge_id: community-champion-v1' },
              ].map(({ label, className, sample }) => (
                <div key={label} className="pt-4 flex items-baseline justify-between gap-8 first:pt-0">
                  <span className="text-xs font-mono text-text-tertiary w-40 flex-shrink-0">{label}</span>
                  <span className={className}>{sample}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── FORMS ─────────────────────────────────────────────────────── */}
        {activeSection === 'Forms' && (
          <>
            <Section title="Text Input" description="Reusable single-line field built on the shared FormField wrapper.">
              <div className="grid gap-6 md:grid-cols-2">
                <TextInput
                  label="Creator Name"
                  description="This appears on your public profile."
                  placeholder="Maria Chen"
                />
                <TextInput
                  label="Raptive Handle"
                  prefix="@"
                  placeholder="mariawrites"
                  required
                />
                <TextInput
                  label="Website"
                  prefix="https://"
                  placeholder="yourdomain.com"
                  optional
                />
                <TextInput
                  label="Primary Niche"
                  value="Parenting"
                  readOnly
                  suffix="Locked"
                />
              </div>
            </Section>

            <Section title="Field States">
              <div className="grid gap-6 md:grid-cols-2">
                <TextInput
                  label="Headline"
                  placeholder="Helping families cook smarter"
                />
                <TextInput
                  label="Email"
                  type="email"
                  value="creator@raptive.com"
                  disabled
                  onChange={() => {}}
                />
                <TextInput
                  label="Instagram"
                  prefix="@"
                  placeholder="creatorhandle"
                  error="Please enter a valid handle."
                />
                <FormField
                  label="Custom Field Wrapper"
                  description="Use FormField directly when a control is not a text input."
                >
                  <FieldShell readOnly>
                    Placeholder control
                  </FieldShell>
                </FormField>
              </div>
            </Section>

            <Section title="Textarea And Select" description="Shared field family extended to multi-line and native selection controls.">
              <div className="grid gap-6 md:grid-cols-2">
                <Textarea
                  label="Creator Bio"
                  description="A short introduction shown on your profile."
                  placeholder="Tell your audience what you create and who you help."
                />
                <Textarea
                  label="Voice And Tone"
                  placeholder="Warm, practical, and expert-led."
                  readOnly
                  value="Warm, practical, and expert-led."
                />
                <Select
                  label="Primary Goal"
                  defaultValue=""
                  options={[
                    { value: 'grow-audience', label: 'Grow audience' },
                    { value: 'increase-revenue', label: 'Increase revenue' },
                    { value: 'build-community', label: 'Build community' },
                  ]}
                  description="Choose the main outcome you want from onboarding."
                />
                <Select
                  label="Creator Stage"
                  value="emerging"
                  disabled
                  onChange={() => {}}
                  options={[
                    { value: 'emerging', label: 'Emerging creator' },
                    { value: 'established', label: 'Established creator' },
                  ]}
                />
              </div>
            </Section>

            <Section title="Selection Controls" description="Primitives for onboarding choices, consents, and goal selection.">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <Checkbox
                    id="weekly-updates"
                    label="Weekly creator updates"
                    description="Get onboarding tips and product updates by email."
                    checked={newsletterOptIn}
                    onChange={(event) => setNewsletterOptIn(event.target.checked)}
                  />
                  <Checkbox
                    id="community-guidelines"
                    label="Community guidelines accepted"
                    description="Required before publishing your first profile."
                    checked
                    disabled
                    onChange={() => {}}
                  />
                </div>
                <RadioGroup
                  name="primary-goal"
                  label="Primary onboarding goal"
                  description="Choose the single most important outcome for this creator."
                  value={goalValue}
                  onChange={setGoalValue}
                  options={[
                    { value: 'grow-audience', label: 'Grow audience', description: 'Build reach across content and email.' },
                    { value: 'increase-revenue', label: 'Increase revenue', description: 'Focus on monetization and sponsorship readiness.' },
                    { value: 'build-community', label: 'Build community', description: 'Encourage repeat participation and loyalty.' },
                  ]}
                />
              </div>
            </Section>

            <Section title="Option Tiles" description="Reusable selectable cards for goals, audiences, and category pickers.">
              <div className="grid gap-4 md:grid-cols-3">
                <OptionTile
                  icon={tileIcon(Megaphone)}
                  title="Audience Growth"
                  description="Prioritize discovery, distribution, and repeat visits."
                  selected={selectedTiles.includes('audience')}
                  multiSelect
                  onClick={() => toggleTile('audience')}
                />
                <OptionTile
                  icon={tileIcon(MessageSquare)}
                  title="Community"
                  description="Focus on conversations, comments, and member connection."
                  selected={selectedTiles.includes('community')}
                  multiSelect
                  onClick={() => toggleTile('community')}
                />
                <OptionTile
                  icon={tileIcon(HandCoins)}
                  title="Revenue"
                  description="Build packages, performance proof, and advertiser readiness."
                  selected={selectedTiles.includes('revenue')}
                  multiSelect
                  onClick={() => toggleTile('revenue')}
                />
              </div>
            </Section>

            <Section title="Goal Selection Grid" description="First onboarding pattern composed directly from OptionTile primitives.">
              <GoalSelectionGrid
                title="What do you want this creator to prioritize?"
                description="Choose one or more outcomes so onboarding can tailor recommendations and next steps."
                selected={selectedGoals}
                onToggle={toggleGoal}
                goals={[
                  {
                    value: 'audience-growth',
                    icon: tileIcon(Megaphone),
                    title: 'Audience growth',
                    description: 'Improve discovery, distribution, and repeat visits.',
                  },
                  {
                    value: 'community',
                    icon: tileIcon(MessageSquare),
                    title: 'Community',
                    description: 'Strengthen comments, participation, and belonging.',
                  },
                  {
                    value: 'revenue',
                    icon: tileIcon(HandCoins),
                    title: 'Revenue',
                    description: 'Increase sponsorship readiness and monetization confidence.',
                  },
                  {
                    value: 'workflow',
                    icon: tileIcon(Settings2),
                    title: 'Workflow efficiency',
                    description: 'Reduce publishing friction and speed up daily operations.',
                  },
                  {
                    value: 'authority',
                    icon: tileIcon(Award),
                    title: 'Authority',
                    description: 'Present expertise more clearly across profile and content.',
                  },
                  {
                    value: 'retention',
                    icon: tileIcon(RotateCcw),
                    title: 'Retention',
                    description: 'Create stronger habits and bring audiences back more often.',
                  },
                ]}
              />
            </Section>

            <Section title="Category Picker" description="Searchable, multi-select pattern for creator verticals and niche selection.">
              <CategoryPicker
                title="Choose the creator categories that fit best"
                description="These guide recommendations, examples, and profile framing across onboarding."
                searchValue={categorySearch}
                onSearchChange={setCategorySearch}
                selected={selectedCategories}
                onToggle={toggleCategory}
                categories={[
                  {
                    value: 'food',
                    icon: tileIcon(UtensilsCrossed),
                    title: 'Food',
                    description: 'Recipes, meal planning, kitchen tips, and cooking inspiration.',
                    tags: ['recipes', 'meal planning', 'cooking'],
                  },
                  {
                    value: 'parenting',
                    icon: tileIcon(Baby),
                    title: 'Parenting',
                    description: 'Family routines, child development, and parent life.',
                    tags: ['family', 'kids', 'home'],
                  },
                  {
                    value: 'home',
                    icon: tileIcon(House),
                    title: 'Home',
                    description: 'Decor, organization, hosting, and DIY improvements.',
                    tags: ['decor', 'organization', 'hosting'],
                  },
                  {
                    value: 'wellness',
                    icon: tileIcon(Waves),
                    title: 'Wellness',
                    description: 'Fitness, mindfulness, habits, and sustainable self-care.',
                    tags: ['fitness', 'habits', 'mindfulness'],
                  },
                  {
                    value: 'finance',
                    icon: tileIcon(BriefcaseBusiness),
                    title: 'Personal Finance',
                    description: 'Budgeting, saving, planning, and practical money education.',
                    tags: ['budgeting', 'saving', 'career'],
                  },
                  {
                    value: 'travel',
                    icon: tileIcon(Plane),
                    title: 'Travel',
                    description: 'Guides, itineraries, family trips, and destination recs.',
                    tags: ['guides', 'itineraries', 'destinations'],
                  },
                ]}
              />
            </Section>
          </>
        )}

        {/* ── BUTTONS ────────────────────────────────────────────────────── */}
        {activeSection === 'Buttons' && (
          <>
            <Section title="Variants" description="Five semantic variants covering all use cases.">
              <Row>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
              </Row>
            </Section>
            <Section title="Sizes">
              <Row>
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </Row>
            </Section>
            <Section title="States">
              <Row label="Loading">
                <Button loading>Primary</Button>
                <Button variant="secondary" loading>Secondary</Button>
              </Row>
              <Row label="Disabled">
                <Button disabled>Primary</Button>
                <Button variant="secondary" disabled>Secondary</Button>
                <Button variant="ghost" disabled>Ghost</Button>
              </Row>
              <Row label="Full Width">
                <div className="w-full max-w-xs">
                  <Button fullWidth>Full Width Button</Button>
                </div>
              </Row>
            </Section>
          </>
        )}

        {/* ── BADGES ─────────────────────────────────────────────────────── */}
        {activeSection === 'Badges' && (
          <>
            <Section title="Variants" description="Covers status, brand, and gamification contexts.">
              <Row>
                <Badge variant="default">Default</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="gold">Gold</Badge>
                <Badge variant="purple">Purple</Badge>
                <Badge variant="outline">Outline</Badge>
              </Row>
            </Section>
            <Section title="Sizes">
              <Row>
                <Badge size="xs">Extra Small</Badge>
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
              </Row>
            </Section>
            <Section title="With Dot">
              <Row>
                <Badge variant="success" dot>Online</Badge>
                <Badge variant="warning" dot>Away</Badge>
                <Badge variant="error" dot>Busy</Badge>
                <Badge variant="gold" dot>Top Contributor</Badge>
              </Row>
            </Section>
            <Section title="Removable">
              <Row>
                {['React', 'Design Systems', 'Gamification'].map(t => (
                  <Badge key={t} variant="brand" onRemove={() => {}}>#{t}</Badge>
                ))}
              </Row>
            </Section>
          </>
        )}

        {/* ── AVATARS ────────────────────────────────────────────────────── */}
        {activeSection === 'Avatars' && (
          <>
            <Section title="Sizes">
              <Row>
                {['xs','sm','md','lg','xl','2xl'].map(s => (
                  <Avatar key={s} name="Julia Child" size={s} />
                ))}
              </Row>
            </Section>
            <Section title="With Status">
              <Row>
                <Avatar name="Nicole PM" size="md" status="online" />
                <Avatar name="Brynne B" size="md" status="away" />
                <Avatar name="Cyle C" size="md" status="busy" />
                <Avatar name="Kimm SVP" size="md" status="offline" />
              </Row>
            </Section>
            <Section title="With Notification Count">
              <Row>
                <Avatar name="Julia Child" size="md" count={3} />
                <Avatar name="Nicole PM" size="md" count={12} />
                <Avatar name="Kimm SVP" size="md" count={100} />
              </Row>
            </Section>
            <Section title="Avatar Group">
              <Row>
                <AvatarGroup
                  size="sm"
                  avatars={[
                    { name: 'Julia Child' },
                    { name: 'Nicole PM' },
                    { name: 'Brynne B' },
                    { name: 'Cyle C' },
                    { name: 'Kimm SVP' },
                    { name: 'Will CPO' },
                  ]}
                  max={4}
                />
              </Row>
            </Section>
          </>
        )}

        {/* ── PATTERNS ───────────────────────────────────────────────────── */}
        {activeSection === 'Patterns' && (
          <>
            <Section title="Single Field Intake" description="Desktop-first opening step for the real creator application flow.">
              <SingleFieldIntake
                title="Bring a creator into the application flow with one confident move."
                description="Paste a creator URL or social handle. We’ll recognize the profile, fetch the first identity signals, and show a preview before anything gets submitted."
                value={creatorUrl}
                onChange={(event) => setCreatorUrl(event.target.value)}
                onSubmit={() => {
                  setIntakeLoading(true)
                  window.setTimeout(() => setIntakeLoading(false), 900)
                }}
                loading={intakeLoading}
                helperText="No long application form up front."
                trustPoints={[
                  {
                    title: 'Recognition first',
                    description: 'The first response should feel intelligent, not administrative.',
                  },
                  {
                    title: 'Reviewable output',
                    description: 'Every fetched detail can be corrected before commitment.',
                  },
                  {
                    title: 'Exclusive finish',
                    description: 'The final submit should feel intentional and worth the wait.',
                  },
                ]}
              />
            </Section>

            <Section title="Recognition State" description="Second-step reveal pattern for fetched creator identity and confidence-building recognition.">
              <RecognitionState
                eyebrow={recognitionLoading ? 'Fetching identity' : 'Recognition'}
                title={recognitionLoading ? 'We’re pulling the first identity signals now.' : 'We found a strong starting point for this creator.'}
                description={
                  recognitionLoading
                    ? 'This should feel like a short, confident reveal rather than a generic loading wait.'
                    : 'Logo, display name, domain, and positioning are recognized first so the creator can confirm or correct with context.'
                }
                loading={recognitionLoading}
                profile={{
                  name: 'Julia Child',
                  summary: 'Food creator and community builder',
                  domain: 'instagram.com/juliachild',
                }}
                signals={[
                  {
                    label: 'Display name',
                    value: 'Julia Child',
                    help: 'Pulled from the creator profile and social identity.',
                  },
                  {
                    label: 'Primary vertical',
                    value: 'Food',
                    help: 'Based on recent profile content and creator positioning.',
                  },
                  {
                    label: 'Audience signal',
                    value: 'Community-led',
                    help: 'Content tone suggests relationship-building over broadcast only.',
                  },
                ]}
                secondaryAction={{
                  label: recognitionLoading ? 'Pause' : 'Needs edits',
                  variant: 'ghost',
                  onClick: () => setRecognitionLoading(false),
                }}
                primaryAction={{
                  label: recognitionLoading ? 'Fetching…' : 'Looks right',
                  onClick: () => setRecognitionLoading((current) => !current),
                }}
              />
            </Section>

            <Section title="Review Correction" description="Trust-recovery edit step for correcting fetched identity before the emotional preview stage.">
              <ReviewCorrection
                title="Make any corrections before we build the preview."
                description="This should feel like refining a strong starting point, not filling out a form from scratch."
                fields={reviewFields}
                onFieldChange={updateReviewField}
                note="If this step feels bureaucratic, the recognition stage failed to earn trust."
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                primaryAction={{ label: 'Continue to preview' }}
              />
            </Section>

            <Section title="Community Preview Card" description="Aspirational preview moment that turns corrected inputs into something the creator can want.">
              <CommunityPreviewCard
                title="This is what the creator experience could start to look like."
                description="The preview should feel plausible, branded, and emotionally rewarding without pretending it is final."
                creator={{
                  name: reviewFields.name,
                  summary: reviewFields.summary,
                }}
                categories={['Food', 'Parenting']}
                stats={[
                  { label: 'Example posts', value: '12' },
                  { label: 'Early members', value: '186' },
                  { label: 'Weekly cadence', value: '3x' },
                ]}
                posts={[
                  {
                    author: 'Julia Child',
                    title: 'Three weeknight dinners my kids will actually eat',
                    excerpt: 'A fast collection of reliable meals that don’t require a second grocery run halfway through the week.',
                    meta: 'Pinned discussion • 2h ago',
                  },
                  {
                    author: 'Community member',
                    title: 'What do you pack for long tournament weekends?',
                    excerpt: 'Looking for snack ideas that survive the car ride and still count as real food by day two.',
                    meta: 'Newest thread • 18 replies',
                  },
                ]}
                secondaryAction={{ label: 'Back to edits', variant: 'ghost' }}
                primaryAction={{ label: 'Continue to verification' }}
              />
            </Section>

            <Section title="Verification Step" description="Lightweight commitment and identity confirmation step before the final submission moment.">
              <VerificationStep
                title="One last check so we know this request is really coming from the creator."
                description="Keep verification short and legible. This is the handshake that turns excitement into commitment."
                methods={[
                  {
                    value: 'instagram-dm',
                    icon: tileIcon(Mail),
                    title: 'Confirm with an Instagram DM',
                    description: 'We send a short code to the linked creator account so the creator can confirm ownership without leaving the flow for long.',
                  },
                ]}
                selectedMethod={verificationMethod}
                onSelectMethod={setVerificationMethod}
                confirmed={verificationConfirmed}
                onConfirmChange={setVerificationConfirmed}
                reassurance={[
                  {
                    icon: miniIcon(BadgeCheck),
                    title: 'Short confirmation',
                    description: 'The creator receives a quick ownership check, not a full application form all over again.',
                  },
                  {
                    icon: miniIcon(Rocket),
                    title: 'Submission follows immediately',
                    description: 'Once confirmed, the final step can feel exclusive and complete instead of stalled.',
                  },
                  {
                    icon: miniIcon(ShieldCheck),
                    title: 'Trust stays intact',
                    description: 'The screen explains why verification exists so the momentum from preview does not collapse here.',
                  },
                ]}
                secondaryAction={{ label: 'Back to preview', variant: 'ghost' }}
                primaryAction={{ label: 'Confirm and submit' }}
              />
            </Section>

            <Section title="Submission Success" description="Exclusive completion state that closes the journey with confidence instead of a generic success message.">
              <SubmissionSuccess
                title="You’re on the list. We’ll take it from here."
                description="The request is in, the creator identity is confirmed, and the final screen should feel worth the wait rather than procedural."
                highlights={[
                  {
                    value: 'Submitted',
                    label: 'Application status',
                    help: 'The creator request has been received and routed for review.',
                  },
                  {
                    value: '< 24h',
                    label: 'Expected follow-up',
                    help: 'Fast confirmation keeps the ending sharp instead of vague.',
                  },
                  {
                    value: 'Warm',
                    label: 'Momentum',
                    help: 'The closing copy should preserve the confidence built in preview and verification.',
                  },
                ]}
                timeline={[
                  {
                    step: '1',
                    title: 'Confirmation lands first',
                    description: 'A short follow-up confirms the creator request is officially in motion.',
                  },
                  {
                    step: '2',
                    title: 'Team review stays invisible',
                    description: 'Internal evaluation happens behind the scenes so the user does not have to think about operations.',
                  },
                  {
                    step: '3',
                    title: 'Decision arrives with context',
                    description: 'The eventual response should feel curated and deliberate, not auto-generated.',
                  },
                ]}
                secondaryAction={{ label: 'Back to patterns', variant: 'ghost' }}
                primaryAction={{ label: 'Done' }}
              />
            </Section>

            <Section title="Step Layout" description="Shared shell for multi-step creator onboarding screens with progress, content, and preview rail.">
              <StepLayout
                eyebrow="Creator Onboarding"
                step={2}
                totalSteps={6}
                title="Choose your creator categories"
                description="Pick the verticals that best describe this creator so onboarding can tailor guidance, examples, and profile recommendations."
                primaryAction={{ label: 'Continue' }}
                secondaryAction={{ label: 'Back', variant: 'ghost' }}
                aside={(
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-text">Profile Preview</p>
                      <p className="text-sm text-text-secondary">How this step influences the public profile.</p>
                    </div>
                    <div className="rounded-3xl border border-border bg-white p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-base font-medium text-text">Julia Child</p>
                        <p className="text-sm text-text-secondary">Food creator and community builder</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="brand">Food</Badge>
                        <Badge variant="brand">Parenting</Badge>
                      </div>
                    </div>
                  </div>
                )}
              >
                <CategoryPicker
                  title="Best-fit categories"
                  description="Select all categories that apply right now."
                  searchValue={categorySearch}
                  onSearchChange={setCategorySearch}
                  selected={selectedCategories}
                  onToggle={toggleCategory}
                  categories={[
                    {
                      value: 'food',
                      icon: tileIcon(UtensilsCrossed),
                      title: 'Food',
                      description: 'Recipes, meal planning, kitchen tips, and cooking inspiration.',
                      tags: ['recipes', 'meal planning', 'cooking'],
                    },
                    {
                      value: 'parenting',
                      icon: tileIcon(Baby),
                      title: 'Parenting',
                      description: 'Family routines, child development, and parent life.',
                      tags: ['family', 'kids', 'home'],
                    },
                    {
                      value: 'home',
                      icon: tileIcon(House),
                      title: 'Home',
                      description: 'Decor, organization, hosting, and DIY improvements.',
                      tags: ['decor', 'organization', 'hosting'],
                    },
                    {
                      value: 'wellness',
                      icon: tileIcon(Waves),
                      title: 'Wellness',
                      description: 'Fitness, mindfulness, habits, and sustainable self-care.',
                      tags: ['fitness', 'habits', 'mindfulness'],
                    },
                    {
                      value: 'finance',
                      icon: tileIcon(BriefcaseBusiness),
                      title: 'Personal Finance',
                      description: 'Budgeting, saving, planning, and practical money education.',
                      tags: ['budgeting', 'saving', 'career'],
                    },
                    {
                      value: 'travel',
                      icon: tileIcon(Plane),
                      title: 'Travel',
                      description: 'Guides, itineraries, family trips, and destination recs.',
                      tags: ['guides', 'itineraries', 'destinations'],
                    },
                  ]}
                />
              </StepLayout>
            </Section>

            <Section title="Celebration Modal" description="Used for badge earned, streak milestone, new role, and other gamification moments.">
              <Row label="Trigger by type">
                {Object.keys(modalExamples).map(type => (
                  <Button
                    key={type}
                    variant="secondary"
                    size="sm"
                    onClick={() => { setModalType(type); setModalOpen(true) }}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </Row>
              <div className="mt-4 p-4 bg-surface-sunken rounded-lg text-sm text-text-secondary space-y-1">
                <p className="font-medium text-text">Usage notes</p>
                <p>• Trigger on: badge earned, streak milestone, reaction milestone, role assignment</p>
                <p>• CTA leads to shareable achievement card (not yet built — next pattern)</p>
                <p>• "Maybe Later" dismisses — don't suppress it, community members should opt in to sharing</p>
                <p>• Confetti is CSS-only, no library dependency</p>
              </div>
            </Section>
          </>
        )}

      </main>

      {/* Modal rendered at root */}
      {modalOpen && (
        <CelebrationModal
          {...modalExamples[modalType]}
          isOpen={modalOpen}
          onConfirm={() => setModalOpen(false)}
          onDismiss={() => setModalOpen(false)}
        />
      )}
    </div>
  )
}
