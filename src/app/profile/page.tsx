import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { ProfileForm } from "@/components/profile-form";
import { SignOutButton } from "@/components/sign-out-button";

export const metadata = { title: "Profile — SMHWT" };

/**
 * /profile — Account settings page.
 * Handles username updates via ProfileForm (server action).
 * SignOutButton is extracted as a shared component so the designer's
 * header avatar dropdown can reuse it without duplicating logic.
 *
 * NOTE: The avatar/ProfileCard component in the header is a UX/UI
 * Designer deliverable (S4-UX-06). This page provides the settings
 * layer that sits beneath it.
 */
export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const displayName =
    user.user_metadata?.full_name?.split(" ")[0] ??
    user.email?.split("@")[0] ??
    "";

  const email = user.email ?? "—";

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
        <h1 className="text-base font-semibold text-neutral-100">Profile</h1>
        <span className="w-5" />
      </header>

      <main className="px-4 pt-6 pb-32 max-w-2xl mx-auto space-y-8">

        {/* ── Account info (read-only) ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Account
          </p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-500">Email</span>
              <span className="text-sm text-neutral-300">{email}</span>
            </div>
            <div className="border-t border-neutral-800" />
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-500">User ID</span>
              <span className="text-[10px] text-neutral-600 font-mono truncate max-w-[180px]">
                {user.id}
              </span>
            </div>
          </div>
        </section>

        {/* ── Username update ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Display name
          </p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4">
            <ProfileForm currentUsername={displayName} />
          </div>
        </section>

        {/* ── Sign out ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Session
          </p>
          <SignOutButton />
        </section>

      </main>

      <BottomNav />
    </div>
  );
}