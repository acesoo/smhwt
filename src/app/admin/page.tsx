import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShieldAlert } from "lucide-react";
import { getAllStoriesForAdmin } from "@/app/actions/admin";
import { AdminStoriesPanel } from "@/components/admin-stories-panel";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata = { title: "Admin — SMHWT" };

/**
 * /admin — Protected admin panel for moderating peer stories.
 * Access is enforced at two levels:
 *   1. Server: profiles.is_admin check via getAllStoriesForAdmin()
 *   2. Page: explicit redirect if the user is not admin
 * Regular users who navigate to /admin directly are redirected to /dashboard.
 * The route is not linked anywhere in the public UI.
 */
export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Check admin status at the page level before fetching anything
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/dashboard");

  const { data: stories, error } = await getAllStoriesForAdmin();

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
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          <h1 className="text-base font-semibold text-neutral-100">
            Admin Panel
          </h1>
        </div>
        <span className="w-5" />
      </header>

      <main className="px-4 pt-5 pb-32 max-w-2xl mx-auto space-y-5">

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
    </div>
  );
}