import { redirect } from "next/navigation";
import Link from "next/link";
import { Library } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DashboardSummaryCard } from "@/components/DashboardSummaryCard";
import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Dashboard — SMHWT" };

function calcStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const unique = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));
  const today = new Date().toISOString().slice(0, 10);
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().slice(0, 10);
  if (unique[0] !== today && unique[0] !== yesterday) return 0;
  let streak = 1;
  for (let i = 1; i < unique.length; i++) {
    const prev = new Date(unique[i - 1]);
    const curr = new Date(unique[i]);
    const diff = (prev.getTime() - curr.getTime()) / 86400000;
    if (diff === 1) streak++;
    else break;
  }
  return streak;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const sevenDaysAgoDate = new Date();
  sevenDaysAgoDate.setDate(sevenDaysAgoDate.getDate() - 7);
  const sevenDaysAgo = sevenDaysAgoDate.toISOString();

  const { data: moodRows } = await supabase
    .from("mood_logs")
    .select("mood_score, note, logged_at")
    .eq("user_id", user.id)
    .gte("logged_at", sevenDaysAgo)
    .order("logged_at", { ascending: false });

  const recentMoodEntries = (moodRows ?? []).map((r) => ({
    date: r.logged_at.slice(0, 10),
    score: r.mood_score,
    note: r.note ?? undefined,
  }));

  const { data: journalRows } = await supabase
    .from("journal_entries")
    .select("id, title, created_at, tags")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(3);

  const recentJournalEntries = (journalRows ?? []).map((r) => ({
    id: r.id,
    title: r.title,
    created_at: r.created_at,
    tags: r.tags ?? [],
  }));

  const { data: goalRows } = await supabase
    .from("wellness_goals")
    .select("id, goal, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const activeGoals = (goalRows ?? []).map((r) => ({
    id: r.id,
    goal: r.goal,
    status: r.status as "active" | "completed" | "abandoned",
  }));

  const allMoodDates = (moodRows ?? []).map((r) => r.logged_at.slice(0, 10));
  const streak = calcStreak(allMoodDates);

  const userName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "there";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100 text-center">Dashboard</h1>
          <ProfileDropdown username={userName} />
        </header>

        <main className="flex-1 px-4 pt-5 pb-32 space-y-4">
          <DashboardSummaryCard
            userName={userName}
            streak={streak}
            recentMoodEntries={recentMoodEntries}
            recentJournalEntries={recentJournalEntries}
            activeGoals={activeGoals}
          />
          <Link
            href="/resources"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Library className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors">
                Browse Resources
              </span>
            </div>
            <span className="text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors">
              Mental health articles &amp; tools →
            </span>
          </Link>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}