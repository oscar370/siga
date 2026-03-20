import z from "zod";
import { purchasesBasicSchema } from "../purchase/basic";

export const supplierExtendedSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Requerido").max(100, "Máximo 100 caracteres"),
  taxId: z.string().min(1, "Requerido").max(20, "Máximo 20 caracteres"),
  contactInfo: z.string().optional(),
  purchases: purchasesBasicSchema.clone(),
});

export type SupplierExtended = z.infer<typeof supplierExtendedSchema>;
