import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { GoalsSkeleton } from "@/components/GoalsSkeleton";

export default function GoalsLoading() {
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
          <ProfileDropdown username="" />
        </header>

        <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-5">
          <GoalsSkeleton count={2} />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}