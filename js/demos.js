// Interactive, illustrative demos for each feature, keyed by feature id.
// Each demo renders into its pane element and may return a cleanup function.
// All file names and numbers are fictional sample data.

import { homeMarkup, bindHome } from './home.js';

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const ph = (h, extra = '') => `<span class="ph" style="--h:${h}" ${extra}></span>`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const svg = (inner, size = 16) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ICON = {
  doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  app: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><path d="M9 15l3-7 3 7M10 13h4"/>',
  zip: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M11 5h2M11 8h2M11 11h2M10.5 14h3v3h-3z"/>',
  dmg: '<ellipse cx="12" cy="7" rx="7" ry="3"/><path d="M5 7v10c0 1.7 3.1 3 7 3s7-1.3 7-3V7"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  folder: '<path d="M3 7.5V18a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9.5a2 2 0 0 0-2-2h-7L10 5H5a2 2 0 0 0-2 2.5Z"/>',
  pin: '<path d="M12 17v5M8 3h8l-1 6 3 4H6l3-4z"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
  rotate: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4h4"/>',
  zoom: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8M10.5 8v5M8 10.5h5"/>',
};

function bindAll(el, sel, evt, fn) { el.querySelectorAll(sel).forEach((n) => n.addEventListener(evt, fn)); }

/* ---------------- Home ---------------- */
function home(el, _param, { go }) {
  el.innerHTML = homeMarkup();
  bindHome(el, go);
}

/* ---------------- Visual Library ---------------- */
const LIB = [
  ['Images', 'Beach-sunset.heic', 'Pictures', 200], ['Videos', 'Birthday-party.mov', 'Movies', 330], ['Documents', 'Lease-agreement.pdf', 'Documents'],
  ['Screenshots', 'Screenshot 2026-03-14.png', 'Desktop', 220], ['Music', 'Morning-playlist.m4a', 'Music'], ['Apps', 'Pages.app', 'Downloads'],
  ['Images', 'Mountain-trail.jpg', 'Pictures', 120], ['Archives', 'fonts-pack.zip', 'Downloads'], ['Videos', 'Product-demo.mp4', 'Downloads', 10],
  ['Images', 'Coffee-shop.webp', 'Downloads', 30], ['Screenshots', 'Error-dialog.png', 'Desktop', 260], ['Documents', 'Resume-2026.docx', 'Documents'],
  ['Music', 'Podcast-ep42.mp3', 'Downloads'], ['Images', 'City-lights.png', 'Pictures', 280], ['Archives', 'project-backup.zip', 'Documents'],
  ['Documents', 'Tax-return-2025.pdf', 'Downloads'], ['Videos', 'Drone-flight.mov', 'Movies', 150], ['Apps', 'Keynote.app', 'Desktop'],
];
function library(el, param) {
  const kinds = ['All', 'Images', 'Videos', 'Music', 'Documents', 'Archives', 'Apps', 'Screenshots'];
  const icon = { Documents: ICON.doc, Music: ICON.music, Apps: ICON.app, Archives: ICON.zip };
  let kind = kinds.includes(param?.kind) ? param.kind : 'All';
  let loc = param?.loc || null;
  el.innerHTML = `
    <div class="d-seg" role="group" aria-label="Filter by kind">${kinds.map((k) => `<button type="button" data-k="${k}">${k}</button>`).join('')}</div>
    <p class="d-locchip" hidden><span></span> <button type="button" class="d-locclear" aria-label="Show all locations">×</button></p>
    <div class="d-lib">${LIB.map(([k, n, l, h]) => `
      <figure data-k="${k}" data-loc="${l}">
        ${h !== undefined ? `<span class="ph" style="--h:${h}">${k === 'Videos' ? `<em class="d-play">${svg(ICON.play, 14)}</em>` : ''}</span>` : `<span class="d-file-thumb d-k-${k.toLowerCase()}">${svg(icon[k], 30)}</span>`}
        <figcaption>${esc(n)}</figcaption>
      </figure>`).join('')}</div>
    <p class="d-muted d-libempty" hidden>Nothing of this kind here</p>`;
  const draw = () => {
    el.querySelectorAll('.d-seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === kind)));
    let shown = 0;
    el.querySelectorAll('.d-lib figure').forEach((f) => {
      f.hidden = (kind !== 'All' && f.dataset.k !== kind) || (loc && f.dataset.loc !== loc);
      if (!f.hidden) shown++;
    });
    el.querySelector('.d-libempty').hidden = shown > 0;
    const chip = el.querySelector('.d-locchip');
    chip.hidden = !loc;
    chip.querySelector('span').textContent = loc ? `In ${loc}` : '';
  };
  bindAll(el, '.d-seg button', 'click', (e) => { kind = e.currentTarget.dataset.k; draw(); });
  el.querySelector('.d-locclear').addEventListener('click', () => { loc = null; draw(); });
  draw();
}

/* ---------------- Smart Image Viewer ---------------- */
function images(el) {
  const TOTAL = 120;
  let i = 15, rot = 0, actual = false;
  const hue = (n) => (n * 47) % 360;
  const name = (n) => `IMG_${String(n).padStart(4, '0')}.HEIC`;
  el.innerHTML = `
    <div class="iv">
      <div class="iv-bar">
        <span class="iv-name"></span>
        <span class="iv-count" aria-live="polite"></span>
        <span class="iv-tools">
          <button type="button" data-a="prev" aria-label="Previous image">‹</button>
          <button type="button" data-a="next" aria-label="Next image">›</button>
          <button type="button" data-a="zoom" aria-label="Toggle actual size">${svg(ICON.zoom)}</button>
          <button type="button" data-a="rot" aria-label="Rotate">${svg(ICON.rotate)}</button>
        </span>
      </div>
      <div class="iv-stage" tabindex="0" role="img" aria-label="Image viewer. Use left and right arrow keys to browse."><span class="ph iv-photo"></span><p class="iv-hint">Click here, then press ← →</p></div>
      <div class="iv-strip" role="group" aria-label="Filmstrip"></div>
      <p class="iv-meta"></p>
    </div>`;
  const stage = el.querySelector('.iv-stage');
  const photo = el.querySelector('.iv-photo');
  const draw = () => {
    photo.style.setProperty('--h', hue(i));
    photo.style.transform = `rotate(${rot}deg) scale(${actual ? 1.6 : 1})`;
    el.querySelector('.iv-name').textContent = name(i);
    el.querySelector('.iv-count').textContent = `${i} of ${TOTAL}`;
    el.querySelector('.iv-meta').textContent = `4032 × 3024 · HEIC · ${(2.1 + (i % 7) * 0.3).toFixed(1)} MB · Vacation 2026 folder`;
    const from = Math.max(1, Math.min(i - 4, TOTAL - 8));
    el.querySelector('.iv-strip').innerHTML = Array.from({ length: 9 }, (_, k) => from + k)
      .map((n) => `<button type="button" class="ph${n === i ? ' on' : ''}" style="--h:${hue(n)}" data-n="${n}" aria-label="${name(n)}"${n === i ? ' aria-current="true"' : ''}></button>`).join('');
  };
  const go = (d) => { i = Math.min(TOTAL, Math.max(1, i + d)); draw(); };
  stage.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });
  stage.addEventListener('click', () => stage.focus());
  el.querySelector('.iv-strip').addEventListener('click', (e) => { const b = e.target.closest('[data-n]'); if (b) { i = +b.dataset.n; draw(); } });
  bindAll(el, '[data-a]', 'click', (e) => {
    const a = e.currentTarget.dataset.a;
    if (a === 'prev') go(-1); else if (a === 'next') go(1);
    else if (a === 'rot') { rot = (rot + 90) % 360; draw(); }
    else { actual = !actual; draw(); }
  });
  draw();
}

/* ---------------- Search (names, meaning, text in images) ---------------- */
const QUERIES = [
  {
    q: 'Screenshots containing login errors from last month', tokens: ['Screenshots', 'Last month'], rest: 'login errors',
    results: [['Screenshot 2026-09-18 at 10.42.png', '~/Desktop', '…<mark>Login</mark> failed: invalid token <mark>error</mark> 401…', 'text', 'Screenshot · Sep 18', 260], ['IMG_3310.png', '~/Downloads', 'A sign-in window showing an error message', 'meaning', 'Screenshot · Sep 2', 220]],
  },
  {
    q: 'Videos larger than 1 GB', tokens: ['Videos', 'Over 1 GB'], rest: '',
    results: [['Wedding-highlights.mov', '~/Movies', '4.8 GB · modified Jan 2025', 'meaning', 'Video · 12:40', 330], ['Screen-recording-final.mp4', '~/Desktop', '1.3 GB · modified Aug 2026', 'meaning', 'Video · 4:05', 200]],
  },
  {
    q: 'PDFs mentioning my university', tokens: ['PDFs'], rest: 'my university',
    results: [['Transcript-official.pdf', '~/Documents/School', '…Office of the Registrar, <mark>University</mark> of…', 'meaning', 'PDF · Mar 2026'], ['University-letter.pdf', '~/Downloads', 'Name contains <mark>University</mark>', 'name', 'PDF · Jun 2026']],
  },
  {
    q: 'Old ZIP files in Downloads', tokens: ['Archives', 'In Downloads', 'Over 1 year old'], rest: '',
    results: [['fonts-pack.zip', '~/Downloads', 'Not modified for 2 years · 312 MB', 'meaning', 'ZIP · 2024'], ['project-backup-old.zip', '~/Downloads', 'Not modified for 14 months · 1.1 GB', 'name', 'ZIP · 2025']],
  },
  {
    q: 'connection timed out', tokens: [], rest: 'connection timed out',
    results: [['IMG_2048.png', '~/Desktop', 'Error: <mark>connection timed out</mark> after 30000ms', 'text', 'Screenshot · Oct 1', 160]],
  },
];
// Why a result matched: one search covers names, meaning (AI) and text inside images.
const WHY = { name: 'Matched by name', meaning: 'Matched by meaning', text: 'Text in image' };
// The AI's reading of a query is shown as removable tokens in the field, with any leftover
// words after them, and a status bar under the results.
function search(el) {
  let idx = 0, timer = null, removed = 0;
  el.innerHTML = `
    <div class="d-search">
      <div class="d-search-top">
        <div class="d-searchbox d-tokenbox">${svg('<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/>')}<span class="visually-hidden">Example search</span><span class="d-tokens" role="group" aria-label="Filters the search understood"></span><output class="d-q"></output></div>
        <button type="button" class="d-cycle" aria-pressed="false">Pause examples</button>
      </div>
      <div class="d-chips" role="group" aria-label="Try an example">${QUERIES.map((x, i) => `<button type="button" data-i="${i}">${esc(x.q)}</button>`).join('')}</div>
      <p class="d-label">Matching files</p>
      <ul class="d-results"></ul>
      <p class="d-statusbar"><span class="d-sb-count"></span><span>${svg('<rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>', 12)} On your Mac</span></p>
      <span class="d-copied" role="status"></span>
    </div>`;
  const count = () => {
    const n = QUERIES[idx].results.length;
    el.querySelector('.d-sb-count').innerHTML = `<b>${n} result${n === 1 ? '' : 's'}</b> · ${removed ? `${removed} filter${removed === 1 ? '' : 's'} removed: the app widens the search as you do` : QUERIES[idx].tokens.length ? 'Understood as filters' : 'Matched by text'}`;
  };
  const draw = () => {
    const x = QUERIES[idx];
    removed = 0;
    el.querySelector('.d-q').textContent = x.rest;
    el.querySelectorAll('.d-chips button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === idx)));
    el.querySelector('.d-tokens').innerHTML = x.tokens.map((t) => `<button type="button" class="d-token" aria-label="Remove filter: ${esc(t)}">${esc(t)}<span aria-hidden="true">×</span></button>`).join('');
    el.querySelector('.d-results').innerHTML = x.results.map(([n, p, s, why, meta, h]) => `
      <li><span class="d-thumb${h === undefined ? ' d-thumb-file' : ' ph'}" ${h === undefined ? '' : `style="--h:${h}"`}>${h === undefined ? svg(ICON.doc, 20) : ''}<em>${esc(meta)}</em></span><div><b>${esc(n)}</b><small>${esc(p)}</small><span class="d-why">${WHY[why]}</span><p class="d-snip">${s}${why === 'text' ? ` <button type="button" class="btn btn-small d-copy" data-text="${esc(s.replace(/<[^>]+>/g, ''))}">${svg(ICON.copy, 13)} Copy Text</button>` : ''}</p></div></li>`).join('');
    count();
  };
  // Auto-cycles through examples only while visible, not paused, and not focused/hovered.
  const cycleBtn = el.querySelector('.d-cycle');
  let paused = reduceMotion(), visible = true, engaged = false;
  const tick = () => { idx = (idx + 1) % QUERIES.length; draw(); };
  const update = () => {
    const run = !paused && visible && !engaged;
    if (run && !timer) timer = setInterval(tick, 4500);
    if (!run && timer) { clearInterval(timer); timer = null; }
    cycleBtn.setAttribute('aria-pressed', String(paused));
    cycleBtn.textContent = paused ? 'Play examples' : 'Pause examples';
  };
  const setPaused = (v) => { paused = v; update(); };
  cycleBtn.addEventListener('click', () => setPaused(!paused));
  el.addEventListener('click', async (e) => {
    const tok = e.target.closest('.d-token');
    if (tok) { setPaused(true); tok.remove(); removed++; count(); el.querySelector('.d-cycle').focus(); return; }
    const b = e.target.closest('.d-copy'); if (!b) return;
    setPaused(true);
    const status = el.querySelector('.d-copied');
    try { await navigator.clipboard.writeText(b.dataset.text); status.textContent = 'Recognized text copied'; }
    catch { status.textContent = 'Copy is unavailable in this browser'; }
  });
  bindAll(el, '.d-chips button', 'click', (e) => { idx = +e.currentTarget.dataset.i; draw(); setPaused(true); });
  const engage = (v) => () => { engaged = v; update(); };
  el.addEventListener('focusin', engage(true));
  el.addEventListener('focusout', engage(false));
  el.addEventListener('mouseenter', engage(true));
  el.addEventListener('mouseleave', engage(false));
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(([e]) => { visible = e.isIntersecting; update(); }) : null;
  if (io) io.observe(el);
  draw();
  update();
  return () => { clearInterval(timer); timer = null; if (io) io.disconnect(); };
}

/* ---------------- Storage ---------------- */
const OLD = [
  ['Final-Cut-Library-2023.fcpbundle', 'Videos', '24.6 GB', 34, 'Not modified for 2 years 10 months'],
  ['macOS-Installer-old.dmg', 'Installers', '12.9 GB', 26, 'Not modified for 2 years 2 months'],
  ['Photos-backup-2024.zip', 'Archives', '8.3 GB', 18, 'Not modified for 18 months'],
  ['Conference-talk.mov', 'Videos', '3.1 GB', 13, 'Not modified for 13 months'],
  ['Thesis-drafts', 'Folder', '1.4 GB', 8, 'Not modified for 8 months'],
  ['Zoom-recording.mp4', 'Videos', '920 MB', 4, 'Not modified for 4 months'],
];
/* ---------------- Clean Up (storage overview + review + Trash) ---------------- */
const GB = (n) => (n >= 1 ? n.toFixed(1) + ' GB' : Math.round(n * 1000) + ' MB');
const CLEAN_CARDS = [
  ['Old files', 'Not changed in a year or more', OLD.slice(0, 4).map(([n, , s, , why]) => [n, parseFloat(s), why])],
  ['Old installers', '.dmg and .pkg you already installed', [['Xcode_15.xip', 2.6, 'Installed · downloaded 8 months ago'], ['Slack.dmg', 0.14, 'Installed · downloaded 5 months ago'], ['Figma.dmg', 0.31, 'Installed · downloaded 3 months ago'], ['Zoom.pkg', 0.086, 'Installed · downloaded 4 months ago']]],
  ['Big old videos', 'Over 1 GB, not opened in a year', [['Wedding-raw.mov', 3.2, 'Not modified for 2 years'], ['Drone-footage.mp4', 1.3, 'Not modified for 14 months']]],
  ['Old screenshots', 'On your Desktop, older than 3 months', [['480 screenshots on the Desktop', 0.321, 'Oldest from March 2025']]],
  ['Apps you don’t open', 'Not opened in 6 months', [['GarageBand.app', 1.6, 'Last opened 9 months ago'], ['Keynote.app', 0.8, 'Last opened 7 months ago']]],
  ['Large files', 'Single files over 500 MB', [['Photos-library-export.zip', 1.4, 'Over 1 GB'], ['Keynote-deck-final.key', 0.82, 'Over 500 MB']]],
];
function cleanup(el) {
  const cats = [['Images', 'img', 98], ['Videos', 'vid', 74], ['Audio', 'aud', 12], ['Documents', 'doc', 41], ['Archives', 'arc', 33], ['Installers', 'dmg', 29], ['Developer', 'dev', 22], ['Other', 'oth', 32]];
  const overview = () => {
    el.innerHTML = `
      <div class="d-storage">
        <div class="d-vol"><b>Macintosh HD</b><span>341 GB used · 171 GB available · 512 GB</span></div>
        <div class="d-bar" role="img" aria-label="Storage by category">${cats.map(([n, c, g]) => `<span title="${n} ${g} GB" style="flex:${g};background:var(--c-${c})"></span>`).join('')}<span style="flex:171" class="d-free"></span></div>
        <ul class="d-legend d-legend-row">${cats.map(([n, c, g]) => `<li><i style="background:var(--c-${c})"></i>${n}<span>${g} GB</span></li>`).join('')}</ul>
        <div class="d-ccats">${CLEAN_CARDS.map(([t, sub, items], i) => `<div class="d-ccat"><span>${esc(t)}</span><b>${GB(items.reduce((a, x) => a + x[1], 0))}</b><small>${esc(sub)}</small><button type="button" class="btn btn-small btn-ghost" data-review="${i}">Review</button></div>`).join('')}</div>
        <p class="d-foot">Files that only live in iCloud are skipped, so nothing gets downloaded.</p>
      </div>`;
    bindAll(el, '[data-review]', 'click', (e) => review(+e.currentTarget.dataset.review));
  };
  const review = (ci) => {
    const [title, , items] = CLEAN_CARDS[ci];
    el.innerHTML = `
      <div class="d-clean">
        <div class="d-row-head"><p class="d-label">${esc(title)}</p><button type="button" class="btn btn-small btn-ghost d-back">‹ Clean Up</button></div>
        <ul class="d-checks">${items.map(([n, g, why]) => `<li><label><input type="checkbox" data-g="${g}" checked> <span>${esc(n)}<small>${esc(why)}</small></span><em>${GB(g)}</em></label></li>`).join('')}</ul>
        <div class="d-clean-foot"><span class="d-total" aria-live="polite"></span><button type="button" class="btn btn-small d-trash">Move to Trash…</button></div>
        <div class="d-confirm" hidden role="alertdialog" aria-label="Confirm move to Trash">
          <p><b>Move <span class="n"></span> to Trash?</b> You can put them back from the Trash any time.</p>
          <div><button type="button" class="btn btn-small btn-ghost d-cancel">Cancel</button><button type="button" class="btn btn-small d-ok-btn">Move to Trash</button></div>
        </div>
      </div>`;
    const total = () => {
      const c = [...el.querySelectorAll('input:checked')];
      el.querySelector('.d-total').textContent = `${c.length} item${c.length === 1 ? '' : 's'} · ${GB(c.reduce((a, x) => a + +x.dataset.g, 0))} selected`;
      el.querySelector('.d-trash').disabled = c.length === 0;
      return c.length;
    };
    bindAll(el, 'input', 'change', total);
    el.querySelector('.d-back').addEventListener('click', overview);
    el.querySelector('.d-trash').addEventListener('click', () => {
      const n = total();
      el.querySelector('.d-confirm .n').textContent = `${n} item${n === 1 ? '' : 's'}`;
      el.querySelector('.d-confirm').hidden = false;
      el.querySelector('.d-cancel').focus();
    });
    el.querySelector('.d-cancel').addEventListener('click', () => { el.querySelector('.d-confirm').hidden = true; });
    el.querySelector('.d-ok-btn').addEventListener('click', () => {
      const n = total();
      el.querySelector('.d-clean').innerHTML = `
        <div class="d-report" role="status">
          <span class="d-report-icon">${svg(ICON.check, 22)}</span>
          <p><b>${n} item${n === 1 ? '' : 's'} moved to Trash.</b></p>
          <p>Added to cleanup history. Nothing was permanently deleted, and ⌘Z puts it back.</p>
          <p class="d-offer">Want this to happen on its own? <b>Automatic clean up</b> can tidy old installers and screenshots. It is off until you turn it on.</p>
          <button type="button" class="btn btn-small btn-ghost d-again">Back to Clean Up</button>
        </div>`;
      el.querySelector('.d-again').addEventListener('click', overview);
    });
    total();
  };
  overview();
}

/* ---------------- Recents ---------------- */
const RECENT_DAYS = [
  ['Today', [['Trip.mov', 'Video · 0:42', 200], ['Invoice 0412.pdf', 'PDF · 188 KB'], ['Screenshot 9.41.png', 'Screenshot', 260], ['Brief.pdf', 'PDF · 2.4 MB']]],
  ['Yesterday', [['Sunset.heic', 'Photo', 30], ['Mix.m4a', 'Audio · 3:12'], ['Lease agreement.pdf', 'PDF · 640 KB']]],
  ['Earlier this week', [['Backup.zip', 'ZIP · 1.4 GB'], ['Team photo.jpg', 'Photo', 120]]],
];
function recents(el) {
  const all = RECENT_DAYS.flatMap(([, f]) => f);
  let open = -1;
  el.innerHTML = `
    <div class="d-rec">
      <div class="d-row-head"><p class="d-label">Newest first</p><div class="d-seg d-seg-sm" role="group" aria-label="View"><button type="button" data-v="grid" aria-pressed="true">Grid ⌘1</button><button type="button" data-v="list" aria-pressed="false">List ⌘2</button></div></div>
      ${RECENT_DAYS.map(([day, files]) => `<p class="d-day">${day}</p><div class="d-rec-grid">${files.map((f) => { const i = all.indexOf(f); return `<button type="button" class="d-rec-file" data-i="${i}" aria-label="${esc(f[0])}, ${esc(f[1])}. Press Space for Quick Look">${f[2] === undefined ? `<span class="d-rec-art">${svg(ICON.doc, 22)}</span>` : `<span class="d-rec-art ph" style="--h:${f[2]}"></span>`}<b>${esc(f[0])}</b><small>${esc(f[1])}</small></button>`; }).join('')}</div>`).join('')}
      <p class="d-foot">Click or press Space for Quick Look · ← → next file · right-click for more</p>
      <div class="d-ql" hidden role="dialog" aria-label="Quick Look"><div class="d-ql-bar"><b></b><span><button type="button" class="btn btn-small btn-ghost" data-step="-1" aria-label="Previous file">←</button><button type="button" class="btn btn-small btn-ghost" data-step="1" aria-label="Next file">→</button><button type="button" class="btn btn-small btn-ghost d-ql-x">Close</button></span></div><div class="d-ql-art"></div></div>
      <ul class="d-ctx" hidden role="menu">${[['Open', '⌘O'], ['Quick Look', 'Space'], ['Show in Finder', '⌥⌘R'], ['Copy Path', '⌥⌘C'], ['Move to Trash', '⌘⌫']].map(([t, k]) => `<li role="menuitem" tabindex="-1">${t}<kbd>${k}</kbd></li>`).join('')}</ul>
      <p class="d-status" role="status"></p>
    </div>`;
  const ql = el.querySelector('.d-ql'), ctx = el.querySelector('.d-ctx');
  const show = (i) => {
    open = (i + all.length) % all.length; const f = all[open];
    ql.querySelector('b').textContent = f[0];
    ql.querySelector('.d-ql-art').innerHTML = f[2] === undefined ? `<span class="d-rec-art">${svg(ICON.doc, 48)}</span>` : `<span class="d-rec-art ph" style="--h:${f[2]}"></span>`;
    ql.hidden = false; ql.querySelector('.d-ql-x').focus();
  };
  const close = () => { ql.hidden = true; const b = el.querySelector(`.d-rec-file[data-i="${open}"]`); open = -1; if (b) b.focus(); };
  bindAll(el, '.d-rec-file', 'click', (e) => show(+e.currentTarget.dataset.i));
  bindAll(el, '[data-step]', 'click', (e) => show(open + +e.currentTarget.dataset.step));
  el.querySelector('.d-ql-x').addEventListener('click', close);
  el.addEventListener('keydown', (e) => {
    if (!ql.hidden) {
      if (e.key === 'Escape' || e.key === ' ') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); e.stopPropagation(); show(open + (e.key === 'ArrowRight' ? 1 : -1)); }
      return;
    }
    const f = e.target.closest('.d-rec-file');
    if (f && e.key === ' ') { e.preventDefault(); show(+f.dataset.i); }
    if (e.key === 'Escape') ctx.hidden = true;
  });
  el.addEventListener('contextmenu', (e) => {
    const f = e.target.closest('.d-rec-file'); if (!f) return;
    e.preventDefault();
    const r = el.querySelector('.d-rec').getBoundingClientRect();
    ctx.style.left = `${Math.min(e.clientX - r.left, r.width - 200)}px`; ctx.style.top = `${e.clientY - r.top}px`;
    ctx.dataset.i = f.dataset.i; ctx.hidden = false; ctx.querySelector('li').focus();
  });
  ctx.addEventListener('click', (e) => {
    const li = e.target.closest('li'); if (!li) return;
    ctx.hidden = true;
    el.querySelector('.d-status').textContent = `In the app, “${li.firstChild.textContent}” would act on ${all[+ctx.dataset.i][0]}. This preview never touches your files.`;
  });
  document.addEventListener('click', (e) => { if (!ctx.contains(e.target)) ctx.hidden = true; });
  bindAll(el, '[data-v]', 'click', (e) => {
    const v = e.currentTarget.dataset.v;
    el.querySelectorAll('[data-v]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
    el.querySelector('.d-rec').classList.toggle('is-list', v === 'list');
  });
}

/* ---------------- Downloaded From ---------------- */
const SOURCES = [['Safari', '#3a8dff', 131, '1.0 GB'], ['Mail', '#5b7cfa', 104, '120 MB'], ['Slack', '#a46bf5', 79, '103 MB'], ['ChatGPT', '#16a07a', 63, '98 MB'], ['WhatsApp', '#3fb985', 37, '212 MB'], ['AirDrop', '#3aa7d9', 22, '3.1 GB']];
const FROM_MAIL = [['Invoice 0412.pdf', 'billing@acme.com', 'Oct 2'], ['Lease agreement.pdf', 'landlord@homes.co', 'Oct 9'], ['Offer letter.pdf', 'people@studio.io', 'Oct 14'], ['Boarding pass.png', 'trips@skyline.air', 'Oct 18']];
function downloaded(el) {
  const sources = () => {
    el.innerHTML = `<div class="d-dl"><p class="d-label">913 files from 9 places · biggest first</p><div class="d-srcs">${SOURCES.map(([n, c, k, s]) => `<button type="button" class="d-src" data-src="${n}" style="--t:${c}"><span class="d-src-gl" aria-hidden="true">${n[0]}</span><span><b>${n}</b><small>${k} files · ${s}</small></span></button>`).join('')}</div></div>`;
    bindAll(el, '.d-src', 'click', (e) => files(e.currentTarget.dataset.src));
  };
  const files = (src) => {
    const list = src === 'Mail' ? FROM_MAIL : FROM_MAIL.slice(0, 2).map(([n, , d]) => [n, src, d]);
    el.innerHTML = `<div class="d-dl">
      <div class="d-searchbox d-tokenbox"><span class="d-tokens"><button type="button" class="d-token" aria-label="Remove filter: From ${src}">From: ${src}<span aria-hidden="true">×</span></button></span><output class="d-q">invoice, lease, letter…</output></div>
      <ul class="d-results">${list.map(([n, who, d]) => `<li><span class="d-res-icon">${svg(ICON.doc, 18)}</span><div><b>${esc(n)}</b><small>From ${esc(src)} · ${esc(who)} · ${d}</small></div></li>`).join('')}</ul>
      <p class="d-foot">A source is just a search with a “From” token. Remove it with × to see every source again.</p></div>`;
    el.querySelector('.d-token').addEventListener('click', sources);
  };
  sources();
}

/* ---------------- Smart Rename ---------------- */
function rename(el) {
  const rows = [['document (2).pdf', 'Lease agreement 2026.pdf'], ['IMG_8831.png', 'Flight SK 482 boarding pass.png'], ['scan0012.pdf', 'Electricity bill Sep 2026.pdf']];
  const review = () => {
    el.innerHTML = `<div class="d-ren">
      <p class="d-label">3 downloads with names that say nothing</p>
      <ul class="d-checks">${rows.map(([o, n], i) => `<li><label><input type="checkbox" data-i="${i}" checked> <span><s>${esc(o)}</s> → <b>${esc(n)}</b></span></label></li>`).join('')}</ul>
      <div class="d-clean-foot"><span class="d-total">Only unclear names are suggested. Names you typed are never touched.</span><button type="button" class="btn btn-small d-go">Rename 3 files</button></div></div>`;
    const btn = el.querySelector('.d-go');
    const count = () => { const n = el.querySelectorAll('input:checked').length; btn.textContent = `Rename ${n} file${n === 1 ? '' : 's'}`; btn.disabled = !n; };
    bindAll(el, 'input', 'change', count);
    btn.addEventListener('click', () => {
      const picked = [...el.querySelectorAll('input:checked')].map((x) => rows[+x.dataset.i]);
      el.innerHTML = `<div class="d-ren"><div class="d-report" role="status"><span class="d-report-icon">${svg(ICON.check, 22)}</span><p><b>Renamed ${picked.length} file${picked.length === 1 ? '' : 's'}.</b></p><ul class="d-renamed">${picked.map(([, n]) => `<li>${esc(n)}</li>`).join('')}</ul><button type="button" class="btn btn-small btn-ghost d-undo">Undo</button></div>
        <label class="d-auto"><span>Name new downloads automatically<small>Only unclear names. Every rename can be undone.</small></span><button type="button" class="d-switch" aria-pressed="false" aria-label="Name new downloads automatically"></button></label></div>`;
      el.querySelector('.d-undo').addEventListener('click', review);
      el.querySelector('.d-switch').addEventListener('click', (e) => e.currentTarget.setAttribute('aria-pressed', String(e.currentTarget.getAttribute('aria-pressed') !== 'true')));
    });
  };
  review();
}

/* ---------------- Duplicates ---------------- */
function duplicates(el) {
  // [name, size in MB, copies as [folder, file name]], thumbnail hue for photos
  const groups = [
    ['Zoom-installer.pkg', 86, [['Downloads', 'Zoom-installer.pkg'], ['Downloads', 'Zoom-installer (1).pkg'], ['Desktop', 'Zoom-installer copy.pkg']]],
    ['Family-photo.heic', 3.8, [['Pictures', 'Family-photo.heic'], ['Desktop', 'Family-photo copy.heic']], 200],
    ['Invoice-March.pdf', 2.4, [['Downloads', 'Invoice-March.pdf'], ['Documents/Bills', 'Invoice-March.pdf']]],
  ];
  const keep = groups.map(() => 0);   // the first copy is the suggested keep
  const mb = (n) => (n >= 10 ? Math.round(n) : n.toFixed(1)) + ' MB';
  el.innerHTML = `
    <div class="d-seg" role="group" aria-label="Duplicate type"><button type="button" aria-pressed="true" data-v="exact">Exact copies · 27</button><button type="button" aria-pressed="false" data-v="similar">Similar photos · 14</button></div>
    <div class="d-similar" hidden></div>
    <div class="d-dupes">
      <ol class="d-steps">
        <li><b>48,210</b><span>files scanned</span></li>
        <li><b>1,204</b><span>same size</span></li>
        <li><b>131</b><span>partial match</span></li>
        <li><b>27 groups</b><span>exact full-hash match</span></li>
      </ol>
      <div class="d-dsum"><span class="d-sum-free"><b></b><small>can be freed</small></span><span class="d-extra"><b></b><small>extra copies</small></span><button type="button" class="btn btn-small d-trash"></button></div>
      <p class="d-trashed" role="status"></p>
      ${groups.map(([n, size, copies, h], gi) => `
        <div class="d-cgroup" role="group" aria-label="${esc(n)}: choose the copy to keep"><p><b>${esc(n)}</b> · ${copies.length} copies · ${mb(size)} each</p>
          <div class="d-cards">${copies.map(([folder, file], i) => `<button type="button" class="d-ccard" data-g="${gi}" data-i="${i}" aria-pressed="${i === 0}">
            <span class="d-ccard-art${h === undefined ? '' : ' ph'}" ${h === undefined ? '' : `style="--h:${h + i * 4}"`}>${h === undefined ? svg(ICON.doc, 20) : ''}<em></em></span>
            <b>${esc(file)}</b><small>${esc(folder)} · ${mb(size)}</small></button>`).join('')}</div>
        </div>`).join('')}
      <p class="d-foot">Click a copy to keep it instead. Everything else goes to the Trash, so you can put it back.</p>
    </div>`;
  const total = () => {
    const extra = groups.reduce((t, g) => t + g[2].length - 1, 0);
    const freed = groups.reduce((t, g) => t + g[1] * (g[2].length - 1), 0);
    el.querySelector('.d-sum-free b').textContent = mb(freed);
    el.querySelector('.d-extra b').textContent = extra;
    el.querySelector('.d-trash').textContent = `Trash ${extra} copies`;
    el.querySelectorAll('.d-ccard').forEach((c) => {
      const kept = keep[+c.dataset.g] === +c.dataset.i;
      c.setAttribute('aria-pressed', String(kept));
      c.querySelector('em').textContent = kept ? '✓ Keep' : 'Trash';
    });
  };
  bindAll(el, '.d-ccard', 'click', (e) => { keep[+e.currentTarget.dataset.g] = +e.currentTarget.dataset.i; total(); });
  el.querySelector('.d-trash').addEventListener('click', () => {
    el.querySelector('.d-trashed').textContent = `In the app, ${el.querySelector('.d-extra b').textContent} copies would move to the Trash, with Undo. This preview never touches your files.`;
  });
  total();
  const sim = el.querySelector('.d-similar');
  bindAll(el, '.d-seg button', 'click', (e) => {
    const v = e.currentTarget.dataset.v;
    el.querySelectorAll('.d-seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === v)));
    if (v === 'similar' && !sim.firstChild) similar(sim);
    sim.hidden = v !== 'similar';
    el.querySelector('.d-dupes').hidden = v === 'similar';
  });
}

/* ---------------- Organizer ---------------- */
function organizer(el) {
  const groups = [['Documents', 64, 'doc'], ['Images', 48, 'img'], ['Archives', 31, 'arc'], ['Installers', 22, 'dmg'], ['Screenshots', 17, 'vid']];
  const moves = [
    ['Q3-report-final.pdf', 'Documents'], ['IMG_4471.jpeg', 'Images'], ['Screenshot 2026-10-02.png', 'Screenshots/2026-10'],
    ['fonts-pack.zip', 'Archives'], ['Figma-installer.dmg', 'Installers'], ['scan0012.pdf', 'Documents, renamed “Electricity-bill-Sep-2026.pdf”'],
  ];
  const TOTAL = 182, shown = moves.length;
  el.innerHTML = `
    <div class="d-org">
      <p class="d-org-sum"><b>Downloads</b>: 210 files found · <b>${TOTAL} proposed moves</b> · 28 left unchanged</p>
      <div class="d-org-bars">${groups.map(([n, c, k]) => `<div><span>${n}</span><i style="--w:${(c / 64) * 100}%;background:var(--c-${k})"></i><b>${c}</b></div>`).join('')}</div>
      <div class="d-moves-wrap" hidden>
        <div class="d-row-head"><p class="d-label">Choose what moves</p><span><button type="button" class="btn btn-small btn-ghost" data-all="1">Select all</button> <button type="button" class="btn btn-small btn-ghost" data-all="0">Select none</button></span></div>
        <ul class="d-checks d-moves-list">${moves.map(([f, d], i) => `<li><label><input type="checkbox" data-i="${i}" checked> <span>${esc(f)}<small>→ ${esc(d)}</small></span></label></li>`).join('')}<li class="d-muted">…and ${TOTAL - shown} more, all selected</li></ul>
      </div>
      <div class="d-clean-foot">
        <span class="d-total" role="status">Nothing moves until you approve.</span>
        <span><button type="button" class="btn btn-small btn-ghost d-review">Review moves</button> <button type="button" class="btn btn-small d-approve" disabled>Approve ${TOTAL} moves</button></span>
      </div>
    </div>`;
  const approve = el.querySelector('.d-approve');
  const picked = () => TOTAL - shown + el.querySelectorAll('.d-moves-list input:checked').length;
  const count = () => {
    const n = picked();
    approve.textContent = `Approve ${n} move${n === 1 ? '' : 's'}`;
    approve.disabled = n === 0;
    el.querySelector('.d-total').textContent = `${n} of ${TOTAL} selected. Untick any file to leave it where it is.`;
  };
  el.querySelector('.d-review').addEventListener('click', () => { el.querySelector('.d-moves-wrap').hidden = false; count(); });
  bindAll(el, '.d-moves-list input', 'change', count);
  bindAll(el, '[data-all]', 'click', (e) => { el.querySelectorAll('.d-moves-list input').forEach((x) => { x.checked = e.currentTarget.dataset.all === '1'; }); count(); });
  approve.addEventListener('click', () => {
    const n = picked();
    approve.disabled = true;
    el.querySelector('.d-total').textContent = `Done: ${n} files moved. Undo any of it from File Action History.`;
  });
}

/* ---------------- Clipboard History ---------------- */
function clipboard(el) {
  let paused = false;
  let items = [
    { t: 'Meeting at 3:30 in Room 4B', pin: true }, { t: 'https://example.com/tracking/1Z999', pin: false },
    { t: '[image] Screenshot 412 × 280', pin: false, img: 200 }, { t: 'npm install --save-dev vitest', pin: false },
    { t: 'Thanks so much — talk soon!', pin: true }, { t: '221B Baker Street, London', pin: false },
  ];
  el.innerHTML = `
    <div class="d-clip">
      <div class="d-clip-head">
        <label class="d-qs-input"><span class="visually-hidden">Search clipboard history</span>${svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>')}<input type="search" placeholder="Search history"></label>
        <button type="button" class="btn btn-small btn-ghost d-pause" aria-pressed="false">Pause</button>
        <button type="button" class="btn btn-small btn-ghost d-clear">Clear unpinned</button>
      </div>
      <p class="d-status" role="status">Recording · kept for 30 days · password fields are skipped</p>
      <ul class="d-clip-list"></ul>
    </div>`;
  const input = el.querySelector('input');
  const draw = () => {
    const q = input.value.trim().toLowerCase();
    const list = [...items.filter((x) => x.pin), ...items.filter((x) => !x.pin)].filter((x) => x.t.toLowerCase().includes(q));
    el.querySelector('.d-clip-list').innerHTML = list.length ? list.map((x) => `
      <li>${x.img !== undefined ? ph(x.img, 'aria-hidden="true"') : ''}<span>${esc(x.t)}</span>
        <button type="button" class="d-copyitem" aria-label="Copy ${esc(x.t)}" data-t="${esc(x.t)}">${svg(ICON.copy, 13)}<span>Copy</span></button>
        <button type="button" class="d-pin" aria-pressed="${x.pin}" aria-label="${x.pin ? 'Unpin' : 'Pin'} ${esc(x.t)}" data-t="${esc(x.t)}">${svg(ICON.pin, 14)}</button></li>`).join('') : '<li class="d-muted">Nothing here</li>';
  };
  input.addEventListener('input', draw);
  el.querySelector('.d-clip-list').addEventListener('click', async (e) => {
    const c = e.target.closest('.d-copyitem');
    if (c) {
      const status = el.querySelector('.d-status');
      try { await navigator.clipboard.writeText(c.dataset.t); status.textContent = `Copied “${c.dataset.t}”. Paste it anywhere with ⌘V.`; }
      catch { status.textContent = 'Copy is unavailable in this browser.'; }
      c.querySelector('span').textContent = 'Copied';
      setTimeout(() => { if (c.isConnected) c.querySelector('span').textContent = 'Copy'; }, 1500);
      return;
    }
    const b = e.target.closest('.d-pin'); if (!b) return;
    const it = items.find((x) => x.t === b.dataset.t); it.pin = !it.pin; draw();
  });
  el.querySelector('.d-pause').addEventListener('click', (e) => {
    paused = !paused; e.currentTarget.setAttribute('aria-pressed', String(paused)); e.currentTarget.textContent = paused ? 'Resume' : 'Pause';
    el.querySelector('.d-status').textContent = paused ? 'Paused · nothing new is recorded' : 'Recording · kept for 30 days · password fields are skipped';
  });
  el.querySelector('.d-clear').addEventListener('click', () => { items = items.filter((x) => x.pin); draw(); });
  draw();
}

/* ---------------- Similar photos (a tab inside Duplicates) ---------------- */
function similar(el) {
  const sets = [[200, 'Sunset at the pier'], [330, 'Birthday candles'], [120, 'Trail overlook']];
  el.innerHTML = `
    <div class="d-sim">
      ${sets.map(([h, n], gi) => `
        <div class="d-sim-group"><p><b>${n}</b> · 4 similar shots</p>
          <div class="d-sim-row">${[0, 1, 2, 3].map((k) => `<button type="button" class="ph${k === 1 ? ' best' : ''}" style="--h:${h + k * 6};filter:brightness(${1 - k * 0.06})" aria-label="${n} shot ${k + 1}${k === 1 ? ', suggested best' : ''}" data-g="${gi}" data-k="${k}">${k === 1 ? `<em>${svg(ICON.star, 12)} Best</em>` : ''}</button>`).join('')}</div>
        </div>`).join('')}
      <div class="d-compare" hidden><span class="ph"></span><span class="ph"></span><p>Side-by-side compare</p></div>
      <p class="d-foot">Similar is not identical, so nothing is selected for you: compare, then keep the best.</p>
    </div>`;
  bindAll(el, '.d-sim-row .ph', 'click', (e) => {
    const g = +e.currentTarget.dataset.g, k = +e.currentTarget.dataset.k, h = sets[g][0];
    const cmp = el.querySelector('.d-compare');
    const [l, r] = cmp.querySelectorAll('.ph');
    l.style.setProperty('--h', h + 6); r.style.setProperty('--h', h + k * 6);
    cmp.querySelector('p').textContent = `Comparing best shot with shot ${k + 1}`;
    cmp.hidden = false;
  });
}

export const DEMOS = {
  home, recents, library, images, search, downloaded, clipboard,
  cleanup, duplicates, organizer, rename,
};
