// Browser checks for the MacMate site. Run: node tests/check.mjs [name-filter]
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
  assert(h1 && h1.includes('MacMate AI'), 'h1 missing MacMate AI: ' + h1);
  const body = await p.textContent('body');
  assert(body.includes('Your Mac. Smarter, Faster, Cleaner.'), 'tagline missing');
  assert(await p.locator('#overview a[href="#waitlist"]').count() > 0, 'hero CTA to #waitlist missing');
  for (const id of ['overview', 'problems', 'explore', 'privacy', 'trust', 'roadmap', 'pricing', 'faq', 'waitlist']) {
    assert(await p.locator('#' + id).count() === 1, 'missing section #' + id);
  }
});

/* ---------- Task 2: explorer ---------- */
const getFeatures = (p) => p.evaluate(async () => (await import('/js/features.js')).FEATURES.map((f) => ({ id: f.id, title: f.title })));
const paneTitle = (p) => p.textContent('#explorer .ex-pane h3');

check('explorerTabsSelectEachFeature', async (b) => {
  const p = await open(b);
  const features = await getFeatures(p);
  assert(features.length === 16, 'expected 16 features, got ' + features.length);
  const tabs = p.locator('#explorer [role=tab]');
  assert(await tabs.count() === 16, 'expected 16 tabs, got ' + await tabs.count());
  for (let i = 0; i < 16; i++) {
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
  let p = await open(b, { hash: '#explore/duplicates' });
  assert((await paneTitle(p)).trim() === 'Duplicate Finder', 'deep link to duplicates failed');
  p = await open(b, { hash: '#explore/nope' });
  assert((await paneTitle(p)).trim() === 'Home Dashboard', 'unknown hash did not fall back to home');
  assert(p.errors.length === 0, 'errors: ' + p.errors.join(' | '));
  await p.locator('#explorer [role=tab]', { hasText: 'Clipboard History' }).click();
  assert(await p.evaluate(() => location.hash) === '#explore/clipboard', 'hash not mirrored');
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
