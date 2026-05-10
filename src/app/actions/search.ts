"use server";

import { createClient } from "@/lib/supabase/server";

export type JournalResult = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
};

export type ResourceResult = {
  id: string;
  title: string;
  url: string;
  tags: string[];
};

export type PatternSummary = {
  tag: string;
  avgMoodScore: number | null;
  avgSleepQuality: number | null;
  sampleSize: number;
};

export type SearchResults = {
  journals: JournalResult[];
  resources: ResourceResult[];
  pattern: PatternSummary | null;
  error: string | null;
};

/**
 * Unified fuzzy search across journal_entries and resources.
 *
 * Uses pg_trgm Postgres RPCs for case-insensitive, punctuation-tolerant,
 * and fuzzy keyword matching at the database level. Tag filtering and
 * pattern summary are handled after the DB fetch.
 *
 * Data shape is unchanged — search-retrieve.tsx client filtering works as-is.
 */
export async function searchAll(
  keyword: string,
  patternTag: string | null
): Promise<SearchResults> {
  try {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { journals: [], resources: [], pattern: null, error: "Not authenticated." };

    const trimmed = keyword.trim();

    // ── Journal entries ────────────────────────────────────────────────────
    let journals: JournalResult[] = [];

    if (trimmed) {
      const { data, error } = await supabase.rpc("search_journal_entries", {
        p_keyword: trimmed,
        p_user_id: user.id,
        p_limit:   50,
      });
      if (error) throw error;
      journals = (data ?? []) as JournalResult[];
    } else {
      // No keyword — fetch all user journals so tag-only filtering still works
      const { data, error } = await supabase
        .from("journal_entries")
        .select("id, title, body, tags, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      journals = (data ?? []) as JournalResult[];
    }

    // ── Resources ──────────────────────────────────────────────────────────
    let resources: ResourceResult[] = [];

    if (trimmed) {
      const { data, error } = await supabase.rpc("search_resources", {
        p_keyword: trimmed,
        p_limit:   50,
      });
      if (error) throw error;
      resources = (data ?? []) as ResourceResult[];
    } else {
      const { data, error } = await supabase
        .from("resources")
        .select("id, title, url, tags")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      resources = (data ?? []) as ResourceResult[];
    }

    // ── KM Pattern Summary ─────────────────────────────────────────────────
    let pattern: PatternSummary | null = null;

    if (patternTag) {
      const { data: taggedJournals } = await supabase
        .from("journal_entries")
        .select("created_at")
        .eq("user_id", user.id)
        .contains("tags", [patternTag]);

      if (taggedJournals && taggedJournals.length > 0) {
        const taggedDates = Array.from(
          new Set(taggedJournals.map((j) => j.created_at.slice(0, 10)))
        );
        const minDate = taggedDates.reduce((a, b) => (a < b ? a : b));
        const maxDate = taggedDates.reduce((a, b) => (a > b ? a : b));

        const { data: moodRange } = await supabase
          .from("mood_logs")
          .select("mood_score, sleep_quality, logged_at")
          .eq("user_id", user.id)
          .gte("logged_at", minDate)
          .lte("logged_at", maxDate + "T23:59:59Z");

        const matched = (moodRange ?? []).filter((m) =>
          taggedDates.includes(m.logged_at.slice(0, 10))
        );

        if (matched.length > 0) {
          const moodScores  = matched.map((m) => m.mood_score).filter((s): s is number => s !== null);
          const sleepScores = matched.map((m) => m.sleep_quality).filter((s): s is number => s !== null);

          pattern = {
            tag: patternTag,
            avgMoodScore:
              moodScores.length > 0
                ? Math.round((moodScores.reduce((a, b) => a + b, 0) / moodScores.length) * 10) / 10
                : null,
            avgSleepQuality:
              sleepScores.length > 0
                ? Math.round((sleepScores.reduce((a, b) => a + b, 0) / sleepScores.length) * 10) / 10
                : null,
            sampleSize: taggedDates.length,
          };
        }
      }
    }

    return { journals, resources, pattern, error: null };

  } catch (error: unknown) {
    console.error("Search error:", error instanceof Error ? error.message : error);
    return { journals: [], resources: [], pattern: null, error: "Search failed. Please try again." };
  }
}