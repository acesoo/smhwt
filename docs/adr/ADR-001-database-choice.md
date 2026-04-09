# ADR-001: Database Choice

| Field       | Detail                                      |
|-------------|---------------------------------------------|
| **ID**      | ADR-001                                     |
| **Issue**   | S1-DEV-03                                   |
| **Date**    | 2025-01-01                                  |
| **Status**  | Accepted                                    |
| **Deciders**| Developer (reviewed by PM & KM Analyst)     |

---

## Context

The **Student Mental Health & Wellness Tracker** stores sensitive, personally identifiable mental health data — mood logs, private journal entries, wellness goals, and curated resources. This places data privacy and per-user data isolation at the highest priority of any infrastructure decision.

We needed a backend database solution that satisfies all of the following constraints:

- **Row-level data isolation** — a user must never be able to read or write another user's records, enforced at the database layer, not just the application layer.
- **Authentication** — the solution must provide a reliable, secure, out-of-the-box auth system so the Developer is not rebuilding credential management from scratch.
- **Relational data model** — mood logs, journal entries, goals, and resources have clear relational links to a `user_id`; a relational schema is the natural fit.
- **Developer velocity** — the team is a small capstone group operating on a fixed 8-week timeline with no dedicated DevOps resource.
- **Cost** — the solution must have a viable free tier sufficient to carry the project through development and the oral defense demo.
- **Vercel compatibility** — the chosen backend must integrate cleanly with our Vercel deployment pipeline.

---

## Options Considered

### Option 1 — Supabase (Postgres + Auth + RLS)

**Description:** Supabase is an open-source Firebase alternative built on top of PostgreSQL. It provides a hosted Postgres database, a built-in authentication service (email/password, OAuth, magic link), auto-generated REST and Realtime APIs, and native Row Level Security (RLS) enforcement at the database engine level.

**Pros:**
- **Native RLS support** — Security policies (e.g., `auth.uid() = user_id`) are enforced by the Postgres engine itself, meaning a misconfigured API call cannot leak another user's data. This is the strongest privacy guarantee available short of separate databases per user.
- **Built-in Auth** — Supabase Auth issues JWTs whose `sub` claim is automatically available inside RLS policies as `auth.uid()`, creating a seamless, tamper-proof link between the authenticated session and the data access rules.
- **Relational schema** — Full Postgres means foreign keys, joins, indexes, and complex queries are all supported natively, which matches our data model.
- **JavaScript client SDK** — `@supabase/supabase-js` integrates directly into Next.js with minimal boilerplate.
- **Generous free tier** — 500 MB database, 50,000 monthly active users, and unlimited API requests on the free plan.
- **Vercel-native** — Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) drop directly into Vercel's environment variable settings.

**Cons:**
- Supabase is a managed third-party service; the project has no control over infrastructure uptime.
- The free tier pauses inactive projects after 7 days (mitigated by keeping the project active during the sprint period).

---

### Option 2 — Firebase (Firestore + Firebase Auth)

**Description:** Firebase is Google's managed backend platform, offering the Firestore NoSQL document database, Firebase Authentication, and Cloud Functions.

**Pros:**
- Extremely fast to prototype with; large community and documentation.
- Firebase Auth is mature and battle-tested.
- Realtime data sync is built in.

**Cons:**
- **No native row-level security equivalent** — Firestore's Security Rules operate on documents and collections, but they are defined in a custom DSL and enforced outside the database engine. Misconfigured rules are a leading cause of Firestore data exposure incidents.
- **NoSQL document model is a poor fit** — our schema is inherently relational (`mood_logs.user_id → users`, `journal_entries.tags → taxonomy`). Firestore requires denormalization and duplicated data to replicate relational joins, increasing inconsistency risk.
- **Vendor lock-in** — Firebase is a proprietary Google service with no self-hosted option.
- **Cost unpredictability** — Firestore pricing is per read/write operation, which can scale unexpectedly under load.

**Verdict:** Rejected. The absence of engine-level row isolation is disqualifying for a mental health data application.

---

### Option 3 — Plain PostgreSQL (Self-Hosted or Managed via Railway/Neon)

**Description:** Deploy a standalone Postgres instance (e.g., on Railway, Neon, or Render) and implement authentication, connection pooling, and access control entirely in the application layer.

**Pros:**
- Maximum control over the database environment.
- No vendor-specific abstractions to learn.
- Full Postgres feature set available.

**Cons:**
- **No built-in authentication** — the team would need to build and maintain JWT issuance, refresh token rotation, password hashing, and session management from scratch or integrate a separate service (e.g., Auth0, Clerk), adding significant scope.
- **RLS requires manual setup** — while Postgres supports RLS natively, wiring it to a custom auth system requires careful JWT verification inside Postgres policies, a non-trivial configuration that introduces risk of misconfiguration.
- **Infrastructure overhead** — connection pooling (PgBouncer), backups, and monitoring become the Developer's responsibility.
- **Not aligned with team capacity** — the 8-week timeline cannot absorb the added complexity of a self-managed auth + database stack.

**Verdict:** Rejected. The engineering cost of building a secure auth layer from scratch is out of scope for this capstone sprint timeline.

---

## Decision

**Supabase is selected as the project's backend database and authentication provider.**

The decision is driven by two non-negotiable requirements of this specific application:

1. **Data privacy for mental health records** — Supabase's Row Level Security, enforced at the PostgreSQL engine level, guarantees that `auth.uid() = user_id` is an immovable constraint. No application-layer bug, missing middleware check, or misconfigured API route can expose one user's mood logs or journal entries to another. This engine-level guarantee is architecturally superior to application-layer guards for sensitive data.

2. **Integrated Auth-to-RLS pipeline** — Supabase Auth issues JWTs that Postgres consumes directly inside RLS policies. This means the same credential that logs a user in is the same credential that unlocks only their rows — there is no translation layer to misconfigure between the two.

These two factors together make Supabase uniquely well-suited to a mental health tracker and distinguish it from both Firebase and plain Postgres for this use case.

---

## Implementation Notes

- Enable RLS on **all** tables: `mood_logs`, `journal_entries`, `wellness_goals`, `resources`.
- Apply the following policy pattern to every user-owned table:

  ```sql
  -- Example for mood_logs; repeat for all user-scoped tables
  ALTER TABLE mood_logs ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Users can only access their own mood logs"
    ON mood_logs
    FOR ALL
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
  ```

- Store credentials in `.env.local` only; `.env*` must be present in `.gitignore` before the first push.
- Install the client: `npm install @supabase/supabase-js`
- Initialize in `/src/lib/supabase.js`:

  ```js
  import { createClient } from '@supabase/supabase-js';

  export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  ```

- RLS policy setup will be fully executed and documented under **S2-DEV-02**.

---

## Consequences

### Positive
- User data is isolated at the database engine level — the strongest privacy guarantee available without separate databases per user.
- The Developer can focus sprint capacity on feature work rather than building an auth system.
- The relational Postgres schema cleanly supports the KM Analyst's taxonomy and tag-based retrieval requirements (see `km-architecture.md`).
- The Supabase JS client integrates into Next.js without additional middleware.
- Vercel environment variable support means secrets never enter the codebase.

### Negative / Trade-offs
- The project is dependent on Supabase's free-tier availability. If the project goes inactive for 7+ days, the database pauses and must be manually restored before the demo.
- The Developer must correctly configure RLS policies for every table — a missed table would be a security gap. This is mitigated by the S2-DEV-02 task, which is dedicated to auditing all RLS policies before any feature build begins.
- Supabase abstracts the underlying Postgres instance, limiting direct database administration (e.g., custom extensions, superuser operations) on the free tier.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*