// Generated page sections: problem cards, shortcuts and the waitlist form.
import { FEATURES, PROBLEMS, SHORTCUTS, iconSvg } from './features.js';
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
      status.textContent = "The waitlist opens soon. This preview doesn't send your email anywhere.";
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
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || '');
      status.textContent = data.already ? "You're already on the list. We'll email you once, when MacSprint AI is ready." : "You're on the list. Check your inbox for a confirmation. We'll email you once more, when MacSprint AI is ready.";
      status.classList.add('is-ok');
      form.reset();
    } catch (err) {
      status.textContent = err.message || 'Something went wrong. Please try again in a moment.';
      status.classList.add('is-error');
    } finally {
      btn.disabled = false;
    }
  });
}

export function initShortcuts(grid) {
  grid.innerHTML = SHORTCUTS.map((g) => `
    <article class="keygroup reveal">
      <h3>${g.group}</h3>
      ${g.items.map(([label, keys]) => `<div class="krow"><span>${label}</span><span class="kcaps">${keys.map((k) => `<kbd>${k}</kbd>`).join('')}</span></div>`).join('')}
    </article>`).join('');
}
