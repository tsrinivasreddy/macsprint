# MacSprint design workspace

Design pages for MacSprint AI. Each file is a standalone page you can open in a browser
(or published as a claude.ai artifact).

| File | What it is | Live page |
|------|------------|-----------|
| `foundations.html` | Choose and lock the shared foundations (colour, type, corners, spacing, cards, sidebar, toolbar, buttons, icons, logo) with a live preview. Choices are stored where Claude can read them | https://claude.ai/artifact/D2DkAL8ZHo1vRohYUX137G |
| `feature-flows.html` | Click-through flows for all 16 features, with every screen part named and specified | https://claude.ai/artifact/AKZpLyE6xmZCKXms3GnhKz |
| `design-day.html` | One-day interactive course on Mac app UI design with SwiftUI | https://claude.ai/artifact/G3PtpAEVu8NLHbmn4Z9DPp |
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
