import { apiClient } from "@/shared/lib/api/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AVATAR_URL = `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`;

export const avatarKeys = {
  unique: () => ["avatar"] as const,
};

export function useAvatar() {
  return useQuery({
    queryKey: avatarKeys.unique(),
    queryFn: async () => {
      const response = await apiClient.get("/user/avatar", {
        responseType: "blob",
      });
      return URL.createObjectURL(response.data) ?? null;
    },
    staleTime: Infinity,
  });
}
