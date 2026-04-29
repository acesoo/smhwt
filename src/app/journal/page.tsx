import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { JournalEntryForm } from "@/components/journal-entry-form";
import BottomNav from "@/components/BottomNav";

export const metadata = { title: "Journal — SMHWT" };

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * /journal — Journal reflection entry page.
 * Separated from /log per UX decision: mood logging and journaling
 * are distinct knowledge externalization acts (SECI model).
 */
export default function JournalPage() {
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
        <h1 className="text-base font-semibold text-neutral-100">Journal</h1>
        <span className="text-xs text-neutral-500">{today}</span>
      </header>

      <main className="px-4 pt-5 pb-32">
        <JournalEntryForm />
      </main>

      <BottomNav />
    </div>
  );
}