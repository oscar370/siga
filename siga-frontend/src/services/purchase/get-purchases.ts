"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { PurchasesBasic, purchasesBasicSchema } from "@/types/purchase/basic";

export async function getPurchases(): Promise<ActionResult<PurchasesBasic>> {
  const response = await fromResponse(await api.get("/purchases"));
  if (!response.ok) return response;
  const result = validate(purchasesBasicSchema, response.data);
  return result;
}
