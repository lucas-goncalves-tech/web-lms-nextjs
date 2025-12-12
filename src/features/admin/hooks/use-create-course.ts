import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/client";
import { CreateCourse } from "../schemas/create-course";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourse) => {
      await apiClient.post("/admin/courses", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
}
