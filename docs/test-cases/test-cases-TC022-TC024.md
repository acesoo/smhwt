# Test Cases: TC-022 to TC-024

**Project:** Student Mental Health & Wellness Tracker
**Sprint:** S4 — Build Sprint 2
**Task:** S4-QA-04 — Peer Support Stories
**QA Lead:** @kimmoguer
**Branch:** feature/qa-docs
**Result Summary:** 3 Pass | 0 Fail | 0 Blocked

---

## TC-022 — Peer Support Stories: Anonymous Story Submission

| Field | Details |
|---|---|
| **Feature** | Peer Support Stories — Story Submission |
| **Scenario** | User submits a story; it saves to peer_stories with is_approved = false and no username stored |
| **Steps** | 1. Log in as a regular user. 2. Navigate to the Story Submission form. 3. Fill in a title, body, and optional tag. 4. Submit the form. 5. Check the peer_stories table in Supabase for the new row. |
| **Expected Result** | Story is saved to peer_stories. The is_approved column is false by default. No username or identifying information is stored or visible on the submission. A confirmation message is shown to the user. |
| **Actual Result** | Story saved successfully to peer_stories table. is_approved defaulted to false on the new row. No username or user-identifying field was present in the stored record. Confirmation message displayed after submission. |
| **Status** | ✅ Pass |
| **Notes** | Verified directly in Supabase table view. Anonymity guaranteed at the data layer — only the story content and tag are stored. Story did not appear in the public feed until approved. |

---

## TC-023 — Peer Support Stories: Feed Displays Only Approved Stories

| Field | Details |
|---|---|
| **Feature** | Peer Support Stories — Stories Feed |
| **Scenario** | Only stories with is_approved = true appear in the public feed; unapproved stories are hidden |
| **Steps** | 1. Confirm at least one story exists in peer_stories with is_approved = false (unapproved). 2. Confirm at least one story exists with is_approved = true (approved). 3. Navigate to the Peer Stories Feed as a regular logged-in user. 4. Check whether the unapproved story appears in the feed. 5. Check whether the approved story appears in the feed. |
| **Expected Result** | Only stories with is_approved = true are visible in the feed. Stories with is_approved = false are not shown to regular users under any circumstance. No author identity is displayed on any story card. |
| **Actual Result** | Approved stories appeared correctly in the feed as story cards with tag badges. Unapproved stories were not visible to regular users. No author name or identifying information was shown on any card. |
| **Status** | ✅ Pass |
| **Notes** | Tested with 2 unapproved and 2 approved stories in the table. Feed showed only the 2 approved entries. Supabase RLS confirmed to be filtering on is_approved = true for public feed queries. |

---

## TC-024 — Peer Support Stories: Tag Filter

| Field | Details |
|---|---|
| **Feature** | Peer Support Stories — Tag Filter |
| **Scenario** | Selecting a tag filters the feed to matching stories; selecting no tag shows all approved stories |
| **Steps** | 1. Ensure approved stories exist with at least two different tags (e.g. anxiety, burnout). 2. Navigate to the Peer Stories Feed. 3. Select the "anxiety" tag filter. 4. Observe the feed results. 5. Select the "burnout" tag filter. 6. Observe the feed results. 7. Clear the filter (select no tag / show all). 8. Observe the feed results. |
| **Expected Result** | Selecting a tag narrows the feed to only approved stories with that tag. Switching tags updates the feed correctly. Clearing the filter restores all approved stories regardless of tag. |
| **Actual Result** | Selecting "anxiety" showed only approved stories tagged with anxiety. Switching to "burnout" updated the feed to burnout-tagged stories only. Clearing the filter restored the full list of all approved stories across all tags. |
| **Status** | ✅ Pass |
| **Notes** | Filter state updates without page reload. No stale results observed when switching between tags. Tested with 4 approved stories across 3 tags — filter correctly isolated each tag's stories. |
