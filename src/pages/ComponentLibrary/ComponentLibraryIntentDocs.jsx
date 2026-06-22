function parseIntentBlocks(lines) {
  const blocks = []
  let paragraphLines = []
  let listBlock = null

  const flushParagraph = () => {
    if (!paragraphLines.length) return
    blocks.push({ type: 'paragraph', text: paragraphLines.join(' ') })
    paragraphLines = []
  }

  lines.forEach((rawLine) => {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      listBlock = null
      return
    }

    if (line.startsWith('- ')) {
      flushParagraph()
      if (!listBlock) {
        listBlock = { type: 'list', items: [] }
        blocks.push(listBlock)
      }
      listBlock.items.push(line.slice(2))
      return
    }

    if (listBlock && rawLine.startsWith('  ')) {
      const lastIndex = listBlock.items.length - 1
      listBlock.items[lastIndex] = `${listBlock.items[lastIndex]} ${line}`
      return
    }

    listBlock = null
    paragraphLines.push(line)
  })

  flushParagraph()
  return blocks
}

function parseIntentMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/)
  let title = 'Component'
  let currentSection = null
  const sections = []

  lines.forEach((line) => {
    if (line.startsWith('# ')) {
      title = line.replace(/^#\s+/, '').trim()
      return
    }

    if (line.startsWith('## ')) {
      currentSection = {
        title: line.replace(/^##\s+/, '').trim(),
        lines: [],
      }
      sections.push(currentSection)
      return
    }

    if (currentSection) {
      currentSection.lines.push(line)
    }
  })

  return {
    title,
    sections: sections.map((section) => ({
      ...section,
      blocks: parseIntentBlocks(section.lines),
    })),
  }
}

function InlineIntentText({ text }) {
  return text.split(/(`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={`${part}-${index}`} className="rounded-sm bg-surface-sunken px-1 py-0.5 font-mono text-xs text-text">
          {part.slice(1, -1)}
        </code>
      )
    }

    return <span key={`${part}-${index}`}>{part}</span>
  })
}

function IntentSection({ section }) {
  const listBlock = section.blocks.find((block) => block.type === 'list')
  const paragraphBlocks = section.blocks.filter((block) => block.type === 'paragraph')
  const markerClassName = section.title === 'Escalate When' ? 'bg-status-warning' : 'bg-brand'

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-text">{section.title}</h3>
      <div className="space-y-3 text-sm leading-relaxed text-text-secondary">
        {paragraphBlocks.map((block, index) => (
          <p key={`${section.title}-paragraph-${index}`}>
            <InlineIntentText text={block.text} />
          </p>
        ))}
        {listBlock ? (
          <ul className="space-y-2">
            {listBlock.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className={['mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full', markerClassName].join(' ')} aria-hidden="true" />
                <span><InlineIntentText text={item} /></span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export function ComponentIntentDoc({ markdown, eyebrow = 'Usage guidance' }) {
  if (!markdown) return null

  const intent = parseIntentMarkdown(markdown)
  const purposeSection = intent.sections.find((section) => section.title === 'Purpose')
  const guidanceSections = intent.sections.filter((section) => section.title !== 'Purpose')

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-raised shadow-xs">
      <div className="border-b border-border bg-surface px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-caps text-text-tertiary">{eyebrow}</p>
        <h3 className="mt-1 text-lg font-semibold text-text">{intent.title}</h3>
        {purposeSection ? (
          <div className="mt-2 max-w-3xl space-y-2 text-sm leading-relaxed text-text-secondary">
            {purposeSection.blocks.map((block, index) => (
              block.type === 'paragraph' ? (
                <p key={`purpose-${index}`}>
                  <InlineIntentText text={block.text} />
                </p>
              ) : null
            ))}
          </div>
        ) : null}
      </div>
      <div className="divide-y divide-border">
        {guidanceSections.map((section) => (
          <div key={section.title} className="px-5 py-4">
            <IntentSection section={section} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function IntentPurposePanel({ markdown, eyebrow = 'Usage guidance' }) {
  if (!markdown) return null

  const intent = parseIntentMarkdown(markdown)
  const purposeSection = intent.sections.find((section) => section.title === 'Purpose')

  return (
    <section className="h-full rounded-xl border border-border bg-surface-raised p-5 shadow-xs">
      <p className="text-xs font-semibold uppercase tracking-caps text-text-tertiary">{eyebrow}</p>
      <h2 className="mt-1 text-lg font-semibold text-text">{intent.title}</h2>
      {purposeSection ? (
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
          {purposeSection.blocks.map((block, index) => (
            block.type === 'paragraph' ? (
              <p key={`purpose-panel-${index}`}>
                <InlineIntentText text={block.text} />
              </p>
            ) : null
          ))}
        </div>
      ) : null}
    </section>
  )
}

export function IntentSectionPanel({ markdown, sectionTitle, eyebrow, ariaLabel }) {
  if (!markdown) return null

  const intent = parseIntentMarkdown(markdown)
  const section = intent.sections.find((item) => item.title === sectionTitle)

  if (!section) return null

  return (
    <aside className="h-full rounded-xl border border-border bg-surface-raised p-5 shadow-xs" aria-label={ariaLabel}>
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-caps text-text-tertiary">{eyebrow}</p>}
      <IntentSection section={section} />
    </aside>
  )
}
