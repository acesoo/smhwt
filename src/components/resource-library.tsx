"use client";

import { useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_TAGS } from "@/lib/constants/tags";
import type { Resource } from "@/app/actions/resources";

interface Props {
  initialResources: Resource[];
  fetchError: string | null;
}

// ── Glassmorphism Pills ──
const BASE_PILL =
  "px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 cursor-pointer";
const ACTIVE_PILL = "bg-blue-600/80 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)] backdrop-blur-sm";
const INACTIVE_PILL =
  "bg-transparent border-white/10 text-neutral-400 hover:border-blue-500/50 hover:text-blue-300";

function pillClass(active: boolean) {
  return `${BASE_PILL} ${active ? ACTIVE_PILL : INACTIVE_PILL}`;
}

export function ResourceLibrary({ initialResources, fetchError }: Props) {
  // 1. Changed to a Set to hold multiple tags
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const filtered = initialResources.filter((r) => {
    // Check if the resource includes EVERY tag you currently have selected
    const matchesTag =
      selectedTags.size === 0 || 
      Array.from(selectedTags).every((t) => r.tags.includes(t));
    return matchesTag;
  });

  // 3. Updated toggle logic to add/remove tags from the Set
  function handleTagClick(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  const resultLabel =
    filtered.length === 1 ? "1 resource" : `${filtered.length} resources`;

  return (
    <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-6">

      {/* ── All Tags Filter ── */}
      <section aria-label="Filter resources by topic" className="space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Filter by topic
        </h2>

        <div className="flex flex-wrap gap-2">
          {/* "All" button (Clears the Set) */}
          <button
            onClick={() => setSelectedTags(new Set())}
            className={pillClass(selectedTags.size === 0)}
          >
            All
          </button>

          {/* Sort ALL_TAGS alphabetically before mapping */}
          {[...ALL_TAGS].sort().map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              aria-pressed={selectedTags.has(tag)}
              className={pillClass(selectedTags.has(tag))}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* ── Results ── */}
      <section aria-label="Resource results">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
          {resultLabel}
          {selectedTags.size > 0 ? ` tagged ${Array.from(selectedTags).join(", ")}` : ""}
        </p>

        {fetchError ? (
          <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
            Could not load resources: {fetchError}
          </p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-neutral-600">
            <BookOpen className="w-10 h-10" />
            <p className="text-sm">No resources match your filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((resource) => (
              <Card
                key={resource.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl animate-in fade-in duration-500"
              >
                <CardContent className="pt-4 pb-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-neutral-100 leading-snug">
                      {resource.title}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${resource.title} in new tab`}
                      className="shrink-0 text-neutral-500 hover:text-blue-400 transition-colors mt-0.5"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {resource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {resource.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 bg-neutral-800 text-neutral-400 border border-neutral-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}