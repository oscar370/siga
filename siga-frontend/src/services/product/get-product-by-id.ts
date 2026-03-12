"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { productExtendedSchema } from "@/types/product/extended";
import z from "zod";

export async function getProductById(id: string) {
  try {
    const { data } = await api.get(`/products/${id}`);
    const result = z.parse(productExtendedSchema, data);

    return result;
  } catch (error) {
    await handleServiceError(error);
  }
}
