"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { ProductBasic } from "@/types/product/basic";
import { ProductCreate, productCreateSchema } from "@/types/product/create";
import { refresh } from "next/cache";

export async function createProduct(
  product: ProductCreate,
): Promise<ActionResult<ProductBasic>> {
  const result = validate(productCreateSchema, product);
  if (!result.ok) return result;
  const response = await fromResponse<ProductBasic>(
    await api.post("/products", result.data),
  );
  if (response.ok) refresh();
  return response;
}
