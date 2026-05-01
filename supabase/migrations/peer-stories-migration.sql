-- ============================================================
-- Migration: peer_stories table
-- Sprint: S4 | Task: S4-DEV-03
-- ============================================================

CREATE TABLE IF NOT EXISTS public.peer_stories (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  submitted_by UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  body         TEXT        NOT NULL,
  forum_tags   TEXT[]      NOT NULL DEFAULT '{}',
  is_approved  BOOLEAN     NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- GIN index for fast forum_tags filtering (KM report section 9.3)
CREATE INDEX IF NOT EXISTS idx_peer_stories_forum_tags
  ON public.peer_stories USING GIN (forum_tags);

CREATE INDEX IF NOT EXISTS idx_peer_stories_approved
  ON public.peer_stories (is_approved, created_at DESC);

-- RLS
ALTER TABLE public.peer_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peer_stories FORCE  ROW LEVEL SECURITY;

-- Authenticated users can submit (identity stored in submitted_by but never exposed in UI)
DROP POLICY IF EXISTS "peer_stories: authenticated can insert" ON public.peer_stories;
CREATE POLICY "peer_stories: authenticated can insert"
  ON public.peer_stories FOR INSERT
  WITH CHECK (auth.uid() = submitted_by);

-- Anyone (including anon) can read approved stories — public feed
DROP POLICY IF EXISTS "peer_stories: public can read approved" ON public.peer_stories;
CREATE POLICY "peer_stories: public can read approved"
  ON public.peer_stories FOR SELECT
  USING (is_approved = true);

-- submitted_by can delete their own story
DROP POLICY IF EXISTS "peer_stories: owner can delete" ON public.peer_stories;
CREATE POLICY "peer_stories: owner can delete"
  ON public.peer_stories FOR DELETE
  USING (auth.uid() = submitted_by);