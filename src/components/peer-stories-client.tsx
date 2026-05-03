"use client";

import { useState, useRef, useEffect } from "react";
import { BookHeart, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PeerStoryForm } from "@/components/peer-story-form";
import type { PeerStory } from "@/app/actions/peer-stories";
import { FORUM_TAG_GROUPS } from "@/lib/constants/tags";

const BASE_PILL =
  "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer";
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

export function StoryFeedSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="bg-neutral-900 border-neutral-800">
          <CardContent className="pt-4 pb-4 space-y-3">
            <Skeleton className="h-3 w-20 bg-neutral-800" />
            <Skeleton className="h-4 w-3/4 bg-neutral-800" />
            <Skeleton className="h-3 w-full bg-neutral-800" />
            <Skeleton className="h-3 w-full bg-neutral-800" />
            <Skeleton className="h-3 w-2/3 bg-neutral-800" />
            <div className="flex gap-2 pt-1 border-t border-neutral-800">
              <Skeleton className="h-3 w-16 bg-neutral-800" />
              <Skeleton className="h-3 w-12 bg-neutral-800" />
              <Skeleton className="h-3 w-12 bg-neutral-800" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StoryCard({ story }: { story: PeerStory }) {
  const [expanded, setExpanded] = useState(false);
  const [reactions, setReactions] = useState<Record<string, number>>({
    "🤍": 0, "💪": 0, "🫂": 0,
  });
  const [myReaction, setMyReaction] = useState<string | null>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    if (bodyRef.current) {
      setIsClamped(bodyRef.current.scrollHeight > bodyRef.current.clientHeight);
    }
  }, []);

  function handleReaction(emoji: string) {
    setReactions((prev) => {
      const updated = { ...prev };
      if (myReaction === emoji) {
        updated[emoji] = Math.max(0, updated[emoji] - 1);
        setMyReaction(null);
      } else {
        if (myReaction) updated[myReaction] = Math.max(0, updated[myReaction] - 1);
        updated[emoji] = updated[emoji] + 1;
        setMyReaction(emoji);
      }
      return updated;
    });
  }

  return (
    <Card className="bg-neutral-900 border-neutral-800 hover:border-violet-800/50 transition-colors">
      <CardContent className="pt-4 pb-4 space-y-3">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3 h-3 text-violet-500" />
          <span className="text-[10px] text-violet-500 font-medium">Anonymous</span>
        </div>
        <p className="text-sm font-semibold text-neutral-100 leading-snug">
          {story.title}
        </p>
        <p ref={bodyRef} className={`text-xs text-neutral-400 leading-relaxed ${expanded ? "" : "line-clamp-3"}`}>
          {story.body}
        </p>
        {(isClamped || expanded) && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1 text-[11px] text-violet-400 hover:text-violet-300 transition-colors"
          >
            {expanded ? (
              <><ChevronUp className="w-3 h-3" /> Show less</>
            ) : (
              <><ChevronDown className="w-3 h-3" /> Read more</>
            )}
          </button>
        )}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-800">
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
          <div className="ml-auto flex items-center gap-1">
            {Object.entries(reactions).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border transition-all ${
                  myReaction === emoji
                    ? "bg-violet-900/50 border-violet-600 text-violet-300"
                    : "bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-violet-600 hover:text-violet-300"
                }`}
              >
                <span>{emoji}</span>
                {count > 0 && <span>{count}</span>}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PeerStoriesClient({ initialStories, fetchError }: Props) {
  const [activeTab, setActiveTab] = useState<"feed" | "share">("feed");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "liked">("newest");

  const filtered = (selectedTag
    ? initialStories.filter((s) => s.forum_tags.includes(selectedTag))
    : initialStories
  ).sort((a, b) =>
    sortBy === "newest"
      ? new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      : 0
  );

  function handleTagClick(tag: string) {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  }

  return (
    <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-5">

      {/* ── Tab Switcher ── */}
      <div className="flex bg-neutral-900/50 p-1 rounded-lg border border-neutral-800">
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

          {/* Anonymity Notice — feed only */}
          <div className="flex items-center gap-2 bg-violet-950/40 border border-violet-800/50 rounded-lg px-4 py-3">
            <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
            <p className="text-xs text-violet-300">
              All stories are shared anonymously. No personal information is ever shown.
            </p>
          </div>

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

          {/* Results count + Sort */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {filtered.length} {filtered.length === 1 ? "story" : "stories"}
              {selectedTag ? ` tagged ${selectedTag}` : ""}
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "newest" | "liked")}
              className="text-xs bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-lg px-2 py-1 cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="liked">Most liked</option>
            </select>
          </div>

          {/* Stories */}
          {fetchError ? (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
              Could not load stories: {fetchError}
            </p>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-neutral-600">
              <BookHeart className="w-10 h-10" />
              <p className="text-sm text-center">
                No stories yet{selectedTag ? ` tagged ${selectedTag}` : ""}.
                <br />Be the first to share yours.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((story) => (
                <StoryCard key={story.id} story={story} />
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