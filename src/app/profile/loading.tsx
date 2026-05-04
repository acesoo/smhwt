import BottomNav from "@/components/BottomNav";
import { ProfileSkeleton } from "@/components/ProfileSkeleton";

export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">
        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <span className="w-10" />
          <h1 className="text-base font-semibold text-neutral-100">Profile</h1>
          <span className="w-10" />
        </header>

        <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-5">
          {/* We pass count={2} so it doesn't take up the whole screen */}
          <ProfileSkeleton /> 
        </main>

        <BottomNav />
      </div>
    </div>
  );
}