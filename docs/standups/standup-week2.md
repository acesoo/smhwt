# Standup Note — Week 2

**Date:** Week of Apr 14–18, 2026
**Sprint:** S2 — Design (closing) · S3 — Build Sprint 1 (opening)
**Facilitator:** Ralph Anthony B. Biazon (@acesoo) — Project Manager
**Sprint Task:** S2-PM-02

---

## Attendance

| Member | Role | Present |
|---|---|---|
| acesoo | Project Manager | ✅ |
| enzo-q | Developer | ✅ |
| kimmoguer | QA / Docs Lead | ✅ |
| anthoncalban | KM Analyst | ✅ |
| jpcasapao | UX/UI Designer | ✅ |

---

## Member Status

### acesoo — Project Manager
**Completed this week:**
- Created dev branch and set up branch protection rules on both main and dev
- Redirected anthoncalban's Sprint 1 KM PR from main to dev (correct target)
- Created feature/pm-setup branch and committed PM setup files: decision-log.md, standup-week1.md, prompt-log-acesoo.md
- Filed Decision Log entry #1 covering project topic, Supabase, and Vercel decisions with options considered
- Confirmed all Sprint 2 tasks are complete and PR'd to dev

**Working on this week:**
- Filing Decision Log entry #3 (Sprint 3 feature scope) — S3-PM-01
- Creating Sprint 3 GitHub Issues and assigning to team members
- Opening Week 3 standup for Sprint 3 kickoff

**Blockers:** None

---

### enzo-q — Developer
**Completed this week:**
- Designed Supabase schema: users, mood_logs, journal_entries, resources, wellness_goals tables (S2-DEV-01)
- Set up Row Level Security (RLS) policies on all tables — auth.uid() = user_id (S2-DEV-02)
- Wrote ADR-003 in /docs/adr/ADR-003-auth.md: Supabase Auth vs custom vs skipped (S2-DEV-03)
- Initialized Vercel project, linked to GitHub repo, confirmed auto-deploy on push (S2-DEV-04)

**Working on this week:**
- Starting S3-DEV-01: Supabase Auth (sign up, login, logout, session persistence)
- Auth must be complete before any other Sprint 3 features can start

**Blockers:** None

---

### jpcasapao — UX/UI Designer
**Completed this week:**
- Produced wireframe: Core Feature Screen (Mood Log / Journal Entry) with KM annotation (S2-UX-01)
- Produced wireframe: Search / Retrieve screen with KM annotation (S2-UX-02)
- Produced wireframe: User Profile / Settings screen with KM annotation (S2-UX-03)
- Committed all wireframes to /docs/wireframes/ and PR'd to dev (S2-UX-04)
- Raised team discussion: wireframes were designed for mobile — team needs to decide on desktop layout approach

**Working on this week:**
- Awaiting team decision on desktop layout before beginning S3-UX-01 (navigation component)
- Will begin building once desktop layout approach is confirmed

**Blockers:** Desktop layout decision pending — see Team Decisions section below

---

### anthoncalban — KM Analyst
**Completed this week:**
- Designed knowledge taxonomy: categories, tags, metadata fields for all wellness entry types (S2-KM-01)
- Wrote /docs/km-architecture.md: taxonomy table and retrieval requirements for enzo-q (S2-KM-02)
- PR from feature/km-research to dev opened and merged
- Framework memo from Sprint 1 confirmed and shared with all team members

**Working on this week:**
- Starting S3-KM-01: KM Conceptual Report Section 1 — Problem Statement
- Beginning academic source collection for KM Report Section 2 citations

**Blockers:** None

---

### kimmoguer — QA / Docs Lead
**Completed this week:**
- Wrote test cases TC-001 to TC-005 covering Auth, Mood Tracker, Journal, Wellness Goals, Resource Library (S2-QA-01)
- Filed in /docs/test-cases/ and PR'd to dev
- Continued updating README — Features and Tech Stack sections partially drafted

**Working on this week:**
- Starting S3-QA-01: writing test cases TC-006 to TC-010
- Will test features as soon as enzo-q marks them done on the Projects board

**Blockers:** None

---

## Team Decisions This Week

**Desktop layout approach confirmed:** jpcasapao raised the question that Sprint 2 wireframes were designed for mobile only and the team needed to decide what the app looks like on PC/desktop. Decision: the app will be designed responsive-first — mobile layouts from Sprint 2 remain valid, and jpcasapao will extend each screen to a desktop breakpoint as part of Sprint 3 component work using Tailwind CSS responsive prefixes. This decision is documented in Decision Log entry #4 (S3-PM-02).

---

## Action Items for Next Week

| Action | Owner | Due |
|---|---|---|
| File Decision Log entry #3 — Sprint 3 feature scope | acesoo | Apr 19 |
| Begin and complete Supabase Auth (S3-DEV-01) — unblocks all other features | enzo-q | Apr 21 |
| Begin Navigation component once desktop decision is logged (S3-UX-01) | jpcasapao | Apr 21 |
| Begin KM Report Section 1 — Problem Statement (S3-KM-01) | anthoncalban | Apr 21 |
| Begin writing TC-006 to TC-010 (S3-QA-01) | kimmoguer | Apr 25 |
| File Decision Log entry #4 — desktop layout decision (S3-PM-02) | acesoo | Apr 19 |
