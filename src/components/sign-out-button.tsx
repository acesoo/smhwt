"use client";

import { signOut } from "@/app/actions/profile";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  async function handleSignOut() {
    const { error } = await signOut();
    if (!error) {
      window.location.href = "/login";
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSignOut}
      className="w-full justify-start gap-3 bg-neutral-900 border-neutral-800 text-red-400 hover:bg-red-950/20 hover:border-red-900 hover:text-red-400"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </Button>
  );
}