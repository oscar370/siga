import z from "zod";

export const categoryBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
});

export type CategoryBasic = z.infer<typeof categoryBasicSchema>;

export const categoriesBasicSchema = z.array(categoryBasicSchema.clone());

export type CategoriesBasicSchema = z.infer<typeof categoriesBasicSchema>;
