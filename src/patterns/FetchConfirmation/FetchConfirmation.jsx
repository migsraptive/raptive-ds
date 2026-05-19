import recognitionIllustrationUrl from '../../assets/recognition-illustration.png'
import instagramRoundLogoUrl from '../../assets/social/instagram-round.jpg'
import pinterestRoundLogoUrl from '../../assets/social/pinterest-round.png'
import tiktokRoundLogoUrl from '../../assets/social/tiktok-round.png'
import { Avatar } from '../../components/Avatar/Avatar.jsx'
import { Badge } from '../../components/Badge/Badge.jsx'
import { Button } from '../../components/Button/Button.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { Textarea } from '../../components/Textarea/Textarea.jsx'

function SocialPlatformMark({ platform }) {
  const logoMap = {
    Instagram: instagramRoundLogoUrl,
    TikTok: tiktokRoundLogoUrl,
    Pinterest: pinterestRoundLogoUrl,
  }

  const logoSrc = logoMap[platform]

  if (logoSrc) {
    return (
      <img
        src={logoSrc}
        alt=""
        className="h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
    )
  }

  return <span className="text-xs font-semibold uppercase">{platform.slice(0, 1)}</span>
}

function SectionCard({ children, className = '' }) {
  return (
    <div className={['rounded-[28px] border border-border bg-surface p-5 shadow-xs', className].join(' ')}>
      {children}
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p className="text-xs font-medium uppercase tracking-caps text-text-tertiary">
      {children}
    </p>
  )
}

function FieldRow({ label, value, onChange, onSave, onCancel, editing, multiline = false }) {
  return editing ? (
    <div className="space-y-4">
      {multiline ? (
        <Textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} />
      ) : (
        <TextInput value={value} onChange={(event) => onChange(event.target.value)} />
      )}
      <div className="flex flex-wrap gap-3">
        <Button size="lg" variant="ghost" className="text-text-action-subtle" onClick={onCancel}>Cancel</Button>
        <Button size="lg" variant="secondary" onClick={onSave}>Save</Button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <p className="min-w-0 flex-1 text-base leading-relaxed text-text">{label}</p>
      <Button size="lg" variant="secondary" onClick={onSave}>
        Edit
      </Button>
    </div>
  )
}

function AccountCard({
  account,
  isEditing,
  draft,
  onDraftChange,
  onStartEdit,
  onCancel,
  onConfirm,
  onRemove,
}) {
  return (
    <SectionCard>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-transparent text-sm font-semibold uppercase tracking-caps text-text-secondary">
            <SocialPlatformMark platform={account.platform} />
          </div>
          <div className="min-w-0 flex-1">
            <SectionLabel>{account.platform}</SectionLabel>

            {isEditing ? (
              <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)_180px_auto] lg:items-end">
                <TextInput
                  label="Handle"
                  value={draft.handle}
                  onChange={(event) => onDraftChange({ ...draft, handle: event.target.value })}
                />
                <TextInput
                  label="URL"
                  value={draft.url}
                  onChange={(event) => onDraftChange({ ...draft, url: event.target.value })}
                />
                <TextInput
                  label="Followers"
                  value={draft.followers}
                  onChange={(event) => onDraftChange({ ...draft, followers: event.target.value })}
                />
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Button size="lg" variant="ghost" className="text-text-action-subtle" onClick={onCancel}>Cancel</Button>
                  <Button size="lg" variant="secondary" onClick={onConfirm}>Save</Button>
                </div>
              </div>
            ) : (
              <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xl font-semibold tracking-tight text-text">{account.handle}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
                    <p>{account.url}</p>
                    <p>{account.followers}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <Button size="lg" variant="secondary" onClick={onStartEdit}>Edit</Button>
                  <Button size="lg" variant="ghost" className="text-text-action-subtle" onClick={onRemove}>Remove</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

export function FetchConfirmation({
  loading = false,
  creator,
  progressMeter = null,
  website,
  newsletter,
  accounts,
  editingField,
  editDraft,
  onEditDraftChange,
  onStartEditing,
  onCancelEditing,
  onSaveEditing,
  onRemoveAccount,
  secondaryAction,
  primaryAction,
}) {
  return (
    <section className="overflow-hidden rounded-[36px] border border-border bg-surface shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_360px]">
        <div className="flex h-full flex-col p-8 lg:p-12">
          <div className="space-y-8">
            {progressMeter}

            <div className="space-y-4">
              <Badge variant={loading ? 'warning' : 'brand'} size="sm">
                {loading ? 'Fetching identity' : 'Confirm details'}
              </Badge>
              <div className="space-y-3">
                <h2 className="font-newsreader max-w-3xl text-[48px] font-normal leading-[52px] tracking-tight text-text">
                  {loading ? 'We’re pulling the first creator details now.' : 'Confirm what we found before moving forward.'}
                </h2>
                <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
                  Review the pulled fields below. Website, newsletter, and social accounts can be updated here before continuing.
                </p>
              </div>
            </div>

            <SectionCard className="bg-surface-raised">
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
                <div className="flex items-center gap-4">
                  <Avatar name={creator.name} size="xl" shape="square" />
                  <div className="space-y-1">
                    <SectionLabel>Creator name</SectionLabel>
                    <p className="font-newsreader text-[48px] font-normal leading-[52px] tracking-tight text-text">{creator.name}</p>
                  </div>
                </div>

                <div className="rounded-[24px] border border-border bg-surface p-4">
                  <SectionLabel>Estimated reach</SectionLabel>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-text">{creator.reach}</p>
                  <p className="mt-1 text-sm text-text-secondary">{creator.reachDetail}</p>
                </div>
              </div>
            </SectionCard>

            <div className="grid gap-4 md:grid-cols-2">
              <SectionCard>
                <div className="space-y-3">
                  <SectionLabel>Website</SectionLabel>
                  <FieldRow
                    label={website}
                    value={editDraft}
                    onChange={onEditDraftChange}
                    editing={editingField === 'website'}
                    onSave={editingField === 'website' ? onSaveEditing : () => onStartEditing('website', website)}
                    onCancel={onCancelEditing}
                  />
                </div>
              </SectionCard>

              <SectionCard>
                <div className="space-y-3">
                  <SectionLabel>Newsletter</SectionLabel>
                  <FieldRow
                    label={newsletter}
                    value={editDraft}
                    onChange={onEditDraftChange}
                    editing={editingField === 'newsletter'}
                    multiline
                    onSave={editingField === 'newsletter' ? onSaveEditing : () => onStartEditing('newsletter', newsletter)}
                    onCancel={onCancelEditing}
                  />
                </div>
              </SectionCard>
            </div>

            <div className="grid gap-4">
              {accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  isEditing={editingField === account.id}
                  draft={editDraft}
                  onDraftChange={onEditDraftChange}
                  onStartEdit={() => onStartEditing(account.id, account)}
                  onCancel={onCancelEditing}
                  onConfirm={onSaveEditing}
                  onRemove={() => onRemoveAccount(account.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
            {secondaryAction && (
              <Button size="lg" variant={secondaryAction.variant ?? 'ghost'} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )}
            {primaryAction && (
              <Button size="lg" variant={primaryAction.variant ?? 'primary'} onClick={primaryAction.onClick} loading={loading}>
                {primaryAction.label}
              </Button>
            )}
          </div>
        </div>

        <aside className="border-t border-border bg-surface-raised/40 p-0 lg:border-l lg:border-t-0">
          <div className="relative h-full min-h-[720px]">
            <img
              src={recognitionIllustrationUrl}
              alt="Recognition reveal illustration for the creator application fetch step"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-6 py-6">
              <p className="text-sm leading-relaxed text-white/92">
                Pulled signals are editable here so the creator can confirm the profile before the next step.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
