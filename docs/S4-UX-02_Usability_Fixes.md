# S4-UX-02 — Applied Usability Fixes
**Student Mental Health & Wellness Tracker**  
@jpcasapao · Week 5–6

---

All three issues identified in the S4-UX-01 usability walkthrough have been addressed before the end of Sprint 4. Each fix is documented below with the components changed and the design rationale.

---

## 2.1 Fix Summary

| # | Issue | Fix Applied | Components Changed | Status |
|---|---|---|---|---|
| 1 | Unsorted tags on all surfaces | Tags are now sorted alphabetically within each group before rendering. A shared `sortTags()` utility function was created and applied to every component that renders tag chips. In the Entries stressor picker, tags are sorted alphabetically within their existing category groups (Academic, Social, etc.) — the category grouping is preserved as it provides meaningful hierarchy. In Search and Stories the full flat tag list is sorted A–Z. | `sortTags.js` (new shared utility), `StressorTagPicker.jsx`, `CopingTagPicker.jsx`, `SearchFilterBar.jsx`, `StoriesFeedFilter.jsx` | ✅ Fixed |
| 2 | Hidden delete button on mobile (Goals) | The delete button is now permanently visible on mobile viewports (≤ 768px). A CSS media query overrides the hover-only opacity rule: at mobile breakpoints the button renders at full opacity and visibility without any interaction required. The button's visual style (colour, size, position) is unchanged so the desktop hover experience is preserved. The icon sits in the top-right corner of the goal card with a tap target of ≥ 44×44px. | `GoalCard.jsx`, `GoalCard.module.css` (added `sm:opacity-100 sm:visible` or equivalent media query) | ✅ Fixed |
| 3 | Single-tag constraint in Search & Stories | Tag filters in both Search and Stories now support multi-select. The active tag state was refactored from a single string value to an array. Selecting a second tag appends it to the active set; selecting an active tag removes it (toggle). Filter logic uses AND semantics: results must match all selected tags. Active tags display as filled/highlighted badges; inactive tags use the existing outlined style. | `SearchFilterBar.jsx`, `useSearchFilter.js`, `StoriesFeedFilter.jsx`, `useStoriesFilter.js` | ✅ Fixed |

---

## 2.2 Design Rationale

### Fix 1 — Alphabetical Sorting Within Groups

Maintaining the category grouping in the Entries stressor picker (Academic, Social, Institutional, Personal, Digital) was intentional: the categories come from the validated research taxonomy in `km-architecture.md` and provide meaningful cognitive scaffolding. Sorting tags alphabetically within each group gives the user both the semantic structure of the category and the predictability of alphabetical scanning. In Search and Stories where a flat list is used, pure A–Z order was applied as alphabetical order is the only available organising principle without grouping.

### Fix 2 — Always-Visible Delete on Mobile

Discoverability on touch devices cannot rely on hover state. The fix makes the delete affordance permanently visible at mobile breakpoints while keeping the desktop experience unchanged. This satisfies WCAG 2.1 SC 2.5.3 (Label in Name) and the general mobile usability principle that all interactive controls must be visually present without requiring a prior interaction to reveal them.

### Fix 3 — AND Semantics for Multi-Tag Filter

OR semantics (show results matching any selected tag) were considered but rejected for the Search screen. A student looking at their own journal history is typically narrowing down — trying to find entries where two stressors co-occurred. AND semantics serve this intent and align with the SECI Combination phase goal of synthesising across multiple knowledge dimensions simultaneously. OR semantics would be better suited for a discovery-oriented browse and is a candidate enhancement for v2.0. The same AND logic was applied to Stories for consistency.

