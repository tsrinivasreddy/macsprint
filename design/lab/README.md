# MacSprint Design Lab

Ideas we built, tried and took out of the main pages. Nothing here is in use. It is kept so a later feature can reuse it instead of rebuilding it.

**How to use something from here**
1. Open the snapshot `.html` in a browser to see it working (it runs offline and never touches the real Foundations choices).
2. Copy the snippet files (or the code between the markers named below) into the page that needs it.
3. Each entry also names the commit it came from, so the original can always be restored: `git checkout <commit> -- <path>`.

| Idea | Why it was removed | Snapshot | Reusable code | Commit |
|---|---|---|---|---|
| **Hover fan + Quick Look**: hovering a folder fans its last five items out in an arc (oldest left, newest right, staggered spring); click an item or press Space for a Quick Look panel with ← → , filmstrip, Esc | Hover motion felt glitchy on Home, folders were hard to select and nearby items got clicked by mistake | [`hover-fan-quick-look/demo.html`](hover-fan-quick-look/demo.html) | [`fan-and-quicklook.css`](hover-fan-quick-look/fan-and-quicklook.css), [`fan-and-quicklook.js`](hover-fan-quick-look/fan-and-quicklook.js) | `3945a2c` |
| **App-icon logo marks**: six rounded-square marks (folder, chevron, window, stack, lens, monogram) with Classic, Split, Rounded, Italic and AI wordmarks | We chose a name-only brand: "Mac S P R I N T" in Indigo, no logo | [`logo-marks.html`](logo-marks.html) (the "Logo" and "Wordmark" decisions) | `logoSvg()` and `LOGOS` in the snapshot; also still in `../feature-flows.html` until foundations are applied there | `3f01864` |
| **Seven feature flows**: AI Search and Text in Images as their own sidebar rows; Menu-bar Downloads, Finder Tools, Screenshot Toolkit, Window Manager and Similar Images | Search is one field that matches names, meaning and text in images; Similar Images became the “Similar photos” tab of Duplicate Finder; the four utilities are separate products and pulled focus from files | [`feature-flows-16.html`](feature-flows-16.html) (all 16 flows, steps and parts) | Each feature is one entry in the `F` list; parts in `C` | `f31f986` |
| **16-feature website**: Feature Explorer with Text in Images, Menu-bar Downloads, Finder Tools, Screenshot Toolkit, Window Manager and Similar Images, each with an interactive demo | Trimmed to the same 10 features as the flows | Check out the commit (whole site) | `js/demos.js` (`ocr`, `downloads`, `finder`, `screenshots`, `windows`, `similar`) and `js/features.js` at the commit | `3177f8a` |
| **Search “Understood as” chips + pop-up filters; Duplicates radio/checkbox list** | Replaced by Seek-inspired search tokens, results status bar and Keep / Trash copy cards (see `../inspiration/seek.md`) | `design/feature-flows.html` at the commit | Search step 2 and Duplicate Finder step 3 in `F` | `3177f8a` |
| **Separate Storage Intelligence, Safe Cleanup and Quick Search & Command Panel flows; “Images” sidebar row; Clipboard under Everyday** | UX review against Seek and Homy (`../inspiration/seek-homy-review.md`): one Clean Up place, sidebar sections, Quick Search removed | `design/feature-flows.html` at the commit | Each feature is one entry in `F` | `ab53202` |
| **Homy-style pastel website**: first website look with pastel library folders, before the Graphite & Glass restyle | Restyled to the Apple-like Graphite & Glass theme | Check out the commit (whole site) | `index.html`, `styles.css` at the commit | `84d7bf5` |

## Still live, not archived

These options remain selectable on the Foundations page, so they are not copied here:
Library folder styles Recents strip, Album mosaic, Storage card (chosen), Finder list, Pastel, Frosted glass, Clean outline, Photos peeking, Glossy colour, Vault, Paper stack, Aurora, Line, Shelf, Lens tile, macOS folders, Colour cards, Icon tiles.
The Figma file [MacSprint — Library Folders](https://www.figma.com/design/GfAtd52w4TiLTV4Cdn9WWA) holds the Vault … Lens styles with Rest and Hover (fan) variants and the Quick Look panel.

## SwiftUI notes for the archived motion

- Hover fan: `.onHover { hovering in withAnimation(.spring(response: 0.35, dampingFraction: 0.7)) { isOpen = hovering } }`, each item offset on an arc with a per-index `.delay(Double(i) * 0.04)`; respect `@Environment(\.accessibilityReduceMotion)`.
- Quick Look: `.quickLookPreview($selectedURL, in: lastFiveURLs)` gives the native panel with arrow keys and Space for free.

## Adding to the lab

When we remove something, copy the last working page into `lab/` with its own `<title>MacSprint Lab · …</title>` and storage key, and add a row above with the commit it came from.
