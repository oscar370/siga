"use server";

import { api } from "@/lib/api-client";
import {
  UnityOfMeasureBasic,
  UnityOfMeasureCreate,
  unityOfMeasureCreteSchema,
} from "@/types/unity-of-measure";
import z from "zod";

export async function createUnityOfMeasure(data: UnityOfMeasureCreate) {
  try {
    const result = z.parse(unityOfMeasureCreteSchema, data);
    const response = await api.post("/units-of-measure", result);
    return response.data as UnityOfMeasureBasic;
  } catch (error) {
    console.log(error);
    throw new Error("Error inesperado");
  }
}
