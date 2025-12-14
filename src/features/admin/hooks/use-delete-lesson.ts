import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "./query-keys";

export function useDeleteLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (lessonSlug: string) => {
      await apiClient.delete(
        `/admin/lessons/${courseSlug}/${lessonSlug}/delete`
      );
    },
    onSuccess: () => {
      toast.success("Aula deletada com sucesso");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllLessons(courseSlug),
      });
    },
    onError: () => {
      toast.error("Error ao deletar aula");
    },
  });
}
