"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ProfileFormState = {
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Update the display name stored in Supabase Auth user_metadata.
 * This is the single source of truth for the username shown across
 * the dashboard greeting and profile page.
 */
export async function updateUsername(
  _prev: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Not authenticated." };

  const username = (formData.get("username") as string | null)?.trim() ?? "";

  if (!username)
    return { success: false, error: "Username cannot be empty." };
  if (username.length < 2)
    return { success: false, error: "Username must be at least 2 characters." };
  if (username.length > 32)
    return { success: false, error: "Username must be 32 characters or fewer." };
  if (!/^[a-zA-Z0-9_\- ]+$/.test(username))
    return {
      success: false,
      error: "Username can only contain letters, numbers, spaces, hyphens, and underscores.",
    };

  const { error } = await supabase.auth.updateUser({
    data: { full_name: username },
  });

  if (error) return { success: false, error: error.message };

  revalidatePath("/dashboard");
  revalidatePath("/profile");

  return { success: true, message: "Username updated successfully." };
}

/**
 * Sign out the current user and redirect to login.
 * Called from both the profile page and the header avatar dropdown.
 */
export async function signOut(): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) return { error: error.message };
  return { error: null };
}