"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import {
  ProductsExtended,
  productsExtendedSchema,
} from "@/types/product/extended";

export async function getProducts(): Promise<ActionResult<ProductsExtended>> {
  const response = await fromResponse(await api.get("/products"));
  if (!response.ok) return response;
  const result = validate(productsExtendedSchema, response.data);
  return result;
}
