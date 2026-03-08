import z from "zod";
import { categoryBasicSchema } from "./category";
import { unityOfMeasureBasicSchema } from "./unity-of-measure";

export const productCreateSchema = z.object({
  name: z.string().min(1, "Requerido").max(50, "Máximo 50 caracteres"),
  sku: z.string().min(1, "Requerido").max(50, "Máximo 50 caracteres"),
  description: z.string().max(200, "Máximo 200 caracteres"),
  basePrice: z.coerce
    .number("Introduce un número válido")
    .min(0.1, "El precio debe ser mayor a 0"),
  categoryId: z.coerce.number(),
  unityOfMeasureId: z.coerce.number("Escoge una unidad de medida"),
});

export type ProductCreate = z.infer<typeof productCreateSchema>;

export const productBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  description: z.string(),
  basePrice: z.number(),
  categoryId: z.number(),
  unityOfMeasureId: z.number(),
});

export type ProductBasic = z.infer<typeof productBasicSchema>;

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
