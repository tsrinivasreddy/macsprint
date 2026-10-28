// Builds ./site for Cloudflare: the public website only (no tests, design or docs),
// with the waitlist form pointed at the Worker's /api/waitlist endpoint.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'site');
rmSync(out, { recursive: true, force: true });
mkdirSync(out);
cpSync(join(root, 'styles.css'), join(out, 'styles.css'));
cpSync(join(root, 'js'), join(out, 'js'), { recursive: true });
cpSync(join(root, 'assets'), join(out, 'assets'), { recursive: true });
const html = readFileSync(join(root, 'index.html'), 'utf8').replace('data-endpoint=""', 'data-endpoint="/api/waitlist"');
if (!html.includes('data-endpoint="/api/waitlist"')) throw new Error('waitlist form not found in index.html');
writeFileSync(join(out, 'index.html'), html);
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /api/\n');
console.log('built site/');
