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

  const userName = user.user_metadata?.full_name?.split(" ")[0] ?? user.email?.split("@")[0] ?? "Player";

  // Fetch data
  const { data: moodData } = await supabase
    .from("mood_logs")
    .select("logged_at, mood_score, note")
    .order("logged_at", { ascending: false })
    .limit(7);

  const { data: journalData } = await supabase
    .from("journal_entries")
    .select("id, title, created_at, tags")
    .order("created_at", { ascending: false })
    .limit(3);

  const { data: goalsData } = await supabase
    .from("wellness_goals")
    .select("id, goal, status")
    .eq("status", "active");

  const { data: allMoodsForStreak } = await supabase
    .from("mood_logs")
    .select("logged_at")
    .order("logged_at", { ascending: false });

  const streakDates = allMoodsForStreak?.map((m) => m.logged_at.slice(0, 10)) || [];
  const streak = calcStreak(streakDates);

  const recentMoodEntries = (moodData || []).map((m) => ({
    date: m.logged_at.slice(0, 10),
    score: m.mood_score,
    note: m.note || undefined,
  }));

  const activeGoals = goalsData || [];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col relative overflow-hidden">
      
      {/* ── Ambient background glows (Fixed to stay during scroll) ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-950/30 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative z-10 border-x border-white/5">
        <header className="sticky top-0 z-20 bg-neutral-950/60 backdrop-blur-xl flex items-center justify-between px-4 py-4 border-b border-white/10">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100 text-center">Dashboard</h1>
          <ProfileDropdown username={userName} />
        </header>

        <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-5">
          <DashboardSummaryCard
            userName={userName}
            streak={streak}
            recentMoodEntries={recentMoodEntries}
            recentJournalEntries={journalData || []}
            activeGoals={activeGoals}
          />
          
          <Link
            href="/resources"
            className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 backdrop-blur-sm transition-all duration-300 group shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Library className="w-4 h-4 text-neutral-400 group-hover:text-blue-400 transition-colors drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                Browse Resources
              </span>
            </div>
            <span className="text-xs text-neutral-500 group-hover:text-blue-300 transition-colors">
              View all →
            </span>
          </Link>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}