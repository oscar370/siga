"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { lotsBasicSchema } from "@/types/lot/basic";

export async function getLots() {
  const response = await fromResponse(await api.get("/lots"));
  if (!response.ok) return response;
  const result = validate(lotsBasicSchema, response.data);
  return result;
}
