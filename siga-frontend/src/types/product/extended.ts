import z from "zod";
import { categoryBasicSchema } from "../category/basic";
import { unityOfMeasureBasicSchema } from "../unity-of-measure/unity-of-measure-basic";

export const productExtendedSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  description: z.string(),
  basePrice: z.number(),
  categoryId: z.number(),
  unityOfMeasureId: z.number(),
  category: categoryBasicSchema.clone(),
  unityOfMeasure: unityOfMeasureBasicSchema.clone(),
});

export type ProductExtended = z.infer<typeof productExtendedSchema>;

export const productsExtendedSchema = z.array(productExtendedSchema.clone());

export type ProductsExtended = z.infer<typeof productsExtendedSchema>;
