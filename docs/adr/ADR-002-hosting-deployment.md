# ADR-002: Hosting & Deployment Choice

| Field        | Detail                                      |
|--------------|---------------------------------------------|
| **ID** | ADR-002                                     |
| **Issue** | S1-DEV-04                                   |
| **Date** | 2026-04-08                                  |
| **Status** | Accepted                                    |
| **Deciders** | Developer (reviewed by PM)                  |

---

## Context
We need a publicly accessible hosting platform for Next.js to enable QA integration testing and the final live demo. It must support Next.js natively, automate deployments via GitHub, securely handle environment variables, and require zero DevOps maintenance.

---

## Options Considered

### 1. Vercel - **Selected**
**Pros:** First-party Next.js support (zero configuration needed), automatic production deploys on `main` merges, PR preview URLs for team testing, and secure dashboard environment variables.

### 2. Netlify - **Rejected**
**Cons:** Relies on third-party Next.js adapters which often lag behind new features, risking compatibility bugs and slower serverless cold starts.

### 3. Railway - **Rejected**
**Cons:** Lacks Next.js-native optimizations (edge caching, image optimization) and relies on a usage-based cost model that risks billing issues.

### 4. Self-Hosted VPS (DigitalOcean/AWS) - **Rejected**
**Cons:** Massive DevOps overhead (managing Linux, SSL, Nginx, CI/CD) that exceeds sprint capacity.

---

## Decision
**We will deploy the application using Vercel.** Vercel perfectly integrates with Next.js, automatically generates preview URLs for pull requests (enforcing our branch review workflow), and offloads 100% of server and infrastructure maintenance so the Developer can focus purely on feature code.

---

## Implementation Notes
- Link the GitHub repository via the Vercel dashboard.
- Inject `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` through Vercel's environment variables UI (never in the repo).
- Live URL automatically syncs with the `main` branch.

---

## Consequences
- **Positive:** Team can review live PRs before merging, no secrets exist in the codebase, and instant deployment rollbacks are available if a build breaks before the demo.
- **Negative:** Free tier serverless functions are capped at 10 seconds (acceptable for our Supabase CRUD needs), and project ownership is limited to a single developer account.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*