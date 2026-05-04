-- ============================================================
-- Migration: Enforce forum tag vocabulary on peer_stories
-- Sprint: S4 | Task: S4-DEV-03
-- Extends enforce-tag-vocabulary.sql (S3) with Layer 3 tags
-- per KM Report Section 9.2
-- ============================================================

-- ── STEP 1: Update the CHECK constraint first ─────────────────

ALTER TABLE valid_tags
  DROP CONSTRAINT IF EXISTS valid_tags_tag_type_check;

ALTER TABLE valid_tags
  ADD CONSTRAINT valid_tags_tag_type_check
  CHECK (tag_type IN ('stressor', 'coping', 'forum'));


-- ── STEP 2: Now seed forum tags ───────────────────────────────

INSERT INTO valid_tags (tag, category, tag_type) VALUES
  ('#MyStory',             'Shared Experience', 'forum'),
  ('#WhatHelpedMe',        'Shared Experience', 'forum'),
  ('#StillStruggling',     'Shared Experience', 'forum'),
  ('#GettingBetter',       'Shared Experience', 'forum'),
  ('#TryThis',             'Peer Advice',       'forum'),
  ('#WhatWorkedForMe',     'Peer Advice',       'forum'),
  ('#ResourceTip',         'Peer Advice',       'forum'),
  ('#AskingForAdvice',     'Peer Advice',       'forum'),
  ('#ArticleShare',        'Resource Sharing',  'forum'),
  ('#ToolRecommendation',  'Resource Sharing',  'forum'),
  ('#YouAreNotAlone',      'Community Support', 'forum'),
  ('#CheckingIn',          'Community Support', 'forum')
ON CONFLICT (tag) DO NOTHING;


-- ── STEP 3: Add validator function ────────────────────────────

CREATE OR REPLACE FUNCTION validate_forum_tags(tags TEXT[])
RETURNS BOOLEAN AS $$
DECLARE
  result BOOLEAN;
BEGIN
  SELECT bool_and(t = ANY(SELECT tag FROM valid_tags WHERE tag_type = 'forum'))
  INTO result
  FROM unnest($1) AS t;
  RETURN COALESCE(result, TRUE);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;


-- ── STEP 4: Add CHECK constraint on peer_stories ──────────────

ALTER TABLE peer_stories
  DROP CONSTRAINT IF EXISTS peer_stories_forum_tags_check;

ALTER TABLE peer_stories
  ADD CONSTRAINT peer_stories_forum_tags_check
  CHECK (forum_tags = '{}' OR validate_forum_tags(forum_tags));


-- ── STEP 5: Verify ────────────────────────────────────────────

SELECT 'forum tags in valid_tags' AS check, COUNT(*)::TEXT AS result
  FROM valid_tags WHERE tag_type = 'forum'
UNION ALL
SELECT 'peer_stories constraint', COUNT(*)::TEXT
  FROM pg_constraint
  WHERE conrelid = 'peer_stories'::regclass
    AND conname LIKE '%forum_tags%';

-- Expected:
--   forum tags in valid_tags | 12
--   peer_stories constraint  | 1