# Decision Log

**Project:** Student Mental Health & Wellness Tracker
**Maintained by:** acesoo - Project Manager

---

**SPRINT 1** Entry #1

| # | Date | Decision Made | Options Considered | Who Was Consulted | Outcome |
|---|------|--------------|-------------------|-------------------|---------|
| 1 | 2026-04-08 | Project topic confirmed: Student Mental Health & Wellness Tracker | (1) Mental Health Tracker — addresses a real KM problem (students losing track of mood patterns, coping strategies, and resources); (2) Study Habit Tracker — more generic, less KM depth; (3) Campus Resource Directory — too static, limited KM value | All members | Chose Student Mental Health & Wellness Tracker — strongest KM problem fit, supports knowledge capture (journaling), retrieval (resource library), and reflection (mood trends) |
| 2 | 2026-04-08 | Backend: Supabase | (1) Supabase — built-in Auth, Postgres DB, Row Level Security, free tier, easy JS client; (2) Firebase — real-time sync but NoSQL limits relational queries needed for taxonomy; (3) Plain Postgres on Railway — more control but no built-in Auth, higher setup cost for team | Developer, PM | Chose Supabase — built-in Auth removes one build layer, RLS enforces per-user data access which fits the KM privacy requirements, free tier covers project scope |
| 3 | 2026-04-08 | Deployment: Vercel | (1) Vercel — native Next.js support, auto-deploy on push to main, free tier, preview URLs per PR; (2) Render — good for backend services but slower cold starts; (3) GitHub Pages — static only, cannot host Next.js with API routes | Developer, PM | Chose Vercel — tightest integration with Next.js App Router, preview deployments per PR help QA Lead test before merge 

---

**SPRINT 2** Entry #2

| # | Date | Decision Made | Options Considered | Who Consulted | Outcome |
|---|------|---------------|--------------------|---------------|---------|
| 4 | 2026-04-15 | Adopt `km-architecture.md` taxonomy as the canonical data schema for `journal_entries` and `resources` tables | (1) Flat tag system — simpler to implement but no semantic structure; (2) Hierarchical taxonomy — more complex but maps directly to SECI phases; (3) Single table vs. separate stressor/coping tables | @anthoncalban (KM Analyst), @enzo-q (Developer), @jpcasapao (UX Designer) | Accepted @anthoncalban's five-category stressor taxonomy (`#Academic`, `#Social`, `#Institutional`, `#Personal`, `#Digital`) and four-category coping taxonomy as the authoritative tag vocabulary. @enzo-q will implement these as enum arrays in Supabase. @jpcasapao will use them as filter labels in the Search/Retrieve wireframe. |

---

**SPRINT 3** Entries #3 and #4

| # | Date | Decision Made | Options Considered | Who Was Consulted | Outcome |
|---|------|--------------|-------------------|-------------------|---------|
| 3 | 2026-04-19 | Feature build order for Sprint 3: Auth → Mood Tracker → Journal → Wellness Goals | (1) Build Auth + Mood Tracker + Journal + Wellness Goals (chosen) — covers the core knowledge capture loop and maps directly to SECI Externalization (journaling) and Internalization (goal tracking); (2) Build Auth + Resource Library first — provides retrieval value but delays personal knowledge capture which is the KM core; (3) Build all 5 features simultaneously — rejected due to integration complexity and risk of nothing working end-to-end by sprint close | All members — agreed in Week 2 standup | Chose Option 1. Auth built first as hard dependency for all features. Mood Tracker and Journal implement primary KM capture functions. Wellness Goals completes the personal knowledge loop. Resource Library deferred to Sprint 4. KM rationale: build order follows SECI — Mood Tracker (Externalization), Journal (Combination), Wellness Goals (Internalization), Resource Library (Socialization, Sprint 4). |
| 4 | 2026-04-19 | Desktop / responsive layout approach | (1) Mobile-only — ship with only Sprint 2 mobile wireframes, no desktop support. Rejected — PC browser would show a narrow mobile layout which looks unfinished and reduces usability for students on laptops; (2) Responsive-first with desktop breakpoints added in Sprint 3 (chosen) — jpcasapao extends each mobile wireframe to a desktop breakpoint using Tailwind CSS responsive prefixes (md: and lg:); (3) Desktop-first redesign — rejected as it would require redoing all Sprint 2 wireframes with no time available given May 5–10 defense | jpcasapao raised the question in Week 2 standup. All members consulted. | Chose Option 2. Mobile layouts from Sprint 2 remain valid. jpcasapao adds desktop breakpoints to each Sprint 3 component. No Sprint 2 wireframes need to be redrawn. KM rationale: a KM app used by students must work on both mobile (knowledge capture on the go) and desktop (reviewing trends and resources on laptop) — responsive design ensures the KM functions work across both contexts. |