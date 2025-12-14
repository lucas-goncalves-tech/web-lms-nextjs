import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import { courseKeys } from "@/features/course/hooks/query-keys";

interface CreateLessonRequest {
  slug: string;
  title: string;
  description: string;
  order: number;
  video: string;
  seconds: number;
}

export function useCreateLesson(courseSlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateLessonRequest) => {
      await apiClient.post(`/admin/lessons/${courseSlug}/new`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getAllLessons(courseSlug),
      });
    },
  });
}
