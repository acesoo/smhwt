import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
// Import our tab switcher instead of MoodLogClient directly
import { LogClient } from "@/components/log-client"; 

export const metadata = { title: "Daily Log — SMHWT" };

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * /log — Combined Mood Log and Journal entry page.
 * Uses <LogClient> for instant, client-side tab switching.
 */
export default function LogPage() {
  const today = formatDate(new Date());

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
        <span className="text-xs text-neutral-500">{today}</span>
      </header>

      {/* Render the tab switcher here! */}
      <main>
        <LogClient />
      </main>

      <BottomNav />
    </div>
  );
}