-- ============================================================
-- Migration: Add extended fields to mood_logs and journal_entries
-- Sprint: S3 | Tasks: S3-DEV-02, S3-DEV-03
-- ============================================================

-- ── mood_logs ───────────────────────────────────────────────
-- Add sleep_quality  : integer 1–5  (1 = very poor, 5 = excellent)
-- Add academic_impact: text         (e.g. "None" | "Minor" | "Moderate" | "Severe")
-- Add stressor_tags  : text[]       (taxonomy tags e.g. '#TestStress')
-- Add coping_tags    : text[]       (taxonomy tags e.g. '#ActiveCoping')
ALTER TABLE mood_logs
  ADD COLUMN IF NOT EXISTS sleep_quality   INTEGER    CHECK (sleep_quality BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS academic_impact TEXT       CHECK (academic_impact IN ('None','Minor','Moderate','Severe')),
  ADD COLUMN IF NOT EXISTS stressor_tags   TEXT[]     DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS coping_tags     TEXT[]     DEFAULT '{}';

-- ── journal_entries ─────────────────────────────────────────
-- Schema should already have: id, user_id, title, body, tags, created_at
-- If tags column is missing, run:
ALTER TABLE journal_entries
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';