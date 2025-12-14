import { apiClient } from "@/shared/lib/api/client";
import { useMutation } from "@tanstack/react-query";
import { videoPathSchema } from "../schemas/lessons";

export function useUploadVideo() {
  return useMutation({
    mutationFn: async (video: File) => {
      const res = await apiClient.post("/admin/lessons/upload-video", video, {
        headers: {
          "Content-Type": "application/octet-stream",
          "x-filename": video.name,
        },
      });

      return videoPathSchema.parse(res.data);
    },
  });
}
