"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { categoryExtendedSchema } from "@/types/category/extended";
import z from "zod";

export async function getCategoryById(id: number) {
  try {
    const { data } = await api.get(`/categories/${id}`);
    const result = z.parse(categoryExtendedSchema, data);

    return result;
  } catch (error) {
    await handleServiceError(error);
  }
}
