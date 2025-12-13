import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "./query-keys";

type Params = {
  courseSlug: string;
  lessonSlug: string;
};

export function useDeleteLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ courseSlug, lessonSlug }: Params) => {
      await apiClient.delete(
        `/admin/lessons/${courseSlug}/${lessonSlug}/delete`
      );
    },
    onSuccess: () => {
      toast.success("Aula deletada com sucesso");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllLessons(),
      });
    },
    onError: () => {
      toast.error("Error ao deletar aula");
    },
  });
}
