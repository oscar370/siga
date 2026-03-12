"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";

export async function deleteCategory(id: string) {
  try {
    const { data } = await api.delete(`/categories/${id}`);

    return data as number;
  } catch (error) {
    await handleServiceError(error);
  }
}
