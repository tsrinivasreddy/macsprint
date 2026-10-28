# UX review: MacSprint vs Seek and Homy

Reviewed 2026-10-28 from saved copies of useseek.app and tryhomy.app (the live sites are blocked in the cloud
environment) and the MacSprint feature flows. Method: the Design plugin's design-critique framework.

## Overall impression

MacSprint's screens were already strong (storage cards, match-reason tags, Keep / Trash cards). The biggest
problem was **information architecture**: the sidebar mixed places with tools and split one job (getting space
back) across three rows. Both competitors use the same simple pattern, places first and smart folders second,
and both treat “where a file came from” as a place.

## Usability

| Finding | Severity | Recommendation (done) |
|---|---|---|
| Sidebar mixes places and tools: “Images” opened the Image Viewer, which is a way to open files, not a place | 🔴 Critical | Removed the row. The viewer opens from Finder or any thumbnail, like Preview. |
| Storage and Safe Cleanup were two features; the Storage flow ended with “Next, the Safe Cleanup flow…” | 🔴 Critical | Merged into one **Clean Up**: disk bar, six smart cards, review, confirm, Trash, Undo. |
| Quick Search and Command Panel duplicated the in-app search and macOS Spotlight | 🟡 Moderate | Removed (your call). Search stays one field in the toolbar. |
| No “where did this come from” view, which both competitors make a sidebar place | 🟡 Moderate | Added **Downloaded From**: sources biggest first; a source opens as a search with a “From: Mail” token. |
| No Recents, the most common starting point in Finder, Seek and Homy | 🟡 Moderate | Added a Recents row to the sidebar. |
| Searches people repeat had to be retyped | 🟡 Moderate | Added **Save search**: saved searches appear in the sidebar with a live count (from Homy). |
| Junk download names (“document (2).pdf”) only got renamed as a side effect of moving | 🟡 Moderate | Added **Smart Rename** as a Rename tab in Organizer (from Seek): review old → new names, Undo, optional auto-naming. |
| After a cleanup there was no way to make it happen on its own | 🟢 Minor | Added an **Automatic clean up** offer after the report, with plain-sentence rules, all off by default (from Homy). |
| Library asked people to “click the card again to open its menu” | 🟢 Minor | Now “Right-click the card”, the Mac convention. |
| Clipboard sat alone in an “Everyday” group | 🟢 Minor | Moved under Discover, as you asked. |

## Information architecture (before → after)

| Before | After |
|---|---|
| Home · Library · Images | **Discover:** Home · Recents · Library · Downloaded From · Clipboard |
| Storage · Clean Up · Duplicates · Organizer | **Clean up:** Clean Up · Duplicates · Organizer (Move and Rename tabs) |
| Clipboard | **Saved searches:** appears when you save one |
| 10 flows incl. Quick Search, Storage, Safe Cleanup | 10 flows: Home, Library, Image Viewer, Search, Downloaded From, Clipboard, Clean Up, Duplicates, Organizer, Smart Rename |

Sidebar sections now have labels (Discover, Clean up, Saved searches), like Finder and Music.

## Visual hierarchy

- **What draws the eye first:** the large title and the storage cards on Home. Correct for a dashboard.
- **Reading flow:** title → cards → Clean Up. On Clean Up the disk bar now comes before the cards, so people see the whole before the parts.
- **Emphasis:** one filled button per screen; destructive actions are red and always name the count (“Trash 2 copies”, “Rename 3 files”).

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Badges | Organizer showed a red alert badge for “3 names to fix” | Removed; red badges are for problems, not suggestions. |
| Numbers | Clean Up totals differ between Home (14.1 GB “safe to free”) and the Clean Up cards (all candidates) | Keep the sidebar badge equal to Home; label Home as “Free up to”. Revisit with real scan data. |
| Opening a source | Could have been its own browser | It is a search with a From token, so it behaves exactly like Search. |

## Accessibility

- **Colour contrast:** text on cards and tokens uses the foundation tokens that already pass AA in light and dark (checked by the website's contrast test).
- **Targets:** sidebar rows 25 pt, buttons 22–24 pt, standard for macOS pointer targets.
- **Readability:** body 13 pt, captions 10–11 pt; nothing below 9.5 pt except image overlays.

## What works well (kept)

- Storage cards on Home with share-of-library bars.
- One search field with tokens, match-reason tags and the “On your Mac” status bar.
- Keep / Trash copy cards and the summary bar in Duplicates.
- Everything goes to the Trash, every change has Undo.

## Considered and not added

| Idea | From | Why not now |
|---|---|---|
| Menu bar recent downloads, Quick Search panel | Homy | Removed earlier by you; Search and Downloaded From cover the need inside the app. |
| Split view, transfer queue | Seek | A Finder-replacement feature; MacSprint works alongside Finder. |
| Two looks (Playful / Minimal) | Homy | Foundations are final; one calm look. |
| Music player in the toolbar | Homy | Out of scope for a file and space app. |
| Shortcuts and Siri actions (Find Files, Get Latest Download) | Homy | Good for a later release; no new screens needed. |
| Copy text from several images at once | Homy | Small extension of Copy Text; add when refining Search. |

## Priority recommendations (next)

1. **Recents flow:** the row exists; design its screen (grouped Today / Yesterday / This week).
2. **Real numbers:** reconcile Home's “Free up to” with Clean Up once scans are real.
3. **Website:** bring the new sidebar and the four new flows to the marketing site's Feature Explorer.
