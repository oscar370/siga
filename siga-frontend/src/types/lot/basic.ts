import z from "zod";
import { productBasicSchema } from "../product/basic";

export const lotBasicSchema = z.object({
  id: z.number(),
  lotCode: z.string(),
  entryDate: z.coerce.date().transform((o) => o.toISOString()),
  unitCost: z.number(),
  availableQuantity: z.number(),
  productId: z.number(),
  purchaseId: z.number(),
  product: productBasicSchema.clone(),
});

export type LotBasic = z.infer<typeof lotBasicSchema>;

export const lotsBasicSchema = z.array(lotBasicSchema.clone());

export type LotsBasic = z.infer<typeof lotsBasicSchema>;
