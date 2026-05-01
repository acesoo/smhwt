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
 * Unified search across journal_entries and resources.
 * - keyword: matches against title/body (journals) and title (resources)
 * - tag: filters both tables via array containment (.contains)
 * - pattern: if a tag is selected, fetches mood_logs that share the same
 *   date as journal entries with that tag — surfaces KM insight on how
 *   a stressor/coping tag correlates with mood and sleep data.
 */
export async function searchAll(
  keyword: string,
  tag: string | null
): Promise<SearchResults> {
  const supabase = await createClient();

  // ── Journal entries ────────────────────────────────────────────────────
  let journalQuery = supabase
    .from("journal_entries")
    .select("id, title, body, tags, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  if (tag) {
    journalQuery = journalQuery.contains("tags", [tag]);
  }
  if (keyword.trim()) {
    journalQuery = journalQuery.or(
      `title.ilike.%${keyword.trim()}%,body.ilike.%${keyword.trim()}%`
    );
  }

  const { data: journalRows, error: journalError } = await journalQuery;
  if (journalError) {
    return { journals: [], resources: [], pattern: null, error: journalError.message };
  }

  // ── Resources ──────────────────────────────────────────────────────────
  let resourceQuery = supabase
    .from("resources")
    .select("id, title, url, tags")
    .order("created_at", { ascending: false })
    .limit(20);

  if (tag) {
    resourceQuery = resourceQuery.contains("tags", [tag]);
  }
  if (keyword.trim()) {
    resourceQuery = resourceQuery.ilike("title", `%${keyword.trim()}%`);
  }

  const { data: resourceRows, error: resourceError } = await resourceQuery;
  if (resourceError) {
    return { journals: [], resources: [], pattern: null, error: resourceError.message };
  }

  // ── KM Pattern: mood & sleep averages for the selected tag ─────────────
  let pattern: PatternSummary | null = null;

  if (tag && journalRows && journalRows.length > 0) {
    // Get the dates of journal entries that carry this tag
    const taggedDates = journalRows.map((j) => j.created_at.slice(0, 10));

    // Pull mood_logs from those same dates
    const { data: moodRows } = await supabase
      .from("mood_logs")
      .select("mood_score, sleep_quality, logged_at")
      .in(
        "logged_at::date",
        taggedDates
      );

    // Supabase doesn't support ::date casting in .in() filters directly,
    // so we filter in JS after fetching by date range instead:
    const minDate = taggedDates.reduce((a, b) => (a < b ? a : b));
    const maxDate = taggedDates.reduce((a, b) => (a > b ? a : b));

    const { data: moodRange } = await supabase
      .from("mood_logs")
      .select("mood_score, sleep_quality, logged_at")
      .gte("logged_at", minDate)
      .lte("logged_at", maxDate + "T23:59:59Z");

    const matched = (moodRange ?? []).filter((m) =>
      taggedDates.includes(m.logged_at.slice(0, 10))
    );

    if (matched.length > 0) {
      const moodScores = matched
        .map((m) => m.mood_score)
        .filter((s): s is number => s !== null);
      const sleepScores = matched
        .map((m) => m.sleep_quality)
        .filter((s): s is number => s !== null);

      pattern = {
        tag,
        avgMoodScore:
          moodScores.length > 0
            ? Math.round(
                (moodScores.reduce((a, b) => a + b, 0) / moodScores.length) * 10
              ) / 10
            : null,
        avgSleepQuality:
          sleepScores.length > 0
            ? Math.round(
                (sleepScores.reduce((a, b) => a + b, 0) / sleepScores.length) * 10
              ) / 10
            : null,
        sampleSize: matched.length,
      };
    }
  }

  return {
    journals: (journalRows ?? []) as JournalResult[],
    resources: (resourceRows ?? []) as ResourceResult[],
    pattern,
    error: null,
  };
}