import { lessonSchema } from "@/features/course/schemas/lesson";
import z from "zod";

export const uniqueLessonSchema = lessonSchema.extend({
  prevLesson: z.string().nullable(),
  nextLesson: z.string().nullable(),
  completed: z.string().nullable(),
  videoUrl: z.string(),
});

export type UniqueLesson = z.infer<typeof uniqueLessonSchema>;
