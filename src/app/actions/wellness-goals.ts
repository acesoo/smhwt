"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type GoalStatus = "active" | "completed" | "abandoned";

export type WellnessGoal = {
  id: string;
  user_id: string;
  goal: string;
  target_date: string | null;
  status: GoalStatus;
  created_at: string;
};

export async function createGoalAction(formData: FormData) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "You must be logged in to create a goal." };
  }

  const goal = (formData.get("goal") as string)?.trim();
  const target_date = (formData.get("target_date") as string)?.trim() || null;

  if (!goal) return { error: "Goal description is required." };

  const { error } = await supabase
    .from("wellness_goals")
    .insert([{ user_id: user.id, goal, target_date, status: "active" }]);

  if (error) return { error: "Failed to create goal. Please try again." };

  revalidatePath("/goals");
  return { error: null };
}

export async function updateGoalStatusAction(id: string, status: GoalStatus) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("wellness_goals")
    .update({ status })
    .eq("id", id);

  if (error) return { error: "Failed to update goal status." };

  revalidatePath("/goals");
  return { error: null };
}

export async function deleteGoalAction(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("wellness_goals")
    .delete()
    .eq("id", id);

  if (error) return { error: "Failed to delete goal." };

  revalidatePath("/goals");
  return { error: null };
}

export async function getGoals(): Promise<{ data: WellnessGoal[] | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("wellness_goals")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return { data: null, error: "Failed to load goals." };
  return { data, error: null };
}