import { useQuery } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import { apiClient } from "@/shared/lib/api/client";
import { usersTableSchema } from "../schemas/user";

export function useGetUsersTable() {
  return useQuery({
    queryKey: adminQueryKeys.users.table(),
    queryFn: async () => {
      const res = await apiClient.get("/admin/users");
      return usersTableSchema.parse(res.data);
    },
  });
}
