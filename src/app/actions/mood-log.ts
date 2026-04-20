"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// ── Types ────────────────────────────────────────────────────────────────────

export type MoodLogFormState = {
  success: boolean;
  error?: string;
  message?: string;
};

// ── Server Action ─────────────────────────────────────────────────────────────

/**
 * S3-DEV-02 — saveMoodLog
 * Saves a mood log entry to the `mood_logs` table in Supabase.
 * The user_id is derived from the server-side session — never trusted from the client.
 */
export async function saveMoodLog(
  _prevState: MoodLogFormState,
  formData: FormData
): Promise<MoodLogFormState> {
  // ── 1. Build a server-side Supabase client with the user's cookies ──────────
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // ── 2. Verify session — reject unauthenticated submissions ──────────────────
  const {
    data: { user },
    error: sessionError,
  } = await supabase.auth.getUser();

  if (sessionError || !user) {
    return { success: false, error: "You must be logged in to log your mood." };
  }

  // ── 3. Parse and validate form data ─────────────────────────────────────────
  const moodScoreRaw = formData.get("mood_score");
  const note = (formData.get("note") as string | null) ?? "";
  const sleepQualityRaw = formData.get("sleep_quality");
  const academicImpact = (formData.get("academic_impact") as string) || "None";

  // Tags arrive as comma-separated string from the hidden input
  const stressorTagsRaw = (formData.get("stressor_tags") as string) || "";
  const copingTagsRaw = (formData.get("coping_tags") as string) || "";

  const moodScore = Number(moodScoreRaw);
  const sleepQuality = Number(sleepQualityRaw);

  if (!moodScore || moodScore < 1 || moodScore > 10) {
    return {
      success: false,
      error: "Please select a mood score between 1 and 10.",
    };
  }

  if (!sleepQuality || sleepQuality < 1 || sleepQuality > 5) {
    return {
      success: false,
      error: "Please rate your sleep quality (1–5).",
    };
  }

  const validAcademicImpacts = ["None", "Minor", "Moderate", "Severe"];
  if (!validAcademicImpacts.includes(academicImpact)) {
    return { success: false, error: "Invalid academic impact value." };
  }

  const stressorTags = stressorTagsRaw
    ? stressorTagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const copingTags = copingTagsRaw
    ? copingTagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // ── 4. Insert into Supabase ──────────────────────────────────────────────────
  const { error: insertError } = await supabase.from("mood_logs").insert({
    user_id: user.id,           // Always from the server session — never the client
    mood_score: moodScore,
    note: note.trim() || null,
    sleep_quality: sleepQuality,
    academic_impact: academicImpact,
    stressor_tags: stressorTags,
    coping_tags: copingTags,
    logged_at: new Date().toISOString(),
  });

  if (insertError) {
    console.error("[saveMoodLog] Supabase insert error:", insertError.message);
    return {
      success: false,
      error: "Failed to save your mood log. Please try again.",
    };
  }

  // ── 5. Revalidate the dashboard so stats reflect the new entry immediately ───
  revalidatePath("/dashboard");
  revalidatePath("/log");

  return { success: true, message: "Mood logged successfully!" };
}