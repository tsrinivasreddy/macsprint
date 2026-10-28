// Single source of truth for MacSprint features. The Explorer, ⌘K palette
// and problem cards are all generated from these arrays.


// 24×24 stroke icons (inner SVG markup).
const I = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  library: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  images: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 8.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/><path d="M10.5 7.5v6M7.5 10.5h6" opacity=".6"/>',
  cleanup: '<path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
  duplicates: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  organizer: '<path d="M3 7.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2h-7L10 5H5a2 2 0 0 0-2 2.5Z"/><path d="m9.5 14 2 2 3.5-4"/>',
  recents: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  downloaded: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v8M8.5 12.5 12 16l3.5-3.5"/>',
  rename: '<path d="M4 18 9 6l5 12M5.8 14h6.4"/><path d="M17 4v16M15 4h4M15 20h4"/>',
  clipboard: '<rect x="5" y="5" width="14" height="16" rx="2.5"/><rect x="9" y="3" width="6" height="4" rx="1.2"/><path d="M8.5 12h7M8.5 16h5"/>',
};

export const FEATURES = [
  // ---------- Discover ----------
  {
    id: 'home', group: 'Discover', icon: I.home,
    title: 'Home Dashboard', short: 'Storage, scans and quick actions',
    headline: 'Your Mac at a glance — measured, never guessed.',
    points: [
      'Real disk capacity, free space and a category breakdown.',
      'Large-file, old-file and duplicate suggestions you can open in one click.',
      'Live indexing status and on-device AI availability.',
      'Shows “loading”, “unavailable” or “permission needed” instead of fake numbers.',
    ],
  },
  {
    id: 'recents', group: 'Discover', icon: I.recents,
    title: 'Recents', short: 'Newest first, grouped by day',
    headline: 'The file you just downloaded is always first.',
    points: [
      'Everything you added, saved or downloaded lately, grouped by Today, Yesterday and earlier.',
      'Press Space for Quick Look and use ← → to step through. Grid or list with ⌘1 and ⌘2.',
      'Right-click any file for Open, Show in Finder, Copy Path and Move to Trash, each with its shortcut.',
      'Open Recents from anywhere with ⇧⌘R, or drag a file straight into Mail or Slack.',
    ],
  },
  {
    id: 'library', group: 'Discover', icon: I.library, meta: { text: '2,880' },
    title: 'Visual Library', short: 'Your whole Mac as big thumbnails',
    headline: 'Everything on your Mac, sorted by what it is.',
    points: [
      'Browse images, videos, music, documents, apps and screenshots as large, clear thumbnails.',
      'Covers every folder you choose — not just one window at a time.',
      'Pin any folder to the sidebar under Locations.',
      'Works alongside Finder, not instead of it.',
    ],
  },
  {
    id: 'images', group: 'Discover', icon: I.images, meta: { text: '2,280' },
    title: 'Smart Image Viewer', short: 'Open one image, browse the folder',
    headline: 'Open one photo. Press → for the next.',
    points: [
      'Opening a single image loads every supported image in its folder.',
      'Filmstrip, grid view, fullscreen, zoom, pan and rotate.',
      'JPEG, PNG, HEIC and WebP; smooth even with thousands of files.',
      'Copy image, name or path. Reveal in Finder. Move to Trash after confirming.',
    ],
  },
  {
    id: 'search', group: 'Discover', icon: I.search,
    title: 'Search', short: 'Names, meaning and text in images',
    headline: 'One search field. It reads your screenshots too.',
    points: [
      'Plain English becomes precise filters you can edit: type, date, size, folder and text.',
      'Finds words inside screenshots and photos with on-device text recognition.',
      'Every result says why it matched: by name, by meaning, or by text in the image.',
      'Copy recognized text in one click. Without Apple Intelligence, name and text search still work.',
    ],
  },
  {
    id: 'downloaded', group: 'Discover', icon: I.downloaded, meta: { text: '913' },
    title: 'Downloaded From', short: 'Files grouped by where they came from',
    headline: 'Remember who sent it, not what it was called.',
    points: [
      'Every download grouped by source: Safari, Mail, Slack, WhatsApp, AirDrop, ChatGPT and any website.',
      'Biggest sources first, with file counts and sizes.',
      'Opening a source is a search with a “From” token, so you can narrow it down by typing.',
      'The inspector shows where any file came from and when. Opens with ⇧⌘J.',
    ],
  },
  {
    id: 'clipboard', group: 'Discover', icon: I.clipboard,
    title: 'Clipboard History', short: 'Never lose a copied item',
    headline: 'Everything you copied, searchable.',
    points: [
      'Text and image history with pinned snippets.',
      'A quick-paste panel with ⇧⌘V, and a Copy button on every item.',
      'Pause anytime, exclude apps and set how long history is kept.',
      'Stored only on your Mac. Password fields are never recorded.',
    ],
  },
  // ---------- Clean up ----------
  {
    id: 'cleanup', group: 'Clean up', icon: I.cleanup, meta: { text: '14.1 GB', tone: 'good', label: 'up to 14.1 GB to review' },
    title: 'Clean Up', short: 'Where space went, and getting it back',
    headline: 'See where your space went. Get it back safely.',
    points: [
      'The disk bar by category, then cards for old files, old installers, big old videos, old screenshots, apps you do not open and large files.',
      'Every card opens a review with honest labels such as “Not modified for 18 months”.',
      'Preview, confirm, and files go to the macOS Trash, never deleted outright. Undo anything.',
      'Optional automatic clean up for old installers and screenshots, off until you turn it on.',
    ],
  },
  {
    id: 'duplicates', group: 'Clean up', icon: I.duplicates,
    title: 'Duplicate Finder', short: 'Exact copies and similar photos',
    headline: 'Same file, saved three times? Keep one.',
    points: [
      'Finds exact copies by size, then a partial check, then a full fingerprint.',
      'Groups copies with previews, locations and dates; protected files are never pre-selected.',
      'Similar photos (bursts, small edits) get their own tab: compare side by side and keep the best.',
    ],
  },
  {
    id: 'organizer', group: 'Clean up', icon: I.organizer,
    title: 'Smart File Organizer', short: 'Tidy Downloads with a preview',
    headline: 'A tidy Downloads folder, on your approval.',
    points: [
      'Suggests folders such as Documents, Images, Archives and Installers, plus screenshots sorted by month.',
      'Shows every move before anything happens. Untick any file to leave it where it is.',
      'Never overwrites a file: if a name is taken, a number is added. Every move is logged and can be undone.',
    ],
  },
  {
    id: 'rename', group: 'Clean up', icon: I.rename,
    title: 'Smart Rename', short: 'Clear names for junk downloads',
    headline: '“document (2).pdf” becomes “Lease agreement 2026.pdf”.',
    points: [
      'Reads what is inside a download and suggests a clear name, on your Mac.',
      'Only unclear names are suggested; names you typed yourself are never touched.',
      'Review every suggestion before it applies, and undo any rename.',
      'Optionally name new downloads automatically. Off until you turn it on.',
    ],
  },
];

export const PROBLEMS = [
  { letter: 'A', title: 'Preview won’t go to the next photo in the folder', featureId: 'images' },
  { letter: 'B', title: 'No idea what’s filling your disk', featureId: 'cleanup' },
  { letter: 'C', title: 'Years of forgotten files', featureId: 'cleanup' },
  { letter: 'D', title: 'You remember what’s in a file, not its name', featureId: 'search' },
  { letter: 'E', title: 'Important text trapped in screenshots', featureId: 'search' },
  { letter: 'F', title: 'Where did that download go?', featureId: 'recents' },
  { letter: 'G', title: 'Who sent me that file?', featureId: 'downloaded' },
  { letter: 'H', title: 'A Downloads folder out of control', featureId: 'organizer' },
  { letter: 'I', title: '“document (2).pdf” tells you nothing', featureId: 'rename' },
  { letter: 'J', title: 'The same file saved three times', featureId: 'duplicates' },
  { letter: 'K', title: 'Ten photos of the same sunset', featureId: 'duplicates' },
  { letter: 'L', title: 'Copying one thing erases the last', featureId: 'clipboard' },
  { letter: 'M', title: 'Worried about private files leaving your Mac', featureId: 'home', anchor: '#privacy' },
];

export const iconSvg = (inner, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const SHORTCUTS = [
  { group: 'Go', items: [['Home', ['⇧', '⌘', 'H']], ['Recents', ['⇧', '⌘', 'R']], ['Library', ['⇧', '⌘', 'L']], ['Downloaded From', ['⇧', '⌘', 'J']], ['Clipboard', ['⇧', '⌘', 'V']], ['Clean Up', ['⇧', '⌘', 'K']], ['Duplicates', ['⇧', '⌘', 'D']], ['Organizer', ['⇧', '⌘', 'O']]] },
  { group: 'Find and view', items: [['Search', ['⌘', 'F']], ['Copy text from images', ['⇧', '⌘', 'C']], ['Save search', ['⌘', 'S']], ['Quick Look', ['Space']], ['Grid / List', ['⌘', '1', '⌘', '2']], ['Inspector', ['⌘', 'I']], ['Back / Forward', ['⌘', '[', '⌘', ']']]] },
  { group: 'Act', items: [['Open', ['⌘', 'O']], ['Show in Finder', ['⌥', '⌘', 'R']], ['Copy path', ['⌥', '⌘', 'C']], ['Move to Trash', ['⌘', '⌫']], ['Undo', ['⌘', 'Z']]] },
];

// Spotlight cards: the problem, the everyday use, three short points and the shortcut.
// Order here is the order on the page; the first card is shown wide.
export const STORIES = [
  { id: 'search', label: 'Search', keys: ['⌘', 'F'], title: 'Type it the way you’d say it.',
    problem: 'You remember what’s in a file, not what it’s called.',
    use: 'Type “pdfs from last week” and get exactly those files.',
    points: ['Shows how it read you, as filters you can remove', 'Finds photos by what they show', 'Says why each result matched'] },
  { id: 'recents', label: 'Recents', keys: ['⇧', '⌘', 'R'], title: 'The file you just got is always first.',
    problem: 'A new download disappears into a crowded folder.',
    use: 'Open Recents and it’s at the top, ready to preview or drag into an email.',
    points: ['Grouped by Today, Yesterday and this week', 'Space for Quick Look, ← → for the next file', 'Right-click for Show in Finder and Copy Path'] },
  { id: 'downloaded', label: 'Downloaded From', keys: ['⇧', '⌘', 'J'], title: 'Remember where it came from.',
    problem: 'You know who sent the file, not its name.',
    use: 'Click Mail and see every file you saved from email.',
    points: ['Safari, Mail, Slack, WhatsApp, AirDrop and more', 'Biggest sources first', 'Each file shows who sent it and when'] },
  { id: 'cleanup', label: 'Clean Up', keys: ['⇧', '⌘', 'K'], title: 'Gigabytes back, safely.',
    problem: 'Your Mac says the disk is full, and you don’t know why.',
    use: 'Review old installers and big videos, then move them to the Trash.',
    points: ['See where the space went', 'Review before anything moves', 'Everything goes to the Trash, so you can undo'] },
  { id: 'duplicates', label: 'Duplicates', keys: ['⇧', '⌘', 'D'], title: 'One copy is plenty.',
    problem: 'The same file is saved three times, in three places.',
    use: 'Keep the best copy with one click and trash the rest.',
    points: ['Exact copies matched by content', 'Similar photos side by side', 'See the space you’ll get back'] },
  { id: 'home', label: 'Home', keys: ['⇧', '⌘', 'H'], title: 'Your Mac at a glance.',
    problem: 'You can’t tell what’s on your Mac or what’s using the space.',
    use: 'Open MacSprint and see every kind of file, its size and what you could free.',
    points: ['A shelf for each kind of file', 'Clean Up cards with real sizes', 'Recent downloads by source'] },
  { id: 'library', label: 'Library', keys: ['⇧', '⌘', 'L'], title: 'Everything, sorted by what it is.',
    problem: 'Your files are spread across dozens of folders.',
    use: 'Pick Videos and see every video on your Mac in one place.',
    points: ['Big, clear thumbnails', 'Filter by kind or by folder', 'Pin the folders you use most'] },
  { id: 'images', label: 'Image Viewer', keys: ['←', '→'], title: 'Open one photo. Press → for the next.',
    problem: 'Preview shows only the photo you opened.',
    use: 'Open any photo and step through the whole folder with the arrow keys.',
    points: ['Zoom, rotate and full screen', 'Filmstrip and grid view', 'JPEG, PNG, HEIC and WebP'] },
  { id: 'clipboard', label: 'Clipboard', keys: ['⇧', '⌘', 'V'], title: 'Never lose something you copied.',
    problem: 'Copying something new erases what you copied before.',
    use: 'Press ⇧⌘V, find the address from an hour ago and click Copy.',
    points: ['Search everything you copied', 'Pin snippets you reuse', 'Password fields are never recorded'] },
  { id: 'organizer', label: 'Organizer', keys: ['⇧', '⌘', 'O'], title: 'A tidy Downloads folder.',
    problem: 'Downloads is a pile of everything.',
    use: 'See where each file would go, untick what should stay, then approve.',
    points: ['Folders by kind, screenshots by month', 'Nothing moves until you approve', 'Every move can be undone'] },
  { id: 'rename', label: 'Smart Rename', keys: ['↩'], title: 'Names that make sense.',
    problem: '“document (2).pdf” tells you nothing.',
    use: 'Smart Rename reads the file and suggests “Lease agreement 2026.pdf”.',
    points: ['Only unclear names are suggested', 'You approve every new name', 'Undo any rename'] },
];
