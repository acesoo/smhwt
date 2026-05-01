"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/app/actions/profile";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  async function handleSignOut() {
    const { error } = await signOut();
    if (!error) {
      window.location.href = "/login";
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-neutral-900 border border-neutral-800 hover:border-red-900 hover:bg-red-950/20 transition-colors"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </button>
  );
}