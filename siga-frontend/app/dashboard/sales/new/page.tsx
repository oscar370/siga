import { PageContainer } from "@/components/ui/page-container";
import { NewSale } from "@/features/sales/new-sale";
import { getProductsLookupOptions } from "@/lib/client/@tanstack/react-query.gen";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function NewSalePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getProductsLookupOptions());

  return (
    <PageContainer title="Nueva venta">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewSale />
      </HydrationBoundary>
    </PageContainer>
  );
}
