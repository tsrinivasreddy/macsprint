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

Design page: [`search.html`](search.html), live at https://claude.ai/artifact/3yWNpo3MCC2wnV9vfgDB2u.
Search is the one place that steps outside the plain field above: a frosted, fully rounded field on a soft gradient band.

**Results: Big preview rows.** 64×48 thumbnail with a yellow box where the words were found; line 1 file name;
line 2 the matched text, highlighted; line 3 reason icon + reason (Text in image, Name, What it shows) · folder · date.
Footer: count · "Found on your Mac" and the shortcuts. Thumbnails lazy-loaded and cached.

**Smart search is always on.** No switch in the field or in Settings. When the on-device model is not available
(Intel, macOS before 26, Apple Intelligence off or model not ready), search uses names and OCR text only and the
footer says once: "Smart search needs Apple Intelligence". Every result keeps its reason line.

**Field: Graphite.** Height 52, radius full (capsule), search icon 24, text 19, microphone on the right.
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
