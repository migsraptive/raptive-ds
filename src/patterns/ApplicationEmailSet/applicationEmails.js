const applicationUrl = 'https://community-ds.vercel.app/community-ds/?view=creator-application-page'
const dashboardUrl = 'https://dashboard.raptive.com/sites/culture-crave/setup'
const communityUrl = 'https://community.raptive.com/c/culture-crave/42'
const helpCenterUrl = 'http://community.raptive.com/help'
const nonGmailHelpUrl =
  'https://help.raptive.com/hc/en-us/articles/360040642312-How-to-use-a-non-Gmail-address-to-log-in-to-your-Raptive-dashboard'
const supportEmail = 'communitysupport@raptive.com'

const activationFooter = [
  'If the button above does not work, copy and paste this link into your browser:',
  applicationUrl,
]

const applicationReminderBody = [
  "Looks like you started your community application but haven't submitted it yet.",
  'You can pick up right where you left off:',
]

const dashboardFooter = [
  "Note: our system requires a Google-affiliated email address. If you don't use Gmail, you can connect your current email address to Google instead.",
  `Here's how: ${nonGmailHelpUrl}`,
  `Questions? Visit our Help Center (${helpCenterUrl}) or contact us at ${supportEmail}.`,
]

const communitySetupSteps = [
  {
    title: 'Record a welcome video',
    body: 'From the sidebar, go to Community Management > Customize Community to upload a welcome video for new members. Communities with a welcome video from the creator see a 2x higher signup rate.',
  },
  {
    title: 'Update your profile',
    body: "Open your profile menu to add a profile photo and short bio so members know who they're hearing from.",
  },
  {
    title: 'Add a few welcome posts',
    body: 'Create a few posts that help members understand what to do, how to introduce themselves, and what kind of conversations to expect.',
  },
]

const communityFooter = [
  `Questions? Visit our Help Center (${helpCenterUrl}) or contact us at ${supportEmail}.`,
]

export const applicationEmailTemplates = [
  {
    id: 'account-activation',
    emailType: 'community_application_account_activation',
    label: 'Activate account',
    stage: 'Account',
    tone: 'Activation',
    status: 'Sent when the creator account needs confirmation',
    subject: 'Activate your account to continue your community application',
    previewText: 'Activate your account to continue your community application',
    heading: 'Welcome to Raptive Community',
    body: [
      'Use the verification code below to activate your account:',
      'This code expires in 1 hour.',
      'Or click the button below to confirm and activate your account, then continue your community application:',
    ],
    code: '246810',
    primaryAction: {
      label: 'Activate my account',
      href: applicationUrl,
    },
    footer: activationFooter,
  },
  {
    id: 'activation-reminder-24h',
    emailType: 'community_application_activation_reminder_24h',
    label: '24h reminder',
    stage: 'Account',
    tone: 'Reminder',
    status: 'Sent 24 hours after account claim if not activated',
    subject: 'Reminder to confirm your account',
    previewText: 'Reminder to confirm your account',
    heading: 'Welcome to Raptive Community',
    body: [
      'Just a quick reminder to activate your account so you can continue your community application.',
    ],
    primaryAction: {
      label: 'Activate your account',
      href: applicationUrl,
    },
    footer: activationFooter,
  },
  {
    id: 'activation-reminder-72h',
    emailType: 'community_application_activation_reminder_72h',
    label: '72h reminder',
    stage: 'Account',
    tone: 'Reminder',
    status: 'Sent 72 hours after account claim if not activated',
    subject: 'Still need to confirm your account?',
    previewText: 'Still need to confirm your account?',
    heading: 'Welcome to Raptive Community',
    body: [
      'Just a quick reminder to activate your account so you can continue your community application.',
    ],
    primaryAction: {
      label: 'Activate your account',
      href: applicationUrl,
    },
    footer: activationFooter,
  },
  {
    id: 'incomplete-application-24h',
    emailType: 'community_application_incomplete_reminder_24h',
    label: 'Draft 24h',
    stage: 'Application',
    tone: 'Resume',
    status: 'Sent 24 hours after application start if not submitted',
    subject: 'Finish your community application',
    previewText: 'Finish your community application',
    heading: 'Finish your community application',
    body: applicationReminderBody,
    primaryAction: {
      label: 'Continue your application',
      href: applicationUrl,
    },
    footer: activationFooter,
  },
  {
    id: 'incomplete-application-72h',
    emailType: 'community_application_incomplete_reminder_72h',
    label: 'Draft 72h',
    stage: 'Application',
    tone: 'Resume',
    status: 'Sent 72 hours after application start if not submitted',
    subject: 'Still working on your community application?',
    previewText: 'Still working on your community application?',
    heading: 'Still working on your community application?',
    body: applicationReminderBody,
    primaryAction: {
      label: 'Continue your application',
      href: applicationUrl,
    },
    footer: activationFooter,
  },
  {
    id: 'incomplete-application-7d',
    emailType: 'community_application_incomplete_reminder_7d',
    label: 'Draft 7d',
    stage: 'Application',
    tone: 'Resume',
    status: 'Sent 7 days after application start if not submitted',
    subject: 'Your community application is waiting',
    previewText: 'Your community application is waiting',
    heading: 'Your community application is waiting',
    body: applicationReminderBody,
    primaryAction: {
      label: 'Continue your application',
      href: applicationUrl,
    },
    footer: activationFooter,
  },
  {
    id: 'dashboard-setup',
    emailType: 'community_application_dashboard_setup',
    label: 'Dashboard setup',
    stage: 'Dashboard',
    tone: 'Payment setup',
    status: 'Sent after the Publisher Dashboard site is created',
    subject: 'Set up your Raptive dashboard to get paid',
    previewText: 'Set up your Raptive dashboard to get paid',
    heading: 'Get paid for ads in your community',
    body: [
      "You earn revenue from ads in your community, but you'll need to set up your Raptive creator dashboard and add your bank and tax information so we can pay you.",
    ],
    primaryAction: {
      label: 'Set up your Raptive dashboard',
      href: dashboardUrl,
    },
    footer: [
      ...dashboardFooter.slice(0, 2),
      "You'll receive a separate email with details on accessing your new community!",
      dashboardFooter[2],
    ],
  },
  {
    id: 'dashboard-setup-reminder-7d',
    emailType: 'community_application_dashboard_setup_reminder_7d',
    label: 'Dashboard 7d',
    stage: 'Dashboard',
    tone: 'Payment setup',
    status: 'Sent 7 days after dashboard setup starts if incomplete',
    subject: 'Reminder: set up your Raptive dashboard',
    previewText: 'Reminder: set up your Raptive dashboard',
    heading: 'Get paid for ads in your community',
    body: [
      "To get paid for ads in your community, you'll need to set up your Raptive dashboard and add your payment and tax information.",
    ],
    primaryAction: {
      label: 'Set up your Raptive dashboard',
      href: dashboardUrl,
    },
    footer: dashboardFooter,
  },
  {
    id: 'dashboard-setup-reminder-14d',
    emailType: 'community_application_dashboard_setup_reminder_14d',
    label: 'Dashboard 14d',
    stage: 'Dashboard',
    tone: 'Payment setup',
    status: 'Sent 14 days after dashboard setup starts if incomplete',
    subject: 'Still need to set up your Raptive dashboard?',
    previewText: 'Still need to set up your Raptive dashboard?',
    heading: 'Get paid for ads in your community',
    body: [
      "To get paid for ads in your community, you'll need to set up your Raptive dashboard and add your payment and tax information.",
    ],
    primaryAction: {
      label: 'Set up your Raptive dashboard',
      href: dashboardUrl,
    },
    footer: dashboardFooter,
  },
  {
    id: 'dashboard-setup-reminder-30d',
    emailType: 'community_application_dashboard_setup_reminder_30d',
    label: 'Dashboard 30d',
    stage: 'Dashboard',
    tone: 'Action needed',
    status: 'Sent 30 days after dashboard setup starts if incomplete',
    subject: 'Action needed: set up your Raptive dashboard',
    previewText: 'Action needed: set up your Raptive dashboard',
    heading: 'Get paid for ads in your community',
    body: [
      "We're checking in because your Raptive dashboard still needs to be set up before you can get paid for ads in your community.",
    ],
    primaryAction: {
      label: 'Set up your Raptive dashboard',
      href: dashboardUrl,
    },
    footer: dashboardFooter,
  },
  {
    id: 'community-setup',
    emailType: 'community_application_community_setup',
    label: 'Community setup',
    stage: 'Community',
    tone: 'Approved',
    status: 'Sent after the community is provisioned',
    subject: 'Your Raptive community is ready for you!',
    previewText: 'Your Raptive community is ready for you!',
    heading: 'Congratulations!',
    body: [
      'Your Raptive Community application has been approved, and your community is already set up.',
      `Here's your new home for your fans: Culture Crave (${communityUrl})`,
      'Before you invite members, take a few minutes to make sure your community is ready:',
    ],
    steps: communitySetupSteps,
    afterSteps: [
      "Once your community looks the way you want it to, you'll be ready to invite your first members.",
    ],
    primaryAction: {
      label: 'Jump into your community',
      href: communityUrl,
    },
    footer: communityFooter,
  },
  {
    id: 'community-setup-reminder-24h',
    emailType: 'community_application_community_setup_reminder_24h',
    label: 'Community 24h',
    stage: 'Community',
    tone: 'Setup reminder',
    status: 'Sent 24 hours after community creation if setup has not started',
    subject: 'Your community is ready for setup',
    previewText: 'Your community is ready for setup',
    heading: 'Jump into your community',
    body: [
      `Your Raptive community is ready for you: Culture Crave (${communityUrl})`,
      "Now's a good time to jump in, take a look around, and start getting it ready for members:",
    ],
    steps: communitySetupSteps,
    primaryAction: {
      label: 'Jump into your community',
      href: communityUrl,
    },
    footer: communityFooter,
  },
  {
    id: 'community-setup-reminder-72h',
    emailType: 'community_application_community_setup_reminder_72h',
    label: 'Community 72h',
    stage: 'Community',
    tone: 'Setup reminder',
    status: 'Sent 72 hours after community creation if setup has not started',
    subject: 'Reminder: visit your new community',
    previewText: 'Reminder: visit your new community',
    heading: 'Jump into your community',
    body: [
      `Just a quick reminder that your Raptive community is waiting for you: Culture Crave (${communityUrl})`,
      'Take a few minutes to get it ready to invite members:',
    ],
    steps: communitySetupSteps,
    primaryAction: {
      label: 'Jump into your community',
      href: communityUrl,
    },
    footer: communityFooter,
  },
  {
    id: 'community-setup-reminder-7d',
    emailType: 'community_application_community_setup_reminder_7d',
    label: 'Community 7d',
    stage: 'Community',
    tone: 'Setup reminder',
    status: 'Sent 7 days after community creation if setup has not started',
    subject: 'Your new community is waiting',
    previewText: 'Your new community is waiting',
    heading: 'Your community is ready when you are',
    body: [
      `Jump in and take a look at the new home for your fans: Culture Crave (${communityUrl})`,
      'You can customize your community, upload a welcome video, update your profile, add a few welcome posts, and start inviting members.',
    ],
    primaryAction: {
      label: 'Jump into your community',
      href: communityUrl,
    },
    footer: communityFooter,
  },
  {
    id: 'member-invite-reminder',
    emailType: 'community_application_member_invite_reminder',
    label: 'Member invite',
    stage: 'Launch',
    tone: 'Launch prep',
    status: 'Sent 24 hours after setup starts if invite readiness is low',
    subject: 'Get ready for your community launch',
    previewText: 'Get ready for your community launch',
    heading: "We're excited to help your community grow",
    body: [
      'Your community launch date is:',
      'July 15, 2026',
      "That's when your community can start being recommended on the Raptive Community platform, so other users can discover and join.",
      'Before launch, take a few minutes to:',
    ],
    bullets: [
      'Add some fresh posts to get the conversation started',
      'Share your community with your fans and invite them to participate',
    ],
    afterSteps: [
      'To adjust your launch date, go to Community Management > Customize Community from your community sidebar.',
    ],
    primaryAction: {
      label: 'Jump into your community',
      href: communityUrl,
    },
    footer: communityFooter,
  },
]
