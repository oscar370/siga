"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { PurchaseBasic } from "@/types/purchase/basic";
import { PurchaseCreate, purchaseCreateSchema } from "@/types/purchase/create";
import { refresh } from "next/cache";

export async function createPurchase(
  purchase: PurchaseCreate,
): Promise<ActionResult<PurchaseBasic>> {
  const result = validate(purchaseCreateSchema, purchase);

  if (!result.ok) return result;

  const response = await fromResponse<PurchaseBasic>(
    await api.post("/purchases", result.data),
  );

  if (response.ok) refresh();

  return response;
}
