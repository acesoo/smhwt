"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { saveMoodLog, type MoodLogFormState } from "@/app/actions/mood-log";
import { STRESSOR_TAG_GROUPS, COPING_TAG_GROUPS } from "@/lib/constants/tags";
import { ACADEMIC_IMPACT_OPTIONS } from "@/lib/taxonomy";

const initialState: MoodLogFormState = { success: false };

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

interface MoodLogFormProps {
  moodScore: number | null;
}

export function MoodLogForm({ moodScore }: MoodLogFormProps) {
  const [state, formAction, isPending] = useActionState(
    saveMoodLog,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  const [sleepQuality, setSleepQuality] = useState<number | null>(null);
  const [academicImpact, setAcademicImpact] = useState("None");
  const [selectedStressors, setSelectedStressors] = useState<Set<string>>(new Set());
  const [selectedCoping, setSelectedCoping] = useState<Set<string>>(new Set());
  const [prevState, setPrevState] = useState(state);

  if (state !== prevState) {
    setPrevState(state);
    if (state.success) {
      setSleepQuality(null);
      setAcademicImpact("None");
      setSelectedStressors(new Set());
      setSelectedCoping(new Set());
    }
  }

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  function toggleStressor(tag: string) {
    setSelectedStressors((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function toggleCoping(tag: string) {
    setSelectedCoping((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">

      <input type="hidden" name="mood_score" value={moodScore ?? ""} readOnly />

      {/* ── Optional Note ── */}
      <section className="space-y-2">
        <label
          htmlFor="mood-note"
          className="block text-sm font-semibold text-neutral-200"
        >
          Add a note <span className="text-neutral-500 font-normal text-xs">(optional)</span>
        </label>
        <textarea
          id="mood-note"
          name="note"
          rows={2}
          placeholder="Feeling okay, a bit tired after class..."
          className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
        />
      </section>

      <div className="border-t border-neutral-800" />

      {/* ── Sleep Quality ── */}
      <section className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Sleep quality <span className="text-neutral-500 font-normal text-xs">(1–5)</span>
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setSleepQuality(n)}
              aria-pressed={sleepQuality === n}
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
        <div className="flex justify-between text-xs text-neutral-500 px-0.5">
          <span>Very poor</span>
          <span>Excellent</span>
        </div>
        <input type="hidden" name="sleep_quality" value={sleepQuality ?? ""} readOnly />
      </section>

      <div className="border-t border-neutral-800" />

      {/* ── Academic Impact ── */}
      <section className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Academic impact
        </label>
        <div className="flex gap-2 flex-wrap">
          {ACADEMIC_IMPACT_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setAcademicImpact(value)}
              aria-pressed={academicImpact === value}
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
        <input type="hidden" name="academic_impact" value={academicImpact} readOnly />
      </section>

      <div className="border-t border-neutral-800" />

      {/* ── Stressor Tags ── */}
      <section className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Tag your stressors
        </label>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4">
          {STRESSOR_TAG_GROUPS.map((group) => (
            <TagGroup
              key={group.category}
              category={group.category}
              tags={group.tags}
              selected={selectedStressors}
              onToggle={toggleStressor}
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

      <div className="border-t border-neutral-800" />

      {/* ── Coping Response Tags ── */}
      <section className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Coping response
        </label>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-4">
          {COPING_TAG_GROUPS.map((group) => (
            <TagGroup
              key={group.category}
              category={group.category}
              tags={group.tags}
              selected={selectedCoping}
              onToggle={toggleCoping}
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
            <p className="text-sm font-semibold text-green-400">Mood log saved!</p>
            <p className="text-xs text-neutral-500">
              Your entry has been recorded successfully.
            </p>
          </div>
        </div>
      )}

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={isPending || moodScore === null || !sleepQuality}
        className="w-full py-3 rounded-xl font-semibold text-sm transition-all duration-150 bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? "Saving..." : "Save mood log"}
      </button>

    </form>
  );
}