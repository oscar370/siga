"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { CategoryBasic, categoryBasicSchema } from "@/types/category/basic";
import { ActionResult } from "@/types/common";
import { refresh } from "next/cache";

export async function updateCategory(
  id: string,
  updates: CategoryBasic,
): Promise<ActionResult<CategoryBasic>> {
  const result = validate(categoryBasicSchema, updates);

  if (!result.ok) return result;

  const response = await fromResponse<CategoryBasic>(
    await api.put(`/categories/${id}`, updates),
  );

  if (response.ok) refresh();

  return response;
}
