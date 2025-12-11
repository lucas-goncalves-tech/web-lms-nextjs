import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { lessonsSchema } from "../schemas/lesson";

export function useGetLessons(courseSlug: string) {
  return useQuery({
    queryKey: ["lessons", courseSlug],
    queryFn: async () => {
      const response = await apiClient.get(`/lessons/${courseSlug}`);
      return lessonsSchema.parse(response.data);
    },
  });
}
