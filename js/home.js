// Home screen: greeting, Library storage cards, Clean Up cards and
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
  photo: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="m21 16-5-5-9 8"/>',
  film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16"/>',
};

const dot = (inner) => `<i class="hm-dot">${inner}</i>`;
const phDot = (h) => `<i class="hm-dot ph" style="--h:${h}"></i>`;
const glyphDot = (g, tone) => `<i class="hm-dot hm-dot-g" style="--dot:var(--${tone})">${svg(G[g], 11)}</i>`;
const more = (n) => `<i class="hm-dot hm-more">+${n}</i>`;

export const FOLDERS = [
  { kind: 'Images', icon: 'photo', pct: 9, latest: 'Screenshot 9.41.png', tint: '#5b7cfa', h: 215, items: '2,280', size: '2.81 GB', dots: phDot(210) + phDot(30) + phDot(150) + more(99) },
  { kind: 'Videos', icon: 'film', pct: 37, latest: 'Trip.mov', tint: '#a46bf5', h: 275, items: '162', size: '11.21 GB', dots: phDot(330) + phDot(190) + phDot(20) + more(99) },
  { kind: 'Music', icon: 'music', pct: 0, latest: 'Mix.m4a', tint: '#f2647e', h: 345, items: '34', size: '82.7 MB', dots: glyphDot('music', 'c-aud') + glyphDot('music', 'c-aud') + glyphDot('music', 'c-aud') + more(31) },
  { kind: 'Documents', icon: 'doc', pct: 4, latest: 'Brief.pdf', tint: '#f0a23b', h: 35, items: '201', size: '1.16 GB', dots: glyphDot('doc', 'c-doc') + glyphDot('doc', 'c-img') + glyphDot('doc', 'c-arc') + more(99) },
  { kind: 'Archives', icon: 'zip', pct: 2, latest: 'Backup.zip', tint: '#3fb985', h: 150, items: '93', size: '630.3 MB', dots: glyphDot('zip', 'c-doc') + glyphDot('zip', 'c-doc') + glyphDot('zip', 'c-doc') + more(90) },
  { kind: 'Apps', icon: 'app', pct: 47, latest: 'Figma.app', tint: '#3aa7d9', h: 195, items: '110', size: '14.31 GB', dots: glyphDot('app', 'c-dev') + glyphDot('app', 'c-arc') + glyphDot('app', 'c-img') + more(99) },
];

const CLEAN = [
  { label: 'Duplicates', tint: 'pink', icon: 'copy', big: '44.8 MB', sub: '24 extra copies', go: 'duplicates', dots: glyphDot('zip', 'c-doc') + glyphDot('zip', 'c-doc') + phDot(200) },
  { label: 'Old Downloads', tint: 'blue', icon: 'down', big: '11.5 GB', sub: '1,227 items', go: 'organizer', dots: glyphDot('app', 'c-dev') + glyphDot('app', 'c-vid') + glyphDot('zip', 'c-doc') },
  { label: 'Old Screenshots', tint: 'peach', icon: 'shot', big: '321.3 MB', sub: '480 items', go: 'cleanup', dots: phDot(250) + phDot(90) + phDot(160) },
  { label: 'Large Files', tint: 'mint', icon: 'disk', big: '2.2 GB', sub: '10 items', go: 'cleanup', dots: phDot(330) + glyphDot('app', 'c-dev') + phDot(40) },
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
  const folders = compact ? FOLDERS.slice(0, 3) : FOLDERS;
  return `
    <div class="hm${compact ? ' hm-compact' : ''}">
      <div class="hm-top">
        <div><p class="hm-greet">${greeting()}</p><p class="hm-sub">2,880 files · 30.19 GB across your Mac</p></div>
        ${compact ? '' : `<button type="button" class="hm-refresh">${svg(G.refresh, 14)} Refresh</button>`}
      </div>

      <div class="hm-head"><h4>Library</h4><span class="hm-count">6</span></div>
      <div class="hm-folders">${folders.map((f) => `
        <button type="button" class="hm-folder" style="--tint:${f.tint}" data-kind="${f.kind}" aria-label="${f.kind}: ${f.items} items, ${f.size}, ${f.pct || 'under 1'}% of library">
          <span class="hk-top"><span class="hk-icon">${svg(G[f.icon], 16)}</span><b>${f.kind}</b><small>${f.items} items</small></span>
          <span class="hk-size">${f.size}</span>
          <span class="hk-meter" aria-hidden="true"><i style="width:${f.pct}%"></i></span>
          <span class="hk-foot"><span>${f.pct || '<1'}% of library</span><span>${f.latest}</span></span>
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
      <div class="hm-head"><h4>Downloaded From</h4><span class="hm-count">129</span><button type="button" class="hm-seeall" data-go="downloaded">See all →</button></div>
      <div class="hm-srcs">${SOURCES.map((s) => `
        <button type="button" class="hm-src" data-go="downloaded" aria-label="Downloaded from ${s.name}: ${s.files}, ${s.size}">
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
  const side = [['Home', '', true], ['Recents', ''], ['Library', '2,880'], ['Downloaded From', '913'], ['Clipboard', '']];
  const tools = [['Clean Up', '14.1 GB', 'good'], ['Duplicates', '44.8 MB', 'good'], ['Organizer', '']];
  const row = ([n, m, tone]) => `<li${tone === true ? ' class="on"' : ''}><span>${n}</span>${m ? `<em class="${typeof tone === 'string' ? 'is-' + tone : ''}">${m}</em>` : ''}</li>`;
  return `
    <aside class="hw-side">
      <div class="hw-lights"><i></i><i></i><i></i></div>
      <div class="ex-brand"><span class="wm" style="font-size:17px"><span class="wm-m">Mac</span> <span class="wm-s">SPRINT</span></span></div>
      <p class="hw-label hw-label-top">Discover</p>
      <ul>${side.map(row).join('')}</ul>
      <p class="hw-label">Clean up</p>
      <ul>${tools.map(row).join('')}</ul>
      <p class="hw-label">Locations</p>
      <ul class="hw-locs">${['Desktop', 'Documents', 'Downloads', 'Pictures'].map((l) => `<li><span>${l}</span></li>`).join('')}</ul>
    </aside>
    <div class="hw-main">
      <div class="ex-toolbar"><span class="ex-search hw-search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/></svg><span class="hw-q">Ask anything, e.g. “pdfs from last week”</span><kbd>⌘</kbd><kbd>F</kbd><span class="ex-ai">AI</span></span><span class="ex-libsize">Library size <b>30.19 GB</b></span></div>
      <div class="hw-content">${homeMarkup({ compact: true })}</div>
    </div>`;
}

// Example searches under the hero window: each one shows how the
// search reads the query, as tokens, and a few sample results. "Home" goes back.
const TRY = [
  { q: 'videos from september', tokens: ['Videos', 'September'], rest: '', files: [['Trip.mov', 'Video · Sep 20', 200], ['Wedding-highlights.mov', 'Video · Sep 6', 330], ['Drone-footage.mp4', 'Video · Sep 2', 150]] },
  { q: 'wifi password screenshot', tokens: ['Screenshots'], rest: 'wifi password', files: [['IMG_2048.png', 'Text in image: “WiFi password: lemon-tree-42”', 260]] },
  { q: 'pdfs from mail this month', tokens: ['PDFs', 'From: Mail', 'This month'], rest: '', files: [['Invoice 0412.pdf', 'PDF · From Mail · Oct 2'], ['Lease agreement.pdf', 'PDF · From Mail · Oct 9'], ['Offer letter.pdf', 'PDF · From Mail · Oct 14']] },
  { q: 'zips in downloads older than a year', tokens: ['Archives', 'In Downloads', 'Over 1 year'], rest: '', files: [['fonts-pack.zip', 'ZIP · 312 MB · 2 years'], ['project-backup-old.zip', 'ZIP · 1.1 GB · 14 months']] },
];
export function heroTryMarkup() {
  return `<span class="hero-try-label">Try</span>${TRY.map((t, i) => `<button type="button" class="hero-try-chip" data-i="${i}" aria-pressed="false">“${t.q}”</button>`).join('')}<button type="button" class="hero-try-chip" data-i="home" aria-pressed="true">Home</button><span class="visually-hidden" role="status" id="hero-try-status"></span>`;
}
export function bindHeroTry(row, win) {
  const content = win.querySelector('.hw-content'), q = win.querySelector('.hw-q'), home = content.innerHTML, placeholder = q.innerHTML;
  row.addEventListener('click', (e) => {
    const b = e.target.closest('.hero-try-chip'); if (!b) return;
    row.querySelectorAll('.hero-try-chip').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    if (b.dataset.i === 'home') { content.innerHTML = home; q.innerHTML = placeholder; row.querySelector('#hero-try-status').textContent = 'Showing Home'; return; }
    const t = TRY[+b.dataset.i];
    q.innerHTML = t.tokens.map((k) => `<i class="hw-tok">${k}</i>`).join('') + (t.rest ? ` ${t.rest}` : '');
    content.innerHTML = `<div class="hw-results">${t.files.map(([n, meta, h]) => `<figure>${h === undefined ? `<span class="hw-doc">${svg(G.doc, 26)}</span>` : `<span class="ph" style="--h:${h}"></span>`}<figcaption><b>${n}</b><small>${meta}</small></figcaption></figure>`).join('')}</div><p class="hw-status"><span><b>${t.files.length} result${t.files.length === 1 ? '' : 's'}</b> · Understood as filters</span><span>On your Mac</span></p>`;
    row.querySelector('#hero-try-status').textContent = `Showing ${t.files.length} sample results for ${t.q}`;
  });
}
