# Prompt Log — UX/UI Designer

**Project:** Student Mental Health & Wellness Tracker (SMHWT)
**Branch:** feature/ux-wireframes
**Role:** UX/UI Designer

---

## Entry 1

**Date:** April 12, 2026
**Task:** S1-UX-01 — Research mental health apps

### Prompt Given
"Asked for UX research on 3 mental health apps (Headspace, Daylio, Woebot) — what design patterns work well for mood tracking, journaling, and knowledge retrieval, and how they relate to the SECI knowledge management framework."

### What the AI Produced
- Summary of 3 reference apps with key UX patterns identified per app.
- Daylio: one-tap mood capture reduces barrier to daily entry, habit-forming through streaks and trend charts.
- Woebot: conversational check-ins externalize emotional state naturally, tagging system enables knowledge retrieval.
- Headspace: dashboard trend visualization surfaces aggregated data as actionable insight.
- Mapping of each app's design pattern to a SECI framework component (Externalization, Combination, Internalization).

### What I Changed, Rejected, or Improved
- Accepted the framework mapping as-is — it aligned with anthoncalban's km-architecture.md.
- Added Headspace to the list as a third reference in place of a generic journaling app.
- Used the research findings directly as rationale in wireframe KM annotations.

### What I Learned or Decided
- Design patterns in existing apps can be mapped to KM frameworks to justify design decisions academically.

---

## Entry 2

**Date:** April 12, 2026
**Task:** S1-UX-02 — Dashboard / Home screen wireframe

### Prompt Given
"Asked for an annotated wireframe for the Dashboard / Home screen of the Student Mental Health & Wellness Tracker, with KM rationale annotations mapped to the SECI framework based on anthoncalban's km-architecture.md."

### What the AI Produced
- Full interactive wireframe of the Dashboard / Home screen showing: greeting + streak counter, one-tap mood scale (5 emoji states), 7-day mood trend chart, stat cards (avg mood, streak, entry count), and recent entries feed.
- KM rationale annotations for each component mapped to SECI phases.

### What I Changed, Rejected, or Improved
- Accepted layout and SECI annotations as-is — matched the km-architecture.md framework.
- Took screenshot and committed as `S1-UX-02-dashboard.png` to `/docs/wireframes/`.

### What I Learned or Decided
- Wireframes need KM annotations to justify design decisions beyond aesthetics.

---

## Entry 3

**Date:** April 18, 2026
**Task:** S2-UX-01 — Mood Log / Journal Entry wireframe

### Prompt Given
"Asked for an annotated wireframe for the Core Feature Screen (Mood Log and Journal Entry) with KM annotation explaining how each UI element supports the SECI framework, based on the taxonomy tags in km-architecture.md."

### What the AI Produced
- Full wireframe of the Mood Log / Journal Entry screen with dual-tab layout.
- KM annotations mapping mood scale, stressor tags, coping tags, and journal entry to SECI Externalization.

### What I Changed, Rejected, or Improved
- Confirmed all stressor and coping tags match the exact taxonomy from km-architecture.md before committing.
- Committed as `S2-UX-01-moodlog-journal.png` to `/docs/wireframes/`.

### What I Learned or Decided
- Taxonomy tags must be verified against the KM architecture document before committing wireframes.

---

## Entry 4

**Date:** April 18, 2026
**Task:** S2-UX-02 — Search / Retrieve screen wireframe

### Prompt Given
"Asked for an annotated wireframe for the Search and Retrieve screen with KM annotation explaining how the retrieval design reflects the knowledge taxonomy and the 3 retrieval requirements from km-architecture.md."

### What the AI Produced
- Full wireframe of the Search / Retrieve screen with keyword + tag search, entry type toggle, and results feed.
- KM annotations mapped directly to km-architecture.md retrieval requirements.

### What I Changed, Rejected, or Improved
- Verified all 3 retrieval requirements from km-architecture.md were covered before committing.
- Committed as `S2-UX-02-search-retrieve.png` to `/docs/wireframes/`.

### What I Learned or Decided
- Retrieval design must be grounded in the KM architecture's retrieval requirements, not just UI convention.

---

## Entry 5

**Date:** April 18, 2026
**Task:** S2-UX-03 — User Profile / Settings screen wireframe

### Prompt Given
"Asked for an annotated wireframe for the User Profile and Settings screen with KM annotation explaining how the profile screen implements SECI Internalization and the Ba (knowledge space) concept."

### What the AI Produced
- Full wireframe of the Profile / Settings screen with wellness summary stats, top stressor tags, notification settings, and account management.
- KM annotations mapping wellness summary to SECI Internalization.

### What I Changed, Rejected, or Improved
- Accepted layout and annotations as-is.
- Committed as `S2-UX-03-profile-settings.png` to `/docs/wireframes/`.

### What I Learned or Decided
- The profile screen is not just account management — it is the Internalization layer of the SECI spiral.

---

## Entry 6

**Date:** April 25, 2026
**Task:** S3-UX-01 — Navigation bar component

### Prompt Given
"Asked to build a production-ready BottomNav.tsx component for the Next.js App Router project, matching enzo-q's existing code style (TypeScript, Tailwind CSS, shadcn/ui), with accessible labels and active route detection using usePathname()."

### What the AI Produced
- `BottomNav.tsx` component with 5 nav items, active state detection, aria labels, and auto-hide on auth pages.

### What I Changed, Rejected, or Improved
- Rebuilt as `.tsx` to match enzo-q's TypeScript codebase.
- Verified routes against enzo-q's `src/app/` folder structure.

### What I Learned or Decided
- Navigation components must match the developer's existing code style to integrate cleanly.

---

## Entry 7

**Date:** April 25, 2026
**Task:** S3-UX-02 — Mood input widget component

### Prompt Given
"Asked to build a MoodInputWidget.tsx component — a standalone calendar and emoji mood selector that complements enzo-q's existing MoodLogForm, matching his dark theme and using the taxonomy from @/lib/taxonomy."

### What the AI Produced
- `MoodInputWidget.tsx` with monthly calendar, emoji quick-select, and fine-tune slider.
- Full accessibility: aria-label, aria-pressed, aria-valuemin/max/now.

### What I Changed, Rejected, or Improved
- Reviewed enzo-q's mood-log-form.tsx before building to avoid duplicating his form logic.
- Confirmed the widget is a standalone picker, not a replacement for his form.

### What I Learned or Decided
- UX components must complement, not replace, the developer's existing backend-connected components.

---

## Entry 8

**Date:** April 25, 2026
**Task:** S3-UX-03 — Dashboard summary card component

### Prompt Given
"Asked to build a DashboardSummaryCard.tsx component showing streak, 7-day mood trend sparkline, and recent journal entries feed, matching enzo-q's existing GoalCard dark theme."

### What the AI Produced
- `DashboardSummaryCard.tsx` with greeting header, stat cards, SVG sparkline trend chart, and recent entries feed.

### What I Changed, Rejected, or Improved
- Reviewed enzo-q's goal-card.tsx before building to match his exact styling patterns.
- Used `bg-[#1a1a1a]` (his exact card background) instead of generic neutral-900.

### What I Learned or Decided
- Matching existing component styling exactly prevents visual inconsistencies in the final product.

---

## Entry 9

**Date:** May 3, 2026
**Task:** S4-UX-04 — Peer Support Stories Feed wireframe & design

### Prompt Given
"Asked Claude to generate a proper wireframe skeleton of the Stories Feed based on the actual deployed app, then improve the existing peer-stories-client.tsx with better UI including anonymity notice, reactions, sort dropdown, and skeleton loading."

### What the AI Produced
- Skeleton wireframe matching the actual deployed app layout
- Anonymity notice banner (violet shield)
- Anonymous label with shield icon on each story card
- Read more / Show less toggle with isClamped check
- Reaction buttons (🤍 💪 🫂)
- Sort dropdown (Newest / Most liked)
- Skeleton loading state using shadcn Skeleton component
- Suspense boundary in page.tsx

### What I Changed, Rejected, or Improved
- Rejected the first wireframe — it was a styled mockup, not a proper skeleton
- Moved the anonymity notice inside the Browse Stories tab only after noticing it appeared twice on the Share a Story tab — filed a bug fix PR
- Fixed the Read more button showing on short stories using isClamped check with useRef and useEffect

### What I Learned or Decided
- Wireframes document existing screens, not just future ones. UI improvements should not touch core functionality — visual and logic changes are separate concerns.

---

## Entry 10

**Date:** May 3, 2026
**Task:** S4-UX-05 — Story Submission Form design

### Prompt Given
"Asked Claude to improve peer-story-form.tsx with section dividers, better labels, tag group background card, and a submit animation."

### What the AI Produced
- Section dividers between Title, Story, and Tags sections
- Larger, more visible section labels
- Tag groups wrapped in subtle dark background card
- Green checkmark submit animation with "Story submitted!" message and review notice
- Installed shadcn Separator and Textarea components

### What I Changed, Rejected, or Improved
- Kept enzo-q's core form logic completely untouched
- Only changed visual styling — no new functionality added
- Decided not to add character counter or writing prompts after friend advised to keep changes minor and non-functional

### What I Learned or Decided
- Submit animations significantly improve perceived responsiveness. UI improvements should never touch core form logic.

---

## Entry 11

**Date:** May 3, 2026
**Task:** S4-UX-06 — Profile Card Icon & ProfileDropdown

### Prompt Given
"Asked Claude to create a ProfileDropdown component with initials avatar that works at 32px and 40px sizes, with a dropdown showing username, View Profile, and Sign out. Apply to all page headers."

### What the AI Produced
- ProfileDropdown component with avatar circle showing user initials
- Dropdown with username display, View Profile link, Sign out button
- Closes on outside click using useRef and useEffect
- Avatar uses shadcn Avatar component on profile page
- Applied to all 7 page headers

### What I Changed, Rejected, or Improved
- Did not wire the Sign out button — that is enzo-q's core feature (SignOutButton component)
- Kept admin panel without ProfileDropdown — admins already access it through profile page
- Added user fetch to pages that didn't have it (log, search, stories, resources)

### What I Learned or Decided
- Shared components save time when applied across multiple pages. Knowing which features belong to which role prevents stepping on teammates' work.

---

## Entry 12

**Date:** May 3–4, 2026
**Task:** S4-UX-07 — Admin Panel wireframe & design improvements

### Prompt Given
"Asked Claude to improve admin panel stat card styling and apply consistent width layout to all pages based on enzo-q's centering shell pattern."

### What the AI Produced
- Bigger stat numbers (text-2xl) and more visible labels (text-xs, text-neutral-400)
- Updated all 7 pages with mx-auto w-full max-w-md md:max-w-7xl centering shell
- Added border-x border-neutral-800/60 side borders
- Sticky dark header with bg-neutral-950/90 backdrop-blur-md on all pages
- BottomNav centered and dark themed
- Dark theme applied to login, signup, and confirm pages

### What I Changed, Rejected, or Improved
- Kept amber color for pending stories — amber communicates urgency which is appropriate for moderation
- Rejected dark blue bottom nav color — too heavy and distracting, went with neutral dark instead
- Kept ProfileDropdown in all headers while following enzo-q's centering shell pattern

### What I Learned or Decided
- Color choices should communicate meaning, not just look good. Amber for pending/warning is a widely understood UI convention. Consistent layout patterns across all pages make the app feel like one cohesive product.
