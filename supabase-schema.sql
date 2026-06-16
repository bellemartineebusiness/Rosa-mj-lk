-- ══════════════════════════════════════════════════════════
-- Belle Martinée SaaS — komplett schema
-- Kör hela filen i Supabase → SQL Editor (idempotent)
-- ══════════════════════════════════════════════════════════

-- ── customers ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS customers (
  id                       uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
  email                    text    NOT NULL UNIQUE,
  stripe_customer_id       text    UNIQUE,
  subscription_status      text    NOT NULL DEFAULT 'inactive',
  messages_used_this_month integer NOT NULL DEFAULT 0,
  last_reset_month         text    NOT NULL DEFAULT to_char(now(), 'YYYY-MM'),
  created_at               timestamptz DEFAULT now()
);

-- Migration: lägg till nya kolumner utan att förstöra befintlig data
ALTER TABLE customers ADD COLUMN IF NOT EXISTS messages_used_this_month integer NOT NULL DEFAULT 0;
ALTER TABLE customers ADD COLUMN IF NOT EXISTS last_reset_month text NOT NULL DEFAULT to_char(now(), 'YYYY-MM');

-- ── bot_settings (ersätter bot_config + Prisma CustomerSettings) ──
CREATE TABLE IF NOT EXISTS bot_settings (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id   uuid REFERENCES customers(id) ON DELETE CASCADE UNIQUE,
  company_name  text NOT NULL DEFAULT '',
  opening_hours text NOT NULL DEFAULT '',
  prices        text NOT NULL DEFAULT '',
  phone         text NOT NULL DEFAULT '',
  address       text NOT NULL DEFAULT '',
  system_prompt text NOT NULL DEFAULT '',
  tone          text NOT NULL DEFAULT 'friendly',
  updated_at    timestamptz DEFAULT now()
);

-- ── knowledge_base (ersätter Prisma KnowledgeBase) ────────
CREATE TABLE IF NOT EXISTS knowledge_base (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  title       text NOT NULL,
  content     text NOT NULL,
  created_at  timestamptz DEFAULT now()
);

-- ── leads (bokningar + leads från chattbot) ───────────────
CREATE TABLE IF NOT EXISTS leads (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  action      text,
  name        text,
  email       text,
  phone       text,
  date        text,
  time        text,
  status      text NOT NULL DEFAULT 'active',
  created_at  timestamptz DEFAULT now()
);

-- Migration: lägg till kolumner om de inte finns
ALTER TABLE leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes text;

-- Förhindra dubbelbokningar på databasnivå (lager 1 — constraint)
CREATE UNIQUE INDEX IF NOT EXISTS leads_no_double_booking
  ON leads (customer_id, date, time)
  WHERE action = 'booking' AND status = 'active';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS notification_email text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS slack_webhook text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS google_calendar_refresh_token text;
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS contact_email text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS sales_email text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS support_email text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS payment_info text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS delivery_info text NOT NULL DEFAULT '';
ALTER TABLE bot_settings ADD COLUMN IF NOT EXISTS guarantee_info text NOT NULL DEFAULT '';

-- ── Row Level Security (ingen publik access — bara service role) ──
ALTER TABLE customers      ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_settings   ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads           ENABLE ROW LEVEL SECURITY;

-- Explicit grants för service_role (krävs när RLS är på)
GRANT ALL ON customers      TO service_role;
GRANT ALL ON bot_settings   TO service_role;
GRANT ALL ON knowledge_base TO service_role;
GRANT ALL ON leads           TO service_role;
