"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { SupplierBasic } from "@/types/supplier/basic";
import { SupplierCreate, supplierCreateSchema } from "@/types/supplier/create";
import { refresh } from "next/cache";

export async function createSupplier(
  data: SupplierCreate,
): Promise<ActionResult<SupplierBasic>> {
  const result = validate(supplierCreateSchema, data);

  if (!result.ok) return result;

  const response = await fromResponse<SupplierBasic>(
    await api.post("/suppliers", result.data),
  );

  if (response.ok) refresh();

  return response;
}
