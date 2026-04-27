# Student Mental Health & Wellness Tracker

The Student Mental Health & Wellness Tracker (SMHWT) is a capstone project built for ProfElec2 — Knowledge Management. It provides students with a private, structured space to log their mood, reflect through journaling, and track personal wellness goals. The app is built on a knowledge management framework using the SECI model to support meaningful self-reflection and insight retrieval.

[smhwt.vercel.app](https://smhwt.vercel.app)

---

## Team

| Role | Member |
|---|---|
| Project Manager | acesoo |
| Developer | enzo-q |
| UX/UI Designer | jpcasapao |
| KM Analyst | anthoncalban |
| QA / Docs Lead | kimmoguer |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js |
| Language | JavaScript |
| Styling | Tailwind CSS, shadcn/ui|
| Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (`@supabase/supabase-js`) |
| Deployment | Vercel |
| Version Control | Git / GitHub |

---

## Getting Started

### Prerequisites
- Node.js v18+
- A Supabase project with the schema below set up

### Installation

```bash
# Clone the repository
git clone https://github.com/[your-org]/smhwt.git
cd smhwt

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your Supabase URL and anon key in .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Features

The following features are currently built and working on the `dev` branch:

### Authentication
- Sign up, log in, and log out via Supabase Auth
- Session persistence across page reloads
- All routes are protected — unauthenticated users are redirected to the login page

### Mood Tracker
- Log your daily mood on a 1–10 scale with an optional note
- Entries are saved with timestamp and linked to your account
- Displays your last 7 mood entries

### Journal / Reflection
- Write journal entries using a text input with tag support
- Tags are categorized using the project's knowledge taxonomy (`km-architecture.md`)
- Entries are saved and retrievable by the logged-in user

### Wellness Goals
- Create personal wellness goals with a title, description, and target date
- Track goal progress with status: `active`, `completed`, or `abandoned`

> **Coming in Sprint 4:** Dashboard, Resource Library, Search

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a full list of changes per version.

