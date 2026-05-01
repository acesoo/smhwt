-- ============================================================
-- Migration: Admin role + peer_stories admin RLS policies
-- Sprint: S4 | Task: S4-DEV-06
-- ============================================================

-- ── profiles table ───────────────────────────────────────────
-- Stores the is_admin flag. Keyed to auth.users.
-- This is separate from user_metadata so RLS can enforce it
-- at the database level without trusting client-supplied claims.

CREATE TABLE IF NOT EXISTS public.profiles (
  id         UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  is_admin   BOOLEAN     NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles FORCE  ROW LEVEL SECURITY;

-- Users can read their own profile (so the app can check is_admin)
DROP POLICY IF EXISTS "profiles: owner can select" ON public.profiles;
CREATE POLICY "profiles: owner can select"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Only the DB owner (service role) can insert/update profiles.
-- is_admin must be set manually in the Supabase dashboard —
-- it cannot be set through the app UI by any user.
DROP POLICY IF EXISTS "profiles: service role only insert" ON public.profiles;
CREATE POLICY "profiles: service role only insert"
  ON public.profiles FOR INSERT
  WITH CHECK (false);

DROP POLICY IF EXISTS "profiles: service role only update" ON public.profiles;
CREATE POLICY "profiles: service role only update"
  ON public.profiles FOR UPDATE
  USING (false);

-- ── Auto-create profile on signup ────────────────────────────
-- Trigger that inserts a profiles row when a new auth user is created.
-- is_admin defaults to false for every new user.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, is_admin)
  VALUES (NEW.id, false)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ── peer_stories admin RLS policies ──────────────────────────
-- Admins need to SELECT all stories (including unapproved)
-- and UPDATE is_approved to approve or hide them.

DROP POLICY IF EXISTS "peer_stories: admin can select all" ON public.peer_stories;
CREATE POLICY "peer_stories: admin can select all"
  ON public.peer_stories FOR SELECT
  USING (
    is_approved = true
    OR (
      auth.uid() IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND is_admin = true
      )
    )
  );

DROP POLICY IF EXISTS "peer_stories: admin can update approval" ON public.peer_stories;
CREATE POLICY "peer_stories: admin can update approval"
  ON public.peer_stories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );