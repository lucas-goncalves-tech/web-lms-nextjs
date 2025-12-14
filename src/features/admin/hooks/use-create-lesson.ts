import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import { courseKeys } from "@/features/course/hooks/query-keys";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/api/errors";

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
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getAllLessons(courseSlug),
      });
      queryClient.invalidateQueries({
        queryKey: courseKeys.getCourse(courseSlug),
      });
      toast.success(`Aula "${variable.title}" criada com sucesso`);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
