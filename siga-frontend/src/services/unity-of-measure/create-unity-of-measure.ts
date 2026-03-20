"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { UnityOfMeasureBasic } from "@/types/unity-of-measure/unity-of-measure-basic";
import {
  UnityOfMeasureCreate,
  unityOfMeasureCreteSchema,
} from "@/types/unity-of-measure/unity-of-measure-create";
import { refresh } from "next/cache";

export async function createUnityOfMeasure(
  data: UnityOfMeasureCreate,
): Promise<ActionResult<UnityOfMeasureBasic>> {
  const result = validate(unityOfMeasureCreteSchema, data);

  if (!result.ok) return result;

  const response = await fromResponse<UnityOfMeasureBasic>(
    await api.post("/units-of-measure", result.data),
  );

  if (response.ok) refresh();

  return response;
}
