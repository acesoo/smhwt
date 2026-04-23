"use client";

import { useActionState, useRef, useState, useEffect } from "react";
import { saveMoodLog, type MoodLogFormState } from "@/app/actions/mood-log";
import {
  STRESSOR_TAGS,
  COPING_TAGS,
  ACADEMIC_IMPACT_OPTIONS,
} from "@/lib/taxonomy";

// ── Initial state ─────────────────────────────────────────────────────────────

const initialState: MoodLogFormState = { success: false };

// ── Sub-components ────────────────────────────────────────────────────────────

/** A single selectable tag pill */
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
 * S3-DEV-02 — MoodLogForm
 *
 * Implements the "Mood Log" tab from wireframe S2-UX-01.
 * Features:
 *   - 1–10 mood score selector (numeric buttons matching wireframe)
 *   - Optional free-text note
 *   - Sleep quality (1–5 scale)
 *   - Academic impact (None / Minor / Moderate / Severe)
 *   - Stressor tag multi-select (from KM taxonomy)
 *   - Coping response tag multi-select (from KM taxonomy)
 * Submits via Server Action — user_id is attached server-side from session.
 */
export function MoodLogForm() {
  const [state, formAction, isPending] = useActionState(
    saveMoodLog,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  // Local state for interactive selections (not sent via formData directly —
  // we serialize them into hidden inputs before submit)
  const [moodScore, setMoodScore] = useState<number | null>(null);
  const [sleepQuality, setSleepQuality] = useState<number | null>(null);
  const [academicImpact, setAcademicImpact] = useState("None");
  const [selectedStressors, setSelectedStressors] = useState<Set<string>>(
    new Set()
  );
  const [selectedCoping, setSelectedCoping] = useState<Set<string>>(new Set());

  // Wrap the reset logic in a useEffect so it runs AFTER the render
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      
      // Defer state updates to the next tick to avoid the cascading render warning
      setTimeout(() => {
        setMoodScore(null);
        setSleepQuality(null);
        setAcademicImpact("None");
        setSelectedStressors(new Set());
        setSelectedCoping(new Set());
      }, 0);
    }
  }, [state.success]);

  function toggleStressor(tag: string) {
    setSelectedStressors((prev) => {
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

  function toggleCoping(tag: string) {
    setSelectedCoping((prev) => {
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
    <form ref={formRef} action={formAction} className="space-y-6">
      {/* ── Mood Score ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          How are you feeling? (1–10)
        </label>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setMoodScore(n)}
              className={`
                w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150
                ${
                  moodScore === n
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }
              `}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-neutral-500 mt-1 px-0.5">
          <span>Very low</span>
          <span>Very high</span>
        </div>
        {/* Hidden input carries the selected score into formData */}
        <input
          type="hidden"
          name="mood_score"
          value={moodScore ?? ""}
          readOnly
        />
      </section>

      {/* ── Optional Note ── */}
      <section>
        <label
          htmlFor="mood-note"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2"
        >
          Add a note (optional)
        </label>
        <textarea
          id="mood-note"
          name="note"
          rows={2}
          placeholder="Feeling okay, a bit tired after class..."
          className="
            w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3
            text-sm text-neutral-200 placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent
            resize-none
          "
        />
      </section>

      {/* ── Sleep Quality ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          Sleep quality (1–5)
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSleepQuality(n)}
              className={`
                flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-150
                ${
                  sleepQuality === n
                    ? "bg-indigo-600 text-white"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                }
              `}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-neutral-500 mt-1 px-0.5">
          <span>Very poor</span>
          <span>Excellent</span>
        </div>
        <input
          type="hidden"
          name="sleep_quality"
          value={sleepQuality ?? ""}
          readOnly
        />
      </section>

      {/* ── Academic Impact ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          Academic impact
        </label>
        <div className="flex gap-2 flex-wrap">
          {ACADEMIC_IMPACT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setAcademicImpact(value)}
              className={`
                px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150
                ${
                  academicImpact === value
                    ? "bg-violet-600 border-violet-500 text-white"
                    : "bg-transparent border-neutral-600 text-neutral-400 hover:border-violet-500 hover:text-violet-400"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
        <input
          type="hidden"
          name="academic_impact"
          value={academicImpact}
          readOnly
        />
      </section>

      {/* ── Stressor Tags ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          Tag your stressors
        </label>
        <div className="flex flex-wrap gap-2">
          {STRESSOR_TAGS.map((tag) => (
            <TagPill
              key={tag}
              label={tag}
              selected={selectedStressors.has(tag)}
              onToggle={() => toggleStressor(tag)}
            />
          ))}
        </div>
        <input
          type="hidden"
          name="stressor_tags"
          value={Array.from(selectedStressors).join(",")}
          readOnly
        />
      </section>

      {/* ── Coping Response Tags ── */}
      <section>
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
          Coping response
        </label>
        <div className="flex flex-wrap gap-2">
          {COPING_TAGS.map((tag) => (
            <TagPill
              key={tag}
              label={tag}
              selected={selectedCoping.has(tag)}
              onToggle={() => toggleCoping(tag)}
            />
          ))}
        </div>
        <input
          type="hidden"
          name="coping_tags"
          value={Array.from(selectedCoping).join(",")}
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
        disabled={isPending || !moodScore || !sleepQuality}
        className="
          w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150
          bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700
          disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        {isPending ? "Saving..." : "Save mood log"}
      </button>
    </form>
  );
}