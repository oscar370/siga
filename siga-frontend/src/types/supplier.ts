import { z } from "zod";

export type Supplier = {
  SupplierId: string;
  Name: string;
  TaxId: string;
  ContactInfo: string;
  IsActive: boolean;
  DeleteAt?: Date;
};

export const supplierBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  taxId: z.string(),
  contactInfo: z.string(),
});

export type SupplierBasic = z.infer<typeof supplierBasicSchema>;

export const suppliersBasicSchema = z.array(supplierBasicSchema.clone());

export type SuppliersBasic = z.infer<typeof suppliersBasicSchema>;

export const supplierCreateSchema = z.object({
  name: z.string().min(1, "Requerido").max(100, "Máximo 100 caracteres"),
  taxId: z.string().min(1, "Requerido").max(20, "Máximo 20 caracteres"),
  contactInfo: z.string().nullable(),
});

export type SupplierCreate = z.infer<typeof supplierCreateSchema>;
