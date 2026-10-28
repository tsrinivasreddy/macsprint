// MacSprint website on Cloudflare Workers: serves the static site and the waitlist API.
//
//   POST /api/waitlist          { "email": "…" }  → saves to D1, emails the owner (and the subscriber, if enabled)
//   GET  /api/waitlist/export   ?key=EXPORT_KEY   → CSV of every sign-up, opens in Excel
//   GET  /api/waitlist/test-email ?key=EXPORT_KEY → sends one test email to NOTIFY_TO and shows the result
//
// Bindings (wrangler.jsonc): ASSETS (static site), DB (D1), EMAIL (send_email, free via Email Routing).
// Variables: MAIL_FROM (an address on your domain), NOTIFY_TO (your inbox, verified in Email Routing). Secrets: EXPORT_KEY, DISCORD_WEBHOOK (optional).
// Email Routing can only send to addresses you have verified, so the alert goes to you and subscribers get no email.

import { EmailMessage } from 'cloudflare:email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/waitlist' && request.method === 'POST') return join(request, env, ctx);
    if (url.pathname === '/api/waitlist/export' && request.method === 'GET') return exportCsv(url, request, env);
    if (url.pathname === '/api/waitlist/test-email' && request.method === 'GET') return testEmail(url, request, env);
    if (url.pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function join(request, env, ctx) {
  // Only accept posts from our own pages.
  const origin = request.headers.get('Origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'Forbidden' }, 403);

  let email = '';
  try {
    const type = request.headers.get('Content-Type') || '';
    email = type.includes('application/json') ? (await request.json()).email : (await request.formData()).get('email');
  } catch { return json({ error: 'Bad request' }, 400); }
  email = String(email || '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return json({ error: 'Please enter a valid email address.' }, 400);

  const now = new Date().toISOString();
  const country = request.cf?.country || '';
  const result = await env.DB.prepare('INSERT OR IGNORE INTO signups (email, created_at, country) VALUES (?, ?, ?)')
    .bind(email, now, country).run();
  const isNew = result.meta.changes === 1;

  // Emails go out after the response, so a slow mail server never delays the visitor.
  if (isNew) ctx.waitUntil(notify(env, email, now, country));
  return json({ ok: true, already: !isNew });
}

// Email Routing's send_email binding takes a raw message; plain text only, so the MIME is built by hand.
const b64 = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str)));
function rawMessage({ from, fromName, to, subject, text }) {
  const header = (v) => v.replace(/[\r\n]+/g, ' ');
  const body = b64(text).replace(/.{1,76}/g, '$&\r\n');
  return [
    `From: =?UTF-8?B?${b64(fromName)}?= <${header(from)}>`,
    `To: ${header(to)}`,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@${from.split('@')[1]}>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
}
const sendMail = (env, { to, subject, text }) =>
  env.EMAIL.send(new EmailMessage(env.MAIL_FROM, to, rawMessage({ from: env.MAIL_FROM, fromName: 'MacSprint waitlist', to, subject, text })));

// Phone alert: a Discord channel webhook (free). The URL is a secret named DISCORD_WEBHOOK; leave it unset to skip.
async function sendDiscord(env, content) {
  if (!env.DISCORD_WEBHOOK) return;
  const res = await fetch(env.DISCORD_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'MacSprint waitlist', content, allowed_mentions: { parse: [] } }) });
  if (!res.ok) throw new Error(`Discord returned ${res.status}`);
}

async function notify(env, email, when, country) {
  const { count } = await env.DB.prepare('SELECT COUNT(*) AS count FROM signups').first();
  await Promise.allSettled([
    sendDiscord(env, `New waitlist sign-up: **${email.replace(/[*_`~|>\\]/g, '\\$&')}**${country ? ` (${country})` : ''}. Total: ${count}.`),
    emailOwner(env, email, when, country, count),
  ]).then((rs) => rs.forEach((r) => r.status === 'rejected' && console.error('waitlist alert failed', r.reason?.code || '', r.reason?.message || r.reason)));
}

async function emailOwner(env, email, when, country, count) {
  if (!env.NOTIFY_TO) return;
  await sendMail(env, {
    to: env.NOTIFY_TO,
    subject: `New waitlist sign-up: ${email}`,
    text: `${email} joined the MacSprint waitlist on ${when}${country ? ` (${country})` : ''}.\n\nTotal sign-ups: ${count}.\nDownload the list for Excel: https://macsprint.com/api/waitlist/export?key=… (use your export key)`,
  });
}

const authorized = (url, request, env) => {
  const key = url.searchParams.get('key') || (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  return Boolean(env.EXPORT_KEY) && timingSafeEqual(key, env.EXPORT_KEY);
};

// Sends one email the same way a sign-up does and reports Cloudflare's answer, so a setup problem
// (domain not onboarded, plan without Email Sending, unverified address) shows up as a readable code.
async function testEmail(url, request, env) {
  if (!authorized(url, request, env)) return json({ error: 'Unauthorized' }, 401);
  const setup = { MAIL_FROM: env.MAIL_FROM || null, NOTIFY_TO: env.NOTIFY_TO || null, EMAIL_binding: Boolean(env.EMAIL), DISCORD_WEBHOOK: Boolean(env.DISCORD_WEBHOOK) };
  const discord = await sendDiscord(env, 'Test from MacSprint: waitlist alerts reach this channel.').then(() => (env.DISCORD_WEBHOOK ? 'sent' : 'not set up'), (e) => `failed: ${e.message}`);
  if (!env.EMAIL || !env.MAIL_FROM || !env.NOTIFY_TO) return json({ ok: false, setup, discord, error: 'Missing EMAIL binding, MAIL_FROM or NOTIFY_TO' }, 500);
  try {
    await sendMail(env, { to: env.NOTIFY_TO, subject: 'MacSprint waitlist: test email', text: 'If you can read this, waitlist emails work.' });
    return json({ ok: true, setup, discord });
  } catch (e) {
    return json({ ok: false, setup, discord, code: e?.code || null, error: e?.message || String(e) }, 502);
  }
}

async function exportCsv(url, request, env) {
  if (!authorized(url, request, env)) return json({ error: 'Unauthorized' }, 401);
  const { results } = await env.DB.prepare('SELECT email, created_at, country FROM signups ORDER BY created_at').all();
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  // A byte-order mark makes Excel read the file as UTF-8.
  const csv = '﻿' + ['Email,Joined (UTC),Country', ...results.map((r) => [r.email, r.created_at, r.country].map(cell).join(','))].join('\r\n');
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="macsprint-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`, 'Cache-Control': 'no-store' } });
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
