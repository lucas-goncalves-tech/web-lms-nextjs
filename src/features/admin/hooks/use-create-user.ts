import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminCreateUser } from "../schemas/user-create";
import { toast } from "sonner";
import { getErrorMessage } from "@/shared/lib/api/errors";
import { adminQueryKeys } from "./query-keys";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: AdminCreateUser) => {
      await apiClient.post("/admin/users/new", user);
    },
    onSuccess: () => {
      toast.success("Usuário criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.getAllUsers(),
      });
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  });
}
