import { cookies } from "next/headers";

async function getCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    return token;
  } catch (error) {}
}

async function fetchApi(url: string, options?: RequestInit, body?: unknown) {
  const cookies = await getCookies();
  const data = body ? JSON.stringify(body) : undefined;

  return await fetch(process.env.BACKEND_URL + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies}`,
      Accept: "application/json",
    },
    body: data,
    ...options,
  });
}

export const api = {
  get: (url: string, options?: RequestInit) =>
    fetchApi(url, { ...options, method: "GET" }),
  post: (url: string, body: unknown, options?: RequestInit) =>
    fetchApi(url, { ...options, method: "POST" }, body),
  put: (url: string, body: unknown, options?: RequestInit) =>
    fetchApi(url, { ...options, method: "PUT" }, body),
  delete: (url: string, options?: RequestInit) =>
    fetchApi(url, { ...options, method: "DELETE" }),
};
