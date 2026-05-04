# KM Analyst Reflection
## Student Mental Health & Wellness Tracker — Sprint 5
**Author:** Anthon Van B. Calban (@anthoncalban)
**Role:** Knowledge Management Analyst

---

When I first took on the KM Analyst role, I thought it was mainly about documentation—writing theoretical sections to accompany the technical work in the codebase. This project showed me that knowledge management is not just documentation; it is architecture. Every choice I made about tag vocabulary, taxonomy, and retrieval directly shaped what developers could build and how the application functioned.

The best example of this was the S3-KM-03 audit. In reviewing enzo-q’s migration files against km-architecture.md, I found that stressor_tags, coping_tags, and tags were unconstrained free-text arrays. Technically, the schema looked correct: the tables and columns were there. But from a KM perspective, the Combination stage was broken. Without a controlled vocabulary, the dashboard could not aggregate entries because the same idea could appear in countless different strings. Filing that GitHub Issue and seeing enzo-q implement the fix—adding the valid_tags lookup table, CHECK constraints, and GIN indexes—was when I realized KM decisions have direct technical consequences. The taxonomy I designed was not just theory; it became a database requirement.

The framework decision I am most confident about was choosing the SECI Model over Communities of Practice for the self-tracking layer. Research on stigma and labeling effects (Huang & Bashir, 2017) showed that communal frameworks are unsuitable for mental health data. The Peer Support Stories feature later confirmed this: by applying Communities of Practice only at the anonymous peer layer, we created a dual-framework system that was more coherent. Socialization happens through peer stories, while Externalization, Combination, and Internalization remain private. Each framework supports different types of knowledge under different disclosure conditions.

If I were to redo the project, I would study the limits of controlled vocabularies earlier. The taxonomy I built was academically grounded but static. I only noted this issue in the final sprint’s Limitations section, when it should have shaped the design from the start. A better approach would have been to allow students to suggest new tags for review and inclusion. A vocabulary that cannot evolve will eventually fail to represent users’ experiences, which in mental health contexts affects more than just data quality.

The most important lesson I will carry forward is the concept of the Ba. Nonaka’s idea—that knowledge creation requires an enabling environment—applies to software architecture as much as organizational theory. We did not build a mood tracker. We built a knowledge space. That distinction matters.
