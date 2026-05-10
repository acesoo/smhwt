-- ============================================================
-- Migration: pg_trgm fuzzy search for journal entries and resources
-- Sprint: S5 | Task: Polishing
-- ============================================================

-- ── Enable pg_trgm ───────────────────────────────────────────
-- Already available in Supabase — no extra setup needed.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ── Text normalizer ──────────────────────────────────────────
-- Strips punctuation and special characters, lowercases, collapses spaces.
-- IMMUTABLE so Postgres can use it in indexes.
CREATE OR REPLACE FUNCTION normalize_text(input text)
RETURNS text AS $$
BEGIN
  RETURN trim(
    regexp_replace(
      lower(input),
      '[^a-z0-9\s]', '', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ── GIN indexes for fast trigram search ──────────────────────
CREATE INDEX IF NOT EXISTS idx_journal_entries_title_trgm
  ON journal_entries USING GIN (normalize_text(title) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_journal_entries_body_trgm
  ON journal_entries USING GIN (normalize_text(body) gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_resources_title_trgm
  ON resources USING GIN (normalize_text(title) gin_trgm_ops);

-- ── Journal search RPC ────────────────────────────────────────
-- Normalizes both the search term and stored text before comparing.
-- Uses ILIKE for substring match + similarity() for fuzzy tolerance.
-- SECURITY DEFINER runs as the function owner; user_id filter enforces
-- data isolation without relying on RLS inside the function.
CREATE OR REPLACE FUNCTION search_journal_entries(
  p_keyword  text,
  p_user_id  uuid,
  p_limit    int DEFAULT 50
)
RETURNS TABLE(
  id         uuid,
  title      text,
  body       text,
  tags       text[],
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  norm_kw text;
BEGIN
  norm_kw := normalize_text(p_keyword);

  RETURN QUERY
  SELECT
    je.id,
    je.title,
    je.body,
    je.tags,
    je.created_at
  FROM journal_entries je
  WHERE
    je.user_id = p_user_id
    AND (
      normalize_text(je.title) ILIKE '%' || norm_kw || '%'
      OR normalize_text(je.body)  ILIKE '%' || norm_kw || '%'
      OR similarity(normalize_text(je.title), norm_kw) > 0.3
      OR similarity(normalize_text(je.body),  norm_kw) > 0.3
    )
  ORDER BY
    GREATEST(
      similarity(normalize_text(je.title), norm_kw),
      similarity(normalize_text(je.body),  norm_kw)
    ) DESC,
    je.created_at DESC
  LIMIT p_limit;
END;
$$;

-- ── Resources search RPC ──────────────────────────────────────
-- Resources are public (authenticated read) so no user_id filter needed.
CREATE OR REPLACE FUNCTION search_resources(
  p_keyword text,
  p_limit   int DEFAULT 50
)
RETURNS TABLE(
  id    uuid,
  title text,
  url   text,
  tags  text[]
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  norm_kw text;
BEGIN
  norm_kw := normalize_text(p_keyword);

  RETURN QUERY
  SELECT
    r.id,
    r.title,
    r.url,
    r.tags
  FROM resources r
  WHERE
    normalize_text(r.title) ILIKE '%' || norm_kw || '%'
    OR similarity(normalize_text(r.title), norm_kw) > 0.3
  ORDER BY
    similarity(normalize_text(r.title), norm_kw) DESC
  LIMIT p_limit;
END;
$$;

-- ── Verify ────────────────────────────────────────────────────
SELECT 'pg_trgm active' AS check,
       extname AS result
FROM pg_extension WHERE extname = 'pg_trgm'
UNION ALL
SELECT 'normalize_text function',
       routine_name
FROM information_schema.routines
WHERE routine_name = 'normalize_text'
UNION ALL
SELECT 'search functions',
       COUNT(*)::text
FROM information_schema.routines
WHERE routine_name IN ('search_journal_entries', 'search_resources');

-- Expected:
--   pg_trgm active       | pg_trgm
--   normalize_text       | normalize_text
--   search functions     | 2