import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  email: z.string(),
  subscriptions: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;
