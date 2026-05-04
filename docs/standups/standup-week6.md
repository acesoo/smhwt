# Weekly Standup — Week 6

**Date:** May 1-May 4, 2026
**Sprint:** Build Sprint 2 (S4) → Transition to Polish & Docs (S5)
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
- Filed Decision Log entry #5 (final feature scope and deployment configuration decisions)
- Filed Decision Log entry on anonymous peer stories moderation approach (S4-PM-03) — consulted @anthoncalban, moderation via Admin Panel with `is_approved` flag confirmed
- Filed standup-week5.md in /docs/standups/

**Working on this week:**
- Filing standup-week6.md (this note)
- Final review of GitHub Projects board — moving all completed S4 cards to Done
- Beginning coordination for S5 (Polish & Docs) task assignments
- Confirming Vercel live URL is in README once @enzo-q deploys

**Blockers / Help needed:**
- None.

---

### @enzo-q — Developer
**Completed since last week:**
- Peer Stories Feed (S4-DEV-04) built — public read-only, approved stories only, filterable by tag, no author identity shown
- Dashboard and Profile (S4-DEV-05) implemented — /dashboard with DashboardSummaryCard, avatar dropdown header with theme toggle and logout, /profile settings page for account modifications
- App deployed to Vercel production URL (S4-DEV-06) — live URL confirmed end-to-end, pasted into README
- CHANGELOG.md v0.2.0 entry added (S4-DEV-07) — Build Sprint 2 features and contributors listed

**Working on this week:**
- Admin Panel (S4-DEV-08) — protected /admin route for story moderation, role-based access control via Supabase RLS, approve/hide toggle for `is_approved` flag
- Peer Stories polish (S5-DEV-04) — confirming no author identity ever exposed in API response

**Blockers / Help needed:**
- None. Supabase env vars confirmed in Vercel dashboard — not committed to repo.

**Bug flagged this week — TC-018:**
- @kimmoguer filed Issue for an intermittent JSON parsing error in Search & Retrieve. Results pane goes blank on first attempt; "parsing error" flashes and disappears; results load inconsistently on retry.
- Suspected cause: async race condition or malformed query response shape on the API call.
- Fix plan: add error boundary around search results component, validate query response shape before parsing, check for unhandled promise rejections.
- Assigned to @enzo-q. Status: In Progress.

---

### @kimmoguer — QA / Docs Lead
**Completed since last week:**
- Executed all test cases TC-012 to TC-021 against integrated dev branch — results filed in /docs/test-cases/
- TC-018 (Search & Retrieve) status: **FAIL** — intermittent parsing error causes results to not load reliably. GitHub Issue filed and assigned to @enzo-q with full repro steps.
- All other test cases (TC-012 to TC-017, TC-019 to TC-021): **PASS**
- New test cases TC-022 to TC-024 written for Peer Support Stories (S4-QA-04):
  - TC-022: Anonymous story submission — confirm no username or identifying info saved/shown
  - TC-023: Peer Stories Feed display — approved stories appear, unapproved do not
  - TC-024: Story tag filter — tag filter returns only matching stories

**Working on this week:**
- Completing README.md all 11 sections including live Vercel URL and screenshots (S4-QA-03)
- Executing TC-022 to TC-024 once Peer Stories Feed and Admin Panel are confirmed live (S5-QA-05)
- Filing any additional bug reports from TC-022–TC-024 results

**Blockers / Help needed:**
- Waiting on TC-018 fix from @enzo-q before re-executing that test case.
- Screenshots for README pending live Vercel URL confirmation.

---

### @anthoncalban — KM Analyst
**Completed since last week:**
- KM Report Sections 3 and 4 (Framework-to-App Mapping + Knowledge Architecture) written and appended to /docs/km-report.md (S4-KM-01)
- km-architecture.md updated with `peer_stories` table, story tag taxonomy (anxiety, burnout, loneliness, etc.), and retrieval requirement for tag and keyword search (S4-KM-02) — shared with @enzo-q

**Working on this week:**
- Beginning KM Report Sections 5 and 6 (Limitations + References) for S5
- Coordinating with @enzo-q and @jpcasapao to confirm framework-to-app mapping table is accurate before finalizing

**Blockers / Help needed:**
- None.

---

### @jpcasapao — UX/UI Designer
**Completed since last week:**
- Usability fixes applied and committed to branch (S4-UX-02):
  - Tags sorted alphabetically across all tag-display components
  - Mobile delete button on Wellness Goals entries made persistently visible (no longer hover-only)
  - Search & Retrieve updated to support multi-tag selection
- Peer Support Stories Feed wireframe committed to /docs/wireframes/ with KM annotation (SECI Socialization) (S4-UX-04)
- Story Submission form wireframe committed with anonymity notice design and KM annotation (externalization) (S4-UX-05)

**Working on this week:**
- Profile Card Icon component (S4-UX-06) — coordinating with @enzo-q on header dropdown integration, 32px and 48px sizes, default fallback state
- Admin Panel wireframe (S4-UX-07) — story list view with approve/hide controls, status indicators, visual distinction from user dashboard; coordinating with @enzo-q on S4-DEV-08
- Accessibility audit (S4-UX-03) — font sizes ≥ 14px, AA color contrast, clear nav labels

**Blockers / Help needed:**
- None. Profile Card Icon and Admin Panel wireframe in progress.

---

## Bug Summary — Week 6

| Issue | Test Case | Filed By | Assigned To | Status |
|-------|-----------|----------|-------------|--------|
| Search returns blank results on first attempt — intermittent JSON parsing error | TC-018 | @kimmoguer | @enzo-q | In Progress — fix targeted before Polish & Docs |

---

## Integration & Deployment Status
- App is live on Vercel — URL confirmed and in README
- All Supabase env vars in Vercel dashboard only — none committed to repo
- `peer_stories` table live in Supabase with `is_approved` BOOLEAN column (default false)
- Admin Panel (S4-DEV-08) in final build — targeted for completion this sprint
- dev branch protected with PR review requirement — all merges go through PRs

---

## Transition to S5 — Polish & Docs (Weeks 6–7)
All major features complete or in final build. Team transitions to polish and individual deliverables:
- @enzo-q: ADR entries, Developer Reflection, code cleanup, TC-018 fix
- @jpcasapao: Design Rationale Document, UX Reflection
- @anthoncalban: KM Report Sections 5 & 6, KM Reflection
- @kimmoguer: Failure Analysis Report, GitHub Wiki, CHANGELOG v0.3.0, QA Reflection
- @acesoo: PM Reflection, final Projects board sweep, peer eval coordination

*Reminder: All 5 prompt-log files must be updated and committed to each member's branch before defense.*

---

*Next standup: Week 7 (S5) — Polish & Docs progress check*
