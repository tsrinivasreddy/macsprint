// Page bootstrap: scroll-reveal and section wiring.
import { initExplorer } from './explorer.js';
import { DEMOS } from './demos.js';
import { initProblems, initRoadmap, initWaitlist, initShortcuts } from './sections.js';
import { heroWindowMarkup } from './home.js';

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
initExplorer(document.getElementById('explorer'), DEMOS);
initProblems(document.getElementById('problem-grid'));
initRoadmap(document.getElementById('roadmap-grid'));
initShortcuts(document.getElementById('keys-grid'));
initWaitlist(document.querySelector('.waitlist-form'), document.querySelector('.waitlist-status'));
initReveal();
