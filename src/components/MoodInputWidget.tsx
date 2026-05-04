"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type MoodEntry = {
  date: string; // "YYYY-MM-DD"
  score: number; // 1–10
};

type MoodInputWidgetProps = {
  /** Past mood entries to render on the calendar (from mood_logs table) */
  entries?: MoodEntry[];
  /** Called when user selects a mood score for today */
  onMoodSelect?: (score: number) => void;
  /** The currently selected mood score (controlled) */
  selectedScore?: number | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Returns a "YYYY-MM-DD" string for any Date */
function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Returns the emoji + label for a given mood score (1–10) */
function getMoodEmoji(score: number): { emoji: string; label: string } {
  if (score <= 2) return { emoji: "😞", label: "Very low" };
  if (score <= 4) return { emoji: "😕", label: "Low" };
  if (score <= 6) return { emoji: "😐", label: "Okay" };
  if (score <= 8) return { emoji: "🙂", label: "Good" };
  return { emoji: "😄", label: "Great" };
}

/**
 * Returns a Tailwind bg color class based on mood score.
 * Used to color calendar day cells.
 */
function getMoodColor(score: number): string {
  if (score <= 2) return "bg-red-900/70 border-red-700";
  if (score <= 4) return "bg-orange-900/70 border-orange-700";
  if (score <= 6) return "bg-yellow-900/70 border-yellow-700";
  if (score <= 8) return "bg-blue-900/70 border-blue-600";
  return "bg-green-900/70 border-green-600";
}

/** Returns all days in a given month as Date objects */
function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// ── Emoji Selector ────────────────────────────────────────────────────────────

const EMOJI_OPTIONS = [
  { score: 2,  emoji: "😞", label: "Very low" },
  { score: 4,  emoji: "😕", label: "Low"      },
  { score: 6,  emoji: "😐", label: "Okay"     },
  { score: 8,  emoji: "🙂", label: "Good"     },
  { score: 10, emoji: "😄", label: "Great"    },
];

// ── Main Component ────────────────────────────────────────────────────────────

/**
 * S3-UX-02 — MoodInputWidget
 *
 * A reusable mood picker that combines:
 *   1. A monthly calendar showing past mood entries as colored dots
 *   2. An emoji quick-select for today's mood (maps to 1–10 scale)
 *   3. A numeric fine-tune slider (1–10)
 *
 * Usage in mood log page:
 *   <MoodInputWidget
 *     entries={pastEntries}
 *     selectedScore={moodScore}
 *     onMoodSelect={(score) => setMoodScore(score)}
 *   />
 *
 * The selected score should be passed as a hidden input value
 * into MoodLogForm's formData (name="mood_score").
 */
export function MoodInputWidget({
  entries = [],
  onMoodSelect,
  selectedScore = null,
}: MoodInputWidgetProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Build a lookup map: dateKey → score
  const entryMap = new Map<string, number>(
    entries.map((e) => [e.date, e.score])
  );

  const days = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const todayKey = toDateKey(today);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const currentMood = selectedScore ? getMoodEmoji(selectedScore) : null;

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md space-y-5">

      {/* ── Calendar ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={prevMonth}
            aria-label="Previous month"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200 transition-all duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <span className="text-sm font-semibold text-neutral-200">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>

          <button
            type="button"
            onClick={nextMonth}
            aria-label="Next month"
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200 transition-all duration-150"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d) => (
            <div key={d} className="text-center text-[10px] font-medium text-neutral-500 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for offset */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {days.map((day) => {
            const key = toDateKey(day);
            const score = entryMap.get(key);
            const isToday = key === todayKey;
            const hasEntry = score !== undefined;

            return (
              <div
                key={key}
                title={hasEntry ? `Mood: ${score}/10 — ${getMoodEmoji(score).label}` : undefined}
                className={`
                  relative flex items-center justify-center
                  h-8 rounded-lg text-xs font-medium border transition-all duration-150
                  ${hasEntry
                    ? `${getMoodColor(score)} text-white cursor-default`
                    : isToday
                    ? "border-blue-500 text-blue-400 bg-blue-950/30"
                    : "border-neutral-700 text-neutral-500 bg-neutral-800/50"
                  }
                `}
              >
                {day.getDate()}
                {isToday && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          <span className="text-[10px] text-neutral-500">Mood scale:</span>
          {[
            { label: "1–2", cls: "bg-red-900/70 border-red-700" },
            { label: "3–4", cls: "bg-orange-900/70 border-orange-700" },
            { label: "5–6", cls: "bg-yellow-900/70 border-yellow-700" },
            { label: "7–8", cls: "bg-blue-900/70 border-blue-600" },
            { label: "9–10", cls: "bg-green-900/70 border-green-600" },
          ].map(({ label, cls }) => (
            <div key={label} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded border ${cls}`} aria-hidden="true" />
              <span className="text-[10px] text-neutral-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mood Emoji Selector ── */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-4 text-center">
          How are you feeling today?
        </label>
        <div className="grid grid-cols-5 gap-2">
          {[1, 3, 5, 7, 9].map((baseScore) => {
            const { emoji, label } = getMoodEmoji(baseScore);
            const isSelected = selectedScore !== null && selectedScore >= baseScore && selectedScore < baseScore + 2;
            
            return (
              <button
                key={baseScore}
                type="button"
                onClick={() => onMoodSelect?.(baseScore + 1)}
                className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl transition-all duration-300 border ${
                  isSelected
                    ? "bg-blue-500/20 border-blue-400 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-105"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span className="text-2xl leading-none drop-shadow-md" role="img" aria-hidden="true">{emoji}</span>
                <span className={`text-[10px] font-medium ${isSelected ? "text-blue-300" : ""}`}>{label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Fine-tune Slider ── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="mood-slider"
            className="text-xs font-semibold uppercase tracking-wider text-neutral-400"
          >
            Fine-tune score
          </label>
          {selectedScore && currentMood && (
            <span className="text-xs font-semibold text-blue-400">
              {selectedScore}/10 — {currentMood.label}
            </span>
          )}
        </div>
        <input
          id="mood-slider"
          type="range"
          min={1}
          max={10}
          step={1}
          value={selectedScore ?? 5}
          onChange={(e) => onMoodSelect?.(Number(e.target.value))}
          aria-label="Fine-tune your mood score from 1 to 10"
          aria-valuemin={1}
          aria-valuemax={10}
          aria-valuenow={selectedScore ?? 5}
          className="w-full accent-blue-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
          <span>1 — Very low</span>
          <span>10 — Very high</span>
        </div>
      </section>

    </div>
    </div>
  );
}
