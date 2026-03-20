"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import {
  UnityOfMeasureExtended,
  unityOfMeasureExtendedSchema,
} from "@/types/unity-of-measure/unity-of-measure-extended";

export async function getUnityOfMeasureById(
  id: string,
): Promise<ActionResult<UnityOfMeasureExtended>> {
  const response = await fromResponse(await api.get(`/units-of-measure/${id}`));
  if (!response.ok) return response;
  const result = validate(unityOfMeasureExtendedSchema, response.data);
  return result;
}
