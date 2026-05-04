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

## Build Sprint 2 — S4: Integration, QA & Peer Support Stories (Week 5–6)

---

### Entry 11
**Date:** Week 5
**Issue:** S4-PM-01
**Task:** File Decision Log entry #5 — Peer Support Stories moderation approach

**Prompt given to AI:**
> "Help me write a decision log entry for how we decided to handle moderation for anonymous peer support stories. We chose an admin approval model (is_approved flag in Supabase) over open publishing or AI auto-moderation."

**What the AI produced:**
Claude drafted a table row explaining the three options: open publishing (no moderation), AI content filtering (auto-approve/reject), and manual admin approval via an `is_approved` boolean flag. It wrote a rationale favoring the admin approval model for its simplicity and the control it gives the team.

**What I changed / rejected:**
Claude's rationale was technically sound but didn't capture the actual reason we leaned toward manual approval — this is a mental health app, and publishing unmoderated stories in that context carries real risk to student users. I rewrote the Outcome column to make that explicit: the sensitivity of the subject matter made human review non-negotiable, and the admin panel approach (S4-DEV-08) was the simplest implementation that still gave us that control. I also noted that anthoncalban was consulted on the KM rationale before the decision was finalized, per S4-PM-03.

**Decision / learning:**
AI gave me a clean framework for comparing three options, but the most important reasoning — that this is a mental health context and we have a duty of care — is something I had to supply myself. That's the kind of judgment that has to come from the PM, not the AI.

---

### Entry 12
**Date:** Week 5
**Issue:** S4-PM-02
**Task:** Run Week 5 standup and file standup note

**Prompt given to AI:**
> "Help me write the Week 5 standup note. We are in Build Sprint 2. The new Peer Support Stories feature was added to scope in v3 of the sprint plan. Dev is building the submission form and feed, UX is wireframing the stories screens, KM is updating the report mapping, and QA is writing new test cases. No major blockers."

**What the AI produced:**
Claude drafted the standup with statuses per member reflecting the S4 tasks and flagged the new NEW items as the main focus for the sprint. It also added a note about integration risk since multiple members were working on the same new feature from different angles.

**What I changed / rejected:**
Kept the integration risk note — it was a useful addition I wouldn't have explicitly written. Replaced all member statuses with the actual reports from the meeting. Added a specific action item: enzo-q and jpcasapao needed to sync on the Peer Stories Feed wireframe (S4-UX-04) and the backend implementation (S4-DEV-04) before end of week to avoid misalignment.

**Decision / learning:**
The AI flagging integration risk was a useful prompt — it reminded me to explicitly coordinate between enzo-q and jpcasapao on the stories feature since they were building the same screen from different ends. I added a direct action item to the standup note as a result.

---

### Entry 13
**Date:** Week 6
**Issue:** S4-PM-02 (continued)
**Task:** Run Week 6 standup and file standup note / handle QA blocker

**Prompt given to AI:**
> "Help me write the Week 6 standup note. We had a blocker this week — kimmoguer's PC broke and they couldn't execute test cases. I covered for them by running the test cases myself. Everyone else is on track. Dev has deployed to Vercel. UX completed usability fixes."

**What the AI produced:**
Claude drafted the standup note with the blocker clearly documented under kimmoguer's section, and recorded my coverage of the test case execution. It suggested adding a "Blocker Resolution" sub-section to the standup format to make it easier to track how blockers were handled over the project history.

**What I changed / rejected:**
I added the Blocker Resolution section as suggested — it was a good idea for documentation purposes. I updated the actual test case statuses based on what I had run myself, and noted which specific test cases were executed and their pass/fail results. I also added a note that kimmoguer would resume QA duties once their PC was repaired and would review my results for accuracy.

**Decision / learning:**
Covering for a blocked teammate is a PM call, not an AI call. The AI helped me document it clearly, but the decision to step in and run the test cases myself rather than delay the sprint was mine. Documenting it accurately in the standup note matters — the instructor can see from the GitHub commit history who filed the test results, so the note needs to be transparent about what happened.

---

## Polish & Docs — S5: Finalization (Week 6–7)

---

### Entry 14
**Date:** Week 7
**Issue:** S5-PM-01
**Task:** Write PM Reflection (1 page individual deliverable)

**Prompt given to AI:**
> "Help me write a 1-page PM reflection for my capstone project. The hardest part was coordinating everyone while needing to understand each role well enough to manage it. The main blocker I handled was when QA's PC broke and I covered their test cases and also helped UX with wireframes. If I did this again I would be more hands-on and strict from the start and read the professor's guidelines more thoroughly from day one."

**What the AI produced:**
Claude produced a structured 3-section reflection covering: (1) the coordination challenge, framed as the gap between "knowing enough to coordinate" and "knowing everything deeply"; (2) the QA blocker, describing the decision to step in and cover test case execution while also supporting UX; (3) the "what I'd do differently" section, connecting the lesson to specific project details like the ADR format requirements, the README 11-section standard, and the `km-report.md` filename.

**What I changed / rejected:**
The structure and framing were strong and I kept them. I reviewed each paragraph for accuracy against what actually happened — the AI correctly captured the coordination challenge and the QA blocker story. I adjusted one line in the blocker section to clarify that I helped UX with design review specifically, not code. I also made sure the "what I'd do differently" section referenced real specifics from our project rather than generic advice, which Claude had already done well.

**Decision / learning:**
The reflection accurately represents my experience because I gave the AI detailed personal context before it generated anything. The lesson here is that AI-assisted writing only works when you bring the substance — Claude shaped and structured it, but the events, decisions, and reasoning were mine. I can defend every paragraph of this document in the oral defense because it reflects what I actually did.

---

### Entry 15
**Date:** Week 7
**Issue:** S5-ALL-01
**Task:** Create peer evaluation form and confirm all 5 members submit before defense

**Prompt given to AI:**
> "Create a peer evaluation form as a Word document (.docx) for our KM capstone group. It needs to cover all 5 members evaluating each other (4 forms per person). Include: evaluator info fields, rating criteria on a scale of 1-5, written comments sections for strengths and areas for improvement, and instructions that match our project guidelines. The criteria should be relevant to our project roles and GitHub-based workflow."

**What the AI produced:**
Claude generated a complete `.docx` peer evaluation form with: an evaluator information block, a 5-item instructions section referencing S5-ALL-01 and the defense date, a rating scale legend (1 Poor to 5 Excellent), and 7 scored criteria — Quality of Deliverables, Contribution to Team, Reliability & Deadlines, Communication, Technical/Role Competence, GitHub Participation, and Collaboration & Teamwork. Each evaluated member section included a total score field (out of 35), a strengths comment box, and an areas for improvement comment box. An overall team reflection section and a signature line were included at the bottom.

**What I changed / rejected:**
The form was comprehensive and well-structured. I verified that the 7 criteria covered all the dimensions the instructor would care about per the guidelines (deliverable quality, GitHub activity, communication, teamwork). I confirmed the instructions referenced S5-ALL-01 specifically so members understood the submission context. The form was distributed to all 5 members and I tracked submissions manually by following up before the defense date.

**Decision / learning:**
Generating a professional form template is exactly the kind of formatting task where AI saves significant time. The judgment call — what criteria actually matter for evaluating a capstone project teammate fairly — was something I reviewed carefully rather than accepted blindly. The 7 criteria align with how the instructor grades individual contributions per the Group Execution Guidelines, so the form is defensible as a PM artifact.

---

### Entry 16
**Date:** Week 7
**Issue:** S5-PM-03
**Task:** Run final standup (Week 7) and file standup note

**Prompt given to AI:**
> "Help me write the final Week 7 standup note. All 5 members have completed their deliverables. Everyone is done — all reflections filed, all docs complete, prompt logs updated, peer evals submitted. Team is ready for defense."

**What the AI produced:**
Claude drafted the final standup note with a full status summary for each member listing their completed S5 tasks by issue ID, a team summary table showing all 5 members with checkmarks for deliverables, prompt log, and reflection status, a final submission checklist confirmation, and a closing line confirming the team is ready for defense.

**What I changed / rejected:**
Reviewed each member's listed tasks against the sprint plan to confirm accuracy. The AI correctly mapped each member's S5 deliverables from the sprint plan. I confirmed the overall checklist note was accurate — all items on the Final Submission Checklist had been verified before I filed the note. No significant changes needed; the content matched the actual team status.

**Decision / learning:**
For a final standup where everything is genuinely complete, AI can draft the note efficiently once you confirm the facts. The PM's job here is verification, not invention — I reviewed the note against the actual sprint plan and repo state before committing it. Filing an inaccurate standup note the night before defense would be a worse outcome than taking the time to verify. Everything checked out.

---

*Last updated: Week 7 — Polish & Docs complete. All deliverables finalized. Ready for defense.*

