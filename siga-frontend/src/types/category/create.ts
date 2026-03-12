import z from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "Requerido").max(50, "Máximo 50 caracteres"),
  description: z.string().nullable(),
});

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;
