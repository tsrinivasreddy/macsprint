// Page bootstrap: scroll-reveal and section wiring.
import { initExplorer } from './explorer.js';
import { DEMOS } from './demos.js';
import { initProblems, initWaitlist, initShortcuts } from './sections.js';
import { heroWindowMarkup, heroTryMarkup, bindHeroTry } from './home.js';
import { initSpotlight } from './showcase.js';
import { PHOTOS, BY_HUE } from './photos.js';

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('in'); e.target.classList.remove('pre'); io.unobserve(e.target); }
    }
  }, { rootMargin: '0px 0px -10% 0px' });
  els.forEach((el) => {
    if (el.getBoundingClientRect().top > innerHeight) el.classList.add('pre');
    io.observe(el);
  });
}

document.getElementById('hero-window').innerHTML = heroWindowMarkup();
const heroTry = document.getElementById('hero-try');
heroTry.innerHTML = heroTryMarkup();
bindHeroTry(heroTry, document.getElementById('hero-window'));
initExplorer(document.getElementById('explorer'), DEMOS);
initProblems(document.getElementById('problem-grid'));
initSpotlight(document.getElementById('spot-grid'), DEMOS);
initShortcuts(document.getElementById('keys-grid'));
initWaitlist(document.querySelector('.waitlist-form'), document.querySelector('.waitlist-status'));
initReveal();

// Real photos in every thumbnail: each .ph gets the photo for its colour value (--h),
// so the same file always shows the same photo, and copies show the same picture.
if (PHOTOS.length) {
  const paint = (el) => {
    if (el.dataset.photo) return;
    const h = parseInt(getComputedStyle(el).getPropertyValue('--h'), 10) || 0;
    el.dataset.photo = BY_HUE[h] ? `assets/photos/${BY_HUE[h]}.jpg` : PHOTOS[Math.abs(h) % PHOTOS.length];
    el.style.backgroundImage = `url("${el.dataset.photo}")`;
  };
  const scan = (root) => root.querySelectorAll?.('.ph:not([data-photo])').forEach(paint);
  scan(document);
  new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n.nodeType === 1) { if (n.classList.contains('ph')) paint(n); scan(n); } }))).observe(document.body, { childList: true, subtree: true });
}
