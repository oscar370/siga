"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { SuppliersBasic, suppliersBasicSchema } from "@/types/supplier/basic";

export async function getSuppliers(): Promise<ActionResult<SuppliersBasic>> {
  const response = await fromResponse(await api.get("/suppliers"));
  if (!response.ok) return response;
  const result = validate(suppliersBasicSchema, response.data);
  return result;
}
