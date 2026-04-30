"use server";

import { redirect } from "next/navigation";

export async function logout() {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(".AspNetCore.Identity.Application");
  redirect("/auth/login");
}
