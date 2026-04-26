# GitHub Issue
# Label: km
# Assignee: @enzo-q

**Title:**
[KM GAP] stressor_tags / coping_tags have no enforced vocabulary — breaks Combination stage (SECI)

---

**Label:** `km`
**Reported by:** KM Analyst — S3-KM-03 review (@anthoncalban)
**Affects:** `mood_logs.stressor_tags`, `mood_logs.coping_tags`, `journal_entries.tags`
**SECI Stage broken:** Combination → blocks Internalization

---

## The Problem

During the S3-KM-03 KM review, the following gap was identified:

The columns `stressor_tags TEXT[]`, `coping_tags TEXT[]` (in `mood_logs`) and `tags TEXT[]` (in `journal_entries`) were created by the `add-mood-journal-fields.sql` migration but accept **any free-text string** — there is no constraint, enum, or lookup table enforcing a controlled vocabulary.

`km-architecture.md` Section 2 defines a complete, research-based tag taxonomy:
- **16 stressor tags** across 5 categories (Academic, Social, Institutional, Personal, Digital)
- **11 coping tags** across 4 categories (Problem-Centered, Emotion-Centered, Avoidance, Support Seeking)

Without enforcement, a student could enter `"test stress"`, `"exam pressure"`, and `"TestStress"` across different entries. These will never be aggregated together by the dashboard, making **pattern recognition — the core function of the Combination stage — impossible.**

This is not a minor data quality issue. It is a structural failure in the KM architecture: the entire value of the Dashboard (Combination) and the Wellness Goals (Internalization) depends on tags being consistent and queryable across entries.

---

## Evidence

File: `supabase/migrations/add-mood-journal-fields.sql`
```sql
ADD COLUMN IF NOT EXISTS stressor_tags  TEXT[]  DEFAULT '{}',
ADD COLUMN IF NOT EXISTS coping_tags    TEXT[]  DEFAULT '{}';
```
No CHECK constraint. No reference to `valid_tags`. No vocabulary enforced.

---

## Required Fix

Two files have been prepared by the KM Analyst and are attached to this issue:

### Option A — App-level fix (faster, recommended for Sprint 3)
File: `src/lib/constants/tags.ts`
- Exports `STRESSOR_TAGS`, `COPING_TAGS`, `STRESSOR_TAG_GROUPS`, `COPING_TAG_GROUPS`
- Replace any free-text tag input in the UI with a **multi-select picker** using these constants
- This prevents invalid tags from being submitted at the form level

### Option B — DB-level fix (stronger, recommended to run alongside Option A)
File: `supabase/migrations/enforce-tag-vocabulary.sql`
- Creates a `valid_tags` lookup table seeded with all 27 tags from `km-architecture.md`
- Adds a `validate_tags()` PostgreSQL function
- Adds CHECK constraints on `mood_logs.stressor_tags`, `mood_logs.coping_tags`, and `journal_entries.tags`
- Adds GIN indexes on all three columns for fast tag-based retrieval (required by km-architecture.md Section 3)

**Recommendation:** Implement both. Option A fixes the UI; Option B enforces integrity at the DB level so no invalid tags can enter through any path (direct Supabase inserts, future API calls, etc.).

---

## Acceptance Criteria

- [ ] `src/lib/constants/tags.ts` exists with all 27 tags from `km-architecture.md`
- [ ] The mood log form uses a multi-select picker from `STRESSOR_TAG_GROUPS` and `COPING_TAG_GROUPS` — no free-text tag input
- [ ] The journal entry form uses a multi-select picker from `ALL_TAGS` — no free-text tag input
- [ ] DB migration `enforce-tag-vocabulary.sql` has been run successfully
- [ ] GIN indexes exist on `stressor_tags`, `coping_tags`, and `journal_entries.tags`
- [ ] A test entry with an invalid tag (e.g., `"random text"`) is rejected at both the UI and DB level

---

## KM Impact

| SECI Stage | Impact of this gap |
|---|---|
| Externalization | Tags are captured but semantically inconsistent |
| **Combination** | **Dashboard cannot aggregate by tag — pattern detection fails** |
| **Internalization** | **Student sees no reliable trends — self-awareness goal is not achieved** |

Fixing this gap is a prerequisite for the Dashboard (S3-DEV-04) and Wellness Goals (S3-DEV-05) to function as described in `km-architecture.md`.
