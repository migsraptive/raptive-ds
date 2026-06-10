import { execFileSync } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const defaultReviewSurfaces = [
  {
    name: 'Component Library',
    path: '/community-ds/?view=component-library',
    figmaPageName: 'Latest from main / Component Library',
  },
  {
    name: 'Creator Application',
    path: '/community-ds/?view=creator-application',
    figmaPageName: 'Latest from main / Creator Application',
  },
  {
    name: 'Creator Onboarding Desktop Flow',
    path: '/community-ds/?view=creator-onboarding-viewport',
    figmaPageName: 'Latest from main / Creator Onboarding Desktop Flow',
  },
]

const figmaVariableCollections = {
  colors: {
    name: 'Community / Colors',
    sourcePath: 'src/tokens/colors.js',
  },
  spacing: {
    name: 'Community / Spacing',
    sourcePath: 'src/tokens/spacing.js',
  },
  typography: {
    name: 'Community / Typography',
    sourcePath: 'src/tokens/typography.js',
  },
  effects: {
    name: 'Community / Effects',
    sourcePath: 'src/tokens/effects.js',
  },
}

const figmaDestination = {
  name: 'Creator Application Flow',
  fileKey: 'infX09HpqqIzfmZ5YmAbI6',
  url: 'https://www.figma.com/design/infX09HpqqIzfmZ5YmAbI6/Creator-Application-Flow?node-id=0-1',
  rootNodeId: '0:1',
}

function rootPathFrom(rootDir) {
  return rootDir instanceof URL ? fileURLToPath(rootDir) : path.resolve(rootDir)
}

function getGitSha(rootDir) {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA

  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], {
      cwd: rootDir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return 'unknown'
  }
}

function extractYamlScalar(source, key) {
  const match = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? null
}

function extractSourcePath(source) {
  const sourceBlock = source.match(/^source:\n((?:  .+\n?)+)/m)
  if (!sourceBlock) return null

  const pathMatch = sourceBlock[1].match(/^  path:\s*(.+)$/m)
  return pathMatch?.[1]?.trim().replace(/^['"]|['"]$/g, '') ?? null
}

function titleFromSlug(slug) {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

async function readComponentSpecs(rootDir) {
  const componentsDir = path.join(rootDir, 'design/components')
  const files = await readdir(componentsDir)
  const specFiles = files
    .filter((file) => file.endsWith('.yml') && !file.startsWith('_'))
    .sort((a, b) => a.localeCompare(b))

  return Promise.all(specFiles.map(async (file) => {
    const specPath = `design/components/${file}`
    const specSource = await readFile(path.join(rootDir, specPath), 'utf8')
    const slug = file.replace(/\.yml$/, '')
    const name = extractYamlScalar(specSource, 'name') ?? titleFromSlug(slug)

    return {
      name,
      slug,
      status: extractYamlScalar(specSource, 'status') ?? 'unknown',
      specPath,
      sourcePath: extractSourcePath(specSource),
      specSource,
    }
  }))
}

async function readTokens(rootDir) {
  const tokensUrl = pathToFileURL(path.join(rootDir, 'src/tokens/index.js')).href
  const { colors, spacing, typography, radius, shadows } = await import(tokensUrl)

  return {
    colors,
    spacing,
    typography,
    radius,
    shadows,
  }
}

export async function buildDesignManifest({
  rootDir = new URL('..', import.meta.url),
  gitSha,
  generatedAt,
} = {}) {
  const rootPath = rootPathFrom(rootDir)
  const packageJson = JSON.parse(await readFile(path.join(rootPath, 'package.json'), 'utf8'))
  const [tokens, components] = await Promise.all([
    readTokens(rootPath),
    readComponentSpecs(rootPath),
  ])

  return {
    schemaVersion: 'community-design-sync/v1',
    project: {
      name: packageJson.name,
      version: packageJson.version,
      repository: 'cafemedia/community-ds',
      productionUrl: 'https://community-ds.vercel.app',
    },
    source: {
      gitSha: gitSha ?? getGitSha(rootPath),
      generatedAt: generatedAt ?? new Date().toISOString(),
      branch: process.env.GITHUB_REF_NAME ?? null,
    },
    figma: {
      destination: figmaDestination,
      variableCollections: figmaVariableCollections,
      importPagePrefix: 'Latest from main',
      codeConnect: {
        enabled: false,
        reason: 'Requires Figma org setup and component node URLs before publishing mappings.',
      },
    },
    reviewSurfaces: defaultReviewSurfaces,
    tokens,
    components,
  }
}

function parseCliArgs(args) {
  const outIndex = args.indexOf('--out')
  return {
    outPath: outIndex >= 0 ? args[outIndex + 1] : 'dist/design-sync/latest-main.json',
  }
}

async function runCli() {
  const rootDir = fileURLToPath(new URL('..', import.meta.url))
  const { outPath } = parseCliArgs(process.argv.slice(2))
  const manifest = await buildDesignManifest({ rootDir })
  const absoluteOutPath = path.resolve(rootDir, outPath)

  await mkdir(path.dirname(absoluteOutPath), { recursive: true })
  await writeFile(absoluteOutPath, `${JSON.stringify(manifest, null, 2)}\n`)

  process.stdout.write(`Wrote ${path.relative(rootDir, absoluteOutPath)}\n`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await runCli()
}
