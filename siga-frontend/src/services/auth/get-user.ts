"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { User, userSchema } from "@/types/auth/user";
import { ActionResult } from "@/types/common";

export async function getUser(): Promise<ActionResult<User>> {
  const response = await fromResponse(await api.get("/auth/me"));
  if (!response.ok) return response;
  const result = validate(userSchema, response.data);
  return result;
}
