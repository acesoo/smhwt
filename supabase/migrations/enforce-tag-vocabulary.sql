-- =============================================================
-- Migration: Enforce KM tag vocabulary (definitive)
-- Sprint: S3 | Tasks: S3-KM-03 + S3-DEV-02
--
-- KEY CHANGES FROM PREVIOUS ATTEMPTS:
--   1. Data cleanup uses hardcoded arrays — no table dependency
--   2. Functions use LANGUAGE plpgsql so valid_tags is resolved
--      at call time, not at function-creation time
--   3. valid_tags is created AND seeded before any function or
--      constraint that references it
--   4. journal_entries uses validate_any_tags (type-agnostic)
--      to correctly handle mixed stressor + coping tag arrays
-- =============================================================


-- ── STEP 1: Clean existing rows (no table dependency) ─────────────────────────

DO $$
DECLARE
  valid_stressor TEXT[] := ARRAY[
    '#WorkOverload','#TestStress','#EvaluationStage','#TeacherStress',
    '#PeerStress','#PerformanceAnxiety','#InterpersonalRelationships',
    '#Isolation','#TransitionAdaptation','#AdministrativeProcesses',
    '#SelfExpectation','#ResultsStress','#Perfectionism',
    '#InformationOverload','#InternetAddiction','#TimeManagement'
  ];
  valid_coping TEXT[] := ARRAY[
    '#ActiveCoping','#Planning','#PositiveReframing',
    '#Venting','#Humor','#Acceptance',
    '#Denial','#SelfDistraction','#Disengagement',
    '#InstrumentalSupport','#EmotionalSupport'
  ];
  valid_all TEXT[];
BEGIN
  valid_all := valid_stressor || valid_coping;

  UPDATE mood_logs
  SET stressor_tags = ARRAY(
    SELECT t FROM unnest(stressor_tags) AS t WHERE t = ANY(valid_stressor)
  )
  WHERE stressor_tags IS NOT NULL AND stressor_tags <> '{}';

  UPDATE mood_logs
  SET coping_tags = ARRAY(
    SELECT t FROM unnest(coping_tags) AS t WHERE t = ANY(valid_coping)
  )
  WHERE coping_tags IS NOT NULL AND coping_tags <> '{}';

  UPDATE journal_entries
  SET tags = ARRAY(
    SELECT t FROM unnest(tags) AS t WHERE t = ANY(valid_all)
  )
  WHERE tags IS NOT NULL AND tags <> '{}';

  RAISE NOTICE 'Step 1 done: legacy tags stripped.';
END $$;


-- ── STEP 2: Create valid_tags with RLS ───────────────────────────────────────

CREATE TABLE IF NOT EXISTS valid_tags (
  tag      TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  tag_type TEXT NOT NULL CHECK (tag_type IN ('stressor','coping'))
);

ALTER TABLE valid_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for tag vocabulary" ON valid_tags;
CREATE POLICY "Public read access for tag vocabulary"
  ON valid_tags FOR SELECT USING (true);


-- ── STEP 3: Seed valid_tags ───────────────────────────────────────────────────

INSERT INTO valid_tags (tag, category, tag_type) VALUES
  -- Stressor: Academic
  ('#WorkOverload',               'Academic',      'stressor'),
  ('#TestStress',                 'Academic',      'stressor'),
  ('#EvaluationStage',            'Academic',      'stressor'),
  ('#TeacherStress',              'Academic',      'stressor'),
  -- Stressor: Social
  ('#PeerStress',                 'Social',        'stressor'),
  ('#PerformanceAnxiety',         'Social',        'stressor'),
  ('#InterpersonalRelationships', 'Social',        'stressor'),
  -- Stressor: Institutional
  ('#Isolation',                  'Institutional', 'stressor'),
  ('#TransitionAdaptation',       'Institutional', 'stressor'),
  ('#AdministrativeProcesses',    'Institutional', 'stressor'),
  -- Stressor: Personal
  ('#SelfExpectation',            'Personal',      'stressor'),
  ('#ResultsStress',              'Personal',      'stressor'),
  ('#Perfectionism',              'Personal',      'stressor'),
  -- Stressor: Digital
  ('#InformationOverload',        'Digital',       'stressor'),
  ('#InternetAddiction',          'Digital',       'stressor'),
  ('#TimeManagement',             'Digital',       'stressor'),
  -- Coping: Problem-Centered
  ('#ActiveCoping',               'Problem-Centered', 'coping'),
  ('#Planning',                   'Problem-Centered', 'coping'),
  ('#PositiveReframing',          'Problem-Centered', 'coping'),
  -- Coping: Emotion-Centered
  ('#Venting',                    'Emotion-Centered', 'coping'),
  ('#Humor',                      'Emotion-Centered', 'coping'),
  ('#Acceptance',                 'Emotion-Centered', 'coping'),
  -- Coping: Avoidance
  ('#Denial',                     'Avoidance',        'coping'),
  ('#SelfDistraction',            'Avoidance',        'coping'),
  ('#Disengagement',              'Avoidance',        'coping'),
  -- Coping: Support Seeking
  ('#InstrumentalSupport',        'Support Seeking',  'coping'),
  ('#EmotionalSupport',           'Support Seeking',  'coping')
ON CONFLICT (tag) DO NOTHING;


-- ── STEP 4: Create functions (plpgsql = resolved at call time) ────────────────

-- Type-specific validator: used by mood_logs stressor/coping columns separately
CREATE OR REPLACE FUNCTION validate_tags(tags TEXT[], tag_type TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  result BOOLEAN;
BEGIN
  SELECT bool_and(t = ANY(SELECT tag FROM valid_tags WHERE valid_tags.tag_type = $2))
  INTO result
  FROM unnest($1) AS t;
  RETURN COALESCE(result, TRUE);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Type-agnostic validator: used by journal_entries which mixes both types
CREATE OR REPLACE FUNCTION validate_any_tags(tags TEXT[])
RETURNS BOOLEAN AS $$
DECLARE
  result BOOLEAN;
BEGIN
  SELECT bool_and(t = ANY(SELECT tag FROM valid_tags))
  INTO result
  FROM unnest($1) AS t;
  RETURN COALESCE(result, TRUE);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;


-- ── STEP 5: Add CHECK constraints ────────────────────────────────────────────

ALTER TABLE mood_logs
  DROP CONSTRAINT IF EXISTS mood_logs_stressor_tags_check;
ALTER TABLE mood_logs
  ADD CONSTRAINT mood_logs_stressor_tags_check
    CHECK (stressor_tags = '{}' OR validate_tags(stressor_tags, 'stressor'));

ALTER TABLE mood_logs
  DROP CONSTRAINT IF EXISTS mood_logs_coping_tags_check;
ALTER TABLE mood_logs
  ADD CONSTRAINT mood_logs_coping_tags_check
    CHECK (coping_tags = '{}' OR validate_tags(coping_tags, 'coping'));

ALTER TABLE journal_entries
  DROP CONSTRAINT IF EXISTS journal_entries_tags_check;
ALTER TABLE journal_entries
  ADD CONSTRAINT journal_entries_tags_check
    CHECK (tags = '{}' OR validate_any_tags(tags));


-- ── STEP 6: GIN indexes ───────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_mood_logs_stressor_tags
  ON mood_logs USING GIN (stressor_tags);

CREATE INDEX IF NOT EXISTS idx_mood_logs_coping_tags
  ON mood_logs USING GIN (coping_tags);

CREATE INDEX IF NOT EXISTS idx_journal_entries_tags
  ON journal_entries USING GIN (tags);


-- ── STEP 7: Verify ───────────────────────────────────────────────────────────

SELECT 'valid_tags rows'   AS check, COUNT(*)::TEXT AS result FROM valid_tags
UNION ALL
SELECT 'constraints added', COUNT(*)::TEXT
  FROM pg_constraint
  WHERE conrelid IN ('mood_logs'::regclass, 'journal_entries'::regclass)
    AND conname LIKE '%tags%'
UNION ALL
SELECT 'gin indexes',       COUNT(*)::TEXT
  FROM pg_indexes
  WHERE indexname IN (
    'idx_mood_logs_stressor_tags',
    'idx_mood_logs_coping_tags',
    'idx_journal_entries_tags'
  );

-- Expected:
--   valid_tags rows   | 27
--   constraints added | 3
--   gin indexes       | 3