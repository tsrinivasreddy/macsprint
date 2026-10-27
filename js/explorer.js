// Feature Explorer: a Mac-style window whose sidebar navigates every feature,
// plus a ⌘K command palette. Selection is mirrored to #feature-<id>.
import { FEATURES, iconSvg, badgeClass, badgeLabel } from './features.js';

const HASH_PREFIX = '#feature-';
const DEFAULT_ID = 'home';
const byId = new Map(FEATURES.map((f) => [f.id, f]));

let state = { root: null, demos: {}, current: null, cleanup: null, tabs: [] };

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function sidebarHtml() {
  const groups = [...new Set(FEATURES.map((f) => f.group))];
  return groups.map((g) => `
    <div class="ex-group" role="presentation">
      <p class="ex-group-label" role="presentation">${g}</p>
      ${FEATURES.filter((f) => f.group === g).map((f) => `
        <button type="button" role="tab" id="tab-${f.id}" data-id="${f.id}" aria-selected="false" aria-controls="ex-pane" tabindex="-1">
          <span class="ex-tab-icon">${iconSvg(f.icon)}</span>
          <span class="ex-tab-text">${esc(f.title)}</span>
          ${f.release === 'At launch' ? '' : `<span class="ex-tab-rel">${esc(f.release.split(' ')[0])}</span>`}
        </button>`).join('')}
    </div>`).join('');
}

function render(root) {
  root.innerHTML = `
    <div class="mac-window ex-window">
      <div class="mac-titlebar">
        <i></i><i></i><i></i>
        <span class="ex-title">MacMate AI</span>
        <button type="button" class="ex-kbd-btn" data-open-palette aria-label="Jump to a feature (Command K)">
          ${iconSvg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>', 14)}<span>Jump to…</span><kbd>⌘K</kbd>
        </button>
      </div>
      <div class="ex-body">
        <aside class="ex-side">
          <label class="ex-filter">
            <span class="visually-hidden">Filter features</span>
            <input type="search" placeholder="Filter features" autocomplete="off">
          </label>
          <div class="ex-tablist" role="tablist" aria-label="MacMate features" aria-orientation="vertical">${sidebarHtml()}</div>
          <p class="ex-nomatch" hidden>No features match</p>
        </aside>
        <p class="visually-hidden" role="status" id="ex-status"></p>
        <section class="ex-pane" id="ex-pane" role="tabpanel" tabindex="-1">
          <header class="ex-pane-head">
            <span class="ex-pane-icon"></span>
            <div class="ex-pane-titles"><h3></h3><p class="ex-pane-short"></p></div>
            <span class="ex-pane-badge"></span>
          </header>
          <div class="ex-demo"></div>
          <p class="ex-demo-note">Interactive preview with sample files — not your data.</p>
          <div class="ex-info">
            <p class="ex-headline"></p>
            <ul class="ex-points"></ul>
            <p class="ex-source"></p>
          </div>
          <footer class="ex-pane-foot">
            <button type="button" class="ex-nav" data-step="-1" aria-label="Previous feature">‹ <span></span></button>
            <button type="button" class="ex-nav" data-step="1" aria-label="Next feature"><span></span> ›</button>
          </footer>
        </section>
      </div>
    </div>`;
}

export function selectFeature(id, { focus = false, updateHash = true } = {}) {
  const f = byId.get(id) || byId.get(DEFAULT_ID);
  const { root } = state;
  if (!root) return;
  const target = root.querySelector('#tab-' + f.id);
  if (target.hidden) {
    const input = root.querySelector('.ex-filter input');
    input.value = '';
    input.dispatchEvent(new Event('input'));
  }
  if (state.current !== f.id) {
    if (typeof state.cleanup === 'function') state.cleanup();
    state.cleanup = null;
    state.current = f.id;

    for (const t of state.tabs) {
      const on = t.dataset.id === f.id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    }
    const pane = root.querySelector('.ex-pane');
    pane.setAttribute('aria-labelledby', 'tab-' + f.id);
    pane.querySelector('.ex-pane-icon').innerHTML = iconSvg(f.icon, 26);
    pane.querySelector('h3').textContent = f.title;
    pane.querySelector('.ex-pane-short').textContent = f.short;
    pane.querySelector('.ex-pane-badge').innerHTML = `<span class="${badgeClass(f.release)}">${esc(badgeLabel(f.release))}</span>`;
    pane.querySelector('.ex-headline').textContent = f.headline;
    pane.querySelector('.ex-points').innerHTML = f.points.map((p) => `<li>${esc(p)}</li>`).join('');
    pane.querySelector('.ex-source').textContent = f.source === 'Homy' ? 'Inspired by Homy' : f.source.includes('Homy') ? 'Combines ideas from MacMate and Homy' : '';

    const i = FEATURES.indexOf(f);
    const prev = FEATURES[(i - 1 + FEATURES.length) % FEATURES.length];
    const next = FEATURES[(i + 1) % FEATURES.length];
    const [pb, nb] = pane.querySelectorAll('.ex-nav');
    pb.querySelector('span').textContent = prev.title;
    nb.querySelector('span').textContent = next.title;
    pb.dataset.target = prev.id;
    nb.dataset.target = next.id;

    root.querySelector('#ex-status').textContent = 'Showing ' + f.title;
    revealTab(root.querySelector('#tab-' + f.id));

    const demoEl = pane.querySelector('.ex-demo');
    demoEl.innerHTML = '';
    demoEl.className = 'ex-demo demo-' + f.id;
    const demo = state.demos[f.id];
    if (demo) state.cleanup = demo(demoEl) || null;
  }
  if (updateHash && location.hash !== HASH_PREFIX + f.id) history.replaceState(null, '', HASH_PREFIX + f.id);
  syncTabStops();
  if (focus) target.focus();
}

function visibleTabs() { return state.tabs.filter((t) => !t.hidden); }

// Keep exactly one reachable tab: the selected one if visible, else the first visible match.
function syncTabStops() {
  const vis = visibleTabs();
  const sel = vis.find((t) => t.getAttribute('aria-selected') === 'true');
  const stop = sel || vis[0];
  for (const t of state.tabs) t.tabIndex = t === stop ? 0 : -1;
}

// Scroll the horizontal pill bar (phones) so the tab is visible, without scrolling the page.
function revealTab(tab) {
  const list = tab.closest('[role=tablist]');
  if (list.scrollWidth <= list.clientWidth) return;
  list.scrollLeft = tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2;
}

function onTabKey(e) {
  const tabs = visibleTabs();
  const i = tabs.indexOf(e.currentTarget);
  let target = null;
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') target = tabs[(i + 1) % tabs.length];
  else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') target = tabs[(i - 1 + tabs.length) % tabs.length];
  else if (e.key === 'Home') target = tabs[0];
  else if (e.key === 'End') target = tabs[tabs.length - 1];
  if (!target) return;
  e.preventDefault();
  selectFeature(target.dataset.id, { focus: true });
  target.scrollIntoView({ block: 'nearest', inline: 'nearest' });
}

function initFilter(root) {
  const input = root.querySelector('.ex-filter input');
  const none = root.querySelector('.ex-nomatch');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    for (const t of state.tabs) {
      const f = byId.get(t.dataset.id);
      const hit = !q || (f.title + ' ' + f.short + ' ' + f.group).toLowerCase().includes(q);
      t.hidden = !hit;
      if (hit) shown++;
    }
    root.querySelectorAll('.ex-group').forEach((g) => { g.hidden = !g.querySelector('[role=tab]:not([hidden])'); });
    none.hidden = shown > 0;
    syncTabStops();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== 'ArrowDown') return;
    const first = visibleTabs()[0];
    if (!first) return;
    e.preventDefault();
    selectFeature(first.dataset.id, { focus: true });
  });
}

/* ---------- ⌘K palette ---------- */
function initPalette() {
  const dlg = document.createElement('div');
  dlg.id = 'palette';
  dlg.className = 'palette';
  dlg.setAttribute('role', 'dialog');
  dlg.setAttribute('aria-modal', 'true');
  dlg.setAttribute('aria-label', 'Jump to a feature');
  dlg.hidden = true;
  dlg.innerHTML = `
    <div class="palette-backdrop" data-close></div>
    <div class="palette-box">
      <div class="palette-input">
        ${iconSvg('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>', 18)}
        <input type="text" role="combobox" aria-expanded="true" aria-controls="palette-list" aria-autocomplete="list" aria-label="Search features" placeholder="Jump to a feature…" autocomplete="off">
        <kbd>esc</kbd>
      </div>
      <ul id="palette-list" role="listbox" aria-label="Features"></ul>
      <p class="palette-empty" hidden>No features match</p>
    </div>`;
  document.body.appendChild(dlg);

  const input = dlg.querySelector('input');
  const list = dlg.querySelector('ul');
  const empty = dlg.querySelector('.palette-empty');
  let results = [];
  let active = 0;
  let returnFocus = null;

  const draw = () => {
    const q = input.value.trim().toLowerCase();
    results = FEATURES.filter((f) => !q || (f.title + ' ' + f.short + ' ' + f.group + ' ' + f.headline).toLowerCase().includes(q));
    active = Math.min(active, Math.max(results.length - 1, 0));
    list.innerHTML = results.map((f, i) => `
      <li role="option" id="pal-${f.id}" data-id="${f.id}" aria-selected="${i === active}">
        <span class="ex-tab-icon">${iconSvg(f.icon)}</span>
        <span class="pal-title">${esc(f.title)}</span>
        <span class="pal-short">${esc(f.short)}</span>
        <span class="${badgeClass(f.release)}">${esc(f.release)}</span>
      </li>`).join('');
    empty.hidden = results.length > 0;
    input.setAttribute('aria-activedescendant', results.length ? 'pal-' + results[active].id : '');
    const el = list.children[active];
    if (el) el.scrollIntoView({ block: 'nearest' });
  };

  const open = () => {
    returnFocus = document.activeElement;
    dlg.hidden = false;
    input.value = '';
    active = 0;
    draw();
    input.focus();
  };
  const close = (restore = true) => {
    dlg.hidden = true;
    if (restore && returnFocus && returnFocus.focus) returnFocus.focus();
  };
  const choose = (id) => {
    close(false);
    selectFeature(id);
    document.getElementById('explore').scrollIntoView({ block: 'start' });
    state.root.querySelector('#tab-' + id).focus({ preventScroll: true });
  };

  input.addEventListener('input', () => { active = 0; draw(); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (results.length) { active = (active + 1) % results.length; draw(); } }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (results.length) { active = (active - 1 + results.length) % results.length; draw(); } }
    else if (e.key === 'Enter') { e.preventDefault(); if (results[active]) choose(results[active].id); }
  });
  list.addEventListener('click', (e) => { const li = e.target.closest('li[data-id]'); if (li) choose(li.dataset.id); });
  dlg.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    if (e.key === 'Tab') { e.preventDefault(); input.focus(); } // keep focus inside the dialog
  });
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      dlg.hidden ? open() : close();
    }
  });
  document.addEventListener('click', (e) => { if (e.target.closest('[data-open-palette]')) open(); });
}

function readHash() {
  return location.hash.startsWith(HASH_PREFIX) ? location.hash.slice(HASH_PREFIX.length) : null;
}

export function initExplorer(root, demos = {}) {
  state = { root, demos, current: null, cleanup: null, tabs: [] };
  render(root);
  state.tabs = [...root.querySelectorAll('[role=tab]')];
  for (const t of state.tabs) {
    t.addEventListener('click', () => selectFeature(t.dataset.id));
    t.addEventListener('keydown', onTabKey);
  }
  root.querySelectorAll('.ex-nav').forEach((b) => b.addEventListener('click', () => selectFeature(b.dataset.target, { focus: true })));
  initFilter(root);
  initPalette();

  const fromHash = readHash();
  selectFeature(fromHash ?? DEFAULT_ID, { updateHash: fromHash !== null });
  if (fromHash !== null) requestAnimationFrame(() => document.getElementById('explore').scrollIntoView({ block: 'start' }));
  window.addEventListener('hashchange', () => {
    const id = readHash();
    if (id !== null) { selectFeature(id); document.getElementById('explore').scrollIntoView({ block: 'start' }); }
  });
}
