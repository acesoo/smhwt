# Test Cases: TC-012 to TC-021

**Project:** Student Mental Health & Wellness Tracker
**Sprint:** S4 — Build Sprint 2
**QA Lead:** @kimmoguer
**Branch:** feature/qa-docs
**Result Summary:** 9 Pass | 1 Fail (TC-018 — Search & Retrieve) | 0 Blocked

---

## TC-012 — Auth: Sign Up

| Field | Details |
|---|---|
| **Feature** | Auth: Sign Up |
| **Scenario** | New user creates account with valid email and password |
| **Steps** | 1. Navigate to Sign Up page. 2. Enter a valid email and a secure password. 3. Submit the form. |
| **Expected Result** | Account is saved. User is redirected to the Dashboard immediately after sign-up. |
| **Actual Result** | New account was created successfully. User was redirected to the Dashboard as expected. |
| **Status** | ✅ Pass |
| **Notes** | Tested with a fresh email address. Supabase confirmed new row in auth.users. |

---

## TC-013 — Auth: Login & Logout

| Field | Details |
|---|---|
| **Feature** | Auth: Login & Logout |
| **Scenario** | Existing user logs in, session persists on refresh, and logout clears session |
| **Steps** | 1. Navigate to Login. 2. Enter correct credentials and submit. 3. Refresh the page. 4. Click Logout. |
| **Expected Result** | Login succeeds and lands on Dashboard. Session persists after refresh. Logout clears session and redirects to Login. |
| **Actual Result** | Login worked correctly. Session persisted on page refresh. Logout redirected to Login page and cleared the session. |
| **Status** | ✅ Pass |
| **Notes** | Session token verified via browser DevTools. No stale auth state observed after logout. |

---

## TC-014 — Mood Tracker: Log a Mood Entry

| Field | Details |
|---|---|
| **Feature** | Mood Tracker |
| **Scenario** | Logged-in user submits a mood entry; entry saves and is not visible to other users |
| **Steps** | 1. Log in as User A. 2. Navigate to Mood Tracker. 3. Submit a mood score (e.g. 7) with an optional note. 4. Log in as User B and check Mood Tracker. |
| **Expected Result** | Entry saves to mood_logs. Entry appears in User A's view only. User B sees no trace of User A's entry. |
| **Actual Result** | Mood entry saved successfully. Entry appeared correctly under User A. User B's Mood Tracker showed no entries from User A. |
| **Status** | ✅ Pass |
| **Notes** | Supabase RLS confirmed to be enforcing user isolation. |

---

## TC-015 — Journal: Create an Entry with Tags

| Field | Details |
|---|---|
| **Feature** | Journal |
| **Scenario** | User creates a journal entry with tags; entry and tags appear in journal list |
| **Steps** | 1. Navigate to Journal. 2. Write entry text and attach 2 tags. 3. Save. 4. Return to journal list. |
| **Expected Result** | Entry with tags is visible in the journal list. Tags are stored correctly in journal_entries table. |
| **Actual Result** | Journal entry was created and appeared in the list with both tags displayed correctly. |
| **Status** | ✅ Pass |
| **Notes** | Verified tag persistence in Supabase journal_entries table. Tags render as badges on the list card. |

---

## TC-016 — Wellness Goals: Create and Update a Goal

| Field | Details |
|---|---|
| **Feature** | Wellness Goals |
| **Scenario** | User creates an Active goal and marks it Completed; goal is private to its owner |
| **Steps** | 1. Navigate to Wellness Goals. 2. Create a new goal (status: Active). 3. Mark the goal as Completed. 4. Log in as another user and check Goals. |
| **Expected Result** | Goal status updates to Completed in wellness_goals table. Goal is not visible to other users. |
| **Actual Result** | Goal created with Active status. Marking as Completed updated the status correctly. Goal was not visible to a different user account. |
| **Status** | ✅ Pass |
| **Notes** | Status toggle updates immediately in UI without page reload. Supabase RLS enforces ownership. |

---

## TC-017 — Resource Library: Browse and Filter

| Field | Details |
|---|---|
| **Feature** | Resource Library |
| **Scenario** | Resources load on page load; tag filter narrows list; clearing filter restores full list |
| **Steps** | 1. Navigate to Resource Library. 2. Observe resources on load. 3. Apply a tag filter. 4. Clear the filter. |
| **Expected Result** | All resources load from database on page load. Filter narrows results to matching tag. Clearing filter restores full resource list. |
| **Actual Result** | Resources loaded correctly on page load. Tag filter narrowed the list to matching items. Clearing the filter restored all resources. |
| **Status** | ✅ Pass |
| **Notes** | Filter state resets cleanly. No stale filter state observed on navigation away and back. |

---

## TC-018 — Search & Retrieve: Keyword Search

> ⚠️ **FAIL — GitHub Issue filed, assigned to @enzo-q (label: bug)**

| Field | Details |
|---|---|
| **Feature** | Search & Retrieve |
| **Scenario** | Keyword search returns matching journal entries and resources; only logged-in user's own data appears |
| **Steps** | 1. Log in. 2. Navigate to Search. 3. Enter a keyword present in a journal entry and a resource. 4. Review results. |
| **Expected Result** | Matching journal entries and resources are returned. Results link to correct records. Only current user's journal entries appear. |
| **Actual Result** | Search results did not load reliably. Results pane remained blank on first attempt. A brief "parsing error" message appeared and disappeared after a few seconds. On subsequent attempts, results loaded inconsistently. |
| **Status** | ❌ Fail |
| **Notes** | Intermittent parsing error suggests a JSON parse failure on the API response. Likely caused by an async race condition or a malformed query response. GitHub Issue filed and assigned to @enzo-q. Recommend adding error boundary and verifying query response shape. |

### GitHub Issue (to be filed)

**Title:** Search & Retrieve — intermittent "parsing error" causes results to not load
**Label:** `bug`
**Assignee:** @enzo-q
**Steps to reproduce:**
1. Log in with a valid account.
2. Navigate to Search.
3. Enter a keyword known to exist in a journal entry or resource.
4. Observe — results pane may remain blank; a brief "parsing error" toast/message appears then disappears after a few seconds. Behavior is inconsistent across attempts.

**Expected:** Matching journal entries and resources returned reliably on search.
**Actual:** Blank results pane on first load, intermittent parsing error, inconsistent results on retries.
**Suspected cause:** JSON parse failure on API response — possible async race condition or malformed query response shape.
**Suggested fix:** Add an error boundary around the search results component; verify and validate query response shape before parsing.

---

## TC-019 — Navigation: All Routes Load Without Errors

| Field | Details |
|---|---|
| **Feature** | Navigation |
| **Scenario** | All main nav routes render correctly with no blank screens or console errors |
| **Steps** | 1. Log in. 2. Click each nav item: Dashboard, Mood Tracker, Journal, Goals, Resource Library, Search. 3. Check browser console for errors on each page. |
| **Expected Result** | All routes render without blank screens or console errors. Active nav item is highlighted on each page. |
| **Actual Result** | All routes loaded successfully with no blank screens. Active nav item highlighted correctly on each page. No console errors observed. |
| **Status** | ✅ Pass |
| **Notes** | Tested in Chrome. DevTools console clean on all routes. |

---

## TC-020 — Edge Case: Empty Inputs and Special Characters

| Field | Details |
|---|---|
| **Feature** | Edge Cases |
| **Scenario** | Empty required fields show validation error; special characters stored and displayed safely |
| **Steps** | 1. Submit mood entry form with no score. 2. Submit journal entry with empty body. 3. Create a journal entry with special characters: `<script>`, `&`, `"`, `'`. 4. View the saved entry. |
| **Expected Result** | Empty required fields show a validation error and nothing is saved to the database. Special characters are stored and rendered safely without breaking the UI or executing as code. |
| **Actual Result** | Empty required field submissions triggered validation errors and nothing was saved. Special characters were stored and displayed correctly without any script execution or UI breakage. |
| **Status** | ✅ Pass |
| **Notes** | XSS test with `<script>alert(1)</script>` was safely escaped. HTML entities rendered as plain text. |

---

## TC-021 — Negative Test: Unauthenticated Access Blocked

| Field | Details |
|---|---|
| **Feature** | Unauthenticated Access |
| **Scenario** | Logged-out user navigating directly to protected URLs is redirected to Login |
| **Steps** | 1. Log out completely. 2. Directly navigate to `/dashboard`. 3. Directly navigate to `/journal`. 4. Verify Supabase returns no data without a valid session. |
| **Expected Result** | All protected routes redirect the unauthenticated user to the Login page. Supabase RLS returns no data without a valid session. |
| **Actual Result** | Navigating to `/dashboard` and `/journal` while logged out redirected correctly to the Login page. Supabase returned no data, confirming RLS is enforced for unauthenticated sessions. |
| **Status** | ✅ Pass |
| **Notes** | Critical security check passed. Verified via Network tab — no data rows returned in Supabase responses without auth token. |
