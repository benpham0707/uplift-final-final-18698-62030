import { z } from "zod";

export const PersonalCompleteSchema = z.object({
  basics: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    preferredName: z.string().optional(),
    pronouns: z.string().optional(),
    dateOfBirth: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    location: z.object({
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      country: z.string().default("USA"),
    }),
  }),
  school: z.object({
    name: z.string().min(1),
    type: z.string().min(1),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().default("USA"),
  }),
  background: z.object({
    firstGen: z.enum(["yes", "no", "unsure"]).default("unsure"),
    languages: z.array(z.string()).default([]),
    workHoursPerWeek: z.number().int().min(0).max(80).optional(),
    caregiving: z.boolean().optional(),
    immigrationContext: z.string().optional(),
  }),
  communications: z.object({
    contactPreference: z.enum(["sms", "email", "whatsapp", "none"]).default("none"),
    marketingOptIn: z.boolean().default(false),
    guardian: z
      .object({ name: z.string().optional(), email: z.string().email().optional() })
      .optional(),
    consentAcknowledged: z.boolean().default(false),
  }),
});

export type PersonalComplete = z.infer<typeof PersonalCompleteSchema>;


