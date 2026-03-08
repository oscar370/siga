import z from "zod";

export const categoryCreateSchema = z.object({
  name: z.string().min(1, "Requerido").max(50, "Máximo 50 caracteres"),
  description: z.string(),
});

export type CategoryCreate = z.infer<typeof categoryCreateSchema>;

export const categoryBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
});

export type CategoryBasic = z.infer<typeof categoryBasicSchema>;

export const categoriesBasicSchema = z.array(categoryBasicSchema.clone());

export type CategoriesBasicSchema = z.infer<typeof categoriesBasicSchema>;
