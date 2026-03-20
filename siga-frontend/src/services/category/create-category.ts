"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { CategoryBasic } from "@/types/category/basic";
import { CategoryCreate, categoryCreateSchema } from "@/types/category/create";
import { ActionResult } from "@/types/common";
import { refresh } from "next/cache";

export async function createCategory(
  category: CategoryCreate,
): Promise<ActionResult<CategoryBasic>> {
  const result = validate(categoryCreateSchema, category);

  if (!result.ok) return result;

  const response = await fromResponse<CategoryBasic>(
    await api.post("/categories", result.data),
  );

  if (response.ok) refresh();

  return response;
}
