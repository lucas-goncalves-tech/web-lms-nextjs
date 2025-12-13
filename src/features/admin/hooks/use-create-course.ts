import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/client";
import { CreateCourse } from "../schemas/create-course";
import { adminQueryKeys } from "./query-keys";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourse) => {
      await apiClient.post("/admin/courses/new", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.courses.table(),
      });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.courses.all() });
    },
  });
}
