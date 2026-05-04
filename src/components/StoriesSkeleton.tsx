import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StoriesSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-6 animate-in fade-in duration-500">
      
      {/* ── Share Story Accordion Mock ── */}
      <Skeleton className="h-14 w-full rounded-xl bg-neutral-900 border border-neutral-800" />

      {/* ── Topic Filters (FORUM_TAG_GROUPS Mock) ── */}
      <section className="space-y-4">
        <Skeleton className="h-4 w-32 bg-neutral-800 mb-3" /> {/* "Filter by topic" label */}
        
        {/* Category 1 */}
        <div className="space-y-3">
          <Skeleton className="h-2 w-24 bg-neutral-800" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
            <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
            <Skeleton className="h-7 w-16 rounded-full bg-neutral-800" />
            <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
          </div>
        </div>

        {/* Category 2 */}
        <div className="space-y-3">
          <Skeleton className="h-2 w-20 bg-neutral-800" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
            <Skeleton className="h-7 w-16 rounded-full bg-neutral-800" />
            <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
          </div>
        </div>
      </section>

      {/* ── Results Count & Sort Dropdown ── */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24 bg-neutral-800" /> {/* "X stories" */}
        <Skeleton className="h-8 w-24 rounded-lg bg-neutral-800" /> {/* Sort Dropdown */}
      </div>

      {/* ── Anonymous Story Cards ── */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="bg-[#1a1a1a] border-neutral-800">
            <CardContent className="pt-5 pb-5 space-y-4">
              
              {/* Header: Title + Author/Date */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-3/4 bg-neutral-800" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-3 rounded-full bg-neutral-800 shrink-0" /> {/* Shield Icon Mock */}
                  <Skeleton className="h-3 w-40 bg-neutral-800" /> {/* "Anonymous Student · Date" */}
                </div>
              </div>

              {/* Tags Row */}
              <div className="flex flex-wrap gap-1.5">
                <Skeleton className="h-5 w-16 rounded-md bg-neutral-800" />
                <Skeleton className="h-5 w-20 rounded-md bg-neutral-800" />
                <Skeleton className="h-5 w-14 rounded-md bg-neutral-800" />
              </div>

              {/* Body Text */}
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full bg-neutral-800" />
                <Skeleton className="h-4 w-full bg-neutral-800" />
                <Skeleton className="h-4 w-4/5 bg-neutral-800" />
              </div>
              
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}