/* MacSprint Lab · Hover fan + Quick Look (JS)
   Archived from design/foundations.html @ 3945a2c. Needs from the host page: ic(name, size), esc(text),
   KINDS ([name, colour, hue, icon, count, size]), varsFor(dark), mode, and a #pv container.
   Data + markup helpers first, then the event wiring (open/close with 160 ms grace, Space, Quick Look). */
// The last five items per kind, oldest first (they fan out left to right, newest on the right).
const RECENT = {
  Images: [['Family.jpg', '3.1 MB', 'Mon 18:20'], ['Receipt.png', '412 KB', 'Tue 09:02'], ['Sunset.heic', '2.4 MB', 'Yesterday 19:47'], ['Whiteboard.jpg', '1.8 MB', 'Today 08:15'], ['Screenshot 9.41.png', '880 KB', 'Today 09:41']],
  Videos: [['Launch.mp4', '84 MB', 'Mon 11:00'], ['Clip_03.mov', '212 MB', 'Tue 16:30'], ['Recording.mov', '46 MB', 'Yesterday 10:12'], ['Demo.mp4', '128 MB', 'Today 08:50'], ['Trip.mov', '1.2 GB', 'Today 09:30']],
  Music: [['Demo.wav', '38 MB', 'Mon 21:14'], ['Podcast 42.mp3', '61 MB', 'Tue 07:30'], ['Track 07.mp3', '8.2 MB', 'Yesterday 22:01'], ['Voice memo.m4a', '1.1 MB', 'Today 08:03'], ['Mix.m4a', '9.6 MB', 'Today 09:12']],
  Documents: [['Deck.key', '24 MB', 'Mon 15:42'], ['Budget.xlsx', '96 KB', 'Tue 12:10'], ['Notes.md', '6 KB', 'Yesterday 17:55'], ['Invoice 0412.pdf', '188 KB', 'Today 08:31'], ['Brief.pdf', '2.4 MB', 'Today 09:38']],
  Archives: [['Logs.zip', '22 MB', 'Mon 09:00'], ['Fonts.zip', '14 MB', 'Tue 13:25'], ['Assets.tar.gz', '310 MB', 'Yesterday 18:40'], ['Export.dmg', '96 MB', 'Today 07:58'], ['Backup.zip', '1.4 GB', 'Today 09:05']],
  Apps: [['Arc.app', '612 MB', 'Mon 10:10'], ['Raycast.app', '148 MB', 'Tue 08:44'], ['Notion.app', '402 MB', 'Yesterday 14:02'], ['Xcode.app', '11.2 GB', 'Today 07:40'], ['Figma.app', '510 MB', 'Today 09:20']],
};
const TYPE = { Images: 'Image', Videos: 'Movie', Music: 'Audio', Documents: 'Document', Archives: 'Archive', Apps: 'Application' };
const FAN = [-76, -38, 0, 38, 76].map((a) => { const r = a * Math.PI / 180; return { ux: Math.sin(r).toFixed(3), uy: (-Math.cos(r)).toFixed(3), rot: (a * .32).toFixed(1) + 'deg' }; });
function thumbHtml(kind, i, size = 13, nm = '') {
  const [k, col, h, icon] = kind, photo = k === 'Images' || k === 'Videos';
  return photo ? `<span class="th qthumb photo" style="--h:${h + i * 47}">${k === 'Videos' ? '<i class="play"></i>' : ''}</span>` : `<span class="th qthumb file" style="--k:${col}">${ic(icon, size)}${nm ? `<em class="ext">${esc(nm.split('.').pop().toUpperCase())}</em>` : ''}</span>`;
}
function fanHtml(kind, ki) {
  return `<div class="fan">${RECENT[kind[0]].map(([nm], i) => `<button type="button" data-k="${ki}" data-i="${i}" aria-label="Quick Look ${esc(nm)}" style="--i:${i};--ux:${FAN[i].ux};--uy:${FAN[i].uy};--rot:${FAN[i].rot}">${thumbHtml(kind, i, 13, nm)}<span class="nm">${esc(nm)}</span></button>`).join('')}</div>`;
}

/* ---------------- hover fan + Quick Look ---------------- */
const pvEl = document.getElementById('pv');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let openFw = null, closeT = 0, hoverFw = null;
function setOpen(fw) {
  clearTimeout(closeT);
  if (openFw && openFw !== fw) openFw.classList.remove('open');
  openFw = fw; if (fw) fw.classList.add('open');
}
pvEl.addEventListener('mouseover', (e) => { const fw = e.target.closest('.fw'); if (fw) { hoverFw = fw; setOpen(fw); } });
pvEl.addEventListener('mouseout', (e) => {
  const fw = e.target.closest('.fw'); if (!fw || fw.contains(e.relatedTarget)) return;
  hoverFw = null; closeT = setTimeout(() => { if (openFw === fw && !fw.contains(document.activeElement)) { fw.classList.remove('open'); openFw = null; } }, 160);
});
pvEl.addEventListener('focusin', (e) => { const fw = e.target.closest('.fw'); if (fw) setOpen(fw); });
pvEl.addEventListener('focusout', (e) => { const fw = e.target.closest('.fw'); if (fw && !fw.contains(e.relatedTarget) && hoverFw !== fw) { fw.classList.remove('open'); if (openFw === fw) openFw = null; } });
pvEl.addEventListener('click', (e) => { const b = e.target.closest('.fan button'); if (b) quickLook(+b.dataset.k, +b.dataset.i, b); });

const ql = document.createElement('div');
ql.className = 'ql'; ql.hidden = true;
ql.innerHTML = `<div class="panel" role="dialog" aria-modal="true" aria-label="Quick Look"><div class="qbar"><button class="qx" aria-label="Close (Esc)"></button><span class="qname"></span><button class="qnav" data-d="-1" aria-label="Previous item">‹</button><button class="qnav" data-d="1" aria-label="Next item">›</button><button class="qopen">Open</button></div><div class="qview"></div><div class="qinfo"></div><div class="strip5"></div></div>`;
document.body.appendChild(ql);
const panel = ql.querySelector('.panel');
let qk = 0, qi = 0, qReturn = null;
function qlRender() {
  const kind = KINDS[qk], [k, col, h, icon] = kind, items = RECENT[k], [nm, size, when] = items[qi];
  const v = varsFor(mode === 'dark'); for (const [key, val] of Object.entries(v)) ql.style.setProperty(key, val);
  ql.style.colorScheme = mode;
  ql.querySelector('.qname').textContent = nm;
  const view = ql.querySelector('.qview'); view.className = 'qview'; view.style.cssText = `--k:${col};--h:${h + qi * 47}`;
  if (k === 'Images' || k === 'Videos') { view.classList.add('qthumb', 'photo'); view.innerHTML = k === 'Videos' ? '<i class="play"></i>' : ''; }
  else if (k === 'Documents') { view.style.background = `color-mix(in oklab, ${col} 10%, var(--p-alt))`; view.innerHTML = `<div class="page">${'<i></i>'.repeat(1)}${[92, 80, 96, 70, 88, 60, 94, 76].map((w) => `<i style="width:${w}%"></i>`).join('')}</div>`; }
  else if (k === 'Music') { view.style.background = `color-mix(in oklab, ${col} 10%, var(--p-alt))`; view.innerHTML = `<div class="wave">${Array.from({ length: 44 }, (_, i) => `<i style="height:${18 + Math.round(Math.abs(Math.sin(i * .7 + qi) * Math.cos(i * .23)) * 82)}%"></i>`).join('')}</div>`; }
  else { view.style.background = `color-mix(in oklab, ${col} 10%, var(--p-alt))`; view.innerHTML = `<div class="bigic">${ic(icon, 56)}</div>`; }
  ql.querySelector('.qinfo').innerHTML = `<span><b>${TYPE[k]}</b> · ${nm.split('.').pop().toUpperCase()}</span><span>${size}</span><span>Added ${when}</span><span>${qi + 1} of 5 · newest last</span>`;
  ql.querySelector('.strip5').innerHTML = items.map(([n], i) => `<button type="button" data-i="${i}" aria-label="${esc(n)}" aria-current="${i === qi}" style="--k:${col}">${thumbHtml(kind, i, 16)}</button>`).join('');
  ql.querySelector('[data-d="-1"]').disabled = qi === 0;
  ql.querySelector('[data-d="1"]').disabled = qi === 4;
}
function quickLook(k, i, from) {
  qk = k; qi = i; qReturn = from || document.activeElement;
  qlRender(); ql.hidden = false;
  ql.querySelector('.qx').focus();
  if (from && !reduce.matches && panel.animate) {
    const a = from.getBoundingClientRect(), b = panel.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2), dy = a.top + a.height / 2 - (b.top + b.height / 2), sc = Math.max(.08, a.width / b.width);
    panel.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${sc})`, opacity: .3 }, { transform: 'none', opacity: 1 }], { duration: 340, easing: 'cubic-bezier(.2, .9, .25, 1.08)' });
    ql.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
  }
}
function closeQL() {
  if (ql.hidden) return;
  ql.hidden = true;
  if (qReturn && document.contains(qReturn)) qReturn.focus({ preventScroll: true });
}
function step(d) { const n = Math.min(4, Math.max(0, qi + d)); if (n !== qi) { qi = n; qlRender(); } }
ql.addEventListener('click', (e) => {
  if (e.target === ql || e.target.closest('.qx')) return closeQL();
  const nav = e.target.closest('.qnav'); if (nav) return step(+nav.dataset.d);
  const t = e.target.closest('.strip5 button'); if (t) { qi = +t.dataset.i; qlRender(); ql.querySelector(`.strip5 [data-i="${qi}"]`).focus(); return; }
  if (e.target.closest('.qopen')) {
    const old = ql.querySelector('.qtoast'); if (old) old.remove();
    const t2 = document.createElement('div'); t2.className = 'qtoast'; t2.textContent = `In the app this opens ${RECENT[KINDS[qk][0]][qi][0]} in its default app`;
    ql.querySelector('.qview').appendChild(t2); setTimeout(() => t2.remove(), 2200);
  }
});
document.addEventListener('keydown', (e) => {
  if (!ql.hidden) {
    if (e.key === 'Escape' || e.key === ' ' && !e.target.closest('.qopen, .qnav, .strip5 button, .qx')) { e.preventDefault(); closeQL(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Tab') { const f = [...panel.querySelectorAll('button:not(:disabled)')], i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } }
    return;
  }
  if (e.key !== ' ') return;
  const btn = e.target.closest && e.target.closest('.fan button');
  const fw = btn ? null : (e.target.closest && e.target.closest('.fw')) || (e.target === document.body || e.target === document.documentElement ? hoverFw : null);
  if (btn) { e.preventDefault(); quickLook(+btn.dataset.k, +btn.dataset.i, btn); }
  else if (fw) { e.preventDefault(); setOpen(fw); quickLook(+fw.dataset.k, 4, fw.querySelector('.fan button:last-child')); }
});

