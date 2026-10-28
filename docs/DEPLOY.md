# Deploy macsprint.com on Cloudflare

The site and the waitlist run as one Cloudflare Worker (`wrangler.jsonc`):

- **Static site**: `tools/build-site.mjs` copies `index.html`, `styles.css` and `js/` into `site/` and points the waitlist form at `/api/waitlist`.
- **Waitlist API** (`worker/index.js`):
  - `POST /api/waitlist` saves the email in D1 and emails you about every new sign-up. Subscribers get no email, because the free Email Routing can only send to addresses you have verified.
  - `GET /api/waitlist/export?key=YOUR_EXPORT_KEY` downloads every sign-up as a CSV file that opens in Excel.

Nothing here needs a third-party service or a paid plan: storage is Cloudflare D1 and email is Cloudflare Email Routing.

## One-time setup (about 15 minutes, in the Cloudflare dashboard)

1. **Domain.** `macsprint.com` must be a domain in your Cloudflare account. Buy it in **Domain Registration**, or add an existing domain and switch its nameservers to Cloudflare.
2. **Database.** **Storage & Databases → D1 → Create**, name it `macsprint-waitlist`. Open its **Console** and run the SQL in `worker/schema.sql`. Copy the **Database ID**.
3. **Email.** **Email → Email Routing → Destination addresses → Add** your own inbox and click the verification link Cloudflare emails you. Turn on Email Routing for macsprint.com (it adds the DNS records).
4. **Config.** In `wrangler.jsonc`, `database_id` must be your D1 id. After the first deploy, open the Worker → **Settings → Variables and secrets → Add → Text**: name `NOTIFY_TO`, value your verified inbox. Then open `https://macsprint.com/api/waitlist/test-email?key=YOUR_EXPORT_KEY` to send a test email.
5. **Deploy from GitHub.** **Workers & Pages → Create → Import a repository → tsrinivasreddy/macsprint**. Build command: `node tools/build-site.mjs`. Deploy command: `npx wrangler deploy`. Every push to `main` then redeploys.
6. **Export key.** After the first deploy: the Worker → **Settings → Variables and secrets → Add → Secret**, name `EXPORT_KEY`, value: a long random password only you know.

`macsprint.com` and `www.macsprint.com` are attached automatically by the `routes` in `wrangler.jsonc`.

## Using it

- **New sign-ups**: you get an email for each one, with the running total.
- **Excel**: open `https://macsprint.com/api/waitlist/export?key=YOUR_EXPORT_KEY` and the file downloads (`macsprint-waitlist-YYYY-MM-DD.csv`); double-click to open in Excel. Keep the link private.
- **Duplicates**: signing up twice is recognised; the person sees “You're already on the list” and no second email is sent.

## Test locally

```
npx wrangler d1 execute macsprint-waitlist --local --file=worker/schema.sql
npx wrangler dev --var EXPORT_KEY:test --var NOTIFY_TO:you@example.com
```

Local runs simulate email: Wrangler prints where each message was written instead of sending it.
