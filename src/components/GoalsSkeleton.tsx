import { Skeleton } from "@/components/ui/skeleton";

export function GoalsSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="w-full max-w-4xl mx-auto pt-5 pb-32 space-y-8 animate-in fade-in duration-500">
      
      {/* ── Wellness Goal Form Skeleton ── */}
      <section>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 backdrop-blur-md shadow-xl">
          <Skeleton className="h-6 w-40 bg-white/10 mb-2" /> {/* Title */}
          
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-48 bg-white/10" /> {/* Label */}
            <Skeleton className="h-24 w-full rounded-xl bg-white/5 border border-white/10" /> {/* Textarea */}
          </div>

          <div className="space-y-1.5">
            <Skeleton className="h-3 w-32 bg-white/10" /> {/* Label */}
            <Skeleton className="h-12 w-full rounded-xl bg-white/5 border border-white/10" /> {/* Date Input */}
          </div>

          <Skeleton className="h-[52px] w-full rounded-xl bg-blue-600/50 mt-2" /> {/* Submit Button */}
        </div>
      </section>

      {/* ── Goals Feed Skeleton ── */}
      <section className="space-y-4">
        {/* Section Header */}
        <h2 className="flex items-center gap-2">
          <Skeleton className="h-6 w-16 bg-white/10" />
          <Skeleton className="h-5 w-8 rounded-full bg-white/10" />
        </h2>
        
        {/* Goal Cards Grid */}
        <div className="grid gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 backdrop-blur-md shadow-xl"
            >
              {/* Header Row (Status Badge) */}
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-20 rounded-full bg-white/10" />
              </div>

              {/* Goal Body */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-4/5 bg-white/10" />
              </div>

              {/* Date */}
              <Skeleton className="h-3 w-32 bg-white/10" />

              {/* Actions (Transitions) */}
              <div className="flex gap-2 mt-2 pt-4 border-t border-white/10">
                <Skeleton className="h-7 w-28 rounded-lg bg-white/5 border border-white/10" />
                <Skeleton className="h-7 w-24 rounded-lg bg-white/5 border border-white/10" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}