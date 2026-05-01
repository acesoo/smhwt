"use server";

import { createClient } from "@/lib/supabase/server";

export type Resource = {
  id: string;
  title: string;
  url: string;
  tags: string[];
  created_at: string;
};

/**
 * Fetches resources from Supabase, optionally filtered by a single coping tag.
 * Uses Postgres array containment (.contains) so the filter runs on the DB,
 * not in JS — efficient even as the table grows.
 */
export async function getResources(tag?: string): Promise<{
  data: Resource[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  let query = supabase
    .from("resources")
    .select("id, title, url, tags, created_at")
    .order("created_at", { ascending: false });

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data, error } = await query;

  if (error) return { data: null, error: error.message };
  return { data: data as Resource[], error: null };
}