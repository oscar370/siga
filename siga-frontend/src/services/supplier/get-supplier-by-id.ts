"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import {
  SupplierExtended,
  supplierExtendedSchema,
} from "@/types/supplier/extended";

export async function getSupplierById(
  id: string,
): Promise<ActionResult<SupplierExtended>> {
  const response = await fromResponse(await api.get(`/suppliers/${id}`));
  if (!response.ok) return response;
  const result = validate(supplierExtendedSchema, response.data);
  return result;
}
