// src/lib/supabase.ts
// Browser-side Supabase client — safe to use in Client Components.
// For Server Components and Route Handlers, use createServerClient from @supabase/ssr.

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}