"use server";

import { handleServiceError } from "@/lib/actions";
import { api } from "@/lib/api-client";
import { CategoryBasic } from "@/types/category/basic";
import { CategoryCreate, categoryCreateSchema } from "@/types/category/create";
import z from "zod";

export async function createCategory(category: CategoryCreate) {
  try {
    const result = z.parse(categoryCreateSchema, category);
    const { data } = await api.post("/categories", result);
    return data as CategoryBasic;
  } catch (error) {
    await handleServiceError(error);
  }
}
