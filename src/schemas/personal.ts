import { z } from "zod";

// Core required personal information for minimum completion
export const BasicInfoSchema = z.object({
  // Legal names (required)
  legalFirstName: z.string().min(1, "Legal first name is required"),
  legalLastName: z.string().min(1, "Legal last name is required"),
  
  // Core contact info (required)
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  primaryEmail: z.string().email("Valid email is required"),
  primaryPhone: z.string().min(1, "Phone number is required"),
  
  // Permanent address (required)
  permanentAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zip: z.string().min(1, "ZIP code is required"),
    country: z.string().default("USA"),
  }),
  
  // Identity (required)
  genderIdentity: z.enum(["female", "male", "non-binary", "self-describe", "prefer-not-to-say"], {
    required_error: "Gender identity selection is required"
  }),
  genderSelfDescribe: z.string().optional(),
  pronouns: z.enum(["she-her", "he-him", "they-them", "other", "prefer-not-to-say"], {
    required_error: "Pronouns selection is required"
  }),
  pronounsSelfDescribe: z.string().optional(),
  
  // Optional enrichment
  preferredName: z.string().optional(),
  formerLegalNames: z.string().optional(),
  secondaryPhone: z.string().optional(),
  alternateAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  placeOfBirth: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
});

// Demographics & Background
export const DemographicsSchema = z.object({
  // Hispanic/Latino identification
  hispanicLatino: z.enum(["yes", "no", "prefer-not-to-say"]),
  hispanicBackground: z.enum(["mexican", "cuban", "puerto-rican", "other"]).optional(),
  hispanicOther: z.string().optional(),
  
  // Race/Ethnicity (multi-select)
  raceEthnicity: z.array(z.enum([
    "american-indian-alaska-native",
    "asian",
    "black-african-american", 
    "native-hawaiian-pacific-islander",
    "white",
    "other",
    "prefer-not-to-say"
  ])).default([]),
  raceOther: z.string().optional(),
  
  // Household context
  householdIncome: z.enum([
    "under-30k",
    "30k-60k", 
    "60k-100k",
    "100k-150k",
    "over-150k",
    "prefer-not-to-say"
  ]),
  householdSize: z.enum(["1-2", "3-4", "5-6", "7-plus"]),
  
  // Citizenship & Language
  citizenshipStatus: z.enum([
    "us-citizen",
    "permanent-resident", 
    "international-student",
    "other"
  ]),
  citizenshipOther: z.string().optional(),
  primaryLanguageHome: z.string().min(1, "Primary language is required"),
  otherLanguages: z.array(z.object({
    language: z.string(),
    proficiency: z.enum(["beginner", "conversational", "fluent", "native"])
  })).default([]),
  yearsInUS: z.number().optional(),
});

// Family Context  
export const FamilyContextSchema = z.object({
  // Living situation (required)
  livingSituation: z.enum([
    "both-parents",
    "single-parent",
    "grandparents", 
    "guardian",
    "other"
  ], { required_error: "Living situation is required" }),
  livingSituationOther: z.string().optional(),
  
  // Parent/Guardian 1 (required)
  parent1: z.object({
    relationship: z.string().min(1, "Relationship is required"),
    educationLevel: z.enum([
      "less-than-high-school",
      "high-school-diploma",
      "some-college",
      "associates-degree",
      "bachelors-degree",
      "masters-degree",
      "doctoral-degree",
      "professional-degree",
      "unknown"
    ], { required_error: "Education level is required" }),
    occupationCategory: z.enum([
      "management",
      "business-financial",
      "computer-mathematical",
      "architecture-engineering",
      "life-physical-social-science",
      "community-social-service",
      "legal",
      "education-training-library",
      "arts-design-entertainment-sports-media",
      "healthcare-practitioners-technical",
      "healthcare-support",
      "protective-service",
      "food-preparation-serving",
      "building-grounds-cleaning-maintenance",
      "personal-care-service",
      "sales-related",
      "office-administrative-support",
      "farming-fishing-forestry",
      "construction-extraction",
      "installation-maintenance-repair",
      "production",
      "transportation-material-moving",
      "military-specific",
      "unemployed",
      "retired",
      "other"
    ], { required_error: "Occupation category is required" }),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
  }),
  
  // Parent/Guardian 2 (optional)
  parent2: z.object({
    relationship: z.string().optional(),
    educationLevel: z.enum([
      "less-than-high-school",
      "high-school-diploma", 
      "some-college",
      "associates-degree",
      "bachelors-degree",
      "masters-degree", 
      "doctoral-degree",
      "professional-degree",
      "unknown"
    ]).optional(),
    occupationCategory: z.enum([
      "management",
      "business-financial",
      "computer-mathematical",
      "architecture-engineering",
      "life-physical-social-science",
      "community-social-service",
      "legal",
      "education-training-library",
      "arts-design-entertainment-sports-media",
      "healthcare-practitioners-technical",
      "healthcare-support",
      "protective-service",
      "food-preparation-serving",
      "building-grounds-cleaning-maintenance",
      "personal-care-service",
      "sales-related",
      "office-administrative-support",
      "farming-fishing-forestry",
      "construction-extraction",
      "installation-maintenance-repair",
      "production",
      "transportation-material-moving",
      "military-specific",
      "unemployed",
      "retired",
      "other"
    ]).optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
  }).optional(),
  
  // Siblings & family enrichment (optional)
  numberOfSiblings: z.number().min(0).optional(),
  siblingsEducation: z.string().optional(),
  
  // Auto-calculated but can be overridden
  firstGenerationStatus: z.enum(["yes", "no", "partial"]).optional(),
});

// Communications & Consent
export const CommunicationsSchema = z.object({
  contactPreference: z.enum(["sms", "email", "whatsapp", "none"]).default("none"),
  marketingOptIn: z.boolean().default(false),
  consentAcknowledged: z.boolean().refine((val) => val === true, {
    message: "You must acknowledge the consent policy to continue"
  }),
});

// Complete schema combining all sections
export const PersonalCompleteSchema = z.object({
  basicInfo: BasicInfoSchema,
  demographics: DemographicsSchema,
  familyContext: FamilyContextSchema,  
  communications: CommunicationsSchema,
});

export type BasicInfo = z.infer<typeof BasicInfoSchema>;
export type Demographics = z.infer<typeof DemographicsSchema>;
export type FamilyContext = z.infer<typeof FamilyContextSchema>;
export type Communications = z.infer<typeof CommunicationsSchema>;
export type PersonalComplete = z.infer<typeof PersonalCompleteSchema>;



