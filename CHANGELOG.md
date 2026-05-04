# Changelog

All notable changes to the Student Mental Health & Wellness Tracker will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-05-04

### Added
**Core Features**
- **Resource Library**: Dedicated hub displaying curated mental health tools and articles with KM Taxonomy tag-based filtering and keyword search.
- **Peer Stories Feed**: Anonymous community feed for sharing mental health experiences with card layout, tag filtering, and expand/collapse per story.
- **Story Submission**: Secure anonymous submission form with KM Layer 3 forum tags; stories enter a pending state and only appear after admin approval.
- **Dashboard Hub**: Central `/dashboard` page with `DashboardSummaryCard` showing logging streak, 7-day mood trend, recent journal entries, and active goal count.
- **Profile Management**: Dedicated `/profile` settings page for updating display name, changing password, toggling theme, and managing session. Includes a Danger Zone for permanent self-deletion.
- **Admin Moderation Panel**: Protected `/admin` route accessible only to users with `is_admin = true`. Allows moderators to approve or hide pending peer stories; non-admin users are silently redirected.

**Search & Discovery**
- **Unified Search & Retrieve**: Centralized search screen querying journal entries and resources simultaneously by keyword and KM taxonomy tags. Includes a KM Pattern card showing average mood and sleep scores for days tagged with a selected stressor or coping tag.
- **Fuzzy Search**: Added typo-tolerant smart matching so minor misspellings still surface relevant results.

**UI & Loading States**
- **Skeleton Screens**: Added dedicated skeleton UI components for all routed pages, each matched closely to the real page layout to reduce perceived load time.
- **Next.js Loading States**: Added `loading.tsx` per route to leverage Next.js Suspense-based streaming, ensuring the app never shows a blank screen during data fetching.

**Infrastructure & Database**
- **KM Layer 3 Taxonomy**: Added `FORUM_TAGS` and `FORUM_TAG_GROUPS` to `tags.ts` per KM Report Section 9.2, replacing hardcoded arrays in `peer-stories-client.tsx` and `peer-story-form.tsx`.
- **Profiles Table**: Added `profiles` table with `is_admin` role flag and a PostgreSQL trigger that auto-creates a profile row on new user registration.
- **Peer Stories Table**: Added `peer_stories` table with RLS policies enforcing authenticated-only writes and public reads limited to approved stories.
- **Forum Tag Constraints**: Added `enforce-forum-tag-vocabulary` migration seeding Layer 3 tags into `valid_tags` and adding a CHECK constraint on `peer_stories.forum_tags`.
- **Self-Deletion RPC**: Added `delete_own_account` Postgres function allowing users to permanently delete their own account and all associated data via cascade.

### Changed
- **Navigation**: App root (`/`) now redirects to `/dashboard`. Back arrow removed from all primary nav pages; Admin Panel back arrow redirects to `/profile`.
- **Tag Display**: Tags in `mood-log-form`, `journal-entry-form`, `resource-library`, `search-retrieve`, `peer-stories-client`, and `peer-story-form` are now sorted alphabetically within each category group.
- **Tag Filtering**: All tag filters upgraded from single-select to multi-select with AND logic — results must match every selected tag to appear.
- **Search**: Refactored to use title as the primary match basis for cleaner results; tag filtering moved fully client-side for guaranteed AND correctness.
- **Session Management**: Wired `SignOutButton` in `ProfileDropdown` directly to the `signOut` server action for proper session termination.
- **Journal Validation**: Submit button now disabled until both a title and a sufficiently long body are provided, consistent with server-side validation.
- **Mood Logging**: Duplicate submission now returns a clear, friendly message — "You've already logged your mood today. Come back tomorrow!"
- **Dashboard Cards**: Recent journal entry cards now show a maximum of 7 tags to prevent UI overflow.
- **Minor Restyling**: Visual polish applied to `ProfileDropdown`, `MoodInputWidget`, and the Profile, Goals, and Dashboard pages.

### Fixed
- **Search Results**: Resolved a parsing error in search result processing identified during QA testing.
- **Peer Stories Sorting**: Fixed sort filter to correctly order stories by Newest/Oldest.

### Removed
- **Story Reactions**: Removed emoji reactions and "Most Liked" sort option from the peer stories feed to preserve the pressure-free, anonymous ethos of the KM Socialization layer.
- **Hardcoded Tag Arrays**: Removed duplicate `FORUM_TAG_GROUPS` constants from `peer-stories-client.tsx` and `peer-story-form.tsx` in favour of the centralised `tags.ts` export.

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