import { PageContainer } from "@/components/ui/page-container";
import { NewPurchase } from "@/features/purchases/new-purchase";
import {
  getProductsLookupOptions,
  getSuppliersLookupOptions,
} from "@/lib/client/@tanstack/react-query.gen";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function NewPurchasePage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(
      getSuppliersLookupOptions({ client: serverClient })
    ),
    queryClient.prefetchQuery(
      getProductsLookupOptions({ client: serverClient })
    ),
  ]);

  return (
    <PageContainer title="Nueva compra">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewPurchase />
      </HydrationBoundary>
    </PageContainer>
  );
}
