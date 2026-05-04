import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { LogSkeleton } from "@/components/LogSkeleton";

export default function LogLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100">Daily Log</h1>
          <ProfileDropdown username="" />
        </header>

        <div className="flex-1">
          {/* Inject the skeleton right here! */}
          <LogSkeleton />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}