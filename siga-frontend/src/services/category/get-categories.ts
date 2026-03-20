"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { categoriesBasicSchema, CategoryBasic } from "@/types/category/basic";
import { ActionResult } from "@/types/common";

export async function getCategories(): Promise<ActionResult<CategoryBasic[]>> {
  const response = await fromResponse(await api.get("/categories"));
  if (!response.ok) return response;
  const result = validate(categoriesBasicSchema, response.data);
  return result;
}
