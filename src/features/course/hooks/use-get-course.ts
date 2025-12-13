import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { courseKeys } from "./query-keys";

const courseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  created: z.string(),
  totalSeconds: z.number(),
  totalLessons: z.number(),
});

export function useGetCourse(courseSlug: string) {
  return useQuery({
    queryKey: courseKeys.course.getCourse(courseSlug),
    queryFn: async () => {
      const response = await apiClient.get(`/courses/${courseSlug}`);
      return courseSchema.parse(response.data);
    },
  });
}
