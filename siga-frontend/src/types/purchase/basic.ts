import z from "zod";
import { statusSchema } from "../common";

export const purchaseBasicSchema = z.object({
  id: z.number(),
  referenceInvoice: z
    .string()
    .min(1, "Requerido")
    .max(50, "Máximo 50 caracteres"),
  operationDate: z.coerce.date().transform((o) => o.toISOString()),
  status: statusSchema.clone(),
  supplierId: z.number(),
  userId: z.number(),
});

export type PurchaseBasic = z.infer<typeof purchaseBasicSchema>;

export const purchasesBasicSchema = z.array(purchaseBasicSchema);

export type PurchasesBasic = z.infer<typeof purchasesBasicSchema>;
