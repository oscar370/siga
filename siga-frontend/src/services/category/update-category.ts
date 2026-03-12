"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { CategoryBasic } from "@/types/category/basic";

export async function updateCategory(id: string, updates: CategoryBasic) {
  try {
    const { data } = await api.put(`/categories/${id}`, updates);

    return data as CategoryBasic;
  } catch (error) {
    handleServiceError(error);
  }
}
