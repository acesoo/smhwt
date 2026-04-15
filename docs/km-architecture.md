# Knowledge Management Architecture

## 1. Executive Summary
This document defines the Knowledge Taxonomy and Retrieval Requirements for the Student Mental Health & Wellness Tracker. It applies the **SECI Model** to ensure that raw user data is transformed into actionable self-knowledge. Our application functions as a **"Ba"** (knowledge space) where interaction bridges the gap between mere self-tracking and true self-quantification.

## 2. Knowledge Taxonomy (S2-KM-01)
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

## 3. Retrieval Requirements (S2-KM-02)
To facilitate the **Combination** and **Internalization** phases, the Developer (@enzo-q) must implement the following logic in the Supabase schema:

1. **Tag-Based Filtering:** The system must allow users to query logs by specific stressor tags (e.g., "Show all entries tagged #TestStress").
2. **Data Aggregation:** The architecture must facilitate the synthesis of fragmented mood tags with disparate datasets such as sleep quality or academic performance.
3. **Pattern Identification:** The retrieval design must allow the student to identify latent triggers, such as how #PeerStress might correlate with diminished sleep quality.

## 4. References (APA 7th Edition)
* Almalki, M., Gray, K., & Sanchez, F. M. (2015). The use of self-quantification systems for personal health information. *Health Information Science and Systems*.
* Lin, Y. M., & Chen, F. S. (2009). Academic stress inventory of students at universities and colleges of technology. *World Transactions on Engineering and Technology Education*.
* Zhang, C., Yang, Y., & Liu, C. (2022). Knowledge management-based mental health service model. *Sustainability*.