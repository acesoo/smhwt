"use client";

import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type MoodEntry = {
  date: string;   // "YYYY-MM-DD"
  score: number;  // 1–10
  note?: string;
};

type JournalEntry = {
  id: string;
  title: string;
  created_at: string;
  tags?: string[];
};

type WellnessGoal = {
  id: string;
  goal: string;
  status: "active" | "completed" | "abandoned";
};

type DashboardSummaryCardProps = {
  /** User's display name */
  userName?: string;
  /** Current logging streak in days */
  streak?: number;
  /** Last 7 days of mood entries */
  recentMoodEntries?: MoodEntry[];
  /** Last 3 journal entries */
  recentJournalEntries?: JournalEntry[];
  /** Active wellness goals */
  activeGoals?: WellnessGoal[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function getMoodColor(score: number): string {
  if (score <= 2) return "#ef4444";
  if (score <= 4) return "#f97316";
  if (score <= 6) return "#eab308";
  if (score <= 8) return "#3b82f6";
  return "#22c55e";
}

function getMoodEmoji(score: number): string {
  if (score <= 2) return "😞";
  if (score <= 4) return "😕";
  if (score <= 6) return "😐";
  if (score <= 8) return "🙂";
  return "😄";
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function getAvgMood(entries: MoodEntry[]): number | null {
  if (!entries.length) return null;
  return Math.round(
    entries.reduce((sum, e) => sum + e.score, 0) / entries.length
  );
}

// ── Mini Trend Chart ──────────────────────────────────────────────────────────

function MoodTrendChart({ entries }: { entries: MoodEntry[] }) {
  if (!entries.length) {
    return (
      <div className="flex items-center justify-center h-14 text-xs text-neutral-500">
        No mood data yet
      </div>
    );
  }

  const sorted = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const max = 10;
  const width = 260;
  const height = 56;
  const pad = 6;

  const points = sorted.map((e, i) => {
    const x = pad + (i / Math.max(sorted.length - 1, 1)) * (width - pad * 2);
    const y = height - pad - ((e.score / max) * (height - pad * 2));
    return { x, y, score: e.score, date: e.date };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD =
    `M ${points[0].x} ${height} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x} ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-label="7-day mood trend chart"
      role="img"
      className="w-full"
      style={{ height: 56 }}
    >
      <defs>
        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#trendGrad)" />
      <path
        d={pathD}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={getMoodColor(p.score)}
          stroke="#1a1a1a"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

/**
 * S3-UX-03 — DashboardSummaryCard
 *
 * A dashboard widget showing:
 *   - Greeting + logging streak
 *   - Average mood stat + 7-day trend sparkline
 *   - Recent journal entries feed
 *   - Active wellness goals count
 *
 * Usage in dashboard page (src/app/page.tsx):
 *   <DashboardSummaryCard
 *     userName="Jamie"
 *     streak={4}
 *     recentMoodEntries={moodLogs}
 *     recentJournalEntries={journals}
 *     activeGoals={goals}
 *   />
 */
export function DashboardSummaryCard({
  userName = "there",
  streak = 0,
  recentMoodEntries = [],
  recentJournalEntries = [],
  activeGoals = [],
}: DashboardSummaryCardProps) {
  const avgMood = getAvgMood(recentMoodEntries);
  const activeGoalCount = activeGoals.filter((g) => g.status === "active").length;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">

      {/* ── Greeting Header ── */}
      <div className="px-5 pt-5 pb-4 border-b border-neutral-800">
        <p className="text-xs text-neutral-500 mb-0.5">
          {new Date().toLocaleDateString(undefined, {
            weekday: "long", month: "long", day: "numeric",
          })}
        </p>
        <h2 className="text-base font-semibold text-neutral-100">
          {greeting}, {userName} 👋
        </h2>
        {streak > 0 && (
          <p className="text-xs text-neutral-400 mt-1">
            You have logged{" "}
            <span className="text-blue-400 font-semibold">{streak} day{streak !== 1 ? "s" : ""}</span>{" "}
            in a row
          </p>
        )}
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-3 divide-x divide-neutral-800 border-b border-neutral-800">
        {/* Streak */}
        <div className="px-4 py-3 flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            Streak
          </span>
          <span className="text-2xl font-semibold text-neutral-100 leading-none">
            {streak}
          </span>
          <span className="text-[10px] text-neutral-500">days</span>
        </div>

        {/* Avg Mood */}
        <div className="px-4 py-3 flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            Avg mood
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold text-neutral-100 leading-none">
              {avgMood ?? "—"}
            </span>
            {avgMood && (
              <span className="text-base leading-none" role="img" aria-label={`mood emoji`}>
                {getMoodEmoji(avgMood)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-neutral-500">last 7 days</span>
        </div>

        {/* Goals */}
        <div className="px-4 py-3 flex flex-col gap-0.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
            Goals
          </span>
          <span className="text-2xl font-semibold text-neutral-100 leading-none">
            {activeGoalCount}
          </span>
          <span className="text-[10px] text-neutral-500">active</span>
        </div>
      </div>

      {/* ── Mood Trend Chart ── */}
      <div className="px-5 pt-4 pb-3 border-b border-neutral-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Mood trend
          </span>
          <span className="text-[10px] text-neutral-500">Last 7 days</span>
        </div>
        <MoodTrendChart entries={recentMoodEntries} />
      </div>

      {/* ── Recent Journal Entries ── */}
      <div className="px-5 pt-4 pb-5">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 block mb-3">
          Recent entries
        </span>

        {recentJournalEntries.length === 0 ? (
          <p className="text-xs text-neutral-500 py-2">
            No journal entries yet — start writing!
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {recentJournalEntries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="flex items-start gap-3 py-2 border-b border-neutral-800 last:border-b-0"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-200 font-medium truncate">
                    {entry.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[10px] text-neutral-500">
                      Journal · {formatDate(entry.created_at)}
                    </span>
                    {entry.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded-full border border-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
