"use client";

import { useState } from "react";
import { BookHeart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PeerStoryForm } from "@/components/peer-story-form";
import type { PeerStory } from "@/app/actions/peer-stories";

const FORUM_TAG_GROUPS = [
  {
    category: "Shared Experience",
    tags: ["#MyStory", "#WhatHelpedMe", "#StillStruggling", "#GettingBetter"],
  },
  {
    category: "Peer Advice",
    tags: ["#TryThis", "#WhatWorkedForMe", "#ResourceTip", "#AskingForAdvice"],
  },
  {
    category: "Resource Sharing",
    tags: ["#ArticleShare", "#ToolRecommendation"],
  },
  {
    category: "Community Support",
    tags: ["#YouAreNotAlone", "#CheckingIn"],
  },
] as const;

const BASE_PILL =
  "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150";
const ACTIVE_PILL = "bg-violet-600 border-violet-500 text-white";
const INACTIVE_PILL =
  "bg-transparent border-neutral-600 text-neutral-400 hover:border-violet-500 hover:text-violet-400";

function pillClass(active: boolean) {
  return `${BASE_PILL} ${active ? ACTIVE_PILL : INACTIVE_PILL}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface Props {
  initialStories: PeerStory[];
  fetchError: string | null;
}

export function PeerStoriesClient({ initialStories, fetchError }: Props) {
  const [activeTab, setActiveTab] = useState<"feed" | "share">("feed");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = selectedTag
    ? initialStories.filter((s) => s.forum_tags.includes(selectedTag))
    : initialStories;

  function handleTagClick(tag: string) {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <main className="px-4 pt-5 pb-32 space-y-5">

      {/* ── Tab Switcher ── */}
      <div className="flex bg-neutral-900/50 p-1 rounded-lg mb-8 border border-neutral-800">
        <button
          onClick={() => setActiveTab("feed")}
          className={`flex-1 text-center py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === "feed"
              ? "bg-neutral-800 text-neutral-100 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
          }`}
        >
          Browse Stories
        </button>
        <button
          onClick={() => setActiveTab("share")}
          className={`flex-1 text-center py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === "share"
              ? "bg-neutral-800 text-neutral-100 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
          }`}
        >
          Share a Story
        </button>
      </div>

      {/* ── Feed Tab ── */}
      {activeTab === "feed" && (
        <div className="space-y-5">

          {/* Tag filters */}
          <section aria-label="Filter stories by tag">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              Filter by tag
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

            <div className="space-y-3">
              {FORUM_TAG_GROUPS.map((group) => (
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

          {/* Results count */}
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            {selectedTag ? ` tagged ${selectedTag}` : ""}
          </p>

          {/* Error state */}
          {fetchError ? (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
              Could not load stories: {fetchError}
            </p>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-neutral-600">
              <BookHeart className="w-10 h-10" />
              <p className="text-sm text-center">
                No stories yet
                {selectedTag ? ` tagged ${selectedTag}` : ""}.
                <br />Be the first to share yours.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((story) => (
                <Card
                  key={story.id}
                  className="bg-neutral-900 border-neutral-800 hover:border-neutral-700 transition-colors"
                >
                  <CardContent className="pt-4 pb-4 space-y-3">
                    {/* Title — no author shown */}
                    <p className="text-sm font-semibold text-neutral-100 leading-snug">
                      {story.title}
                    </p>

                    {/* Body preview */}
                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {story.body}
                    </p>

                    {/* Footer: date + tags — NO identity info */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-neutral-600">
                        {formatDate(story.created_at)}
                      </span>
                      {story.forum_tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-[10px] px-2 py-0.5 bg-neutral-800 text-neutral-400 border border-neutral-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Share Tab ── */}
      {activeTab === "share" && <PeerStoryForm />}
    </main>
  );
}