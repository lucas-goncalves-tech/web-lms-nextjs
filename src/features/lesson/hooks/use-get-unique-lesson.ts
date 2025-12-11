import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { uniqueLessonSchema } from "../schema/unique-lesson";

export function useGetUniqueLesson(courseSlug: string, lessonSlug: string) {
  return useQuery({
    queryKey: ["unique-lesson", courseSlug, lessonSlug],
    queryFn: async () => {
      const response = await apiClient.get(
        `/lessons/${courseSlug}/${lessonSlug}`
      );
      return uniqueLessonSchema.parse(response.data);
    },
  });
}
