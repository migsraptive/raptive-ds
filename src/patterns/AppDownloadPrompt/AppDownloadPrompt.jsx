import appStoreBadgeUrl from '../../assets/store-badges/download-on-the-app-store.svg'
import googlePlayBadgeUrl from '../../assets/store-badges/google-play-badge.png'
import { TextLink } from '../../components/TextLink/TextLink.jsx'

const appDownloadAttribution = {
  source: 'creator_application_completion',
  viewEvent: 'creator_application_completion_app_prompt_viewed',
  clickEvent: 'creator_application_completion_app_download_clicked',
  iosUrl: 'https://raptive.example/app-download?source=creator_application_completion&platform=ios',
  androidUrl: 'https://raptive.example/app-download?source=creator_application_completion&platform=android',
}

function StoreBadgeLink({ platform, href, deviceContext }) {
  const isIos = platform === 'ios'
  const badgeSrc = isIos ? appStoreBadgeUrl : googlePlayBadgeUrl
  const label = isIos ? 'Download on the App Store' : 'Get it on Google Play'

  return (
    <TextLink
      href={href}
      tone="current"
      target="_blank"
      rel="noreferrer"
      className="h-11 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/72 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
      aria-label={label}
      data-ds-role="app-download-action"
      data-ds-instance={`creator-application.completion.app-download.${platform}`}
      data-tracking-event={appDownloadAttribution.clickEvent}
      data-tracking-platform-target={platform}
      data-tracking-surface="completion_screen"
      data-tracking-device-context={deviceContext}
      data-download-url={href}
    >
      <img
        src={badgeSrc}
        alt={label}
        className="h-11 w-auto"
        loading="eager"
        decoding="async"
      />
    </TextLink>
  )
}

export function AppDownloadPrompt({ mode = 'desktop' }) {
  const deviceContext = mode === 'desktop' ? 'desktop' : 'mobile'

  return (
    <div
      className="space-y-3"
      data-ds-component="AppDownloadPrompt"
      data-ds-variant={mode}
      data-ds-role="app-download-prompt"
      data-ds-instance={`creator-application.completion.app-download.${mode}`}
      data-tracking-event={appDownloadAttribution.viewEvent}
      data-tracking-source={appDownloadAttribution.source}
      data-tracking-device-context={deviceContext}
    >
      <p className="text-sm font-medium text-white">
        In the meantime, check out the app if you haven't already:
      </p>
      <div className="flex flex-row items-center gap-3">
        <StoreBadgeLink
          platform="ios"
          href={appDownloadAttribution.iosUrl}
          deviceContext={deviceContext}
        />
        <StoreBadgeLink
          platform="android"
          href={appDownloadAttribution.androidUrl}
          deviceContext={deviceContext}
        />
      </div>
    </div>
  )
}
