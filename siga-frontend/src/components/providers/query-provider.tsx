"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryClientProps = {
  children: React.ReactNode;
};

export function QueryProvider({ children }: QueryClientProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
