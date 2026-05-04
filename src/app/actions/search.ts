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
 * Fetches journal entries and resources matching the keyword.
 * Tag filtering is handled client-side for guaranteed AND correctness.
 * Pattern summary uses the first selected tag passed separately.
 */
export async function searchAll(
  keyword: string,
  patternTag: string | null
): Promise<SearchResults> {
  try {
    const supabase = await createClient();

    // ── Journal entries ────────────────────────────────────────────────────
    let journalQuery = supabase
      .from("journal_entries")
      .select("id, title, body, tags, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (keyword) {
      // 1. Remove double quotes to protect the parser
      const cleanKw = keyword.replace(/"/g, '');
      
      const straightKw = cleanKw.replace(/’/g, "'");
      const curlyKw = cleanKw.replace(/'/g, '’');

      // 2. The "Smart Dictionary" Fix: Auto-inject apostrophes for common words
      // (\b means "word boundary", so it won't accidentally turn "swim" into "swi'm")
      const smartStraight = straightKw
        .replace(/\bim\b/gi, "i'm")
        .replace(/\bcant\b/gi, "can't")
        .replace(/\bdont\b/gi, "don't")
        .replace(/\bive\b/gi, "i've")
        .replace(/\bthats\b/gi, "that's")
        .replace(/\bwhats\b/gi, "what's")
        .replace(/\bwasnt\b/gi, "wasn't");

      const smartCurly = curlyKw
        .replace(/\bim\b/gi, "i’m")
        .replace(/\bcant\b/gi, "can’t")
        .replace(/\bdont\b/gi, "don’t")
        .replace(/\bive\b/gi, "i’ve")
        .replace(/\bthats\b/gi, "that’s")
        .replace(/\bwhats\b/gi, "what’s")
        .replace(/\bwasnt\b/gi, "wasn’t");

      // 3. Put all variations into a Set (which automatically removes any duplicates)
      const variations = Array.from(new Set([cleanKw, straightKw, curlyKw, smartStraight, smartCurly]));

      // 4. Build the Supabase .or() string dynamically!
      const orQuery = variations.map((v) => `title.ilike."%${v}%"`).join(',');
      
      journalQuery = journalQuery.or(orQuery);
    }

    const { data: journals, error: jError } = await journalQuery;
    if (jError) throw jError;

    // ── Resources ──────────────────────────────────────────────────────────
    let resourceQuery = supabase
      .from("resources")
      .select("id, title, url, tags")
      .limit(50);

    if (keyword) {
      const cleanKw = keyword.replace(/"/g, '');
      const straightKw = cleanKw.replace(/’/g, "'");
      const curlyKw = cleanKw.replace(/'/g, '’');

      const smartStraight = straightKw
        .replace(/\bim\b/gi, "i'm")
        .replace(/\bcant\b/gi, "can't")
        .replace(/\bdont\b/gi, "don't")
        .replace(/\bive\b/gi, "i've")
        .replace(/\bthats\b/gi, "that's")
        .replace(/\bwhats\b/gi, "what's")
        .replace(/\bwasnt\b/gi, "wasn't");

      const smartCurly = curlyKw
        .replace(/\bim\b/gi, "i’m")
        .replace(/\bcant\b/gi, "can’t")
        .replace(/\bdont\b/gi, "don’t")
        .replace(/\bive\b/gi, "i’ve")
        .replace(/\bthats\b/gi, "that’s")
        .replace(/\bwhats\b/gi, "what’s")
        .replace(/\bwasnt\b/gi, "wasn’t");

      const variations = Array.from(new Set([cleanKw, straightKw, curlyKw, smartStraight, smartCurly]));
      const orQuery = variations.map((v) => `title.ilike."%${v}%"`).join(',');
      
      resourceQuery = resourceQuery.or(orQuery);
    }

    const { data: resources, error: rError } = await resourceQuery;
    if (rError) throw rError;

    // ── Pattern Summary ────────────────────────────────────────────────────
    let pattern: PatternSummary | null = null;
    
    if (patternTag) {
      const { data: taggedJournals } = await supabase
        .from("journal_entries")
        .select("created_at")
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

    return {
      journals: journals ?? [],
      resources: resources ?? [],
      pattern,
      error: null,
    };

  } catch (error: unknown) {
    console.error("Search API Error:", error instanceof Error ? error.message : error);
    return {
      journals: [],
      resources: [],
      pattern: null,
      error: "Failed to perform search. Please try again.",
    };
  }
}