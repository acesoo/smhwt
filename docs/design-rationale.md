# Design Rationale
**Student Mental Health & Wellness Tracker**
@jpcasapao · KM Capstone · ProfElec2 · Sprint 5

---

## 1. Color Palette and Typography

### Color Palette

The SMHWT uses a dark-theme-first palette built on a near-black base (`#0A0A0A`) with layered card surfaces (`#1A1A1A`, `#262626`, `#1E1E1E`). Three principles drove this decision.

**Emotional tone.** Students logging mood data or writing journal entries are in a contemplative, often distressed state. A dark, low-stimulation environment reduces visual noise and keeps the interface from competing with the task. This aligns with the application's function as a "Ba" — a knowledge space designed to invite honest self-documentation, not a productivity dashboard optimized for speed.

**Accessibility headroom.** Dark surfaces allow light text to achieve very high contrast ratios without heavy design effort. Body text (`#E0E0E0` on `#0A0A0A`) achieves 16.1:1 — nearly four times the WCAG AA minimum of 4.5:1. This headroom was essential: it meant secondary elements like metadata and section labels could use muted greys and still pass, preserving visual hierarchy without sacrificing compliance.

**Student familiarity.** Tools widely used by university students (Notion dark mode, Linear, Bear) share this aesthetic vocabulary. The dark theme required no acclimatization from the target audience.

The primary accent is **purple** (`#7C3AED`), applied to active tag states, selected filters, and primary affordances. Purple was chosen over blue or green because it carries no pre-existing semantic load in health or productivity software — it reads as "this app's color" rather than as a status signal (blue = informational, green = success, red = error). This keeps the accent purely navigational.

**Blue** (`#60A5FA`, `#3B5EE8`) is used for streak highlights, links, and the active bottom navigation item — contexts where an informational or "you are here" signal is appropriate. The distinction between purple (selection/interaction) and blue (status/location) is maintained consistently across all screens.

### Typography

The app uses a single sans-serif type system throughout. Body text is set at **16px / 400 weight** with a 1.6 line-height — standard for mobile reading comfort. Interactive labels (tags, navigation) are set at **14px**, the minimum established in the S4-UX-03 accessibility audit. Numeric dashboard values are set large (28–32px / 500 weight) to allow at-a-glance reading without needing to parse labels first.

Two deliberate exceptions exist, both documented in S4-UX-03:
- Section subheadings (`ACADEMIC`, `SOCIAL`, etc.) are set at **12px bold uppercase**. At this weight and case, the category headers remain legible while preserving the visual hierarchy needed to separate tag groups. A strict 14px reading would collapse the distinction between subheadings and tag labels.
- Dashboard stat labels (`STREAK`, `AVG MOOD`, `GOALS`) are set at **13px uppercase with letter-spacing**. The uppercase tracking improves legibility at this size. These are flagged for reconsideration in v2.0.

---

## 2. Navigation Structure and Information Architecture

### Bottom Navigation

The app uses a **five-item bottom navigation bar**: Dashboard, Entries, Stories, Goals, Search. This structure reflects the SECI knowledge spiral directly:

| Nav Item | SECI Stage | Primary Function |
|---|---|---|
| Entries | Externalization | Log mood, write journal, apply stressor/coping tags |
| Dashboard | Combination | View aggregated trends, cross-indicator patterns |
| Goals | Internalization | Set behavioral commitments from dashboard insights |
| Stories | Socialization | Browse and contribute anonymous peer support posts |
| Search | Combination (retrieval) | Query personal log history by tag, date, or keyword |

The ordering places **Entries** immediately after Dashboard so the user's mental model flows: "see my patterns → log today → see updated patterns." Goals is adjacent to Dashboard for the same reason — the insight-to-commitment loop should require minimal navigation.

Bottom navigation was chosen over a hamburger menu or sidebar for two reasons: all five destinations are equally primary (no feature is hidden or secondary), and mobile thumb reach is optimized — all five items are reachable without repositioning the hand.

### Information Architecture

Each screen has a single, clearly bounded purpose. No screen serves two SECI stages simultaneously. The Entries screen handles input only (Externalization); the Dashboard handles synthesis only (Combination). This separation means students are never asked to reflect and log at the same time, which would increase cognitive load at the Externalization stage — precisely the moment where friction is most likely to prevent honest self-documentation.

The Search screen is the one deliberate departure from this principle. It serves both retrieval (finding past entries) and re-reflection (reading old journal content). This dual function is intentional: retrieval without re-reading produces no Internalization value. The search results are displayed in full entry cards, not a compressed list, to encourage re-engagement with past content.

---

## 3. Usability Walkthrough Results

### Session Details

A think-aloud walkthrough was conducted in Week 5 (Build Sprint 2) with a non-team member student from a different university. The tester navigated the live Vercel deployment independently while verbalizing thoughts. The session covered Dashboard, Entries, Stories, Goals, and Search and lasted approximately 20–25 minutes.

### Issues Identified and Resolved

**Issue 1 — Unsorted tags (Severity: High)**
Tags appeared in an unordered sequence across every surface where they were shown. The tester spent significant time scanning a flat list of 26 tags to find a specific one. Within the Entries stressor picker, tags were grouped by category but unordered within each group.

*Fix applied:* A shared `sortTags()` utility was created and applied to all tag-rendering components. In Entries, tags are sorted alphabetically within each existing category group (Academic, Social, Institutional, Personal, Digital) — the category grouping is preserved as it provides meaningful semantic scaffolding from the KM taxonomy. In Search and Stories, the flat tag list is sorted A–Z.

**Issue 2 — Hidden delete on mobile (Severity: High)**
The delete button on goal cards was revealed only on hover. On a mobile-width viewport there is no hover state, making the control permanently invisible. The tester could not delete a goal on mobile without being prompted.

*Fix applied:* A CSS media query makes the delete button permanently visible at viewports ≤768px. Tap target size is ≥44×44px per WCAG 2.5.5. The desktop hover experience is unchanged.

**Issue 3 — Single-tag filter constraint (Severity: Medium)**
The Search filter allowed only one active tag at a time. Selecting a second tag deselected the first. The tester was attempting to find entries tagged with two co-occurring stressors and was frustrated by the reset behavior. The Stories feed filter exhibited the same constraint.

*Fix applied:* Both filters were refactored from a single string value to an array. The filter logic uses AND semantics — results must match all selected tags. This directly serves the SECI Combination phase goal of cross-referencing multiple knowledge dimensions. OR semantics (show results matching any selected tag) remain a candidate enhancement for Stories in v2.0, where the use case is discovery-oriented browsing rather than narrowing.

### Peer Support Stories Feed — Additional Findings

The Stories feed was included in the walkthrough session. The tester navigated to it without prompting and immediately read the anonymity banner ("All stories are shared anonymously. No personal information is ever shown."), commenting that it made them feel comfortable with the feature.

No confusion was observed around reading peer stories. However, the tester did not attempt to submit a story, so the anonymous submission flow was not tested in this session. The following design decisions were made proactively based on the forum's architecture:

- **Anonymity banner placement.** The banner sits at the top of the Stories screen, above the feed, so it is the first thing a student reads before seeing any content. It was not placed in an onboarding flow or settings page, where it would be seen once and forgotten. It must be present every time the screen is opened.
- **Tag-based filtering.** The Stories filter uses the same tag vocabulary as the private logs (stressor and coping tags), with an additional peer-content layer (Shared Experience, Peer Advice, Resource Sharing, Community Support). This means students can filter peer stories by the same stressor they just logged privately — creating a direct connection between the Externalization layer (private logs) and the Socialization layer (peer forum) without exposing any private data.
- **Moderation flag.** Stories are only visible in the feed when `is_approved = true`. This was a backend architectural decision with direct UX implications: students will not encounter harmful or misleading content in the feed. The latency introduced by moderation is accepted as a quality tradeoff.

A dedicated submission flow test is recommended for Sprint 5 to verify that the anonymous post form does not create confusion about what information is or is not visible to other students.

---

## 4. Accessibility Summary

All issues identified in the S4-UX-03 accessibility audit were resolved before the end of Sprint 4. A full record is maintained in `S4-UX-03_Accessibility_Audit.md`.

| Criterion | Issues Found | Status |
|---|---|---|
| Font sizes (≥14px) | 6 | All resolved |
| Color contrast (WCAG 2.1 AA) | 2 | All resolved |
| Navigation label clarity | 1 | Resolved |

Two items remain as documented exceptions pending v2.0 review: dashboard stat labels at 13px and section subheadings at 12px bold. Both are recorded with design rationale in the audit document.

---

## 5. References

- Huang, H. Y., & Bashir, M. (2017). Users' adoption of mental health apps. *JMIR mHealth and uHealth, 5*(6), e83.
- Nonaka, I. (1998). The concept of "Ba." *California Management Review, 40*(3), 40–54.
- Wenger, E. (1998). *Communities of Practice.* Cambridge University Press.
- WCAG 2.1 (2018). Web Content Accessibility Guidelines. W3C Recommendation.