import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "./query-keys";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { myCoursesKeys } from "@/features/my-courses/hooks/query-keys";

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseSlug: string) => {
      await apiClient.delete(`/admin/courses/${courseSlug}/delete`);
    },
    onSuccess: (_, courseSlug) => {
      toast.success(`Curso "${courseSlug}" deletado com sucesso`);
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllCourses(),
      });
      queryClient.invalidateQueries({
        queryKey: myCoursesKeys.getAllCourses(),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
