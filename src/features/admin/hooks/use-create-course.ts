import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api/client";
import { CreateCourse } from "../schemas/create-course";
import { adminQueryKeys } from "./query-keys";
import { myCoursesKeys } from "@/features/my-courses/hooks/query-keys";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/api/errors";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCourse) => {
      await apiClient.post("/admin/courses/new", data);
    },
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllCourses(),
      });
      queryClient.invalidateQueries({
        queryKey: myCoursesKeys.getAllCourses(),
      });
      toast.success(`${variable.title} criado com sucesso`);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
