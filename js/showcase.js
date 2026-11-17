// Feature stories: per feature, a photo of the everyday problem beside the fix in MacSprint
// (a live, non-interactive copy of the explorer demo), its points and its shortcut. Sides alternate.
import { FEATURES, STORIES, iconSvg } from './features.js';
import { selectFeature } from './explorer.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const byId = new Map(FEATURES.map((f) => [f.id, f]));

export function initSpotlight(grid, demos) {
  grid.innerHTML = STORIES.map((s, i) => {
    const f = byId.get(s.id);
    return `
      <article class="spot-card reveal${i % 2 ? ' flip' : ''}">
        <figure class="story-problem">
          <img class="spot-photo" src="assets/stories/${s.id}.webp" alt="" width="1200" height="800" loading="lazy" decoding="async">
          <figcaption><span class="story-tag">The problem</span><p class="spot-problem">${esc(s.problem)}</p></figcaption>
        </figure>
        <div class="story-fix">
          <p class="spot-label"><span class="spot-icon">${iconSvg(f.icon, 16)}</span>${esc(s.label)}<span class="spot-keys">${s.keys.map((k) => `<kbd>${esc(k)}</kbd>`).join('')}</span></p>
          <h3>${esc(s.title)}</h3>
          <div class="spot-shot" aria-hidden="true"><div class="mac-window" inert><div class="spot-bar"><i></i><i></i><i></i></div><div class="spot-demo ex-demo demo-${s.id}" data-demo="${s.id}"></div></div></div>
          <p class="spot-use"><span class="story-tag fix">With MacSprint</span> ${esc(s.use)}</p>
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
