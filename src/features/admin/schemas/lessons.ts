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

// Schema para CRIAR aula (video é File obrigatório)
export const createLessonSchema = z.object({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  seconds: zodIntegerValidator(),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator(),
  video: z
    .instanceof(File, { message: "Arquivo de vídeo é obrigatório" })
    .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
    .refine(
      (file) => file.type.startsWith("video/"),
      "Arquivo deve ser um vídeo"
    ),
});

// Schema para EDITAR aula (video é opcional - só envia se quiser trocar)
export const editLessonSchema = z.object({
  slug: zodSlugValidator(),
  title: zodTitleValidator(),
  seconds: zodIntegerValidator(),
  description: zodDescriptionValidator(),
  order: zodIntegerValidator(),
  video: z
    .instanceof(File)
    .refine((file) => file.size > 0, "Arquivo não pode estar vazio")
    .refine(
      (file) => file.type.startsWith("video/"),
      "Arquivo deve ser um vídeo"
    )
    .optional(),
});

export type LessonTable = z.infer<typeof lessonTableSchema>;
export type CreateLesson = z.infer<typeof createLessonSchema>;
export type EditLesson = z.infer<typeof editLessonSchema>;
