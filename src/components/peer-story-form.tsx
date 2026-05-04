"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitPeerStory, type StoryFormState } from "@/app/actions/peer-stories";
import { ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FORUM_TAG_GROUPS } from "@/lib/constants/tags";

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
    <form ref={formRef} action={formAction} className="space-y-6">

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
      <section className="space-y-2">
        <label
          htmlFor="story-title"
          className="block text-sm font-semibold text-neutral-200"
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

      <div className="border-t border-neutral-800" />

      {/* ── Body ── */}
      <section className="space-y-2">
        <label
          htmlFor="story-body"
          className="block text-sm font-semibold text-neutral-200"
        >
          Your Story
        </label>
        <p className="text-xs text-neutral-500">
          Share what you went through, what helped, or what you wish others knew.
        </p>
        <textarea
          id="story-body"
          name="body"
          rows={6}
          placeholder="Share what you went through, what helped, or what you're still working on..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent resize-none"
        />
      </section>

      <div className="border-t border-neutral-800" />

      {/* ── Forum Tags ── */}
      <section className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-neutral-200">
            Tags <span className="text-neutral-500 font-normal text-xs">(optional)</span>
          </label>
          <p className="text-xs text-neutral-500 mt-1">
            Help others find your story by tagging what it&apos;s about.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4">
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
          <div className="flex flex-wrap gap-1.5">
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
        <div className="flex flex-col items-center gap-3 py-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="w-14 h-14 rounded-full bg-green-900/50 border border-green-700 flex items-center justify-center">
            <svg
              className="w-7 h-7 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-green-400">Story submitted!</p>
            <p className="text-xs text-neutral-500">
              Your story is under review and will appear in the feed once approved.
            </p>
          </div>
        </div>
      )}

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white disabled:opacity-40 disabled:cursor-not-allowed border border-violet-500"
      >
        {isPending ? "Submitting..." : "Share your story"}
      </button>

    </form>
  );
}