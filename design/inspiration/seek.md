# Inspiration: Seek (useseek.app)

Studied from a saved copy of the page (the live site is blocked in the cloud environment), on 2026-10-28.
Seek is "a smarter Finder for your Mac": plain-English search, photo search, text in images, duplicates,
cleanup, Downloaded From, Smart Rename and a split view. Very close to MacSprint, so the value is in the
details of how each screen behaves, not in new features.

## Their style (for reference, not to copy)

| Token | Light | Dark |
|---|---|---|
| Page | `#fff8f3` warm peach | `#141317` |
| Card | `#ffffff` | `#23212a` |
| Ink / muted | `#1f1a24` / `#6b6271` | `#f4f1f5` / `#b2aab6` |
| Accent | blue `#1a9bff` (deep `#0b6fe0`), coral `#ff7a59` for section labels | blue `#45b0ff` |
| Type | Bricolage Grotesque (display), SF / Inter (text) | |
| Shape | cards 20 px, pills 999 px, small parts 8–9 px | |
| Shadow | warm brown tint: `0 12px 32px -12px rgba(120,60,30,.18)` | |

## Take, adapt or skip

| Idea from Seek | Decision | How it lands in MacSprint |
|---|---|---|
| Search turns the query into **removable filter tokens** under the field (“Videos ×”, “September ×”) | **Take** | Search step 2: tokens replace the separate “Understood as” chips and pop-up row. Indigo soft fill, 9 pt corners. SwiftUI has this natively: `.searchable(text:tokens:)`. |
| **Status bar** at the bottom of results: “1 result of 26 · Understood as filters” and “Everything runs on your Mac” | **Take** | Search results get a window bottom bar: count + “Understood as filters” on the left, a lock icon and “On your Mac” on the right. Privacy said quietly, where it matters. |
| Large result tiles with a **metadata overlay** (“Movies · Sep 20 · 0:08”) and a duration badge | **Adapt** | Our match-reason tag stays the main label; the overlay pill shows kind · date on the thumbnail, so the caption below stays short. |
| Text in images: the matched line outlined, with **Copy Text attached to the selection** | **Adapt** | In the preview, the Copy Text button floats next to the highlighted line (like Live Text) instead of only living in the button row. Indigo, not coral. |
| Duplicates as **side-by-side cards with Keep / Trash badges**; click a copy to keep it instead; summary “15 MB can be freed · 1 extra copy · Trash Extras” | **Take** | Duplicate Finder step 3: cards replace the radio list. A summary bar on top; the destructive button says exactly what goes. Folder path stays on each card. |
| Example searches as **quote chips** below the window | **Already have** | Our “Try asking” suggestions do this inside the app. No change. |
| Cleanup categories with emoji icons and a Trash button per row | **Skip for now** | Our Clean Up cards already cover it; emoji clash with SF Symbols outline icons. Revisit when we refine Cleanup. |
| Smart Rename (AI names junk downloads) | **Not added** | A new feature, so it is your call. Logged here for the roadmap discussion. |
| Split view with two panes | **Skip** | Out of scope after trimming to 10 features. |
| Warm peach/coral palette, Bricolage Grotesque, pill buttons, warm shadows | **Skip** | Clashes with the final foundations: indigo, cool graphite, SF Pro, soft 9/16 pt corners, neutral soft shadows. |

## New or changed parts

| Part | Where | Spec (foundations) | SwiftUI |
|---|---|---|---|
| Search token | Search step 2 | Height 22 pt, 9 pt corners, indigo text on 11% indigo, “×” to remove | `.searchable(text: $q, tokens: $tokens) { Label($0.title, systemImage: $0.symbol) }` |
| Results status bar | Search step 2 | 28 pt tall, hairline on top, 11 pt secondary text; lock icon on the right | `.safeAreaInset(edge: .bottom) { StatusBar(...) }` |
| Result tile overlay | Search step 2 | Dark 60% capsule, 10 pt semibold white, bottom-left of the thumbnail | `.overlay(alignment: .bottomLeading) { Text(meta).padding(…).background(.black.opacity(0.6), in: .capsule) }` |
| Copy Text on selection | Search step 3 | Filled indigo button, 9 pt corners, anchored to the highlighted line | Custom overlay over `ImageAnalysisOverlayView` (VisionKit Live Text) |
| Copy card (Keep / Trash) | Duplicates step 3 | 16 pt card; Keep = 2 pt indigo ring + filled badge; Trash = grey badge | `Button { keep = copy } label: { CopyCard(copy, isKept: keep == copy) }` |
| Duplicate summary bar | Duplicates step 3 | Card with “can be freed” in red, extra-copy count, destructive “Trash 2 copies” | `HStack` in a `GroupBox`; button `role: .destructive` |

Figma: these parts are in the “Seek-inspired parts” page of the MacSprint — Library Folders file.
