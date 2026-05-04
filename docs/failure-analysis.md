# Failure Analysis Report
**Project:** Student Mental Health & Wellness Tracker  
**Deliverable:** S5-QA-01  
**Author:** @kimmoguer (QA / Docs Lead)  
**Branch:** feature/qa-docs  
**Report Version:** v1.0  
**Date:** Sprint 5 — Polish & Docs Phase  

---

## Purpose

This report documents bugs discovered during QA testing of the Student Mental Health & Wellness Tracker. For each bug, the report covers: how it was found, how it was reproduced, what fix was applied, and what lessons were learned. All bugs listed here correspond to filed GitHub Issues — no hypothetical entries are included.

> **⚠️ Report Status:** 1 of 5 required bugs are currently documented below.

---

## Bug Summary Table

| # | GitHub Issue Title | Linked Test Case | Severity | Status |
|---|---|---|---|---|
| BUG-001 | Search & Retrieve — intermittent "parsing error" causes results to not load | TC-018 | High | ✅ Fixed / Verified ||

---

## BUG-001 — Search & Retrieve: Intermittent Parsing Error on Keyword Search

**GitHub Issue:** Search & Retrieve — intermittent "parsing error" causes results to not load  
**Label:** `bug`  
**Assigned To:** @enzo-q  
**Linked Test Case:** TC-018  
**Severity:** High — core retrieval feature is unreliable for end users  

---

### How It Was Found

This bug was discovered during the execution of TC-018 (Search & Retrieve: Keyword Search) as part of the S4-QA-01 testing cycle run against the integrated dev branch. The test case was designed to verify that the search feature returns matching journal entries and resources for logged-in users, and that only the current user's own journal data appears in results.

On the first attempt, the results pane remained blank after submitting a valid keyword. A brief toast or inline message reading "parsing error" appeared and disappeared within a few seconds before anything else rendered. On subsequent retries using the same keyword and account, results loaded intermittently — sometimes appearing normally, sometimes not. The behavior was inconsistent across attempts within the same session.

---

### How It Was Reproduced

**Environment:** Integrated dev branch, local development server (`npm run dev`)  
**Account:** Valid test user account with at least one journal entry and one resource tagged with the test keyword

**Reproduction Steps:**
1. Log in with a valid account.
2. Navigate to the Search & Retrieve screen.
3. Enter a keyword known to exist in at least one journal entry or resource (e.g., `"anxiety"`).
4. Submit the search.
5. Observe the results pane.

**Observed Behavior:**
- On first attempt: results pane remains blank; a "parsing error" message briefly appears (~2–3 seconds) then disappears.
- On second or third attempt with the same query: results may load normally.
- Behavior is non-deterministic — fails more often on the first search after page load.

**Suspected Cause:**  
A JSON parse failure on the API response from Supabase. The most likely cause is an async race condition — the component attempts to parse the query response before it has fully resolved, receiving an incomplete or malformed payload. This is consistent with the intermittent nature of the bug: it fails on first load (when no cache exists) but occasionally succeeds on retry (when timing differs).

---

### How It Was Fixed

**Fix Applied By:** @enzo-q  
**Commit Reference:** *(paste commit hash here, e.g., `S4-DEV-02 Fix async race in search results — add error boundary and validate response shape`)*

The recommended fix involved two changes:

1. **Error boundary added around the search results component** — catches parse failures gracefully and displays a user-facing error message instead of a blank pane.
2. **Response shape validation added before parsing** — the query response is checked for expected structure (e.g., `data` array exists and is not null) before any map or render call is made. If the response is invalid, the component retries or shows the error state.

*After the fix was applied, @kimmoguer re-ran TC-018 against the updated branch. The search feature loaded results reliably across five consecutive attempts using the same test keyword.*

---

### Lessons Learned

1. **Async operations in search need explicit loading and error states.** Leaving the results pane empty with no fallback made the failure invisible to casual testers — only systematic test case execution caught it.
2. **Intermittent bugs are easy to miss in informal walkthroughs.** Because the bug did not fail 100% of the time, it could have slipped through to production. Structured test cases with explicit pass/fail criteria are what surfaced it.
3. **API response shape should be validated before use.** Supabase queries can return null, an empty array, or an error object depending on the query and RLS policy. Always check the shape before calling `.map()` or `.forEach()`.
4. **Error boundaries should be part of the initial build, not added after bugs appear.** A wrapper component or a centralized error handler for search would have made the failure more visible from the start.


*End of Failure Analysis Report — S5-QA-01 | @kimmoguer | feature/qa-docs*