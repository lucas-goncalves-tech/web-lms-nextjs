import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { coursesSchema } from "../schemas/courses";

export function useGetCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await apiClient.get("/courses");
      return coursesSchema.parse(response.data);
    },
  });
}
