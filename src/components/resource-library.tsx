"use client";

import { useState } from "react";
import { ExternalLink, Search, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COPING_TAG_GROUPS } from "@/lib/constants/tags";
import type { Resource } from "@/app/actions/resources";

interface Props {
  initialResources: Resource[];
  fetchError: string | null;
}

const BASE_PILL =
  "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150";
const ACTIVE_PILL = "bg-blue-600 border-blue-500 text-white";
const INACTIVE_PILL =
  "bg-transparent border-neutral-600 text-neutral-400 hover:border-blue-500 hover:text-blue-400";

function pillClass(active: boolean) {
  return `${BASE_PILL} ${active ? ACTIVE_PILL : INACTIVE_PILL}`;
}

export function ResourceLibrary({ initialResources, fetchError }: Props) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = initialResources.filter((r) => {
    const matchesTag = !selectedTag || r.tags.includes(selectedTag);
    const matchesSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  function handleTagClick(tag: string) {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  const resultLabel =
    filtered.length === 1 ? "1 resource" : `${filtered.length} resources`;

  return (
    <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-6">

      {/* ── Search Input ── */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
        <Input
          type="search"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-blue-600"
        />
      </div>

      {/* ── Coping Tag Filters ── */}
      <section aria-label="Filter by coping strategy">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
          Filter by coping strategy
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedTag(null)}
            aria-pressed={!selectedTag}
            className={pillClass(!selectedTag)}
          >
            All
          </button>
        </div>

        <div className="space-y-4">
          {COPING_TAG_GROUPS.map((group) => (
            <div key={group.category} className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    aria-pressed={selectedTag === tag}
                    className={pillClass(selectedTag === tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Results ── */}
      <section aria-label="Resource results">
        <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
          {resultLabel}
          {selectedTag ? ` tagged ${selectedTag}` : ""}
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
                className="bg-neutral-900 border-neutral-800 hover:border-neutral-600 transition-colors"
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