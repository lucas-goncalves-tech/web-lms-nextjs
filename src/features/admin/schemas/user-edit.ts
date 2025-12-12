import z from "zod";

export const userEditSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});

export type UserEditForm = z.infer<typeof userEditSchema>;
