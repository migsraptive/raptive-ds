import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { buildDesignManifest } from '../scripts/export-design-manifest.mjs'
import { buildFigmaVariableSyncPlan } from '../scripts/sync-figma-variables.mjs'
import { getFigmaAccessErrorMessage, resolveFigmaAccessConfig } from '../scripts/validate-figma-access.mjs'

const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('builds a design sync manifest from tokens and component specs', async () => {
  const manifest = await buildDesignManifest({
    rootDir: new URL('..', import.meta.url),
    gitSha: 'test-sha',
    generatedAt: '2026-06-09T00:00:00.000Z',
  })

  assert.equal(manifest.schemaVersion, 'community-design-sync/v1')
  assert.equal(manifest.project.name, packageJson.name)
  assert.equal(manifest.source.gitSha, 'test-sha')
  assert.equal(manifest.source.generatedAt, '2026-06-09T00:00:00.000Z')
  assert.equal(manifest.figma.destination.fileKey, 'infX09HpqqIzfmZ5YmAbI6')
  assert.equal(manifest.figma.destination.name, 'Creator Application Flow')
  assert.equal(manifest.figma.variableCollections.colors.name, 'Community / Colors')
  assert.equal(manifest.figma.variableCollections.spacing.name, 'Community / Spacing')
  assert.equal(manifest.figma.variableCollections.typography.name, 'Community / Typography')
  assert.equal(manifest.figma.variableCollections.effects.name, 'Community / Effects')
  assert.ok(manifest.tokens.colors.action.primary)
  assert.equal(manifest.tokens.spacing.s, '16px')
  assert.ok(manifest.tokens.typography.fontSize.body)
  assert.equal(manifest.tokens.radius.full, '9999px')
  assert.ok(manifest.tokens.shadows['elevation-1'])
  assert.ok(manifest.components.some((component) => component.name === 'Button'))
  assert.ok(manifest.components.some((component) => component.name === 'Badge'))
})

test('includes import targets for the live review surfaces', async () => {
  const manifest = await buildDesignManifest({
    rootDir: new URL('..', import.meta.url),
    gitSha: 'test-sha',
    generatedAt: '2026-06-09T00:00:00.000Z',
  })

  assert.deepEqual(manifest.reviewSurfaces, [
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
  ])
})

test('builds a Figma variable sync plan for token collections', async () => {
  const manifest = await buildDesignManifest({
    rootDir: new URL('..', import.meta.url),
    gitSha: 'test-sha',
    generatedAt: '2026-06-09T00:00:00.000Z',
  })

  const plan = buildFigmaVariableSyncPlan(manifest, {
    variableCollections: {},
    variables: {},
  })

  assert.ok(plan.variableCollections.some((change) => (
    change.action === 'CREATE'
    && change.id === 'community_colors_collection'
    && change.name === 'Community / Colors'
    && change.initialModeId === 'community_colors_mode'
  )))
  assert.ok(plan.variables.some((change) => (
    change.action === 'CREATE'
    && change.name === 'action/primary'
    && change.variableCollectionId === 'community_colors_collection'
    && change.resolvedType === 'COLOR'
  )))
  assert.ok(plan.variableModeValues.some((change) => (
    change.variableId === 'community_colors_action_primary'
    && change.modeId === 'community_colors_mode'
    && change.value.r > 0
    && change.value.a === 1
  )))
  assert.ok(plan.variables.some((change) => (
    change.action === 'CREATE'
    && change.name === 's'
    && change.variableCollectionId === 'community_spacing_collection'
    && change.resolvedType === 'FLOAT'
  )))
  assert.ok(plan.variableModeValues.some((change) => (
    change.variableId === 'community_spacing_s'
    && change.value === 16
  )))
})

test('resolves Figma access validation config from manifest destination', async () => {
  const manifest = await buildDesignManifest({
    rootDir: new URL('..', import.meta.url),
    gitSha: 'test-sha',
    generatedAt: '2026-06-09T00:00:00.000Z',
  })

  const config = resolveFigmaAccessConfig(manifest, {
    FIGMA_ACCESS_TOKEN: 'token',
  })

  assert.equal(config.fileKey, 'infX09HpqqIzfmZ5YmAbI6')
  assert.equal(config.hasToken, true)
  assert.deepEqual(config.missing, [])
})

test('reports missing Figma token during access validation config', async () => {
  const manifest = await buildDesignManifest({
    rootDir: new URL('..', import.meta.url),
    gitSha: 'test-sha',
    generatedAt: '2026-06-09T00:00:00.000Z',
  })

  const config = resolveFigmaAccessConfig(manifest, {})

  assert.equal(config.fileKey, 'infX09HpqqIzfmZ5YmAbI6')
  assert.equal(config.hasToken, false)
  assert.deepEqual(config.missing, ['FIGMA_ACCESS_TOKEN'])
})

test('translates missing Figma variable scope errors into an actionable message', () => {
  const message = getFigmaAccessErrorMessage({
    message: 'Invalid scope(s): file_comments:read. This endpoint requires the file_variables:read scope',
  })

  assert.equal(
    message,
    'Figma token is missing the file_variables:read scope. Create a new token with file_variables:read and file_variables:write, then update FIGMA_ACCESS_TOKEN.',
  )
})
