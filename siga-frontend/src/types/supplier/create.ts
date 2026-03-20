import z from "zod";

export const supplierCreateSchema = z.object({
  name: z.string().min(1, "Requerido").max(100, "Máximo 100 caracteres"),
  taxId: z.string().min(1, "Requerido").max(20, "Máximo 20 caracteres"),
  contactInfo: z.string().optional(),
});

export type SupplierCreate = z.infer<typeof supplierCreateSchema>;
