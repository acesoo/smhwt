import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getApprovedStories } from "@/app/actions/peer-stories";
import { PeerStoriesClient, StoryFeedSkeleton } from "@/components/peer-stories-client";
import BottomNav from "@/components/BottomNav";
import { ProfileDropdown } from "@/components/ProfileDropdown";

export const metadata = { title: "Peer Stories — SMHWT" };

async function StoriesFeed() {
  const { data, error } = await getApprovedStories();
  return <PeerStoriesClient initialStories={data ?? []} fetchError={error} />;
}

export default async function StoriesPage() {
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
        <h1 className="text-base font-semibold text-neutral-100">Peer Stories</h1>
        <ProfileDropdown username={userName} />
      </header>

      <Suspense fallback={
        <div className="w-full max-w-2xl mx-auto px-4 pt-5 pb-32 space-y-3">
          <StoryFeedSkeleton />
        </div>
      }>
        <StoriesFeed />
      </Suspense>

      <BottomNav />
    </div>
  );
}