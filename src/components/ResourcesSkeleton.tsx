import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ResourcesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <main className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 space-y-6 animate-in fade-in duration-500">

      {/* ── Coping Tag Filters ── */}
      <section aria-label="Loading filters">
        <Skeleton className="h-3 w-40 bg-white/10 mb-4" /> 

        <div className="space-y-4">
          <div className="space-y-3">
            <Skeleton className="h-2 w-24 bg-white/10" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-20 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-24 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-16 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-28 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-16 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="space-y-3">
            <Skeleton className="h-2 w-20 bg-white/10" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-24 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-16 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-32 rounded-full bg-white/10" />
              <Skeleton className="h-7 w-20 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-white/10 pt-2" />

      {/* ── Results ── */}
      <section aria-label="Loading results">
        <Skeleton className="h-3 w-24 bg-white/10 mb-4" /> 

        <div className="space-y-3">
          {Array.from({ length: count }).map((_, i) => (
            <Card key={i} className="bg-white/5 border-white/10 backdrop-blur-md shadow-xl">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <Skeleton className="h-4 w-3/4 bg-white/10" />
                  <Skeleton className="h-4 w-4 bg-white/10 shrink-0" />
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <Skeleton className="h-5 w-16 rounded-md bg-white/10" />
                  <Skeleton className="h-5 w-20 rounded-md bg-white/10" />
                  <Skeleton className="h-5 w-14 rounded-md bg-white/10" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}