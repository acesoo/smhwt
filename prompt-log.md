# KM Analyst Prompt Log — Anthon Van B. Calban

## Project: Student Mental Health & Wellness Tracker
**Role:** Knowledge Management Analyst

---

## Self-Directed Research (Independent Work)
**Date:** April 2026
**Process:** Before utilizing AI tools, I conducted independent literature reviews via **Google Scholar** to ensure our application's data structure was grounded in validated psychological and KM standards.

**Key Academic Sources Found Manually:**
- **Lin & Chen (2009):** Selected to establish a standardized inventory for academic stressors.
- **Fernández-Martin et al. (2022):** Identified the **Brief-COPE inventory** as the framework for our journal's coping strategy tags.
- **Lister et al. (2023):** Researched for specific stressors related to distance learning and institutional isolation.
- **Zhong et al. (2024):** Researched to include modern digital stressors like "Cyberchondria" and "Information Overload".

---

## Sprint 1: Kickoff & Discovery (Weeks 1–2)

#### Prompt 1: Framework Comparison
**User Intent:** Evaluating KM frameworks for individual wellness tracking.
**Prompt:** "Compare the SECI Model and Communities of Practice for a student mental health tracker. Which one is better for individual tracking and self-reflection?"
**AI Response Summary:** Identified SECI as the superior model for converting "tacit" feelings into "explicit" logs (Externalization).

#### Prompt 2: Drafting the Selection Memo
**User Intent:** Creating a formal justification for the team and PM.
**Prompt:** "Based on the SECI model, draft a 1-page Framework Selection Memo identifying knowledge silos in student mental health and mapping app features to SECI components."
[cite_start]**AI Response Summary:** Provided the structural outline for the memo, which unblocked the UX Designer and Developer.

---

## Sprint 2: Design & Taxonomy (Weeks 3–4)

#### Prompt 3: Taxonomy Synthesis (S2-KM-01)
**User Intent:** Transforming my manual research into a technical tag list for the Developer.
**Prompt:** "Based on the academic papers I found (Lin & Chen, Yano et al.), extract specific stressors and organize them into a table with 'Broad Category' and 'Specific Tags' for a database schema."
**AI Response Summary:** Synthesized my sources into five categories (Academic, Social, Institutional, Personal, Digital) with specific tags like #WorkOverload and #PeerStress.

#### Prompt 4: Coping Strategy Mapping (S2-KM-01)
**User Intent:** Finalizing the journal entry categorization logic.
**Prompt:** "Using the Brief-COPE inventory from my research, categorize how students react to stress into 'Problem-Centered,' 'Emotion-Centered,' and 'Avoidance' tags."
**AI Response Summary:** Defined the behavioral response tags (e.g., #ActiveCoping, #Venting) required for the `journal_entries` table.

#### Prompt 5: Retrieval Requirements (S2-KM-02)
**User Intent:** Defining how the system should handle and present knowledge.
**Prompt:** "Draft KM retrieval requirements for the Developer. Explain how the app should correlate mood tags with sleep quality and identify patterns for the 'Internalization' phase."
**AI Response Summary:** Defined the logic for data aggregation and reflection retrieval to empower students with self-knowledge.

---

## Summary of KM Contributions
- **Knowledge Acquisition:** Manually identified 7+ academic sources to validate the app's logic.
- **Team Impact:** Provided the taxonomy that unblocked **enzo-q** (Schema Design) and **jpcasapao** (Wireframe Annotations).
- **KM Theory:** Successfully applied the **SECI "Ba"** concept to transition the project from a simple tracker to a Knowledge Management system.
