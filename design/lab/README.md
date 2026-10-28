# MacSprint Design Lab

Ideas we built, tried and took out of the main pages. Nothing here is in use. It is kept so a later feature can reuse it instead of rebuilding it.

**How to use something from here**
1. Open the snapshot `.html` in a browser to see it working (it runs offline and never touches the real Foundations choices).
2. Copy the snippet files (or the code between the markers named below) into the page that needs it.
3. Each entry also has a git tag, so the exact commit can always be checked out: `git checkout <tag> -- <path>`.

| Idea | Why it was removed | Snapshot | Reusable code | Git tag |
|---|---|---|---|---|
| **Hover fan + Quick Look**: hovering a folder fans its last five items out in an arc (oldest left, newest right, staggered spring); click an item or press Space for a Quick Look panel with ← → , filmstrip, Esc | Hover motion felt glitchy on Home, folders were hard to select and nearby items got clicked by mistake | [`hover-fan-quick-look/demo.html`](hover-fan-quick-look/demo.html) | [`fan-and-quicklook.css`](hover-fan-quick-look/fan-and-quicklook.css), [`fan-and-quicklook.js`](hover-fan-quick-look/fan-and-quicklook.js) | `lab/hover-fan-quick-look` |
| **App-icon logo marks**: six rounded-square marks (folder, chevron, window, stack, lens, monogram) with Classic, Split, Rounded, Italic and AI wordmarks | We chose a name-only brand: "Mac S P R I N T" in Indigo, no logo | [`logo-marks.html`](logo-marks.html) (the "Logo" and "Wordmark" decisions) | `logoSvg()` and `LOGOS` in the snapshot; also still in `../feature-flows.html` until foundations are applied there | `lab/logo-marks` |
| **Homy-style pastel website**: first website look with pastel library folders, before the Graphite & Glass restyle | Restyled to the Apple-like Graphite & Glass theme | Check out the tag (whole site) | `index.html`, `styles.css` at the tag | `lab/website-pastel` |

## Still live, not archived

These options remain selectable on the Foundations page, so they are not copied here:
Library folder styles Recents strip, Album mosaic, Storage card (chosen), Finder list, Pastel, Frosted glass, Clean outline, Photos peeking, Glossy colour, Vault, Paper stack, Aurora, Line, Shelf, Lens tile, macOS folders, Colour cards, Icon tiles.
The Figma file [MacSprint — Library Folders](https://www.figma.com/design/GfAtd52w4TiLTV4Cdn9WWA) holds the Vault … Lens styles with Rest and Hover (fan) variants and the Quick Look panel.

## SwiftUI notes for the archived motion

- Hover fan: `.onHover { hovering in withAnimation(.spring(response: 0.35, dampingFraction: 0.7)) { isOpen = hovering } }`, each item offset on an arc with a per-index `.delay(Double(i) * 0.04)`; respect `@Environment(\.accessibilityReduceMotion)`.
- Quick Look: `.quickLookPreview($selectedURL, in: lastFiveURLs)` gives the native panel with arrow keys and Space for free.

## Adding to the lab

When we remove something, copy the last working page into `lab/` with its own `<title>MacSprint Lab · …</title>` and storage key, add a row above, and tag the commit `lab/<name>`.
