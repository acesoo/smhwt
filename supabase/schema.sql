-- =============================================================================
-- Student Mental Health & Wellness Tracker
-- Supabase Schema — S2-DEV-01
-- File: /supabase/schema.sql
-- Description: Creates all application tables with FK relationships to
--              auth.users, Postgres array tags, KM-extended columns,
--              and Row Level Security policies.
-- Run this entire script in: Supabase Dashboard → SQL Editor → New Query
-- =============================================================================


-- ---------------------------------------------------------------------------
-- SECTION 1: EXTENSIONS
-- ---------------------------------------------------------------------------

-- pgcrypto is declared for other cryptographic helpers it provides (e.g.,
-- pgp_sym_encrypt). NOTE: gen_random_uuid() does NOT require this extension —
-- it is built into PostgreSQL 13+ natively and is available in Supabase
-- (PG15) without any extension.
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ---------------------------------------------------------------------------
-- SECTION 2: TABLES
-- ---------------------------------------------------------------------------

-- NOTE: Supabase manages the `auth.users` table internally. We do NOT create
--       a separate public `users` table — we reference auth.users directly
--       via foreign keys. If you need to store extra profile data per user,
--       add a `profiles` table (not required by the current sprint scope).


-- 2.1  mood_logs
-- Captures a daily mood snapshot. Extended per KM architecture to include
-- sleep_quality and academic_impact so the app can surface correlations.
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mood_logs (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,

    -- Core mood capture
    mood_score       INT         NOT NULL CHECK (mood_score BETWEEN 1 AND 10),
    note             TEXT,

    -- KM Architecture extensions: correlation tracking
    sleep_quality    INT         CHECK (sleep_quality BETWEEN 1 AND 10),  -- 1 (poor) → 10 (excellent)
    academic_impact  TEXT        CHECK (academic_impact IN (
                                    'very_negative',
                                    'negative',
                                    'neutral',
                                    'positive',
                                    'very_positive'
                                 )),                                       -- enumerated scale for structured retrieval

    logged_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.mood_logs IS 'Daily mood entries with sleep and academic correlation fields (KM architecture requirement).';
COMMENT ON COLUMN public.mood_logs.mood_score      IS 'Subjective mood rating on a 1-10 scale.';
COMMENT ON COLUMN public.mood_logs.sleep_quality   IS 'Perceived sleep quality on a 1-10 scale (1 = very poor, 10 = excellent).';
COMMENT ON COLUMN public.mood_logs.academic_impact IS 'Self-reported academic impact of mood: very_negative | negative | neutral | positive | very_positive.';


-- 2.2  journal_entries
-- Free-form reflective journal with a tag array to support the KM taxonomy
-- (e.g., #TestStress, #ActiveCoping).
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.journal_entries (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,

    title       TEXT        NOT NULL,
    body        TEXT        NOT NULL,

    -- Postgres native array: stores taxonomy tags such as '#TestStress', '#ActiveCoping'
    tags        TEXT[]      NOT NULL DEFAULT '{}',

    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.journal_entries IS 'Reflective journal entries. Tags use the project KM taxonomy (e.g., #TestStress, #ActiveCoping).';
COMMENT ON COLUMN public.journal_entries.tags IS 'Postgres text array. Populated from the KM taxonomy defined in /docs/km-architecture.md.';


-- 2.3  wellness_goals
-- Goal tracker. Status is constrained to a fixed vocabulary so the UI and
-- queries remain predictable. Progress fields are required by S3-DEV-04:
-- "mark progress" cannot be built without a column to write that data into.
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.wellness_goals (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id          UUID        NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,

    goal             TEXT        NOT NULL,
    target_date      DATE,
    status           TEXT        NOT NULL DEFAULT 'active'
                                 CHECK (status IN ('active', 'completed', 'abandoned')),

    -- FIX (Issue B): progress fields required by S3-DEV-04 ("mark progress")
    progress_percent INT         CHECK (progress_percent BETWEEN 0 AND 100),
    progress_notes   TEXT,

    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.wellness_goals IS 'User-defined wellness goals with lifecycle status and progress tracking.';
COMMENT ON COLUMN public.wellness_goals.status           IS 'Goal lifecycle state: active | completed | abandoned.';
COMMENT ON COLUMN public.wellness_goals.progress_percent IS 'Optional numeric progress indicator (0-100%).';
COMMENT ON COLUMN public.wellness_goals.progress_notes   IS 'Optional free-text progress update or milestone note.';


-- 2.4  resources
-- Curated mental health articles and tools. Tags follow the same KM taxonomy
-- as journal_entries, enabling cross-feature tag-based filtering.
-- added_by references the user who curated the resource (nullable so
-- seed/admin rows can be inserted without a user context).
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.resources (
    id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    title      TEXT        NOT NULL,
    url        TEXT        NOT NULL,

    -- Same taxonomy tag array as journal_entries for unified tag filtering
    tags       TEXT[]      NOT NULL DEFAULT '{}',

    added_by   UUID        REFERENCES auth.users (id) ON DELETE SET NULL,

    -- FIX (Issue 3 + Issue A): timestamps added for Resource Library sort order
    -- and to support the UPDATE RLS policy with a proper audit trail
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.resources IS 'Curated mental health articles and tools. Tags align with the KM taxonomy for cross-feature filtering.';
COMMENT ON COLUMN public.resources.added_by   IS 'FK to auth.users. NULL indicates a system/admin-seeded resource.';
COMMENT ON COLUMN public.resources.created_at IS 'Insertion timestamp. Used for sorting in the Resource Library.';
COMMENT ON COLUMN public.resources.updated_at IS 'Last-modified timestamp. Auto-stamped by trg_resources_updated_at trigger.';


-- ---------------------------------------------------------------------------
-- SECTION 3: INDEXES
-- Speeds up the most common query patterns: user-scoped lookups,
-- time-ordered feeds, and tag searches.
-- ---------------------------------------------------------------------------

-- mood_logs: user + time (dashboard feed, streak calculation)
CREATE INDEX IF NOT EXISTS idx_mood_logs_user_logged_at
    ON public.mood_logs (user_id, logged_at DESC);

-- journal_entries: user + creation time (journal feed)
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_created_at
    ON public.journal_entries (user_id, created_at DESC);

-- journal_entries: GIN index on tags array (fast tag-based filtering & search)
CREATE INDEX IF NOT EXISTS idx_journal_entries_tags
    ON public.journal_entries USING GIN (tags);

-- wellness_goals: user + status (active goals widget)
CREATE INDEX IF NOT EXISTS idx_wellness_goals_user_status
    ON public.wellness_goals (user_id, status);

-- resources: GIN index on tags array (Resource Library tag filter)
CREATE INDEX IF NOT EXISTS idx_resources_tags
    ON public.resources USING GIN (tags);

-- resources: creation time (Resource Library default sort — newest first)
-- FIX (Issue 3 consequence): index added alongside the new created_at column
CREATE INDEX IF NOT EXISTS idx_resources_created_at
    ON public.resources (created_at DESC);


-- ---------------------------------------------------------------------------
-- SECTION 4: UPDATED_AT AUTO-MAINTENANCE
-- Trigger function that stamps updated_at on every UPDATE, keeping audit
-- trails accurate without requiring the application layer to manage it.
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

-- Attach trigger to journal_entries
CREATE OR REPLACE TRIGGER trg_journal_entries_updated_at
    BEFORE UPDATE ON public.journal_entries
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Attach trigger to wellness_goals
CREATE OR REPLACE TRIGGER trg_wellness_goals_updated_at
    BEFORE UPDATE ON public.wellness_goals
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- FIX (Issue A): resources has an UPDATE RLS policy — it must have a trigger
-- to auto-stamp updated_at, consistent with journal_entries and wellness_goals
CREATE OR REPLACE TRIGGER trg_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();


-- ---------------------------------------------------------------------------
-- SECTION 5: ROW LEVEL SECURITY (RLS)
-- Every table is locked down to its owner via auth.uid() = user_id.
-- The `resources` table is readable by all authenticated users but writable
-- only by the resource creator (supports the shared Resource Library UX).
-- ---------------------------------------------------------------------------

-- 5.1 Enable RLS on all tables (blocks all access until policies are applied).
-- FORCE ensures RLS applies even to the table owner (postgres role), closing
-- the superuser bypass gap that ENABLE alone leaves open.
-- FIX (Issue 5): FORCE ROW LEVEL SECURITY added to all tables
ALTER TABLE public.mood_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs       FORCE  ROW LEVEL SECURITY;

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries FORCE  ROW LEVEL SECURITY;

ALTER TABLE public.wellness_goals  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals  FORCE  ROW LEVEL SECURITY;

ALTER TABLE public.resources       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources       FORCE  ROW LEVEL SECURITY;


-- 5.2  mood_logs policies — full CRUD, owner only
CREATE POLICY "mood_logs: owner can select"
    ON public.mood_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "mood_logs: owner can insert"
    ON public.mood_logs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mood_logs: owner can update"
    ON public.mood_logs FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "mood_logs: owner can delete"
    ON public.mood_logs FOR DELETE
    USING (auth.uid() = user_id);


-- 5.3  journal_entries policies — full CRUD, owner only
CREATE POLICY "journal_entries: owner can select"
    ON public.journal_entries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "journal_entries: owner can insert"
    ON public.journal_entries FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "journal_entries: owner can update"
    ON public.journal_entries FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "journal_entries: owner can delete"
    ON public.journal_entries FOR DELETE
    USING (auth.uid() = user_id);


-- 5.4  wellness_goals policies — full CRUD, owner only
CREATE POLICY "wellness_goals: owner can select"
    ON public.wellness_goals FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "wellness_goals: owner can insert"
    ON public.wellness_goals FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wellness_goals: owner can update"
    ON public.wellness_goals FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "wellness_goals: owner can delete"
    ON public.wellness_goals FOR DELETE
    USING (auth.uid() = user_id);


-- 5.5  resources policies
-- Read: any authenticated user (shared Resource Library)
-- Write: only the user who added the resource
-- FIX (Issue 1): auth.role() is deprecated — replaced with auth.uid() IS NOT NULL
CREATE POLICY "resources: authenticated users can select"
    ON public.resources FOR SELECT
    USING (auth.uid() IS NOT NULL);

-- FIX (Issue 2): original CHECK (auth.uid() = added_by) silently blocked inserts
-- where added_by is NULL (admin/seed rows) because NULL = NULL evaluates to NULL,
-- not TRUE. Added OR added_by IS NULL to handle both cases correctly.
CREATE POLICY "resources: creator can insert"
    ON public.resources FOR INSERT
    WITH CHECK (auth.uid() = added_by OR added_by IS NULL);

CREATE POLICY "resources: creator can update"
    ON public.resources FOR UPDATE
    USING (auth.uid() = added_by)
    WITH CHECK (auth.uid() = added_by);

CREATE POLICY "resources: creator can delete"
    ON public.resources FOR DELETE
    USING (auth.uid() = added_by);


-- ---------------------------------------------------------------------------
-- END OF SCHEMA
-- Commit this file as:
-- [S2-DEV-01] Add supabase/schema.sql — defines all tables, indexes,
--             RLS policies, and updated_at triggers per KM architecture
-- ---------------------------------------------------------------------------