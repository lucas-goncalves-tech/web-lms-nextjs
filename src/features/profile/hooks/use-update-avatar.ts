import { avatarKeys } from "@/shared/hooks/use-avatar";
import { apiClient } from "@/shared/lib/api/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (image: File) => {
      await apiClient.put("/user/avatar/update", image, {
        headers: {
          "Content-Type": "application/octet-stream",
          "x-filename": image.name,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: avatarKeys.unique(),
      });
    },
    onError: () => {
      toast.error(
        "Erro de conexão. Verifique sua internet ou se o arquivo é maior que 3mb."
      );
    },
  });
}
