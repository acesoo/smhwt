# ADR-001: Database Choice

| Field       | Detail                                      |
|-------------|---------------------------------------------|
| **ID** | ADR-001                                     |
| **Issue** | S1-DEV-03                                   |
| **Date** | 2026-04-08                                  |
| **Status** | Accepted                                    |
| **Deciders**| Developer (reviewed by PM & KM Analyst)     |

---

## Context
The **Student Mental Health & Wellness Tracker** stores highly sensitive personal data. We require a backend that guarantees strict row-level data isolation, built-in authentication, a relational model for our Knowledge Management (KM) taxonomy, and zero DevOps overhead due to the 8-week sprint timeline.

---

## Options Considered

### 1. Supabase (Postgres + Auth + RLS) - **Selected**
**Pros:** Native Row Level Security (RLS) enforced at the database engine level, built-in Auth that maps directly to RLS policies (`auth.uid()`), relational Postgres schema, and a generous free tier.

### 2. Firebase (Firestore + Auth) - **Rejected**
**Cons:** No engine-level row isolation (relies on application-layer rules), NoSQL document model is a poor fit for our relational taxonomy, and potential vendor lock-in.

### 3. Plain PostgreSQL (Railway/Neon) - **Rejected**
**Cons:** No built-in authentication, meaning the Developer would have to build JWT issuance and session management from scratch, violating sprint capacity constraints.

---

## Decision
**We will use Supabase as our backend database and authentication provider.** Supabase uniquely solves our two biggest constraints: it provides an immovable data privacy firewall via Postgres Row Level Security, and it seamlessly connects user authentication directly to those database rules without custom middleware.

---

## Implementation Notes
- Enable RLS on **all** tables (`mood_logs`, `journal_entries`, etc.) and strictly filter using `auth.uid() = user_id`.
- Store credentials exclusively in `.env.local`.
- Initialize the `@supabase/supabase-js` client for Next.js.

---

## Consequences
- **Positive:** Maximum data privacy (engine-level isolation), zero time wasted building an auth system, and native relational support for the KM taxonomy.
- **Negative:** Dependent on Supabase's free tier (pauses after 7 inactive days); Developer must ensure no RLS policies are accidentally skipped.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*