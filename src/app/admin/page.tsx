import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShieldAlert, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getAllStoriesForAdmin } from "@/app/actions/admin";
import { AdminStoriesPanel } from "@/components/admin-stories-panel";
import BottomNav from "@/components/BottomNav";

export const metadata = { title: "Admin — SMHWT" };

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  const { data: stories, error } = await getAllStoriesForAdmin();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-md md:max-w-7xl min-h-screen flex flex-col relative border-x border-neutral-800/60">

        <header className="sticky top-0 z-10 bg-neutral-950/90 backdrop-blur-md flex items-center justify-between px-4 py-4 border-b border-neutral-800">
          <Link href="/profile" className="text-neutral-400 hover:text-neutral-200 transition-colors" aria-label="Back to profile">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-500" />
            <h1 className="text-base font-semibold text-neutral-100">Admin Panel</h1>
          </div>
          <span className="w-5" />
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto px-4 pt-5 pb-32 space-y-5">
          <div className="px-4 py-3 rounded-xl bg-amber-950/30 border border-amber-800">
            <p className="text-xs text-amber-300 leading-relaxed">
              <span className="font-semibold">Moderator view.</span>{" "}
              Stories must be approved before they appear in the public Peer Stories feed.
              Hiding an approved story removes it from the feed immediately.
            </p>
          </div>

          {error ? (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
              Could not load stories: {error}
            </p>
          ) : (
            <AdminStoriesPanel initialStories={stories ?? []} />
          )}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}