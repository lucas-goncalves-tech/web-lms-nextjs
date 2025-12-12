"use client";

import { apiClient } from "@/shared/lib/api/client";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { messageSchema } from "@/shared/schemas/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminQueryKeys } from "./query-keys";

export function useToggleStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await apiClient.patch(`/admin/users/${userId}/toggle-status`);
      return messageSchema.parse(res.data);
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.users.table(),
      });
      toast.success(result.message);
    },
  });
}
