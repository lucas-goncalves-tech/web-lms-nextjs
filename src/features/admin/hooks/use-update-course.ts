import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "./query-keys";
import { myCoursesKeys } from "@/features/my-courses/hooks/query-keys";

type UpdateCourseData = {
  title: string;
  description: string;
};

export function useUpdateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      courseSlug,
      data,
    }: {
      courseSlug: string;
      data: UpdateCourseData;
    }) => {
      await apiClient.put(`/admin/courses/${courseSlug}/update`, data);
    },
    onSuccess: () => {
      toast.success("Curso atualizado com sucesso");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllCourses(),
      });
      queryClient.invalidateQueries({
        queryKey: myCoursesKeys.getAllCourses(),
      });
    },
    onError: () => {
      toast.error("Erro ao atualizar curso");
    },
  });
}
