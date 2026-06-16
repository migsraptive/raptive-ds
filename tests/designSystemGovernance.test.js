import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import test from 'node:test'

const componentSpecsDir = new URL('../design/components/', import.meta.url)
const specFiles = readdirSync(componentSpecsDir)
  .filter((file) => file.endsWith('.yml'))
  .sort((a, b) => a.localeCompare(b))

function readSpec(file) {
  return readFileSync(new URL(file, componentSpecsDir), 'utf8')
}

function extractSourceValue(source, key) {
  return source.match(new RegExp(`^  ${key}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? null
}

function repoUrl(path) {
  return new URL(`../${path}`, import.meta.url)
}

test('component YAML template includes governance contract sections', () => {
  const source = readSpec('_component-spec-template.yml')

  assert.match(source, /^governance:/m)
  assert.match(source, /intent_path: src\/components\/ComponentName\/intent\.md/)
  assert.match(source, /component_contract:/)
  assert.match(source, /api_compatibility:/)
  assert.match(source, /escalate_when:/)
  assert.match(source, /Components are black boxes\./)
})

test('component YAML contracts include black-box governance', () => {
  const contractFiles = specFiles.filter((file) => !file.startsWith('_'))

  assert.ok(contractFiles.length > 0)

  for (const file of contractFiles) {
    const source = readSpec(file)

    assert.match(source, /^governance:/m, `${file} must include governance`)
    assert.match(source, /component_contract:/, `${file} must include component contract rules`)
    assert.match(source, /api_compatibility:/, `${file} must include API compatibility rules`)
    assert.match(source, /escalate_when:/, `${file} must include escalation rules`)
    assert.match(source, /black-box/, `${file} must describe the component as black-box`)
    assert.match(source, /not a styling API|not a consumer styling contract/, `${file} must restrict styling escape hatches`)
  }
})

test('component YAML contracts point at existing source files', () => {
  const contractFiles = specFiles.filter((file) => !file.startsWith('_'))

  for (const file of contractFiles) {
    const source = readSpec(file)
    const sourcePath = extractSourceValue(source, 'path')

    assert.ok(sourcePath, `${file} must include source.path`)
    assert.ok(existsSync(repoUrl(sourcePath)), `${file} source.path must exist: ${sourcePath}`)
  }
})

test('Button contract restricts compatibility escape hatches without removing React API support', () => {
  const source = readSpec('button.yml')

  assert.match(source, /className:/)
  assert.match(source, /restricted_compatibility_escape_hatch/)
  assert.match(source, /pass_through_props:/)
  assert.match(source, /aria attributes/)
  assert.match(source, /native button behavior/)
  assert.match(source, /not_allowed_for:/)
  assert.match(source, /overriding visual internals/)
})

test('Button contract points at colocated intent documentation', () => {
  const source = readSpec('button.yml')
  const sourcePath = extractSourceValue(source, 'path')
  const intentPath = extractSourceValue(source, 'intent_path')

  assert.equal(sourcePath, 'src/components/Button/Button.jsx')
  assert.equal(intentPath, 'src/components/Button/intent.md')
  assert.ok(existsSync(repoUrl(intentPath)), 'Button intent doc must live beside the source component')
})
