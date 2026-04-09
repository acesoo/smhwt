# ADR-002: Hosting & Deployment Choice

| Field        | Detail                                      |
|--------------|---------------------------------------------|
| **ID**       | ADR-002                                     |
| **Issue**    | S1-DEV-04                                   |
| **Date**     | 2025-01-01                                  |
| **Status**   | Accepted                                    |
| **Deciders** | Developer (reviewed by PM)                  |

---

## Context

The **Student Mental Health & Wellness Tracker** is built with Next.js and must be deployed to a publicly accessible URL for two critical reasons: the QA/Docs Lead needs a live environment to execute integration test cases, and the oral defense requires a live demo that instructors and panelists can verify in real time.

We needed a hosting and deployment platform that satisfies all of the following constraints:

- **Next.js compatibility** — the platform must support Next.js's full feature set, including the App Router, Server Components, API Routes, and environment variable injection, without requiring custom server configuration.
- **Automated deployment pipeline** — every push to `main` must trigger a production deploy automatically. Every pull request must generate a unique preview URL so the team can review feature branches before merging. Manual deployment steps introduce human error and slow down the sprint cycle.
- **Environment variable management** — Supabase credentials (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) must be injectable at build time through a secure dashboard — never stored in the repository.
- **GitHub integration** — the platform must link directly to our GitHub repository so that branch protection rules, PR previews, and auto-deploys work as a unified workflow.
- **Cost** — the solution must have a free tier sufficient to host the project through all six sprints and the defense demo without requiring billing information from student team members.
- **Zero DevOps overhead** — the team has no dedicated infrastructure engineer. The Developer cannot spend sprint capacity on configuring servers, reverse proxies, SSL certificates, or container orchestration.

---

## Options Considered

### Option 1 — Vercel

**Description:** Vercel is the cloud platform created by the same team that built Next.js. It provides managed, serverless hosting optimized specifically for Next.js applications, with a first-class GitHub integration that automates the entire deployment lifecycle.

**Pros:**
- **First-party Next.js support** — Vercel invented Next.js. Every Next.js feature — App Router, Server Actions, Edge Middleware, Image Optimization, ISR — works on Vercel without any configuration. There is no adapter layer, no compatibility shim, and no undocumented behavioral differences between local development and production.
- **Automated deploy on push to `main`** — linking the GitHub repository to a Vercel project takes under five minutes. From that point forward, every merge to `main` triggers an automatic production deployment with zero Developer intervention. The live URL is always in sync with `main`.
- **PR Preview URLs** — every pull request automatically receives a unique, shareable preview deployment URL. The UX/UI Designer can review components, the QA/Docs Lead can run test cases, and the PM can verify features against acceptance criteria — all before a single line of code touches `main`. This directly enforces our branch protection workflow.
- **Secure environment variable management** — Supabase credentials are stored in Vercel's project settings dashboard and injected at build time. They are never written into the repository, satisfying the `NO keys in repo` requirement established in S1-DEV-02.
- **Generous free (Hobby) tier** — the Hobby plan provides unlimited personal projects, 100 GB bandwidth per month, and automatic HTTPS with a `.vercel.app` subdomain at no cost. This is sufficient to carry the project through all six sprints.
- **Instant rollbacks** — if a broken build reaches production, Vercel's deployment history allows a one-click rollback to any previous deployment, minimizing downtime during QA and the defense window.
- **Zero SSL/DNS configuration** — Vercel provisions and renews TLS certificates automatically. The live URL is HTTPS from the first deployment.

**Cons:**
- The application is hosted on Vercel's infrastructure; there is no self-hosted fallback if Vercel experiences an outage during the oral defense. This risk is accepted given Vercel's high availability record.
- The free Hobby tier limits serverless function execution to 10 seconds per invocation. Our API routes are lightweight CRUD operations against Supabase; this limit is not a practical constraint for this project.
- Vercel's free tier is designed for individual use; team collaboration features (shared dashboards, team members) require a paid Pro plan. For this project, the Developer manages the Vercel project and shares the preview URL with the team through GitHub PR comments, which is sufficient.

---

### Option 2 — Netlify

**Description:** Netlify is a popular static site and serverless hosting platform with GitHub integration and a free tier.

**Pros:**
- Well-established platform with broad community support.
- GitHub integration and branch deploy previews are available on the free tier.
- Supports environment variable injection through its dashboard.

**Cons:**
- **Next.js support is adapter-dependent** — Netlify requires the `@netlify/plugin-nextjs` build plugin to support Next.js features beyond static export. App Router support, Server Components, and Server Actions have historically lagged behind Vercel's implementation, occasionally requiring workarounds or producing subtle behavioral differences between local and deployed environments.
- **Serverless function cold starts** — Netlify's serverless functions can experience longer cold start times compared to Vercel's Edge Network, which would degrade the responsiveness of our Supabase API routes.
- **No first-party Next.js guarantee** — because Netlify is framework-agnostic, any new Next.js feature we adopt during the build sprints may not be supported immediately, creating a risk of deployment-blocking compatibility issues mid-sprint.

**Verdict:** Rejected. The dependency on a third-party Next.js adapter introduces unnecessary compatibility risk across a six-sprint build cycle. Vercel's first-party guarantee eliminates this entire category of risk at no additional cost.

---

### Option 3 — Railway

**Description:** Railway is a modern cloud platform that deploys containerized applications directly from a GitHub repository using auto-detected build configurations.

**Pros:**
- Supports any Node.js application, including Next.js.
- GitHub-linked auto-deploy is available.
- Good developer experience for full-stack apps that co-locate the database and server.

**Cons:**
- **No first-party Next.js optimization** — Railway runs Next.js as a generic Node.js server process. It does not apply Vercel's serverless function splitting, edge caching, or image optimization, meaning the deployed app will be slower and less efficient than on Vercel for the same Next.js code.
- **Cost model is usage-based** — Railway's free tier provides $5 of credit per month, after which the project is suspended or the team incurs charges. For a project that may run for 8+ weeks with variable activity, this introduces billing uncertainty.
- **Database redundancy** — our database is already on Supabase. Railway's strength is co-locating a Postgres database with the app server, which is unnecessary here and adds infrastructure complexity for no gain.
- **Less relevant GitHub PR integration** — Railway's PR preview environments are less mature than Vercel's, which would reduce the team's ability to review branches before merging.

**Verdict:** Rejected. The usage-based cost model is a risk for a student team, and the lack of Next.js-native optimization means accepting a performance and compatibility penalty with no offsetting benefit.

---

### Option 4 — Self-Hosted VPS (e.g., DigitalOcean Droplet, AWS EC2)

**Description:** Provision a Linux virtual machine and manually configure a Node.js process manager (PM2), reverse proxy (Nginx), SSL (Certbot), and a CI/CD pipeline (GitHub Actions) to deploy the Next.js application.

**Pros:**
- Maximum infrastructure control.
- No vendor dependency for the hosting layer.

**Cons:**
- **Prohibitive DevOps overhead** — configuring a production-grade Node.js server, reverse proxy, SSL, and CI/CD pipeline is a multi-day infrastructure project. This scope is entirely outside the Developer's sprint tasks and would consume capacity needed for building the actual application features.
- **Cost** — even the smallest DigitalOcean Droplet ($6/month) or AWS EC2 instance requires a credit card and incurs charges. This is avoidable.
- **Operational risk** — server maintenance, security patching, and uptime monitoring become the Developer's ongoing responsibility throughout all six sprints.

**Verdict:** Rejected. The operational burden is incompatible with the team's sprint timeline and scope.

---

## Decision

**Vercel is selected as the hosting and deployment platform for the Student Mental Health & Wellness Tracker.**

The decision rests on three compounding advantages that no other evaluated option can match simultaneously:

1. **Zero-configuration Next.js compatibility** — as the platform built by the Next.js team, Vercel guarantees that every feature we use (App Router, Server Components, API Routes, environment variable injection) works in production exactly as it does in local development, with no adapter plugins or compatibility workarounds.

2. **Fully automated deploy pipeline tied to GitHub** — the `main` branch auto-deploy and PR preview URL system directly enforces the team's branch protection and code review workflow. The QA/Docs Lead can test against a live preview URL on every PR, the PM can verify features before merge, and production is always a reflection of a reviewed, merged commit.

3. **Zero infrastructure overhead at zero cost** — the Hobby tier provides HTTPS, global CDN delivery, environment variable management, and instant rollbacks at no cost and with no server configuration required. The Developer's sprint capacity is entirely preserved for feature development.

---

## Implementation Notes

**Initial Setup (S2-DEV-04):**

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → **Import Git Repository**
2. Select the `mental-health-wellness-tracker` GitHub repository
3. Vercel will auto-detect the Next.js framework — accept all defaults
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` → paste value from Supabase project settings
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → paste value from Supabase project settings
5. Click **Deploy** — the initial production URL (e.g., `https://mental-health-wellness-tracker.vercel.app`) is live within minutes
6. Copy the live URL and paste it into `README.md`

**Ongoing Workflow (all sprints):**

```
Developer pushes feature branch
        ↓
GitHub PR opened
        ↓
Vercel auto-generates preview URL (unique per PR)
        ↓
Team reviews on preview URL → PR approved and merged to main
        ↓
Vercel auto-deploys to production
        ↓
Live URL updated — no manual deployment step required
```

**Environment Variable Rule:**  
Credentials must exist in two places only: the local `.env.local` file (never committed) and the Vercel project settings dashboard. They must never appear in any committed file, including `next.config.js`, `vercel.json`, or any source file.

---

## Consequences

### Positive
- The live production URL is always in sync with the `main` branch without any manual deployment steps from the Developer.
- Every PR generates a preview URL, enabling the full team (PM, UX/UI Designer, QA/Docs Lead) to verify features against their own acceptance criteria before code reaches production.
- Supabase credentials are managed entirely outside the repository, maintaining the zero-secrets-in-repo policy established in S1-DEV-02.
- The Developer has zero ongoing infrastructure responsibilities — no server maintenance, no SSL renewal, no uptime monitoring.
- Instant rollback capability protects the team against a broken build reaching production immediately before the oral defense.

### Negative / Trade-offs
- The project is dependent on Vercel's free-tier availability. An outage during the oral defense would be outside the team's control. This risk is accepted given Vercel's published uptime SLA and the availability of the Supabase-linked database as a separate service.
- The Hobby plan does not support multiple team members under a shared Vercel organization. The Developer owns the Vercel project; preview URLs are shared with the team via GitHub PR comments as a workaround.
- Serverless function execution is capped at 10 seconds on the free tier. All planned API routes are lightweight Supabase CRUD calls and are well within this limit; this constraint should be re-evaluated only if long-running server operations are introduced in later sprints.

---

*This ADR was authored by the Developer and is considered accepted upon merge of the `feature/dev-scaffold` branch into `main`.*