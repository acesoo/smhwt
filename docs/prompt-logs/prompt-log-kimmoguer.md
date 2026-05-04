# prompt-log-kimmoguer.md
**Role:** QA / Docs Lead
**GitHub Username:** @kimmoguer
**Branch:** `feature/qa-docs`
**Project:** Student Mental Health & Wellness Tracker

> This log documents every instance of AI assistance used throughout the project. Each entry includes the task context, what was prompted, what the AI produced, what I changed or rejected, and what I decided as a result. Maintained as a required individual deliverable per Group Execution Guidelines.

---

## Pre-Sprint — S1: Kickoff & Discovery (Week 1–2)

---

### Entry 1
**Date:** Week 1
**Issue:** S1-QA-01
**Task:** Draft README.md skeleton covering all 11 required sections

**Prompt given to AI:**
> "What are the standard sections a README.md should have for a student capstone web app project? We're using Next.js, Supabase, and Vercel."

**What the AI produced:**
Claude suggested 11 sections: Project Overview, Live URL, Tech Stack, KM Framework, Features, Setup & Installation, Repository Structure, Branch Strategy, Team Members, Screenshots, and License. It also provided a brief description of what belongs in each section and gave me a starting markdown template with placeholder headers.

**What I changed / rejected:**
The sections Claude suggested matched the 11 required by our guidelines almost exactly, which confirmed I was on the right track. I kept all 11 headers and added placeholder text under each so the README looked like a real draft rather than empty headers. I also added a note under Screenshots saying "to be filled in Sprint 4 once app is deployed" so the team knew it wasn't ready yet.

**What I did manually:**
Committed the skeleton README to my branch and opened a draft PR so the team could see the structure early.

**Decision / learning:**
AI was useful for confirming the structure quickly. But I realized that having the headers isn't the same as having content — the README remained a skeleton until S4, and I had to resist the urge to fill it with placeholder text that sounded real but wasn't.

---

### Entry 2
**Date:** Week 1–2
**Issue:** S1-QA-02
**Task:** Write CONTRIBUTING.md covering clone instructions, branch naming, commit standards, and PR process

**Prompt given to AI:**
> "Write a CONTRIBUTING.md for a student GitHub project using Next.js and Supabase. It needs to cover: how to clone the repo, branch naming convention, commit message format, and pull request process."

**What the AI produced:**
Claude wrote a full CONTRIBUTING.md with four sections: Getting Started (clone, install, env setup), Branch Naming (feature/[role]-[task]), Commit Message Format (with example using our issue ID convention), and Pull Request Process (target dev branch, require 1 reviewer, link the issue ID).

**What I changed / rejected:**
The branch naming section used a generic format — I updated it to match our exact convention: `feature/pm-setup`, `feature/dev-scaffold`, `feature/ux-wireframes`, `feature/km-research`, `feature/qa-docs`. I also added a warning at the top: "Never push directly to main or dev. All changes go through a PR." Claude's version didn't include this and it felt important given our branch protection setup.

**Decision / learning:**
CONTRIBUTING.md is the document new contributors read first. Having AI draft it saved time, but I had to make sure every instruction matched what our team was actually doing — not just generic GitHub best practices. I tested the instructions myself by cloning the repo fresh on a second browser tab.

---

## S2 — Design (Week 2–3)

---

### Entry 3
**Date:** Week 2–3
**Issue:** S2-QA-01
**Task:** Write test cases TC-001 to TC-005 for core planned features

**Prompt given to AI:**
> "Help me write 5 QA test cases for a student web app with these features: user registration, user login, mood logging, journal entry creation, and logout. Format as a markdown table with columns: Test Case ID, Feature, Scenario, Steps, Expected Result, Status."

**What the AI produced:**
Claude produced all 5 test cases in a clean markdown table. Each had a scenario, numbered steps, and an expected result. The format was clean and professional-looking.

**What I changed / rejected:**
The test cases Claude wrote were technically correct but too shallow — the steps were too high-level (e.g., "fill in the form and submit"). I expanded each test case to include specific details: what field to fill in, what value to use, what exact button to click, and what element should appear or change as a result. For TC-002 (login), I also added a negative test scenario — what happens when you enter a wrong password — because catching failure states is just as important as happy paths.

**Decision / learning:**
AI is good at giving you the shape of test cases but not the depth. Real test cases need to be specific enough that anyone on the team can reproduce the test without guessing. I learned to always ask "would someone who has never used the app know exactly what to do from these steps?" If no, the steps need more detail.

---

## S3 — Build Sprint 1 (Week 3–5)

---

### Entry 4
**Date:** Week 3–5
**Issue:** S3-QA-01
**Task:** Write test cases TC-006 to TC-010 covering CRUD, search, navigation, edge cases, and one negative test

**Prompt given to AI:**
> "Write 5 more test cases for: (1) editing and deleting a journal entry, (2) creating and completing a wellness goal, (3) navigating between all pages using the sidebar, (4) searching for a keyword that returns no results, (5) attempting to access the dashboard without being logged in."

**What the AI produced:**
Claude produced all 5 test cases with steps and expected results. TC-010 (unauthenticated access) was particularly well-written — it specifically noted that the expected result should be a redirect to the login page, not an error page.

**What I changed / rejected:**
I kept TC-010 mostly as-is because the expected behavior was exactly right. For TC-007 (wellness goal), I revised the steps to match our actual UI — the app uses "Mark as Completed" not a generic "complete" button, so I updated the wording. I also added a Status column with "To Execute" in all rows since these were pre-execution drafts.

**Decision / learning:**
Writing test cases before the features are fully built means you're sometimes guessing at what the UI looks like. I learned to coordinate with @enzo-q on what the actual button labels and page names would be before finalizing the test case wording, otherwise I'd have to revise them all again during execution.

---

### Entry 5
**Date:** Week 5
**Issue:** S3-QA-02
**Task:** File first 2 bug reports as GitHub Issues

**Prompt given to AI:**
> "Help me write a GitHub Issue bug report for a bug where the search results pane stays blank on the first attempt and shows a brief parsing error message. Format it with: Title, Steps to Reproduce, Expected Result, Actual Result, Suspected Cause, Suggested Fix."

**What the AI produced:**
Claude wrote a well-structured bug report with all required fields. It identified the suspected cause as a JSON parse failure due to an async race condition — specifically that the component tries to parse the query response before it has fully resolved.

**What I changed / rejected:**
The suspected cause and suggested fix from Claude were technically accurate and I kept them. What I added was: (1) the exact keyword I used to reproduce the bug, (2) the specific note that the bug fails more consistently on the first search after page load vs. subsequent attempts, and (3) the label `bug` and assignment to @enzo-q. Claude's version was generic; mine was traceable back to an actual test case (TC-018).

**Decision / learning:**
A bug report is only useful if someone else can reproduce it from the description alone. The specifics — which keyword, which browser state, how many attempts — are things only the person who found the bug can provide. AI helped with structure, the reproduction details were entirely mine.

---

## S4 — Build Sprint 2 + QA (Week 5–6)

---

### Entry 6
**Date:** Week 6
**Issue:** S4-QA-01 / S4-QA-03
**Task:** Execute test cases + complete README

**Prompt given to AI:**
> "I need to write the README.md sections for KM Framework, Tech Stack, and Setup & Installation for a Next.js + Supabase app. The KM framework we're using is the SECI model. The tech stack is Next.js, Supabase (Auth + Postgres), Tailwind CSS, shadcn/ui, and Vercel."

**What the AI produced:**
Claude wrote the three sections in full. The SECI Model section included a feature-to-stage mapping table (Externalization → Journal with tags, Combination → Resource Library, etc.). The Tech Stack table was clean and complete. The Setup & Installation guide had step-by-step instructions including cloning, installing dependencies, setting up the .env.local file, and running the dev server.

**What I changed / rejected:**
The SECI mapping table matched what @anthoncalban wrote in the KM Architecture document, so I kept it and credited the source. For Setup & Installation, I added a troubleshooting table at the bottom (e.g., "supabase client not found → run npm install again") because Claude's version didn't include anything for when things go wrong. I also added the actual Vercel URL and replaced the generic placeholder.

**Decision / learning:**
By Sprint 4, I had a much clearer picture of what the app actually was — features, stack, URL, everything. This made it much easier to write accurate README content and reject anything AI wrote that didn't match reality. The troubleshooting section came from real problems teammates reported during setup in Sprint 1.

---

## S5 — Polish & Docs (Week 6–7)

---

### Entry 7
**Date:** Week 6–7
**Issue:** S5-QA-01
**Task:** Write Failure Analysis Report for BUG-001 (TC-018 search parsing error)

**Prompt given to AI:**
> "Help me write a Failure Analysis Report entry for a QA deliverable. The bug is TC-018: Search results don't load reliably — a 'parsing error' appears briefly on the first search attempt after page load. Format the entry with: How It Was Found, How It Was Reproduced, How It Was Fixed, and Lessons Learned."

**What the AI produced:**
Claude wrote a complete Failure Analysis entry with all four required sections. It included detailed reproduction steps, a technical explanation of the suspected async race condition, a description of the fix (error boundary + response validation), and four specific lessons learned about async operations, intermittent bugs, and API response handling.

**What I changed / rejected:**
Claude's entry was technically solid. I kept the structure and the lesson about intermittent bugs (specifically the point about how the bug fails more consistently cold — fresh page load with no cache — vs. on retries). I updated the "How It Was Fixed" section to reference the actual commit format our team uses (S4-DEV-02 fix description) and added a verification note that I re-ran TC-018 after the fix and it passed on five consecutive attempts. Claude had no way to know the verification outcome — that's real test data only I have.

**What I did manually:**
Actually re-ran TC-018 five times on the updated dev branch and recorded the results before writing the verification sentence.

**Decision / learning:**
Failure analysis only has value if the "fixed" section includes actual verification. Writing "the fix was applied" without confirming it works is incomplete. I learned to always re-run the failing test case after a fix is merged and document the result explicitly.

---

### Entry 8
**Date:** Week 7
**Issue:** S5-QA-02
**Task:** Write GitHub Wiki User Guide covering all major features

**Prompt given to AI:**
> "Write a GitHub Wiki User Guide for a student mental health and wellness tracker app. Include step-by-step instructions for: Registration (email + Google OAuth), Login, Dashboard overview, Mood Tracker, Journal & Reflection, Wellness Goals, Resource Library, Search & Retrieve, Peer Support Stories (anonymous submission), Profile & Settings, and Admin Panel. Note where screenshots should be inserted."

**What the AI produced:**
Claude wrote a full User Guide with all 11 feature sections, step-by-step numbered instructions for each, notes about login guard behavior, a note about the anonymous nature of Peer Stories, and clear screenshot placeholders throughout.

**What I changed / rejected:**
The core structure was solid and I kept it. I added specific caution notes in the Peer Stories section warning not to screenshot real user stories. I also adjusted the mood score descriptions (1–3, 4–6, 7–10 ranges) to match what the actual app UI displays. For the Admin Panel section, I emphasized that this is admin-only access so regular users know not to expect to see it.

**What I did manually:**
Took all required screenshots from the live Vercel production app and inserted them into the Wiki pages directly through the GitHub Wiki editor (drag-and-drop). Screenshots were taken in an incognito browser window to avoid showing personal account data.

**Decision / learning:**
Screenshots for documentation should always come from the final production app, not from development or local. Two features had slight UI differences between dev and production (the mood slider label text was different) — if I had taken screenshots from localhost I would have documented the wrong thing.

---

### Entry 9
**Date:** Week 7
**Issue:** S5-QA-04
**Task:** Write QA / Docs Lead individual reflection

**Prompt given to AI:**
> "Write a QA reflection for a 3rd year CS student who was the QA and Docs Lead for a capstone project. It should discuss: the most surprising bug they found, the hardest part of the role, and what they'd do differently. Write it as a genuine reflection, not a formal report. Humanize it."

**What the AI produced:**
Claude wrote a reflection centered on TC-018 as the most surprising bug (intermittent parsing error that only failed on cold page load), discussed the mistake of reporting bugs informally to the developer instead of filing GitHub Issues, and concluded with a lesson about building the Wiki documentation incrementally instead of all at once at the end.

**What I changed / rejected:**
The reflection was mostly kept as-is because it accurately described what actually happened in the project. I made small edits to wording to make it sound more like how I actually talk and less like a formal essay. The core experiences and lessons were real — Claude helped me structure and articulate them, but the events themselves actually happened.

**Decision / learning:**
This was the one case where Claude's output felt closest to my actual experience because I gave it very specific context about what really happened. The more honest and specific the prompt, the less editing the output needs.

---

*Last updated: Sprint 5 — Polish & Docs | @kimmoguer | feature/qa-docs*

---

### Entry 10
**Date:** Week 7
**Issue:** S5-QA-04
**Task:** Revise QA Reflection — add personal technical difficulty (PC hardware failure)

**Prompt given to AI:**
> "Update my QA reflection to include what actually happened during the project — my PC suddenly stopped booting during Sprint 5. I spent about five days diagnosing it, narrowed it down between a dead PSU or faulty motherboard, and eventually found out it was the CMOS battery. During that time my groupmates had to cover my tasks. Please keep the rest of the reflection the same and just add this section in."

**What the AI produced:**
Claude inserted a new paragraph between the informal bug filing section and the Wiki timing section. It described the hardware failure, the five-day diagnostic period, the uncertainty of not knowing if the machine was recoverable, the impact on the team, and the eventual fix (CMOS battery reset). It framed it as a lesson about QA being dependent on a stable environment.

**What I changed / rejected:**
I kept the paragraph almost entirely as written because it accurately described what happened. The framing — "how dependent QA work is on a stable environment" — was something I agreed with and kept. I did not change any of the factual details since they were all pulled from context I provided. The rest of the reflection (TC-018, GitHub Issues discipline, Wiki timing) remained unchanged from my previous version.

**What I did manually:**
Wrote the original description of the hardware issue myself and provided it as direct context to the AI. The events are real — the AI only helped structure and phrase them.

**Decision / learning:**
When the prompt contains specific real events with clear cause and effect, AI can write about them accurately without inventing details. The key is being specific in the prompt: I gave the exact symptom (PC not booting), the diagnosis process (PSU vs. motherboard consideration), the resolution (CMOS battery), and the impact (5 days, teammates covered tasks). Vague prompts produce vague reflections.

---

*Last updated: Sprint 5 — QA Reflection finalized | @kimmoguer | feature/qa-docs*
