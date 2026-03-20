"use server";

import { fromResponse } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { ActionResult } from "@/types/common";
import { refresh } from "next/cache";

export async function deleteCategory(
  id: string,
): Promise<ActionResult<number>> {
  const response = await fromResponse<number>(
    await api.delete(`/categories/${id}`),
  );

  if (response.ok) refresh();

  return response;
}
