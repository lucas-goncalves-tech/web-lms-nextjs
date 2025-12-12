import { z } from "zod";

export const courseFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
});

export const coursesFormSchema = z.array(courseFormSchema);

export type CourseForm = z.infer<typeof courseFormSchema>;
