import { z } from "zod";

export const CompleteAssessmentSchema = z.object({
  academicLevel: z.string().min(1),
  gpa: z.string().optional(),
  goals: z.array(z.string()).default([]),
  challenges: z.array(z.string()).default([]),
  financialBand: z.enum(["high", "moderate", "low", "unknown"]) 
});

export type CompleteAssessment = z.infer<typeof CompleteAssessmentSchema>;



