import { zodPasswordValidator } from "@/validators/common-fields.validator";
import { zodSafeEmail } from "@/validators/email.validator";
import { z } from "zod";

export const loginSchema = z.object({
  email: zodSafeEmail(),
  password: zodPasswordValidator(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
