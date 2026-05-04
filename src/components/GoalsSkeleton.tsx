import { Skeleton } from "@/components/ui/skeleton";

export function GoalsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="w-full max-w-4xl mx-auto pt-5 pb-32 space-y-5 animate-in fade-in duration-500">
      
      {/* ── Wellness Goal Form Skeleton ── */}
      <section>
        <div className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-6 space-y-4">
          <Skeleton className="h-6 w-40 bg-neutral-800 mb-2" /> {/* Title */}
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-56 bg-neutral-800" /> {/* Label */}
            <Skeleton className="h-24 w-full rounded-lg bg-neutral-900 border border-neutral-800" /> {/* Textarea */}
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-32 bg-neutral-800" /> {/* Label */}
            <Skeleton className="h-12 w-full rounded-lg bg-neutral-900 border border-neutral-800" /> {/* Date Input */}
          </div>

          <Skeleton className="h-12 w-full rounded-lg bg-neutral-800 mt-2" /> {/* Submit Button */}
        </div>
      </section>

      {/* ── Active Goals Section Skeleton ── */}
      <section className="space-y-4">
        {/* Section Header (Title + Count Badge) */}
        <h2 className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 bg-neutral-800" />
          <Skeleton className="h-5 w-6 rounded-full bg-neutral-800" />
        </h2>
        
        {/* Goal Cards Grid */}
        <div className="grid gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div 
              key={i} 
              className="bg-[#1a1a1a] border border-neutral-800 rounded-xl p-5 flex flex-col gap-4"
            >
              {/* Header Row (Status Badge) */}
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-20 rounded-full bg-neutral-800" />
              </div>

              {/* Goal Body */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-neutral-800" />
                <Skeleton className="h-4 w-4/5 bg-neutral-800" />
              </div>

              {/* Date */}
              <Skeleton className="h-3 w-32 bg-neutral-800" />

              {/* Actions (Transitions) */}
              <div className="flex gap-2 mt-2 pt-4 border-t border-neutral-800">
                <Skeleton className="h-9 flex-1 rounded-lg bg-neutral-800" />
                <Skeleton className="h-9 flex-1 rounded-lg bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}