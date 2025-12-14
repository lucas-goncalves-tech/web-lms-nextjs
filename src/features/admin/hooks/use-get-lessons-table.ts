import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import { lessonsTableSchema } from "../schemas/lessons";

export function useGetLessonsTable(courseSlug: string) {
  return useQuery({
    queryKey: adminQueryKeys.getAllLessons(courseSlug),
    queryFn: async () => {
      const response = await apiClient.get(`/admin/lessons/${courseSlug}`);
      return lessonsTableSchema.parse(response.data);
    },
  });
}
