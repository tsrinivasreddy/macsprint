# MacSprint foundations (final)

Chosen on the [Foundations page](https://claude.ai/artifact/D2DkAL8ZHo1vRohYUX137G). Every feature design uses these.

| Decision | Choice |
|---|---|
| Name style | Mac S P R I N T (wide, SPRINT in capitals) |
| Name colour | Indigo |
| Accent colour | Indigo |
| Background greys | Cool graphite |
| Typeface | SF Pro |
| Text size | Mac standard |
| Corner shape | Soft |
| Spacing | Regular |
| Card style | Soft shadow |
| Sidebar selection | Raised |
| Toolbar layout | Search centred |
| Main button style | Filled |
| Sidebar icons | Outline |
| Library folders | Storage card |
| AI search default | Always on (no on/off switch) |
| Search results | Big preview rows |
| Search field | Graphite frosted pill, with voice |

## Tokens

| Token | Light | Dark |
|---|---|---|
| Accent | `#3b5bdb` | `#8399ff` |
| Button fill | `#2f4bc4` | `#4a63e0` |

- Radius: window 14, card 16, button 9, field 9
- Type (SF Pro): title 22, heading 14, body 13, caption 11
- Spacing: ×1 (regular)

## Search (decided 2026-10-29)

**Update: the field is now Halo** ([round 2](search-bar-round2.html), option 1, Glass list). A rounded capsule in the
toolbar (Search or ask, ⌘F, microphone) opens into a floating glass panel over any screen, 500 pt wide, 20 pt corners,
regular material (solid when Reduce Transparency is on), deep soft shadow. A hairline ring (indigo → violet → sky) sits
at 50% and brightens with a soft glow, turning only while listening or thinking; it is still with Reduce Motion.
Field 16 pt medium; the microphone becomes a gradient pill of level bars while listening. The answer is quiet type
("Answer from your files") with its source chip; files follow. Rows: 52×40 thumbnail with a file-type tag, name
12.5 pt semibold, matched words tinted in the accent, reason icon + folder + date; the selected row is a soft accent
tint with a fine ring and shows ↩ Open and Space. Footer: count, "Found on your Mac. Nothing leaves it.", keys.
The Graphite band below is kept for reference only.

Design page: [`search.html`](search.html), live at https://claude.ai/artifact/3yWNpo3MCC2wnV9vfgDB2u.
Search is the one place that steps outside the plain field above: a frosted, fully rounded field on a soft gradient band.

**Results: Big preview rows.** 64×48 thumbnail with a yellow box where the words were found; line 1 file name;
line 2 the matched text, highlighted; line 3 reason icon + reason (Text in image, Name, What it shows) · folder · date.
Footer: count · "Found on your Mac" and the shortcuts. Thumbnails lazy-loaded and cached.

**Smart search is always on.** No switch in the field or in Settings. When the on-device model is not available
(Intel, macOS before 26, Apple Intelligence off or model not ready), search uses names and OCR text only and the
footer says once: "Smart search needs Apple Intelligence". Every result keeps its reason line.

**Field: Graphite (replaced by Halo above).** Height 52, radius full (capsule), search icon 24, text 19, microphone on the right.
Fill blur 18. Dotted underline marks words still being recognised during voice input.

| Token | Light | Dark |
|---|---|---|
| Band gradient | `#cfd2d8` → `#aeb2bc` | `#2b2d32` → `#1c1e22` |
| Field fill | `rgba(255,255,255,.86)` | `rgba(255,255,255,.08)` |
| Icon and text | `#363940` | `#e6e8ec` |
| Microphone | `#363940` | `#e6e8ec` |
| Selected row | `#3d4048` | `#50545e` |

Open question: the selected row could use the foundation button fill (`#2f4bc4` / `#4a63e0`) instead, to match buttons elsewhere.
Other field styles (Ocean, Sunset, Meadow, Lavender) stay selectable on the design page for comparison.

**Voice search.** Mic button, or hold ⌥ Space. States: idle, listening (stop button + level bars), live words
(dotted underline), done (words turned into tokens such as Screenshots and Last month). Respect Reduce Motion.
All on-device and free; no audio leaves the Mac.

| Step | API | Minimum macOS | Fallback |
|---|---|---|---|
| Speech to text | `SpeechAnalyzer` + `SpeechTranscriber` | 26 | `SFSpeechRecognizer` with `requiresOnDeviceRecognition = true` (13+). Never use server recognition |
| Sentence to filters | Foundation Models | 26 + Apple Intelligence | `NSDataDetector` for dates + keyword rules for kinds and places |
| Text in images | Vision text recognition | 13 | none needed |

Needs `NSMicrophoneUsageDescription`, `NSSpeechRecognitionUsageDescription` and the
`com.apple.security.device.audio-input` sandbox entitlement. Speech assets download on first use: show "Getting voice ready".
Check these APIs against Apple's current docs when building.

Note: the design page animates the voice demo to explain the states. The rest of the designs stay static.

## Home (decided 2026-10-29)

From the [Home options](home-options.html) page: option 3, **Storage cards**, with the **Your files** space bar from option 1
added above the cards. Order: greeting and Refresh, Your files bar, Library storage cards (largest first), Clean Up cards.

**Kind colours** (one fixed colour per kind, never by rank). They passed the colour-blindness check (dataviz validator,
adjacent pairs) in light and dark; the earlier colours failed (Images and Videos looked the same). Every colour sits next to
its name or a tooltip, so colour never carries meaning alone.

| Kind | Light | Dark |
|---|---|---|
| Apps | `#2a78d6` | `#3987e5` |
| Videos | `#eb6834` | `#d95926` |
| Images | `#1baf7a` | `#199e70` |
| Documents | `#eda100` | `#c98500` |
| Archives | `#e87ba4` | `#d55181` |
| Music | `#008300` | `#008300` |

The website still uses the earlier colours; update it when the owner asks.

## Recents (decided 2026-10-29)

From the [Recents options](recents-options.html) page: option 1, **Latest first**. The newest file gets its own card
(preview with a New badge, kind, source, size, Open / Quick Look / Show in Finder, and a "drag it into Mail" hint).
Below it: kind filter chips, then the other files in a grid grouped by Today, Yesterday and Earlier this week, each with
its source and time. Grid / List switch top right (⌘1 / ⌘2).

## Library (decided 2026-10-29)

From the [Library options](library-options.html) page: option 1, **Kind tabs**. One row of tabs (All, Apps, Videos,
Images, Documents, then More for Archives and Music; more kinds move into More as the window narrows), each with its
kind colour dot and count. A summary line ("162 videos · 11.21 GB · 37% of your files") with a Sort pop-up
(Largest first). A grid of big previews with folder and size. Selecting a file opens the inspector on the right (⌘I).

## Downloaded From (decided 2026-10-29)

From the [Downloaded From options](downloaded-from-options.html) page: option 1, **Sources and files**. A Sources list on
the left (app icon, name, size, file count; most files first). Beside it, the chosen source's files grouped by day, each
with its origin under the name (sender · email subject, or the website), the time and the size. Picking a source adds a
"From: Mail" token to the search field. The inspector shows From, Subject and when it arrived.

## Clipboard (decided 2026-10-29)

From the [Clipboard options](clipboard-options.html) page: option 1, **Search panel**. ⇧⌘V opens a centred floating panel
over any app: search field and settings gear on top, Pinned, then Today. Each row: kind icon (text, link, image, colour
swatch, code), the item, and the app it came from with the time. The selected row shows Copy and Pin; the others show
⌘1–⌘9. Footer: ↩ Paste, ⌥↩ Paste as plain text, ⌘P Pin, and "Passwords never saved".

## Free Up Space (decided 2026-10-29; was "Clean Up")

The sidebar row is now **Free Up Space** so it does not repeat the section name "Clean up" (shortcut ⇧⌘K unchanged).
From [round 2](free-up-space-round2.html): one screen, three views in a switch at the top, ⌘1 / ⌘2 / ⌘3:
- **Files** (default): a sentence with the total (14.1 GB), then the groups biggest first. Each row shows the group's
  biggest files as thumbnails with sizes, "+ N more", the group size and Review.
- **Running total**: the same groups on one shared scale. Each bar starts where the last ended (accent bar, pale trail
  for what came before) and a "So far" column keeps the total. The headline says where most of the space is.
- **Map**: the Space Map treemap.
Every view ends with: "You review every group first. Files go to the Trash, and Undo puts them back."

## Duplicates (decided 2026-10-29)

From [round 2](duplicates-round2.html): option 1, **Keep chips, open in place**. Exact copies / Similar photos switch on
top. One row per group, biggest saving first: a Reviewed tick (or empty circle), thumbnail, name, a chip per copy named
by its folder (keeper in the button fill with a star, others struck through, protected copies locked and always kept),
and the saving. Click a row or press Return and it opens in place: every copy side by side with a real preview, folder
and date (differences in accent), a Keep / Trash switch under each, and "Identical contents, checked byte by byte".
Space opens Quick Look on the focused copy; ↓ closes the group, marks it Reviewed and opens the next. The bottom bar
trashes copies from reviewed groups only; "Trash all N suggested…" is a separate, plainer button. Keys: ↑↓ groups,
←→ copies, K keep, Space Quick Look, Return open or close.
Scan result (first screen), visuals over words: "44.8 MB you can free" over one thick bar split by kind (Home
colours, each part with its kind icon and size, small parts unlabeled), folder tiles with a count badge (the biggest in
the accent tint), 46 extra copies and 9 similar sets beside them, and one quiet line for how it was checked
(48,210 › 1,204 › 131 › 73 identical). Then Review 27 groups and "Nothing moves until you choose".

## Organizer (decided 2026-10-29)

From the [options page](organizer-options.html): option 1, **Piles**. Each destination folder is a pile, biggest first:
three thumbnails, a count badge, the destination with a folder icon in the kind colour, and a switch to leave the pile
out. A dashed tile counts what stays (added this week or open in an app). Click a pile and its files open in place
below, like Duplicates: a tick box, the name now, an arrow, and the new name in the accent. The bar says exactly how
many files move ("Move 181 files"); "Review all…" lists every file. Moves check names first (a taken name gets a
number, nothing is overwritten), and every move and rename can be undone. When done, each badge turns green with a tick.

## Space Map (decided 2026-10-29)

From the [options page](space-map-options.html): option 1, **Nested blocks**. The Map view in Free Up Space. Every
folder is a block sized by its space (squarified treemap), in the Home kind colour of its files; mixed and system
folders are grey, and System is locked ("macOS needs this"). Big blocks show their own biggest folders inside under a
white veil, so one look goes two levels deep; small folders fold into Other. A path (Macintosh HD › Movies) sits above
the map. The bar below names the selected block with its size and one insight, plus Show in Finder and Review in Files.
Nothing is removed from the map itself.
Inside a folder, file blocks show a poster frame. Click a file and it is ringed, the path grows to the file, and the bar
becomes the file (poster, size, length, last opened) with Quick Look (Space), Show in Finder and Move to Trash… (same
confirmation and Undo as Free Up Space). Quick Look opens over the map; ← → step through the folder's files.
