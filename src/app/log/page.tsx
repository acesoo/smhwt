import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { LogClient } from "@/components/log-client";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Daily Log — SMHWT" };

export default async function LogPage() {
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
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="flex items-center justify-between px-4 py-4 border-b border-neutral-800">
        <Link
          href="/dashboard"
          className="text-neutral-400 hover:text-neutral-200 transition-colors"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-semibold text-neutral-100">Daily Log</h1>
        <ProfileDropdown username={userName} />
      </header>

      <main>
        <LogClient />
      </main>

      <BottomNav />
    </div>
  );
}