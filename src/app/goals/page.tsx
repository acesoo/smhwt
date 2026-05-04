import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col relative overflow-hidden">
      
      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-950/30 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative z-10 border-x border-white/5">
        
        <header className="sticky top-0 z-20 bg-neutral-950/60 backdrop-blur-xl flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100 text-center">
            Goals
          </h1>
          <ProfileDropdown username={userName} />
        </header>

        <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-8">
          
          <WellnessGoalForm />

          {activeGoals.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-medium text-neutral-300 flex items-center gap-2 drop-shadow-md">
                Active{" "}
                <span className="bg-white/10 border border-white/10 text-white text-xs py-0.5 px-2.5 rounded-full backdrop-blur-sm shadow-sm">
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
                <span className="bg-white/5 border border-white/10 text-neutral-300 text-xs py-0.5 px-2.5 rounded-full backdrop-blur-sm">
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
                <span className="bg-white/5 border border-white/10 text-neutral-300 text-xs py-0.5 px-2.5 rounded-full backdrop-blur-sm">
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
            <div className="text-center py-16 text-neutral-500 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
              <p>You haven&apos;t set any goals yet.</p>
              <p className="text-sm mt-1">Start small!</p>
            </div>
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}