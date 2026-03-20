import z from "zod";

export const supplierBasicSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Requerido").max(100, "Máximo 100 caracteres"),
  taxId: z.string().min(1, "Requerido").max(20, "Máximo 20 caracteres"),
  contactInfo: z.string().optional(),
});

export type SupplierBasic = z.infer<typeof supplierBasicSchema>;

export const suppliersBasicSchema = z.array(supplierBasicSchema.clone());

export type SuppliersBasic = z.infer<typeof suppliersBasicSchema>;
