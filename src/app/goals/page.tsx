import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getGoals } from "@/app/actions/wellness-goals";
import GoalCard from "@/components/goal-card";
import WellnessGoalForm from "@/components/wellness-goal-form";

export const metadata = {
  title: 'Wellness Goals | Wellness Tracker',
};

export default async function GoalsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: goals } = await getGoals();

  const activeGoals = goals?.filter((g) => g.status === "active") ?? [];
  const completedGoals = goals?.filter((g) => g.status === "completed") ?? [];
  const abandonedGoals = goals?.filter((g) => g.status === "abandoned") ?? [];

  return (
    <main className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Top Navigation/Header Area */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-800 p-4">
        <h1 className="text-xl font-semibold text-white text-center">Goals</h1>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-8 mt-6">
        <WellnessGoalForm />

        <div className="space-y-8">
          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-400 flex items-center gap-2">
                Active <span className="bg-neutral-800 text-neutral-300 text-xs py-0.5 px-2 rounded-full">{activeGoals.length}</span>
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
                Completed <span className="bg-neutral-800 text-neutral-300 text-xs py-0.5 px-2 rounded-full">{completedGoals.length}</span>
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
                Abandoned <span className="bg-neutral-800 text-neutral-300 text-xs py-0.5 px-2 rounded-full">{abandonedGoals.length}</span>
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
              <p className="text-sm mt-1">Create one above to start tracking your progress!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}