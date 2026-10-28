// Single source of truth for MacSprint features. The Explorer, ⌘K palette,
// problem cards and roadmap are all generated from these arrays.

export const RELEASES = [
  { id: 'At launch', title: 'Release 1.0', name: 'File, Image & Storage Essentials' },
  { id: '1.1', title: 'Release 1.1', name: 'Smart Organization' },
  { id: '1.2', title: 'Release 1.2', name: 'Everyday Productivity' },
  { id: '2.0', title: 'Release 2.0', name: 'Smarter Photos' },
];

// 24×24 stroke icons (inner SVG markup).
const I = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  library: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  images: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 8.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/><path d="M10.5 7.5v6M7.5 10.5h6" opacity=".6"/>',
  storage: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  cleanup: '<path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
  duplicates: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  organizer: '<path d="M3 7.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2h-7L10 5H5a2 2 0 0 0-2 2.5Z"/><path d="m9.5 14 2 2 3.5-4"/>',
  quicksearch: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 10h3M7 14h10"/><circle cx="15.5" cy="10" r="1.5"/>',
  clipboard: '<rect x="5" y="5" width="14" height="16" rx="2.5"/><rect x="9" y="3" width="6" height="4" rx="1.2"/><path d="M8.5 12h7M8.5 16h5"/>',
};

export const FEATURES = [
  // ---------- Discover ----------
  {
    id: 'home', group: 'Discover', icon: I.home, release: 'At launch', source: 'MacSprint',
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
    id: 'library', group: 'Discover', icon: I.library, release: 'At launch', source: 'Homy', meta: { text: '2,880' },
    title: 'Visual Library', short: 'Your whole Mac as big thumbnails',
    headline: 'Everything on your Mac, sorted by what it is.',
    points: [
      'Browse Images, Videos, Music, Documents, Apps and Screenshots as large, clear thumbnails.',
      'Covers every folder you choose — not just one window at a time.',
      'Groups downloads by where they came from — Safari, Mail, Slack and more.',
      'Works alongside Finder, not instead of it.',
    ],
  },
  {
    id: 'images', group: 'Discover', icon: I.images, release: 'At launch', source: 'MacSprint', meta: { text: '2,280' },
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
    id: 'search', group: 'Discover', icon: I.search, release: 'At launch', source: 'MacSprint + Homy',
    title: 'Search', short: 'Names, meaning and text in images',
    headline: 'One search field. It reads your screenshots too.',
    points: [
      'Plain English becomes precise filters you can edit: type, date, size, folder and text.',
      'Finds words inside screenshots and photos with on-device text recognition.',
      'Every result says why it matched: by name, by meaning, or by text in the image.',
      'Copy recognised text in one click. Without Apple Intelligence, name and text search still work.',
    ],
  },
  // ---------- Clean up ----------
  {
    id: 'storage', group: 'Clean up', icon: I.storage, release: 'At launch', source: 'MacSprint', meta: { text: '10', tone: 'alert', label: '10 large files' },
    title: 'Storage Intelligence', short: 'See what fills your disk',
    headline: 'See exactly where your space went.',
    points: [
      'Category breakdown, largest files and largest folders.',
      'Old-file review from 30 days to 2 years, or a custom age.',
      'Honest labels such as “Not modified for 18 months” — never “unused” without proof.',
      'Volume totals kept separate from scans of your chosen folders.',
    ],
  },
  {
    id: 'cleanup', group: 'Clean up', icon: I.cleanup, release: 'At launch', source: 'MacSprint', meta: { text: '14.1 GB', tone: 'good', label: 'up to 14.1 GB to review' },
    title: 'Safe Cleanup', short: 'Preview, confirm, move to Trash',
    headline: 'Nothing disappears without your say‑so.',
    points: [
      'Every change is previewed with the total selected size.',
      'Files go to the macOS Trash — never deleted outright.',
      'Cleanup history and a report after every action.',
      'System and app folders are excluded by default.',
    ],
  },
  {
    id: 'duplicates', group: 'Clean up', icon: I.duplicates, release: '1.1 · 2.0', source: 'MacSprint + Homy',
    title: 'Duplicate Finder', short: 'Exact copies and similar photos',
    headline: 'Same file, saved three times? Keep one.',
    points: [
      'Finds exact copies by size, then a partial check, then a full fingerprint.',
      'Groups copies with previews, locations and dates; protected files are never pre-selected.',
      'Similar photos (bursts, small edits) get their own tab: compare side by side and keep the best. Coming in 2.0.',
    ],
  },
  {
    id: 'organizer', group: 'Clean up', icon: I.organizer, release: '1.1', source: 'MacSprint',
    title: 'Smart File Organizer', short: 'Tidy Downloads with a preview',
    headline: 'A tidy Downloads folder, on your approval.',
    points: [
      'Suggests groups such as Documents, Images, Archives, Installers and Screenshots by month.',
      'Dry-run preview of every move, with rename suggestions from file contents.',
      'Never overwrites; name collisions are handled and every action is logged.',
    ],
  },
  // ---------- Everyday ----------
  {
    id: 'quicksearch', group: 'Everyday', icon: I.quicksearch, release: '1.2', source: 'Homy + MacSprint',
    title: 'Quick Search & Command Panel', short: 'A shortcut away, from any app',
    headline: 'One shortcut. Any file, any action.',
    points: [
      'A compact panel drops in over whatever app you are using.',
      'Search files, then open, reveal or copy their path.',
      'Run actions: find old files, capture a screenshot, restore a layout.',
      'Keyboard-first, with a shortcut you can change.',
    ],
  },
  {
    id: 'clipboard', group: 'Everyday', icon: I.clipboard, release: '1.2', source: 'MacSprint',
    title: 'Clipboard History', short: 'Never lose a copied item',
    headline: 'Everything you copied, searchable.',
    points: [
      'Text and image history with pinned snippets.',
      'A quick-paste panel from the keyboard.',
      'Pause anytime, exclude apps and set how long history is kept.',
      'Stored locally; password fields are never recorded on purpose.',
    ],
  },
];

export const PROBLEMS = [
  { letter: 'A', title: 'Preview won’t go to the next photo in the folder', featureId: 'images' },
  { letter: 'B', title: 'No idea what’s filling your disk', featureId: 'storage' },
  { letter: 'C', title: 'Years of forgotten files', featureId: 'storage' },
  { letter: 'D', title: 'You remember what’s in a file, not its name', featureId: 'search' },
  { letter: 'E', title: 'Important text trapped in screenshots', featureId: 'search' },
  { letter: 'F', title: 'A Downloads folder out of control', featureId: 'organizer' },
  { letter: 'G', title: 'The same file saved three times', featureId: 'duplicates' },
  { letter: 'H', title: 'Ten photos of the same sunset', featureId: 'duplicates' },
  { letter: 'I', title: 'Copying one thing erases the last', featureId: 'clipboard' },
  { letter: 'J', title: 'Finding a file means leaving what you’re doing', featureId: 'quicksearch' },
  { letter: 'K', title: 'Worried about private files leaving your Mac', featureId: 'home', anchor: '#privacy' },
];

export const iconSvg = (inner, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const badgeClass = (release) =>
  release === 'At launch' ? 'badge badge-launch' : release.startsWith('2') ? 'badge badge-later' : 'badge badge-soon';
export const badgeLabel = (release) => (release === 'At launch' ? 'At launch' : 'Coming in ' + release);

export const SHORTCUTS = [
  { group: 'Find', items: [['Quick Search, from any app', ['⌥', 'Space']], ['Search in MacSprint', ['⌘', 'F']], ['Command panel', ['⌘', 'K']], ['Copy text from images', ['⇧', '⌘', 'C']], ['Downloaded From', ['⇧', '⌘', 'J']]] },
  { group: 'View', items: [['Next / previous image', ['←', '→']], ['Grid view', ['⌘', '1']], ['List view', ['⌘', '2']], ['Quick Look', ['Space']], ['Inspector', ['⌘', 'I']]] },
  { group: 'Tidy', items: [['Duplicates', ['⇧', '⌘', 'D']], ['Clean Up', ['⇧', '⌘', 'K']], ['Clipboard history', ['⇧', '⌘', 'V']], ['Organize Downloads', ['⇧', '⌘', 'O']], ['Move to Trash', ['⌘', '⌫']]] },
];
