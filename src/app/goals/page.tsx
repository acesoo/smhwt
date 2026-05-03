import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getGoals } from "@/app/actions/wellness-goals";
import GoalCard from "@/components/goal-card";
import WellnessGoalForm from "@/components/wellness-goal-form";
import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Goals — SMHWT" };

export default async function GoalsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "?";

  const { data: goals } = await getGoals();

  const activeGoals    = goals?.filter((g) => g.status === "active")    ?? [];
  const completedGoals = goals?.filter((g) => g.status === "completed") ?? [];
  const abandonedGoals = goals?.filter((g) => g.status === "abandoned") ?? [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <Link href="/dashboard" className="text-neutral-400 hover:text-neutral-200 transition-colors" aria-label="Back to dashboard">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-base font-semibold text-neutral-100">Goals</h1>
          <ProfileDropdown username={userName} />
        </header>

        <main className="flex-1 px-4 pt-5 pb-32 max-w-2xl mx-auto w-full space-y-8">
          <section>
            <WellnessGoalForm />
          </section>

          {activeGoals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-200 flex items-center gap-2">
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
              <p className="text-sm mt-1">Create one above to start tracking your progress!</p>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}