import z from "zod";

export const certificateSchema = z.object({
  id: z.string(),
  name: z.string(),
  courseId: z.string(),
  title: z.string(),
  totalSeconds: z.number(),
  totalLessons: z.number(),
  completed: z.string(),
});

export type Certificate = z.infer<typeof certificateSchema>;
