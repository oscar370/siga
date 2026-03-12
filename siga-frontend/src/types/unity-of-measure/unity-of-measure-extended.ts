import z from "zod";
import { productBasicSchema } from "../product/basic";

export const unityOfMeasureExtendedSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string(),
  products: z.array(productBasicSchema.clone()).default([]),
});

export type UnityOfMeasureExtended = z.infer<
  typeof unityOfMeasureExtendedSchema
>;
