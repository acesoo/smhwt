"use client";

import { useState, useRef } from "react";
import { createGoalAction } from "@/app/actions/wellness-goals";

export default function WellnessGoalForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const todayISO = new Date().toLocaleDateString('en-CA');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { error } = await createGoalAction(formData);

    if (error) {
      setError(error);
    } else {
      setSuccess(true);
      formRef.current?.reset();
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl animate-in fade-in duration-500">
      <h2 className="text-xl font-semibold text-white mb-4 drop-shadow-md">Set a New Goal</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        
        <div className="space-y-1.5">
          <label htmlFor="goal" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 ml-1">
            What do you want to achieve?
          </label>
          <textarea
            id="goal"
            name="goal"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 backdrop-blur-sm transition-all resize-none"
            placeholder="e.g. Meditate for 10 minutes every morning..."
            maxLength={500}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="target_date" className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 ml-1">
            Target date <span className="text-neutral-500 font-normal lowercase tracking-normal">(optional)</span>
          </label>
          <input
            id="target_date"
            name="target_date"
            type="date"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 backdrop-blur-sm transition-all"
            min={todayISO}
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-xl px-4 py-3 backdrop-blur-sm">{error}</p>}
        {success && <p className="text-emerald-400 text-sm bg-emerald-950/40 border border-emerald-800 rounded-xl px-4 py-3 backdrop-blur-sm">✓ Goal saved successfully!</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-semibold rounded-xl py-3.5 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.25)] flex justify-center items-center backdrop-blur-sm mt-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Save Goal"
          )}
        </button>
      </form>
    </div>
  );
}