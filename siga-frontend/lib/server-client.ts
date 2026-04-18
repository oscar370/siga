import { cookies } from "next/headers";
import { createClient } from "./client/client";

export async function createServerClient() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return createClient({
    baseUrl: process.env.BACKEND_URL,
    credentials: "include",
    headers: {
      Cookie: cookieHeader,
    },
  });
}

export const serverClient = createClient({
  baseUrl: process.env.BACKEND_URL,
  credentials: "include",
});

serverClient.interceptors.request.use(async (request) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  request.headers = {
    Cookie: cookieHeader,
  };
});
