// Interactive, illustrative demos for each feature, keyed by feature id.
// Each demo renders into its pane element and may return a cleanup function.
// All file names and numbers are fictional sample data.

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
function home(el) {
  const cats = [['Images', 34, 'img'], ['Videos', 22, 'vid'], ['Documents', 14, 'doc'], ['Archives', 9, 'arc'], ['Other', 7, 'oth']];
  el.innerHTML = `
    <div class="d-dash">
      <div class="d-card d-ring-card">
        <div class="d-ring" style="--p:67"><div><b>341 GB</b><small>of 512 GB used</small></div></div>
        <ul class="d-legend">${cats.map(([n, w, c]) => `<li><i style="background:var(--c-${c})"></i>${n}<span>${w}%</span></li>`).join('')}</ul>
      </div>
      <div class="d-card">
        <p class="d-card-label">Suggestions</p>
        <ul class="d-list">
          <li><span>14 large files</span><b>38.2 GB</b></li>
          <li><span>312 files not modified in a year</span><b>21.7 GB</b></li>
          <li><span>27 exact duplicate groups</span><b>4.1 GB</b></li>
        </ul>
      </div>
      <div class="d-card">
        <p class="d-card-label">Status</p>
        <ul class="d-list">
          <li><span>Indexed</span><b>48,210 files · 6 folders</b></li>
          <li><span>Text in images</span><b class="d-progress"><i style="width:72%"></i>72%</b></li>
          <li><span>On-device AI</span><b class="d-ok">Available</b></li>
        </ul>
      </div>
      <div class="d-card d-actions">
        <p class="d-card-label">Quick actions</p>
        <div><button type="button" data-go="search">Search files</button><button type="button" data-go="storage">Review old files</button><button type="button" data-go="images">Browse screenshots</button><button type="button" data-go="duplicates">Find duplicates</button></div>
      </div>
    </div>`;
  bindAll(el, '[data-go]', 'click', (e) => { location.hash = '#explore/' + e.currentTarget.dataset.go; });
}

/* ---------------- Visual Library ---------------- */
const LIB = [
  ['Images', 'Beach-sunset.heic', 200], ['Videos', 'Birthday-party.mov', 330], ['Documents', 'Lease-agreement.pdf'],
  ['Screenshots', 'Screenshot 2026-03-14.png', 220], ['Music', 'Morning-playlist.m4a'], ['Apps', 'Pages.app'],
  ['Images', 'Mountain-trail.jpg', 120], ['Documents', 'Resume-2026.docx'], ['Videos', 'Product-demo.mp4', 10],
  ['Images', 'Coffee-shop.webp', 30], ['Screenshots', 'Error-dialog.png', 260], ['Apps', 'Keynote.app'],
  ['Music', 'Podcast-ep42.mp3'], ['Images', 'City-lights.png', 280], ['Documents', 'Tax-return-2025.pdf'], ['Screenshots', 'Receipt.png', 160],
];
function library(el) {
  const kinds = ['All', 'Images', 'Videos', 'Music', 'Documents', 'Apps', 'Screenshots'];
  const icon = { Documents: ICON.doc, Music: ICON.music, Apps: ICON.app };
  el.innerHTML = `
    <div class="d-seg" role="group" aria-label="Filter by kind">${kinds.map((k, i) => `<button type="button" aria-pressed="${i === 0}" data-k="${k}">${k}</button>`).join('')}</div>
    <div class="d-lib">${LIB.map(([k, n, h]) => `
      <figure data-k="${k}">
        ${h !== undefined ? `<span class="ph" style="--h:${h}">${k === 'Videos' ? `<em class="d-play">${svg(ICON.play, 14)}</em>` : ''}</span>` : `<span class="d-file-thumb d-k-${k.toLowerCase()}">${svg(icon[k], 30)}</span>`}
        <figcaption>${esc(n)}</figcaption>
      </figure>`).join('')}</div>`;
  bindAll(el, '[data-k]', 'click', (e) => {
    if (e.currentTarget.tagName !== 'BUTTON') return;
    const k = e.currentTarget.dataset.k;
    el.querySelectorAll('.d-seg button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
    el.querySelectorAll('.d-lib figure').forEach((f) => { f.hidden = k !== 'All' && f.dataset.k !== k; });
  });
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

/* ---------------- AI Search ---------------- */
const QUERIES = [
  {
    q: 'Screenshots containing login errors from last month',
    filters: [['Kind', 'Image'], ['Source', 'Screenshot'], ['Text', 'login, error'], ['Date', 'September 2026']],
    results: [['Screenshot 2026-09-18 at 10.42.png', '~/Desktop', '…<mark>Login</mark> failed: invalid token <mark>error</mark> 401…'], ['IMG_3310.png', '~/Downloads', '…<mark>Error</mark> signing in. Check your <mark>login</mark> details…']],
  },
  {
    q: 'Videos larger than 1 GB',
    filters: [['Kind', 'Video'], ['Size', '> 1 GB'], ['Sort', 'Largest first']],
    results: [['Wedding-highlights.mov', '~/Movies', '4.8 GB · modified Jan 2025'], ['Screen-recording-final.mp4', '~/Desktop', '1.3 GB · modified Aug 2026']],
  },
  {
    q: 'PDFs mentioning my university',
    filters: [['Kind', 'PDF'], ['Text', 'university'], ['Sort', 'Relevance']],
    results: [['Transcript-official.pdf', '~/Documents/School', '…Office of the Registrar, <mark>University</mark> of…'], ['Scholarship-letter.pdf', '~/Downloads', '…on behalf of the <mark>University</mark> scholarship board…']],
  },
  {
    q: 'Old ZIP files in Downloads',
    filters: [['Kind', 'Archive (ZIP)'], ['Folder', 'Downloads'], ['Modified', 'over 1 year ago']],
    results: [['fonts-pack.zip', '~/Downloads', 'Not modified for 2 years · 312 MB'], ['project-backup-old.zip', '~/Downloads', 'Not modified for 14 months · 1.1 GB']],
  },
];
function search(el) {
  let idx = 0, timer = null;
  el.innerHTML = `
    <div class="d-search">
      <label class="d-searchbox">${svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>')}<span class="visually-hidden">Example search</span><output class="d-q"></output></label>
      <div class="d-chips" role="group" aria-label="Try an example">${QUERIES.map((x, i) => `<button type="button" data-i="${i}">${esc(x.q)}</button>`).join('')}</div>
      <p class="d-label">Understood as</p>
      <div class="d-filters"></div>
      <p class="d-label">Real files from your index</p>
      <ul class="d-results"></ul>
    </div>`;
  const draw = () => {
    const x = QUERIES[idx];
    el.querySelector('.d-q').textContent = x.q;
    el.querySelectorAll('.d-chips button').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.i === idx)));
    el.querySelector('.d-filters').innerHTML = x.filters.map(([k, v]) => `<span class="d-filter"><b>${k}</b> ${esc(v)}</span>`).join('');
    el.querySelector('.d-results').innerHTML = x.results.map(([n, p, s]) => `
      <li><span class="d-res-icon">${svg(ICON.doc, 18)}</span><div><b>${esc(n)}</b><small>${esc(p)}</small><p>${s}</p></div></li>`).join('');
  };
  const stop = () => { clearInterval(timer); timer = null; };
  bindAll(el, '.d-chips button', 'click', (e) => { stop(); idx = +e.currentTarget.dataset.i; draw(); });
  draw();
  if (!reduceMotion()) timer = setInterval(() => { idx = (idx + 1) % QUERIES.length; draw(); }, 4500);
  return stop;
}

/* ---------------- Text in Images (OCR) ---------------- */
function ocr(el) {
  const lines = ['$ npm run deploy', '> build ok (2.3s)', '> uploading bundle…', 'Error: connection timed out after 30000ms', '    at Socket.timeout (net.js:412)', 'Retrying in 5s…'];
  el.innerHTML = `
    <div class="d-ocr">
      <div class="d-searchbox">${svg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>')}<output>connection timed out</output><span class="d-hits">1 match</span></div>
      <div class="d-ocr-file">
        <div class="d-shot">
          <div class="d-shot-bar"><i></i><i></i><i></i><span>Terminal</span></div>
          <pre>${lines.map((l) => esc(l).replace('connection timed out', '<mark>connection timed out</mark>')).join('\n')}</pre>
        </div>
        <div class="d-ocr-side">
          <b>IMG_2048.png</b>
          <small>~/Desktop · 1.2 MB · PNG</small>
          <p>The filename says nothing — the text inside the image found it.</p>
          <button type="button" class="btn btn-small d-copy">${svg(ICON.copy, 14)} Copy text</button>
          <span class="d-copied" role="status"></span>
        </div>
      </div>
    </div>`;
  el.querySelector('.d-copy').addEventListener('click', async () => {
    const status = el.querySelector('.d-copied');
    try { await navigator.clipboard.writeText(lines.join('\n')); status.textContent = 'Recognized text copied'; }
    catch { status.textContent = 'Copy is unavailable in this browser'; }
  });
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
  const groups = [
    ['Invoice-March.pdf', '2.4 MB', ['~/Downloads/Invoice-March.pdf', '~/Downloads/Invoice-March (1).pdf', '~/Documents/Bills/Invoice-March.pdf']],
    ['Family-photo.heic', '3.8 MB', ['~/Pictures/Family-photo.heic', '~/Desktop/Family-photo copy.heic']],
    ['Zoom-installer.pkg', '86 MB', ['~/Downloads/Zoom-installer.pkg', '~/Downloads/Zoom-installer (2).pkg']],
  ];
  el.innerHTML = `
    <div class="d-dupes">
      <ol class="d-steps">
        <li><b>48,210</b><span>files scanned</span></li>
        <li><b>1,204</b><span>same size</span></li>
        <li><b>131</b><span>partial match</span></li>
        <li><b>27 groups</b><span>exact full-hash match</span></li>
      </ol>
      ${groups.map(([n, s, copies], gi) => `
        <fieldset class="d-group"><legend>${svg(ICON.copy, 14)} ${esc(n)} <small>${copies.length} copies · ${s} each</small></legend>
          ${copies.map((p, i) => `<label><input type="checkbox" data-g="${gi}"> <span>${esc(p)}</span>${i === 0 ? '<em class="d-keep">Suggested keep</em>' : ''}</label>`).join('')}
        </fieldset>`).join('')}
      <div class="d-clean-foot"><button type="button" class="btn btn-small btn-ghost d-suggest">Select all but suggested</button><span class="d-total" aria-live="polite">Nothing selected</span></div>
    </div>`;
  const total = () => {
    const n = el.querySelectorAll('input:checked').length;
    el.querySelector('.d-total').textContent = n ? `${n} cop${n === 1 ? 'y' : 'ies'} selected for Trash` : 'Nothing selected';
  };
  bindAll(el, 'input', 'change', total);
  el.querySelector('.d-suggest').addEventListener('click', () => {
    el.querySelectorAll('.d-group').forEach((g) => g.querySelectorAll('input').forEach((c, i) => { c.checked = i > 0; }));
    total();
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

/* ---------------- Menu-bar Downloads ---------------- */
function downloads(el) {
  const items = [
    ['Boarding-pass.pdf', '210 KB', '2 min ago', null], ['Team-photo.jpg', '3.4 MB', '18 min ago', 30], ['Contract-v3.docx', '88 KB', '1 hr ago', null],
    ['Figma-installer.dmg', '214 MB', '3 hr ago', null], ['Logo-final.png', '640 KB', 'Yesterday', 250], ['Statement-Sep.pdf', '1.1 MB', 'Yesterday', null],
    ['Wallpaper.heic', '5.2 MB', 'Mon', 190], ['Slides.key', '12 MB', 'Mon', null], ['Notes.txt', '4 KB', 'Sun', null], ['Archive.zip', '48 MB', 'Sat', null],
  ];
  el.innerHTML = `
    <div class="d-mb">
      <div class="d-menubar"><span class="d-mb-left">Finder&nbsp;&nbsp; File&nbsp;&nbsp; Edit&nbsp;&nbsp; View</span><span class="d-mb-right"><button type="button" class="d-mb-icon" aria-expanded="true" aria-label="MacMate recent downloads">${svg(ICON.folder, 14)}</button><span>Tue 9:41</span></span></div>
      <div class="d-mb-menu">
        <p class="d-label">Recent Downloads</p>
        <ul>${items.map(([n, s, t, h]) => `<li draggable="true" data-name="${esc(n)}">${h !== null ? ph(h, 'aria-hidden="true"') : `<span class="d-mb-file">${svg(ICON.doc, 16)}</span>`}<span>${esc(n)}<small>${s} · ${t}</small></span></li>`).join('')}</ul>
        <p class="d-mb-tip">Drag any item into Mail, Messages or another app.</p>
      </div>
    </div>`;
  const btn = el.querySelector('.d-mb-icon');
  const menu = el.querySelector('.d-mb-menu');
  btn.addEventListener('click', () => { const open = btn.getAttribute('aria-expanded') !== 'true'; btn.setAttribute('aria-expanded', String(open)); menu.hidden = !open; });
  bindAll(el, 'li[draggable]', 'dragstart', (e) => e.dataTransfer.setData('text/plain', e.currentTarget.dataset.name));
}

/* ---------------- Finder Tools ---------------- */
function finder(el) {
  el.innerHTML = `
    <div class="d-finder">
      <ul class="d-finder-list">
        <li>${svg(ICON.folder, 16)} Projects</li>
        <li class="on">${svg(ICON.doc, 16)} Plan.md</li>
        <li>${svg(ICON.doc, 16)} Budget.numbers</li>
        <li>${svg(ICON.folder, 16)} Archive</li>
      </ul>
      <ul class="d-menu" role="menu" aria-label="MacMate actions for Plan.md">
        <li role="none"><button type="button" role="menuitem" data-t="Copied /Users/you/Documents/Plan.md">Copy Full Path</button></li>
        <li role="none"><button type="button" role="menuitem" data-t="Created “Untitled.txt” in Documents">New Text File</button></li>
        <li role="none"><button type="button" role="menuitem" data-t="Moved Plan.md to Favorites ▸ Work">Move to Favorite ▸ Work</button></li>
        <li role="none"><button type="button" role="menuitem" data-t="Copied Plan.md to Favorites ▸ Shared">Copy to Favorite ▸ Shared</button></li>
        <li role="none"><button type="button" role="menuitem" data-t="Opened Terminal at ~/Documents">Open Terminal Here</button></li>
        <li role="none"><button type="button" role="menuitem" data-t="Bookmarked ~/Documents">Bookmark This Folder</button></li>
      </ul>
      <p class="d-toast" role="status"></p>
    </div>`;
  bindAll(el, '[data-t]', 'click', (e) => { el.querySelector('.d-toast').textContent = '✓ ' + e.currentTarget.dataset.t; });
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

/* ---------------- Screenshot Toolkit ---------------- */
function screenshots(el) {
  el.innerHTML = `
    <div class="d-shotkit">
      <div class="d-seg d-seg-sm" role="group" aria-label="Capture">
        <button type="button" aria-pressed="true">Region</button><button type="button" aria-pressed="false">Window</button><button type="button" aria-pressed="false">Display</button>
      </div>
      <div class="d-canvas">
        <div class="d-receipt">
          <b>Order confirmed</b>
          <p>Payment successful — $48.20</p>
          <p class="d-sensitive">Card •••• 4242 · jane.doe@example.com</p>
          <span class="d-arrow" hidden></span><span class="d-note" hidden>Keep for taxes</span>
        </div>
      </div>
      <div class="d-tools" role="toolbar" aria-label="Annotate">
        <button type="button" data-tool="ocr">Copy text <span class="badge badge-soon">1.2</span></button>
        <button type="button" data-tool="blur">Blur <span class="badge badge-later">2.0</span></button>
        <button type="button" data-tool="arrow">Arrow <span class="badge badge-later">2.0</span></button>
        <button type="button" data-tool="text">Text <span class="badge badge-later">2.0</span></button>
      </div>
      <p class="d-toast" role="status"></p>
    </div>`;
  bindAll(el, '.d-seg button', 'click', (e) => el.querySelectorAll('.d-seg button').forEach((b) => b.setAttribute('aria-pressed', String(b === e.currentTarget))));
  bindAll(el, '[data-tool]', 'click', (e) => {
    const t = e.currentTarget.dataset.tool, toast = el.querySelector('.d-toast');
    if (t === 'blur') { el.querySelector('.d-sensitive').classList.toggle('blurred'); toast.textContent = 'Private details blurred'; }
    if (t === 'arrow') el.querySelector('.d-arrow').hidden = !el.querySelector('.d-arrow').hidden;
    if (t === 'text') el.querySelector('.d-note').hidden = !el.querySelector('.d-note').hidden;
    if (t === 'ocr') toast.textContent = 'Recognized: “Order confirmed · Payment successful — $48.20”';
  });
}

/* ---------------- Window Manager ---------------- */
function windows(el) {
  const layouts = {
    'Left half': [0, 0, 50, 100], 'Right half': [50, 0, 50, 100], 'Top left': [0, 0, 50, 50], 'Top right': [50, 0, 50, 50],
    'Bottom left': [0, 50, 50, 50], 'Bottom right': [50, 50, 50, 50], 'Left third': [0, 0, 33.33, 100], 'Center': [15, 10, 70, 80], 'Maximize': [0, 0, 100, 100],
  };
  el.innerHTML = `
    <div class="d-win">
      <div class="d-display" aria-hidden="true"><div class="d-mwin a"><i></i>Safari</div><div class="d-mwin b"><i></i>Notes</div></div>
      <div class="d-win-side">
        <div class="d-layouts" role="group" aria-label="Snap Safari">${Object.keys(layouts).map((k) => `<button type="button" data-l="${k}">${k}</button>`).join('')}</div>
        <p class="d-label">Workspaces</p>
        <div class="d-ws"><button type="button" data-ws="write">Writing</button><button type="button" data-ws="research">Research</button></div>
        <p class="d-toast" role="status"></p>
      </div>
    </div>`;
  const place = (node, [x, y, w, h]) => Object.assign(node.style, { left: x + '%', top: y + '%', width: w + '%', height: h + '%' });
  const a = el.querySelector('.d-mwin.a'), b = el.querySelector('.d-mwin.b');
  place(a, layouts.Center); place(b, [55, 30, 40, 55]);
  bindAll(el, '[data-l]', 'click', (e) => { place(a, layouts[e.currentTarget.dataset.l]); el.querySelector('.d-toast').textContent = 'Safari → ' + e.currentTarget.dataset.l; });
  bindAll(el, '[data-ws]', 'click', (e) => {
    const ws = e.currentTarget.dataset.ws;
    if (ws === 'write') { place(a, layouts['Left half']); place(b, layouts['Right half']); }
    else { place(a, layouts['Left third']); place(b, [33.33, 0, 66.67, 100]); }
    el.querySelector('.d-toast').textContent = `Restored “${e.currentTarget.textContent}” — 2 of 2 windows placed`;
  });
}

/* ---------------- Similar Images ---------------- */
function similar(el) {
  const sets = [[200, 'Sunset at the pier'], [330, 'Birthday candles'], [120, 'Trail overlook']];
  el.innerHTML = `
    <div class="d-sim">
      ${sets.map(([h, n], gi) => `
        <div class="d-sim-group"><p><b>${n}</b> · 4 similar shots</p>
          <div class="d-sim-row">${[0, 1, 2, 3].map((k) => `<button type="button" class="ph${k === 1 ? ' best' : ''}" style="--h:${h + k * 6};filter:brightness(${1 - k * 0.06})" aria-label="${n} shot ${k + 1}${k === 1 ? ', suggested best' : ''}" data-g="${gi}" data-k="${k}">${k === 1 ? `<em>${svg(ICON.star, 12)} Best</em>` : ''}</button>`).join('')}</div>
        </div>`).join('')}
      <div class="d-compare" hidden><span class="ph"></span><span class="ph"></span><p>Side-by-side compare</p></div>
      <p class="d-foot">Similar is not identical — these are reviewed separately from exact duplicates.</p>
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
  home, library, images, search, ocr, storage, cleanup, duplicates, organizer,
  quicksearch, downloads, finder, clipboard, screenshots, windows, similar,
};
