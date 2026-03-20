import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
  fullName: z.string(),
  roles: z.array(z.string()),
});

export type User = z.infer<typeof userSchema>;

export const userBasicSchema = z.object({
  id: z.number(),
  email: z.email(),
  fullName: z.string(),
});

export type UserBasic = z.infer<typeof userBasicSchema>;
