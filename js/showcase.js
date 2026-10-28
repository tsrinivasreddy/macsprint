// Feature spotlight: a card per feature with a live, non-interactive product shot
// (the same demo as the explorer, shown small), the problem, the use case and its shortcut.
import { FEATURES, STORIES, iconSvg } from './features.js';
import { selectFeature } from './explorer.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const byId = new Map(FEATURES.map((f) => [f.id, f]));

export function initSpotlight(grid, demos) {
  grid.innerHTML = STORIES.map((s, i) => {
    const f = byId.get(s.id);
    return `
      <article class="spot-card reveal${i === 0 ? ' spot-wide' : ''}">
        <div class="spot-shot" aria-hidden="true"><div class="mac-window" inert><div class="spot-bar"><i></i><i></i><i></i></div><div class="spot-demo ex-demo demo-${s.id}" data-demo="${s.id}"></div></div></div>
        <div class="spot-text">
          <p class="spot-label"><span class="spot-icon">${iconSvg(f.icon, 16)}</span>${esc(s.label)}<span class="spot-keys">${s.keys.map((k) => `<kbd>${esc(k)}</kbd>`).join('')}</span></p>
          <h3>${esc(s.title)}</h3>
          <p class="spot-problem"><b>The problem.</b> ${esc(s.problem)}</p>
          <p class="spot-use"><b>With MacSprint.</b> ${esc(s.use)}</p>
          <ul>${s.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
          <a class="spot-try" href="#feature-${s.id}" data-id="${s.id}">Try it ›</a>
        </div>
      </article>`;
  }).join('');
  grid.querySelectorAll('[data-demo]').forEach((el) => {
    try { demos[el.dataset.demo]?.(el, undefined, { go: () => {} }); } catch (e) { console.error(e); }
  });
  grid.addEventListener('click', (e) => {
    const a = e.target.closest('.spot-try'); if (!a) return;
    e.preventDefault();
    selectFeature(a.dataset.id);
    document.getElementById('explore').scrollIntoView({ block: 'start' });
    document.getElementById('tab-' + a.dataset.id)?.focus({ preventScroll: true });
  });
}
