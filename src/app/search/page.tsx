import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BottomNav from "@/components/BottomNav";
import { SearchRetrieve } from "@/components/search-retrieve";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Search — SMHWT" };

export default async function SearchPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const userName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "?";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <Link href="/dashboard" className="text-neutral-400 hover:text-neutral-200 transition-colors" aria-label="Back to dashboard">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-base font-semibold text-neutral-100">Search</h1>
          <ProfileDropdown username={userName} />
        </header>

        <div className="flex-1">
          <SearchRetrieve />
        </div>

        <BottomNav />
      </div>
    </div>
  );
}