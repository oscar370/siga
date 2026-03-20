"use server";

import { fromResponse, validate } from "@/lib/action-helpers";
import { api } from "@/lib/api-client.server";
import { LoginResponse, loginSchema, TLogin } from "@/types/auth/login";
import { ActionResult } from "@/types/common";
import { cookies } from "next/headers";

export async function login(
  credentials: TLogin,
): Promise<ActionResult<undefined>> {
  const result = validate(loginSchema, credentials);

  if (!result.ok) return result;

  const response = await fromResponse<LoginResponse>(
    await api.post("/auth/login", result.data),
  );

  if (!response.ok) return response;

  if (response.data.accessToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }

  return {
    ok: true,
    data: undefined,
  };
}
