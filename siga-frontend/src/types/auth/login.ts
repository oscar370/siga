import z from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type TLogin = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  tokenType: z.string(),
  accessToken: z.string(),
  expiresIn: z.number(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;
