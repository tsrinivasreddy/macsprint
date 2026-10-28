// MacSprint website on Cloudflare Workers: serves the static site and the waitlist API.
//
//   POST /api/waitlist          { "email": "…" }  → saves to D1, emails the owner (and the subscriber, if enabled)
//   GET  /api/waitlist/export   ?key=EXPORT_KEY   → CSV of every sign-up, opens in Excel
//
// Bindings (wrangler.jsonc): ASSETS (static site), DB (D1), EMAIL (send_email).
// Variables: MAIL_FROM, NOTIFY_TO, SEND_CONFIRMATION ("true" / "false"). Secret: EXPORT_KEY.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === '/api/waitlist' && request.method === 'POST') return join(request, env, ctx);
    if (url.pathname === '/api/waitlist/export' && request.method === 'GET') return exportCsv(url, request, env);
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

async function notify(env, email, when, country) {
  const sends = [];
  if (env.NOTIFY_TO) {
    const { count } = await env.DB.prepare('SELECT COUNT(*) AS count FROM signups').first();
    sends.push(env.EMAIL.send({
      from: { name: 'MacSprint waitlist', email: env.MAIL_FROM },
      to: env.NOTIFY_TO,
      subject: `New waitlist sign-up: ${email}`,
      text: `${email} joined the MacSprint waitlist on ${when}${country ? ` (${country})` : ''}.\n\nTotal sign-ups: ${count}.\nDownload the list for Excel: https://macsprint.com/api/waitlist/export?key=… (use your export key)`,
    }));
  }
  if (env.SEND_CONFIRMATION === 'true') {
    sends.push(env.EMAIL.send({
      from: { name: 'MacSprint', email: env.MAIL_FROM },
      to: email,
      subject: "You're on the MacSprint waitlist",
      text: "Thanks for joining the MacSprint waitlist.\n\nWe'll email you once, when MacSprint is ready. No spam, and we never share your address.\n\nIf you didn't sign up, you can ignore this email.",
      html: "<p>Thanks for joining the <b>MacSprint</b> waitlist.</p><p>We'll email you once, when MacSprint is ready. No spam, and we never share your address.</p><p style=\"color:#5f6068\">If you didn't sign up, you can ignore this email.</p>",
    }));
  }
  const results = await Promise.allSettled(sends);
  for (const r of results) if (r.status === 'rejected') console.error('waitlist email failed', r.reason?.code || '', r.reason?.message || r.reason);
}

async function exportCsv(url, request, env) {
  const key = url.searchParams.get('key') || (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!env.EXPORT_KEY || !timingSafeEqual(key, env.EXPORT_KEY)) return json({ error: 'Unauthorized' }, 401);
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
