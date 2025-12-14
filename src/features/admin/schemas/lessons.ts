import {
  zodDescriptionValidator,
  zodIntegerValidator,
  zodSlugValidator,
  zodTitleValidator,
} from "@/shared/validators/common-fields";
import { zodSafeString } from "@/shared/validators/string.validator";
import z from "zod";

export const lessonTableSchema = z.object({
  id: z.uuid(),
  courseId: z.uuid(),
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  seconds: zodIntegerValidator(),
  video: zodSafeString(),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator(),
  created: zodSafeString(),
});

export const lessonsTableSchema = z.array(lessonTableSchema);

const baseLessonSchema = {
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator(),
};
export const createLessonSchema = z.object({
  ...baseLessonSchema,
  video: z
    .instanceof(File, { message: "Arquivo de vídeo é obrigatório" })
    .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
    .refine(
      (file) => file.type.startsWith("video/"),
      "Arquivo deve ser um vídeo"
    ),
});

export const updateLessonSchema = z.object({
  ...baseLessonSchema,
  video: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
    .refine(
      (file) => file.type.startsWith("video/"),
      "Arquivo deve ser um vídeo"
    )
    .optional(),
});

export const videoPathSchema = z.object({
  path: z.string(),
  seconds: z.number().nonnegative(),
});

export type LessonTable = z.infer<typeof lessonTableSchema>;
export type CreateLesson = z.infer<typeof createLessonSchema>;
export type UpdateLesson = z.infer<typeof updateLessonSchema>;
