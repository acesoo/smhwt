"use client";

import { useState } from "react";
import { MoodLogForm } from "@/components/mood-log-form";
import { MoodInputWidget } from "@/components/MoodInputWidget";

export default function MoodLogClient() {
  const [moodScore, setMoodScore] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <MoodInputWidget
        selectedScore={moodScore}
        onMoodSelect={(score) => setMoodScore(score)}
      />

      <div className="border-t border-neutral-800" />

      <MoodLogForm moodScore={moodScore} />
    </div>
  );
}