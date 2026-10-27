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
