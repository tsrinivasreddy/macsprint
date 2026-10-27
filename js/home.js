// Homy-inspired home screen: greeting, Library folders, Clean Up cards and
// Downloaded From sources. Used by the Explorer's Home demo and the hero window.
// All figures are sample data.

const svg = (inner, size = 16) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const G = {
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  zip: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 4v4M12 11v2"/>',
  app: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><path d="M9 15l3-7 3 7"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
  down: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v9M8.5 13l3.5 3.5 3.5-3.5"/>',
  shot: '<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><circle cx="12" cy="12" r="3"/>',
  disk: '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4v4h-4"/>',
  dots: '<circle cx="12" cy="6" r="1.4" fill="currentColor"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/><circle cx="12" cy="18" r="1.4" fill="currentColor"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>',
  hash: '<path d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16"/>',
  bubble: '<path d="M4 12a8 7 0 1 1 3.5 5.8L4 19l1-3.4A6.8 6.8 0 0 1 4 12Z"/>',
  pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
};

const dot = (inner) => `<i class="hm-dot">${inner}</i>`;
const phDot = (h) => `<i class="hm-dot ph" style="--h:${h}"></i>`;
const glyphDot = (g, tone) => `<i class="hm-dot hm-dot-g" style="--dot:var(--${tone})">${svg(G[g], 11)}</i>`;
const more = (n) => `<i class="hm-dot hm-more">+${n}</i>`;

export const FOLDERS = [
  { kind: 'Images', tint: '#5b7cfa', h: 215, items: '2,280', size: '2.81 GB', dots: phDot(210) + phDot(30) + phDot(150) + more(99) },
  { kind: 'Videos', tint: '#a46bf5', h: 275, items: '162', size: '11.21 GB', dots: phDot(330) + phDot(190) + phDot(20) + more(99) },
  { kind: 'Music', tint: '#f2647e', h: 345, items: '34', size: '82.7 MB', dots: glyphDot('music', 'c-aud') + glyphDot('music', 'c-aud') + glyphDot('music', 'c-aud') + more(31) },
  { kind: 'Documents', tint: '#f0a23b', h: 35, items: '201', size: '1.16 GB', dots: glyphDot('doc', 'c-doc') + glyphDot('doc', 'c-img') + glyphDot('doc', 'c-arc') + more(99) },
  { kind: 'Archives', tint: '#3fb985', h: 150, items: '93', size: '630.3 MB', dots: glyphDot('zip', 'c-doc') + glyphDot('zip', 'c-doc') + glyphDot('zip', 'c-doc') + more(90) },
  { kind: 'Apps', tint: '#3aa7d9', h: 195, items: '110', size: '14.31 GB', dots: glyphDot('app', 'c-dev') + glyphDot('app', 'c-arc') + glyphDot('app', 'c-img') + more(99) },
];

const CLEAN = [
  { label: 'Duplicates', tint: 'pink', icon: 'copy', big: '44.8 MB', sub: '24 extra copies', go: 'duplicates', dots: glyphDot('zip', 'c-doc') + glyphDot('zip', 'c-doc') + phDot(200) },
  { label: 'Old Downloads', tint: 'blue', icon: 'down', big: '11.5 GB', sub: '1,227 items', go: 'organizer', dots: glyphDot('app', 'c-dev') + glyphDot('app', 'c-vid') + glyphDot('zip', 'c-doc') },
  { label: 'Old Screenshots', tint: 'peach', icon: 'shot', big: '321.3 MB', sub: '480 items', go: 'cleanup', dots: phDot(250) + phDot(90) + phDot(160) },
  { label: 'Large Files', tint: 'mint', icon: 'disk', big: '2.2 GB', sub: '10 items', go: 'storage', dots: phDot(330) + glyphDot('app', 'c-dev') + phDot(40) },
];

const SOURCES = [
  { name: 'Safari', icon: 'compass', tint: 'blue', files: '131 files', size: '1.01 GB', dots: phDot(200) + phDot(20) },
  { name: 'Mail', icon: 'mail', tint: 'lav', files: '104 files', size: '119.9 MB', dots: glyphDot('doc', 'c-doc') + glyphDot('doc', 'c-img') },
  { name: 'Slack', icon: 'hash', tint: 'pink', files: '79 files', size: '103 MB', dots: phDot(300) + glyphDot('doc', 'c-arc') },
  { name: 'Messages', icon: 'bubble', tint: 'mint', files: '66 files', size: '102.3 MB', dots: phDot(120) + phDot(60) },
  { name: 'Figma', icon: 'pen', tint: 'peach', files: '51 files', size: '7.4 MB', dots: phDot(280) + phDot(10) },
];

export function greeting(date = new Date()) {
  const h = date.getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

export function homeMarkup({ compact = false } = {}) {
  const folders = compact ? FOLDERS.slice(0, 4) : FOLDERS;
  return `
    <div class="hm${compact ? ' hm-compact' : ''}">
      <div class="hm-top">
        <div><p class="hm-greet">${greeting()}</p><p class="hm-sub">2,880 files · 30.19 GB across your Mac</p></div>
        ${compact ? '' : `<button type="button" class="hm-refresh">${svg(G.refresh, 14)} Refresh</button>`}
      </div>

      <div class="hm-head"><h4>Library</h4><span class="hm-count">6</span></div>
      <div class="hm-folders">${folders.map((f) => `
        <button type="button" class="hm-folder" style="--tint:${f.tint};--h:${f.h}" data-kind="${f.kind}" aria-label="${f.kind}: ${f.items} items, ${f.size}">
          <span class="fd" aria-hidden="true"><span class="fd-tab"></span><span class="fd-back"></span><span class="fd-papers"><i></i><i></i></span><span class="fd-front"></span></span>
          <b>${f.kind}</b>
          <small>${f.items}${compact ? '' : ' · ' + f.size}</small>
        </button>`).join('')}
      </div>

      <div class="hm-head"><h4>Clean Up</h4><span class="hm-pill">Free up to 14.1 GB</span></div>
      <div class="hm-cleans">${CLEAN.map((c) => `
        <button type="button" class="hm-clean" data-go="${c.go}" aria-label="${c.label}: ${c.big}, ${c.sub}">
          <span class="hm-clean-top"><span class="hm-clean-icon">${svg(G[c.icon], 16)}</span><span class="hm-dots">${c.dots}</span></span>
          <span class="hm-clean-label">${c.label}</span>
          <b class="hm-big">${c.big}</b>
          <span class="hm-meta">${c.sub}</span>
        </button>`).join('')}
      </div>

      ${compact ? '' : `
      <div class="hm-head"><h4>Downloaded From</h4><span class="hm-count">129</span><button type="button" class="hm-seeall" data-go="library">See all →</button></div>
      <div class="hm-srcs">${SOURCES.map((s) => `
        <button type="button" class="hm-src" data-go="library" aria-label="Downloaded from ${s.name}: ${s.files}, ${s.size}">
          <span class="hm-src-icon">${svg(G[s.icon], 18)}</span>
          <span class="hm-src-text"><b>${s.name}</b><small>${s.files} · ${s.size}</small></span>
          <span class="hm-dots">${s.dots}</span>
        </button>`).join('')}
      </div>`}
    </div>`;
}

// Wire clicks: folders open the Library filtered by kind; clean-up and source cards open their feature.
export function bindHome(el, go) {
  el.querySelectorAll('.hm-folder').forEach((b) => b.addEventListener('click', () => go('library', { kind: b.dataset.kind })));
  el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => go(b.dataset.go)));
  const refresh = el.querySelector('.hm-refresh');
  if (refresh) refresh.addEventListener('click', () => { el.querySelector('.hm-sub').textContent = '2,880 files · 30.19 GB across your Mac · updated just now'; });
}

// Static, non-interactive copy of the app window for the hero.
export function heroWindowMarkup() {
  const side = [
    ['Home', '', true], ['Recents', ''], ['Images', '2,280'], ['Videos', '162'], ['Music', '34'], ['Documents', '201'], ['Archives', '93'], ['Apps', '110'],
  ];
  const tools = [['Large Files', '10', 'alert'], ['Screenshots', '589'], ['Duplicates', '44.8 MB', 'good'], ['Clean Up', '14.1 GB', 'good']];
  const row = ([n, m, tone]) => `<li${tone === true ? ' class="on"' : ''}><span>${n}</span>${m ? `<em class="${typeof tone === 'string' ? 'is-' + tone : ''}">${m}</em>` : ''}</li>`;
  return `
    <aside class="hw-side">
      <div class="hw-lights"><i></i><i></i><i></i></div>
      <div class="ex-brand"><span class="brand-mark"></span><span>MacSprint</span></div>
      <ul>${side.map(row).join('')}</ul>
      <ul class="hw-sep">${tools.map(row).join('')}</ul>
      <p class="hw-label">Locations</p>
      <ul class="hw-locs">${['Desktop', 'Documents', 'Downloads', 'Pictures'].map((l) => `<li><span>${l}</span></li>`).join('')}</ul>
    </aside>
    <div class="hw-main">
      <div class="ex-toolbar"><span class="ex-search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/></svg><span>Search, or try “pdfs from last week”…</span><kbd>⌘</kbd><kbd>F</kbd></span><span class="ex-libsize">Library size <b>30.19 GB</b></span></div>
      <div class="hw-content">${homeMarkup({ compact: true })}</div>
    </div>`;
}
