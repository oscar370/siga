"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { ProductBasic, productBasicSchema } from "@/types/product/basic";
import { refresh } from "next/cache";

export async function updateProduct(
  id: string,
  updates: ProductBasic,
): Promise<ActionResult<ProductBasic>> {
  const result = validate(productBasicSchema, updates);

  if (!result.ok) return result;

  const response = await fromResponse<ProductBasic>(
    await api.put(`/products/${id}`, updates),
  );

  if (response.ok) refresh();

  return response;
}
