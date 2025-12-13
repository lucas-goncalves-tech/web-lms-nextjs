import z from "zod";

export const lessonSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  slug: z.string(),
  title: z.string(),
  seconds: z.number(),
  video: z.string(),
  description: z.string(),
  order: z.number(),
  created: z.string(),
  completed: z.string().nullable(),
});
export const lessonsSchema = z.array(lessonSchema);

export type Lesson = z.infer<typeof lessonSchema>;
