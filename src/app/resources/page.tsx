import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getResources } from "@/app/actions/resources";
import { ResourceLibrary } from "@/components/resource-library";
import BottomNav from "@/components/BottomNav";

export const metadata = { title: "Resources — SMHWT" };

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function ResourcesPage() {
  const { data, error } = await getResources();

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
        <h1 className="text-base font-semibold text-neutral-100">Resources</h1>
        <span className="text-xs text-neutral-500">{formatDate(new Date())}</span>
      </header>

      <ResourceLibrary initialResources={data ?? []} fetchError={error} />

      <BottomNav />
    </div>
  );
}