import { Skeleton } from "@/components/ui/skeleton";

export function LogSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-5 pb-32 animate-in fade-in duration-500">
      
      {/* ── Tab Switcher ── */}
      <div className="flex bg-neutral-900/50 p-1 rounded-lg mb-8 border border-neutral-800">
        <Skeleton className="h-9 flex-1 rounded-md bg-neutral-800" />
        <Skeleton className="h-9 flex-1 rounded-md bg-transparent" />
      </div>

      <div className="w-full space-y-8">
        
        {/* ── TOP PART (Narrow: Centered Calendar & Widget) ── */}
        <div className="w-full max-w-md mx-auto space-y-8">
          
          <section>
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="w-7 h-7 rounded-lg bg-neutral-800" />
              <Skeleton className="h-4 w-28 bg-neutral-800" />
              <Skeleton className="w-7 h-7 rounded-lg bg-neutral-800" />
            </div>
            <div className="grid grid-cols-7 mb-1 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={`dh-${i}`} className="h-3 w-4 mx-auto bg-neutral-800" />
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={`d-${i}`} className="h-8 w-full rounded-lg bg-neutral-800" />
              ))}
            </div>
          </section>

          <section>
            <Skeleton className="h-3 w-40 bg-neutral-800 mb-3" />
            <div className="flex gap-2 justify-between">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={`em-${i}`} className="flex-1 h-16 rounded-xl bg-neutral-800" />
              ))}
            </div>
          </section>

          <section>
            <Skeleton className="h-3 w-24 bg-neutral-800 mb-2" />
            <Skeleton className="h-2 w-full rounded-full bg-neutral-800 my-3" />
            <div className="flex justify-between mt-1">
              <Skeleton className="h-2 w-16 bg-neutral-800" />
              <Skeleton className="h-2 w-16 bg-neutral-800" />
            </div>
          </section>
        </div>

        {/* ── BOTTOM PART (Full-Width Form with Single Boxes) ── */}
        <div className="w-full space-y-8 pt-4">
          
          {/* Sleep Quality (Now a single box instead of multiple side-by-side) */}
          <section className="space-y-3">
            <Skeleton className="h-3 w-28 bg-neutral-800" /> 
            <Skeleton className="h-11 w-full rounded-lg bg-neutral-900 border border-neutral-800" />
          </section>

          {/* Textarea Note */}
          <section className="space-y-3">
             <Skeleton className="h-3 w-48 bg-neutral-800" />
             <Skeleton className="h-24 w-full rounded-xl bg-neutral-900 border border-neutral-800" />
          </section>

          {/* Academic Impact */}
          <section className="space-y-3">
             <Skeleton className="h-3 w-32 bg-neutral-800" />
             <Skeleton className="h-11 w-full rounded-lg bg-neutral-900 border border-neutral-800" />
          </section>

          {/* Taxonomy Tags Mapping */}
          <section className="space-y-8">
            
            {/* Stressors Section */}
            <div>
              <Skeleton className="h-5 w-32 bg-neutral-800 mb-4" /> {/* "Stressors" header */}
              <div className="space-y-5">
                {/* Academic */}
                <div className="space-y-3">
                  <Skeleton className="h-2 w-20 bg-neutral-800" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-32 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                  </div>
                </div>

                {/* Social */}
                <div className="space-y-3">
                  <Skeleton className="h-2 w-16 bg-neutral-800" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-16 rounded-full bg-neutral-800" />
                  </div>
                </div>

                {/* Personal */}
                <div className="space-y-3">
                  <Skeleton className="h-2 w-20 bg-neutral-800" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-16 rounded-full bg-neutral-800" />
                  </div>
                </div>
              </div>
            </div>

            {/* Coping Strategies Section */}
            <div>
              <Skeleton className="h-5 w-40 bg-neutral-800 mb-4" /> {/* "Coping Strategies" header */}
              <div className="space-y-5">
                {/* Healthy */}
                <div className="space-y-3">
                  <Skeleton className="h-2 w-20 bg-neutral-800" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-32 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                  </div>
                </div>

                {/* Avoidant */}
                <div className="space-y-3">
                  <Skeleton className="h-2 w-24 bg-neutral-800" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-7 w-24 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-20 rounded-full bg-neutral-800" />
                    <Skeleton className="h-7 w-28 rounded-full bg-neutral-800" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <Skeleton className="h-12 w-full rounded-xl bg-neutral-800 mt-6" />

        </div>
      </div>

    </div>
  );
}