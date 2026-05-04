import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      
      {/* ── Dashboard Summary Card ── */}
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
        
        {/* Greeting Header */}
        <div className="px-5 pt-5 pb-4 border-b border-white/10 space-y-2.5">
          <Skeleton className="h-3 w-32 bg-white/10" /> {/* Date */}
          <Skeleton className="h-6 w-48 bg-white/10" /> {/* Greeting */}
          <Skeleton className="h-3 w-40 bg-white/10" /> {/* Streak text */}
        </div>

        {/* Stat Cards (Grid) */}
        <div className="grid grid-cols-3 divide-x divide-white/10 border-b border-white/10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-3 flex flex-col gap-1.5 bg-white/[0.02]">
              <Skeleton className="h-2 w-16 bg-white/10" /> {/* Label */}
              <Skeleton className="h-6 w-10 bg-white/10" /> {/* Big Number */}
            </div>
          ))}
        </div>

        {/* Recent Journal Entries */}
        <div className="px-5 pt-4 pb-5">
          <Skeleton className="h-3 w-28 bg-white/10 mb-4" /> {/* "Recent entries" */}
          
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-white/5 last:border-b-0"
              >
                <Skeleton className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 shrink-0" /> {/* Blue dot */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-white/10" /> {/* Title */}
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <Skeleton className="h-3 w-24 bg-white/10" /> {/* Date text */}
                    <Skeleton className="h-4 w-12 rounded-full bg-white/10" /> {/* Tag 1 */}
                    <Skeleton className="h-4 w-16 rounded-full bg-white/10" /> {/* Tag 2 */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* ── Bottom Resource Link Skeleton ── */}
      <Skeleton className="h-14 w-full rounded-xl bg-white/5 border border-white/10" />
    </div>
  );
}