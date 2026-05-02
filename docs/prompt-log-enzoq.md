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
- **Idempotency:** Added `IF NOT EXISTS` to table and index creations so the script can be re-run safely. 
- **Index Immutability Fix:** Fixed an issue flagged in the daily index by forcing a UTC timezone conversion (`((logged_at AT TIME ZONE 'UTC')::DATE)`) to ensure the expression is `IMMUTABLE`.
- **Teardown Script:** Separated `DROP TABLE ... CASCADE` and `DROP FUNCTION ... CASCADE` commands from the main schema build script to prevent accidental data deletion.
- **Organization:** Moved the RLS policies to their own dedicated file for S2-DEV-02.

### What I Learned or Decided
- PostgreSQL requires computed index expressions (like extracting dates from timestamps) to be strictly immutable. Relying on local server timezones fails this rule.
- While adding `DROP TABLE` to the top of a schema file makes it idempotent, it is too dangerous for production/demo phases. A dedicated `reset-db.sql` script is the safer architectural choice.

---

## Entry 6

**Date:** April 17, 2026  
**Task:** S2-DEV-02 — Implement Row Level Security (RLS) policies

### Prompt Given
> "Asked how to drop the current tables to run a fresh schema, and whether I can add DROP commands directly into the `rls-policies.sql` script so I can run it safely every time I make a change."

### What the AI Produced
- Provided the CASCADE tear-down SQL script for tables and functions.
- Warned against putting table drops in the schema file, but highly recommended dropping policies.
- Generated a fully updated `rls-policies.sql` script with `DROP POLICY IF EXISTS` added above every policy creation.

### What I Changed, Rejected, or Improved
- Applied the AI's provided idempotency pattern, ensuring every `CREATE POLICY` is preceded by its respective `DROP POLICY IF EXISTS`.
- Mapped all policies strictly to `auth.uid()` for isolated row-level operations.

### What I Learned or Decided
- Unlike dropping tables (which permanently destroys data), dropping and recreating RLS policies is perfectly safe. 
- Making the RLS file completely idempotent allows the team to rapidly tweak and test security rules without throwing "policy already exists" errors in PostgreSQL.

---

## Entry 7

**Date:** April 17, 2026  
**Task:** S2-DEV-03 — Write ADR-003: Authentication Approach

### Prompt Given
> "Requested ADR-003 detailing our Authentication Approach, focusing on the decision to use Supabase Auth versus building a custom authentication solution."

### What the AI Produced
- Drafted Architectural Decision Record (ADR-003) for our Auth strategy.
- Detailed the tight integration between Supabase Auth and our PostgreSQL Row Level Security.

### What I Changed, Rejected, or Improved
- Accepted the provided rationale and structure.
- Ensured the document accurately reflected our reliance on `auth.uid()` as the foundational anchor for all database privacy.

### What I Learned or Decided
- Relying on Supabase Auth is not just a convenience choice; it is architecturally mandatory for our security model, as the database engine requires native auth context to evaluate our RLS policies securely.

---

## Entry 8

**Date:** April 19, 2026  
**Task:** S2-DEV-04 — Set up Vercel CI/CD deployment

### Prompt Given
> "Asked how to deploy the GitHub repo to the PM's personal Vercel account, how to fix Vercel failing to auto-detect Next.js (defaulting to 'Other'), and how to resolve a domain name conflict."

### What the AI Produced
- Explained Vercel's Free (Hobby) tier limitation regarding linking to third-party repositories.
- Diagnosed that Vercel failed to detect Next.js because it was scanning the empty `main` branch instead of the active `dev` branch.
- Explained that `.vercel.app` domains are globally unique and how to redirect or claim new domains.

### What I Changed, Rejected, or Improved
- Rejected the AI's CLI deployment workaround because it would break our automatic CI/CD pipeline. 
- Instead, instructed the PM (the repo owner) to handle the initial deployment connection to preserve automatic deployments.
- Had the PM temporarily switch the GitHub default branch from `main` to `dev` so Vercel could successfully auto-detect the framework.

### What I Learned or Decided
- Vercel's free tier essentially locks automatic GitHub CI/CD pipelines to the repository owner.
- Vercel scans the default branch during the initial project import. If the active code is on a `dev` branch but `main` is empty, Vercel will not recognize the Next.js `package.json` file.
- Delegating environment-level setup to the repo owner while guiding them through the configuration is the correct architectural choice for team projects on free tiers.

---

## Entry 9

**Date:** April 21, 2026  
**Task:** S3-DEV-01 — Build Supabase Auth (signup, login, logout, session persistence) & Database migrations

### Prompt Given
> "Requested implementation of Supabase Auth using the `@supabase/ssr` middleware pattern for Next.js App Router, including signup, login, and logout server actions. Additionally, asked to verify the database extensions and RLS policies for the Sprint 3 tables (Mood, Journal, Goals)."

### What the AI Produced
- Next.js `middleware.ts` configured for `@supabase/ssr` to ensure route protection and session persistence.
- Secure Server Actions for authentication (`signUp`, `signIn`, `signOut`).
- Confirmed the schema for `mood_logs`, `journal_entries`, and `wellness_goals` were correctly structured with strict `auth.uid()` RLS policies protecting the endpoints.

### What I Changed, Rejected, or Improved
- Ensured the middleware matcher accurately protected all internal dashboard routes while leaving the login page public.
- Kept database modifications strict to only the tables needed for Sprint 3 to avoid feature creep.
- Ensured timezone handling was secure for the upcoming daily log limits.

### What I Learned or Decided
- The `@supabase/ssr` middleware pattern is absolutely essential for Next.js App Router; it reliably intercepts requests to refresh auth cookies *before* rendering Server Components.
- A solid backend foundation and a fully functioning authentication flow are mandatory prerequisites before touching the core frontend forms, as RLS requires a logged-in user to function correctly.

---

## Entry 10

**Date:** April 21, 2026  
**Task:** S3-DEV-02 — Build Mood Log form and its server action

### Prompt Given
> "Asked for the core backend logic, Next.js Server Actions, and a lightly styled client form for the Mood Tracker."

### What the AI Produced
- Provided the raw React hook form setup linked securely to a Supabase insert action.
- Included basic loading, error, and success state handling.

### What I Changed, Rejected, or Improved
- Intentionally instructed the AI to provide only basic, functional Tailwind HTML. 
- Rejected over-engineering the CSS styling at this stage to avoid doing "throwaway work" before the official UX designs and `shadcn/ui` integration.

### What I Learned or Decided
- Treating Server Actions as isolated "engine components" keeps the codebase extremely modular and easy to debug.

---

## Entry 11

**Date:** April 21, 2026  
**Task:** S3-DEV-03 — Build Journal Entry form and its server action

### Prompt Given
> "Requested the client component and database connection logic for the Journal Entry feature, maintaining the same unstyled, functional approach as the Mood form."

### What the AI Produced
- A text-area driven form component and a secure Supabase insertion Server Action.

### What I Changed, Rejected, or Improved
- Verified the form resets state correctly upon a successful Supabase insert to prevent accidental double-posting by the user.

### What I Learned or Decided
- Consistency in handling forms (loading -> submit -> revalidate -> reset) across tasks makes the user experience seamless, even before styles are applied.

---

## Entry 12

**Date:** April 22, 2026  
**Task:** S3-DEV-04 — Build Wellness Goals tracker and its server action

### Prompt Given
> "Asked to verify my commit message for building the Wellness Goals tracker and provided the 4 associated files: `wellness-goals.ts`, `wellness-goal-form.tsx`, `goal-card.tsx`, and `page.tsx`."

### What the AI Produced
- Suggested updating my commit message from a simple string to a strict Conventional Commit format (`feat: [S3-DEV-04]...`).

### What I Changed, Rejected, or Improved
- Accepted the revised commit message to maintain professional repository standards.
- Engineered full CRUD capabilities natively utilizing Next.js Server Actions and `revalidatePath` for immediate UI updates.

### What I Learned or Decided
- Structuring the Goals feature with specific `GoalStatus` types (active, completed, abandoned) allows for clean, compartmentalized rendering on the frontend.

---

## Entry 13

**Date:** April 22, 2026  
**Task:** S3-DEV-05 — Initialize Shadcn UI, set up Tailwind config, and document ADR-004

### Prompt Given
> "Asked if it was safe to initialize `shadcn/ui` while maintaining current functional code. Asked for guidance on CLI prompts regarding Base vs. Radix, and which visual preset to use."

### What the AI Produced
- Explained the difference between Radix (battle-tested, accessible) and Base (newer). 
- Explained visual presets and recommended "Maia" for its calming, rounded aesthetics.
- Clarified that `lucide-react` is the native icon dependency for `shadcn`.

### What I Changed, Rejected, or Improved
- Chose **Radix** to guarantee we pass the strict WCAG accessibility audits mandated in Sprint 4.
- Chose the **Maia** preset to perfectly align with the "calm, low-stimulation" mandate outlined in ADR-004.
- Committed the generated UI utility files safely alongside the functional forms.

### What I Learned or Decided
- Adding `shadcn/ui` does not break existing Tailwind components. 
- Initializing with a preset automatically handles CSS variable injections into `globals.css` without requiring manual theme configuration.

---

## Entry 14

**Date:** April 22, 2026  
**Task:** S3-DEV-06 — Update Changelog for v0.1.0 release

### Prompt Given
> "Asked for the text to add to `CHANGELOG.md` for the v0.1.0 release. Researched Keep a Changelog standards and debated including a placeholder Navigation bar."

### What the AI Produced
- Generated a `CHANGELOG.md` encompassing Sprint 1 architecture and Sprint 3 core features.
- Initially included the Navigation bar placeholder based on earlier prompts.

### What I Changed, Rejected, or Improved
- **Rejected** listing the Navigation bar as a completed feature because it was merely a placeholder returning `404` errors. I advocated that changelogs must only reflect functional features to avoid presenting "vaporware."
- **Improved** the file by researching standard practices and manually implementing an `## [Unreleased]` tracking section at the top of the file to stage upcoming Sprint 4 UX tasks.

### What I Learned or Decided
- The Changelog must act as a strict source of truth. If code is not deployed and functional, it does not belong in a release block. 
- Using `[Unreleased]` creates a perfect bridge between sprints, allowing the codebase documentation to mirror the Agile board.

---

## Entry 15

**Date:** May 1, 2026
**Task:** S4-DEV-01 — Build Resource Library

### Prompt Given
> "Asked for Next.js Client and Server components using shadcn/ui to build a Resource Library filterable by KM Taxonomy tags via Supabase's `.contains()` method, plus a mock data SQL snippet. Later asked how to properly include the SQL insert query (with real-world NIH/APA links) in the PR description."

### What the AI Produced
- Generated the Next.js UI components successfully utilizing shadcn/ui and the Supabase array filtering logic.
- Provided a SQL insert query containing real-world links (NIH, APA).
- Initially suggested instructing reviewers to use `npx supabase db reset`, but later recommended moving the SQL into a `supabase/seed.sql` file as an industry standard.

### What I Changed, Rejected, or Improved
- **Rejected** the AI's generated `shadcn/ui` components for now. I decided to build the MVP using standard HTML and Tailwind CSS to prioritize getting the Supabase data fetching and filtering working first. I will integrate `shadcn/ui` during the Polish phase (S5).
- Accepted the file restructuring (`seed.sql` vs `migrations`) to prevent dropping production tables.
- **Rejected** the AI's suggestion to instruct reviewers to use `npx supabase db reset` for testing. I realized this would wipe my teammates' local databases and destroy their mock data.
- Improved the PR instructions by providing the SQL as a standalone file for safe, manual execution.

### What I Learned or Decided
- Supabase `.contains()` is highly efficient for tag-based array filtering.
- Deferring complex UI implementations to focus on core backend functionality (data fetching) is a practical agile development strategy.
- Local developer experience (DX) is important; avoiding destructive CLI commands like `db reset` in shared environments prevents blocking teammates.

---

## Entry 16

**Date:** May 1, 2026
**Task:** S4-DEV-02 — Build Search & Retrieve

### Prompt Given
> "Requested a unified Search & Retrieve dashboard using shadcn/ui to filter `journal_entries` and `resources` by keyword/tag, including a KM Pattern Identification requirement. Also asked for the PR description and how to resolve a Git mistake where I pushed files for both S4-DEV-01 and S4-DEV-02 to the same branch despite project rules requiring separate PRs."

### What the AI Produced
- Provided the complex Supabase query logic to join/cross-reference entries and calculate the KM Pattern averages.
- Generated the UI code heavily reliant on `shadcn/ui`.
- Generated the S4-DEV-02 PR description adhering to the KM Taxonomy mapping.
- Provided a step-by-step "Git magic" untangle process: using `git log`, `git branch`, `git reset --hard`, and `git push --force origin` to split the PRs.

### What I Changed, Rejected, or Improved
- **Rejected** the immediate implementation of the AI's `shadcn/ui` components. Continued using basic Tailwind UI elements to strictly focus on making the complex Supabase query logic and KM Pattern requirements work. `shadcn` styling is officially deferred to S5.
- Implemented the pattern identification logic carefully to ensure it matched the architecture in `km-architecture.md`.
- Chose the strict "Untangle" approach over the AI's alternative "Roll With It" (combining PRs) approach to ensure I strictly follow the PM's individual issue tracking rules.
- Successfully executed the terminal commands to separate the features into two distinct PRs without losing any code.

### What I Learned or Decided
- You cannot open two separate PRs from the exact same branch simultaneously.
- `git reset --hard <hash>` followed by a force push is a safe and powerful way to edit PR history as long as nobody else is working on that specific branch.

---

## Entry 17

**Date:** May 1, 2026
**Task:** S4-DEV-03 — Build Peer Support Stories: anonymous submission form

### Prompt Given
> "Asked for a Next.js Server Action and UI form to submit anonymous peer stories to a new `peer_stories` table. Required strict RLS policies to store `submitted_by` for moderation but never expose it. Also requested KM taxonomy forum tags grouped correctly. Later asked for help debugging a Vercel build error ('Module not found') caused by accidentally pushing an incomplete file for the next task."

### What the AI Produced
- Generated the SQL migration with RLS policies, the Server Action `submitPeerStory`, and the `peer-story-form.tsx` UI.
- Identified that the Vercel build error was caused by Next.js/TypeScript strictly scanning the entire `src` directory for the incomplete `page.tsx`.
- Provided Git troubleshooting steps, explaining how to use `git stash -u` for untracked files and the "Extension Trick" (renaming to `.txt`) to hide the file from the compiler.

### What I Changed, Rejected, or Improved
- Accepted the database architecture where `submitted_by` is securely logged but deliberately excluded from the TypeScript `PeerStory` type.
- Used the `.txt` extension trick to bypass the strict Next.js/TypeScript compiler and fix the PR build. 
- Utilized `git stash -u` to save my uncommitted S4-DEV-04 files safely while untangling the PR, rather than deleting my hard work.

### What I Learned or Decided
- Privacy and anonymity can be enforced securely at the database query level by omitting identifying columns from `SELECT` statements, even if they exist for RLS.
- The Next.js TypeScript compiler aggressively scans everything in the `src/` folder. Renaming extensions or utilizing `git stash` is essential when managing strict single-task PR workflows.

---

## Entry 18

**Date:** May 1, 2026
**Task:** S4-DEV-04 — Build Peer Stories Feed: public read-only view

### Prompt Given
> "Asked to build the public-facing Peer Stories feed to display approved stories (`is_approved = true`) as cards with tag badges. Required tag filtering and integration into the S4-DEV-02 Search & Retrieve dashboard. Emphasized strictly hiding any author information."

### What the AI Produced
- Generated the `getApprovedStories` database query fetching only approved stories.
- Provided the UI components for the card layout and tag filtering.
- Generated the PR description covering the unified search integration and strict anonymity verification.

### What I Changed, Rejected, or Improved
- Continued to defer the AI's suggested `shadcn/ui` components until the S5 Polish phase. Used standard Tailwind CSS to build the feed and prioritize data flow, database filtering, and KM taxonomy alignment.
- Carefully reviewed the unified search query to ensure it smoothly handled both `journal_entries` (S4-DEV-02) and the newly added `peer_stories` without exposing user data.

### What I Learned or Decided
- Filtering sensitive content securely requires a two-pronged approach: database-level filtering (`is_approved = true`) to protect the data, combined with UI-level tag filtering for user experience.
- Integrating new features into existing queries (Search & Retrieve) highlights the importance of consistent, standardized tag schemas across tables.

---

## Entry 19

**Date:** May 1, 2026
**Task:** S4-DEV-05 — Build Dashboard and Profile

### Prompt Given
> "Asked to implement the central `/dashboard` page for aggregated insights, and a `/profile` settings page for updating the user's display name. Later expanded the profile page to include secure password changes (`changePassword`) and safe account deletions (`requestAccountDeletion`) using `shadcn/ui` buttons. Also requested root redirects, extraction of a reusable sign-out component, and the removal of the standalone Journal page."

### What the AI Produced
- Generated the `/dashboard` page logic, including streak calculations and recent entry fetches.
- Created the `/profile` page with comprehensive Server Actions to safely update display names, change passwords via Supabase Auth, and flag accounts for deletion via user metadata.
- Built the `ChangePasswordForm` and `DeleteAccountForm` client components styled with `shadcn/ui` Buttons.
- Extracted a reusable `SignOutButton` component and updated the main root `page.tsx` to redirect to `/dashboard`.

### What I Changed, Rejected, or Improved
- Intentionally deferred the "globally accessible avatar dropdown" as it is a UX/UI Designer deliverable (`S4-UX-06`), focusing instead on building the robust `/profile` settings layer beneath it.
- Rejected and completely removed a suggested Theme Toggle feature, keeping the scope strictly focused on core account management.
- Opted for a "soft delete" approach for `requestAccountDeletion` (using a metadata flag) rather than hard-deleting the user immediately. This safely preserves database relational integrity for their previous journal entries and peer stories.

### What I Learned or Decided
- Supabase Auth's `user_metadata` is highly versatile—serving not just as a single source of truth for display names, but also as a secure place to store system-level account lifecycle flags (like deletion requests).
- Consolidating account management (display name, password, deletion) into a single secure route with dedicated Server Actions keeps the application logic clean and much easier to secure.

---

## Entry 20

**Date:** May 2, 2026
**Task:** S4-DEV-06 — Build Admin Panel for Peer Story Moderation

### Prompt Given
> "Asked to build a highly protected `/admin` route for moderating peer support stories. Requested a database migration to establish an `is_admin` role, secure Server Actions to toggle story approval, and a client UI panel. Emphasized that regular users must be strictly redirected to `/dashboard` and that admin actions must be completely locked down."

### What the AI Produced
- Generated the `profiles` table migration including an `is_admin` boolean flag and a Postgres trigger to auto-create profiles for new `auth.users`.
- Created robust RLS policies allowing admins to bypass the `is_approved = true` public feed restriction to view and update pending stories.
- Provided the `/admin` page routing logic with server-side redirects for non-admins.
- Built the `AdminStoriesPanel` client component and the `toggleStoryApproval` Server Action.

### What I Changed, Rejected, or Improved
- Rather than storing the admin flag directly in Supabase's `user_metadata` (which could potentially be spoofed depending on JWT configurations), I chose to implement a dedicated `profiles` table. This allows the `is_admin` status to be strictly enforced at the database level via secure RLS policies.
- Implemented a "defense-in-depth" security model. I ensured the authorization check happens in three distinct places: at the page routing level (`page.tsx` redirect), inside the Server Action (`requireAdmin` guard), and at the database level (RLS). 
- Designed a clean, Tailwind-based moderation UI with clear visual distinction (amber warning banners) to differentiate the Admin Panel from the standard user dashboard.

### What I Learned or Decided
- Utilizing Postgres triggers (`handle_new_user`) is a powerful way to automatically synchronize custom `profiles` tables with the default Supabase `auth.users` system.
- Secure moderation tools require defense-in-depth. Relying solely on hiding the UI is insufficient; the server actions and database rows must also be explicitly locked down to prevent API abuse.

---

## Entry 21

**Date:** May 2, 2026
**Task:** S4-DEV-07 — Add CHANGELOG.md v0.2.0 entry listing Build Sprint 2 features

### Prompt Given
> 

### What the AI Produced


### What I Changed, Rejected, or Improved


### What I Learned or Decided


---

*This log is maintained on the `feature/dev-scaffold` branch and submitted as part of the Developer's individual deliverable.*