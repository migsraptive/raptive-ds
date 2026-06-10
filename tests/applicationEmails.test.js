import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { applicationEmailTemplates } from '../src/patterns/ApplicationEmailSet/applicationEmails.js'

const applicationEmailSetSource = readFileSync(new URL('../src/patterns/ApplicationEmailSet/ApplicationEmailSet.jsx', import.meta.url), 'utf8')
const componentLibrarySource = readFileSync(new URL('../src/pages/ComponentLibrary/ComponentLibrary.jsx', import.meta.url), 'utf8')

test('application email set covers the creator application lifecycle', () => {
  assert.deepEqual(
    applicationEmailTemplates.map((template) => template.emailType),
    [
      'community_application_account_activation',
      'community_application_activation_reminder_24h',
      'community_application_activation_reminder_72h',
      'community_application_incomplete_reminder_24h',
      'community_application_incomplete_reminder_72h',
      'community_application_incomplete_reminder_7d',
      'community_application_dashboard_setup',
      'community_application_dashboard_setup_reminder_7d',
      'community_application_dashboard_setup_reminder_14d',
      'community_application_dashboard_setup_reminder_30d',
      'community_application_community_setup',
      'community_application_community_setup_reminder_24h',
      'community_application_community_setup_reminder_72h',
      'community_application_community_setup_reminder_7d',
      'community_application_member_invite_reminder',
    ],
  )

  for (const template of applicationEmailTemplates) {
    assert.ok(template.id)
    assert.ok(template.stage)
    assert.ok(template.subject)
    assert.ok(template.previewText)
    assert.ok(template.primaryAction.label)
    assert.ok(template.primaryAction.href)
    assert.ok(template.footer?.length)
  }
})

test('dashboard setup emails carry payment and non-Gmail support copy', () => {
  const setupEmail = applicationEmailTemplates.find((template) => template.id === 'dashboard-setup')
  const monthlyReminder = applicationEmailTemplates.find(
    (template) => template.id === 'dashboard-setup-reminder-30d',
  )

  assert.equal(setupEmail.subject, 'Set up your Raptive dashboard to get paid')
  assert.match(setupEmail.body.join(' '), /bank and tax information/)
  assert.match(setupEmail.footer.join(' '), /Google-affiliated email address/)
  assert.match(monthlyReminder.body.join(' '), /before you can get paid for ads in your community/)
})

test('community and launch emails preserve setup instructions', () => {
  const communitySetup = applicationEmailTemplates.find((template) => template.id === 'community-setup')
  const memberInvite = applicationEmailTemplates.find((template) => template.id === 'member-invite-reminder')

  assert.equal(communitySetup.subject, 'Your Raptive community is ready for you!')
  assert.deepEqual(
    communitySetup.steps.map((step) => step.title),
    ['Record a welcome video', 'Update your profile', 'Add a few welcome posts'],
  )
  assert.equal(memberInvite.subject, 'Get ready for your community launch')
  assert.deepEqual(memberInvite.bullets, [
    'Add some fresh posts to get the conversation started',
    'Share your community with your fans and invite them to participate',
  ])
})

test('component library documents application emails with the preview pattern', () => {
  assert.match(applicationEmailSetSource, /export function ApplicationEmailSet/)
  assert.match(applicationEmailSetSource, /AccordionPanelGroup/)
  assert.match(applicationEmailSetSource, /handleStageChange/)
  assert.match(applicationEmailSetSource, /selectedTemplate\.steps/)
  assert.match(applicationEmailSetSource, /selectedTemplate\.bullets/)
  assert.match(componentLibrarySource, /'Emails'/)
  assert.match(componentLibrarySource, /activeSection === 'Emails'/)
  assert.match(componentLibrarySource, /import \{ ApplicationEmailSet \}/)
  assert.match(componentLibrarySource, /title="Application Emails"/)
})
