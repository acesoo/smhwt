import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResourcesSkeleton({ count = 4 }: { count?: number }) {
  return (
    // Note: The main wrapper exactly matches the classes from resource-library.tsx
    <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-6 animate-in fade-in duration-500">
      
      {/* ── Search Input ── */}
      <div className="relative">
        <Skeleton className="h-10 w-full rounded-md bg-neutral-800" />
      </div>

      {/* ── Coping Tag Filters ── */}
      <section aria-label="Loading filters">
        {/* "Filter by coping strategy" label */}
        <Skeleton className="h-3 w-40 bg-neutral-800 mb-3" /> 

        {/* "All" button */}
        <div className="mb-4">
          <Skeleton className="h-7 w-12 rounded-full bg-neutral-800" />
        </div>

        {/* Simulated COPING_TAG_GROUPS */}
        <div className="space-y-4">
          
          {/* Group 1 */}
          <div className="space-y-2">
            <Skeleton className="h-2 w-24 bg-neutral-800" /> {/* Category Title */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
              <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
              <Skeleton className="h-7 w-16 rounded-full bg-neutral-800" />
            </div>
          </div>
          
          {/* Group 2 */}
          <div className="space-y-2">
            <Skeleton className="h-2 w-32 bg-neutral-800" /> {/* Category Title */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
              <Skeleton className="h-7 w-16 rounded-full bg-neutral-800" />
              <Skeleton className="h-7 w-32 rounded-full bg-neutral-800" />
              <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
            </div>
          </div>

        </div>
      </section>

      {/* ── Results ── */}
      <section aria-label="Loading results">
        {/* "X resources" label */}
        <Skeleton className="h-3 w-24 bg-neutral-800 mb-3" /> 

        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <Card key={i} className="bg-neutral-900 border-neutral-800">
              <CardContent className="pt-4 pb-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  {/* Title */}
                  <Skeleton className="h-4 w-3/4 bg-neutral-800" />
                  {/* External Link Icon placeholder */}
                  <Skeleton className="h-4 w-4 bg-neutral-800 shrink-0" />
                </div>
                
                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Skeleton className="h-4 w-14 rounded-sm bg-neutral-800" />
                  <Skeleton className="h-4 w-20 rounded-sm bg-neutral-800" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}