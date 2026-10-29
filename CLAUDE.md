# MacSprint: notes for Claude

MacSprint is a private, on-device Mac app for finding, viewing, organizing and cleaning up files. This repo is
the marketing website (repo root), its waitlist backend (`worker/`) and the design workspace (`design/`).
The Swift app does not exist yet; it will be built from `design/feature-flows.html`.

## Rules the owner has set (follow them without being asked)

**Website copy**
- Never name another app or product, and never say "inspired by". Describe what a thing does instead.
  (`design/inspiration/` is internal research and may name them; it is not published.)
- No version numbers, no "At launch", no roadmap, no pricing section.
- Plain, short sentences. Re-read new copy for grammar.
- Privacy promises stay true everywhere: on-device, no account, nothing uploaded, files go to the Trash, Undo on every change.

**Design**
- Foundations are final: `design/FOUNDATIONS.md`. Wordmark "Mac S P R I N T" in indigo; accent `#3b5bdb` light / `#8399ff` dark;
  buttons `#2f4bc4` / `#4a63e0`; radii window 14, card 16, button 9, field 9; SF Pro; soft shadows; search centred; filled buttons.
- Static designs only. No hover motion, fans or animated effects (the owner found them glitchy). Light and dark must both work.
- Keep the sidebar short: Discover (Home, Recents, Library, Downloaded From, Clipboard) and Clean up (Clean Up, Duplicates, Organizer).
  New features live inside an existing place; they do not add sidebar rows. Quick Search, Command Panel, Menu Bar, Finder Tools,
  Screenshot Toolkit and Window Manager were removed on purpose.
- Removed design experiments are kept in `design/lab/` (see its README). Do not delete them.

**Features** (16, in `js/features.js`)
Home, Recents, Visual Library, Image Viewer, Search, Ask Your Files, Downloaded From, Clipboard, Paste Clean, Clean Up,
Space Map, Explain This, Duplicates, Organizer, Screenshot Inbox, Smart Rename.
Every feature needs: a `FEATURES` entry, a `STORIES` entry (problem, use case, shortcut), a demo in `js/demos.js` with the same id,
and a flow in `design/feature-flows.html`.

## Layout

| Path | What |
|---|---|
| `index.html`, `styles.css`, `js/` | Website: plain HTML/CSS/ES modules, no framework |
| `js/features.js` | Single source of truth: `FEATURES`, `STORIES`, `PROBLEMS`, `SHORTCUTS` |
| `js/demos.js` | One interactive demo per feature id (`DEMOS`) |
| `js/explorer.js`, `showcase.js`, `highlights.js`, `home.js`, `sections.js`, `main.js` | Explorer, spotlight cards, highlights bento, hero, waitlist form, bootstrap |
| `js/photos.js`, `assets/photos/` | Real photos for thumbnails; `BY_HUE` maps a thumbnail's `--h` colour to a photo |
| `worker/index.js`, `worker/schema.sql`, `wrangler.jsonc` | Cloudflare Worker: static site + waitlist API (D1) |
| `tools/build-site.mjs` | Builds `site/` for Cloudflare (points the waitlist form at `/api/waitlist`) |
| `tools/build-artifact.py` | Builds `dist/index.html` for the claude.ai preview |
| `design/` | Foundations, feature flows, inspiration notes, lab. See `design/README.md` |
| `tests/check.mjs` | Playwright checks for the website |

## Commands

- Preview: `python3 -m http.server 8765` then open http://localhost:8765 (ES modules need HTTP).
- Test: `npm test`. Needs Playwright (`npx playwright install chromium`). It must pass before every push.
  When you add or remove features, update the counts in `tests/check.mjs` (features, tabs, problem cards, highlight tiles).
- Worker locally: `npx wrangler dev --var EXPORT_KEY:test --var NOTIFY_TO:you@example.com`.
- Pushing to `main` redeploys macsprint.com through Cloudflare. Deploy steps: `docs/DEPLOY.md`.

## Feature flows page (`design/feature-flows.html`)

- Data: `F` (flows), `C` (the "parts" registry), `win({sel, tb, body, insp, footer, over, saved})`, `toolbar()`, `sidebar()`, `SIDE`.
- Each step lists `comps` (part ids). Every id in `comps` needs an element with the matching `data-c`, and every step except the
  last needs exactly one `data-hot` (the click target). Pins must equal parts. Check this by stepping through all flows in light and dark.
- A new part needs a `C` entry: name, `swift`, `sf`, size, type, colour, shape, states and a `sample()`.

## Waitlist (do not break)

- `POST /api/waitlist` saves to D1 (duplicates are recognised), then alerts the owner. Email goes through Cloudflare Email Routing
  (free; only to a verified inbox set as `NOTIFY_TO`). Optional phone alerts: Discord (`DISCORD_WEBHOOK`) or Telegram
  (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`). Subscribers receive no email.
- `GET /api/waitlist/export?key=` returns a CSV for Excel. `GET /api/waitlist/test-email?key=` sends a test alert and shows the result.
- Secrets live only in the Cloudflare dashboard: `EXPORT_KEY`, the Discord and Telegram values. Never put a secret, token or key in
  the repo, a commit, a log or chat, and never ask for one in chat. `NOTIFY_TO` is set in the dashboard, not in `wrangler.jsonc`.
- Opened from the repo or the claude.ai preview, the form keeps `data-endpoint=""` and says honestly that it sends nothing.

## Publishing the claude.ai pages

- Website: https://claude.ai/artifact/Q5rLoYf9B27MqrWvVf2xxQ. Run `python3 tools/build-artifact.py`, then publish `dist/index.html`
  to that URL with the supporting files (`styles.css`, `js/*.js`, `assets/photos/*.jpg`). Pages use no `<html>`/`<head>`.
- Feature flows: https://claude.ai/artifact/AKZpLyE6xmZCKXms3GnhKz (publish `design/feature-flows.html`).
- Foundations: https://claude.ai/artifact/D2DkAL8ZHo1vRohYUX137G.
- Commit and push first, then publish, so GitHub and the pages never disagree.

## Working style

- Small, verified changes. After a visual change, screenshot it in light, dark and at 390 px, and make sure the page has no horizontal scroll.
- Be honest about what was and was not tested (for example, email has only been tested with a fake sender locally).
- Say what a feature cannot do. The on-device model is small, so features like Ask Your Files must show their source and fall back to plain results.
