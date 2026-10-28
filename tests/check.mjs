// Browser checks for the MacSprint site. Run: node tests/check.mjs [name-filter]
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node-tools/node_modules/playwright'); }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8765;
export const URL = `http://localhost:${PORT}/`;

export function startServer() {
  const proc = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1'], { cwd: ROOT, stdio: 'ignore' });
  return new Promise((resolve) => setTimeout(() => resolve(proc), 600));
}

const checks = [];
const check = (name, fn) => checks.push({ name, fn });
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };

async function open(browser, { width = 1440, height = 900, hash = '', scheme = 'light' } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, colorScheme: scheme, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  page.setDefaultTimeout(5000);
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(URL + hash, { waitUntil: 'load' });
  page.errors = errors;
  return page;
}

/* ---------- Task 1: shell ---------- */
check('noConsoleErrors', async (b) => {
  const p = await open(b);
  await p.waitForTimeout(300);
  assert(p.errors.length === 0, 'console errors: ' + p.errors.join(' | '));
});

check('noHorizontalOverflow', async (b) => {
  for (const width of [1440, 390, 320]) {
    const p = await open(b, { width });
    const [sw, iw] = await p.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    assert(sw <= iw, `overflow at ${width}: scrollWidth ${sw} > ${iw}`);
  }
});

check('heroHasTaglineAndCta', async (b) => {
  const p = await open(b);
  const h1 = await p.textContent('h1');
  assert(h1 && h1.includes('MacSprint AI'), 'h1 missing MacSprint AI: ' + h1);
  const body = await p.textContent('body');
  assert(body.includes('Your Mac. Smarter, Faster, Cleaner.'), 'tagline missing');
  assert(await p.locator('#overview a[href="#waitlist"]').count() > 0, 'hero CTA to #waitlist missing');
  for (const id of ['overview', 'problems', 'explore', 'compare', 'shortcuts', 'privacy', 'trust', 'roadmap', 'pricing', 'faq', 'waitlist']) {
    assert(await p.locator('#' + id).count() === 1, 'missing section #' + id);
  }
});

/* ---------- Task 2: explorer ---------- */
const getFeatures = (p) => p.evaluate(async () => (await import('/js/features.js')).FEATURES.map((f) => ({ id: f.id, title: f.title })));
const paneTitle = (p) => p.textContent('#explorer .ex-pane h3');

check('explorerTabsSelectEachFeature', async (b) => {
  const p = await open(b);
  const features = await getFeatures(p);
  assert(features.length === 10, 'expected 10 features, got ' + features.length);
  const tabs = p.locator('#explorer [role=tab]');
  assert(await tabs.count() === 10, 'expected 10 tabs, got ' + await tabs.count());
  for (let i = 0; i < 10; i++) {
    await tabs.nth(i).click();
    assert(await tabs.nth(i).getAttribute('aria-selected') === 'true', 'tab not selected: ' + i);
    const t = await paneTitle(p);
    assert(t.trim() === features[i].title, `pane title "${t}" != "${features[i].title}"`);
  }
  assert(p.errors.length === 0, 'errors: ' + p.errors.join(' | '));
});

check('explorerArrowKeys', async (b) => {
  const p = await open(b);
  const features = await getFeatures(p);
  await p.locator('#explorer [role=tab]').first().click();
  await p.keyboard.press('ArrowDown');
  assert((await paneTitle(p)).trim() === features[1].title, 'ArrowDown did not move to second feature');
  const focusedSelected = await p.evaluate(() => document.activeElement.getAttribute('aria-selected'));
  assert(focusedSelected === 'true', 'focus did not follow selection');
});

check('explorerHashDeepLinks', async (b) => {
  let p = await open(b, { hash: '#feature-duplicates' });
  assert((await paneTitle(p)).trim() === 'Duplicate Finder', 'deep link to duplicates failed');
  p = await open(b, { hash: '#feature-nope' });
  assert((await paneTitle(p)).trim() === 'Home Dashboard', 'unknown hash did not fall back to home');
  assert(p.errors.length === 0, 'errors: ' + p.errors.join(' | '));
  await p.locator('#explorer [role=tab]', { hasText: 'Clipboard History' }).click();
  assert(await p.evaluate(() => location.hash) === '#feature-clipboard', 'hash not mirrored');
});

check('explorerCommandPalette', async (b) => {
  const p = await open(b);
  await p.keyboard.press('Control+k');
  const dlg = p.locator('[role=dialog]#palette');
  assert(await dlg.isVisible(), 'palette did not open');
  await p.keyboard.type('clip');
  await p.keyboard.press('Enter');
  assert(!(await dlg.isVisible()), 'palette did not close on Enter');
  assert((await paneTitle(p)).trim() === 'Clipboard History', 'palette did not select clipboard');
  await p.keyboard.press('Control+k');
  await p.keyboard.type('zzzz');
  assert((await dlg.textContent()).includes('No features match'), 'empty state missing');
  await p.keyboard.press('Enter');
  assert((await paneTitle(p)).trim() === 'Clipboard History', 'Enter with no match changed selection');
  await p.keyboard.press('Escape');
  assert(!(await dlg.isVisible()), 'Esc did not close palette');
});

check('explorerSidebarFilter', async (b) => {
  const p = await open(b);
  await p.fill('#explorer .ex-filter input', 'duplicate f');
  const visible = await p.locator('#explorer [role=tab]:visible').count();
  assert(visible === 1, 'filter should leave 1 visible tab, got ' + visible);
});

/* ---------- Task 3: demos ---------- */
const demoText = (p) => p.textContent('#explorer .ex-demo');

check('demosCoverEveryFeature', async (b) => {
  const p = await open(b);
  const missing = await p.evaluate(async () => {
    const { FEATURES } = await import('/js/features.js');
    const { DEMOS } = await import('/js/demos.js');
    return FEATURES.filter((f) => typeof DEMOS[f.id] !== 'function').map((f) => f.id);
  });
  assert(missing.length === 0, 'features without demo: ' + missing.join(','));
  const tabs = p.locator('#explorer [role=tab]');
  for (let i = 0; i < 10; i++) {
    await tabs.nth(i).click();
    assert((await demoText(p)).trim().length > 0, 'empty demo at tab ' + i);
  }
  assert(p.errors.length === 0, 'errors: ' + p.errors.join(' | '));
});

check('demoImageViewerArrows', async (b) => {
  const p = await open(b, { hash: '#feature-images' });
  assert((await demoText(p)).includes('15 of 120'), 'counter should start at 15 of 120');
  await p.fill('#explorer .ex-filter input', 'x');
  await p.focus('#explorer .ex-filter input');
  await p.keyboard.press('ArrowRight');
  assert((await demoText(p)).includes('15 of 120'), 'ArrowRight in filter input moved the viewer');
  await p.fill('#explorer .ex-filter input', '');
  await p.focus('#explorer .demo-images .iv-stage');
  await p.keyboard.press('ArrowRight');
  assert((await demoText(p)).includes('16 of 120'), 'ArrowRight on viewer did not advance');
  await p.keyboard.press('ArrowLeft');
  await p.keyboard.press('ArrowLeft');
  assert((await demoText(p)).includes('14 of 120'), 'ArrowLeft did not go back');
});

check('demoSearchTextInImage', async (b) => {
  const p = await open(b, { hash: '#feature-search' });
  await p.locator('#explorer .d-chips button', { hasText: 'connection timed out' }).click();
  assert((await demoText(p)).includes('IMG_2048.png'), 'IMG_2048.png missing');
  assert((await demoText(p)).includes('Text in image'), 'match reason tag missing');
  const marks = await p.locator('#explorer .ex-demo mark').allTextContents();
  assert(marks.some((m) => m.toLowerCase().includes('connection timed out')), 'no highlighted phrase');
});

check('demoDuplicatesSimilarTab', async (b) => {
  const p = await open(b, { hash: '#feature-duplicates' });
  await p.locator('#explorer .d-seg button', { hasText: 'Similar photos' }).click();
  assert((await demoText(p)).includes('Sunset at the pier'), 'similar photos view missing');
  assert(await p.locator('#explorer .d-dupes').isHidden(), 'exact copies should hide on Similar photos');
  assert(p.errors.length === 0, 'errors: ' + p.errors.join(' | '));
});

check('demoOrganizerNeedsReview', async (b) => {
  const p = await open(b, { hash: '#feature-organizer' });
  assert((await demoText(p)).includes('182 proposed moves'), '182 proposed moves missing');
  const approve = p.locator('#explorer .ex-demo button', { hasText: 'Approve' });
  assert(await approve.isDisabled(), 'Approve should be disabled before review');
  await p.locator('#explorer .ex-demo button', { hasText: 'Review' }).click();
  assert(!(await approve.isDisabled()), 'Approve should enable after review');
});

check('demoStorageHonestLabels', async (b) => {
  const p = await open(b, { hash: '#feature-storage' });
  const t = await demoText(p);
  assert(t.includes('Not modified for 18 months'), 'honest old-file label missing');
  assert(!/\bunused\b|not accessed/i.test(t), 'demo uses unsupported "unused"/"not accessed" wording');
});

/* ---------- Task 4: content sections ---------- */
check('problemCardsOpenFeatures', async (b) => {
  const p = await open(b);
  const cards = p.locator('#problems .problem-card');
  assert(await cards.count() === 11, 'expected 11 problem cards, got ' + await cards.count());
  await p.locator('#problems .problem-card', { hasText: 'Copying one thing erases the last' }).click();
  await p.waitForTimeout(200);
  assert((await paneTitle(p)).trim() === 'Clipboard History', 'card I did not open clipboard');
  const top = await p.evaluate(() => document.getElementById('explore').getBoundingClientRect().top);
  assert(Math.abs(top) < 120, 'did not scroll to explorer, top=' + top);
});

check('trustPipelineHasEightSteps', async (b) => {
  const p = await open(b);
  assert(await p.locator('#trust .pipeline > li').count() === 8, 'pipeline should have 8 steps');
  assert((await p.textContent('#trust')).includes('never deletes, moves or renames'), 'safety promise missing');
});

check('roadmapListsAllFeatures', async (b) => {
  const p = await open(b);
  const features = await getFeatures(p);
  const cols = p.locator('#roadmap .roadmap-col');
  assert(await cols.count() === 4, 'expected 4 roadmap columns');
  const text = await p.textContent('#roadmap');
  for (const label of ['At launch', '1.1', '1.2', '2.0']) assert(text.includes(label), 'missing release ' + label);
  for (const f of features) assert(text.includes(f.title), 'roadmap missing ' + f.title);
});

check('pricingAndFaq', async (b) => {
  const p = await open(b);
  assert((await p.textContent('#pricing')).includes('Price coming soon'), 'price copy missing');
  const first = p.locator('#faq details').first();
  assert(await p.locator('#faq details').count() >= 6, 'expected at least 6 FAQ items');
  await first.locator('summary').click();
  assert(await first.evaluate((d) => d.open), 'FAQ did not open');
});

check('waitlistHonestWithoutEndpoint', async (b) => {
  const p = await open(b);
  const external = [];
  p.on('request', (r) => { if (!r.url().startsWith('http://localhost')) external.push(r.url()); });
  const email = p.locator('#waitlist input[type=email]');
  await email.fill('bad');
  await p.locator('#waitlist button[type=submit]').click();
  assert(await email.evaluate((e) => !e.validity.valid), 'invalid email should fail validation');
  await email.fill('person@example.com');
  await p.locator('#waitlist button[type=submit]').click();
  await p.waitForTimeout(200);
  const status = await p.textContent('#waitlist [role=status]');
  assert(status.includes("Waitlist isn't connected yet"), 'honest not-connected message missing: ' + status);
  assert(!/you're on the list|thanks for joining/i.test(status), 'fake success shown');
  assert(external.length === 0, 'unexpected network requests: ' + external.join(','));
});

/* ---------- Task 5: responsive, dark, a11y ---------- */
check('narrowPhoneSidebarScrolls', async (b) => {
  const p = await open(b, { width: 320, height: 700 });
  const ov = await p.evaluate(() => getComputedStyle(document.querySelector('#explorer [role=tablist]')).overflowX);
  assert(ov === 'auto' || ov === 'scroll', 'tablist overflow-x is ' + ov);
  for (const id of ['images', 'search', 'duplicates', 'cleanup', 'clipboard']) {
    await p.evaluate((h) => { location.hash = h; }, '#feature-' + id);
    await p.waitForTimeout(100);
    const [sw, iw] = await p.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    assert(sw <= iw, `overflow at 320 on ${id}: ${sw} > ${iw}`);
  }
});

check('darkModeBackground', async (b) => {
  const p = await open(b, { scheme: 'dark' });
  const lum = await p.evaluate(() => {
    const [r, g, bl] = getComputedStyle(document.body).backgroundColor.match(/\d+/g).map(Number);
    return (0.2126 * r + 0.7152 * g + 0.0722 * bl) / 255;
  });
  assert(lum < 0.2, 'dark body luminance too high: ' + lum);
});

check('controlsHaveAccessibleNames', async (b) => {
  const p = await open(b);
  const tabs = p.locator('#explorer [role=tab]');
  const unnamed = [];
  for (let i = 0; i < 10; i++) {
    await tabs.nth(i).click();
    const bad = await p.evaluate(() => [...document.querySelectorAll('button, input, [role=tab], a[href]')]
      .filter((el) => el.offsetParent !== null)
      .filter((el) => {
        const label = el.getAttribute('aria-label') || el.textContent.trim() || el.getAttribute('title') ||
          (el.id && document.querySelector(`label[for="${el.id}"]`)?.textContent.trim()) ||
          el.closest('label')?.textContent.trim() || el.getAttribute('placeholder');
        return !label;
      }).map((el) => el.outerHTML.slice(0, 80)));
    unnamed.push(...bad);
  }
  assert(unnamed.length === 0, 'unnamed controls: ' + [...new Set(unnamed)].slice(0, 5).join(' || '));
});

/* ---------- Final review fixes ---------- */
check('filterKeepsKeyboardPath', async (b) => {
  const p = await open(b);
  await p.fill('#explorer .ex-filter input', 'clip');
  await p.focus('#explorer .ex-filter input');
  await p.keyboard.press('Tab');
  const id = await p.evaluate(() => document.activeElement.id);
  assert(id === 'tab-clipboard', 'Tab from filter should reach first visible match, got #' + id);
});

check('paneNotLiveAndSearchCyclePausable', async (b) => {
  const p = await open(b, { hash: '#feature-search' });
  assert(await p.getAttribute('#ex-pane', 'aria-live') === null, '#ex-pane must not be a live region');
  const btn = p.locator('#explorer .demo-search .d-cycle');
  assert(await btn.count() === 1, 'pause/play control for auto-cycling missing');
  assert(await btn.getAttribute('aria-pressed') !== null, 'cycle control needs aria-pressed');
});

check('textContrastAA', async (b) => {
  for (const scheme of ['light', 'dark']) {
    const p = await open(b, { scheme, hash: '#feature-search' });
    const bad = await p.evaluate(() => {
      const rgb = (c) => c.match(/[\d.]+/g).slice(0, 4).map(Number);
      const lum = ([r, g, b]) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
        .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
      const bgOf = (el) => {
        const layers = [];
        for (let n = el; n; n = n.parentElement) {
          const c = rgb(getComputedStyle(n).backgroundColor);
          if ((c[3] ?? 1) > 0) { layers.push(c); if ((c[3] ?? 1) >= 1) break; }
        }
        let out = [255, 255, 255];
        for (const c of layers.reverse()) { const a = c[3] ?? 1; out = out.map((v, i) => v * (1 - a) + c[i] * a); }
        return out;
      };
      const ratio = (el) => {
        const fg = rgb(getComputedStyle(el).color), bg = bgOf(el);
        const a = fg[3] ?? 1; const f = fg.slice(0, 3).map((v, i) => v * a + bg[i] * (1 - a));
        const [l1, l2] = [lum(f), lum(bg)].sort((x, y) => y - x);
        return (l1 + 0.05) / (l2 + 0.05);
      };
      const sels = ['.ex-demo-note', '.ex-group-label', '.ex-tab-rel', '.d-label', '.badge-launch', '.btn', '[role=tab][aria-selected=true]', '.d-results mark'];
      const fails = [];
      for (const s of sels) {
        const el = document.querySelector(s);
        if (!el) { fails.push(s + ' (missing)'); continue; }
        const r = ratio(el);
        if (r < 4.5) fails.push(`${s} ${r.toFixed(2)}`);
      }
      return fails;
    });
    assert(bad.length === 0, `${scheme}: low contrast: ` + bad.join(', '));
    for (const [hash, sel] of [['#feature-duplicates', '.ex-pane .badge-soon'], ['#feature-search', '.ex-pane .badge-launch']]) {
      await p.evaluate((h) => { location.hash = h; }, hash);
      await p.waitForTimeout(100);
      const r = await p.evaluate((s) => {
        const el = document.querySelector(s);
        const rgb = (c) => c.match(/[\d.]+/g).map(Number);
        const lum = ([r, g, b]) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
        const pane = rgb(getComputedStyle(document.querySelector('.ex-window')).backgroundColor);
        const bgc = rgb(getComputedStyle(el).backgroundColor); const a = bgc[3] ?? 1;
        const bg = pane.slice(0, 3).map((v, i) => v * (1 - a) + bgc[i] * a);
        const [l1, l2] = [lum(rgb(getComputedStyle(el).color)), lum(bg)].sort((x, y) => y - x);
        return (l1 + 0.05) / (l2 + 0.05);
      }, sel);
      assert(r >= 4.5, `${scheme}: ${sel} contrast ${r.toFixed(2)}`);
    }
  }
});

check('sampleResultsNotCalledReal', async (b) => {
  const p = await open(b, { hash: '#feature-search' });
  assert(!(await p.textContent('#explorer .ex-demo')).includes('Real files'), 'sample results labelled as real files');
});

check('roadmapLinkToCurrentFeatureScrolls', async (b) => {
  const p = await open(b, { hash: '#feature-images' });
  await p.locator('#roadmap a', { hasText: 'Smart Image Viewer' }).scrollIntoViewIfNeeded();
  await p.locator('#roadmap a', { hasText: 'Smart Image Viewer' }).click();
  await p.waitForTimeout(200);
  const top = await p.evaluate(() => document.getElementById('explore').getBoundingClientRect().top);
  assert(Math.abs(top) < 120, 'roadmap link did not scroll to explorer, top=' + top);
});

check('mobileSelectedPillVisible', async (b) => {
  const p = await open(b, { width: 320, height: 700, hash: '#feature-clipboard' });
  await p.waitForTimeout(200);
  const [tl, tr, bl, br] = await p.evaluate(() => {
    const t = document.querySelector('#tab-clipboard').getBoundingClientRect();
    const l = document.querySelector('#explorer [role=tablist]').getBoundingClientRect();
    return [t.left, t.right, l.left, l.right];
  });
  assert(tl >= bl - 1 && tr <= br + 1, `selected pill outside tablist: ${tl}-${tr} vs ${bl}-${br}`);
});

check('trustCopyConsistentWithFaq', async (b) => {
  const p = await open(b);
  const t = await p.textContent('#trust');
  assert(!/search, storage and cleanup work fully/.test(t), 'trust note claims AI-less search fully works, contradicting FAQ');
});

/* ---------- Artifact publishing ---------- */
check('contentVisibleAtRestAndThemeToggle', async (b) => {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); // motion allowed
  const p = await ctx.newPage();
  await p.goto(URL);
  const hidden = await p.evaluate(() => [...document.querySelectorAll('.reveal')].filter((el) => getComputedStyle(el).opacity === '0').length);
  assert(hidden === 0, hidden + ' sections start invisible');
  await p.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
  assert(bg === 'rgb(14, 15, 18)', 'data-theme=dark not applied, body bg ' + bg);
  await ctx.close();
});

/* ---------- Homy-style home ---------- */
const seg = (p) => p.textContent('#explorer .demo-library .d-seg [aria-pressed=true]');

check('homeGreetingAndSections', async (b) => {
  const p = await open(b, { hash: '#feature-home' });
  assert(/Good (morning|afternoon|evening)/.test(await p.textContent('#explorer .hm-greet')), 'greeting missing');
  assert(await p.locator('#explorer .hm-folder').count() === 6, 'expected 6 library folders');
  assert(await p.locator('#explorer .hm-clean').count() === 4, 'expected 4 clean-up cards');
  assert(await p.locator('#explorer .hm-src').count() === 5, 'expected 5 downloaded-from cards');
  assert(!/unused/i.test(await p.textContent('#explorer .ex-demo')), 'home uses "unused" wording');
});

check('homeFolderOpensLibraryFiltered', async (b) => {
  const p = await open(b, { hash: '#feature-home' });
  await p.locator('#explorer .hm-folder', { hasText: 'Videos' }).click();
  assert((await paneTitle(p)).trim() === 'Visual Library', 'folder did not open Visual Library');
  assert((await seg(p)).trim() === 'Videos', 'library not filtered to Videos');
  const shown = await p.locator('#explorer .d-lib figure:visible').count();
  const vids = await p.locator('#explorer .d-lib figure[data-k="Videos"]:visible').count();
  assert(shown > 0 && shown === vids, 'non-video items visible');
});

check('homeCleanupCardsOpenFeatures', async (b) => {
  const p = await open(b, { hash: '#feature-home' });
  await p.locator('#explorer .hm-clean', { hasText: 'Duplicates' }).click();
  assert((await paneTitle(p)).trim() === 'Duplicate Finder', 'duplicates card wrong target');
  await p.evaluate(() => { location.hash = '#feature-home'; });
  await p.waitForTimeout(100);
  await p.locator('#explorer .hm-clean', { hasText: 'Large Files' }).click();
  assert((await paneTitle(p)).trim() === 'Storage Intelligence', 'large files card wrong target');
});

check('sidebarLocationsAndMetrics', async (b) => {
  const p = await open(b);
  assert((await p.textContent('#tab-cleanup .ex-tab-meta')).trim() === '14.1 GB', 'cleanup metric missing');
  assert((await p.textContent('#tab-storage .ex-tab-meta')).trim() === '10', 'large-files badge missing');
  await p.locator('#explorer .ex-loc', { hasText: 'Downloads' }).click();
  assert((await paneTitle(p)).trim() === 'Visual Library', 'location did not open library');
  assert((await p.textContent('#explorer .demo-library')).includes('In Downloads'), 'location filter chip missing');
});

check('toolbarSearchOpensPalette', async (b) => {
  const p = await open(b);
  await p.locator('#explorer .ex-search').click();
  assert(await p.locator('#palette').isVisible(), 'toolbar search did not open palette');
});

/* ---------- MacSprint: Graphite & Glass ---------- */
check('noOldBrandName', async (b) => {
  const p = await open(b);
  const t = await p.evaluate(() => document.body.innerText + document.title);
  assert(!/MacMate/.test(t), 'old name MacMate still visible');
  assert(t.includes('MacSprint'), 'MacSprint missing');
});

check('heroTrustStrip', async (b) => {
  const p = await open(b);
  const t = await p.textContent('#overview .trust');
  for (const s of ['No account', 'iCloud-only files never downloaded', 'Trash']) assert(t.includes(s), 'trust strip missing ' + s);
});

check('compareTableRows', async (b) => {
  const p = await open(b);
  assert(await p.locator('#compare .vrow-item').count() >= 6, 'expected at least 6 comparison rows');
  assert((await p.textContent('#compare')).includes('Finder'), 'compare must mention Finder');
});

check('shortcutsSection', async (b) => {
  const p = await open(b);
  assert(await p.locator('#shortcuts .keygroup').count() === 3, 'expected 3 shortcut groups');
  assert(await p.locator('#shortcuts kbd').count() >= 15, 'expected keycaps');
});

check('sidebarIndicatorFollowsSelection', async (b) => {
  const p = await open(b);
  await p.locator('#tab-clipboard').click();
  await p.waitForTimeout(600);
  const [it, tt] = await p.evaluate(() => {
    const i = document.querySelector('#explorer .ex-indicator').getBoundingClientRect();
    const t = document.querySelector('#tab-clipboard').getBoundingClientRect();
    return [Math.round(i.top), Math.round(t.top)];
  });
  assert(Math.abs(it - tt) <= 2, `indicator at ${it}, tab at ${tt}`);
});

check('searchDemoFilterBar', async (b) => {
  const p = await open(b, { hash: '#feature-search' });
  const t = await p.textContent('#explorer .demo-search .d-filterbar');
  for (const k of ['Kind:', 'Date:', 'Sort:']) assert(t.includes(k), 'filter bar missing ' + k);
  assert((await p.textContent('#explorer .demo-search')).includes('Understood as'), 'Understood as missing');
});

check('libraryFoldersAreFolderIcons', async (b) => {
  const p = await open(b, { hash: '#feature-home' });
  assert(await p.locator('#explorer .hm-folder .fd-front').count() === 6, 'folders should use macOS folder icon');
});

/* ---------- runner ---------- */
const filter = process.argv[2];
const server = await startServer();
const browser = await playwright.chromium.launch();
let failed = 0;
for (const c of checks) {
  if (filter && !c.name.toLowerCase().includes(filter.toLowerCase())) continue;
  try { await c.fn(browser); console.log('PASS', c.name); }
  catch (e) { failed++; console.log('FAIL', c.name, '-', e.message.split('\n')[0]); }
}
await browser.close();
server.kill();
console.log(failed ? `${failed} failed` : 'all passed');
process.exit(failed ? 1 : 0);
