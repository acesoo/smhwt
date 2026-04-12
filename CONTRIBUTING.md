# Contributing to Student Mental Health & Wellness Tracker

Welcome to the team. This document explains everything you need to start contributing — how to clone and run the project, how to name your branches, how to write commit messages, and how to open a Pull Request.

**Read this before you make your first commit.**

---

## Table of Contents

1. [Getting Started — Clone & Run Locally](#1-getting-started--clone--run-locally)
2. [Branch Naming Convention](#2-branch-naming-convention)
3. [Commit Message Format](#3-commit-message-format)
4. [Pull Request Process](#4-pull-request-process)
5. [GitHub Issues & Task Tracking](#5-github-issues--task-tracking)
6. [Security Rules — No Secrets in the Repo](#6-security-rules--no-secrets-in-the-repo)
7. [Code Quality Guidelines](#7-code-quality-guidelines)
8. [Questions & Blockers](#8-questions--blockers)

---

## 1. Getting Started — Clone & Run Locally

Follow these steps **in order**. Do not skip any step.

### Step 1 — Clone the repository

```bash
git clone https://github.com/[your-org]/mental-health-wellness-tracker.git
cd mental-health-wellness-tracker
```

### Step 2 — Install dependencies

Make sure you have **Node.js v18 or higher** installed. Check with:

```bash
node --version
```

Then install project dependencies:

```bash
npm install
```

### Step 3 — Set up your environment variables

**Never use the real `.env.local` from another team member.** Create your own:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your own Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project under **Settings → API**.

### Step 4 — Verify `.env.local` is not tracked

Before you push anything, confirm your secrets file is ignored:

```bash
git status
```

You should **not** see `.env.local` listed. If you do, stop immediately — do not push. See [Section 6](#6-security-rules--no-secrets-in-the-repo).

### Step 5 — Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the app running.

If you get an error, check that:
- Your `.env.local` values are correct (no extra spaces, no quotes unless required)
- Your Supabase project is active at [supabase.com](https://supabase.com)

---

## 2. Branch Naming Convention

Every team member works on their **own feature branch**. Do not commit directly to `main` or `dev`.

### Format

```
feature/[role]-[short-description]
```

### Your branch (create it on Day 1)

| Role | Branch Name |
|---|---|
| Project Manager | `feature/pm-setup` |
| Developer | `feature/dev-scaffold` |
| UX/UI Designer | `feature/ux-wireframes` |
| KM Analyst | `feature/km-research` |
| QA / Docs Lead | `feature/qa-docs` |

### How to create your branch

```bash
git checkout -b feature/[your-branch-name]
```

For example, if you are the QA / Docs Lead:

```bash
git checkout -b feature/qa-docs
```

### Rules

- Use **lowercase** and **hyphens** only — no spaces, no underscores, no capital letters
- Branch names must include your **role** so ownership is clear
- For sub-tasks in later sprints, you may create additional branches: `feature/qa-test-cases-s3`

---

## 3. Commit Message Format

Every commit must follow this format:

```
[ISSUE-ID] Short description — reason
```

### Components

| Part | Description | Example |
|---|---|---|
| `[ISSUE-ID]` | The sprint task ID from the GitHub Project board | `S1-QA-01` |
| `Short description` | What you did, in present tense, under 60 characters | `Add README skeleton` |
| `— reason` | **Why** you made this change | `establishes 11-section structure for sprint tracking` |

### Examples of good commit messages

```bash
git commit -m "S1-QA-01 Add README skeleton — establishes 11-section structure for sprint tracking"
git commit -m "S1-QA-02 Write CONTRIBUTING.md — documents clone, branch, and PR workflow for all members"
git commit -m "S3-QA-01 Add test cases TC-006 to TC-010 — covers CRUD, nav, and 1 negative test"
git commit -m "S4-QA-02 File bug report for broken mood log submit — repro steps added, assigned to Dev"
```

### Examples of bad commit messages ❌

```bash
git commit -m "update"
git commit -m "fixed stuff"
git commit -m "working on docs"
git commit -m "final final version"
```

Bad commits make the project history unreadable and will be flagged during the oral defense.

---

## 4. Pull Request Process

All changes must go through a **Pull Request (PR)** before merging into `dev` or `main`. Here is the full process:

### Step 1 — Push your branch

When your work on a task is complete, push your branch:

```bash
git push origin feature/[your-branch-name]
```

### Step 2 — Open a Pull Request on GitHub

1. Go to the repository on GitHub
2. Click **"Compare & pull request"** (GitHub usually shows this banner automatically)
3. Set the **base branch** to `dev` (not `main`)
4. Fill in the PR title using your Issue ID: e.g., `S1-QA-01 Add README skeleton`
5. In the PR description, fill in the following template:

```
## What this PR does
[Brief description of changes]

## Issue
Closes #[GitHub Issue number]

## Checklist
- [ ] I have tested this locally and it works
- [ ] No .env files or API keys are included
- [ ] Commit messages follow the [ISSUE-ID] format
- [ ] I have assigned a reviewer (PM or relevant team member)
```

### Step 3 — Request a review

- Assign the **PM** as the primary reviewer for documentation PRs
- Assign the **Developer** as reviewer for code-related PRs
- Do not merge your own PR

### Step 4 — Address review feedback

If a reviewer leaves comments:
1. Make the requested changes on your local branch
2. Commit with a clear message referencing the feedback: e.g., `S1-QA-01 Fix README Overview section — addressed reviewer feedback`
3. Push again — the PR updates automatically

### Step 5 — Merge

Once you have **at least 1 approval**, the PM (or the reviewer) will merge the PR into `dev`.

**Direct pushes to `main` are blocked.** `main` is only updated at the end of each sprint via a `dev → main` PR with full team review.

---

## 5. GitHub Issues & Task Tracking

Every task from the Sprint Plan exists as a **GitHub Issue** on the Projects board.

### Issue ID Format

```
S[Sprint#]-[ROLE]-[##]
```

Examples: `S1-QA-01`, `S3-DEV-04`, `S5-PM-01`

### How to use Issues

- When you start a task, move its card to **In Progress** on the Projects board
- Reference the Issue ID in every commit message and PR title
- When a bug is found, file a new Issue with the label `bug` and include:
  - Steps to reproduce
  - Expected behavior
  - Actual behavior
  - Screenshot (if applicable)
- When a task or bug is resolved, close the Issue with a comment confirming the fix was verified

---

## 6. Security Rules — No Secrets in the Repo

This rule is non-negotiable. A single leaked API key can compromise the entire project.

### What you must never commit

- `.env.local` or any file containing `SUPABASE_URL`, `SUPABASE_ANON_KEY`, or any other credentials
- API keys, passwords, tokens, or private keys of any kind

### How to check before pushing

```bash
git status
git diff --staged
```

If you see `.env.local` or any credentials file listed, **do not push**. Remove the file from staging:

```bash
git reset HEAD .env.local
```

Then add `.env.local` to `.gitignore` if it is not already there:

```bash
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "S1-DEV-02 Add .env.local to .gitignore — prevent credential exposure"
```

### If credentials are accidentally committed

1. **Do not panic, but act immediately**
2. Go to Supabase → Settings → API → **Regenerate the anon key**
3. Update your local `.env.local` with the new key
4. Notify the PM and Developer immediately
5. File a GitHub Issue labeled `security` with what happened and what was done to fix it

---

## 7. Code Quality Guidelines

- Remove all `console.log()` statements before opening a PR (unless they are intentional debug flags labeled as such)
- Do not leave `// TODO` comments in code that is being submitted as complete
- All new components should be placed in `/src/components/`
- All Supabase utility functions should be placed in `/src/lib/`
- Test that `npm run dev` runs without errors before pushing

---

## 8. Questions & Blockers

If you are blocked:

1. Check the [README](./README.md) and this document first
2. Check the relevant GitHub Issue for any discussion or comments
3. Post in the team group chat with the specific Issue ID you're blocked on
4. If still unresolved after 24 hours, the PM should flag it at the next standup

**The PM is responsible for unblocking the team — but you are responsible for raising blockers early, not the night before a sprint deadline.**

---

_Last updated: Sprint 1 — Week 1_  
_Maintained by: QA / Docs Lead (Issue S1-QA-02)_
