"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";

export async function deleteProduct(id: string) {
  try {
    const { data } = await api.delete(`/products/${id}`);

    return data as number;
  } catch (error) {
    await handleServiceError(error);
  }
}
