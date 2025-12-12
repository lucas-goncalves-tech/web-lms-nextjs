import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserEditForm } from "../schemas/user-edit";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { adminQueryKeys } from "./query-keys";

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: UserEditForm) => {
      const response = await apiClient.put(`/admin/users/${user.id}/update`, {
        name: user.name,
        role: user.role,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Usuário editado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.users.table(),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
