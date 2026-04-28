# Standup Note — Week 3

**Date:** Apr 19–23, 2026
**Sprint:** S3 — Build Sprint 1 (in progress)
**Facilitator:** Ralph Anthony B. Biazon (@acesoo) — Project Manager
**Sprint Task:** S3-PM-03

---

## Attendance

| Member | Role | Present |
|---|---|---|
| acesoo | Project Manager | ✅ |
| enzo-q | Developer | ✅ |
| kimmoguer | QA / Docs Lead | ⚠️ Limited — PC not booting, unable to complete tasks |
| anthoncalban | KM Analyst | ✅ |
| jpcasapao | UX/UI Designer | ✅ |

---

## Member Status

### acesoo — Project Manager
**Completed this week:**
- Filed Decision Log entry #3 — Sprint 3 feature build order confirmed (S3-PM-01)
- Filed Decision Log entry #4 — responsive desktop layout approach decided (S3-PM-02)
- Filed Week 2 standup note in /docs/standups/standup-week2.md
- Created and assigned all Sprint 3 - Build Sprint 1 GitHub Issues on Projects board
- Covered for kimmoguer (QA / Docs Lead) due to technical difficulties — did Test Cases 6-11 and updated README sections on kimmoguer's behalf

**Working on this week:**
- Monitoring Sprint 3 build progress and keeping Projects board updated
- Filing Week 3 standup note (this document)
- Following up with kimmoguer on hardware situation

**Blockers:** None

---

### enzo-q — Developer
**Completed this week:**
- Built Supabase Auth: sign up, login, logout, session persistence, and route protection (S3-DEV-01)
- Built Mood Tracker: daily mood logging form saving to mood_logs table, last 7 entries displayed (S3-DEV-02)
- Built Journal / Reflection: text entry with taxonomy tags saving to journal_entries table (S3-DEV-03)
- Built Wellness Goals tracker: create, track, and update goal status (S3-DEV-04)
- Wrote ADR-004 in /docs/adr/ documenting a Sprint 3 technical decision (S3-DEV-05)

**Working on this week:**
- Finalizing CHANGELOG.md v0.1.0 entry for Sprint 3 features (S3-DEV-06)
- Supporting jpcasapao on component integration

**Blockers:** None

---

### jpcasapao — UX/UI Designer
**Completed this week:**
- Built Navigation component with accessible labels and active state (S3-UX-01)
- Built Mood input widget matching Sprint 2 wireframe (S3-UX-02)
- Built Dashboard summary card showing streak, mood trend, and recent journal entry (S3-UX-03)
- Identified that all Sprint 2 wireframes need to be redone — wireframes were designed for mobile only and do not reflect the desktop/PC layout required for the app

**Working on this week:**
- Beginning wireframe redo for all screens including desktop/PC layout versions
- This is flagged as a carry-over task into Sprint 4 — see Blockers section

**Blockers:** Sprint 2 wireframes were mobile-only and do not include desktop/PC layouts. All wireframes need to be redrawn to include desktop breakpoints. jpcasapao will redo these as part of Sprint 3 close / Sprint 4 open.

---

### anthoncalban — KM Analyst
**Completed this week:**
- Wrote KM Conceptual Report Section 1 — Problem Statement, saved to /docs/km-report.md (S3-KM-01)
- Began KM Conceptual Report Section 2 — KM Framework with academic citations (S3-KM-01 cont.)
- Reviewed enzo-q's Journal feature against km-architecture.md taxonomy (S3-KM-03)

**Working on this week:**
- Completing Section 2 of the KM Report with minimum 2 academic sources
- Confirming journal entry tags match taxonomy exactly with enzo-q

**Blockers:** None

---

### kimmoguer — QA / Docs Lead
**Completed this week:**
- Unable to complete assigned tasks due to PC hardware failure (computer not booting)
- acesoo covered S3-QA-01 (test cases), S3-QA-02 (bug reports - none found) and S3-QA-03 (README update) this week

**Working on this week:**
- Resolving PC hardware issue
- Will catch up on S3-QA-01 (TC-006 to TC-011) as soon as hardware is restored

**Blockers:** PC not booting — unable to access repo or run the app locally. acesoo covering critical tasks in the interim.

---

## Team Decisions This Week

**Wireframe redo confirmed:** jpcasapao flagged that all Sprint 2 wireframes were designed for mobile only and do not reflect the desktop/PC layout. The team agreed all wireframes need to be redrawn to include desktop layouts. This work will be completed by jpcasapao during Sprint 3 close and Sprint 4. The existing mobile wireframes in /docs/wireframes/ remain committed but will be updated with desktop versions.

**PM covering QA tasks:** Due to kimmoguer's hardware failure, acesoo stepped in to cover S3-QA-01 (TC-006 to TC-011), S3-QA-02 (filing bug reports as GitHub Issues - none found) and S3-QA-03 (updating README Features and Tech Stack sections) to keep the sprint on track. kimmoguer will resume ownership of QA tasks once hardware is resolved.

---

## Action Items for Next Week

| Action | Owner | Due |
|---|---|---|
| Complete CHANGELOG.md v0.1.0 entry (S3-DEV-06) | enzo-q | Apr 28 |
| Begin wireframe redo — all screens with desktop/PC layout (carry-over) | jpcasapao | Apr 28 |
| Complete KM Report Section 2 with 2 academic citations (S3-KM-02) | anthoncalban | Apr 28 |
| Complete TC-006 to TC-010 once hardware is restored (S3-QA-01) | kimmoguer | Apr 28 |
| File Week 4 standup note (S3-PM-03) | acesoo | Apr 28 |
