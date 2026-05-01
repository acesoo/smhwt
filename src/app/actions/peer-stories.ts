"use server";

import { createClient } from "@/lib/supabase/server";

export type PeerStory = {
  id: string;
  title: string;
  body: string;
  forum_tags: string[];
  created_at: string;
  // submitted_by is intentionally excluded — never expose identity
};

export type StoryFormState = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Submit a peer story. The authenticated user's ID is stored in
 * submitted_by for moderation purposes but is NEVER returned to
 * the client or shown in the UI — anonymity is enforced at the
 * query level (PeerStory type omits submitted_by entirely).
 */
export async function submitPeerStory(
  _prev: StoryFormState,
  formData: FormData
): Promise<StoryFormState> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "You must be signed in to share a story." };

  const title = (formData.get("title") as string | null)?.trim() ?? "";
  const body  = (formData.get("body")  as string | null)?.trim() ?? "";
  const tagsRaw = (formData.get("forum_tags") as string | null) ?? "";
  const forum_tags = tagsRaw
    ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  if (!title) return { success: false, error: "A title is required." };
  if (!body)  return { success: false, error: "Story body cannot be empty." };
  if (body.length < 20)
    return { success: false, error: "Please write at least a sentence or two." };

  const { error } = await supabase.from("peer_stories").insert({
    submitted_by: user.id,
    title,
    body,
    forum_tags,
    is_approved: false, // always starts unapproved — moderation required
  });

  if (error) return { success: false, error: error.message };

  return {
    success: true,
    message: "Your story has been submitted and is pending review. Thank you for sharing.",
  };
}

/**
 * Fetch approved stories for the public feed.
 * submitted_by is deliberately excluded from the SELECT.
 */
export async function getApprovedStories(tag?: string): Promise<{
  data: PeerStory[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  let query = supabase
    .from("peer_stories")
    .select("id, title, body, forum_tags, created_at")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  if (tag) {
    query = query.contains("forum_tags", [tag]);
  }

  const { data, error } = await query;
  if (error) return { data: null, error: error.message };
  return { data: data as PeerStory[], error: null };
}