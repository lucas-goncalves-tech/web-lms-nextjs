import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/client";
import { CreateCourse } from "../schemas/create-course";
import { adminQueryKeys } from "./query-keys";
import { myCoursesKeys } from "@/features/my-courses/hooks/query-keys";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourse) => {
      await apiClient.post("/admin/courses/new", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllCourses(),
      });
      queryClient.invalidateQueries({
        queryKey: myCoursesKeys.getAllCourses(),
      });
    },
  });
}
