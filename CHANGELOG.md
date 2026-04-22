# Changelog

All notable changes to the Student Mental Health & Wellness Tracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-04-22

### Added

**Infrastructure**
- Next.js App Router scaffolding with TypeScript and Tailwind CSS.
- Supabase client via `@supabase/ssr` for cookie-based session management.
- ...

**Authentication**
- Full sign up, login, logout, and server-side session persistence via middleware.

**Core Features**
- Daily mood logging form with intensity score (1–10); persists to `mood_logs`.
- Journal entry form with tag support; persists to `journal_entries`.
- Wellness Goals tracker with Active, Completed, and Abandoned states.

**UI & Accessibility**
- `shadcn/ui` with Radix UI primitives and WCAG-compliant defaults.

**Documentation**
- ADR-001 through ADR-004 committed to `/docs/adr/`.
- `.env*` in `.gitignore`.