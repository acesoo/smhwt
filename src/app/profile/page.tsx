import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChevronLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { ProfileForm } from "@/components/profile-form";
import { ChangePasswordForm } from "@/components/change-password-form";
import { SignOutButton } from "@/components/sign-out-button";
import { DeleteAccountForm } from "@/components/delete-account-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata = { title: "Profile — SMHWT" };

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Check admin status server-side — never passed to client
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.is_admin ?? false;

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

        {/* ── Avatar ── */}
        <section className="flex flex-col items-center gap-3 pt-2">
          <Avatar className="w-16 h-16 border border-neutral-700">
            <AvatarFallback className="bg-neutral-800 text-neutral-200 text-2xl font-semibold">
              {displayName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-base font-semibold text-neutral-100">{displayName}</p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </section>

        {/* ── Account info (read-only) ── */}

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
            {isAdmin && (
              <>
                <div className="border-t border-neutral-800" />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-neutral-500">Role</span>
                  <div className="flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                    <span className="text-xs text-amber-400 font-semibold">
                      Admin
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>

        {/* ── Admin Panel link (admin only) ── */}
        {isAdmin && (
          <section className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Administration
            </p>
            <Link
              href="/admin"
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-amber-950/20 border border-amber-900 hover:bg-amber-950/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium text-amber-300">
                  Open Admin Panel
                </span>
              </div>
              <span className="text-xs text-amber-700 group-hover:text-amber-500 transition-colors">
                Moderate peer stories →
              </span>
            </Link>
          </section>
        )}

        {/* ── Display name ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Display name
          </p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4">
            <ProfileForm currentUsername={displayName} />
          </div>
        </section>

        {/* ── Change password ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Password
          </p>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4">
            <ChangePasswordForm />
          </div>
        </section>

        {/* ── Session ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Session
          </p>
          <SignOutButton />
        </section>

        {/* ── Danger zone ── */}
        <section className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-red-900">
            Danger zone
          </p>
          <DeleteAccountForm />
        </section>

      </main>

      <BottomNav />
    </div>
  );
}