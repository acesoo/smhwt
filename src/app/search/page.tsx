import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BottomNav from "@/components/BottomNav";
import { SearchRetrieve } from "@/components/search-retrieve";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Search — SMHWT" };

export default async function SearchPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "?";

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
          <h1 className="text-base font-semibold text-neutral-100 text-center">Search</h1>
          <ProfileDropdown username={userName} />
        </header>

        <main className="flex-1">
          <SearchRetrieve />
        </main>

        <BottomNav />
      </div>
    </div>
  );
}