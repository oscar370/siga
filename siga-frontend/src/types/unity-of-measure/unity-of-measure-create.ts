import z from "zod";

export const unityOfMeasureCreteSchema = z.object({
  name: z.string().min(1, "Required").max(50, "Máximo 50 caracteres"),
  abbreviation: z.string().min(1, "Required").max(10, "Máximo 10 caracteres"),
});

export type UnityOfMeasureCreate = z.infer<typeof unityOfMeasureCreteSchema>;
