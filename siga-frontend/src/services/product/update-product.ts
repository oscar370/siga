"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { ProductBasic } from "@/types/product/basic";

export async function updateProduct(id: string, updates: ProductBasic) {
  try {
    const { data } = await api.put(`/products/${id}`, updates);

    return data as ProductBasic;
  } catch (error) {
    await handleServiceError(error);
  }
}
