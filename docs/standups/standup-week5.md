# Weekly Standup — Week 5

**Date:** Apr 28–May 1, 2026
**Sprint:** Build Sprint 2 (S4) — Integration · QA · Deployment · Peer Support Stories
**Facilitator:** Ralph Anthony B. Biazon (@acesoo) — Project Manager
**Sprint Task:** S4-PM-03

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

### @acesoo — Project Manager
**Completed since last week:**
- Opened Decision Log entry #5 covering final feature scope decisions for Build Sprint 2
- Confirmed team task assignments on GitHub Projects board for S4 tasks
- Coordinated with @anthoncalban on the moderation approach for anonymous peer stories ahead of filing Decision Log entry (S4-PM-03)

**Working on this week:**
- Filing Decision Log entry on anonymous peer stories moderation approach (S4-PM-03) — consulting @anthoncalban before finalizing
- Running and filing standup notes for Weeks 5 and 6
- Monitoring for merge conflicts as all S4 branches converge into dev

**Blockers / Help needed:**
- None. Watching for integration conflicts — @enzo-q to flag immediately if blocked during merge.

---

### @enzo-q — Developer
**Completed since last week:**
- Resource Library (S4-DEV-01) built — curated mental health articles/tools filterable by tag, connected to `resources` table in Supabase
- Search & Retrieve (S4-DEV-02) implemented — journal entries and resources searchable by keyword and tag
- Anonymous Peer Support Stories submission form (S4-DEV-03) built — saves to `peer_stories` table with `is_approved` moderation flag (default false)

**Working on this week:**
- Peer Stories Feed (S4-DEV-04) — public read-only feed of approved stories, filterable by tag, no author identity shown
- Dashboard and Profile page (S4-DEV-05) — DashboardSummaryCard + avatar dropdown header + /profile settings page
- Beginning preparation for Vercel deployment (S4-DEV-06)

**Blockers / Help needed:**
- None at start of week. Coordinating with @jpcasapao on profile card icon design (S4-UX-06) to ensure header dropdown integration is aligned.

---

### @kimmoguer — QA / Docs Lead
**Completed since last week:**
- Test cases TC-012 to TC-021 drafted and filed in /docs/test-cases/
- README.md structure started — sections scaffolded, pending live URL and screenshots

**Working on this week:**
- Executing test cases against the integrated dev branch as features land (S4-QA-01)
- Filing bug reports as GitHub Issues for any failures found
- Continuing to build out README.md (S4-QA-03) — all 11 sections

**Blockers / Help needed:**
- Waiting on Vercel live URL from @enzo-q to complete README deployment section.

---

### @anthoncalban — KM Analyst
**Completed since last week:**
- KM Report Sections 1 and 2 (Problem Statement + KM Framework) drafted in /docs/km-report.md
- Framework selection memo filed in /docs/ — SECI Model confirmed as the project's KM framework

**Working on this week:**
- Writing KM Report Sections 3 and 4: Framework-to-App Mapping + Knowledge Architecture (S4-KM-01)
- Updating km-architecture.md to add `peer_stories` table to taxonomy and define story tags/categories (S4-KM-02) — to be shared with @enzo-q immediately upon completion

**Blockers / Help needed:**
- None. Will coordinate with @enzo-q and @jpcasapao to confirm framework-to-app mapping accuracy before finalizing Section 3.

---

### @jpcasapao — UX/UI Designer
**Completed since last week:**
- Wireframes for Home/Dashboard, Core Feature, and Search/Retrieve screens committed to /docs/wireframes/ with KM annotations
- Usability walkthrough with a non-team member conducted (S4-UX-01)

**Working on this week:**
- Applying usability fixes from walkthrough feedback (S4-UX-02) — see fixes below
- Peer Support Stories Feed wireframe (S4-UX-04) — coordinating with @enzo-q on S4-DEV-04
- Story Submission form wireframe (S4-UX-05) — anonymity notice design
- Profile Card Icon component (S4-UX-06) — coordinating with @enzo-q on header dropdown

**Blockers / Help needed:**
- None. Usability fixes are in progress.

---

## Usability Walkthrough Summary (S4-UX-01)
**Tester:** Non-team member (external)
**Conducted by:** @jpcasapao

**Feedback received:**
1. Tags are unsorted across all areas that display them — makes it hard to scan and locate specific tags.
2. On mobile, the delete button (×) on goal entries in the Wellness Goals screen is not visible unless you already know it is there. On desktop it appears on hover, but mobile has no equivalent affordance.
3. In the Search & Retrieve tab, only one tag can be active at a time — tester suggested multi-tag filtering would be more useful.

**Fixes to be applied (S4-UX-02):**
- Sort tags alphabetically across all tag-display components
- Add a persistent visible delete button or swipe-to-delete affordance for mobile goal entries
- Investigate and implement multi-tag selection for Search & Retrieve filters

---

## Integration Notes (PM)
- All S4 branches are converging this week — watch for merge conflicts on shared components (search, tag filters, dashboard)
- @enzo-q should be unblocked immediately if any merge conflict arises
- Peer Support Stories moderation decision (S4-PM-03) to be finalized after consulting @anthoncalban

---

*Next standup: Week 6 — all members confirm S4 tasks complete or in final review*
