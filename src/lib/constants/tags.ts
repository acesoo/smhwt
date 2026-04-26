// =============================================================
// KM Taxonomy: Research-Based Tag Vocabulary
// Source: docs/km-architecture.md (S3-KM-03)
// DO NOT accept free-text tags — always select from these lists.
// =============================================================

// --- 2.1 Stressor Tags (Externalization Phase) ----------------

export const STRESSOR_TAGS = [
  // Academic — Lin & Chen (2009)
  "#WorkOverload",
  "#TestStress",
  "#EvaluationStage",
  "#TeacherStress",

  // Social — Yano et al. (2021)
  "#PeerStress",
  "#PerformanceAnxiety",
  "#InterpersonalRelationships",

  // Institutional — Lister et al. (2023)
  "#Isolation",
  "#TransitionAdaptation",
  "#AdministrativeProcesses",

  // Personal — Freire et al. (2016)
  "#SelfExpectation",
  "#ResultsStress",
  "#Perfectionism",

  // Digital — Zhong et al. (2024)
  "#InformationOverload",
  "#InternetAddiction",
  "#TimeManagement",
] as const;

export type StressorTag = (typeof STRESSOR_TAGS)[number];

// --- 2.2 Coping & Behavioral Response Tags (Combination Phase) --

export const COPING_TAGS = [
  // Problem-Centered
  "#ActiveCoping",
  "#Planning",
  "#PositiveReframing",

  // Emotion-Centered
  "#Venting",
  "#Humor",
  "#Acceptance",

  // Avoidance
  "#Denial",
  "#SelfDistraction",
  "#Disengagement",

  // Support Seeking
  "#InstrumentalSupport",
  "#EmotionalSupport",
] as const;

export type CopingTag = (typeof COPING_TAGS)[number];

// --- Combined export for journal_entries.tags ------------------

export const ALL_TAGS = [...STRESSOR_TAGS, ...COPING_TAGS] as const;
export type WellnessTag = StressorTag | CopingTag;

// --- Grouped for UI multi-select rendering --------------------

export const STRESSOR_TAG_GROUPS = [
  {
    category: "Academic",
    tags: ["#WorkOverload", "#TestStress", "#EvaluationStage", "#TeacherStress"] as StressorTag[],
  },
  {
    category: "Social",
    tags: ["#PeerStress", "#PerformanceAnxiety", "#InterpersonalRelationships"] as StressorTag[],
  },
  {
    category: "Institutional",
    tags: ["#Isolation", "#TransitionAdaptation", "#AdministrativeProcesses"] as StressorTag[],
  },
  {
    category: "Personal",
    tags: ["#SelfExpectation", "#ResultsStress", "#Perfectionism"] as StressorTag[],
  },
  {
    category: "Digital",
    tags: ["#InformationOverload", "#InternetAddiction", "#TimeManagement"] as StressorTag[],
  },
];

export const COPING_TAG_GROUPS = [
  {
    category: "Problem-Centered",
    tags: ["#ActiveCoping", "#Planning", "#PositiveReframing"] as CopingTag[],
  },
  {
    category: "Emotion-Centered",
    tags: ["#Venting", "#Humor", "#Acceptance"] as CopingTag[],
  },
  {
    category: "Avoidance",
    tags: ["#Denial", "#SelfDistraction", "#Disengagement"] as CopingTag[],
  },
  {
    category: "Support Seeking",
    tags: ["#InstrumentalSupport", "#EmotionalSupport"] as CopingTag[],
  },
];