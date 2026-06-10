import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildDesignManifest } from './export-design-manifest.mjs'

const figmaApiBaseUrl = 'https://api.figma.com/v1'

export function resolveFigmaAccessConfig(manifest, env = process.env) {
  const fileKey = env.FIGMA_FILE_KEY ?? manifest.figma?.destination?.fileKey ?? null
  const hasToken = Boolean(env.FIGMA_ACCESS_TOKEN)
  const missing = []

  if (!fileKey) missing.push('FIGMA_FILE_KEY')
  if (!hasToken) missing.push('FIGMA_ACCESS_TOKEN')

  return {
    fileKey,
    hasToken,
    missing,
  }
}

export function getFigmaAccessErrorMessage(payload, status) {
  if (payload.message?.includes('file_variables:read')) {
    return 'Figma token is missing the file_variables:read scope. Create a new token with file_variables:read and file_variables:write, then update FIGMA_ACCESS_TOKEN.'
  }

  return payload.message ?? `Figma access validation failed with ${status}`
}

async function readManifest(rootDir, manifestPath) {
  if (!manifestPath) {
    return buildDesignManifest({ rootDir })
  }

  return JSON.parse(await readFile(path.resolve(rootDir, manifestPath), 'utf8'))
}

function parseCliArgs(args) {
  const manifestIndex = args.indexOf('--manifest')
  return {
    manifestPath: manifestIndex >= 0 ? args[manifestIndex + 1] : null,
  }
}

async function runCli() {
  const rootDir = fileURLToPath(new URL('..', import.meta.url))
  const { manifestPath } = parseCliArgs(process.argv.slice(2))
  const manifest = await readManifest(rootDir, manifestPath)
  const config = resolveFigmaAccessConfig(manifest)

  if (config.missing.length > 0) {
    process.stdout.write(`Skipping Figma access validation: missing ${config.missing.join(', ')}.\n`)
    return
  }

  const response = await fetch(`${figmaApiBaseUrl}/files/${config.fileKey}/variables/local`, {
    headers: {
      'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN,
    },
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(getFigmaAccessErrorMessage(payload, response.status))
  }

  const collectionCount = Object.keys(payload.meta?.variableCollections ?? {}).length
  const variableCount = Object.keys(payload.meta?.variables ?? {}).length

  process.stdout.write([
    `Validated Figma access for ${manifest.figma.destination.name}.`,
    `File key: ${config.fileKey}`,
    `Readable variable collections: ${collectionCount}`,
    `Readable variables: ${variableCount}`,
    '',
  ].join('\n'))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await runCli()
}
