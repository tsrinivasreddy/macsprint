# MacMate AI Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-page, Apple-style marketing site for MacMate AI where all 16 features can be explored from one interactive Mac-window "Feature Explorer".

**Architecture:** Static HTML/CSS/vanilla JS with no build step. `js/features.js` is the single source of truth for feature data. The Explorer sidebar, ⌘K palette, roadmap and problem-card links are all generated from it. Each feature's interactive demo is a render function in `js/demos.js`, keyed by feature id.

**Tech Stack:** HTML5, CSS custom properties, ES modules. Tests use Node and the preinstalled Playwright (`require('playwright')`), served by `python3 -m http.server`.

**Spec:** `docs/superpowers/specs/2026-10-27-macmate-website-design.md`

## Global Constraints

- No external dependencies, fonts or images. Icons are inline SVG. Font stack: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Segoe UI", sans-serif`.
- Tokens on `:root`: `--bg #fff`, `--bg-alt #f5f5f7`, `--text #1d1d1f`, `--text-2 #6e6e73`, `--accent #0071e3`. Dark-mode overrides apply under `@media (prefers-color-scheme: dark)`.
- No Apple logos or Apple-owned assets.
- Price copy: "Price coming soon · one-time purchase, no subscription".
- The primary CTA is "Join the waitlist". Without `data-endpoint`, the form shows "Waitlist isn't connected yet" and never fakes success.
- Release badge labels are exactly `At launch`, `1.1`, `1.2`, `2.0`. Screenshot Toolkit shows `1.2 · 2.0`.
- Demo file names must be clearly fictional. No claims of real measurements.
- Respect `prefers-reduced-motion`. No horizontal overflow at 320px.

## Review Focus

- Unknown hash such as `#explore/nope`: the Explorer falls back to `home` without throwing. Test in Task 2.
- ⌘K palette with no matches: shows "No features match". Enter does nothing. Esc closes it and focus returns. Test in Task 2.
- Arrow keys typed inside the Explorer filter input or palette must not change the Image Viewer demo. The image demo only listens while its pane holds focus. Test in Task 3.
- Narrow phones (320px): the sidebar pill bar scrolls internally and the page doesn't overflow. Test in Task 5.
- Submitting the waitlist with no endpoint configured, or with an invalid email: shows an honest message and makes no network call. Test in Task 4.

---

### Task 1: Page shell, tokens, nav, hero, test harness

**Files:**
- Create: `index.html`, `styles.css`, `js/main.js`, `tests/check.mjs`, `package.json` (`"type":"module"`, script `test`)

**Interfaces:**
- Produces: section ids `#overview #problems #explore #privacy #trust #roadmap #pricing #faq #waitlist`. `tests/check.mjs` exports a harness that starts the server on port 8765, loads the page in Chromium, collects `pageerror` and console errors, and runs named checks, failing on any error.

- [ ] Step 1: Write checks `noConsoleErrors` and `noHorizontalOverflow(1440, 390, 320)` (assert `scrollWidth <= innerWidth`), plus `heroHasTaglineAndCta` (h1 contains "MacMate AI", text includes "Your Mac. Smarter, Faster, Cleaner.", and a link to `#waitlist` exists).
- [ ] Step 2: Run `node tests/check.mjs`. Expected: FAIL (no index.html).
- [ ] Step 3: Build the sticky translucent nav, the hero with an app-window illustration, and empty section shells. `main.js` handles scroll-reveal via IntersectionObserver.
- [ ] Step 4: Run `node tests/check.mjs`. Expected: PASS.
- [ ] Step 5: Commit.

### Task 2: Feature data and Feature Explorer shell

**Files:**
- Create: `js/features.js`, `js/explorer.js`
- Modify: `index.html` (#explore markup), `styles.css`, `js/main.js`, `tests/check.mjs`

**Interfaces:**
- Produces: `export const FEATURES: Array<{id, group: 'Discover'|'Clean up'|'Everyday', title, short, headline, points: string[], release, source, icon}>`. The ids, in order, are: `home, library, images, search, ocr, storage, cleanup, duplicates, organizer, quicksearch, downloads, finder, clipboard, screenshots, windows, similar`. Also `export const PROBLEMS: Array<{letter, title, featureId}>` with 13 items covering A–M.
- Produces: `initExplorer(root: HTMLElement, demos: Record<string,(el)=>void|(()=>void)>)` and `selectFeature(id: string, {focus?: boolean})`. The selected id is mirrored to `location.hash = '#explore/<id>'`.

- [ ] Step 1: Write checks. The sidebar has 16 `[role=tab]`. Clicking each one sets `aria-selected` and the pane `h3` equals that feature's title. ArrowDown on the focused tab moves to the next feature. Loading `#explore/duplicates` selects Duplicate Finder, and `#explore/nope` selects Home. Ctrl+K opens `[role=dialog]`. Typing "clip" and pressing Enter selects Clipboard History. Typing "zzzz" shows "No features match". Esc closes the dialog.
- [ ] Step 2: Run. Expected: FAIL.
- [ ] Step 3: Implement as an ARIA tablist with roving tabindex. The sidebar filter input narrows the tabs. Add prev/next buttons. The palette is a modal dialog with a listbox. Demo cleanup functions run on switch.
- [ ] Step 4: Run. Expected: PASS.
- [ ] Step 5: Commit.

### Task 3: Interactive demos for all 16 features

**Files:**
- Create: `js/demos.js`
- Modify: `styles.css`, `tests/check.mjs`

**Interfaces:**
- Consumes: `initExplorer(root, demos)`.
- Produces: `export const DEMOS` with a key for every FEATURES id. Each value renders into its pane and may return a cleanup function.

- [ ] Step 1: Write checks.
  - Every FEATURES id has a DEMOS entry.
  - Images demo: shows "15 of 120". After focusing the demo, ArrowRight shows "16 of 120". ArrowRight typed into the sidebar filter input leaves it unchanged.
  - Text in Images demo: contains "IMG_2048.png" and a `mark` with "connection timed out".
  - Organizer demo: contains "182 proposed moves". Approve is disabled until "Review" is clicked.
  - Storage demo: contains "Not modified for 18 months".
- [ ] Step 2: Run. Expected: FAIL.
- [ ] Step 3: Implement the demos as specified in the spec's Feature Explorer section. Images use CSS-gradient "photos" generated from the index.
- [ ] Step 4: Run. Expected: PASS.
- [ ] Step 5: Commit.

### Task 4: Content sections — problems, privacy, trust pipeline, roadmap, pricing, FAQ, waitlist, footer

**Files:**
- Modify: `index.html`, `styles.css`, `js/main.js`, `tests/check.mjs`

**Interfaces:**
- Consumes: `FEATURES`, `PROBLEMS`, `selectFeature`.

- [ ] Step 1: Write checks.
  - 13 problem cards. Clicking card "I" selects `clipboard` and scrolls to #explore.
  - The trust pipeline has 8 steps.
  - Roadmap columns At launch/1.1/1.2/2.0 together list all 16 titles.
  - Pricing contains "Price coming soon".
  - FAQ items toggle via `<details>`.
  - Waitlist: submitting "bad" shows a validation message. Submitting a valid email with no endpoint shows "Waitlist isn't connected yet", and no request goes out (watch `page.on('request')` for non-localhost requests).
- [ ] Step 2: Run. Expected: FAIL.
- [ ] Step 3: Implement. Generate the roadmap and problem cards from the data. When `data-endpoint` is set, the waitlist POSTs JSON to it.
- [ ] Step 4: Run. Expected: PASS.
- [ ] Step 5: Commit.

### Task 5: Responsive, dark mode, accessibility polish, screenshots, README

**Files:**
- Modify: `styles.css`, `tests/check.mjs`
- Create: `README.md`, `screenshots/*.png` (via `tests/screens.mjs`)

- [ ] Step 1: Add checks.
  - At 320px, `#explore [role=tablist]` has `overflow-x` set to auto or scroll and the page has no overflow.
  - In emulated dark color scheme, the body background luminance is below 0.2.
  - Every button and input has an accessible name.
- [ ] Step 2: Run. Fix failures.
- [ ] Step 3: `tests/screens.mjs` captures full-page shots at 1440 and 390 widths, in light and dark. Review them visually and fix layout issues.
- [ ] Step 4: Write the README: what the site is, how to run it locally, how to host it, how to connect the waitlist, and how to edit features in `js/features.js`.
- [ ] Step 5: Run all checks, then commit.
