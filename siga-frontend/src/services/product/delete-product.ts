"use server";

import { fromResponse } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { refresh } from "next/cache";

export async function deleteProduct(id: string): Promise<ActionResult<number>> {
  const response = await fromResponse<number>(
    await api.delete(`/products/${id}`),
  );

  if (response.ok) refresh();

  return response;
}
