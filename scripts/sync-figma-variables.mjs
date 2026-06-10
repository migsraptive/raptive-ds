import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildDesignManifest } from './export-design-manifest.mjs'

const figmaApiBaseUrl = 'https://api.figma.com/v1'

const collectionTokenKeys = {
  colors: 'colors',
  spacing: 'spacing',
  typography: 'typography',
  effects: ['radius', 'shadows'],
}

function toTempId(parts) {
  return parts
    .join('_')
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function flattenTokenEntries(value, prefix = []) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return Object.entries(value).flatMap(([key, childValue]) => (
      flattenTokenEntries(childValue, [...prefix, key])
    ))
  }

  return [
    {
      name: prefix.join('/'),
      value,
    },
  ]
}

function hexToFigmaColor(hex) {
  const normalized = hex.replace('#', '')
  const r = Number.parseInt(normalized.slice(0, 2), 16) / 255
  const g = Number.parseInt(normalized.slice(2, 4), 16) / 255
  const b = Number.parseInt(normalized.slice(4, 6), 16) / 255

  return { r, g, b, a: 1 }
}

function toFigmaVariableValue(value) {
  if (typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value)) {
    return {
      resolvedType: 'COLOR',
      value: hexToFigmaColor(value),
    }
  }

  if (typeof value === 'string' && /^-?\d+(\.\d+)?px$/.test(value)) {
    return {
      resolvedType: 'FLOAT',
      value: Number.parseFloat(value),
    }
  }

  if (typeof value === 'number') {
    return {
      resolvedType: 'FLOAT',
      value,
    }
  }

  if (typeof value === 'boolean') {
    return {
      resolvedType: 'BOOLEAN',
      value,
    }
  }

  return {
    resolvedType: 'STRING',
    value: typeof value === 'string' ? value : JSON.stringify(value),
  }
}

function findLocalCollection(localVariables, name) {
  return Object.values(localVariables.variableCollections ?? {}).find((collection) => (
    collection.name === name && !collection.remote
  ))
}

function findLocalVariable(localVariables, collectionId, name) {
  return Object.values(localVariables.variables ?? {}).find((variable) => (
    variable.name === name
    && variable.variableCollectionId === collectionId
    && !variable.remote
  ))
}

function tokenEntriesForCollection(manifest, collectionKey) {
  const tokenKey = collectionTokenKeys[collectionKey]

  if (Array.isArray(tokenKey)) {
    return tokenKey.flatMap((key) => flattenTokenEntries(manifest.tokens[key], [key]))
  }

  return flattenTokenEntries(manifest.tokens[tokenKey])
}

export function buildFigmaVariableSyncPlan(manifest, localVariables) {
  const variableCollections = []
  const variables = []
  const variableModeValues = []

  for (const [collectionKey, collectionConfig] of Object.entries(manifest.figma.variableCollections)) {
    const existingCollection = findLocalCollection(localVariables, collectionConfig.name)
    const collectionId = existingCollection?.id ?? toTempId(['community', collectionKey, 'collection'])
    const modeId = existingCollection?.defaultModeId ?? toTempId(['community', collectionKey, 'mode'])

    if (!existingCollection) {
      variableCollections.push({
        action: 'CREATE',
        id: collectionId,
        name: collectionConfig.name,
        initialModeId: modeId,
      })
    }

    for (const token of tokenEntriesForCollection(manifest, collectionKey)) {
      const figmaValue = toFigmaVariableValue(token.value)
      const existingVariable = existingCollection
        ? findLocalVariable(localVariables, existingCollection.id, token.name)
        : null
      const variableId = existingVariable?.id ?? toTempId(['community', collectionKey, token.name])
      const codeSyntaxName = `--community-${collectionKey}-${token.name.replaceAll('/', '-')}`

      if (existingVariable) {
        variables.push({
          action: 'UPDATE',
          id: existingVariable.id,
          name: token.name,
          codeSyntax: {
            WEB: codeSyntaxName,
          },
        })
      } else {
        variables.push({
          action: 'CREATE',
          id: variableId,
          name: token.name,
          variableCollectionId: collectionId,
          resolvedType: figmaValue.resolvedType,
          codeSyntax: {
            WEB: codeSyntaxName,
          },
        })
      }

      variableModeValues.push({
        variableId,
        modeId,
        value: figmaValue.value,
      })
    }
  }

  return {
    variableCollections,
    variables,
    variableModeValues,
  }
}

async function figmaRequest({ fileKey, token, endpoint, method = 'GET', body }) {
  const response = await fetch(`${figmaApiBaseUrl}${endpoint.replace(':file_key', fileKey)}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Figma-Token': token,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload.message ?? `Figma API request failed with ${response.status}`)
  }

  return payload
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
  const token = process.env.FIGMA_ACCESS_TOKEN
  const manifest = await readManifest(rootDir, manifestPath)
  const fileKey = process.env.FIGMA_FILE_KEY ?? manifest.figma?.destination?.fileKey

  if (!fileKey) {
    process.stdout.write('Skipping Figma variable sync: a Figma file key must be configured in the manifest or FIGMA_FILE_KEY.\n')
    return
  }

  if (!token) {
    process.stdout.write('Skipping Figma variable sync: FIGMA_ACCESS_TOKEN is required.\n')
    return
  }

  const localResponse = await figmaRequest({
    fileKey,
    token,
    endpoint: '/files/:file_key/variables/local',
  })
  const plan = buildFigmaVariableSyncPlan(manifest, localResponse.meta)

  await figmaRequest({
    fileKey,
    token,
    endpoint: '/files/:file_key/variables',
    method: 'POST',
    body: plan,
  })

  process.stdout.write([
    `Synced ${plan.variableCollections.length} Figma variable collections.`,
    `Synced ${plan.variables.length} Figma variables.`,
    `Updated ${plan.variableModeValues.length} Figma variable values.`,
    '',
  ].join('\n'))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await runCli()
}
