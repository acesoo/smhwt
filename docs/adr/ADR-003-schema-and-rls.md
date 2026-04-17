# ADR-003: Authentication Approach

| Field       | Detail                                      |
|-------------|---------------------------------------------|
| **ID**      | ADR-003                                     |
| **Issue**   | S2-DEV-03                                   |
| **Date**    | 2026-04-17                                  |
| **Status**  | Accepted                                    |
| **Deciders**| Developer (reviewed by PM & QA)             |

---

## Context

The Student Mental Health & Wellness Tracker requires secure user authentication to ensure private data (mood logs, journals) remains strictly isolated. Because our frontend utilizes the **Next.js App Router**, we need an authentication strategy that handles secure, server-side session persistence seamlessly across Server Components, Client Components, Server Actions, and API routes within a strict 8-week sprint.

---

## Options Considered

### 1. Supabase Auth - **Selected**
**Pros:** Natively integrates with the Next.js App Router via the `@supabase/ssr` package. It securely manages session persistence using HTTP-only cookies, allowing Server Components to instantly verify users before rendering. It also maps directly to our PostgreSQL Row Level Security (RLS) policies.

### 2. Custom Auth (or NextAuth.js) - **Rejected**
**Cons:** Building custom authentication (hashing passwords, managing JWTs, handling HTTP-only cookies) introduces massive security risks. While NextAuth is a standard library, bridging NextAuth sessions to Supabase's RLS engine requires complex custom database functions and middleware, slowing down developer velocity.

### 3. Skipped / No Auth - **Rejected**
**Cons:** Relying on a shared application state without user accounts fundamentally violates the core privacy requirement of a mental health tracker.

---

## Decision

**We will implement Supabase Auth for all user authentication and session management.** Because we are already using Supabase as our database backend (ADR-001), Supabase Auth provides the most seamless developer experience for the Next.js App Router. It automatically handles secure session persistence via server-side cookies, ensuring that protected routes and Server Components can securely read the user's session before any sensitive data is fetched.

---

## Implementation Notes

- Utilize the `@supabase/ssr` package to configure cookie-based session storage that works flawlessly across Next.js Server and Client components.
- Implement a Next.js `middleware.ts` file to automatically refresh stale session tokens and redirect unauthenticated users away from protected routes (e.g., `/dashboard`).
- Map all database RLS policies to the user's identity using `auth.uid()`.

---

## Consequences

- **Positive:** Maximum security with minimal developer effort. Server Components in the App Router can natively await session verification, preventing frontend loading flickers for protected pages. Guaranteed compatibility with our backend privacy firewall.
- **Negative:** We are strictly coupled to the Supabase ecosystem. If we ever migrate away from Supabase, the entire Next.js cookie/session management flow will need to be rewritten.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*