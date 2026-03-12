"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";

export async function deleteUnityOfMeasure(id: string) {
  try {
    const { data } = await api.delete(`/units-of-measure/${id}`);

    return data as number;
  } catch (error) {
    await handleServiceError(error);
  }
}
