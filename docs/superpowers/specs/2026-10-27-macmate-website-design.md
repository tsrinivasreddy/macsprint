# MacMate AI — Marketing Website Design

Date: 2026-10-27
Status: Awaiting approval

## Goal

A single long-scrolling marketing page for **MacMate AI** ("Your Mac. Smarter, Faster, Cleaner.") styled after apple.com product pages. It presents every feature from the MacMate product brief plus the unique features of Homy (tryhomy.app), and lets visitors explore **all features from one interface**: an interactive Mac-style app window with a sidebar.

The app is not built yet. The site collects waitlist sign-ups and is honest about release timing.

## Decisions (from the user)

- Deliverable: website only. No app code.
- Visual theme: apple.com product-page style. Look-alike only: no Apple logos or Apple-owned assets.
- Format: a single long page.
- Price: hidden. Show "Price coming soon · one-time purchase, no subscription".
- Primary CTA: join the waitlist.
- Every feature carries a release badge: At launch / 1.1 / 1.2 / 2.0.
- Include the unique Homy features.
- All features are navigable from one interface.

## Final feature list (merged and de-duplicated)

| # | Feature | Source | Release |
|---|---------|--------|---------|
| 1 | **Home dashboard**: real storage, index status, AI availability, quick actions | MacMate | At launch |
| 2 | **Visual Library**: browse the whole Mac by kind (Images, Videos, Music, Documents, Apps, Screenshots) as big thumbnails; a Finder companion | Homy | At launch |
| 3 | **Smart Image Viewer**: open one image, ←/→ through its folder, filmstrip, grid, zoom/rotate, metadata, fullscreen | MacMate | At launch |
| 4 | **AI Search**: plain-English queries become structured filters run on a local index; results are never invented | MacMate + Homy | At launch |
| 5 | **Text in Images (OCR)**: Vision-based on-device text recognition; search, highlight and copy text from screenshots | MacMate + Homy | At launch |
| 6 | **Storage Intelligence**: volume usage, category breakdown, largest files and folders, old-file review with honest labels | MacMate | At launch |
| 7 | **Safe Cleanup**: preview, confirm and move to Trash; cleanup history; no automatic deletion | MacMate | At launch |
| 8 | **Duplicate Finder**: size → partial hash → full hash; grouped review | MacMate + Homy | 1.1 |
| 9 | **Smart File Organizer**: Downloads organizer, rename suggestions, dry-run preview, action history | MacMate | 1.1 |
| 10 | **Quick Search & Command Panel**: a global shortcut panel that opens from any app to search files and run actions | Homy + MacMate | 1.2 |
| 11 | **Menu-bar Recent Downloads**: the last 10 downloads with thumbnails; drag into any app | Homy | 1.2 |
| 12 | **Finder Tools**: copy path, new file types, favorite folders, open Terminal here, Quick Actions | MacMate | 1.2 |
| 13 | **Clipboard History**: searchable text and image history, pins, pause, excluded apps | MacMate | 1.2 |
| 14 | **Screenshot Toolkit**: capture, crop, annotate, blur, OCR, and open in the viewer | MacMate | 1.2 OCR flow / 2.0 annotation |
| 15 | **Window Manager**: snap layouts, shortcuts, saved multi-monitor workspaces | MacMate | 2.0 |
| 16 | **Similar Images & Visual Search** | MacMate | 2.0 |

Cross-cutting topics that get their own page sections rather than explorer entries:

- **Privacy-first, on-device AI**: no account, no file-content telemetry, works offline, access only to chosen folders.
- **AI safety pipeline**: request → interpret → typed plan → validate → review → approve → execute → log. AI never deletes, moves or renames files on its own.

## The "one interface": Feature Explorer

The centerpiece of the page is a large, realistic macOS app window drawn in HTML and CSS:

- **Sidebar**: entries 1–16, grouped as *Discover* (Home, Library, Images, AI Search, Text in Images), *Clean up* (Storage, Safe Cleanup, Duplicates, Organizer), and *Everyday* (Quick Search, Downloads, Finder Tools, Clipboard, Screenshots, Windows, Similar Images). Each entry has an icon and a release badge.
- **Content pane**: a small interactive demo of the selected feature. Beside or below it is an info panel with the headline, 2–4 key points and the release badge.
- **Toolbar**: a search field that filters the sidebar ("Jump to a feature…").
- **Navigation**:
  - Click a sidebar entry.
  - ↑/↓ moves between entries while the sidebar is focused.
  - ⌘K / Ctrl+K opens a command-palette overlay that searches all features.
  - URL hash deep links (e.g. `#explore/images`).
  - Previous/next buttons in the pane.
- **Mobile**: the sidebar collapses into a horizontally scrolling pill bar above the pane.

Interactive demos are illustrative. They use clearly fictional sample file names and are styled as product illustrations. They are not presented as real measurements. Notable demos:

- **Images**: ←/→ steps through generated gradient "photos" with a filmstrip and a "15 of 120" counter.
- **AI Search**: example queries cycle through, each showing its structured interpretation (category, text concepts, date window) and matching results.
- **Text in Images**: a "connection timed out" query highlights a region in a mock screenshot named `IMG_2048.png`.
- **Storage**: a stacked category bar plus a list of old files labeled "Not modified for 18 months".
- **Organizer**: "210 files found · 182 proposed moves · 28 unchanged" with an Approve button that does nothing until clicked, then shows a review state.
- **Quick Search**: a type-ahead panel.
- **Downloads**: a menu-bar dropdown.
- **Clipboard**: a list with pins.
- **Windows**: a layout grid you can click to snap a mock window.

## Page structure (top to bottom)

1. **Sticky translucent nav**: Overview · Features · Privacy · Roadmap · Pricing · FAQ · [Join Waitlist]
2. **Hero**: product name, tagline, subhead, CTA, and a large app-window illustration.
3. **Problems strip**: "Thirteen everyday frustrations. One app." Thirteen compact cards based on problems A–M; each links into the matching Explorer entry.
4. **Feature Explorer**: the one interface described above.
5. **Privacy**: on-device processing, no account, offline, folder-scoped access, no file-content telemetry.
6. **AI you can trust**: the 8-step pipeline diagram.
7. **Roadmap**: a timeline of MVP → 1.1 → 1.2 → 2.0 listing its features.
8. **Pricing**: Free vs Pro feature lists; Pro shows "Price coming soon · one-time purchase".
9. **FAQ**: an accordion covering Apple Intelligence, use without AI, uploads, permissions, requirements (Apple silicon and Intel; AI search needs an Apple Intelligence Mac), updates and license, and Finder replacement.
10. **Waitlist**: an email form. When no endpoint is configured it shows "Waitlist isn't connected yet". It never shows a fake success.
11. **Footer**

## Visual system

- **Type**: the system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", …`). Large tight headlines (up to 80px with negative tracking) and a 17–21px body.
- **Color tokens on `:root`**: white, #f5f5f7 and near-black section backgrounds; text #1d1d1f; secondary #6e6e73; a single accent #0071e3. The page follows the visitor's system dark mode.
- **Surfaces**: rounded 18–28px cards and translucent blurred nav and sidebar.
- **Motion**: scroll-reveal fade and lift; disabled when the visitor has reduced motion enabled.
- **Icons**: inline SVG line icons; no icon fonts and no external images.

## Technical

- Files: `index.html`, `styles.css`, `main.js`, `README.md`.
- No dependencies and no build step.
- Waitlist endpoint: a `data-endpoint` attribute on the form (Formspree or similar), documented in the README.
- Accessibility:
  - Semantic landmarks.
  - The sidebar works as an ARIA tablist.
  - Visible focus rings.
  - Labels on all controls.
  - AA contrast in both themes.
- Responsive from 320px up with no horizontal scroll.

## Verification

- Playwright screenshots at 1440px and 390px, in light and dark mode.
- Check every Explorer entry renders by clicking each one, using the keyboard, ⌘K, and hash deep links.
- No console errors and no horizontal overflow.
- The waitlist form shows the not-connected state.

## Out of scope

- The macOS app itself.
- Real downloads, payments and analytics.
- A blog or multiple pages.
