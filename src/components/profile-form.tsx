"use client";

import { useActionState, useEffect, useRef } from "react";
import { updateUsername, type ProfileFormState } from "@/app/actions/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: ProfileFormState = { success: false };

interface Props {
  currentUsername: string;
}

export function ProfileForm({ currentUsername }: Props) {
  const [state, formAction, isPending] = useActionState(
    updateUsername,
    initialState
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success && inputRef.current) {
      inputRef.current.blur();
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="username"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400"
        >
          Display name
        </label>
        <Input
          ref={inputRef}
          id="username"
          name="username"
          type="text"
          defaultValue={currentUsername}
          maxLength={32}
          placeholder="Your display name"
          className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-blue-600"
        />
        <p className="text-xs text-neutral-600">
          Shown on your dashboard greeting. Max 32 characters.
        </p>
      </div>

      {state.error && (
        <p className="text-red-400 text-sm bg-red-950/40 border border-red-800 rounded-lg px-4 py-2">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="text-green-400 text-sm bg-green-950/40 border border-green-800 rounded-lg px-4 py-2">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white"
      >
        {isPending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}