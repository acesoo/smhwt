"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// ── Types ────────────────────────────────────────────────────────────────────

export type JournalFormState = {
  success: boolean;
  error?: string;
  message?: string;
};

// ── Server Action ─────────────────────────────────────────────────────────────

/**
 * S3-DEV-03 — saveJournalEntry
 * Saves a journal / reflection entry to the `journal_entries` table in Supabase.
 * The user_id is derived from the server-side session — never trusted from the client.
 */
export async function saveJournalEntry(
  _prevState: JournalFormState,
  formData: FormData
): Promise<JournalFormState> {
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
    return {
      success: false,
      error: "You must be logged in to save a journal entry.",
    };
  }

  // ── 3. Parse and validate form data ─────────────────────────────────────────
  const title = ((formData.get("title") as string) ?? "").trim();
  const body = ((formData.get("body") as string) ?? "").trim();

  // Tags arrive as a comma-separated string from the hidden input
  const tagsRaw = (formData.get("tags") as string) || "";

  if (!title) {
    return { success: false, error: "Please add a title for your entry." };
  }

  if (!body || body.length < 10) {
    return {
      success: false,
      error: "Please write at least a sentence in your reflection.",
    };
  }

  const tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  // ── 4. Insert into Supabase ──────────────────────────────────────────────────
  const { error: insertError } = await supabase
    .from("journal_entries")
    .insert({
      user_id: user.id,        // Always from the server session — never the client
      title,
      body,
      tags,
      created_at: new Date().toISOString(),
    });

  if (insertError) {
    console.error(
      "[saveJournalEntry] Supabase insert error:",
      insertError.message
    );
    return {
      success: false,
      error: "Failed to save your journal entry. Please try again.",
    };
  }

  // ── 5. Revalidate paths so dashboard and journal list update immediately ─────
  revalidatePath("/dashboard");
  revalidatePath("/journal");
  revalidatePath("/log");

  return { success: true, message: "Journal entry saved!" };
}