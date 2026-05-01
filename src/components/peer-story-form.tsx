"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitPeerStory, type StoryFormState } from "@/app/actions/peer-stories";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

// KM Report Section 9.2 — Layer 3 Forum Tags
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

const initialState: StoryFormState = { success: false };

const BASE_PILL =
  "px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150";
const ACTIVE_PILL = "bg-violet-600 border-violet-500 text-white";
const INACTIVE_PILL =
  "bg-transparent border-neutral-600 text-neutral-400 hover:border-violet-500 hover:text-violet-400";

function pillClass(active: boolean) {
  return `${BASE_PILL} ${active ? ACTIVE_PILL : INACTIVE_PILL}`;
}

export function PeerStoryForm() {
  const [state, formAction, isPending] = useActionState(
    submitPeerStory,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [prevState, setPrevState] = useState(state);

  if (state !== prevState) {
    setPrevState(state);
    if (state.success) {
      setSelectedTags(new Set());
    }
  }

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">

      {/* ── Anonymity notice ── */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-violet-950/30 border border-violet-800">
        <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <p className="text-xs text-violet-300 leading-relaxed">
          Your story is <span className="font-semibold">completely anonymous</span>.
          Your name and account are never shown — not to other users, not in the feed.
          Stories are reviewed before publishing.
        </p>
      </div>

      {/* ── Title ── */}
      <section>
        <label
          htmlFor="story-title"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
        >
          Title
        </label>
        <Input
          id="story-title"
          type="text"
          name="title"
          placeholder="Give your story a short title..."
          maxLength={120}
          className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-violet-600"
        />
      </section>

      {/* ── Body ── */}
      <section>
        <label
          htmlFor="story-body"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
        >
          Your story
        </label>
        <textarea
          id="story-body"
          name="body"
          rows={6}
          placeholder="Share what you went through, what helped, or what you're still working on..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent resize-none"
        />
      </section>

      {/* ── Forum Tags ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          Tags <span className="text-neutral-600 font-normal normal-case">(optional)</span>
        </label>
        <p className="text-xs text-neutral-500 mb-4">
          Help others find your story by tagging what it&apos;s about.
        </p>

        <div className="space-y-4">
          {FORUM_TAG_GROUPS.map((group) => (
            <div key={group.category} className="space-y-2">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={selectedTags.has(tag)}
                    className={pillClass(selectedTags.has(tag))}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {selectedTags.size > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {Array.from(selectedTags).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-violet-900/50 text-violet-300 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <input
          type="hidden"
          name="forum_tags"
          value={Array.from(selectedTags).join(",")}
          readOnly
        />
      </section>

      {/* ── Feedback ── */}
      {state.error && (
        <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-green-400 text-sm bg-green-950/40 border border-green-800 rounded-lg px-4 py-2">
          {state.message}
        </p>
      )}

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : "Share your story"}
      </button>
    </form>
  );
}