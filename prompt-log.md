# Prompt Log — Project Manager

**Member:** Ralph Anthony B. Biazon
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

**Date:** 2026-04-13
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

**Date:** 2026-04-13
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
