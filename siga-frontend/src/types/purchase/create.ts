import z from "zod";

const purchaseItemCreateSchema = z.object({
  productId: z.coerce.number().min(1, "Selecciona un producto"),
  quantity: z.coerce.number().min(1, "La cantidad debe ser mayor a 0"),
  unitCost: z.coerce.number().min(1, "El costo debe ser mayor a 0"),
});

export const purchaseCreateSchema = z.object({
  referenceInvoice: z
    .string()
    .min(1, "Requerido")
    .max(50, "Máximo 50 caracteres"),
  operationDate: z.coerce.date().transform((o) => o.toISOString()),
  supplierId: z.coerce.number("Requerido"),
  purchaseItems: z
    .array(purchaseItemCreateSchema.clone())
    .min(1, "Se requiere al menos un producto"),
});

export type PurchaseCreate = z.infer<typeof purchaseCreateSchema>;
