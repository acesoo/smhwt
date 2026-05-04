import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-5 animate-in fade-in duration-500">
      
      {/* ── Dashboard Summary Card ── */}
      <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl overflow-hidden">
        
        {/* Greeting Header */}
        <div className="px-5 pt-5 pb-4 border-b border-neutral-800 space-y-2.5">
          <Skeleton className="h-3 w-32 bg-neutral-800" /> {/* Date */}
          <Skeleton className="h-5 w-48 bg-neutral-800" /> {/* Greeting */}
          <Skeleton className="h-3 w-40 bg-neutral-800" /> {/* Streak text */}
        </div>

        {/* Stat Cards (Grid) */}
        <div className="grid grid-cols-3 divide-x divide-neutral-800 border-b border-neutral-800">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-3 flex flex-col gap-1.5">
              <Skeleton className="h-2 w-12 bg-neutral-800" /> {/* Label */}
              <Skeleton className="h-6 w-10 bg-neutral-800" /> {/* Big Number */}
              <Skeleton className="h-2 w-16 bg-neutral-800" /> {/* Sub-label */}
            </div>
          ))}
        </div>

        {/* Mood Trend Chart */}
        <div className="px-5 pt-4 pb-3 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-3">
            <Skeleton className="h-3 w-20 bg-neutral-800" /> {/* "Mood trend" */}
            <Skeleton className="h-2 w-16 bg-neutral-800" /> {/* "Last 7 days" */}
          </div>
          <Skeleton className="h-14 w-full rounded-md bg-neutral-800" /> {/* Chart Area */}
        </div>

        {/* Recent Journal Entries */}
        <div className="px-5 pt-4 pb-5">
          <Skeleton className="h-3 w-28 bg-neutral-800 mb-4" /> {/* "Recent entries" */}
          
          <div className="flex flex-col gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-neutral-800 last:border-b-0"
              >
                <Skeleton className="w-1.5 h-1.5 rounded-full bg-neutral-700 mt-1.5 shrink-0" /> {/* Blue dot */}
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-neutral-800" /> {/* Title */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Skeleton className="h-3 w-24 bg-neutral-800" /> {/* Date text */}
                    <Skeleton className="h-4 w-12 rounded-full bg-neutral-800" /> {/* Tag 1 */}
                    <Skeleton className="h-4 w-16 rounded-full bg-neutral-800" /> {/* Tag 2 */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Browse Resources Button ── */}
      <Skeleton className="h-14 w-full rounded-xl bg-neutral-900 border border-neutral-800" />

    </div>
  );
}