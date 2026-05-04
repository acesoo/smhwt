# prompt-log-acesoo.md
**Role:** Project Manager
**GitHub Username:** @acesoo
**Branch:** `feature/pm-setup`
**Project:** Student Mental Health & Wellness Tracker

> This log documents every instance of AI assistance used throughout the project. Each entry includes the task context, what was prompted, what the AI produced, what I changed or rejected, and what I decided as a result. Maintained as a required individual deliverable per Group Execution Guidelines.

---

## Pre-Sprint — S1: Kickoff & Discovery (Week 1–2)

---

### Entry 1
**Date:** Week 1
**Issue:** S1-PM-01
**Task:** Create GitHub repository with correct folder structure

**Prompt given to AI:**
> "What folders and files should a student web app GitHub repo have at the start? We're building a Next.js + Supabase project for a class capstone."

**What the AI produced:**
Claude suggested the following structure: `/src`, `/docs`, `/tests`, `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `.gitignore`, and a brief explanation of what each folder is for. It also suggested a `/public` folder and a `/.github/workflows` folder for CI.

**What I changed / rejected:**
I kept the core structure (`/src`, `/docs`, `/tests`, README, CONTRIBUTING, CHANGELOG) since those matched our guidelines exactly. I skipped `/.github/workflows` since we aren't doing CI pipelines for this project — that felt out of scope. I also skipped `.github/ISSUE_TEMPLATE` for now since I wanted to set those up manually once I understood GitHub Issues better.

**What I did manually:**
Actually created the repo on GitHub, set it to Public, committed the initial empty folder structure, and confirmed all team members could see it.

**Decision / learning:**
The AI was useful for confirming what a clean repo skeleton looks like, but the actual setup had to be done by hand. I learned that you can't commit empty folders to GitHub — you need a `.gitkeep` file inside each empty folder to make them show up. Claude didn't mention this initially, so I had to figure it out separately.

---

### Entry 2
**Date:** Week 1
**Issue:** S1-PM-02
**Task:** Protect main and dev branches

**Prompt given to AI:**
> "How do I protect the main branch on GitHub so no one can push directly to it without a pull request?"

**What the AI produced:**
Claude gave step-by-step instructions: Repository → Settings → Branches → Add branch ruleset → require pull request reviews before merging, require at least 1 approval. It also mentioned enabling "Do not allow bypassing the above settings" to prevent repo admins from bypassing the rule.

**What I changed / rejected:**
Followed the instructions closely. I applied the same protection rule to the `dev` branch as well, since our guidelines require it. Claude's instructions were for `main` only — I extended it myself to `dev` without being prompted.

**Decision / learning:**
Setting branch protection early is critical — some almost pushed directly to main before I had the rule up. The AI gave accurate instructions but I had to remember to apply it to both branches, not just main. The order matters: set protection first, then let teammates clone.

---

### Entry 3
**Date:** Week 1
**Issue:** S1-PM-03
**Task:** Write Decision Log entry #1 — project topic and tech stack choice

**Prompt given to AI:**
> "Help me write a decision log entry for choosing Next.js + Supabase + Vercel as our tech stack over other options. Format it as a simple markdown table row."

**What the AI produced:**
Claude drafted a full decision log table row with: Date, Decision Made (Use Next.js + Supabase + Vercel), Options Considered (listed React + Firebase + Netlify as the alternative), Who Was Consulted (All members), and Outcome with a brief rationale about structure and managed auth.

**What I changed / rejected:**
The rationale Claude wrote was generic — it said "better developer experience" which doesn't explain our actual reasoning. I rewrote the Outcome column to reflect what the team actually discussed: that Supabase gives us a real Postgres database which maps better to our knowledge architecture requirements, and that Vercel auto-deploys from GitHub which reduces deployment complexity for the team.

**Decision / learning:**
AI is good at giving you the format and structure of a decision log entry, but the reasoning has to come from you. If I had submitted Claude's version, I wouldn't have been able to explain it in the oral defense. I need to always rewrite the "why" in my own words based on what the team actually said.

---

### Entry 4
**Date:** Week 1
**Issue:** S1-PM-04
**Task:** Run Week 1 standup and file standup note

**Prompt given to AI:**
> "Draft a short standup note template in markdown for a student project team. Each member should report what they completed, what they're working on, and any blockers."

**What the AI produced:**
Claude produced a clean markdown template with a header (date, week, attendees), and a section per member with three bullet fields: Completed, Working On, Blockers.

**What I changed / rejected:**
The template was good and I kept the structure. I replaced the placeholder member names with our actual team (@acesoo, @enzo-q, @kimmoguer, @anthoncalban, @jpcasapao) and filled in their real statuses based on what everyone reported during the standup. I also added an "Actions" row under each member for follow-ups, which Claude didn't include.

**Decision / learning:**
The template gave me a consistent format I could reuse every week. The actual content — what each person said, what was blocked, what needs follow-up — is something only I can write because I was the one running the meeting.

---

## Pre-Sprint — S2: Design (Week 2–3)

---

### Entry 5
**Date:** Week 2
**Issue:** S2-PM-01
**Task:** File Decision Log entry #2 — KM framework selection

**Prompt given to AI:**
> "Help me write a decision log entry for choosing the SECI Model as our KM framework for a student mental health app. The alternative we considered was Communities of Practice."

**What the AI produced:**
Claude drafted a table row explaining the SECI model (Socialization, Externalization, Combination, Internalization) and briefly described why it fits a wellness tracking app — noting that journal entries support Externalization and the resource library supports Combination.

**What I changed / rejected:**
Claude's explanation of the SECI model was accurate, but the justification felt like it could apply to any app. I rewrote the Outcome column to be specific to our app: I described how each SECI component maps to a concrete feature (e.g., Socialization → peer mood check-ins if added in v2, Externalization → journal with tags, Combination → resource library, Internalization → wellness goal tracking). I also noted that anthoncalban's memo was the source and linked to the file in `/docs/`.

**What I changed:**
Also waited until anthoncalban's PR was merged to dev before filing this entry — the guidelines say not to write it from memory, and I followed that.

**Decision / learning:**
I realized I need to actually understand the KM framework well enough to write about it, not just copy what Claude generates. I went back and read anthoncalban's memo carefully before finalizing this entry. The AI helped with the table format but the substance had to come from the team's actual decision.

---

### Entry 6
**Date:** Week 2
**Issue:** S2-PM-02
**Task:** Run Week 2 standup and file standup note

**Prompt given to AI:**
> "Reuse the standup template from Week 1 and help me update it for Week 2. The team is now in the Design phase — wireframes, Supabase schema, and KM taxonomy are in progress."

**What the AI produced:**
Claude reformatted the Week 1 template with Week 2 headers and suggested example statuses for each role based on what a Design phase typically looks like (e.g., UX working on wireframes, Dev working on schema).

**What I changed / rejected:**
Replaced all of Claude's suggested statuses with the actual statuses from our standup. Specifically noted that anthoncalban's taxonomy doc was still in progress and was blocking jpcasapao from finalizing wireframes — I flagged this as a dependency risk and added an action item for anthoncalban to share the draft by end of the week even if not final.

**Decision / learning:**
Claude's suggested statuses were plausible but generic. The real value of the standup note is that it reflects reality — blockers, risks, and specific action items. The AI saved me time on formatting; the content was mine.

---

## Build Sprint 1 — S3: Core Feature Development (Week 3–5)

---

### Entry 7
**Date:** Week 3
**Issue:** S3-PM-01
**Task:** File Decision Log entry #3 — feature scope decision

**Prompt given to AI:**
> "Help me write a decision log entry. Our team decided to cut the peer mood comparison feature from scope and focus only on personal tracking for v1. We considered keeping it but decided it would take too long to implement securely."

**What the AI produced:**
Claude drafted the table row with a clear rationale: the feature required additional privacy considerations (users seeing each other's mood data), added database complexity, and wasn't essential to the core KM use case.

**What I changed / rejected:**
The rationale was actually well-reasoned and close to what we discussed. I kept most of it but added the specific consequence — that removing this feature meant the `users` table could stay simpler and enzo-q could focus on the core four features. I also added who was consulted (all members via standup) and the date.

**Decision / learning:**
For scope cut decisions, AI can help articulate the reasoning clearly if you give it the right context. The key is to provide the actual reason (security + complexity), not let Claude invent one.

---

### Entry 8
**Date:** Week 4
**Issue:** S3-PM-01 (continued)
**Task:** File Decision Log entry #4 — branch strategy clarification

**Prompt given to AI:**
> "We had a confusion on the team about whether to merge feature branches into dev or directly open PRs to main. Help me write a decision log entry for clarifying our branch strategy: all PRs go to dev, only the final deployment PR goes to main."

**What the AI produced:**
Claude wrote a clear entry explaining the rationale: keeping main clean and deployable at all times, using dev as the integration branch, and only merging to main when the app is fully tested and ready.

**What I changed / rejected:**
Kept the entry mostly as-is since Claude's explanation matched exactly what we decided. I added the context that this came up because one team member (not named) had accidentally opened a PR targeting main instead of dev, which was caught during review. Adding this context made the entry more useful as a historical record.

**Decision / learning:**
Sometimes AI gets it right the first time when you give it precise context. The edit I made (adding the real-world trigger for the decision) is the kind of thing AI can never know — only someone who was actually there knows why a decision was made.

---

### Entry 9
**Date:** Week 3–4
**Issue:** S3-PM-02
**Task:** Run Week 3 standup and file standup note

**Prompt given to AI:**
> "Update the standup template for Week 3. Build Sprint 1 has started. Dev is working on Auth and Mood Tracker. UX is building the nav bar component. KM Analyst is writing the report. QA is writing test cases."

**What the AI produced:**
Claude populated the template with these statuses per member and suggested adding a "Sprint Goal Status" section at the top showing overall progress toward the sprint goal.

**What I changed / rejected:**
I liked the Sprint Goal Status idea and kept it. I filled in the actual statuses each member reported, replaced Claude's phrasing with real specifics (e.g., "Auth sign-up flow is working, login has a bug with session persistence — enzo-q is investigating"), and added action items.

**Decision / learning:**
The Sprint Goal Status section was a genuine improvement to my standup format that I got from AI. I've kept it in all subsequent standups. Good example of AI suggesting something useful I hadn't thought of, which I then adopted as my own process improvement.

---

### Entry 10
**Date:** Week 4–5
**Issue:** S3-PM-02 (continued)
**Task:** Run Week 4 standup and file standup note

**Prompt given to AI:**
> "Help me write a standup note for Week 4. All four core features (Auth, Mood Tracker, Journal, Wellness Goals) are in progress. No major blockers. We're on track for Build Sprint 1 wrap-up."

**What the AI produced:**
Claude drafted the standup note with statuses for each member reflecting their Build Sprint 1 tasks and a positive Sprint Goal Status (on track).

**What I changed / rejected:**
Replaced placeholder statuses with real ones. Noted specifically that S3-DEV-04 (Wellness Goals) was the last unfinished task and that enzo-q expected to complete it by end of Week 4. Added a reminder to all members that CHANGELOG v0.1.0 was due from enzo-q before the sprint closed.

**Decision / learning:**
By Week 4 the standup notes were becoming easier to write because I had a consistent format. AI still helped me start faster, but the actual content was increasingly mine because I knew the team's status well from running the meetings.

---

*Last updated: Build Sprint 1 complete — currently entering Build Sprint 2 (S4)*
