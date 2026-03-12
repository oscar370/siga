"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { unitsOfMeasureBasicSchema } from "@/types/unity-of-measure/unity-of-measure-basic";
import * as z from "zod";

export async function getUnitsOfMeasure() {
  try {
    const { data } = await api.get("/units-of-measure");
    const result = z.parse(unitsOfMeasureBasicSchema, data);

    return result;
  } catch (error) {
    await handleServiceError(error);
  }
}
