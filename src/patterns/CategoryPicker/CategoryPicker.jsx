import { Search } from 'lucide-react'
import { Badge } from '../../components/Badge/Badge.jsx'
import { LucideIcon } from '../../components/Icon/LucideIcon.jsx'
import { TextInput } from '../../components/TextInput/TextInput.jsx'
import { OptionTile } from '../../components/OptionTile/OptionTile.jsx'

export function CategoryPicker({
  title,
  description,
  searchValue = '',
  onSearchChange,
  categories = [],
  selected = [],
  onToggle,
  emptyMessage = 'No categories match that search yet.',
  className = '',
}) {
  const normalizedQuery = searchValue.trim().toLowerCase()
  const filteredCategories = normalizedQuery
    ? categories.filter((category) => {
        const haystack = [category.title, category.description, ...(category.tags ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return haystack.includes(normalizedQuery)
      })
    : categories

  const selectedCategories = categories.filter((category) => selected.includes(category.value))

  return (
    <section className={['space-y-4', className].filter(Boolean).join(' ')}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-semibold text-text">{title}</h3>}
          {description && <p className="text-sm text-text-secondary">{description}</p>}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <TextInput
          label="Search categories"
          placeholder="Search by topic, vertical, or audience"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          prefix={<LucideIcon icon={Search} size="sm" />}
        />

        <div className="flex flex-wrap items-center gap-2 md:justify-end">
          {selectedCategories.length > 0 ? (
            selectedCategories.map((category) => (
              <Badge
                key={category.value}
                variant="brand"
                size="sm"
                onRemove={() => onToggle?.(category.value)}
              >
                {category.title}
              </Badge>
            ))
          ) : (
            <Badge variant="default" size="sm">No categories selected</Badge>
          )}
        </div>
      </div>

      {filteredCategories.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCategories.map((category) => (
            <OptionTile
              key={category.value}
              icon={category.icon}
              title={category.title}
              description={category.description}
              selected={selected.includes(category.value)}
              multiSelect
              onClick={() => onToggle?.(category.value)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-border bg-surface px-5 py-8 text-sm text-text-secondary">
          {emptyMessage}
        </div>
      )}
    </section>
  )
}
