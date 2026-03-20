"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import {
  ProductExtended,
  productExtendedSchema,
} from "@/types/product/extended";

export async function getProductById(
  id: string,
): Promise<ActionResult<ProductExtended>> {
  const response = await fromResponse(await api.get(`/products/${id}`));
  if (!response.ok) return response;
  const result = validate(productExtendedSchema, response.data);
  return result;
}
