// Highlights: a bento of the main features, each shown as one big picture of what it does.
// Every tile opens its feature in the explorer.
import { FEATURES, STORIES, iconSvg } from './features.js';
import { selectFeature } from './explorer.js';

const byId = new Map(FEATURES.map((f) => [f.id, f]));
const story = new Map(STORIES.map((s) => [s.id, s]));
const ph = (h, extra = '') => `<span class="ph" style="--h:${h}"${extra}></span>`;

// Tile id → size class and picture. Thumbnail colours (--h) pick the matching photo (js/photos.js).
const TILES = [
  { id: 'search', size: 'hl-xl', art: `
      <div class="hl-query"><span class="hl-tok">Photos ×</span><span class="hl-tok">Last summer ×</span><span>from the trip</span></div>
      <div class="hl-results">
        ${[[200, 'IMG_2041.heic'], [10, 'Trip.mov'], [120, 'IMG_1187.heic']].map(([h, n]) => `<figure>${ph(h)}<figcaption>${n}<em>Matched by meaning</em></figcaption></figure>`).join('')}
      </div>` },
  { id: 'cleanup', size: 'hl-md', art: `
      <div class="hl-ring" style="--p:47"><b>14.1<small> GB</small></b><span>ready to free</span></div>` },
  { id: 'duplicates', size: 'hl-md', art: `
      <div class="hl-dupes">${ph(330)}${ph(330)}<span class="hl-keep">Keep</span><span class="hl-trash">Trash</span></div>` },
  { id: 'clipboard', size: 'hl-sm', art: `
      <ul class="hl-clips">
        <li><span>Flight QF 482, seat 14C</span><i>Copy</i></li>
        <li><span>https://maps.app/…/cafe</span><i>Copy</i></li>
        <li><span>Wi-Fi: harbour-guest-24</span><i>Copy</i></li>
      </ul>` },
  { id: 'downloaded', size: 'hl-sm', art: `
      <div class="hl-sources">${[['S', 'Safari', 210], ['M', 'Mail', 230], ['S', 'Slack', 280], ['W', 'WhatsApp', 140], ['A', 'AirDrop', 195], ['C', 'ChatGPT', 160]]
        .map(([l, n, h]) => `<span style="--sh:${h}"><b>${l}</b>${n}</span>`).join('')}</div>` },
  { id: 'recents', size: 'hl-sm', art: `
      <div class="hl-strip">${ph(30)}${ph(260)}${ph(280)}${ph(20)}</div>` },
  { id: 'rename', size: 'hl-wide', art: `
      <ul class="hl-names">
        <li><s>document (2).pdf</s><b>Lease agreement 2026.pdf</b></li>
        <li><s>IMG_0042 copy.jpeg</s><b>Kochi dinner.jpeg</b></li>
        <li><s>Untitled 7.png</s><b>Login error screenshot.png</b></li>
      </ul>` },
];

export function initHighlights(grid) {
  grid.innerHTML = TILES.map(({ id, size, art }) => {
    const f = byId.get(id); const s = story.get(id);
    return `
      <a class="hl-tile ${size} reveal" href="#feature-${id}" data-id="${id}">
        <span class="hl-head">
          <span class="hl-name">${iconSvg(f.icon, 15)}${s.label}</span>
          ${s.keys.length > 1 ? `<span class="hl-keys">${s.keys.map((k) => `<kbd>${k}</kbd>`).join('')}</span>` : ''}
        </span>
        <span class="hl-title">${s.title}</span>
        ${size === 'hl-wide' ? `<span class="hl-sub">${s.use}</span>` : ''}
        <span class="hl-art" aria-hidden="true">${art}</span>
      </a>`;
  }).join('');
  grid.addEventListener('click', (e) => {
    const a = e.target.closest('.hl-tile'); if (!a) return;
    e.preventDefault();
    selectFeature(a.dataset.id);
    document.getElementById('explore').scrollIntoView({ block: 'start' });
    document.getElementById('tab-' + a.dataset.id)?.focus({ preventScroll: true });
  });
}
