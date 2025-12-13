import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/client";
import { Lesson } from "../schemas/lesson";
import { toast } from "sonner";
import { courseKeys } from "./query-keys";
import { myCoursesKeys } from "@/features/my-courses/hooks/query-keys";
import { lessonKeys } from "@/features/lesson/hooks/query-keys";
import { certificatesKeys } from "@/features/certificates/hooks/query-key";

export function useResetCourseProgress(courseSlug: string) {
  const queryClient = useQueryClient();
  const queryKey = courseKeys.getAllLessons(courseSlug);

  return useMutation({
    mutationFn: async () => {
      await apiClient.delete(`/lessons/${courseSlug}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousLessons = queryClient.getQueryData<Lesson[]>(queryKey);

      if (previousLessons) {
        queryClient.setQueryData<Lesson[]>(
          queryKey,
          previousLessons.map((lesson) => ({ ...lesson, completed: null }))
        );
      }

      return { previousLessons };
    },
    onError: (_err, _variables, context) => {
      toast.error("Erro ao resetar progresso do curso");
      if (context?.previousLessons) {
        queryClient.setQueryData(queryKey, context.previousLessons);
      }
    },
    onSettled: () => {
      toast.success("Progresso do curso resetado com sucesso");
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: myCoursesKeys.courses.all() });
      queryClient.invalidateQueries({
        queryKey: lessonKeys.allUnique(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: certificatesKeys.all(),
      });
    },
  });
}
