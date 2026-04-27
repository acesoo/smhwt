"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { saveJournalEntry, type JournalFormState } from "@/app/actions/journal-entry";
import { STRESSOR_TAG_GROUPS, COPING_TAG_GROUPS } from "@/lib/constants/tags";

const initialState: JournalFormState = { success: false };

// ── Sub-components ────────────────────────────────────────────────────────────

function TagPill({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`
        px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150
        ${
          selected
            ? "bg-blue-600 border-blue-500 text-white"
            : "bg-transparent border-neutral-600 text-neutral-400 hover:border-blue-500 hover:text-blue-400"
        }
      `}
    >
      {label}
    </button>
  );
}

function TagGroup({
  category,
  tags,
  selected,
  onToggle,
}: {
  category: string;
  tags: readonly string[];
  selected: Set<string>;
  onToggle: (tag: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-600">
        {category}
      </p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <TagPill
            key={tag}
            label={tag}
            selected={selected.has(tag)}
            onToggle={() => onToggle(tag)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function JournalEntryForm() {
  const [state, formAction, isPending] = useActionState(
    saveJournalEntry,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Add this new state to track the previous action state
  const [prevState, setPrevState] = useState(state);

  // React official pattern: Reset local state during render when external state changes
  if (state !== prevState) {
    setPrevState(state);
    if (state.success) {
      setSelectedTags(new Set());
    }
  }

  // Only manipulate the DOM (uncontrolled elements) inside the effect
  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      // Replaced the ternary operator with a standard if/else statement
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
      {/* ── Title ── */}
      <section>
        <label
          htmlFor="journal-title"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
        >
          Title
        </label>
        <input
          id="journal-title"
          type="text"
          name="title"
          placeholder="Reflection after midterms..."
          maxLength={120}
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </section>

      {/* ── Body ── */}
      <section>
        <label
          htmlFor="journal-body"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
        >
          Write your reflection
        </label>
        <textarea
          id="journal-body"
          name="body"
          rows={6}
          placeholder="Today felt heavy. I kept second-guessing my answers even after I submitted..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
        />
      </section>

      {/* ── Tags — stressors then coping, both grouped ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          Tags
        </label>
        <p className="text-xs text-neutral-500 mb-4">
          Tag the stressors and coping responses present in this entry.
        </p>

        <p className="text-xs font-semibold text-neutral-500 mb-3">Stressors</p>
        <div className="space-y-4 mb-6">
          {STRESSOR_TAG_GROUPS.map((group) => (
            <TagGroup
              key={group.category}
              category={group.category}
              tags={group.tags}
              selected={selectedTags}
              onToggle={toggleTag}
            />
          ))}
        </div>

        <p className="text-xs font-semibold text-neutral-500 mb-3">Coping responses</p>
        <div className="space-y-4">
          {COPING_TAG_GROUPS.map((group) => (
            <TagGroup
              key={group.category}
              category={group.category}
              tags={group.tags}
              selected={selectedTags}
              onToggle={toggleTag}
            />
          ))}
        </div>

        {selectedTags.size > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {Array.from(selectedTags).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <input
          type="hidden"
          name="tags"
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
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? "Saving..." : "Save journal entry"}
      </button>
    </form>
  );
}