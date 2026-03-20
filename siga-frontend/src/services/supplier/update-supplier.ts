"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { SupplierBasic, supplierBasicSchema } from "@/types/supplier/basic";
import { refresh } from "next/cache";

export async function updateSupplier(
  id: string,
  updates: SupplierBasic,
): Promise<ActionResult<SupplierBasic>> {
  const result = validate(supplierBasicSchema, updates);

  if (!result.ok) return result;

  const response = await fromResponse<SupplierBasic>(
    await api.put(`/suppliers/${id}`, result.data),
  );

  if (result.ok) refresh();

  return response;
}
