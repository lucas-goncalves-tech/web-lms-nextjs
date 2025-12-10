import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginSchema } from "../schemas/login";
import { apiClient } from "@/shared/lib/api/client";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await apiClient.post("/auth", data);
      return response.data;
    },
    onSuccess: () => {
      // Invalida o cache do usuário para forçar refetch
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};
