import { execFile as execFileCallback } from 'node:child_process'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

const execFile = promisify(execFileCallback)

const captureScriptTag = '    <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>'
const defaultBaseUrl = 'http://localhost:3700/community-ds/'
const defaultSession = 'figma-creator-capture'
const defaultViewport = {
  width: 1440,
  height: 1200,
}

const captureScreens = [
  {
    step: 'entry',
    name: '01 Entry - Where do your fans live',
    expectedText: 'Where do your fans live?',
  },
  {
    step: 'gather',
    name: '02 Gather Review - Take a look at what we found',
    expectedText: 'Add another account',
  },
  {
    step: 'review',
    name: '03 Preview Editor - How does everything look',
    expectedText: 'How does everything look?',
  },
  {
    step: 'verify',
    name: '04 Verification - One last check',
    expectedText: "One last check to know it's really you.",
  },
  {
    step: 'success',
    name: '05 Success - You are on the list',
    expectedText: "You're on the list.",
  },
]

function parseArgs(args) {
  const parsed = {
    baseUrl: defaultBaseUrl,
    captures: null,
    session: defaultSession,
    viewport: defaultViewport,
    waitAfterSubmitMs: 5000,
  }

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]
    const next = args[index + 1]

    if (arg === '--base-url') {
      parsed.baseUrl = next
      index += 1
      continue
    }

    if (arg === '--captures' || arg === '--capture-ids') {
      parsed.captures = parseCaptureIds(next)
      index += 1
      continue
    }

    if (arg === '--session') {
      parsed.session = next
      index += 1
      continue
    }

    if (arg === '--viewport') {
      parsed.viewport = parseViewport(next)
      index += 1
      continue
    }

    if (arg === '--wait-after-submit') {
      parsed.waitAfterSubmitMs = Number(next)
      index += 1
    }
  }

  return parsed
}

function parseCaptureIds(value) {
  if (!value) return null

  return value.split(',').reduce((captures, pair) => {
    const [step, captureId] = pair.split('=').map((part) => part.trim())

    if (step && captureId) {
      captures[step] = captureId
    }

    return captures
  }, {})
}

function parseViewport(value) {
  const [width, height] = value.split('x').map((dimension) => Number(dimension))

  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error('Viewport must use WIDTHxHEIGHT format, for example 1440x1200.')
  }

  return { width, height }
}

function getMissingCaptureSteps(captures) {
  if (!captures) return captureScreens.map((screen) => screen.step)

  return captureScreens
    .map((screen) => screen.step)
    .filter((step) => !captures[step])
}

function getCaptureUrl(baseUrl, step) {
  const url = new URL(baseUrl)
  url.searchParams.set('view', 'creator-application')
  url.searchParams.set('capture', 'true')
  url.searchParams.set('captureStep', step)

  return url.toString()
}

async function ensureCaptureScript(rootDir) {
  const indexPath = path.join(rootDir, 'index.html')
  const originalHtml = await readFile(indexPath, 'utf8')

  if (originalHtml.includes('https://mcp.figma.com/mcp/html-to-design/capture.js')) {
    return {
      indexPath,
      originalHtml,
      changed: false,
    }
  }

  const moduleScript = '    <script type="module" src="/src/main.jsx"></script>'
  const nextHtml = originalHtml.replace(moduleScript, `${captureScriptTag}\n${moduleScript}`)

  if (nextHtml === originalHtml) {
    throw new Error('Could not find the Vite module script in index.html for capture script injection.')
  }

  await writeFile(indexPath, nextHtml)

  return {
    indexPath,
    originalHtml,
    changed: true,
  }
}

async function restoreCaptureScript(injection) {
  if (!injection.changed) return

  await writeFile(injection.indexPath, injection.originalHtml)
}

async function runAgentBrowser(session, args, options = {}) {
  const { stdout, stderr } = await execFile('agent-browser', ['--session', session, ...args], {
    maxBuffer: 1024 * 1024 * 4,
    timeout: options.timeoutMs ?? 30000,
  })

  return [stdout, stderr].filter(Boolean).join('\n').trim()
}

async function waitForPageExpression(session, expression, timeoutMs = 30000) {
  const startedAt = Date.now()
  let lastOutput = ''

  while (Date.now() - startedAt < timeoutMs) {
    lastOutput = await runAgentBrowser(session, ['eval', expression], { timeoutMs: 10000 })

    if (lastOutput.includes('true')) {
      return
    }

    await runAgentBrowser(session, ['wait', '500'], { timeoutMs: 5000 })
  }

  throw new Error(`Timed out waiting for page expression: ${expression}\nLast output: ${lastOutput}`)
}

async function assertDevServer(baseUrl) {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error(`Dev server responded with ${response.status} for ${baseUrl}`)
  }
}

async function captureScreen({ session, baseUrl, captures, waitAfterSubmitMs }, screen) {
  const captureUrl = getCaptureUrl(baseUrl, screen.step)
  const captureId = captures[screen.step]

  process.stdout.write(`Opening ${screen.name}\n${captureUrl}\n`)
  await runAgentBrowser(session, ['open', captureUrl], { timeoutMs: 30000 })
  await waitForPageExpression(
    session,
    "typeof window.figma === 'object' && typeof window.figma.captureForDesign === 'function'",
  )
  await waitForPageExpression(
    session,
    `document.body.innerText.includes(${JSON.stringify(screen.expectedText)})`,
    screen.step === 'gather' ? 45000 : 30000,
  )

  const captureExpression = [
    'window.figma.captureForDesign({',
    `captureId: ${JSON.stringify(captureId)},`,
    `endpoint: ${JSON.stringify(`https://mcp.figma.com/mcp/capture/${captureId}/submit`)},`,
    "selector: 'body'",
    '});',
    JSON.stringify(`started ${screen.step}`),
  ].join(' ')

  await runAgentBrowser(session, ['eval', captureExpression], { timeoutMs: 10000 })
  await runAgentBrowser(session, ['wait', String(waitAfterSubmitMs)], { timeoutMs: waitAfterSubmitMs + 5000 })
  process.stdout.write(`Submitted ${screen.name} (${captureId})\n\n`)
}

function printMissingCaptureHelp(missingSteps, baseUrl) {
  const captureUrlList = captureScreens
    .map((screen) => `${screen.step}: ${getCaptureUrl(baseUrl, screen.step)}`)
    .join('\n')

  process.stdout.write([
    `Missing capture IDs for: ${missingSteps.join(', ')}`,
    '',
    'Generate one Figma capture ID per screen, then run:',
    'npm run figma:capture:creator-flow -- --captures entry=ID,gather=ID,review=ID,verify=ID,success=ID',
    '',
    'Deterministic capture URLs:',
    captureUrlList,
    '',
  ].join('\n'))
}

async function runCli() {
  const rootDir = fileURLToPath(new URL('..', import.meta.url))
  const options = parseArgs(process.argv.slice(2))
  const missingCaptureSteps = getMissingCaptureSteps(options.captures)

  if (missingCaptureSteps.length > 0) {
    printMissingCaptureHelp(missingCaptureSteps, options.baseUrl)
    process.exitCode = 1
    return
  }

  await assertDevServer(options.baseUrl)

  const injection = await ensureCaptureScript(rootDir)

  try {
    await runAgentBrowser(options.session, [
      'set',
      'viewport',
      String(options.viewport.width),
      String(options.viewport.height),
    ])

    for (const screen of captureScreens) {
      await captureScreen(options, screen)
    }
  } finally {
    await restoreCaptureScript(injection)
    await runAgentBrowser(options.session, ['close']).catch(() => {})
  }

  process.stdout.write('Creator application capture pass complete. Poll each capture ID in Figma to confirm import node IDs.\n')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await runCli()
}
