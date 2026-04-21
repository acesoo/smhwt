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
    <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Set a New Goal</h2>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-2">
          <label htmlFor="goal" className="block text-sm font-medium text-neutral-300">
            What do you want to work toward?
          </label>
          <textarea
            id="goal"
            name="goal"
            rows={3}
            className="w-full bg-neutral-900 text-white rounded-lg p-3 border border-neutral-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 placeholder:text-neutral-600"
            placeholder="e.g. Meditate for 10 minutes every morning..."
            maxLength={500}
            disabled={loading}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="target_date" className="block text-sm font-medium text-neutral-300">
            Target date <span className="text-neutral-500 font-normal">(optional)</span>
          </label>
          <input
            id="target_date"
            name="target_date"
            type="date"
            className="w-full bg-neutral-900 text-white rounded-lg p-3 border border-neutral-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            min={todayISO}
            disabled={loading}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-emerald-500 text-sm">✓ Goal saved successfully!</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Goal"}
        </button>
      </form>
    </div>
  );
}