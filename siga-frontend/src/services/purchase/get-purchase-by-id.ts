"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import {
  PurchaseExtended,
  purchaseExtendedSchema,
} from "@/types/purchase/extended";

export async function getPurchaseById(
  id: string,
): Promise<ActionResult<PurchaseExtended>> {
  const response = await fromResponse(await api.get(`/purchases/${id}`));
  if (!response.ok) return response;
  const result = validate(purchaseExtendedSchema, response.data);
  return result;
}
