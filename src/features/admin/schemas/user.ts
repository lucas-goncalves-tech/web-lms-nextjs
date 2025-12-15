import z from "zod";

export const userTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  isActive: z.number(),
  total: z.number(),
});

export const usersTableSchema = z.array(userTableSchema);

export type UserTable = z.infer<typeof userTableSchema>;
