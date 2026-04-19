# ADR-003: Authentication Approach

| Field        | Detail                              |
|--------------|-------------------------------------|
| **ID**       | ADR-003                             |
| **Issue**    | S2-DEV-03                           |
| **Date**     | 2026-04-17                          |
| **Status**   | Accepted                            |
| **Deciders** | Developer (reviewed by PM & QA)     |

---

## Context

The Student Mental Health & Wellness Tracker requires secure user authentication to ensure private data (mood logs, journals) remains strictly isolated. Because our frontend utilizes the **Next.js App Router**, we need an authentication strategy that handles secure, server-side session persistence seamlessly across Server Components, Client Components, Server Actions, and API routes within a strict 8-week sprint.

---

## Options Considered

### 1. Supabase Auth — **Selected**

**Pros:** Natively integrates with the Next.js App Router via the `@supabase/ssr` package. It securely manages session persistence using HTTP-only cookies, allowing Server Components to instantly verify users before rendering. It maps directly to our PostgreSQL Row Level Security (RLS) policies via `auth.uid()`, requiring zero custom bridging logic between the auth layer and the database layer.

### 2. NextAuth.js — **Rejected**

**Cons:** NextAuth.js is a mature authentication library, but it maintains its own session model (JWTs or database sessions) that is entirely separate from Supabase's identity system. Bridging a NextAuth session to Supabase RLS requires writing custom database adapter logic and middleware to translate NextAuth tokens into Supabase-compatible `auth.uid()` claims. This introduces significant integration complexity for no meaningful gain, since Supabase Auth already solves the same problem natively.

### 3. Custom Auth (Build from Scratch) — **Rejected**

**Cons:** Building authentication from scratch — password hashing, JWT signing, HTTP-only cookie management, token rotation, and session invalidation — introduces serious security risks and is not a viable option within the 8-week sprint timeline. Any implementation gap in a custom auth system directly exposes sensitive mental health data.

### 4. Skipped / No Auth — **Rejected**

**Cons:** Relying on a shared application state without user accounts fundamentally violates the core privacy requirement of a mental health tracker. Without authentication, RLS policies cannot be enforced and all data would be globally readable.

---

## Decision

**We will implement Supabase Auth for all user authentication and session management.**

This decision follows directly from ADR-001 (Supabase selected as database) and ADR-002 (Vercel selected as deployment platform). Vercel's serverless architecture has no persistent in-memory state between function invocations, which rules out any session strategy that relies on server-side memory. Supabase Auth's cookie-based session model is purpose-built for this environment — each serverless invocation reads the session from an HTTP-only cookie, verifies it against Supabase, and proceeds without requiring shared state. This makes it the only option evaluated that is natively compatible with both our database choice (ADR-001) and our hosting choice (ADR-002).

---

## Implementation Notes

- Utilize the `@supabase/ssr` package to configure cookie-based session storage that works across Next.js Server Components, Client Components, Server Actions, and API routes.
- Implement a Next.js `middleware.ts` file to automatically refresh stale session tokens and redirect unauthenticated users away from protected routes (e.g., `/dashboard`).
- Map all database RLS policies to the authenticated user's identity using `auth.uid()`.

---

## Consequences

- **Positive:** Maximum security with minimal developer effort. Server Components in the App Router can natively await session verification before any sensitive data is fetched, preventing both loading flickers and data leaks. Full compatibility with our RLS security model.
- **Negative:** We are tightly coupled to the Supabase ecosystem. Migrating away from Supabase would require rewriting both the database layer (ADR-001) and the entire session management flow simultaneously.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*