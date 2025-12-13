import { apiClient } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { coursesFormSchema } from "../schemas/course-form";
import { adminQueryKeys } from "./query-keys";

export function useGetCoursesTable() {
  return useQuery({
    queryKey: adminQueryKeys.courses.all(),
    queryFn: async () => {
      const response = await apiClient.get("/admin/courses");
      return coursesFormSchema.parse(response.data);
    },
  });
}
