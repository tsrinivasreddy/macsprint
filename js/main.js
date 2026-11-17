// Page bootstrap: scroll-reveal and section wiring.
import { initExplorer } from './explorer.js';
import { DEMOS } from './demos.js';
import { initWaitlist, initShortcuts, initRequestForm } from './sections.js';
import { heroWindowMarkup, heroTryMarkup, bindHeroTry } from './home.js';
import { initSpotlight } from './showcase.js';
import { initHighlights } from './highlights.js';
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
initHighlights(document.getElementById('hl-grid'));
initSpotlight(document.getElementById('spot-grid'), DEMOS);
initShortcuts(document.getElementById('keys-grid'));
document.querySelectorAll('.waitlist-form').forEach((f) => initWaitlist(f, f.nextElementSibling));
document.querySelectorAll('.request-form').forEach(initRequestForm);
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

// The nav marks the section on screen (aria-current), and on phones keeps that chip in view.
{
  const links = new Map([...document.querySelectorAll('.nav-links a[href^="#"]')].map((a) => [a.getAttribute('href').slice(1), a]));
  const mark = (id) => links.forEach((a, k) => {
    if (k !== id) { a.removeAttribute('aria-current'); return; }
    if (a.getAttribute('aria-current')) return;
    a.setAttribute('aria-current', 'location');
    const row = a.closest('.nav-links');
    if (row.scrollWidth > row.clientWidth) row.scrollTo({ left: a.offsetLeft - row.clientWidth / 2 + a.offsetWidth / 2 });
  });
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && mark(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
}
