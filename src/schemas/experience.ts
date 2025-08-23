import { z } from "zod";

export const EXPERIENCE_TYPE = [
  "work",
  "volunteer",
  "school_activity",
  "project",
] as const;

export const TIME_COMMITMENT = [
  "part_time",
  "full_time",
  "seasonal",
  "one_time",
] as const;

export const CreateExperienceSchema = z.object({
  category: z.enum(EXPERIENCE_TYPE),
  title: z.string().min(2),
  organization: z.string().min(1),
  startDate: z.string().min(10),
  endDate: z.string().nullable().optional(),
  isOngoing: z.boolean().default(false),
  timeCommitment: z.enum(TIME_COMMITMENT),
  totalHours: z.number().int().min(0).optional(),
  description: z.string().min(10),
  responsibilities: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  metrics: z.record(z.any()).default({}),
  skills: z.array(z.string()).default([]),
  verificationUrl: z.string().url().optional().or(z.literal("")),
  supervisorName: z.string().optional(),
  canContact: z.boolean().default(false),
});

export type CreateExperience = z.infer<typeof CreateExperienceSchema>;


