"use client";

import { useActionState, useEffect, useRef } from "react";
import { changePassword, type ProfileFormState } from "@/app/actions/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const initialState: ProfileFormState = { success: false };

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    changePassword,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="new_password"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400"
        >
          New password
        </label>
        <Input
          id="new_password"
          name="new_password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-blue-600"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="confirm_password"
          className="block text-xs font-semibold uppercase tracking-wider text-neutral-400"
        >
          Confirm password
        </label>
        <Input
          id="confirm_password"
          name="confirm_password"
          type="password"
          placeholder="Repeat your new password"
          autoComplete="new-password"
          className="bg-neutral-800 border-neutral-700 text-neutral-200 placeholder:text-neutral-500 focus-visible:ring-blue-600"
        />
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
        {isPending ? "Updating..." : "Update password"}
      </Button>
    </form>
  );
}