# Prompt Log — Developer
**Project:** Student Mental Health & Wellness Tracker (SMHWT) 
**Branch:** feature/dev-scaffold
**Role:** Full-Stack Developer

---

## Entry 1

**Date:** April 8, 2026  
**Task:** S1-DEV-01 — Initialize repo scaffold

### Prompt Given
> "Asked for terminal commands to initialize Next.js (App Router, Tailwind, TS), install Supabase clients, configure `.env.local` and `.gitignore`, and create `/src/lib/supabase.ts`."

### What the AI Produced
- Next.js initialization command with necessary flags.
- Installation commands for `@supabase/supabase-js` and `@supabase/ssr`.
- Bash commands to set up the `/docs` folder structure.
- Code for the `/src/lib/supabase.ts` utility file.
- Formatted `git commit` command.

### What I Changed, Rejected, or Improved
- Accepted most output as-is.
- Kept `@supabase/ssr` despite the sprint plan omitting it, as it is required for App Router server components.
- Retained the `/docs` setup as part of the structural scaffold.

### What I Learned or Decided
- `@supabase/ssr` is the correct modern standard for Next.js App Router projects.
- TypeScript `!` non-null assertions in the utility file are intentional to trust env vars exist.

---

## Entry 2

**Date:** April 8, 2026  
**Task:** S1-DEV-02 — Configure `.env.local` and `.gitignore`

### Prompt Given
> "Asked why `.env.local` and an empty `components/` folder weren't showing up in `git status` after a failed commit."

### What the AI Produced
- Clarified that an empty working tree is not an error.
- Confirmed `.gitignore` was successfully hiding `.env.local`.
- Suggested adding a `.gitkeep` file to track the empty folder (provided PowerShell command).
- Updated the commit command.

### What I Changed, Rejected, or Improved
- Accepted the `.gitkeep` solution as standard practice.
- Used PowerShell's `New-Item` instead of Linux's `touch` for Windows compatibility in VS Code.

### What I Learned or Decided
- Git silently ignores empty directories; `.gitkeep` is the required workaround.
- Wildcard `.env*` in `.gitignore` is superior as it covers future environment files.
- Decided to habitually run `git check-ignore -v .env.local` before pushes to verify security.

---

## Entry 3

**Date:** April 8, 2026
**Task:** S1-DEV-03 — Write ADR-001: Database Choice (Supabase vs Firebase vs plain Postgres)

### Prompt Given
> "Requested ADR-001 (Database Choice) in Markdown comparing Supabase, Firebase, and Postgres, emphasizing data privacy via Auth and RLS."

### What the AI Produced
- Complete ADR with standard sections (Context, Options, Decision, Consequences).
- Selected Supabase based on engine-level RLS and native Auth integration.
- Provided SQL RLS policy patterns and implementation notes.
- Flagged the free-tier pause risk.

### What I Changed, Rejected, or Improved
- Accepted the structure and rationale.
- Independently verified the SQL RLS snippet for dual read/write isolation.
- Kept the Firebase rejection explicitly noting the weakness of app-layer vs. engine-level security.

### What I Learned or Decided
- Engine-level RLS is crucial; it prevents app-layer bugs from exposing sensitive user data.
- RLS must be manually enabled per table, which I will audit in S2-DEV-02.
- Implementation Notes in ADRs will serve as direct references for future build tasks.

---

## Entry 4

**Date:** April 8, 2026
**Task:** S1-DEV-04 — Write ADR-002: Hosting/Deployment Choice (Vercel selected)

### Prompt Given
> "Requested ADR-002 (Hosting Choice) highlighting Vercel's Next.js integration and auto-deploy pipeline."

### What the AI Produced
- Complete ADR comparing Vercel, Netlify, Railway, and VPS.
- Selected Vercel for zero-config integration and GitHub PR previews.
- Included setup notes, a visual workflow diagram, and flagged the 10-second serverless execution limit.

### What I Changed, Rejected, or Improved
- Accepted the extra evaluated options (Railway/VPS) for a stronger defense.
- Verified Netlify's App Router limitations and Railway's free-tier limits.
- Retained the PR preview workflow diagram for team documentation.

### What I Learned or Decided
- Vercel PR previews are essential for the QA/PM to execute the team's branch protection workflow.
- The 10-second serverless limit is acceptable for our planned lightweight Supabase CRUD calls.
- I will own the Vercel project and share preview URLs via PR comments to bypass free-tier dashboard limits.

---

## Entry 5

**Date:** April 17, 2026
**Task:** S2-DEV-01 — Design Supabase schema (users, mood_logs, journal_entries, resources, wellness_goals)

### Prompt Given
> "Requested Supabase schema mapped to `auth.users`, integrating KM Architecture (`sleep_quality`, `academic_impact`, `TEXT[]` tags), and enforcing strict RLS with specific technical fixes."

### What the AI Produced
- Complete PostgreSQL schema for the core tables.
- Built-in KM tracking fields and native Postgres `TEXT[]` arrays for tag filtering.
- Built-in optimizations like GIN indexes and auto-updating triggers.

### What I Changed, Rejected, or Improved
- **Security:** Replaced deprecated `auth.role()` with `auth.uid() IS NOT NULL` and added `FORCE ROW LEVEL SECURITY` to all tables.
- **Logic Fixes:** Updated RLS to explicitly allow `NULL` inserts for admin resources, and added missing `progress` fields to `wellness_goals`.
- **Audit Trails:** Added missing `created_at`/`updated_at` timestamps, indexes, and triggers to `resources`.

### What I Learned or Decided
- Handling `NULL` foreign keys requires an explicit `OR column IS NULL` check in RLS policies so operations don't fail silently.
- `FORCE ROW LEVEL SECURITY` is essential to prevent accidental superuser bypasses.
- Baking frontend requirements (like goal progress fields) into the initial schema design saves massive database migration headaches later.

---

*This log is maintained on the `feature/dev-scaffold` branch and submitted as part of the Developer's individual deliverable.*