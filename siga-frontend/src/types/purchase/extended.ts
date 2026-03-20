import z from "zod";
import { userBasicSchema } from "../auth/user";
import { statusSchema } from "../common";
import { lotsBasicSchema } from "../lot/basic";
import { supplierBasicSchema } from "../supplier/basic";

export const purchaseExtendedSchema = z.object({
  id: z.number(),
  referenceInvoice: z
    .string()
    .min(1, "Requerido")
    .max(50, "Máximo 50 caracteres"),
  operationDate: z.coerce.date().transform((o) => o.toISOString()),
  status: statusSchema.clone(),
  supplierId: z.number(),
  userId: z.number(),
  supplier: supplierBasicSchema.clone(),
  user: userBasicSchema.clone(),
  lots: lotsBasicSchema.clone(),
});

export type PurchaseExtended = z.infer<typeof purchaseExtendedSchema>;
