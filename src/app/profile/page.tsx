import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ShieldAlert } from "lucide-react";
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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

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
          <h1 className="text-base font-semibold text-neutral-100">Profile</h1>
          <span className="w-10" />
        </header>

        <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-6 animate-in fade-in duration-500">
          
          {/* ── Avatar ── */}
          <section className="flex flex-col items-center gap-3 pt-2 drop-shadow-lg">
            <Avatar className="w-20 h-20 border-2 border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-white/5 backdrop-blur-md">
              <AvatarFallback className="bg-transparent text-2xl font-light text-blue-300">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="text-center space-y-0.5">
              <h2 className="text-lg font-semibold text-white drop-shadow-md">{displayName}</h2>
              <p className="text-sm text-neutral-400">{email}</p>
            </div>
          </section>

          {/* ── Account info ── */}
          <section className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 ml-1">Account info</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-4 space-y-4 backdrop-blur-md shadow-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Email</span>
                <span className="text-sm font-medium text-neutral-200">{email}</span>
              </div>
              <div className="border-t border-white/10" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-neutral-400">Joined</span>
                <span className="text-sm font-medium text-neutral-200">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long", year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </section>

          {/* ── Admin Area ── */}
          {isAdmin && (
            <section className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-500/80 ml-1">Admin Tools</p>
              <Link 
                href="/admin"
                className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-4 hover:bg-amber-500/20 transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.1)] group"
              >
                <div className="flex items-center gap-3 text-amber-400">
                  <ShieldAlert className="w-5 h-5" />
                  <span className="text-sm font-medium">Moderate peer stories</span>
                </div>
                <span className="text-xs text-amber-400/70 group-hover:text-amber-300 transition-colors">Review →</span>
              </Link>
            </section>
          )}

          {/* ── Display name ── */}
          <section className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 ml-1">Display name</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 backdrop-blur-md shadow-xl">
              <ProfileForm currentUsername={displayName} />
            </div>
          </section>

          {/* ── Change password ── */}
          <section className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 ml-1">Password</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-5 backdrop-blur-md shadow-xl">
              <ChangePasswordForm />
            </div>
          </section>

          {/* ── Session ── */}
          <section className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 ml-1">Session</p>
            <SignOutButton />
          </section>

          {/* ── Danger zone ── */}
          <section className="space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-red-500/80 ml-1">Danger zone</p>
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl px-4 py-5 backdrop-blur-md shadow-xl">
              <DeleteAccountForm />
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </div>
  );
}