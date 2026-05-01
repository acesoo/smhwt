"use client";

import { useState } from "react";
// 1. UPDATED IMPORT: Bring in the designer's wrapper instead of the raw form
import MoodLogClient from "@/components/MoodLogClient"; 
import { JournalEntryForm } from "@/components/journal-entry-form";

export function LogClient() {
  const [activeTab, setActiveTab] = useState<"mood" | "journal">("mood");

  return (
    <div className="px-4 pt-5 pb-32">
      {/* ── Tab Switcher ── */}
      <div className="flex bg-neutral-900/50 p-1 rounded-lg mb-8 border border-neutral-800">
        <button
          onClick={() => setActiveTab("mood")}
          className={`flex-1 text-center py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === "mood"
              ? "bg-neutral-800 text-neutral-100 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
          }`}
        >
          Mood
        </button>
        <button
          onClick={() => setActiveTab("journal")}
          className={`flex-1 text-center py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === "journal"
              ? "bg-neutral-800 text-neutral-100 shadow-sm"
              : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50"
          }`}
        >
          Journal
        </button>
      </div>

      {/* ── Active Form ── */}
      {/* 2. UPDATED RENDER: Render the wrapper when 'mood' is active */}
      {activeTab === "mood" ? <MoodLogClient /> : <JournalEntryForm />}
    </div>
  );
}