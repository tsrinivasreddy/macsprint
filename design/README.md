# MacSprint design workspace

Design pages for MacSprint AI. Each file is a standalone page you can open in a browser
(or published as a claude.ai artifact).

| File | What it is | Live page |
|------|------------|-----------|
| `foundations.html` | Choose and lock the shared foundations (colour, type, corners, spacing, cards, sidebar, toolbar, buttons, icons, logo) with a live preview. Choices are stored where Claude can read them | https://claude.ai/artifact/D2DkAL8ZHo1vRohYUX137G |
| Figma: Library folders | Six new folder styles (Rest + Hover fan-out of the last five items) and the Quick Look panel | https://www.figma.com/design/GfAtd52w4TiLTV4Cdn9WWA |
| `feature-flows.html` | Click-through flows for every feature (Ask Your Files is part of Search), each marked Draft, In review or Final, with every screen part named and specified | https://claude.ai/artifact/AKZpLyE6xmZCKXms3GnhKz |
| `design-day.html` | One-day interactive course on Mac app UI design with SwiftUI | https://claude.ai/artifact/G3PtpAEVu8NLHbmn4Z9DPp |
| `search.html` | Search: Big preview rows, AI always on, Graphite field with voice, style comparison and voice notes | https://claude.ai/artifact/3yWNpo3MCC2wnV9vfgDB2u |
| `home-options.html` | Home: five ranked options (Space bar, Today first, Storage cards, Ring, Quick actions), light or dark | https://claude.ai/artifact/LMRToH1G9C8Hkm8cKUjQka |
| `home-info.html` | Home, round 2: five ranked information designs (Free-up, Squares, This week, Blocks, Sources) with colour-blind-safe kind colours | https://claude.ai/artifact/GrnZpnCpojaSFFkaCbRnSs |
| `recents-options.html` | Recents: five ranked options (Latest first, Timeline, Day groups, Week strip, Columns by day), light or dark | https://claude.ai/artifact/WLW2dosf3mtjYzDo6DJvJF |
| `library-options.html` | Library: five ranked options (Kind tabs, Kind tiles, Shelves, Kinds and folders, Gallery), light or dark | https://claude.ai/artifact/9vpmXz9MFciP3R1x4gBnUy |
| `graphite-glass-sample.html` | The "Graphite & Glass" style sample | https://claude.ai/artifact/4CZ9zh8ntYYZb5cdYpUH32 |

Other references:
- UI Component Guide (editable doc): https://claude.ai/artifact/3hVbfwGsL7EWJjotqAbYcF
- Marketing website (repo root, published): https://claude.ai/artifact/Q5rLoYf9B27MqrWvVf2xxQ

## Workflow

1. Send a reference design for a feature (screenshot or link), what you like about it,
   and whether the change applies to that feature only or to every screen.
2. Claude updates `feature-flows.html` and republishes it to the same link.
3. When every feature is marked Final, the SwiftUI app is built from these flows.

Note: the artifact pages are written without `<html>`/`<head>` tags because claude.ai adds
them when publishing; browsers still open the files directly.

- [`FOUNDATIONS.md`](FOUNDATIONS.md): the final foundations and tokens every feature uses.
- [`lab/`](lab/README.md): removed experiments (hover fan + Quick Look, logo marks, pastel website) kept for reuse.
- [`inspiration/`](inspiration/): studies of reference sites (what to take, adapt or skip, mapped to the foundations). First: [Seek](inspiration/seek.md); then the [Seek + Homy UX review](inspiration/seek-homy-review.md) and the [feature cross-check, everyday tasks and shortcut map](inspiration/feature-matrix.md).
