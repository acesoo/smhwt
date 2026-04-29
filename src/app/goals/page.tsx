import { redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getGoals } from "@/app/actions/wellness-goals";
import GoalCard from "@/components/goal-card";
import WellnessGoalForm from "@/components/wellness-goal-form";
import BottomNav from "@/components/BottomNav";

export const metadata = { title: "Goals — SMHWT" };

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function GoalsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: goals } = await getGoals();

  const activeGoals    = goals?.filter((g) => g.status === "active")    ?? [];
  const completedGoals = goals?.filter((g) => g.status === "completed") ?? [];
  const abandonedGoals = goals?.filter((g) => g.status === "abandoned") ?? [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="flex items-center justify-between px-4 py-4 border-b border-neutral-800">
        <Link
          href="/dashboard"
          className="text-neutral-400 hover:text-neutral-200 transition-colors"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-semibold text-neutral-100">Goals</h1>
        <span className="text-xs text-neutral-500">{formatDate(new Date())}</span>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-8 mt-6 pb-32">
        <WellnessGoalForm />

        <div className="space-y-8">
          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-400 flex items-center gap-2">
                Active{" "}
                <span className="bg-neutral-800 text-neutral-300 text-xs py-0.5 px-2 rounded-full">
                  {activeGoals.length}
                </span>
              </h2>
              <div className="grid gap-4">
                {activeGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-400 flex items-center gap-2">
                Completed{" "}
                <span className="bg-neutral-800 text-neutral-300 text-xs py-0.5 px-2 rounded-full">
                  {completedGoals.length}
                </span>
              </h2>
              <div className="grid gap-4">
                {completedGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          )}

          {/* Abandoned Goals */}
          {abandonedGoals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-400 flex items-center gap-2">
                Abandoned{" "}
                <span className="bg-neutral-800 text-neutral-300 text-xs py-0.5 px-2 rounded-full">
                  {abandonedGoals.length}
                </span>
              </h2>
              <div className="grid gap-4">
                {abandonedGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </section>
          )}

          {goals?.length === 0 && (
            <div className="text-center py-12 text-neutral-500">
              <p>You haven&apos;t set any goals yet.</p>
              <p className="text-sm mt-1">
                Create one above to start tracking your progress!
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}