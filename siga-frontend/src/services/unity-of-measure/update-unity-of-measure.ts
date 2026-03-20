"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import {
  UnityOfMeasureBasic,
  unityOfMeasureBasicSchema,
} from "@/types/unity-of-measure/unity-of-measure-basic";
import { refresh } from "next/cache";

export async function updateUnityOfMeasure(
  id: string,
  updates: UnityOfMeasureBasic,
) {
  const result = validate(unityOfMeasureBasicSchema, updates);

  if (!result.ok) return result;

  const response = await fromResponse(
    await api.put(`/units-of-measure/${id}`, updates),
  );

  if (response.ok) refresh();

  return response;
}
