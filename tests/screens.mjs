// Captures full-page screenshots (desktop/mobile × light/dark) into screenshots/.
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node-tools/node_modules/playwright'); }

const server = spawn('python3', ['-m', 'http.server', '8766', '--bind', '127.0.0.1'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 600));
mkdirSync('screenshots', { recursive: true });
const browser = await playwright.chromium.launch();
const extra = process.argv.slice(2); // optional feature ids for explorer close-ups
for (const [w, h, tag] of [[1440, 900, 'desktop'], [390, 844, 'mobile']]) {
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme, reducedMotion: 'reduce', deviceScaleFactor: tag === 'mobile' ? 2 : 1 });
    const p = await ctx.newPage();
    await p.goto('http://localhost:8766/');
    await p.screenshot({ path: `screenshots/${tag}-${scheme}.png`, fullPage: true });
    for (const id of extra) {
      await p.goto(`http://localhost:8766/#feature-${id}`);
      await p.waitForTimeout(300);
      await p.locator('#explorer').screenshot({ path: `screenshots/explore-${id}-${tag}-${scheme}.png` });
    }
    await ctx.close();
  }
}
await browser.close();
server.kill();
console.log('screenshots written');
