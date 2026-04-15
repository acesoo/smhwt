# Decision Log

**Project:** Student Mental Health & Wellness Tracker
**Maintained by:** acesoo - Project Manager

---

**SPRINT 1**

| # | Date | Decision Made | Options Considered | Who Was Consulted | Outcome |
|---|------|--------------|-------------------|-------------------|---------|
| 1 | 2026-04-08 | Project topic confirmed: Student Mental Health & Wellness Tracker | (1) Mental Health Tracker — addresses a real KM problem (students losing track of mood patterns, coping strategies, and resources); (2) Study Habit Tracker — more generic, less KM depth; (3) Campus Resource Directory — too static, limited KM value | All members | Chose Student Mental Health & Wellness Tracker — strongest KM problem fit, supports knowledge capture (journaling), retrieval (resource library), and reflection (mood trends) |
| 2 | 2026-04-08 | Backend: Supabase | (1) Supabase — built-in Auth, Postgres DB, Row Level Security, free tier, easy JS client; (2) Firebase — real-time sync but NoSQL limits relational queries needed for taxonomy; (3) Plain Postgres on Railway — more control but no built-in Auth, higher setup cost for team | Developer, PM | Chose Supabase — built-in Auth removes one build layer, RLS enforces per-user data access which fits the KM privacy requirements, free tier covers project scope |
| 3 | 2026-04-08 | Deployment: Vercel | (1) Vercel — native Next.js support, auto-deploy on push to main, free tier, preview URLs per PR; (2) Render — good for backend services but slower cold starts; (3) GitHub Pages — static only, cannot host Next.js with API routes | Developer, PM | Chose Vercel — tightest integration with Next.js App Router, preview deployments per PR help QA Lead test before merge 


**Maintained by:** acesoo - Project Manager

---

**SPRINT 2**

| # | Date | Decision Made | Options Considered | Who Consulted | Outcome |
|---|------|---------------|--------------------|---------------|---------|
| 4 | 2026-04-15 | Adopt `km-architecture.md` taxonomy as the canonical data schema for `journal_entries` and `resources` tables | (1) Flat tag system — simpler to implement but no semantic structure; (2) Hierarchical taxonomy — more complex but maps directly to SECI phases; (3) Single table vs. separate stressor/coping tables | @anthoncalban (KM Analyst), @enzo-q (Developer), @jpcasapao (UX Designer) | Accepted @anthoncalban's five-category stressor taxonomy (`#Academic`, `#Social`, `#Institutional`, `#Personal`, `#Digital`) and four-category coping taxonomy as the authoritative tag vocabulary. @enzo-q will implement these as enum arrays in Supabase. @jpcasapao will use them as filter labels in the Search/Retrieve wireframe. |