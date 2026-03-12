import z from "zod";

export const unityOfMeasureBasicSchema = z.object({
  id: z.number(),
  name: z.string(),
  abbreviation: z.string(),
});

export type UnityOfMeasureBasic = z.infer<typeof unityOfMeasureBasicSchema>;

export const unitsOfMeasureBasicSchema = z.array(
  unityOfMeasureBasicSchema.clone(),
);

export type UnitsOfMeasureBasic = z.infer<typeof unitsOfMeasureBasicSchema>;
