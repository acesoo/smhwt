## Decision Log Entry #1
**Date:** 4/9/2026 

**Decision:** Proceed with "Student Mental Health & Wellness Tracker" as project topic using Supabase + Vercel as the tech stack  

**Options Considered:**
- Firebase vs Supabase → chose Supabase for built-in Postgres and Row Level Security
- Netlify vs Vercel → chose Vercel for seamless Next.js integration and preview URLs
- Custom backend vs BaaS → chose BaaS (Supabase) to focus effort on features, not infrastructure

**Rationale:**  Supabase was selected over Firebase because it provides a familiar SQL-based database (PostgreSQL) which is more suitable for structured wellness data like mood logs, journal entries, and goal tracking — all of which benefit from relational queries and joins. Its built-in Row Level Security (RLS) also ensures each student's data stays private without requiring a custom auth layer. Vercel was chosen as the deployment platform due to its native integration with Next.js, enabling automatic deployments on every push to main and per-PR preview URLs, which supports the team's iterative sprint workflow.

**Decided by:** Ralph, PM  

**Status:** Confirmed
