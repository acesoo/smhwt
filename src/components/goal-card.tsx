"use client";

import { useState } from "react";
import {
  updateGoalStatusAction,
  deleteGoalAction,
  type WellnessGoal,
  type GoalStatus,
} from "@/app/actions/wellness-goals";

type StatusConfig = {
  label: string;
  transitions: { value: GoalStatus; label: string }[];
  badgeColor: string;
};

const STATUS_CONFIG: Record<GoalStatus, StatusConfig> = {
  active: {
    label: "Active",
    transitions: [
      { value: "completed", label: "Mark Complete" },
      { value: "abandoned", label: "Abandon" },
    ],
    // Made the badge glow blue
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.3)] backdrop-blur-sm",
  },
  completed: {
    label: "Completed ✓",
    transitions: [{ value: "active", label: "Reactivate" }],
    // Made the badge glow emerald
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)] backdrop-blur-sm",
  },
  abandoned: {
    label: "Abandoned",
    transitions: [{ value: "active", label: "Reactivate" }],
    // Clean transparent glass for abandoned
    badgeColor: "bg-white/5 text-neutral-400 border-white/10 backdrop-blur-sm",
  },
};

export default function GoalCard({ goal }: { goal: WellnessGoal }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = STATUS_CONFIG[goal.status];
  const isOverdue =
    goal.status === "active" &&
    goal.target_date &&
    new Date(goal.target_date) < new Date(new Date().toDateString());

  async function handleStatusChange(newStatus: GoalStatus) {
    setLoading(true);
    setError(null);
    const { error: err } = await updateGoalStatusAction(goal.id, newStatus);
    if (err) setError(err);
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this goal?")) return;
    setLoading(true);
    setError(null);
    const { error: err } = await deleteGoalAction(goal.id);
    if (err) setError(err);
    setLoading(false);
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 group backdrop-blur-md shadow-xl hover:bg-white/[0.07] transition-all duration-300">
      
      {/* Header Row */}
      <div className="flex justify-between items-start">
        <span className={`text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full border ${config.badgeColor}`}>
          {config.label}
        </span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-neutral-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete goal"
        >
          ✕
        </button>
      </div>

      {/* Goal Body */}
      <p className="text-neutral-200 leading-relaxed text-sm md:text-base">{goal.goal}</p>

      {/* Date & Meta */}
      {goal.target_date && (
        <p className={`text-xs font-medium ${isOverdue ? "text-red-400" : "text-neutral-500"}`}>
          {isOverdue ? "⚠ Overdue · " : "🗓 Target: "}
          {new Date(goal.target_date).toLocaleDateString(undefined, { timeZone: 'UTC' })}
        </p>
      )}

      {error && <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-3 py-2">{error}</p>}

      {/* Actions (Frosted Glass Buttons) */}
      {config.transitions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 pt-4 border-t border-white/10">
          {config.transitions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleStatusChange(value)}
              disabled={loading}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-300 hover:text-white transition-all duration-300 backdrop-blur-sm"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}