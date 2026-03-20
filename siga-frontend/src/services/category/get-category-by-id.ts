"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import {
  CategoryExtended,
  categoryExtendedSchema,
} from "@/types/category/extended";
import { ActionResult } from "@/types/common";

export async function getCategoryById(
  id: string,
): Promise<ActionResult<CategoryExtended>> {
  const response = await fromResponse(await api.get(`/categories/${id}`));
  if (!response.ok) return response;
  const result = validate(categoryExtendedSchema, response.data);
  return result;
}
