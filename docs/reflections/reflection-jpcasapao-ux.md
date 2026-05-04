# UX Reflection
**Student Mental Health & Wellness Tracker**
@jpcasapao · KM Capstone · ProfElec2 · Sprint 5

---

## The decision I am most proud of — AND semantics for multi-tag filtering

When the Sprint 4 walkthrough exposed the single-tag constraint in Search, the fix seemed simple: allow multiple tags to be selected. The harder question was what those multiple selections should *mean* — AND (results must match all selected tags) or OR (results match any selected tag).

OR semantics are the default assumption. Most tag-based filters, from e-commerce to social feeds, use OR because OR maximizes results and makes the interface feel responsive. Choosing AND required a deliberate argument.

The argument I made was this: a student using the Search screen is not browsing — they are investigating. They are trying to find the entries where two stressors co-occurred, to understand whether `#TestStress` and `#SleepDisruption` tend to appear together in their own data. That is a Combination-phase task in the SECI framework: cross-referencing multiple knowledge dimensions to surface a pattern. AND semantics serve that intent precisely. OR semantics would return every entry tagged with either stressor — a much larger, noisier result set that dilutes the signal.

I am proud of this decision because it required grounding a UI behavior in the KM framework rather than defaulting to convention. The rationale is written down in S4-UX-02 and it holds up. If a student is confused by AND semantics, that confusion is the system correctly pushing back: "you asked for the intersection — here it is." That is the right kind of friction.

The one caveat I noted at the time — and still believe — is that Stories may need OR semantics in a future sprint. Browsing peer content is a discovery task, not an investigation task, and OR would serve it better. Making that distinction explicit is itself a design decision worth defending.

---

## The decision I would change — not testing the anonymous submission flow

The Sprint 4 usability session covered five screens and surfaced three real issues. It did not cover the Stories submission flow — the path a student takes to post their own anonymous story.

This was not an oversight exactly. The session was scoped to reading and filtering behavior, and the submission form had not been a concern during development. But the submission flow is the highest-stakes UX moment in the entire application. It is the one place where a student must trust, with certainty, that their personal information will not be exposed. The anonymity banner on the feed screen addresses that trust at the reading end. It does not address what a student feels while filling in a text box and pressing submit.

Questions I cannot currently answer: Does the form make clear that the submitted name field is not shown publicly? Is there a confirmation state after submission that reinforces anonymity? Does the form look sufficiently different from the private journal form that a student would not confuse the two?

If I had more time, I would design and run a dedicated submission task in the Sprint 5 walkthrough: "Write and post a short anonymous story about an academic stressor you experienced this week." I would observe whether the tester hesitates, what they read before submitting, and whether the post-submission state gives them confidence that their identity is protected. That session would either validate the current design or surface changes that cannot be caught any other way.

The broader lesson is that anonymity is not a backend guarantee — it is a UX contract. The architecture enforces it. The interface has to communicate it.