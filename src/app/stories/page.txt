import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getApprovedStories } from "@/app/actions/peer-stories";
import { PeerStoriesClient } from "@/components/peer-stories-client";
import BottomNav from "@/components/BottomNav";

export const metadata = { title: "Peer Stories — SMHWT" };

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function StoriesPage() {
  const { data, error } = await getApprovedStories();

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
        <h1 className="text-base font-semibold text-neutral-100 text-center">Peer Stories</h1>
        <span className="text-xs text-neutral-500">{formatDate(new Date())}</span>
      </header>

      <PeerStoriesClient initialStories={data ?? []} fetchError={error} />

      <BottomNav />
    </div>
  );
}