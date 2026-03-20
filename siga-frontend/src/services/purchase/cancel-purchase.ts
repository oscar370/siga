"use server";

import { fromResponse } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { refresh } from "next/cache";

export async function cancelPurchase(id: string) {
  const response = await fromResponse<number>(
    await api.delete(`/purchases/${id}`),
  );
  if (response.ok) refresh();
  return response;
}
