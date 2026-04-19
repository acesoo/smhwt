-- =============================================================================
-- Student Mental Health & Wellness Tracker
-- Row Level Security — S2-DEV-02
-- File: /supabase/rls-policies.sql
-- =============================================================================

ALTER TABLE public.mood_logs       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_logs       FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals  FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.resources       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources       FORCE  ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- mood_logs
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "mood_logs: owner can select" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs: owner can insert" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs: owner can update" ON public.mood_logs;
DROP POLICY IF EXISTS "mood_logs: owner can delete" ON public.mood_logs;

CREATE POLICY "mood_logs: owner can select" ON public.mood_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "mood_logs: owner can insert" ON public.mood_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mood_logs: owner can update" ON public.mood_logs FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "mood_logs: owner can delete" ON public.mood_logs FOR DELETE USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- journal_entries
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "journal_entries: owner can select" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_entries: owner can insert" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_entries: owner can update" ON public.journal_entries;
DROP POLICY IF EXISTS "journal_entries: owner can delete" ON public.journal_entries;

CREATE POLICY "journal_entries: owner can select" ON public.journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "journal_entries: owner can insert" ON public.journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "journal_entries: owner can update" ON public.journal_entries FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "journal_entries: owner can delete" ON public.journal_entries FOR DELETE USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- wellness_goals
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "wellness_goals: owner can select" ON public.wellness_goals;
DROP POLICY IF EXISTS "wellness_goals: owner can insert" ON public.wellness_goals;
DROP POLICY IF EXISTS "wellness_goals: owner can update" ON public.wellness_goals;
DROP POLICY IF EXISTS "wellness_goals: owner can delete" ON public.wellness_goals;

CREATE POLICY "wellness_goals: owner can select" ON public.wellness_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wellness_goals: owner can insert" ON public.wellness_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wellness_goals: owner can update" ON public.wellness_goals FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wellness_goals: owner can delete" ON public.wellness_goals FOR DELETE USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- resources
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "resources: authenticated users can select" ON public.resources;
DROP POLICY IF EXISTS "resources: creator can insert" ON public.resources;
DROP POLICY IF EXISTS "resources: creator can update" ON public.resources;
DROP POLICY IF EXISTS "resources: creator can delete" ON public.resources;

CREATE POLICY "resources: authenticated users can select" ON public.resources FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "resources: creator can insert" ON public.resources FOR INSERT WITH CHECK (auth.uid() = added_by);
CREATE POLICY "resources: creator can update" ON public.resources FOR UPDATE USING (auth.uid() = added_by) WITH CHECK (auth.uid() = added_by);
CREATE POLICY "resources: creator can delete" ON public.resources FOR DELETE USING (auth.uid() = added_by);