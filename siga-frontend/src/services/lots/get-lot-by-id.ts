"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { lotExtendedSchema } from "@/types/lot/extendend";

export async function getLotById(id: string) {
  const response = await fromResponse(await api.get(`/lots/${id}`));
  if (!response.ok) return response;
  const result = validate(lotExtendedSchema, response.data);
  return result;
}
