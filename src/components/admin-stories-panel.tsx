"use client";

import { useTransition, useState } from "react";
import { CheckCircle, EyeOff, Clock, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toggleStoryApproval, type AdminStory } from "@/app/actions/admin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const BASE_BTN =
  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed";

interface Props {
  initialStories: AdminStory[];
}

export function AdminStoriesPanel({ initialStories }: Props) {
  const [stories, setStories] = useState<AdminStory[]>(initialStories);
  const [isPending, startTransition] = useTransition();
  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "approved">("all");
  const [feedbackId, setFeedbackId] = useState<string | null>(null);

  const filtered = stories.filter((s) => {
    if (activeFilter === "pending")  return !s.is_approved;
    if (activeFilter === "approved") return s.is_approved;
    return true;
  });

  const pendingCount  = stories.filter((s) => !s.is_approved).length;
  const approvedCount = stories.filter((s) =>  s.is_approved).length;

  function handleToggle(story: AdminStory) {
    startTransition(async () => {
      const { error } = await toggleStoryApproval(story.id, story.is_approved);
      if (!error) {
        setStories((prev) =>
          prev.map((s) =>
            s.id === story.id ? { ...s, is_approved: !s.is_approved } : s
          )
        );
        setFeedbackId(story.id);
        setTimeout(() => setFeedbackId(null), 2000);
      }
    });
  }

  return (
    <div className="space-y-5">

      {/* ── Summary stats ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total",    count: stories.length,  filter: "all"      },
          { label: "Pending",  count: pendingCount,    filter: "pending"  },
          { label: "Approved", count: approvedCount,   filter: "approved" },
        ].map(({ label, count, filter }) => {
          const active = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as typeof activeFilter)}
              className={`rounded-xl border px-3 py-3 text-left transition-all duration-150
                ${active
                  ? "bg-neutral-800 border-neutral-600"
                  : "bg-neutral-900 border-neutral-800 hover:border-neutral-700"
                }`}
            >
              <p className="text-lg font-semibold text-neutral-100 leading-none">
                {count}
              </p>
              <p className="text-[10px] text-neutral-500 mt-1">{label}</p>
            </button>
          );
        })}
      </div>

      {/* ── Story list ── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-neutral-600">
          <Clock className="w-10 h-10" />
          <p className="text-sm">No stories in this category.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((story) => (
            <Card
              key={story.id}
              className={`border transition-colors
                ${story.is_approved
                  ? "bg-neutral-900 border-green-900/50"
                  : "bg-neutral-900 border-amber-900/50"
                }`}
            >
              <CardContent className="pt-4 pb-4 space-y-3">

                {/* Status badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {story.is_approved ? (
                      <>
                        <BadgeCheck className="w-3.5 h-3.5 text-green-500" />
                        <span className="text-[10px] font-semibold text-green-500 uppercase tracking-wider">
                          Approved
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-semibold text-amber-500 uppercase tracking-wider">
                          Pending
                        </span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-neutral-600">
                    {formatDate(story.created_at)}
                  </span>
                </div>

                {/* Title */}
                <p className="text-sm font-semibold text-neutral-100 leading-snug">
                  {story.title}
                </p>

                {/* Body preview */}
                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {story.body}
                </p>

                {/* Forum tags */}
                {story.forum_tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
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
                )}

                {/* Approve / Hide action */}
                <div className="flex items-center justify-between pt-1">
                  {feedbackId === story.id && (
                    <span className="text-[10px] text-blue-400">
                      Updated
                    </span>
                  )}
                  <div className="ml-auto">
                    {story.is_approved ? (
                      <button
                        onClick={() => handleToggle(story)}
                        disabled={isPending}
                        className={`${BASE_BTN} text-red-400 border-red-900 hover:bg-red-950/30`}
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        Hide
                      </button>
                    ) : (
                      <button
                        onClick={() => handleToggle(story)}
                        disabled={isPending}
                        className={`${BASE_BTN} text-green-400 border-green-900 hover:bg-green-950/30`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}