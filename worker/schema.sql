-- Waitlist sign-ups. Run once: npx wrangler d1 execute macsprint-waitlist --remote --file=worker/schema.sql
CREATE TABLE IF NOT EXISTS signups (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  country TEXT
);
