"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { requestAccountDeletion, type ProfileFormState } from "@/app/actions/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

const initialState: ProfileFormState = { success: false };

export function DeleteAccountForm() {
  const [state, formAction, isPending] = useActionState(
    requestAccountDeletion,
    initialState
  );
  const [expanded, setExpanded] = useState(false);
  const [prevState, setPrevState] = useState(initialState);
  const router = useRouter();

  // Redirect to login immediately after successful deletion
  if (state !== prevState) {
    setPrevState(state);
    if (state.success) {
      router.push("/login");
    }
  }

  return (
    <div className="space-y-3">
      {!expanded ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => setExpanded(true)}
          className="w-full justify-start gap-3 bg-neutral-900 border-neutral-800 text-red-400 hover:bg-red-950/20 hover:border-red-900 hover:text-red-400"
        >
          <TriangleAlert className="w-4 h-4" />
          Account deletion
        </Button>
      ) : (
        <form action={formAction} className="space-y-4">
          <div className="px-4 py-3 rounded-xl bg-red-950/30 border border-red-800 space-y-1">
            <p className="text-xs font-semibold text-red-400">
              This action cannot be undone.
            </p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              All your mood logs, journal entries, and wellness goals will be
              permanently deleted. Type{" "}
              <span className="font-mono font-semibold text-neutral-200">
                DELETE
              </span>{" "}
              below to confirm.
            </p>
          </div>

          <Input
            name="confirmation"
            type="text"
            placeholder="Type DELETE to confirm"
            autoComplete="off"
            className="bg-neutral-800 border-red-900 text-neutral-200 placeholder:text-neutral-600 focus-visible:ring-red-600"
          />

          {state.error && (
            <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-2">
              {state.error}
            </p>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setExpanded(false)}
              className="flex-1 bg-neutral-900 border-neutral-800 text-neutral-400 hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-red-700 hover:bg-red-600 text-white"
            >
              {isPending ? "Deleting..." : "Confirm deletion"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}