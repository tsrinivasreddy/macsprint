// Feature Explorer: a copy of the MacSprint window. The sidebar has the app's nine places; features that
// live inside a place (Map, What's this?, Screenshots, Names) or behind the toolbar field (Search, Ask)
// are reached the same way as in the app, through a switch at the top. ⌘K jumps anywhere.
// Selection is mirrored to #feature-<id>.
import { lensSvg, wordmark } from './lens.js';
import { FEATURES, iconSvg } from './features.js';

const HASH_PREFIX = '#feature-';
const DEFAULT_ID = 'home';
const byId = new Map(FEATURES.map((f) => [f.id, f]));
const FAMILY = { cleanup: ['cleanup', 'spacemap', 'explain'], organizer: ['organizer', 'shots', 'rename'], search: ['search', 'ask'] };
const SWITCH = { cleanup: 'Files', spacemap: 'Map', explain: 'What’s this?', organizer: 'Piles', shots: 'Screenshots', rename: 'Names', search: 'Search', ask: 'Ask' };
const familyOf = (id) => Object.keys(FAMILY).find((k) => FAMILY[k].includes(id));
const SIDEBAR = FEATURES.filter((f) => !familyOf(f.id) || (familyOf(f.id) === f.id && f.id !== 'search'));
const tabIdFor = (id) => { const fam = familyOf(id); return fam === 'search' ? null : fam || id; };

let state = { root: null, demos: {}, current: null, cleanup: null, tabs: [] };

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function sidebarHtml() {
  const groups = [...new Set(SIDEBAR.map((f) => f.group))];
  return groups.map((g) => `
    <div class="ex-group" role="presentation">
      <p class="ex-group-label" role="presentation">${g}</p>
      ${SIDEBAR.filter((f) => f.group === g).map((f) => `
        <button type="button" role="tab" id="tab-${f.id}" data-id="${f.id}" aria-selected="false" aria-controls="ex-pane" tabindex="-1">
          <span class="ex-tab-icon">${iconSvg(f.icon)}</span>
          <span class="ex-tab-text">${esc(f.title)}</span>
          ${f.meta ? `<span class="ex-tab-meta${f.meta.tone ? ' is-' + f.meta.tone : ''}"${f.meta.label ? ` aria-label="${esc(f.meta.label)}"` : ''}>${esc(f.meta.text)}</span>` : ''}
        </button>`).join('')}
    </div>`).join('');
}

const SEARCH_ICON = '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.8-4.8"/>';

function render(root) {
  root.innerHTML = `
    <div class="mac-window ex-window">
      <aside class="ex-side">
        <div class="ex-lights" aria-hidden="true"><i></i><i></i><i></i></div>
        <div class="ex-brand">${lensSvg(26)}${wordmark(19)}
          <span class="ex-side-icon" aria-hidden="true">${iconSvg('<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M9 4.5v15"/>', 17)}</span>
        </div>
        <div class="ex-tablist" role="tablist" aria-label="MacSprint features" aria-orientation="vertical"><span class="ex-indicator" aria-hidden="true"></span>${sidebarHtml()}</div>
      </aside>
      <div class="ex-main">
        <div class="ex-toolbar">
          <button type="button" class="ex-search" data-search aria-label="Search or ask">
            ${iconSvg(SEARCH_ICON, 16)}<span>Search or ask</span><kbd>⌘</kbd><kbd>F</kbd>
          </button>
          <span class="ex-libsize">Library size <b>30.19 GB</b></span>
          <span class="ex-inspector" aria-hidden="true">${iconSvg('<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><path d="M15 4.5v15"/>', 17)}</span>
        </div>
        <p class="visually-hidden" role="status" id="ex-status"></p>
        <section class="ex-pane" id="ex-pane" role="tabpanel" tabindex="-1">
          <header class="ex-pane-head">
            <span class="ex-pane-icon"></span>
            <div class="ex-pane-titles"><h3></h3><p class="ex-pane-short"></p></div>
            <div class="ex-switch" role="group" aria-label="Views" hidden></div>
          </header>
          <div class="ex-demo"></div>
          <p class="ex-demo-note">Sample files. Click around, nothing here touches your Mac.</p>
          <footer class="ex-pane-foot">
            <button type="button" class="ex-nav" data-step="-1" aria-label="Previous feature">‹ <span></span></button>
            <button type="button" class="ex-nav" data-step="1" aria-label="Next feature"><span></span> ›</button>
          </footer>
        </section>
      </div>
    </div>`;
}

export function selectFeature(id, { focus = false, updateHash = true, param = null } = {}) {
  const f = byId.get(id) || byId.get(DEFAULT_ID);
  const { root } = state;
  if (!root) return;
  const tabId = tabIdFor(f.id);
  const target = tabId && root.querySelector('#tab-' + tabId);
  if (state.current !== f.id || param) {
    if (typeof state.cleanup === 'function') state.cleanup();
    state.cleanup = null;
    state.current = f.id;

    for (const t of state.tabs) {
      const on = t.dataset.id === tabId;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    }
    const pane = root.querySelector('.ex-pane');
    pane.scrollTop = 0;
    pane.classList.remove('ex-enter');
    void pane.offsetWidth; // restart the enter animation
    pane.classList.add('ex-enter');
    pane.setAttribute('aria-labelledby', 'tab-' + f.id);
    pane.querySelector('.ex-pane-icon').innerHTML = iconSvg(f.icon, 26);
    pane.querySelector('h3').textContent = f.title;
    pane.querySelector('.ex-pane-short').textContent = f.short;
    const fam = familyOf(f.id);
    const sw = pane.querySelector('.ex-switch');
    sw.hidden = !fam;
    sw.innerHTML = fam ? FAMILY[fam].map((id) => `<button type="button" data-to="${id}" aria-pressed="${id === f.id}">${SWITCH[id]}</button>`).join('') : '';
    root.querySelector('.ex-search').classList.toggle('on', fam === 'search');

    const i = FEATURES.indexOf(f);
    const prev = FEATURES[(i - 1 + FEATURES.length) % FEATURES.length];
    const next = FEATURES[(i + 1) % FEATURES.length];
    const [pb, nb] = pane.querySelectorAll('.ex-nav');
    pb.querySelector('span').textContent = prev.title;
    nb.querySelector('span').textContent = next.title;
    pb.dataset.target = prev.id;
    nb.dataset.target = next.id;

    root.querySelector('#ex-status').textContent = 'Showing ' + f.title;
    if (target) revealTab(target);

    const demoEl = pane.querySelector('.ex-demo');
    demoEl.innerHTML = '';
    demoEl.className = 'ex-demo demo-' + f.id;
    const demo = state.demos[f.id];
    if (demo) state.cleanup = demo(demoEl, param, { go: (to, p) => selectFeature(to, { param: p }) }) || null;
  }
  if (updateHash && location.hash !== HASH_PREFIX + f.id) history.replaceState(null, '', HASH_PREFIX + f.id);
  syncTabStops();
  placeIndicator();
  if (focus) (target || root.querySelector('.ex-pane')).focus();
}

function visibleTabs() { return state.tabs; }

// Keep exactly one reachable tab: the selected one if visible, else the first visible match.
function syncTabStops() {
  const vis = visibleTabs();
  const sel = vis.find((t) => t.getAttribute('aria-selected') === 'true');
  const stop = sel || vis[0];
  for (const t of state.tabs) t.tabIndex = t === stop ? 0 : -1;
}

// Slide the highlight behind the selected tab (vertical sidebar or phone pill bar).
function placeIndicator() {
  const ind = state.root && state.root.querySelector('.ex-indicator');
  if (!ind) return;
  const tab = state.tabs.find((t) => t.getAttribute('aria-selected') === 'true');
  ind.hidden = !tab || tab.hidden;
  if (ind.hidden) return;
  ind.style.width = tab.offsetWidth + 'px';
  ind.style.height = tab.offsetHeight + 'px';
  ind.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`;
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
  root.querySelector('[data-search]').addEventListener('click', () => selectFeature('search'));
  root.querySelector('.ex-switch').addEventListener('click', (e) => { const b = e.target.closest('[data-to]'); if (b) selectFeature(b.dataset.to); });
  root.querySelectorAll('.ex-nav').forEach((b) => b.addEventListener('click', () => selectFeature(b.dataset.target, { focus: true })));
  if ('ResizeObserver' in window) new ResizeObserver(placeIndicator).observe(root.querySelector('.ex-tablist'));
  initPalette();

  const fromHash = readHash();
  selectFeature(fromHash ?? DEFAULT_ID, { updateHash: fromHash !== null });
  if (fromHash !== null) requestAnimationFrame(() => document.getElementById('explore').scrollIntoView({ block: 'start' }));
  window.addEventListener('hashchange', () => {
    const id = readHash();
    if (id !== null) { selectFeature(id); document.getElementById('explore').scrollIntoView({ block: 'start' }); }
  });
}
