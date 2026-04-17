-- =============================================================================
-- Student Mental Health & Wellness Tracker
-- Supabase Schema — S2-DEV-01
-- File: /supabase/schema.sql
-- =============================================================================

-- ---------------------------------------------------------------------------
-- SECTION 1: EXTENSIONS
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- SECTION 2: TABLES
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.mood_logs (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    mood_score       INT         NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
    note             TEXT,
    sleep_quality    INT         CHECK (sleep_quality BETWEEN 1 AND 10),
    academic_impact  TEXT        CHECK (academic_impact IN ('very_negative', 'negative', 'neutral', 'positive', 'very_positive')),
    logged_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.journal_entries (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    title       TEXT        NOT NULL,
    body        TEXT        NOT NULL,
    tags        TEXT[]      NOT NULL DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.wellness_goals (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    goal             TEXT        NOT NULL,
    target_date      DATE,
    status           TEXT        NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
    progress_percent INT         DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    progress_notes   TEXT,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.resources (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title      TEXT        NOT NULL,
    url        TEXT        NOT NULL CHECK (url ~* '^https?://'),
    tags       TEXT[]      NOT NULL DEFAULT '{}',
    added_by   UUID        REFERENCES auth.users (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- SECTION 3: INDEXES & CONSTRAINTS
-- ---------------------------------------------------------------------------

CREATE UNIQUE INDEX IF NOT EXISTS idx_mood_logs_daily          ON public.mood_logs (user_id, ((logged_at AT TIME ZONE 'UTC')::DATE));
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_logged_at        ON public.mood_logs (user_id, logged_at DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_created_at ON public.journal_entries (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entries_tags            ON public.journal_entries USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_wellness_goals_user_status      ON public.wellness_goals (user_id, status);
CREATE INDEX IF NOT EXISTS idx_wellness_goals_target_date      ON public.wellness_goals (target_date);
CREATE INDEX IF NOT EXISTS idx_resources_tags                  ON public.resources USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_resources_created_at            ON public.resources (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_resources_added_by              ON public.resources (added_by);

-- ---------------------------------------------------------------------------
-- SECTION 4: UPDATED_AT AUTO-MAINTENANCE
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_mood_logs_updated_at
    BEFORE UPDATE ON public.mood_logs
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_wellness_goals_updated_at
    BEFORE UPDATE ON public.wellness_goals
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE TRIGGER trg_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();