import { z } from "zod";

export const courseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  totalSeconds: z.number(),
  totalLessons: z.number(),
  completedLessons: z.number(),
  created: z.string(),
});

export const coursesSchema = z.array(courseSchema);

export type Course = z.infer<typeof courseSchema>;
