"use client";

import { useState } from "react";
import MoodLogClient from "@/components/MoodLogClient"; 
import { JournalEntryForm } from "@/components/journal-entry-form";

export function LogClient() {
  const [activeTab, setActiveTab] = useState<"mood" | "journal">("mood");

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 animate-in fade-in duration-500">
      {/* ── Glass Tab Switcher ── */}
      <div className="flex bg-white/5 p-1 rounded-xl mb-8 border border-white/10 backdrop-blur-md shadow-lg">
        <button
          onClick={() => setActiveTab("mood")}
          className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "mood"
              ? "bg-white/10 text-white shadow-md border border-white/10"
              : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
          }`}
        >
          Mood Log
        </button>
        <button
          onClick={() => setActiveTab("journal")}
          className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "journal"
              ? "bg-white/10 text-white shadow-md border border-white/10"
              : "text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent"
          }`}
        >
          Journal
        </button>
      </div>

      <div className="w-full space-y-8">
        {activeTab === "mood" ? <MoodLogClient /> : <JournalEntryForm />}
      </div>
    </div>
  );
}