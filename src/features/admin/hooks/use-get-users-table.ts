import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import { apiClient } from "@/shared/lib/api/client";
import { usersTableSchema } from "../schemas/user";

export type UsersTableParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export function useGetUsersTable(params: UsersTableParams = {}) {
  const { search = "", page = 1, limit = 10 } = params;

  return useQuery({
    queryKey: adminQueryKeys.getAllUsers({ search, page, limit }),
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (search) queryParams.set("search", search);
      queryParams.set("page", String(page));
      queryParams.set("limit", String(limit));

      const res = await apiClient.get(`/admin/users?${queryParams.toString()}`);
      return usersTableSchema.parse(res.data);
    },
  });
}
