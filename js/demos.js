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
// words after them, and a status bar under the results (ideas adapted from Seek).
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
function storage(el) {
  const cats = [['Images', 'img', 98], ['Videos', 'vid', 74], ['Audio', 'aud', 12], ['Documents', 'doc', 41], ['Archives', 'arc', 33], ['Installers', 'dmg', 29], ['Developer', 'dev', 22], ['Other', 'oth', 32]];
  const ages = [['30 days', 1], ['90 days', 3], ['6 months', 6], ['1 year', 12], ['2 years', 24]];
  el.innerHTML = `
    <div class="d-storage">
      <div class="d-vol"><b>Macintosh HD</b><span>341 GB used · 171 GB available · 512 GB</span></div>
      <div class="d-bar" role="img" aria-label="Storage by category">${cats.map(([n, c, g]) => `<span title="${n} ${g} GB" style="flex:${g};background:var(--c-${c})"></span>`).join('')}<span style="flex:171" class="d-free"></span></div>
      <ul class="d-legend d-legend-row">${cats.map(([n, c, g]) => `<li><i style="background:var(--c-${c})"></i>${n}<span>${g} GB</span></li>`).join('')}</ul>
      <div class="d-row-head"><p class="d-label">Old-file review</p>
        <div class="d-seg d-seg-sm" role="group" aria-label="Older than">${ages.map(([l, m]) => `<button type="button" data-m="${m}" aria-pressed="${m === 12}">${l}</button>`).join('')}</div>
      </div>
      <ul class="d-files"></ul>
      <p class="d-foot">Based on modification date. Selected sizes may not equal recovered space (iCloud placeholders, APFS clones).</p>
    </div>`;
  const draw = (m) => {
    el.querySelector('.d-files').innerHTML = OLD.filter((f) => f[3] >= m).map(([n, k, s, , why]) =>
      `<li><span class="d-res-icon">${svg(k === 'Folder' ? ICON.folder : ICON.doc, 16)}</span><div><b>${esc(n)}</b><small>${k} · ${why}</small></div><em>${s}</em></li>`).join('');
  };
  bindAll(el, '[data-m]', 'click', (e) => {
    el.querySelectorAll('[data-m]').forEach((b) => b.setAttribute('aria-pressed', String(b === e.currentTarget)));
    draw(+e.currentTarget.dataset.m);
  });
  draw(12);
}

/* ---------------- Safe Cleanup ---------------- */
function cleanup(el) {
  const files = [['macOS-Installer-old.dmg', 12.9], ['Photos-backup-2024.zip', 8.3], ['Conference-talk.mov', 3.1], ['Xcode-cache-copy', 2.4]];
  const render = () => {
    el.innerHTML = `
      <div class="d-clean">
        <p class="d-label">Selected for review</p>
        <ul class="d-checks">${files.map(([n, g], i) => `<li><label><input type="checkbox" data-g="${g}" ${i < 3 ? 'checked' : ''}> <span>${esc(n)}</span><em>${g} GB</em></label></li>`).join('')}</ul>
        <div class="d-clean-foot"><span class="d-total" aria-live="polite"></span><button type="button" class="btn btn-small d-trash">Move to Trash…</button></div>
        <div class="d-confirm" hidden role="alertdialog" aria-label="Confirm move to Trash">
          <p><b>Move <span class="n"></span> to Trash?</b> You can put them back from the Trash any time.</p>
          <div><button type="button" class="btn btn-small btn-ghost d-cancel">Cancel</button><button type="button" class="btn btn-small d-ok-btn">Move to Trash</button></div>
        </div>
      </div>`;
    const total = () => {
      const c = [...el.querySelectorAll('input:checked')];
      const gb = c.reduce((a, x) => a + +x.dataset.g, 0);
      el.querySelector('.d-total').textContent = `${c.length} item${c.length === 1 ? '' : 's'} · ${gb.toFixed(1)} GB selected`;
      el.querySelector('.d-trash').disabled = c.length === 0;
      return c.length;
    };
    bindAll(el, 'input', 'change', total);
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
          <p>Added to cleanup history. Nothing was permanently deleted.</p>
          <button type="button" class="btn btn-small btn-ghost d-again">Reset demo</button>
        </div>`;
      el.querySelector('.d-again').addEventListener('click', render);
    });
    total();
  };
  render();
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
    ['Q3-report-final.pdf', 'Documents/'], ['IMG_4471.jpeg', 'Images/'], ['Screenshot 2026-10-02.png', 'Screenshots/2026-10/'],
    ['fonts-pack.zip', 'Archives/'], ['Figma-installer.dmg', 'Installers/'], ['scan0012.pdf', 'Documents/ → “Electricity-bill-Sep-2026.pdf”'],
  ];
  el.innerHTML = `
    <div class="d-org">
      <p class="d-org-sum"><b>Downloads</b> — 210 files found · <b>182 proposed moves</b> · 28 left unchanged</p>
      <div class="d-org-bars">${groups.map(([n, c, k]) => `<div><span>${n}</span><i style="--w:${(c / 64) * 100}%;background:var(--c-${k})"></i><b>${c}</b></div>`).join('')}</div>
      <ul class="d-moves" hidden>${moves.map(([f, d]) => `<li><span>${esc(f)}</span><em>→ ${esc(d)}</em></li>`).join('')}<li class="d-more">…and 176 more</li></ul>
      <div class="d-clean-foot">
        <span class="d-total" role="status">Nothing moves until you approve.</span>
        <span><button type="button" class="btn btn-small btn-ghost d-review">Review moves</button> <button type="button" class="btn btn-small d-approve" disabled>Approve 182 moves</button></span>
      </div>
    </div>`;
  const approve = el.querySelector('.d-approve');
  el.querySelector('.d-review').addEventListener('click', () => {
    el.querySelector('.d-moves').hidden = false;
    approve.disabled = false;
    el.querySelector('.d-total').textContent = 'Reviewed. Collisions are renamed, never overwritten.';
  });
  approve.addEventListener('click', () => {
    approve.disabled = true;
    el.querySelector('.d-total').textContent = 'Done — 182 files moved. Undo from File Action History.';
  });
}

/* ---------------- Quick Search & Command Panel ---------------- */
function quicksearch(el) {
  const files = ['Passport-scan.pdf', 'Project-plan.key', 'Invoice-March.pdf', 'Beach-sunset.heic', 'Budget-2026.numbers', 'Screenshot 2026-10-12.png', 'Lease-agreement.pdf'];
  const actions = ['Find old files', 'Review large downloads', 'Capture screenshot', 'Paste from clipboard history', 'Restore window layout'];
  el.innerHTML = `
    <div class="d-qs">
      <div class="d-qs-bg" aria-hidden="true"><span>Mail</span><span>Notes</span><span>Safari</span></div>
      <div class="d-qs-panel">
        <label class="d-qs-input">${svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>')}<span class="visually-hidden">Quick search</span><input type="text" placeholder="Search files and actions…" value="pdf"><kbd>⌥ Space</kbd></label>
        <p class="d-label">Files</p><ul class="d-qs-files"></ul>
        <p class="d-label">Actions</p><ul class="d-qs-actions"></ul>
      </div>
    </div>`;
  const input = el.querySelector('input');
  const draw = () => {
    const q = input.value.trim().toLowerCase();
    const f = files.filter((x) => x.toLowerCase().includes(q)).slice(0, 4);
    const a = actions.filter((x) => !q || x.toLowerCase().includes(q) || q.length < 2).slice(0, 3);
    el.querySelector('.d-qs-files').innerHTML = f.length ? f.map((x) => `<li>${svg(ICON.doc, 14)} ${esc(x)}<small>⏎ Open · ⌘R Reveal</small></li>`).join('') : '<li class="d-muted">No matching files</li>';
    el.querySelector('.d-qs-actions').innerHTML = (a.length ? a : actions.slice(0, 2)).map((x) => `<li>${esc(x)}</li>`).join('');
  };
  input.addEventListener('input', draw);
  draw();
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
        <button type="button" class="d-pin" aria-pressed="${x.pin}" aria-label="${x.pin ? 'Unpin' : 'Pin'} ${esc(x.t)}" data-t="${esc(x.t)}">${svg(ICON.pin, 14)}</button></li>`).join('') : '<li class="d-muted">Nothing here</li>';
  };
  input.addEventListener('input', draw);
  el.querySelector('.d-clip-list').addEventListener('click', (e) => {
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
      <p class="d-foot">Similar is not identical, so nothing is selected for you: compare, then keep the best. Coming in 2.0.</p>
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
  home, library, images, search, storage, cleanup, duplicates, organizer,
  quicksearch, clipboard,
};
