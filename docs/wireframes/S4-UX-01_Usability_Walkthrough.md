# S4-UX-01 — Usability Walkthrough Notes
**Student Mental Health & Wellness Tracker**  
@jpcasapao · Week 5–6

---

## 1.1 Session Details

| Field | Details |
|---|---|
| Date | Week 5 — Build Sprint 2 |
| Tester | Non-team member. Student from a different university with no prior knowledge of the app or its KM framework. |
| Session Format | Think-aloud walkthrough. Tester navigated the live Vercel deployment independently while verbalising thoughts. Designer observed without prompting or guiding. |
| Duration | Approximately 20-25 minutes |
| Screens Covered | Dashboard, Entries (Mood + Journal with stressor/coping tags), Stories (Peer Feed with tag filter), Goals, Search |

---

## 1.2 Confusion Points Identified

*Three distinct usability issues were observed and verbally reported by the tester. All three were encountered on the live deployed build.*

---

### Issue 1 — Unsorted Tags Across All Tag Surfaces

Tags appear in an unordered sequence across every screen where they are shown: the Entries form stressor/coping tag pickers, the Search filter bar, and the Stories feed filter. The tester attempted to find `#TestStress` in the Search screen's FILTER BY TAG row and had to scan the entire flat list (26 tags spanning three rows) before locating it.

In the Entries screen, stressor tags are grouped by category (Academic, Social, Institutional, Personal, Digital) but the order within each group is not alphabetical. The tester noticed the inconsistency: *"In this section they're in groups but they're still not in any order inside the group."*

> Tester quote (paraphrased): *"Why aren't these in alphabetical order? I have no idea where to look."*

- **Severity: High** — affects every tag interaction in the app
- **Screens affected:** Entries (stressor + coping tag pickers), Search (FILTER BY TAG row), Stories (FILTER BY TAG section)

---

### Issue 2 — Hidden Delete Button on Mobile (Goals Screen)

On the Goals screen, each goal card has a delete control ("X") positioned in the upper-right corner. On desktop this button appears on hover. On a mobile-width viewport there is no hover state, so the button is never revealed. The tester, viewing on a mobile-width browser window, could not locate the option to delete a goal without being prompted.

> Tester quote (paraphrased): *"I can't figure out how to delete a goal on my phone."*

- **Severity: High** — a core CRUD action is inaccessible on mobile
- **Screens affected:** Goals screen, mobile viewport only

---

### Issue 3 — Single-Tag Constraint in Search

The Search screen's FILTER BY TAG row (showing all 26 stressor and coping tags) allows only one tag to be active at a time. When the tester selected a second tag, the first was automatically deselected. The tester was attempting to find entries that overlapped two stressors and was frustrated by the reset behaviour.

The Stories feed filter was also observed to work the same way, though the tester's primary complaint was about the Search screen.

> Tester quote (paraphrased): *"I want to search for two tags at once. Why does it reset when I pick another?"*

- **Severity: Medium** — reduces knowledge retrieval power; conflicts with the SECI Combination phase goal of cross-referencing multiple knowledge dimensions
- **Screens affected:** Search (FILTER BY TAG row), Stories (FILTER BY TAG section)

---

## 1.3 Overall Impression

The tester found the app visually polished and understood its mental health purpose immediately. The dark theme, card-based layout, and bottom navigation were praised as clean and intuitive. The mood logging flow in the Entries screen was completed without any confusion. The anonymity notice on the Stories screen ("All stories are shared anonymously. No personal information is ever shown.") was noticed and appreciated. The three issues above were the only friction points encountered.

