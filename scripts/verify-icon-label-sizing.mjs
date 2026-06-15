import { readFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)

function read(file) {
  return readFileSync(new URL(file, root), 'utf8')
}

const expectations = [
  {
    file: 'src/globals.css',
    includes: [
      '.paired-label-icon',
      'width: 1lh;',
      'height: 1lh;',
      '.paired-label-icon svg',
    ],
  },
  {
    file: 'src/components/Button/Button.jsx',
    includes: [
      'paired-label-icon',
      '<Spinner />',
    ],
    excludes: ['const iconSizes'],
  },
  {
    file: 'src/components/Badge/Badge.jsx',
    includes: ['paired-label-icon'],
    excludes: ['flex-shrink-0 w-3 h-3">{icon}</span>'],
  },
  {
    file: 'src/components/TextInput/TextInput.jsx',
    includes: [
      'isValidElement',
      'affixLineHeight',
      'paired-label-icon',
    ],
    excludes: ['flex-shrink-0 text-sm'],
  },
  {
    file: 'src/components/Select/Select.jsx',
    includes: ['paired-label-icon text-base leading-sm'],
    excludes: ['flex h-4 w-4 flex-shrink-0'],
  },
  {
    file: 'src/components/AccordionPanel/AccordionPanel.jsx',
    includes: ['paired-label-icon'],
  },
  {
    file: 'src/components/AuthorRow/AuthorRow.jsx',
    includes: ['paired-label-icon text-body leading-md'],
  },
  {
    file: 'src/components/CommunitySidebar/CommunitySidebar.jsx',
    includes: [
      'paired-label-icon text-body leading-6',
      'paired-label-icon text-sm leading-sm',
    ],
  },
  {
    file: 'src/components/PostActionBar/PostActionBar.jsx',
    includes: [
      'paired-label-icon text-xs leading-none',
      'paired-label-icon text-2xs leading-none',
      'paired-label-icon text-sm leading-sm',
    ],
  },
  {
    file: 'src/components/Comment/Comment.jsx',
    includes: ['paired-label-icon text-xs leading-none'],
  },
  {
    file: 'src/components/CompactField/CompactField.jsx',
    includes: ['paired-label-icon text-base leading-snug'],
    excludes: ['flex h-4 w-4 flex-shrink-0'],
  },
  {
    file: 'src/patterns/SingleFieldIntake/SingleFieldIntake.jsx',
    includes: ['affixLineHeight="md"'],
  },
  {
    file: 'src/patterns/VerificationStep/VerificationStep.jsx',
    includes: ['paired-label-icon text-sm leading-sm'],
  },
]

const failures = []

for (const expectation of expectations) {
  const source = read(expectation.file)

  for (const needle of expectation.includes ?? []) {
    if (!source.includes(needle)) {
      failures.push(`${expectation.file} is missing ${JSON.stringify(needle)}`)
    }
  }

  for (const needle of expectation.excludes ?? []) {
    if (source.includes(needle)) {
      failures.push(`${expectation.file} still contains ${JSON.stringify(needle)}`)
    }
  }
}

if (failures.length > 0) {
  console.error('Icon/label sizing contract failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log('Icon/label sizing contract passed.')
