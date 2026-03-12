import z from "zod";
import { productBasicSchema } from "../product/basic";

export const categoryExtendedSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  products: z.array(productBasicSchema.clone()).default([]),
});

export type CategoryExtended = z.infer<typeof categoryExtendedSchema>;
