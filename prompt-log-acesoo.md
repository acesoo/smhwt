# Prompt Log — Project Manager

**Member:** Ralph Anthony B. Biazon (acesoo)
**Role:** Project Manager
**Branch:** feature/pm-setup

---

## Format

Each entry covers: date, task, prompt given to AI, what AI produced, what I changed or rejected and why, and what I decided as a result.

---

## Entry 001

**Date:** 2026-04-08
**Task:** S1-PM-01 — Set up GitHub repo folder structure and initial files

**Prompt given to AI:**
> "What folder structure should a Next.js + Supabase project on GitHub have for a capstone project that needs /src, /docs, /tests, a README, CONTRIBUTING, and CHANGELOG?"

**What AI produced:**
A suggested folder tree with `/src/app`, `/src/components`, `/src/lib`, `/docs/adr`, `/docs/wireframes`, `/docs/test-cases`, `/docs/standups`, root-level README.md, CONTRIBUTING.md, CHANGELOG.md, and a `.gitignore`.

**What I changed/rejected and why:**
Added `/docs/km-architecture.md`, `/docs/decision-log.md`, and `/docs/failure-analysis.md` as placeholder files — the AI's output was missing these even though they are explicitly required by the professor's guidelines. I also added `.gitkeep` files to empty folders so they would be tracked by Git.

**What I decided:**
Used the AI's structure as a base but cross-referenced it against the sprint plan's required deliverables before committing. Lesson: always verify AI output against the actual rubric.

---

## Entry 002

**Date:** 2026-04-8
**Task:** S1-PM-02 — Set up branch protection rules and `dev` branch

**Prompt given to AI:**
> "How do I create a dev branch in Git and set branch protection rules on GitHub that require at least 1 PR review before merging?"

**What AI produced:**
Step-by-step instructions: `git checkout -b dev`, `git push origin dev`, then GitHub Settings → Branches → Add ruleset → set enforcement Active, add target branch pattern, enable "Require a pull request before merging" with 1 approval, enable "Block force pushes".

**What I changed/rejected and why:**
The AI initially said to run `git checkout main` before `cd smhwt`, which caused a "not a git repository" error because I hadn't navigated into the folder yet. I had to troubleshoot by recognizing the working directory issue. The fix was to `cd smhwt` first.

**What I decided:**
Always confirm your working directory before running Git commands. Added a note in CONTRIBUTING.md to warn teammates about this. The branch protection setup otherwise worked as described.

---

## Entry 003

**Date:** 2026-04-8
**Task:** S1-PM-03 — File Decision Log entry #1

**Prompt given to AI:**
> "Help me write Decision Log entry #1 for our project confirming we chose Supabase as backend and Vercel as deployment. It needs to show options considered, not just the final decision."

**What AI produced:**
A table entry comparing Supabase vs Firebase vs plain Postgres, and Vercel vs Render vs GitHub Pages, with rationale for each choice.

**What I changed/rejected and why:**
The AI's Firebase comparison focused only on pricing — I expanded it to explain why NoSQL limits relational queries needed for our knowledge taxonomy. This is more relevant to the KM justification the instructor expects. I also added a note connecting the Supabase RLS feature to KM privacy requirements, since the professor will look for KM reasoning in every decision.

**What I decided:**
Every decision log entry needs a KM angle, not just a technical one. Going forward I will ask myself: "how does this decision support the KM framework?" before finalizing each entry.

---

## Entry 004

**Date:** 2026-04-19
**Task:** S2-PM-02 — Write Week 2 standup note covering Sprint 2 completion and Sprint 3 kickoff

**Prompt given to AI:**
> "Write a standup note for Week 2 of our capstone project. Sprint 2 is complete with no blockers. All 5 members finished their tasks. jpcasapao raised a question about desktop layout since wireframes were mobile only. We need to document everyone's status and actions for Sprint 3."

**What AI produced:**
A full standup note with attendance table, per-member status sections covering completed tasks, current work, and blockers, a team decisions section for the desktop layout discussion, and an action items table for Sprint 3 kickoff.

**What I changed/rejected and why:**
Added specific task IDs to each member's completed section (e.g. S2-DEV-01, S2-UX-04) so the instructor can cross-reference the standup against the sprint plan. The AI's initial version used generic descriptions without task IDs — the guidelines require the instructor to be able to verify participation, so task IDs make this traceable. Also moved the desktop layout discussion from a blocker to a Team Decision section because it resulted in a real decision that feeds into Decision Log entry #4.

**What I decided:**
Standup notes must always reference specific task IDs, not just describe work in general terms. This makes them useful for the instructor and for our own tracking. Going forward I will include task IDs in every standup note I write.

---

## Entry 005

**Date:** 2026-04-21
**Task:** S3-PM-01 and S3-PM-02 — Write Decision Log entries #3 and #4 for Sprint 3

**Prompt given to AI:**
> "Help me write Decision Log entries #3 and #4 for our KM capstone project. Entry #3 is about confirming we will build Auth, Mood Tracker, Journal, and Wellness Goals in Sprint 3. Entry #4 is about the desktop layout decision — jpcasapao's wireframes were mobile only and we decided to go responsive-first using Tailwind breakpoints."

**What AI produced:**
Two decision log entries with Options Considered, Who Was Consulted, and Outcome fields. Entry #3 compared 3 build order options. Entry #4 compared mobile-only, responsive-first, and desktop-first redesign options.

**What I changed/rejected and why:**
Added a KM Rationale section to both entries — the AI's initial version only gave technical reasoning but the professor's guidelines emphasize that every decision should connect back to the KM framework. For entry #3, I added how the build order maps to the SECI components (Externalization → Combination → Internalization). For entry #4, I added how responsive design supports the KM use case — students capture knowledge on mobile but review it on desktop. This KM angle is what separates a strong decision log from a generic one.

**What I decided:**
Every decision log entry needs a KM rationale — not just "why technically" but "why in terms of knowledge management." The instructor will look for this connection during the oral defense. I will apply this consistently to Decision Log entry #5 in Sprint 4.
