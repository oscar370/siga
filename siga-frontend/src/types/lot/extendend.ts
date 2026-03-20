import z from "zod";
import { productBasicSchema } from "../product/basic";
import { purchaseBasicSchema } from "../purchase/basic";

export const lotExtendedSchema = z.object({
  id: z.number(),
  lotCode: z.string(),
  entryDate: z.coerce.date().transform((o) => o.toISOString()),
  unitCost: z.number(),
  availableQuantity: z.number(),
  productId: z.number(),
  purchaseId: z.number(),
  product: productBasicSchema.clone(),
  purchase: purchaseBasicSchema.clone(),
});

export type LotExtended = z.infer<typeof lotExtendedSchema>;
