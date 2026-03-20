"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryClientProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

export function QueryProvider({ children }: QueryClientProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
