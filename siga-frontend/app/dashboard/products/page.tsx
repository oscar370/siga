import { PageContainer } from "@/components/ui/page-container";
import { ProductsTable } from "@/features/products/products-table";
import { getProductsOptions } from "@/lib/client/@tanstack/react-query.gen";
import { initialQueryParams } from "@/lib/constants";
import { serverClient } from "@/lib/server-client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    getProductsOptions({ client: serverClient, query: initialQueryParams })
  );
  return (
    <PageContainer title="Productos">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsTable />
      </HydrationBoundary>
    </PageContainer>
  );
}
