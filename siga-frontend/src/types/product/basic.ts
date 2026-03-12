import z from "zod";

export const productBasicSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Requerido").max(50, "Máximo 50 caracteres"),
  sku: z.string().min(1, "Requerido").max(50, "Máximo 50 caracteres"),
  description: z.string().max(200, "Máximo 200 caracteres"),
  basePrice: z.coerce
    .number("Introduce un número válido")
    .min(0.1, "El precio debe ser mayor a 0"),
  categoryId: z.coerce.number().min(1, "Selecciona una categoría"),
  unityOfMeasureId: z.coerce.number().min(1, "Selecciona una unidad de medida"),
});

export type ProductBasic = z.infer<typeof productBasicSchema>;
