# KM Conceptual Report: SECI-Based Mental Health Informatics

---

## 1. Introduction

The mental health landscape for university students is increasingly characterized by a paradox of data: while students have more access to health-tracking tools than ever before, their actual "self-knowledge" remains low. This report proposes a Knowledge Management (KM) solution for a Student Wellness Tracker. Unlike standard logging apps, this project utilizes the **SECI Model** to facilitate the transition from fleeting emotional states to structured, actionable wellness insights. By treating the application as a "Ba" (a shared space for knowledge creation), we aim to solve the persistent issue of information fragmentation and ensure that personal data leads to genuine behavioral change.

---

## 2. Problem Analysis: The Knowledge Gap

Based on a systematic review of current mental health research, student wellness data suffers from three primary KM failures that prevent effective self-management:

### 2.1 Information Fragmentation and Silos

Students frequently utilize multiple, disconnected platforms—tracking sleep on a wearable device, academic deadlines in a digital calendar, and mood in a private journal. This results in **siloed information**, where the user cannot see the correlation between disparate indicators. As a result, the "big data" generated remains untapped and fails to convert into "self-quantification" (Almalki et al., 2015).

Without a unified knowledge repository, patterns that would otherwise be observable—such as a consistent drop in mood scores during mid-term periods, or a correlation between reduced sleep and increased journaling of negative affect—remain invisible to the student. The epistemic cost of this fragmentation is not merely inconvenience; it is the loss of the cumulative, longitudinal signal that is the only reliable basis for genuine self-understanding. A student cannot manage what they cannot see, and they cannot see what is distributed across incompatible, non-communicating systems.

### 2.2 Tacit Knowledge Loss

Much of a student's mental health data is **tacit**. It exists as "internal states" (mood, arousal, or unspoken stress) that are inherently difficult to measure or share directly. Without a systematic tool for **Externalization**, this knowledge remains fleeting. When these states remain undocumented, students are at higher risk for **Reduced Decision Accuracy**, leading to inappropriate treatment choices or misinterpreted symptoms.

Nonaka and Takeuchi (1995) characterize tacit knowledge as deeply personal, context-specific, and difficult to formalize. In the student wellness context, this manifests as an inability to articulate distress: a student may carry a persistent sense of overwhelm across an entire academic term without ever naming it, dating its onset, or connecting it to a specific trigger. This "unnamed stress" is not merely unspoken—it is, in a meaningful epistemological sense, unknown, even to the person experiencing it. The absence of externalization tools does not simply fail to capture this knowledge; it actively prevents its creation.

### 2.3 Cognitive Depletion and Information Overload

The lack of a structured KM system leads to a processing burden that exceeds an individual's cognitive capacity. This "Information Overload" often triggers **Cyberchondria**—a state where students rely on anecdotal online evidence rather than their own longitudinal data, leading to increased anxiety and the overuse of medical services (Zhong et al., 2024).

When students cannot access organized, personal wellness data, they turn to generalized, uncontextualized sources—social media, health forums, and symptom-checker applications—to interpret their own experiences. This substitution of personal longitudinal knowledge with external, generic information is a downstream consequence of the KM failure described above. It is not a failure of student judgment, but a rational response to a knowledge vacuum: in the absence of personal data infrastructure, external sources fill the interpretive gap, often amplifying anxiety rather than resolving it.

---

## 3. Theoretical Framework: The SECI Model

To address these gaps, this project adopts the **SECI Model** (Socialization, Externalization, Combination, Internalization) over traditional social-learning frameworks like Communities of Practice.

### 3.1 Why SECI Over Communities of Practice?

While Communities of Practice emphasize social group dynamics, mental health is a sensitive, private matter. Research by Huang & Bashir (2017) suggests that social stigma and "labeling effects" of clinical terms can deter students from sharing in a communal space. SECI is superior for this application because it prioritizes **individual self-activation** and the internal conversion of tacit feelings into explicit records within a secure, private environment.

Communities of Practice function on the assumption that knowledge is best created and shared through collective participation in a social domain. While this model has demonstrated utility in professional and academic learning contexts, it is epistemologically misaligned with the nature of mental health knowledge. Wellness data is not merely sensitive—it is constitutively personal. Its value derives precisely from its specificity to the individual: a student's mood pattern during finals week is meaningful because it is *theirs*, not because it resembles a community norm. A framework that routes knowledge creation through social validation introduces structural barriers (stigma, self-censorship, identity threat) that are antithetical to the candid self-documentation that effective wellness tracking requires. The SECI model, by contrast, centers the individual as both the source and beneficiary of the knowledge conversion process, making it the theoretically appropriate framework for this application.

### 3.2 The SECI Spiral Applied to Student Wellness

The SECI model describes a continuous, iterative spiral through which tacit knowledge is transformed into explicit knowledge—and explicit knowledge is re-absorbed as deepened tacit understanding. This spiral does not terminate; each cycle of internalization seeds the next cycle of socialization, creating a compounding knowledge base. For the purposes of this project, the spiral is operationalized at the individual level, with each stage corresponding directly to a functional feature of the SMHWT application.

**Socialization** represents the pre-app baseline: the tacit sharing of wellness-related experience through informal peer interaction, cultural norms, and observed behavior. While the application does not replicate this layer, it acknowledges it as the starting condition from which the SECI spiral must be initiated. Students arrive with accumulated but unarticulated wellness knowledge—impressions, habits, and emotional patterns that have never been subjected to systematic reflection.

**Externalization** is the pivotal conversion stage in which tacit knowledge is articulated into explicit, recordable form. For the SMHWT, this is the core epistemic function of the Mood Tracker and Journal. When a student assigns a numerical score to their current emotional state and appends a contextual note, they perform an act of conceptual articulation—transforming a felt but unformalized internal state into a discrete, queryable data point. The Journal deepens this process: applying research-based tags to a reflective entry connects lived experience to a structured ontological vocabulary, anchoring personal affect within a framework of established psychological and wellness constructs. Each log entry and each journal record represents a unit of externalized knowledge—tacit experience rendered explicit, persistent, and retrievable.

**Combination** is the synthesis stage in which discrete explicit knowledge units are aggregated into new, higher-order knowledge structures. In the SMHWT, this function is performed by the Dashboard and analytics layer. Individual mood entries carry limited informational value in isolation; systematically combined across time and behavioral contexts, they yield emergent patterns that neither the student nor any single data point could have produced. A recurring mood trough on Sunday evenings, a visible correlation between reduced sleep entries and elevated stress tags, an improvement trend following goal adoption—these are Combination outputs. They are new knowledge, not merely compiled records. This is the analytical backbone of the application: it does not display data, it generates insight.

**Internalization** is the terminal stage in which explicit knowledge is re-absorbed into the individual as renewed tacit understanding—as revised intuition, behavioral habit, and self-regulatory capacity. When a student reviews their dashboard and recognizes, for the first time, a reproducible pattern in their own emotional data, they undergo a metacognitive transformation. The previously unconscious stress becomes diagnosed, dated, and actionable. This insight does not remain explicit; it is internalized as a new personal heuristic: a disposition to monitor oneself more attentively during high-risk periods, a readiness to intervene earlier, a belief in one's own capacity for self-management. The Wellness Goals feature serves as the behavioral expression of this internalized knowledge—the point at which the SECI spiral closes and active self-management replaces reactive distress response.

### 3.3 The App as a "Ba"

The application functions as a "Cyber Ba"—a virtual knowledge space. It provides the "secure single place" required for the student to interact with their own data. In this "Ba," the student moves through a structured epistemic progression:

- **Externalization:** Converting internal, tacit "states" into quantitative representations (logs).
- **Combination:** Aggregating these logs into a "complex representation" (dashboards) to reveal patterns previously hidden by silos.
- **Internalization:** Translating explicit data back into tacit wisdom through reflection.

Nonaka (1998) defines Ba not merely as a container for knowledge but as an enabling condition—a context specifically designed to accelerate the SECI spiral. A well-designed Ba reduces the friction of externalization, structures the conditions for combination, and creates reflective affordances that invite internalization. The SMHWT enacts each of these functions: the Mood Tracker provides a low-friction daily externalization ritual; the research-based tag ontology structures the semantic conditions for meaningful combination; the Dashboard's trend visualizations create the reflective surface through which internalization occurs. Without the Ba—without the application as a unified, contextually coherent knowledge environment—the SECI spiral stalls. Data is captured but not connected; records exist but do not compound into insight.

This is the definitive answer to the question of why a simple tracker is insufficient. A passive logging tool captures data at the Externalization stage but provides no infrastructure for Combination or Internalization. It converts tacit knowledge into explicit records and then abandons those records. The student accumulates entries but gains no self-knowledge; the data exists but does not transform into understanding. The SMHWT addresses this gap by completing the spiral—by providing not just a recording surface but a full KM environment in which each stage of the SECI process is actively supported.

---

## 4. Proposed KM Solution & Features

The following features are designed to facilitate the SECI process:

- **User Authentication (Enabling Layer):** Establishes the secure, private "Ba" environment. Without authenticated personal accounts, the personal knowledge space cannot exist. Row-Level Security ensures that each student's data remains exclusively their own, creating the psychological safety necessary for candid self-documentation.

- **Structured Mood Journal (Externalization):** Prevents information loss by documenting internal states immediately. The 1–10 mood scale provides a standardized, low-friction externalization mechanism; optional contextual notes allow for richer qualitative articulation. Together, these convert fleeting affective states into durable, structured data.

- **Journaling with Research-Based Tags (Externalization → Combination Bridge):** The tag ontology performs a dual function. At the Externalization stage, it scaffolds the student's articulation of experience by providing a pre-defined vocabulary of wellness constructs (e.g., *academic pressure*, *sleep disruption*, *social anxiety*, *self-care*). At the Combination stage, these tags become the semantic keys by which the system aggregates and filters entries, enabling cross-temporal pattern recognition that would be impossible without consistent categorization.

- **Data Aggregation Dashboard (Combination):** Connects siloed data points (e.g., Sleep vs. Stress) into a single analytical view. By visualizing mood trends, tag frequencies, and goal progress in relation to one another, the dashboard generates the emergent, cross-indicator insights that constitute genuine Combination. This is the feature that transforms a record into a revelation.

- **Wellness Goals (Internalization → Action):** Prompts the user to review trends and convert internalized insights into behavioral commitments. The act of setting a goal—"Journal three times per week during exam season"—is not merely motivational; it is epistemological. It represents the student's explicit acknowledgment of a pattern they have internalized and their intentional decision to act on that understanding. The Goals feature closes the SECI spiral and initiates the next cycle.

---

## 5. KM Framework-to-Feature Mapping

| KM Component | SECI Stage | App Feature | Description |
|---|---|---|---|
| Tacit → Explicit | **Externalization** | Mood Tracker / Journal | Converts internal emotional states into structured, retrievable records via daily logs and tagged journal entries |
| Explicit + Explicit | **Combination** | Dashboard & Analytics | Aggregates individual data points into trend visualizations and cross-indicator patterns, revealing insights invisible in isolation |
| Explicit → Tacit | **Internalization** | Reflective Insights / Wellness Goals | Prompts structured reflection on personal data trends, enabling the student to absorb analytical insights as renewed self-understanding and behavioral commitment |
| Ba (Enabling Condition) | **All Stages** | Authenticated Personal Workspace | Provides the secure, private, unified knowledge environment that makes the SECI spiral possible at the individual level |

---

## 6. Why This Approach Matters: The Knowledge-to-Action Gap

The central claim of this KM framework is that the problem of student mental health self-management is, at its core, a knowledge problem. Students do not fail to manage their wellness because they lack willpower or access to information. They fail because they lack a knowledge infrastructure that converts their lived experience into actionable self-knowledge.

Existing tools address this problem incompletely. Mood tracking apps record data but do not synthesize it. Mental health resources provide general information but cannot connect it to the student's personal patterns. Counseling services offer expert interpretation but are available too infrequently and require the student to already possess sufficient self-awareness to describe their experience accurately. None of these interventions addresses the fundamental KM failure: the gap between tacit experience and structured self-knowledge.

The SMHWT addresses this gap by operationalizing the SECI spiral as a personal knowledge system. By functioning as a Ba—a unified, secure, and analytically capable knowledge environment—the application does not merely record the student's experience. It transforms that experience into self-knowledge, and self-knowledge into self-management. This is the theoretical basis for the claim that the SMHWT is not a health app that uses KM principles, but a KM system designed to solve a health problem.

---

## 7. REFERENCES

- Almalki, M., Gray, K., & Sanchez, F. M. (2015). The use of self-quantification systems for personal health information: Big data management activities and prospects. *Health Information Science and Systems, 3*(Suppl 1), S1.
- Huang, H. Y., & Bashir, M. (2017). Users' adoption of mental health apps: Examining the impact of information cues. *JMIR mHealth and uHealth, 5*(6), e83.
- Nonaka, I., & Takeuchi, H. (1995). *The Knowledge-Creating Company*. Oxford University Press.
- Nonaka, I. (1998). The concept of 'Ba': Building a foundation for knowledge creation. *California Management Review, 40*(3), 40–54.
- Zhong, L., Cao, J., & Xue, F. (2024). The paradox of convenience: How information overload in mHealth apps leads to medical service overuse. *Frontiers in Public Health, 12*, 1408998.



---

## 8. Framework-to-App Mapping

This section provides a complete mapping of the SECI model's four knowledge conversion stages to the specific features built in the SMHWT. Each row confirms that the theoretical KM requirement has a direct, functional counterpart in the application — verified against the developer's (@enzo-q) implementation.

| SECI Stage | Knowledge Conversion | App Feature | Screen / Component | KM Function |
|---|---|---|---|---|
| **Socialization** | Tacit → Tacit | Peer Support Forum | Forum feed + anonymous post form | Students transfer lived coping knowledge to peers through shared narrative, normalizing help-seeking behavior without exposing private data |
| **Externalization** | Tacit → Explicit | Mood Tracker | `MoodInputWidget.tsx` / `mood-log-form.tsx` | Converts internal emotional states (mood score 1–10, sleep quality 1–5, academic impact) into structured, retrievable database records |
| **Externalization** | Tacit → Explicit | Journal with Research-Based Tags | `journal-entry-form.tsx` | Anchors qualitative reflection to a controlled tag vocabulary (stressor + coping taxonomy), transforming unstructured experience into semantically consistent explicit knowledge |
| **Combination** | Explicit + Explicit | Dashboard & Analytics | `DashboardSummaryCard.tsx` | Aggregates mood logs, stressor tags, coping tags, and sleep data across time to surface emergent patterns — cross-indicator insights no single entry could produce |
| **Internalization** | Explicit → Tacit | Wellness Goals | `wellness-goal-form.tsx` / `goal-card.tsx` | Enables the student to translate dashboard insights into behavioral commitments, re-absorbing explicit patterns as renewed self-regulatory capacity |
| **Ba (Enabling Layer)** | All Stages | Authenticated Workspace | Supabase Auth + RLS | Provides the secure, private, unified knowledge environment that makes the full SECI spiral possible at the individual level |

### 8.1 Socialization Layer: Peer Forum and Communities of Practice

The SECI model's Socialization stage — the transfer of tacit knowledge through shared experience — is enacted in the SMHWT through the **Peer Support Forum**. This feature allows students to post anonymously about their wellness experiences, share coping strategies, and find peer stories relevant to their current stressors.

While the core self-tracking features (Sections 8, rows 2–5) are grounded exclusively in the SECI model, the forum introduces a **bounded application of Communities of Practice** (Wenger, 1998) at the social layer. This is a deliberate architectural decision: Communities of Practice theory is appropriate here because the forum creates a shared domain of practice — student wellness — around which a community of peer contributors forms, shares repertoire, and builds collective understanding over time.

This does not replace the SECI model. Rather, it extends it: the Socialization stage, which in the original SECI formulation precedes the individual's private externalization, is here enacted *alongside* it. A student may read a peer's #TestStress story before logging their own mood, or may post a #WhatHelpedMe entry after a successful Internalization cycle. The two frameworks operate at different layers — individual and social — and are complementary rather than competing.

### 8.2 Dual-Framework Justification

| Layer | Framework | Rationale |
|---|---|---|
| Individual (Mood Tracker, Journal, Dashboard, Goals) | SECI Model | Mental health self-tracking is private and personal; stigma effects (Huang & Bashir, 2017) make communal frameworks inappropriate at this layer |
| Social (Peer Forum) | Communities of Practice | Anonymity removes the stigma barrier; the forum creates a shared domain of practice where tacit peer knowledge is transferred through narrative |

---

## 9. Knowledge Architecture

This section describes how the SMHWT's knowledge infrastructure is structured — the schema design, taxonomy enforcement, and retrieval logic that operationalize the KM framework in the actual codebase.

### 9.1 The Ba: Authenticated Personal Workspace

The foundational architectural decision is the treatment of the application as a **"Cyber Ba"** — a virtual knowledge space specifically designed to enable the SECI spiral. Nonaka (1998) defines Ba not merely as a container for knowledge but as an enabling condition: a context that reduces friction at each stage of knowledge conversion.

In the SMHWT, the Ba is implemented through Supabase Auth combined with Row-Level Security (RLS) policies. Each student's data is fully isolated at the database level via `auth.uid() = user_id` constraints on all tables. This creates the psychological safety necessary for candid self-documentation — a student will only externalize honestly if they are certain their data is private.

### 9.2 Knowledge Taxonomy Enforcement

The SMHWT's Externalization layer depends on a **controlled tag vocabulary** — a research-based ontology of student wellness constructs that ensures semantic consistency across entries. Without vocabulary enforcement, the Combination stage fails: tags entered inconsistently cannot be aggregated by the dashboard, and pattern recognition becomes impossible.

The taxonomy is organized into three layers:

**Layer 1 — Stressor Tags** (`stressor_tags TEXT[]` on `mood_logs`): 16 tags across 5 categories (Academic, Social, Institutional, Personal, Digital), grounded in Lin & Chen (2009), Yano et al. (2021), Lister et al. (2023), Freire et al. (2016), and Zhong et al. (2024).

**Layer 2 — Coping Tags** (`coping_tags TEXT[]` on `mood_logs`): 11 tags across 4 categories (Problem-Centered, Emotion-Centered, Avoidance, Support Seeking), grounded in the Brief-COPE inventory (Fernández-Martin et al., 2022).

**Layer 3 — Peer Story Tags** (`tags TEXT[]` on `peer_stories`): 12 tags across 4 categories (Shared Experience, Peer Advice, Resource Sharing, Community Support), designed to classify peer knowledge shared in the Socialization layer. Stories are only visible in the public feed when `is_approved = true`, ensuring moderated knowledge quality.

All three tag columns are enforced via a `valid_tags` lookup table in Supabase, with CHECK constraints applied through a custom `validate_tags()` PL/pgSQL function. This ensures no invalid tag can enter the system through any pathway — UI or direct database insert.

### 9.3 Retrieval Architecture

The retrieval layer is designed to support the Combination and Internalization stages by making tag-based queries fast and cross-indicator analysis possible.

| Retrieval Requirement | Implementation | KM Purpose |
|---|---|---|
| Tag-based filtering | GIN indexes on `stressor_tags`, `coping_tags`, `forum_tags` | Enables fast lookup of all entries by a specific tag (e.g., all #TestStress logs) |
| Cross-indicator aggregation | Joined queries across `mood_logs` columns (`sleep_quality`, `academic_impact`, `stressor_tags`) | Surfaces correlations between stressors, sleep, and mood for the Combination stage |
| Pattern identification | Time-series queries on `logged_at` with tag grouping | Allows the dashboard to identify recurring patterns (e.g., mood drops during exam weeks) |
| Forum retrieval | GIN index on `forum_tags` + `is_anonymous = true` filter | Allows students to find peer stories by topic without exposing contributor identity |

### 9.4 The Knowledge Flow

The complete knowledge flow through the SMHWT architecture can be summarized as follows:

```
[Student Experience]
        ↓
[Socialization] — Forum: peer stories normalize tacit stress
        ↓
[Externalization] — Mood Tracker + Journal: tacit states → structured records
        ↓
[Combination] — Dashboard: records → cross-indicator patterns → insights
        ↓
[Internalization] — Wellness Goals: insights → behavioral commitments
        ↓
[New Tacit Knowledge] — Student carries revised self-understanding into next cycle
        ↓
        ↻ (spiral continues)
```

Each stage is supported by a specific application feature, a specific database structure, and a specific retrieval mechanism. The architecture is not incidental to the KM framework — it *is* the KM framework, implemented in code.

---
---

## 10. Limitations of the KM Framework

Every knowledge management system operates within constraints, and the SMHWT is no exception. A candid assessment of the framework's limitations is necessary both for academic integrity and for guiding the project's future development.

### 5.1 Individual Ba Cannot Replace Institutional Support

The SMHWT is designed as a personal Ba — a private, individual knowledge space. This is a deliberate design choice grounded in the stigma research of Huang & Bashir (2017). However, it also means the application operates in isolation from the institutional support structures — counseling services, academic advisors, peer support programs — that form the broader mental health infrastructure of a university. A student who uses the SMHWT may develop significant self-awareness about their stress patterns but still lack the bridge between that self-knowledge and professional intervention. The application has no referral mechanism, no escalation pathway, and no integration with campus mental health services. This is a meaningful gap: Internalization produces self-regulatory capacity, but some mental health conditions require professional support that self-management cannot substitute.

### 5.2 Voluntary Externalization is an Inconsistent Knowledge Source

The Externalization stage — the foundation of the entire SECI spiral — depends entirely on the student's willingness and consistency in logging mood entries and journal reflections. Students who are most acutely distressed are likely to be the least consistent users: high cognitive load, reduced motivation, and the very symptoms the application is designed to address (anxiety, burnout, disengagement) are also the conditions most likely to interrupt daily logging habits. This creates a selection bias in the knowledge base: the system accumulates the most data during periods of relative wellness and the least data during the periods that matter most. The Combination stage can only surface patterns from data that exists; gaps in the externalization record produce gaps in the analytical insight.

### 5.3 Tag Taxonomy is Static in a Dynamic Domain

The research-based tag vocabulary defined in `km-architecture.md` is grounded in validated academic sources and covers 16 stressor categories and 11 coping response categories. However, the taxonomy was defined at a single point in time. Student wellness experiences are shaped by rapidly evolving social, technological, and institutional factors — new stressors emerge (e.g., AI-related academic anxiety, social media pressures not captured by existing categories) that the current taxonomy cannot classify. A static vocabulary enforced at the database level, while essential for Combination-stage data integrity, also limits the system's capacity to capture emergent or idiosyncratic experiences that fall outside the predefined ontology. This is a fundamental tension in controlled vocabulary design: specificity enables aggregation but constrains expressivity.

### 5.4 Peer Forum Moderation Introduces Knowledge Quality Risk

The Peer Support Forum enacts the Socialization stage through anonymous peer story sharing. While anonymity removes the stigma barrier, it also removes accountability. Without active moderation, the forum risks accumulating misinformation, harmful coping suggestions, or content that normalizes destructive behaviors. The current architecture includes an `is_approved` moderation flag and an Admin Panel, but moderation is a human process — it introduces latency, inconsistency, and the possibility of both under-moderation (harmful content approved) and over-moderation (valid peer knowledge suppressed). The quality of tacit knowledge transferred through the Socialization layer is therefore variable in ways that the structured, validated taxonomy of the Externalization layer is not.

### 5.5 Scope Constraint: No Longitudinal Validation

The SMHWT was developed within the constraints of a capstone project. The KM framework has been theoretically grounded and architecturally implemented, but it has not been empirically validated against longitudinal student wellness data. Claims about the application's capacity to facilitate Internalization and active self-management are, at this stage, theoretically supported but not empirically demonstrated. A rigorous evaluation would require a controlled study measuring self-awareness outcomes before and after sustained app use — research that falls outside the scope and timeline of this project but represents the necessary next step for any deployment beyond the academic context.

---

## 11. APA References

- Almalki, M., Gray, K., & Sanchez, F. M. (2015). The use of self-quantification systems for personal health information: Big data management activities and prospects. *Health Information Science and Systems, 3*(Suppl 1), S1. https://doi.org/10.1186/2047-2501-3-S1-S1
- Fernández-Martin, F. D., Arco-Tirado, J. L., Villoria-Prieto, J., & Villena-Martínez, M. D. (2022). Stressors and coping strategies in university students. *International Journal of Environmental Research and Public Health, 19*(3), 1–15. https://doi.org/10.3390/ijerph19031485
- Freire, C., Ferradás, M. D. M., Valle, A., Núñez, J. C., & Vallejo, G. (2016). Profiles of psychological well-being and coping strategies among university students. *Frontiers in Psychology, 7*, 1554. https://doi.org/10.3389/fpsyg.2016.01554
- Huang, H. Y., & Bashir, M. (2017). Users' adoption of mental health apps: Examining the impact of information cues. *JMIR mHealth and uHealth, 5*(6), e83. https://doi.org/10.2196/mhealth.6827
- Lin, Y. M., & Chen, F. S. (2009). Academic stress inventory of students at universities and colleges of technology. *World Transactions on Engineering and Technology Education, 7*(2), 157–162.
- Nonaka, I., & Takeuchi, H. (1995). *The knowledge-creating company: How Japanese companies create the dynamics of innovation*. Oxford University Press.
- Nonaka, I. (1998). The concept of "Ba": Building a foundation for knowledge creation. *California Management Review, 40*(3), 40–54. https://doi.org/10.2307/41165942
- Wenger, E. (1998). *Communities of practice: Learning, meaning, and identity*. Cambridge University Press.
- Zhang, C., Yang, Y., & Liu, C. (2022). Knowledge management-based mental health service model for university students. *Sustainability, 14*(4), 2086. https://doi.org/10.3390/su14042086
- Zhong, L., Cao, J., & Xue, F. (2024). The paradox of convenience: How information overload in mHealth apps leads to medical service overuse. *Frontiers in Public Health, 12*, 1408998. https://doi.org/10.3389/fpubh.2024.1408998
