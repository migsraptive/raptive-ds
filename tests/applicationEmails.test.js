import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { applicationEmailTemplates } from '../src/patterns/ApplicationEmailSet/applicationEmails.js'

const applicationEmailSetSource = readFileSync(new URL('../src/patterns/ApplicationEmailSet/ApplicationEmailSet.jsx', import.meta.url), 'utf8')
const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')

test('application email set covers the creator application lifecycle', () => {
  assert.deepEqual(
    applicationEmailTemplates.map((template) => template.id),
    [
      'ownership-code',
      'review-draft',
      'submitted',
      'needs-info',
      'approved-next-steps',
      'not-a-fit',
    ],
  )

  for (const template of applicationEmailTemplates) {
    assert.ok(template.subject)
    assert.ok(template.previewText)
    assert.ok(template.primaryAction.label)
    assert.ok(template.primaryAction.href)
  }
})

test('approval email keeps approval distinct from launch', () => {
  const approvedEmail = applicationEmailTemplates.find((template) => template.id === 'approved-next-steps')
  const launchSensitiveCopy = [
    approvedEmail.subject,
    approvedEmail.previewText,
    approvedEmail.heading,
    ...approvedEmail.body,
  ].join(' ')

  assert.match(launchSensitiveCopy, /approved/i)
  assert.doesNotMatch(launchSensitiveCopy, /launch/i)
  assert.doesNotMatch(launchSensitiveCopy, /live/i)
  assert.doesNotMatch(launchSensitiveCopy, /launched/i)
})

test('component library documents application emails with the preview pattern', () => {
  assert.match(applicationEmailSetSource, /export function ApplicationEmailSet/)
  assert.match(applicationEmailSetSource, /SegmentedControl/)
  assert.match(componentLibrarySource, /'Emails'/)
  assert.match(componentLibrarySource, /activeSection === 'Emails'/)
  assert.match(componentLibrarySource, /import \{ ApplicationEmailSet \}/)
  assert.match(componentLibrarySource, /title="Application Emails"/)
})
