# THIS README IS NOT FINAL.

# Student Mental Health & Wellness Tracker

> A knowledge management-driven web application that helps students log moods, reflect through journaling, track wellness goals, and discover curated mental health resources.

**Live App:** `[Paste Vercel URL here after Sprint 4 deployment]`  
**Sprint:** S1 — Kickoff & Discovery  
**Status:** 🟡 In Progress

---

## Table of Contents

1. [Overview](#1-overview)
2. [KM Framework](#2-km-framework)
3. [Team](#3-team)
4. [Features](#4-features)
5. [Tech Stack](#5-tech-stack)
6. [Setup Instructions](#6-setup-instructions)
7. [Repo Structure](#7-repo-structure)
8. [Branch Strategy](#8-branch-strategy)
9. [Contribution Evidence](#9-contribution-evidence)
10. [Screenshots](#10-screenshots)
11. [License](#11-license)

---

## 1. Overview

The **Student Mental Health & Wellness Tracker** is a web application designed to address a knowledge management problem: students often lack a structured, private space to externalize, organize, and reflect on their own mental health over time.

This app allows students to:
- Log their daily mood on a 1–10 scale with optional notes
- Write and tag reflective journal entries
- Set and track personal wellness goals
- Browse a curated library of mental health resources

This project is built as a **Knowledge Management Capstone (ProfElec2)**, applying KM theory to a real-world student wellness context.

> **⚠️ Note:** This app is a personal tracking tool, not a clinical service. It does not replace professional mental health support.

---

## 2. KM Framework

> _To be completed by Sprint 2 after the KM Analyst finalizes the Framework Selection Memo._

**Selected Framework:** `[e.g., SECI Model / Communities of Practice — to be confirmed]`

**Why This Framework:** `[1–2 sentences summarizing the KM Analyst's rationale from /docs/km-framework-memo.md]`

**Framework-to-Feature Mapping:**

| KM Component | App Feature | Description |
|---|---|---|
| `[e.g., Externalization]` | Mood Log / Journal | `[Brief mapping explanation]` |
| `[e.g., Combination]` | Resource Library | `[Brief mapping explanation]` |
| `[e.g., Internalization]` | Wellness Goals | `[Brief mapping explanation]` |

_Full mapping available in [`/docs/km-architecture.md`](./docs/km-architecture.md)_

---

## 3. Team

| Role | Member | Branch |
|---|---|---|
| Project Manager (PM) | `Ralph Anthony Biazon` | `feature/pm-setup` |
| Developer | `Lorenzo Nheo Queñano` | `feature/dev-scaffold` |
| UX/UI Designer | `John Pete Casapao` | `feature/ux-wireframes` |
| KM Analyst | `Anthon Van Calban` | `feature/km-research` |
| QA / Docs Lead | `Kim Moguer` | `feature/qa-docs` |

---

## 4. Features

> _Feature list will be updated each sprint as features are built and merged._

- [ ] **Authentication** — Sign up, log in, log out via Supabase Auth _(Sprint 3)_
- [ ] **Mood Tracker** — Daily mood logging (1–10 scale + optional note) _(Sprint 3)_
- [ ] **Journal / Reflection** — Tagged text entries saved to Supabase _(Sprint 3)_
- [ ] **Wellness Goals** — Create goals, track progress, mark as complete _(Sprint 3)_
- [ ] **Resource Library** — Curated mental health articles filterable by tag _(Sprint 4)_
- [ ] **Search & Retrieve** — Search journal entries and resources by keyword/tag _(Sprint 4)_

---

## 5. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | [Next.js](https://nextjs.org/) (App Router) | UI framework |
| **Backend / DB** | [Supabase](https://supabase.com/) | Postgres DB, Auth, Row Level Security |
| **Deployment** | [Vercel](https://vercel.com/) | Hosting, auto-deploy from GitHub |
| **Version Control** | GitHub | Source control, Issues, Projects board |
| **Language** | TypeScript / JavaScript | Application logic |
| **Styling** | `[TBD — e.g., Tailwind CSS]` | UI styling |

See [`/docs/adr/`](./docs/adr/) for Architecture Decision Records explaining each choice.

---

## 6. Setup Instructions

### Prerequisites

- Node.js v18+ ([download](https://nodejs.org/))
- A [Supabase](https://supabase.com/) account (free tier is sufficient)
- Git

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/[your-org]/mental-health-wellness-tracker.git
cd mental-health-wellness-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Then open .env.local and fill in your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=your_project_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

> **⚠️ Never commit `.env.local` to the repo.** It is listed in `.gitignore`. If you accidentally commit it, regenerate your Supabase keys immediately.

### Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the schema migrations in `/docs/schema.sql` _(available after Sprint 2)_
3. Enable Row Level Security on all tables as documented in `S2-DEV-02`

---

## 7. Repo Structure

```
mental-health-wellness-tracker/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   └── lib/              # Supabase client, utility functions
├── docs/
│   ├── adr/              # Architecture Decision Records (ADR-001 to ADR-004)
│   ├── wireframes/       # PNG/PDF wireframes with KM annotations
│   ├── test-cases/       # QA test cases (TC-001 to TC-010+)
│   ├── standups/         # Weekly standup notes
│   ├── km-architecture.md
│   ├── km-report.md
│   ├── design-rationale.md
│   ├── decision-log.md
│   └── failure-analysis.md
├── tests/                # Automated test files
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── PROMPTLOG.md
├── .env.example          # Template — copy to .env.local and fill in values
└── .gitignore
```

---

## 8. Branch Strategy

We follow a **feature branch → dev → main** workflow.

| Branch | Purpose |
|---|---|
| `main` | Production-ready code only. Protected: requires 1 PR review to merge. |
| `dev` | Integration branch. All feature branches merge here first. |
| `feature/[role]-[task]` | Individual work branches (e.g., `feature/qa-docs`, `feature/dev-scaffold`) |

### Rules

- **Never push directly to `main`, Always PR to `dev` branch** — all changes require a Pull Request and a review 
- All PRs must have at least **1 approval** before merging
- Branch naming format: `feature/[role]-[short-description]`
- Commit message format: `[ISSUE-ID] Short description — reason`  
  _Example: `S1-QA-01 Add README skeleton — establishes 11-section structure for sprint tracking`_

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full workflow.

---

## 9. Contribution Evidence

> _Updated each sprint. All members must have ≥3 commits on their own branch and ≥1 merged PR by Sprint 6._

| Member | Role | Commits | PRs Opened | Issues Filed |
|---|---|---|---|---|
| `[Name]` | PM | — | — | — |
| `[Name]` | Developer | — | — | — |
| `[Name]` | UX/UI | — | — | — |
| `[Name]` | KM Analyst | — | — | — |
| `[Name]` | QA / Docs | — | — | — |

_Detailed contribution log available in the [Contribution Log]

---

## 10. Screenshots

> _Screenshots will be added after Sprint 4 deployment. Minimum: Dashboard, Mood Log, Journal, Resource Library._

| Screen | Screenshot |
|---|---|
| Dashboard | _(Coming Sprint 4)_ |
| Mood Log | _(Coming Sprint 4)_ |
| Journal Entry | _(Coming Sprint 4)_ |
| Resource Library | _(Coming Sprint 4)_ |

---

## 11. License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

_This project was built for ProfElec2 — Knowledge Management Capstone._  

