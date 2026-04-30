# Knowledge Management Architecture

## 1. Executive Summary

This document defines the Knowledge Taxonomy and Retrieval Requirements for the Student Mental Health & Wellness Tracker. It applies the **SECI Model** to ensure that raw user data is transformed into actionable self-knowledge. Our application functions as a **"Ba"** (knowledge space) where interaction bridges the gap between mere self-tracking and true self-quantification.

The application is designed around the full SECI spiral — from private mood logging and journaling (Externalization), through dashboard analytics (Combination), to reflective goal-setting (Internalization). It also includes a **Peer Support Forum** — a safe, anonymous space where students share daily experiences, access coping resources, and find peer support stories — which enacts the **Socialization** stage of the SECI model. The forum is grounded in **Communities of Practice** theory (Wenger, 1998), applied at the peer-support layer only, while the individual self-tracking features retain the SECI model as their primary framework.

---

## 2. Knowledge Taxonomy

The following taxonomy is based on validated academic research regarding student stressors and coping strategies.

### 2.1 Stressors and Triggers (Externalization Phase)

These tags allow students to convert tacit, unspoken distress into explicit, measurable units.

| Broad Category | Specific Tags for Database | Research Source |
| :--- | :--- | :--- |
| **Academic** | #WorkOverload, #TestStress, #EvaluationStage, #TeacherStress | Lin & Chen (2009) |
| **Social** | #PeerStress, #PerformanceAnxiety, #InterpersonalRelationships | Yano et al. (2021) |
| **Institutional** | #Isolation, #TransitionAdaptation, #AdministrativeProcesses | Lister et al. (2023) |
| **Personal** | #SelfExpectation, #ResultsStress, #Perfectionism | Freire et al. (2016) |
| **Digital** | #InformationOverload, #InternetAddiction, #TimeManagement | Zhong et al. (2024) |

### 2.2 Coping & Behavioral Responses (Combination Phase)

These categories help the system organize fragmented data into a complex representation of the student's well-being.

| Response Category | Specific Tags for Database | Description |
| :--- | :--- | :--- |
| **Problem-Centered** | #ActiveCoping, #Planning, #PositiveReframing | Cognitive/behavioral efforts to resolve a situation. |
| **Emotion-Centered** | #Venting, #Humor, #Acceptance | Actions aimed at reducing emotional distress. |
| **Avoidance** | #Denial, #SelfDistraction, #Disengagement | Distancing oneself from stressors/emotions. |
| **Support Seeking** | #InstrumentalSupport, #EmotionalSupport | Reaching out to others for advice or comfort. |

### 2.3 Peer Forum Content Tags (Socialization Phase)

These tags classify shared peer stories and support posts in the forum. They enable students to find relevant peer experiences and facilitate the transfer of tacit coping knowledge through shared narrative — the defining mechanism of Socialization in the SECI model.

| Content Category | Specific Tags for Database | Description |
| :--- | :--- | :--- |
| **Shared Experience** | #MyStory, #RelatableMoment, #YouAreNotAlone | Personal narratives shared to normalize student struggles. |
| **Peer Advice** | #WhatHelpedMe, #TipFromAStudent, #LessonsLearned | Practical suggestions drawn from lived experience. |
| **Resource Sharing** | #AppRecommendation, #CampusResource, #HelpfulReading | Pointers to tools, services, or materials found useful. |
| **Community Support** | #CheckingIn, #NeedSupport, #PositiveVibes | Posts oriented toward emotional connection and solidarity. |

---

## 3. Full SECI-to-Feature Mapping

| SECI Stage | KM Mechanism | App Feature | Description |
| :--- | :--- | :--- | :--- |
| **Socialization** | Tacit → Tacit (shared experience) | **Peer Support Forum** | Students share anonymous stories and peer advice, transferring tacit coping knowledge through lived narrative. Grounded in Communities of Practice (Wenger, 1998). |
| **Externalization** | Tacit → Explicit | Mood Tracker + Journal with Tags | Students convert internal emotional states into structured logs and tagged journal entries using the research-based taxonomy (Sections 2.1–2.2). |
| **Combination** | Explicit + Explicit | Dashboard & Analytics | Aggregates mood logs, sleep data, stressor tags, and coping tags into trend visualizations and cross-indicator patterns. |
| **Internalization** | Explicit → Tacit | Reflective Insights + Wellness Goals | Students absorb dashboard trends as renewed self-understanding and commit to behavioral goals, closing the SECI spiral. |

---

## 4. Retrieval Requirements

To facilitate the **Combination** and **Internalization** phases, the Developer (@enzo-q) must implement the following logic in the Supabase schema:

1. **Tag-Based Filtering:** The system must allow users to query logs by specific stressor tags (e.g., "Show all entries tagged #TestStress").
2. **Data Aggregation:** The architecture must facilitate the synthesis of fragmented mood tags with disparate datasets such as sleep quality or academic performance.
3. **Pattern Identification:** The retrieval design must allow the student to identify latent triggers, such as how #PeerStress might correlate with diminished sleep quality.
4. **Forum Retrieval:** The forum must support filtering posts by `forum_tags` to allow students to find peer stories relevant to their current stressor. Anonymous posts must never expose `user_id` in any query result.

---

## 5. Why Two Frameworks (SECI + Communities of Practice)

The architecture selected the **SECI Model** as its primary framework because mental health self-tracking is a private, individual process — social stigma and labeling effects (Huang & Bashir, 2017) make communal knowledge-sharing inappropriate for the core journaling and mood-logging features.

The Peer Support Forum introduces a **bounded application of Communities of Practice** at the social layer only. The forum is:
- **Anonymous** — removing the stigma barrier that makes CoP unsuitable for the private layers
- **Opt-in** — students engage with peer content on their own terms, after they have already externalized their own experience privately
- **Tag-structured** — forum content is organized by the same taxonomy that governs private logs, ensuring semantic consistency across both layers

This dual-framework design means the SECI spiral runs at the **individual level** (private mood logs → dashboard → goals) while Communities of Practice operates at the **social layer** (forum stories → peer knowledge transfer → normalized help-seeking behavior). The two frameworks are complementary, not competing.

---

## 6. References

- Almalki, M., Gray, K., & Sanchez, F. M. (2015). The use of self-quantification systems for personal health information. *Health Information Science and Systems*.
- Huang, H. Y., & Bashir, M. (2017). Users' adoption of mental health apps: Examining the impact of information cues. *JMIR mHealth and uHealth, 5*(6), e83.
- Lin, Y. M., & Chen, F. S. (2009). Academic stress inventory of students at universities and colleges of technology. *World Transactions on Engineering and Technology Education*.
- Nonaka, I., & Takeuchi, H. (1995). *The Knowledge-Creating Company*. Oxford University Press.
- Wenger, E. (1998). *Communities of Practice: Learning, Meaning, and Identity*. Cambridge University Press.
- Zhang, C., Yang, Y., & Liu, C. (2022). Knowledge management-based mental health service model. *Sustainability*.
- Zhong, L., Cao, J., & Xue, F. (2024). The paradox of convenience: How information overload in mHealth apps leads to medical service overuse. *Frontiers in Public Health, 12*, 1408998.
