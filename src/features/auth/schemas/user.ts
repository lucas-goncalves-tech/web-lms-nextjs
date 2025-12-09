import { zodSafeEmail } from "@/validators/email";
import { zodSafeString } from "@/validators/string.validator";
import z from "zod";

export const userSchema = z.object({
  name: zodSafeString(),
  email: zodSafeEmail(),
  role: z.enum(["ADMIN", "USER"]),
});

export type User = z.infer<typeof userSchema>;
