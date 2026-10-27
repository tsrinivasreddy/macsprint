// Generated page sections: problem cards, roadmap, and the waitlist form.
import { FEATURES, PROBLEMS, RELEASES, iconSvg } from './features.js';
import { selectFeature } from './explorer.js';

const byId = new Map(FEATURES.map((f) => [f.id, f]));

export function initProblems(grid) {
  grid.innerHTML = PROBLEMS.map((p) => {
    const f = byId.get(p.featureId);
    const target = p.anchor ? 'Privacy' : f.title;
    return `
      <button type="button" class="problem-card reveal" data-id="${p.featureId}" ${p.anchor ? `data-anchor="${p.anchor}"` : ''}>
        <span class="problem-letter" aria-hidden="true">${p.letter}</span>
        <span class="problem-title">${p.title}</span>
        <span class="problem-fix">${p.anchor ? iconSvg('<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/>', 16) : iconSvg(f.icon, 16)} ${target} ›</span>
      </button>`;
  }).join('');
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.problem-card');
    if (!card) return;
    if (card.dataset.anchor) { document.querySelector(card.dataset.anchor).scrollIntoView({ block: 'start' }); return; }
    selectFeature(card.dataset.id);
    document.getElementById('explore').scrollIntoView({ block: 'start' });
    document.getElementById('tab-' + card.dataset.id).focus({ preventScroll: true });
  });
}

export function initRoadmap(grid) {
  grid.innerHTML = RELEASES.map((r) => {
    const items = FEATURES.filter((f) => f.release.split(' · ').includes(r.id) || f.release === r.id);
    return `
      <article class="roadmap-col reveal">
        <p class="roadmap-rel">${r.id === 'At launch' ? 'At launch' : r.id}</p>
        <h3>${r.name}</h3>
        <ul>${items.map((f) => `<li><a href="#explore/${f.id}">${iconSvg(f.icon, 16)}<span>${f.title}</span></a></li>`).join('')}</ul>
      </article>`;
  }).join('');
}

export function initWaitlist(form, status) {
  const input = form.querySelector('input[type=email]');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'waitlist-status';
    if (!input.checkValidity()) {
      status.textContent = 'Please enter a valid email address.';
      status.classList.add('is-error');
      input.focus();
      return;
    }
    const endpoint = form.dataset.endpoint?.trim();
    if (!endpoint) {
      status.textContent = "Waitlist isn't connected yet — sign-ups open soon. Your email was not sent anywhere.";
      status.classList.add('is-info');
      return;
    }
    const btn = form.querySelector('button');
    btn.disabled = true;
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email: input.value }),
      });
      if (!res.ok) throw new Error(String(res.status));
      status.textContent = "You're on the list. We'll email you once, when MacMate AI is ready.";
      status.classList.add('is-ok');
      form.reset();
    } catch {
      status.textContent = 'Something went wrong. Please try again in a moment.';
      status.classList.add('is-error');
    } finally {
      btn.disabled = false;
    }
  });
}
