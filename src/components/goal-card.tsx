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
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  completed: {
    label: "Completed ✓",
    transitions: [{ value: "active", label: "Reactivate" }],
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  abandoned: {
    label: "Abandoned",
    transitions: [{ value: "active", label: "Reactivate" }],
    badgeColor: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
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
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-5 flex flex-col gap-4 relative group">
      
      {/* Header Row */}
      <div className="flex justify-between items-start">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${config.badgeColor}`}>
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
      <p className="text-neutral-200 leading-relaxed">{goal.goal}</p>

      {/* Date & Meta */}
      {goal.target_date && (
        <p className={`text-sm ${isOverdue ? "text-red-400" : "text-neutral-500"}`}>
          {isOverdue ? "⚠ Overdue · " : "🗓 Target: "}
          {new Date(goal.target_date).toLocaleDateString(undefined, { timeZone: 'UTC' })}
        </p>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Actions */}
      {config.transitions.length > 0 && (
        <div className="flex gap-2 mt-2 pt-4 border-t border-neutral-800">
          {config.transitions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleStatusChange(value)}
              disabled={loading}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-1"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}