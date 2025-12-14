import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminQueryKeys } from "./query-keys";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/api/errors";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      await apiClient.delete(`/admin/users/${userId}/delete`);
    },
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.usersBase(),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
