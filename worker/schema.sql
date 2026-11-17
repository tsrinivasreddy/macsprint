-- Waitlist sign-ups. Run once: npx wrangler d1 execute macsprint-waitlist --remote --file=worker/schema.sql
CREATE TABLE IF NOT EXISTS signups (
  email TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  country TEXT
);

-- Feature requests from the website form (POST /api/requests).
CREATE TABLE IF NOT EXISTS feature_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL,
  idea TEXT NOT NULL,
  details TEXT,
  area TEXT,
  email TEXT,
  country TEXT
);
