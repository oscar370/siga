"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { unityOfMeasureExtendedSchema } from "@/types/unity-of-measure/unity-of-measure-extended";
import z from "zod";

export async function getUnityOfMeasureById(id: string) {
  try {
    const { data } = await api.get(`/units-of-measure/${id}`);
    const result = z.parse(unityOfMeasureExtendedSchema, data);

    return result;
  } catch (error) {
    await handleServiceError(error);
  }
}
