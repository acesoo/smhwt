import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { GoalsSkeleton } from "@/components/GoalsSkeleton";

export default function GoalsLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          {/* Invisible spacer to replace the back arrow and keep flexbox perfectly balanced */}
          <span className="w-10" />
          
          {/* Added text-center here to match the real page! */}
          <h1 className="text-base font-semibold text-neutral-100 text-center">
            Goals
          </h1>
          
          {/* Empty string while loading user data */}
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