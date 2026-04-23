"use client";

import { useState } from "react";
import { MoodLogForm } from "@/components/mood-log-form";
import { JournalEntryForm } from "@/components/journal-entry-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// ── Helper ────────────────────────────────────────────────────────────────────

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Page ──────────────────────────────────────────────────────────────────────

/**
 * /log page — hosts the tabbed Mood Log / Journal entry screen.
 * Matches wireframe S2-UX-01 (dual-tab layout).
 *
 * This is a Client Component so the tab state is managed in the browser.
 * The child form components each call their own Server Actions.
 */
export default function LogPage() {
  const [activeTab, setActiveTab] = useState<"mood" | "journal">("mood");
  const today = formatDate(new Date());

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-4 py-4 border-b border-neutral-800">
        <Link
          href="/dashboard"
          className="text-neutral-400 hover:text-neutral-200 transition-colors"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-semibold text-neutral-100">Log Entry</h1>
        <span className="text-xs text-neutral-500">{today}</span>
      </header>

      {/* ── Tab Switcher ── */}
      <div className="flex mx-4 mt-5 mb-6 bg-neutral-800 rounded-xl p-1">
        <button
          onClick={() => setActiveTab("mood")}
          className={`
            flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-150
            ${
              activeTab === "mood"
                ? "bg-neutral-950 text-neutral-100 shadow"
                : "text-neutral-400 hover:text-neutral-200"
            }
          `}
        >
          Mood log
        </button>
        <button
          onClick={() => setActiveTab("journal")}
          className={`
            flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-150
            ${
              activeTab === "journal"
                ? "bg-neutral-950 text-neutral-100 shadow"
                : "text-neutral-400 hover:text-neutral-200"
            }
          `}
        >
          Journal
        </button>
      </div>

      {/* ── Form Area ── */}
      <main className="px-4 pb-32">
        {activeTab === "mood" ? <MoodLogForm /> : <JournalEntryForm />}
      </main>

      {/* ── Bottom Nav ── */}
      {/* 
        Note to Developer: Replace this placeholder with your shared <BottomNav />
        component once it's built in S3-UX-01. The active item here is "Log".
      */}
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 flex justify-around py-3 px-4">
        {[
          { label: "Home", href: "/dashboard" },
          { label: "Log", href: "/log" },
          { label: "Journal", href: "/journal" },
          { label: "Goals", href: "/goals" },
          { label: "Profile", href: "/profile" },
        ].map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className={`
              text-xs font-medium transition-colors
              ${
                href === "/log"
                  ? "text-blue-400"
                  : "text-neutral-500 hover:text-neutral-300"
              }
            `}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}