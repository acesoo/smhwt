import { Skeleton } from "@/components/ui/skeleton";

export function SearchSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 animate-in fade-in duration-500">
      
      {/* ── Search Input Mock ── */}
      <Skeleton className="h-12 w-full rounded-xl bg-neutral-900 border border-neutral-800 mb-4" />

      {/* ── All Tags Filter Mock (Smaller and More Dense) ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Skeleton className="h-6 w-16 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-20 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-14 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-24 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-16 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-20 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-28 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-14 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-24 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-16 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-20 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-14 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-24 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-16 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-20 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-32 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-14 rounded-full bg-neutral-800" />
        <Skeleton className="h-6 w-20 rounded-full bg-neutral-800" />
      </div>

      {/* ── Idle State Placeholder ── */}
      <div className="flex flex-col items-center gap-3 py-20">
        <Skeleton className="w-10 h-10 rounded-full bg-neutral-800/50" /> {/* Search Icon Mock */}
        <Skeleton className="h-4 w-64 bg-neutral-800/50" /> {/* "Enter a keyword..." text mock */}
      </div>

    </div>
  );
}