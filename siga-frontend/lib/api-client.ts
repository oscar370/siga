import type { CreateClientConfig } from "./client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => {
  const isServer = typeof window === "undefined";

  return {
    ...config,
    baseUrl: "",

    fetch: async (input, init) => {
      const headers = new Headers(init?.headers);

      if (isServer) {
        input = `${process.env.BACKEND_URL}${input}`;
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        headers.set("Cookie", cookieStore.toString());
      } else {
        input = `/api/backend${input}`;
      }

      return fetch(input, {
        ...init,
        headers,
      });
    },
  };
};
