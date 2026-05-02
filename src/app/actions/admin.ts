"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type AdminStory = {
  id: string;
  title: string;
  body: string;
  forum_tags: string[];
  is_approved: boolean;
  created_at: string;
  // submitted_by intentionally excluded from public type
};

/**
 * Verifies the current user has is_admin = true in the profiles table.
 * Used as a guard in all admin server actions.
 */
async function requireAdmin(): Promise<{ authorized: boolean; error?: string }> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { authorized: false, error: "Not authenticated." };

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return { authorized: false, error: "Access denied." };
  }

  return { authorized: true };
}

/**
 * Fetch ALL stories for the admin panel (approved + pending).
 * Ordered by created_at DESC so newest submissions appear first.
 */
export async function getAllStoriesForAdmin(): Promise<{
  data: AdminStory[] | null;
  error: string | null;
}> {
  const { authorized, error: authError } = await requireAdmin();
  if (!authorized) return { data: null, error: authError ?? "Access denied." };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("peer_stories")
    .select("id, title, body, forum_tags, is_approved, created_at")
    .order("created_at", { ascending: false });

  if (error) return { data: null, error: error.message };
  return { data: data as AdminStory[], error: null };
}

/**
 * Toggle the is_approved flag for a single story.
 * Called from the Admin Panel approve/hide buttons.
 */
export async function toggleStoryApproval(
  storyId: string,
  currentValue: boolean
): Promise<{ error: string | null }> {
  const { authorized, error: authError } = await requireAdmin();
  if (!authorized) return { error: authError ?? "Access denied." };

  const supabase = await createClient();

  const { error } = await supabase
    .from("peer_stories")
    .update({ is_approved: !currentValue })
    .eq("id", storyId);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/stories");

  return { error: null };
}