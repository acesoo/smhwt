import BottomNav from "@/components/BottomNav";
import { ResourcesSkeleton } from "@/components/ResourcesSkeleton";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export default function ResourcesLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100">Resources</h1>
          {/* Pass an empty string or a loading state for the username during the loading phase */}
          <ProfileDropdown username="" />
        </header>

        <div className="flex-1">
          {/* We pass count={5} to show a nice list of skeleton cards while the DB fetches! */}
          <ResourcesSkeleton count={5} />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}