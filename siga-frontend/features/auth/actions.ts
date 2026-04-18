"use server";

import { LoginRequest, postApiAuthLogin } from "@/lib/client";
import { zAccessTokenResponse, zLoginRequest } from "@/lib/client/zod.gen";
import { validate } from "@/lib/utils";
import { cookies } from "next/headers";

export async function login(credentials: LoginRequest) {
  const result = validate(zLoginRequest, credentials);
  const response = await postApiAuthLogin({
    body: result,
  });
  const validated = validate(zAccessTokenResponse, response.data);

  if (validated.accessToken) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", validated.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }
}
