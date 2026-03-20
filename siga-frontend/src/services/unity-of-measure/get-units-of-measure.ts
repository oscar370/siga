"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import {
  UnitsOfMeasureBasic,
  unitsOfMeasureBasicSchema,
} from "@/types/unity-of-measure/unity-of-measure-basic";

export async function getUnitsOfMeasure(): Promise<
  ActionResult<UnitsOfMeasureBasic>
> {
  const response = await fromResponse(await api.get("/units-of-measure"));
  if (!response.ok) return response;
  const result = validate(unitsOfMeasureBasicSchema, response.data);
  return result;
}
