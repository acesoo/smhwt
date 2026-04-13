# Standup Note — Week 1

**Date:** 2026-04-08 to 2026-04-13
**Facilitator:** Ralph Anthony B. Biazon (PM)
**Sprint:** S1 — Kickoff & Discovery

---

## Attendance

| Member | Role | Present |
|--------|------|---------|
| acesoo | Project Manager | ✅ |
| enzo-q | Developer | ✅ |
| kimmoguer | QA / Docs Lead | ✅ |
| anthoncalban | KM Analyst | ✅ |
| jpcasapao | UX/UI Designer | ✅ |

---

## Member Status

### PM — [Your name]
- **Completed:** Created GitHub repo, set up folder structure, added branch protection on `main`, created GitHub Projects board with milestones and task cards, filed Decision Log entry #1
- **This week:** Create `feature/pm-setup` branch, file standup notes, set up `dev` branch and protection rules
- **Blockers:** None

### Developer — enzo-q
- **Completed:** Initialized Next.js scaffold (App Router), configured Supabase client, created `.env.local` and confirmed `.gitignore` exclusion, wrote ADR-001 (database choice) and ADR-002 (hosting/deployment), merged PR #15 to `dev`
- **This week:** Begin S2 Supabase schema design, set up Vercel project link
- **Blockers:** None

### QA / Docs Lead — jpcasapao
- **Completed:** Created README.md with all 11 section headers, wrote CONTRIBUTING.md with clone instructions, branch naming, commit standards, and PR process, opened and merged PR to `dev`
- **This week:** Begin writing test cases TC-001 to TC-005
- **Blockers:** Needs KM framework memo from KM Analyst before writing feature-specific test cases

### KM Analyst — anthoncalban
- **Completed:** Researched student mental health as a KM problem, evaluated SECI Model and Communities of Practice frameworks, selected SECI Model, wrote 1-page Framework Selection Memo, committed to `/docs/`, opened PR #18 (redirected to target `dev`)
- **This week:** Open new PR from `feature/km-research` → `dev`, share framework memo with UX Designer and Developer
- **Blockers:** PR was originally targeting `main` — now redirected. New PR to `dev` needed.

### UX/UI Designer — [UX member name]
- **Completed:** Researched 3+ reference apps (Headspace, Daylio, Woebot), produced Dashboard wireframe with KM annotation, committed to `/docs/wireframes/`
- **This week:** Wait for KM Analyst memo before finalizing wireframe, begin Core Feature Screen wireframe (S2-UX-01)
- **Blockers:** Needs KM framework memo confirmed before finalizing wireframe layouts

---

## Team Decisions This Week

- Confirmed project topic, backend (Supabase), and deployment (Vercel) — see Decision Log entry #1
- Agreed: all PRs must target `dev`, not `main` — enforced going forward
- Created `dev` branch from `main` with branch protection rules

---

## Action Items for Next Week

| Action | Owner | Due |
|--------|-------|-----|
| Open new PR from `feature/km-research` → `dev` | anthoncalban | Apr 14 |
| Share framework memo with Developer and Designer | anthoncalban | Apr 14 |
| Begin Supabase schema design | enzo-q | Apr 18 |
| Begin Core Feature wireframe | UX member | After memo received |
| Write test cases TC-001 to TC-005 | jpcasapao | Apr 18 |
| File Decision Log entry #2 (after framework confirmed) | PM | Apr 18 |
