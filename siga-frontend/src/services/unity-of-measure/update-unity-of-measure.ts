"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { UnityOfMeasureBasic } from "@/types/unity-of-measure/unity-of-measure-basic";

export async function updateUnityOfMeasure(
  id: string,
  updates: UnityOfMeasureBasic,
) {
  try {
    const { data } = await api.put(`/units-of-measure/${id}`, updates);
    return data as UnityOfMeasureBasic;
  } catch (error) {
    await handleServiceError(error);
  }
}
