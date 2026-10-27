// Single source of truth for MacMate features. The Explorer, ⌘K palette,
// problem cards and roadmap are all generated from these arrays.

export const RELEASES = [
  { id: 'At launch', title: 'Release 1.0', name: 'File, Image & Storage Essentials' },
  { id: '1.1', title: 'Release 1.1', name: 'Smart Organization' },
  { id: '1.2', title: 'Release 1.2', name: 'Everyday Productivity' },
  { id: '2.0', title: 'Release 2.0', name: 'Full Utility Suite' },
];

// 24×24 stroke icons (inner SVG markup).
const I = {
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/><path d="M10 19.5v-5h4v5"/>',
  library: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
  images: '<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 8.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/><path d="M10.5 7.5v6M7.5 10.5h6" opacity=".6"/>',
  ocr: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><path d="M8 9h8M8 12h8M8 15h5"/>',
  storage: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  cleanup: '<path d="M4 7h16"/><path d="M9 7V4.5h6V7"/><path d="M6 7l1 13h10l1-13"/><path d="M10 11v5M14 11v5"/>',
  duplicates: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  organizer: '<path d="M3 7.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2h-7L10 5H5a2 2 0 0 0-2 2.5Z"/><path d="m9.5 14 2 2 3.5-4"/>',
  quicksearch: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 10h3M7 14h10"/><circle cx="15.5" cy="10" r="1.5"/>',
  downloads: '<path d="M12 4v11"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 17v1.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V17"/>',
  finder: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M12 4v16"/><path d="M7.5 9v1.5M16.5 9v1.5"/><path d="M7.5 15c2.5 2 6.5 2 9 0"/>',
  clipboard: '<rect x="5" y="5" width="14" height="16" rx="2.5"/><rect x="9" y="3" width="6" height="4" rx="1.2"/><path d="M8.5 12h7M8.5 16h5"/>',
  screenshots: '<path d="M7 3v14a1 1 0 0 0 1 1h13"/><path d="M3 7h13a1 1 0 0 1 1 1v13"/>',
  windows: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M12 4v16M12 12h9"/>',
  similar: '<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>',
};

export const FEATURES = [
  // ---------- Discover ----------
  {
    id: 'home', group: 'Discover', icon: I.home, release: 'At launch', source: 'MacMate',
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
    id: 'library', group: 'Discover', icon: I.library, release: 'At launch', source: 'Homy',
    title: 'Visual Library', short: 'Your whole Mac as big thumbnails',
    headline: 'Everything on your Mac, sorted by what it is.',
    points: [
      'Browse Images, Videos, Music, Documents, Apps and Screenshots as large, clear thumbnails.',
      'Covers every folder you choose — not just one window at a time.',
      'Works alongside Finder, not instead of it.',
    ],
  },
  {
    id: 'images', group: 'Discover', icon: I.images, release: 'At launch', source: 'MacMate',
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
    id: 'search', group: 'Discover', icon: I.search, release: 'At launch', source: 'MacMate + Homy',
    title: 'AI Search', short: 'Find files by describing them',
    headline: 'Type what you mean. Get real files.',
    points: [
      'Plain English becomes precise filters: type, date, size, folder and text.',
      'Runs on a private index of the folders you choose.',
      'Every result is a real file with its path and the text that matched.',
      'Without Apple Intelligence, filename, date and text search still work.',
    ],
  },
  {
    id: 'ocr', group: 'Discover', icon: I.ocr, release: 'At launch', source: 'MacMate + Homy',
    title: 'Text in Images', short: 'Search words inside screenshots',
    headline: 'Find the screenshot by what it says.',
    points: [
      'On-device text recognition using Apple’s Vision framework.',
      'Search finds IMG_2048.png when it contains “connection timed out”.',
      'Matches are highlighted; copy the text in one click.',
      'Runs in the background with pause and cancel. No Apple Intelligence required.',
    ],
  },
  // ---------- Clean up ----------
  {
    id: 'storage', group: 'Clean up', icon: I.storage, release: 'At launch', source: 'MacMate',
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
    id: 'cleanup', group: 'Clean up', icon: I.cleanup, release: 'At launch', source: 'MacMate',
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
    id: 'duplicates', group: 'Clean up', icon: I.duplicates, release: '1.1', source: 'MacMate + Homy',
    title: 'Duplicate Finder', short: 'Exact copies, grouped for review',
    headline: 'Same file, saved three times? Keep one.',
    points: [
      'Finds exact copies by size, then a partial check, then a full fingerprint.',
      'Groups copies with previews, locations and dates.',
      'You choose what goes; protected files are never pre-selected.',
    ],
  },
  {
    id: 'organizer', group: 'Clean up', icon: I.organizer, release: '1.1', source: 'MacMate',
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
    id: 'quicksearch', group: 'Everyday', icon: I.quicksearch, release: '1.2', source: 'Homy + MacMate',
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
    id: 'downloads', group: 'Everyday', icon: I.downloads, release: '1.2', source: 'Homy',
    title: 'Menu-bar Downloads', short: 'Last 10 downloads, drag anywhere',
    headline: 'Your latest downloads, one click away.',
    points: [
      'The menu bar icon lists the last 10 files that landed in Downloads, with thumbnails.',
      'Drag one straight into Mail, Messages or any app.',
      'Click to open, or reveal it in Finder.',
    ],
  },
  {
    id: 'finder', group: 'Everyday', icon: I.finder, release: '1.2', source: 'MacMate',
    title: 'Finder Tools', short: 'Copy path, new file, favorites',
    headline: 'The Finder shortcuts you always wanted.',
    points: [
      'Copy full path, create new files, open Terminal at a folder.',
      'Copy or move files into favorite folders in one step.',
      'Bookmarks and recent files, plus Finder Quick Actions where macOS allows.',
    ],
  },
  {
    id: 'clipboard', group: 'Everyday', icon: I.clipboard, release: '1.2', source: 'MacMate',
    title: 'Clipboard History', short: 'Never lose a copied item',
    headline: 'Everything you copied, searchable.',
    points: [
      'Text and image history with pinned snippets.',
      'A quick-paste panel from the keyboard.',
      'Pause anytime, exclude apps and set how long history is kept.',
      'Stored locally; password fields are never recorded on purpose.',
    ],
  },
  {
    id: 'screenshots', group: 'Everyday', icon: I.screenshots, release: '1.2 · 2.0', source: 'MacMate',
    title: 'Screenshot Toolkit', short: 'Capture, mark up, blur, copy',
    headline: 'Capture, blur, annotate — done.',
    points: [
      'Capture a region, window or display (1.2).',
      'Grab the text with OCR, then open it in the image viewer (1.2).',
      'Crop, add arrows, shapes and text, and blur private details (2.0).',
    ],
  },
  {
    id: 'windows', group: 'Everyday', icon: I.windows, release: '2.0', source: 'MacMate',
    title: 'Window Manager', short: 'Snap layouts and workspaces',
    headline: 'Windows exactly where you want them.',
    points: [
      'Halves, thirds and corners with keyboard shortcuts.',
      'Save a workspace and restore it later — across multiple displays.',
      'Tells you clearly if an app does not allow its windows to be moved.',
    ],
  },
  {
    id: 'similar', group: 'Everyday', icon: I.similar, release: '2.0', source: 'MacMate',
    title: 'Similar Images', short: 'Near-duplicates and visual search',
    headline: 'Find the best shot among near-identical ones.',
    points: [
      'Groups visually similar photos — kept separate from exact duplicates.',
      'Search your images by what they show.',
      'Compare two images side by side before you decide.',
    ],
  },
];

export const PROBLEMS = [
  { letter: 'A', title: 'Preview won’t go to the next photo in the folder', featureId: 'images' },
  { letter: 'B', title: 'No idea what’s filling your disk', featureId: 'storage' },
  { letter: 'C', title: 'Years of forgotten files', featureId: 'storage' },
  { letter: 'D', title: 'You remember what’s in a file, not its name', featureId: 'search' },
  { letter: 'E', title: 'Important text trapped in screenshots', featureId: 'ocr' },
  { letter: 'F', title: 'A Downloads folder out of control', featureId: 'organizer' },
  { letter: 'G', title: 'The same file saved three times', featureId: 'duplicates' },
  { letter: 'H', title: 'Repetitive Finder chores', featureId: 'finder' },
  { letter: 'I', title: 'Copying one thing erases the last', featureId: 'clipboard' },
  { letter: 'J', title: 'Windows scattered across displays', featureId: 'windows' },
  { letter: 'K', title: 'Five steps for one screenshot', featureId: 'screenshots' },
  { letter: 'L', title: 'Too many separate utility apps', featureId: 'quicksearch' },
  { letter: 'M', title: 'Worried about private files leaving your Mac', featureId: 'home', anchor: '#privacy' },
];

export const iconSvg = (inner, size = 18) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const badgeClass = (release) =>
  release === 'At launch' ? 'badge badge-launch' : release.startsWith('2') ? 'badge badge-later' : 'badge badge-soon';
export const badgeLabel = (release) => (release === 'At launch' ? 'At launch' : 'Coming in ' + release);
