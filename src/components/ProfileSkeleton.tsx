import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      {/* ── Avatar ── */}
      <section className="flex flex-col items-center gap-3 pt-2">
        <Skeleton className="w-16 h-16 rounded-full bg-neutral-800" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-32 bg-neutral-800" />
          <Skeleton className="h-3 w-48 bg-neutral-800" />
        </div>
      </section>

      {/* ── Account info ── */}
      <section className="space-y-3">
        <Skeleton className="h-3 w-20 bg-neutral-800" /> {/* Section Label */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-12 bg-neutral-800" />
            <Skeleton className="h-3 w-32 bg-neutral-800" />
          </div>
          <div className="border-t border-neutral-800" />
          <div className="flex justify-between items-center">
            <Skeleton className="h-3 w-16 bg-neutral-800" />
            <Skeleton className="h-3 w-40 bg-neutral-800" />
          </div>
        </div>
      </section>

      {/* ── Form (Display Name / Password) ── */}
      <section className="space-y-3">
        <Skeleton className="h-3 w-28 bg-neutral-800" />
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-4 space-y-3">
          <Skeleton className="h-4 w-20 bg-neutral-800" /> {/* Input label */}
          <Skeleton className="h-10 w-full rounded-md bg-neutral-800" /> {/* Input field */}
          <Skeleton className="h-10 w-24 rounded-md bg-neutral-800 mt-2" /> {/* Submit button */}
        </div>
      </section>

      {/* ── Single Buttons (Session / Danger) ── */}
      <section className="space-y-3">
        <Skeleton className="h-3 w-24 bg-neutral-800" />
        <Skeleton className="h-12 w-full rounded-xl bg-neutral-800" />
      </section>
    </div>
  );
}