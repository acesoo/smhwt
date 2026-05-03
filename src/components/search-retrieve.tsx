"use client";

import { useState, useTransition } from "react";
import { Search, BookOpen, ExternalLink, NotebookPen, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { searchAll, type SearchResults } from "@/app/actions/search";
import { ALL_TAGS } from "@/lib/constants/tags";

const EMPTY: SearchResults = {
  journals: [],
  resources: [],
  pattern: null,
  error: null,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Pattern Summary Card ──────────────────────────────────────────────────────

function PatternCard({ pattern }: { pattern: SearchResults["pattern"] }) {
  if (!pattern) return null;

  return (
    <div className="rounded-xl border border-blue-800 bg-blue-950/30 px-4 py-3 space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
        KM Pattern — {pattern.tag}
      </p>
      <p className="text-xs text-neutral-400">
        Based on{" "}
        <span className="text-neutral-200 font-semibold">{pattern.sampleSize}</span>{" "}
        mood log{pattern.sampleSize !== 1 ? "s" : ""} on days you tagged this:
      </p>
      <div className="flex gap-6 pt-1">
        <div>
          <p className="text-lg font-semibold text-neutral-100 leading-none">
            {pattern.avgMoodScore ?? "—"}
            <span className="text-xs text-neutral-500 font-normal"> / 10</span>
          </p>
          <p className="text-[10px] text-neutral-500 mt-0.5">Avg mood score</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-neutral-100 leading-none">
            {pattern.avgSleepQuality ?? "—"}
            <span className="text-xs text-neutral-500 font-normal"> / 5</span>
          </p>
          <p className="text-[10px] text-neutral-500 mt-0.5">Avg sleep quality</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function SearchRetrieve() {
  const [keyword, setKeyword] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const [hasSearched, setHasSearched] = useState(false);
  const [isPending, startTransition] = useTransition();

  function runSearch(kw: string, tag: string | null) {
    if (!kw.trim() && !tag) {
      setResults(EMPTY);
      setHasSearched(false);
      return;
    }
    startTransition(async () => {
      const data = await searchAll(kw, tag);
      setResults(data);
      setHasSearched(true);
    });
  }

  function handleKeywordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setKeyword(val);
    runSearch(val, selectedTag);
  }

  function handleTagClick(tag: string) {
    const next = selectedTag === tag ? null : tag;
    setSelectedTag(next);
    runSearch(keyword, next);
  }

  const totalResults = results.journals.length + results.resources.length;

  return (
    <main className="w-full max-w-2xl mx-auto px-4 pt-5 pb-32 space-y-5">

      {/* ── Keyword Search ── */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
        <Input
          type="search"
          placeholder="Search journal entries and resources..."
          value={keyword}
          onChange={handleKeywordChange}
          className="pl-9 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-blue-600"
        />
      </div>

      {/* ── Tag Filter ── */}
      <section aria-label="Filter by tag">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-3.5 h-3.5 text-neutral-500" />
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Filter by tag
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                aria-pressed={active}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150
                  ${active
                    ? "bg-blue-600 border-blue-500 text-white"
                    : "bg-transparent border-neutral-700 text-neutral-400 hover:border-blue-500 hover:text-blue-400"
                  }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── KM Pattern Summary ── */}
      {results.pattern && <PatternCard pattern={results.pattern} />}

      {/* ── Results ── */}
      {hasSearched && (
        <section aria-label="Search results">
          {results.error ? (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
              {results.error}
            </p>
          ) : totalResults === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-neutral-600">
              <Search className="w-10 h-10" />
              <p className="text-sm">No results found.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Journal results */}
              {results.journals.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <NotebookPen className="w-3.5 h-3.5 text-neutral-500" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Journal entries ({results.journals.length})
                    </p>
                  </div>
                  {results.journals.map((j) => (
                    <Card
                      key={j.id}
                      className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-colors"
                    >
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <p className="text-sm font-semibold text-neutral-100">
                          {j.title}
                        </p>
                        <p className="text-xs text-neutral-500 line-clamp-2">
                          {j.body}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-neutral-600">
                            {formatDate(j.created_at)}
                          </span>
                          {j.tags.slice(0, 3).map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="text-[10px] px-2 py-0.5 bg-neutral-800 text-neutral-400 border border-neutral-700"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Resource results */}
              {results.resources.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                      Resources ({results.resources.length})
                    </p>
                  </div>
                  {results.resources.map((r) => (
                    <Card
                      key={r.id}
                      className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-colors"
                    >
                      <CardContent className="pt-4 pb-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-semibold text-neutral-100 leading-snug">
                            {r.title}
                          </p>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${r.title} in new tab`}
                            className="shrink-0 text-neutral-500 hover:text-blue-400 transition-colors mt-0.5"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        {r.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {r.tags.map((t) => (
                              <Badge
                                key={t}
                                variant="secondary"
                                className="text-[10px] px-2 py-0.5 bg-neutral-800 text-neutral-400 border border-neutral-700"
                              >
                                {t}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ── Idle state ── */}
      {!hasSearched && (
        <div className="flex flex-col items-center gap-3 py-20 text-neutral-700">
          <Search className="w-10 h-10" />
          <p className="text-sm">Enter a keyword or select a tag to search.</p>
        </div>
      )}

      {isPending && (
        <div className="fixed inset-0 pointer-events-none flex items-end justify-center pb-36">
          <p className="text-xs text-neutral-500 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-1.5">
            Searching…
          </p>
        </div>
      )}
    </main>
  );
}