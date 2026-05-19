import { useState } from 'react'
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  Flag,
  House,
  Inbox,
  LogOut,
  MessageSquare,
  MoreHorizontal,
  Plus,
  User,
  UserRoundX,
  Wrench,
} from 'lucide-react'
import { Avatar } from '../Avatar/Avatar.jsx'
import { LucideIcon } from '../Icon/LucideIcon.jsx'

const primaryNav = [
  { label: 'Home', icon: House, active: true, unread: true },
  { label: 'My Activity', icon: BarChart3 },
  { label: 'My Profile', icon: User },
  { label: 'Review', icon: Flag },
  { label: 'Admin', icon: Wrench },
  { label: 'Inbox', icon: Inbox },
  { label: 'Chat', icon: MessageSquare },
  { label: 'Log out', icon: LogOut },
  { label: 'More', icon: MoreHorizontal },
]

const topCategories = [
  {
    label: 'Introduce Yourself',
    avatarName: 'Julia Child',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'Challenges',
    avatarName: 'Marcus Rivera',
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'Kid Friendly',
    avatarName: 'Naomi Chen',
    avatarSrc: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'All Things Tasty',
    avatarName: 'Avery Brooks',
    avatarSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'Meal Prepping',
    avatarName: 'Priya Shah',
    avatarSrc: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=96&q=80',
  },
]

const communityCategories = [
  {
    label: 'Julia Child',
    avatarName: 'Julia Child',
    avatarSrc: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: "Sally's Baking",
    avatarName: "Sally's Baking",
    avatarSrc: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'Make & Do Crew',
    avatarName: 'Make & Do Crew',
    avatarSrc: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'The Best Ideas for Kids',
    avatarName: 'The Best Ideas for Kids',
    avatarSrc: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=96&q=80',
  },
  {
    label: 'Lambeau Leapers',
    avatarName: 'Lambeau Leapers',
    avatarSrc: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=96&q=80',
  },
]

const starterSections = [
  { title: 'Meal Planning and Recipes', count: 4 },
  { title: 'Dietary Needs', count: 3 },
  { title: 'My Communities', count: 15 },
]

const interestTags = [
  'Family Meals & Meal Planning',
  'Picky Eaters',
  'School-Aged Kids (K-5)',
  'Babies & Toddlers',
  'Parent Self-Care',
  'Pregnancy',
  'Tweens',
  'Teens',
  'Fitness',
  'Running',
  'Weightlifting',
  'Serious Fitness',
  'Beginner Fitness',
  'Travel',
  'Wellness',
  'Healthy Eating',
  'Sleep',
  'Mindfulness',
  'Disney',
  'Pets',
  'TV Shows',
  'Career Advice',
  'Finance',
]

const chatPeople = [
  {
    name: 'Jane Doe',
    status: 'online',
    avatarSrc: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=72&q=80',
  },
  {
    name: 'Amber Smith',
    status: 'online',
    avatarSrc: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=72&q=80',
  },
  {
    name: 'Jessica Jones',
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=72&q=80',
  },
]

function SidebarItem({ icon: Icon, label, active = false, unread = false, tone = 'default', leading = null }) {
  const toneClass = tone === 'danger'
    ? 'text-status-error'
    : 'text-text'

  return (
    <button
      type="button"
      className={[
        'flex h-11 w-full items-center gap-3 rounded-full px-4 py-2 text-left transition-colors',
        active ? 'bg-[#F5F5FF]' : 'bg-white hover:bg-surface-sunken',
        toneClass,
      ].join(' ')}
    >
      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center">
        {leading || <LucideIcon icon={Icon} size="md" stroke="standard" />}
      </span>
      <span className="min-w-0 flex-1 text-[15px] leading-6 tracking-[-0.2px]">{label}</span>
      {unread ? <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-status-error" /> : null}
    </button>
  )
}

function SidebarDivider() {
  return <div className="h-px w-full bg-border-strong" />
}

function SectionHeader({ title, count, open, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-[52px] w-full items-center gap-2 rounded-2xl px-4 text-left"
    >
      <span className="min-w-0 flex-1 text-sm font-bold uppercase tracking-[-0.2px] text-neutral-500">
        {title}
        {count != null ? <span className="ml-1 text-neutral-400">{count}</span> : null}
      </span>
      <LucideIcon icon={open ? ChevronUp : ChevronDown} size="md" stroke="standard" className="text-neutral-500" />
    </button>
  )
}

function TagPill({ label, active = false }) {
  return (
    <button
      type="button"
      className={[
        'rounded-full border px-4 py-2 text-sm font-bold tracking-[-0.2px] transition-colors',
        active
          ? 'border-gamification-gold-light bg-gamification-gold-light text-text'
          : 'border-text-placeholder bg-white text-text hover:bg-surface-sunken',
      ].join(' ')}
    >
      {label}
    </button>
  )
}

function DiscoverMoreBadge() {
  return (
    <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border bg-white">
      <LucideIcon icon={Plus} size="md" stroke="standard" />
      <span className="absolute right-[-1px] top-[-1px] h-1.5 w-1.5 rounded-full bg-status-error" />
    </span>
  )
}

export function CommunitySidebar({
  className = '',
  selectedCommunity = communityCategories[0]?.label ?? 'Julia Child',
  compact = false,
}) {
  const [openSections, setOpenSections] = useState({
    topCategories: true,
    juliaChild: true,
    browseByInterest: true,
    healthWellness: false,
    chat: true,
  })

  const toggleSection = (key) => {
    setOpenSections((current) => ({ ...current, [key]: !current[key] }))
  }

  const visiblePrimaryNav = compact ? primaryNav.slice(0, 8) : primaryNav
  const visibleTopCategories = compact ? topCategories.slice(0, 4) : topCategories
  const visibleCommunityCategories = compact ? communityCategories.slice(0, 1) : communityCategories

  return (
    <aside
      className={[
        'flex w-[352px] flex-col border-r border-border-strong bg-white',
        className,
      ].join(' ')}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 pt-4">
          <div className="space-y-2 pb-2">
            {visiblePrimaryNav.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>

          <SidebarDivider />

          <div className="py-1">
            <SectionHeader
              title="Top Categories"
              count={15}
              open={openSections.topCategories}
              onToggle={() => toggleSection('topCategories')}
            />
            <SidebarDivider />
            {openSections.topCategories ? (
              <div className="space-y-0.5 py-2">
                {visibleTopCategories.map((item) => (
                  <SidebarItem
                    key={item.label}
                    label={item.label}
                    leading={<Avatar name={item.avatarName} src={item.avatarSrc} size="sm" />}
                  />
                ))}
                {!compact ? (
                  <button type="button" className="px-4 py-3 text-sm font-bold tracking-[-0.2px] text-text">
                    See more
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="py-1">
            <SectionHeader
              title="Julia Child Community"
              count={7}
              open={openSections.juliaChild}
              onToggle={() => toggleSection('juliaChild')}
            />
            <SidebarDivider />
            {openSections.juliaChild ? (
              <div className="space-y-0.5 py-2">
                {visibleCommunityCategories.map((item, index) => (
                  <SidebarItem
                    key={item.label}
                    label={index === 0 ? selectedCommunity : item.label}
                    active={index === 0}
                    unread={index === 0}
                    leading={<Avatar name={item.avatarName} src={item.avatarSrc} size="sm" />}
                  />
                ))}
                {!compact ? (
                  <>
                    <SidebarItem
                      label="Discover more"
                      leading={<DiscoverMoreBadge />}
                    />
                    <button type="button" className="px-4 py-3 text-sm font-bold tracking-[-0.2px] text-text">
                      See more
                    </button>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>

          {!compact ? starterSections.map((section) => (
            <div key={section.title} className="py-1">
              <SectionHeader
                title={section.title}
                count={section.count}
                open={false}
                onToggle={() => {}}
              />
              <SidebarDivider />
            </div>
          )) : null}

          {!compact ? (
            <>
              <div className="py-1">
                <SectionHeader
                  title="Browse by Interest"
                  open={openSections.browseByInterest}
                  onToggle={() => toggleSection('browseByInterest')}
                />
                <SidebarDivider />
                {openSections.browseByInterest ? (
                  <div className="flex flex-wrap gap-2 px-1 py-4">
                    {interestTags.map((tag, index) => (
                      <TagPill key={tag} label={tag} active={index === 0} />
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="py-1">
                <SectionHeader
                  title="Health & Wellness"
                  count={3}
                  open={openSections.healthWellness}
                  onToggle={() => toggleSection('healthWellness')}
                />
                <SidebarDivider />
              </div>

              <div className="py-1">
                <SectionHeader
                  title="Chat"
                  open={openSections.chat}
                  onToggle={() => toggleSection('chat')}
                />
                <SidebarDivider />
                {openSections.chat ? (
                  <div className="space-y-0.5 py-2">
                    {chatPeople.map((person) => (
                      <SidebarItem
                        key={person.name}
                        label={person.name}
                        leading={<Avatar name={person.name} src={person.avatarSrc} size="xs" status={person.status ?? null} />}
                      />
                    ))}
                    <button type="button" className="px-4 py-3 text-sm font-bold tracking-[-0.2px] text-text">
                      See more
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </div>

        {!compact ? (
          <>
            <SidebarDivider />

            <div className="px-4 py-2">
              <SidebarItem
                icon={UserRoundX}
                label="Leave community"
                tone="danger"
              />
            </div>

            <SidebarDivider />

            <div className="px-4 py-4">
              <p className="text-xs leading-[18px] text-neutral-500">
                Information from your device can be used to personalize your ad experience.
              </p>
              <button type="button" className="mt-3 text-left text-xs leading-[18px] text-neutral-500 underline">
                Do not sell or share my personal information
              </button>
            </div>
          </>
        ) : null}
      </div>
    </aside>
  )
}
