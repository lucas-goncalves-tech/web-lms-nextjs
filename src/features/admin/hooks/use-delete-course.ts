import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "./query-keys";

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseSlug: string) => {
      await apiClient.delete(`/admin/courses/${courseSlug}/delete`);
    },
    onSuccess: () => {
      toast.success("Curso deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.courses.all(),
      });
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.courses.table(),
      });
    },
    onError: () => {
      toast.error("Erro ao deletar curso");
    },
  });
}
