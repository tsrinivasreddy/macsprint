# MacSprint AI

Marketing website (this folder) and design workspace (`design/`).

## Design workspace

See [`design/README.md`](design/README.md) for the feature flows, design course and style sample.

# Website

A single-page, Apple-style marketing site for **MacSprint AI** ("Your Mac. Smarter, faster, cleaner.").
Its centerpiece is the **Feature Explorer**: a Mac-style app window where every one of the 16 features
can be tried from one interface, plus a Highlights section and feature cards with the problem and use case.

Plain HTML, CSS and JavaScript modules. No framework and no external requests. A small build step
(`tools/build-site.mjs`) prepares the Cloudflare deploy. Notes for Claude: [`CLAUDE.md`](CLAUDE.md).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(ES modules need to be served over HTTP; opening `index.html` directly from disk won't load the scripts.)

## Navigating the features

- Click any feature in the Explorer sidebar, or use ↑/↓ when the sidebar has focus.
- Press **⌘K** (Ctrl+K on Windows/Linux) to jump to any feature from anywhere on the page.
- Deep-link to a feature with `#feature-<id>`, e.g. `/#feature-images`.
- The problem cards near the top open the matching feature.

## Files

| Path | Purpose |
|------|---------|
| `index.html` | Page structure and static copy (privacy, trust, FAQ, waitlist) |
| `styles.css` | Design tokens (light/dark), layout, Explorer and demo styles |
| `js/features.js` | **Single source of truth** for features, stories, problem cards and shortcuts |
| `js/explorer.js` | Feature Explorer, keyboard navigation, deep links, ⌘K palette |
| `js/demos.js` | One interactive demo per feature id |
| `js/sections.js` | Problem cards, shortcuts and waitlist form |
| `js/highlights.js`, `js/showcase.js`, `js/home.js`, `js/photos.js` | Highlights bento, feature cards, hero window, photo mapping |
| `worker/`, `wrangler.jsonc`, `tools/` | Cloudflare Worker (waitlist API) and the build scripts |
| `tests/check.mjs` | Browser checks (Playwright) |
| `tests/screens.mjs` | Screenshots at desktop/mobile × light/dark |

### Add or change a feature

1. Edit its entry in `FEATURES` in `js/features.js` (title, points) and its card in `STORIES`.
2. Add or update its demo in `DEMOS` in `js/demos.js` using the same `id`.
3. Update the counts in `tests/check.mjs`, then run `npm test`.

The explorer sidebar, ⌘K palette and feature cards update automatically.

## Waitlist and hosting

The site is deployed to Cloudflare as one Worker that also runs the waitlist (D1 storage, an alert to you
by email and optionally Discord or Telegram, and a CSV export for Excel). Setup and use: [docs/DEPLOY.md](docs/DEPLOY.md).

Opened straight from the repo (or as a claude.ai preview), the form keeps `data-endpoint=""` and honestly
says it sends nothing; `tools/build-site.mjs` points it at `/api/waitlist` for the live site.

## Deploy

Upload the folder to any static host: GitHub Pages, Netlify, Vercel, Cloudflare Pages or S3.
No configuration is needed. You don't need to upload `tests/`, `docs/` or `screenshots/`.

## Tests

Requires Node 18+ and Playwright with Chromium.

```bash
node tests/check.mjs          # all checks
node tests/check.mjs explorer # only checks whose name contains "explorer"
node tests/screens.mjs images # full-page screenshots + Explorer close-ups for the given feature ids
```

## Notes

- Feature demos use clearly fictional sample files. They illustrate the planned app and are not real measurements.
- The design is inspired by Apple's product pages but uses no Apple logos or assets.
  The footer includes a non-affiliation and trademark notice.
