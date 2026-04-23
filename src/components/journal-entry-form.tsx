"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import {
  saveJournalEntry,
  type JournalFormState,
} from "@/app/actions/journal-entry";
import { STRESSOR_TAGS, COPING_TAGS } from "@/lib/taxonomy";

// ── Initial state ─────────────────────────────────────────────────────────────

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

// ── Main Component ────────────────────────────────────────────────────────────

/**
 * S3-DEV-03 — JournalEntryForm
 *
 * Implements the "Journal" tab from wireframe S2-UX-01.
 * Features:
 *   - Title field
 *   - Free-text reflection body (multi-line)
 *   - Combined taxonomy tag selector (Stressors + Coping Responses)
 *     Tags link journal entries to the knowledge taxonomy defined in
 *     km-architecture.md so entries are retrievable by tag in the Search screen.
 * Submits via Server Action — user_id is attached server-side from session.
 */
export function JournalEntryForm() {
  const [state, formAction, isPending] = useActionState(
    saveJournalEntry,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Wrap the reset logic in a useEffect so it runs AFTER the render
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      
      // Defer state updates to the next tick to avoid the cascading render warning
      setTimeout(() => {
        setSelectedTags(new Set());
      }, 0);
    }
  }, [state.success]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      // Replaced the ternary operator with a standard if/else
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
          className="
            w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3
            text-sm text-neutral-200 placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
          "
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
          className="
            w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3
            text-sm text-neutral-200 placeholder-neutral-500 leading-relaxed
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
            resize-none
          "
        />
      </section>

      {/* ── Tags ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">
          Tags
        </label>
        <p className="text-xs text-neutral-500 mb-3">
          Select stressors and coping strategies that apply to this entry.
        </p>

        {/* Stressor group */}
        <p className="text-xs text-neutral-500 mb-2">Stressors</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {STRESSOR_TAGS.map((tag) => (
            <TagPill
              key={tag}
              label={tag}
              selected={selectedTags.has(tag)}
              onToggle={() => toggleTag(tag)}
            />
          ))}
        </div>

        {/* Coping group */}
        <p className="text-xs text-neutral-500 mb-2">Coping responses</p>
        <div className="flex flex-wrap gap-2">
          {COPING_TAGS.map((tag) => (
            <TagPill
              key={tag}
              label={tag}
              selected={selectedTags.has(tag)}
              onToggle={() => toggleTag(tag)}
            />
          ))}
        </div>

        {/* Selected tags preview */}
        {selectedTags.size > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
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

      {/* ── Feedback Messages ── */}
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
        className="
          w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150
          bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        {isPending ? "Saving..." : "Save journal entry"}
      </button>
    </form>
  );
}