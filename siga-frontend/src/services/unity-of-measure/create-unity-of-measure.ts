"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { UnityOfMeasureBasic } from "@/types/unity-of-measure/unity-of-measure-basic";
import {
  UnityOfMeasureCreate,
  unityOfMeasureCreteSchema,
} from "@/types/unity-of-measure/unity-of-measure-create";
import z from "zod";

export async function createUnityOfMeasure(data: UnityOfMeasureCreate) {
  try {
    const result = z.parse(unityOfMeasureCreteSchema, data);
    const response = await api.post("/units-of-measure", result);
    return response.data as UnityOfMeasureBasic;
  } catch (error) {
    await handleServiceError(error);
  }
}
