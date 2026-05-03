"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";

export function SignOutButton() {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={async () => {
        await signOut();
      }}
      className="w-full justify-start gap-3 bg-neutral-900 border-neutral-800 text-red-400 hover:bg-red-950/20 hover:border-red-900 hover:text-red-400"
    >
      <LogOut className="w-4 h-4" />
      Sign out
    </Button>
  );
}