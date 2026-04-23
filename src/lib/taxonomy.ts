/**
 * Knowledge Taxonomy Constants
 * Source: /docs/km-architecture.md (KM Analyst deliverable)
 *
 * These tag lists are the single source of truth for the taxonomy used
 * across the Mood Log form, Journal form, Search filters, and any future
 * analytics. If the KM Analyst updates km-architecture.md, update here too.
 */

export const STRESSOR_TAGS = [
  "#TestStress",
  "#WorkOverload",
  "#PeerStress",
  "#Isolation",
  "#SelfExpectation",
  "#TimeManagement",
  "#FinancialStress",
  "#FamilyPressure",
] as const;

export const COPING_TAGS = [
  "#ActiveCoping",
  "#Venting",
  "#Planning",
  "#SelfDistraction",
  "#Acceptance",
  "#SeekingSupport",
  "#Mindfulness",
] as const;

export const ACADEMIC_IMPACT_OPTIONS = [
  { value: "None", label: "None" },
  { value: "Minor", label: "Minor" },
  { value: "Moderate", label: "Moderate" },
  { value: "Severe", label: "Severe" },
] as const;

export type StressorTag = (typeof STRESSOR_TAGS)[number];
export type CopingTag = (typeof COPING_TAGS)[number];
export type AcademicImpact = "None" | "Minor" | "Moderate" | "Severe";