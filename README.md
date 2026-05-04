# Student Mental Health & Wellness Tracker

> A safe, anonymous space where students log their daily wellbeing, access coping resources, and find peer support stories.

**Live URL:** https://smhwt.vercel.app

---

## Table of Contents

1. [Overview](#1-overview)
2. [KM Framework](#2-km-framework)
3. [Team](#3-team)
4. [Features](#4-features)
5. [Tech Stack](#5-tech-stack)
6. [Setup & Installation](#6-setup--installation)
7. [Repository Structure](#7-repository-structure)
8. [Branch Strategy](#8-branch-strategy)
9. [Contribution Evidence](#9-contribution-evidence)
10. [Screenshots](#10-screenshots)
11. [License](#11-license)

---

## 1. Overview

The **Student Mental Health & Wellness Tracker (SMHWT)** is a Knowledge Management web application built as a capstone project for ProfElec2. It addresses the gap in structured, accessible mental health self-management tools for college students.

Students can:
- **Log daily moods and journal entries** — converting private emotional experiences into structured, tagged data
- **Track wellness goals** — setting and monitoring self-care commitments over time
- **Access a curated resource library** — filtered mental health articles and coping tools
- **Read and submit peer support stories** — anonymously sharing lived experiences to reduce stigma and normalize help-seeking

The app is grounded in the **SECI Model of Knowledge Management** (Nonaka & Takeuchi, 1995), ensuring that raw self-tracking data is transformed into actionable self-knowledge through a deliberate knowledge spiral.

---

## 2. KM Framework

This app applies the **SECI Model** (Nonaka & Takeuchi, 1995) as its primary Knowledge Management framework. Each quadrant of the SECI spiral maps to a specific app feature:

| SECI Stage | KM Mechanism | App Feature |
|---|---|---|
| **Socialization** | Tacit → Tacit (shared experience) | Peer Support Stories Feed — students share anonymous lived experiences, transferring tacit coping knowledge through narrative |
| **Externalization** | Tacit → Explicit | Mood Tracker + Journal with Tags — students convert internal emotional states into structured, tagged log entries |
| **Combination** | Explicit + Explicit | Dashboard & Analytics — aggregates mood logs, stressor tags, and coping patterns into trend visualizations |
| **Internalization** | Explicit → Tacit | Reflective Insights + Wellness Goals — students absorb dashboard trends as renewed self-understanding and commit to behavioral goals |

The Peer Support Stories feature additionally draws on **Communities of Practice** theory (Wenger, 1998) at the social layer — the forum is anonymous, opt-in, and tag-structured to reduce stigma barriers inherent to communal knowledge sharing about mental health.

> **References:** Nonaka, I., & Takeuchi, H. (1995). *The Knowledge-Creating Company*. Oxford University Press. | Wenger, E. (1998). *Communities of Practice*. Cambridge University Press.

---

## 3. Team

| Member | Role | GitHub | Branch |
|---|---|---|---|
| **acesoo** | Project Manager | @acesoo | `feature/pm-setup` |
| **enzo-q** | Full-Stack Developer | @enzo-q | `feature/dev-scaffold` |
| **kimmoguer** | QA / Docs Lead | @kimmoguer | `feature/qa-docs` |
| **anthoncalban** | KM Analyst | @anthoncalban | `feature/km-research` |
| **jpcasapao** | UX/UI Designer | @jpcasapao | `feature/ux-wireframes` |

---

## 4. Features

### Implemented

| Feature | Description | SECI Stage |
|---|---|---|
| **Authentication** | Secure sign-up / login via Supabase Auth | — |
| **Mood Tracker** | Daily mood logging with emoji scale and stressor tags | Externalization |
| **Journal** | Free-form journal entries with research-based tag taxonomy | Externalization |
| **Wellness Goals** | Create, track, and complete self-care goals | Internalization |
| **Resource Library** | Curated mental health articles and tools, filterable by tag | Combination |
| **Search & Retrieve** | Keyword and tag search across journal entries and resources | Combination |
| **Dashboard** | Aggregated mood trends, goal progress, and insight cards | Combination |
| **Profile Management** | Avatar dropdown in header + dedicated `/profile` settings page | — |
| **Peer Support Stories — Submission** | Anonymous story submission form (title, body, optional tag) saved to `peer_stories` table | Socialization |
| **Peer Support Stories — Feed** | Public read-only feed of approved stories, filterable by tag (anxiety, burnout, loneliness, etc.) | Socialization |
| **Admin Panel** | Protected `/admin` route for moderators to approve or hide peer stories via `is_approved` flag | — |

### Knowledge Taxonomy

Stories and journal entries are tagged using a research-validated taxonomy:

- **Stressor tags:** `#WorkOverload`, `#TestStress`, `#PeerStress`, `#Isolation`, `#Perfectionism`, and more
- **Coping tags:** `#ActiveCoping`, `#Venting`, `#Acceptance`, `#EmotionalSupport`, and more
- **Peer forum tags:** `#MyStory`, `#WhatHelpedMe`, `#YouAreNotAlone`, `#CheckingIn`, and more

---

## 5. Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | JavaScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth (`@supabase/ssr`) |
| **Deployment** | Vercel |
| **Version Control** | Git / GitHub |

---

## 6. Setup & Installation

Follow these steps to run the project locally. Estimated time: ~15–20 minutes.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or later
- [Git](https://git-scm.com/)
- A free [Supabase](https://supabase.com/) account (to get environment variables) or given by a member with access.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/acesoo/smhwt.git
cd smhwt
```

### Step 2 — Install Dependencies

```bash
npm install
```

### Step 3 — Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Then fill in your Supabase credentials. You can find these in your Supabase project dashboard under **Settings → API**:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Never commit `.env.local` to the repository.** It is already listed in `.gitignore`.

### Step 4 — Set Up the Database

In your Supabase project, run the SQL migrations (if provided in `/supabase/`):

```bash
# If using Supabase CLI
npx supabase db push
```

Alternatively, manually apply the schema from `/supabase/schema.sql` via the Supabase SQL editor.

Ensure the `peer_stories` table includes the `is_approved` BOOLEAN column (default `false`).

### Step 5 — Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app should load and prompt you to sign up or log in.

### Troubleshooting

| Issue | Fix |
|---|---|
| `npm run dev` fails with module errors | Run `npm install` again, then retry |
| Supabase auth errors on login | Double-check your `.env.local` values match the Supabase dashboard |
| Blank page after login | Check browser console for RLS policy errors; ensure your Supabase tables have correct Row Level Security rules enabled |
| Admin panel shows 403 | Your account does not have the admin flag set. Set `is_admin = true` on your user row in Supabase. |

---

## 7. Repository Structure

```
smhwt/
├── docs/                        # All project documentation
│   ├── adr/                     # Architecture Decision Records (min. 4)
│   ├── standups/                # Weekly standup notes
│   ├── test-cases/              # QA test cases (TC-001 to TC-024)
│   ├── wireframes/              # UX wireframes with KM annotations (PNG/PDF)
│   ├── decision-log.md          # Team decision log (min. 5 entries)
│   ├── framework-selection.md
│   ├── github-issue-km-gap.md
│   ├── km-architecture.md       # Knowledge taxonomy & retrieval requirements
│   ├── km-report.md             # KM Conceptual Report (4–6 pages)
│   ├── prompt-log-acesoo.md
│   ├── prompt-log-anthoncalban.md
│   ├── prompt-log-enzoq.md
│   ├── prompt-log-jpcasapao.md
│   └── prompt-log-kimmoguer.md
├── public/                      # Static assets
├── src/                         # Application source code
│   ├── app/                     # Next.js App Router pages
│   │   ├── (auth)/              # Login / sign-up routes
│   │   ├── dashboard/           # Main user dashboard
│   │   ├── journal/             # Journal feature
│   │   ├── mood/                # Mood tracker feature
│   │   ├── goals/               # Wellness goals feature
│   │   ├── resources/           # Resource library feature
│   │   ├── stories/             # Peer support stories feed & submission
│   │   ├── profile/             # User profile settings page
│   │   └── admin/               # Protected admin moderation panel
│   ├── components/              # Reusable React components (shadcn/ui-based)
│   └── lib/                     # Supabase client, utilities, helpers
├── supabase/                    # Supabase config and migrations
├── .gitignore
├── CHANGELOG.md                 # Version history
├── CONTRIBUTING.md              # Contribution guide for new developers
├── LICENSE                      # MIT License
├── .env.example                 # Environment variable template
├── README.md
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## 8. Branch Strategy

All development follows a **feature-branch workflow**. No one commits directly to `main`.

```
main          ← Production branch. Protected. Only receives PRs from dev at final deployment.
│
dev           ← Integration branch. Protected. All feature branches merge here via PR.
│
├── feature/pm-setup         ← Project Manager deliverables (decision log, standups)
├── feature/dev-scaffold     ← Developer — app code, ADRs, deployment
├── feature/qa-docs          ← QA/Docs Lead — test cases, README, CHANGELOG
├── feature/km-research      ← KM Analyst — km-report.md, km-architecture.md
└── feature/ux-wireframes    ← UX/UI Designer — wireframes, design rationale
```

**PR Rules:**
- All PRs target `dev`. The only PR to `main` is the final S6 deployment merge.
- Every PR must be reviewed by at least one other member before merging.
- Commit message format: `[ISSUE-ID] Short description — reason`
  - Example: `[S4-DEV-03] Add peer story submission form — saves to peer_stories table`

---

## 9. Contribution Evidence

Each member's contributions are verified through GitHub commit history, pull requests, and individual prompt logs.

| Member | Role | Branch | Prompt Log Entries | Key Deliverables |
|---|---|---|---|---|
| **acesoo** | Project Manager | `feature/pm-setup` | 5+ | Decision Log, Standup Notes, GitHub Projects Board |
| **enzo-q** | Developer | `feature/dev-scaffold` | 8+ | App codebase, ADRs, Vercel deployment, CHANGELOG |
| **kimmoguer** | QA / Docs Lead | `feature/qa-docs` | 5+ | Test cases TC-001–TC-024, README, Failure Analysis |
| **anthoncalban** | KM Analyst | `feature/km-research` | 5+ | KM Report, KM Architecture, SECI framework mapping |
| **jpcasapao** | UX/UI Designer | `feature/ux-wireframes` | 6+ | Wireframes (6+), Design Rationale, Usability Walkthrough |

> **Prompt logs** are committed to each member's feature branch as `prompt-log-[username].md`. These document AI-assisted decisions and individual reasoning throughout the project.

---

## 10. Screenshots

> Screenshots below are taken from the live deployment at https://smhwt.vercel.app

### Dashboard
Dashboard view showing mood summary, goal progress, and insight cards

<img width="1919" height="938" alt="image" src="https://github.com/user-attachments/assets/6653cd7e-5f54-4f14-93b7-ffe63c24e048" />


*The central dashboard aggregates the student's mood trends, active wellness goals, and personalized insights — implementing the SECI Combination stage.*

### Mood Tracker & Journal
Mood logging screen with emoji scale and stressor tag selector

Mood log:
<img width="1901" height="937" alt="image" src="https://github.com/user-attachments/assets/58861b36-bd72-4242-8c60-31ee4cb389aa" />

Journal log:
<img width="1900" height="932" alt="image" src="https://github.com/user-attachments/assets/29795367-6a67-433b-b524-beda058ca3ad" />


*Students log their daily mood and journal entries using a research-validated stressor tag taxonomy — implementing the SECI Externalization stage.*

### Peer Support Stories Feed
Stories feed showing anonymous story cards with tag badges and filter bar

<img width="1901" height="937" alt="image" src="https://github.com/user-attachments/assets/c713967f-5e97-45d7-ab06-f1d004e1c357" />


*The peer stories feed displays approved anonymous submissions, filterable by tag. No author identity is shown at any point — implementing the SECI Socialization stage.*

---

## 11. License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Ralph Anthony Biazon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See the full [LICENSE](./LICENSE) file for details.

---

<p align="center">ProfElec2 — KM Capstone</p>
