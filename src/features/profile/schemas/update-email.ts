import { zodSafeEmail } from "@/shared/validators/email";
import { z } from "zod";

export const updateEmailSchema = z.strictObject({
  email: zodSafeEmail(),
});

export type UpdateEmail = z.infer<typeof updateEmailSchema>;
