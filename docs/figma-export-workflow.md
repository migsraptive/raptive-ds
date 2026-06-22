# Figma Export Workflow

Use this process when exporting the Creator Application flow from a running build
into Figma for design review.

## Standard Flow

1. Confirm the target Figma file and workspace.
   - Current canonical file: `Creator Application Flow`
   - Use a new dated Figma page for each meaningful export.
   - Name pages with a concrete date, for example `June 18, 2026 Updates`.

2. Capture the application from a deterministic URL.
   - Base URL: `http://127.0.0.1:3701/community-ds/?view=creator-application`
   - Capture each step with `captureStep`:
     - `entry`
     - `gather`
     - `review`
     - `verify`
     - `submit`

3. Check capture health before exporting.
   - Confirm the dev server is running.
   - Load each capture URL.
   - Check browser console errors.
   - Keep the viewport consistent across all screenshots.

4. Export into Figma.
   - Create or reuse the dated page.
   - Place each screen in flow order.
   - Add change notes next to each screen.
   - Add a source note that includes the URL and date.
   - Add reviewer alert copy as a visible callout when true Figma comments are not available through tooling.

5. Clean up export artifacts.
   - Remove temporary screenshot files from the repo.
   - Remove accidental Figma upload placements from non-target pages.
   - Keep older Figma exports archived instead of deleting them.

## Change Notes Format

Each screen should have a notes panel with:

- Screen name and order
- Source `captureStep`
- Changes / observations
- Implementation or tracking notes when relevant

Example:

```text
04 Verify
Source: ?captureStep=verify

Changes / observations
• Persona fallback replaced with “Submit with an email address.”
• Email option includes inline email entry and selected radio state.
• Meta login remains selectable and opens the authorization modal.
• Submit remains gated by the Creator Agreement checkbox.
```

## Observations From June 18, 2026 Export

- Uploading assets through Figma MCP placed screenshots on the first page by
  default, not the newly created dated page. Use returned `imageHash` values to
  rebuild the clean export on the target page, then remove temporary upload
  placements.
- Visible callouts are reliable. True tagged Figma comments require a dedicated
  comments API/tool; do not assume visible text with `@Name` creates a Figma
  notification.
- Capture URLs with `captureStep` made the flow repeatable and avoided manual
  clicking through the prototype.
- The export is easier to review when old pages are archived and the latest
  dated page is kept intact, rather than deleting history.

## Improvement Backlog

- Add a repo script that captures the standard flow screenshots with fixed
  viewport dimensions and predictable filenames.
- Add a small manifest file for each export with commit SHA, Vercel URL, capture
  URLs, screenshot filenames, and Figma page URL.
- Add or install a Figma comments workflow if reviewer notification comments are
  required instead of visible canvas callouts.
- Consider an export helper that uploads screenshots and arranges them from
  `imageHash` values automatically, avoiding first-page placement cleanup.
