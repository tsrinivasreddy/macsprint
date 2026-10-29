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
| Search field | Ocean frosted pill, with voice |

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

**Field: Ocean.** Height 52, radius full (capsule), search icon 24, text 19, microphone on the right.
Fill blur 18. Dotted underline marks words still being recognised during voice input.

| Token | Light | Dark |
|---|---|---|
| Band gradient | `#3b8fd8` → `#4cc0c4` | `#163a5c` → `#134e56` |
| Field fill | `rgba(236,247,255,.85)` | `rgba(8,22,32,.55)` |
| Icon and text | `#1d5c99` | `#a3d4ff` |
| Microphone | `#227f99` | `#8de2e4` |
| Selected row | `#1f63a6` | `#2d6fb0` |

Open question: the selected row could use the foundation button fill (`#2f4bc4` / `#4a63e0`) instead, to match buttons elsewhere.
Other field styles (Sunset, Meadow, Lavender, Graphite) stay selectable on the design page for comparison.

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
